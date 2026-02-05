import { useEffect, useRef, useState, useMemo } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

import { fetchNoticiasByCategories } from '../../services/api';
import type { news } from '../../types/news';

// Category mapping (ID → name)
const CATEGORIES = {
  '14': { name: 'Blog', color: 'bg-blue-100 text-blue-800' },
  '17': { name: 'Datas Comemorativas', color: 'bg-purple-100 text-purple-800' },
  '16': { name: 'Educação Financeira', color: 'bg-green-100 text-green-800' },
  '15': { name: 'Incêndio', color: 'bg-red-100 text-red-800' },
  '8': { name: 'Meio Ambiente', color: 'bg-emerald-100 text-emerald-800' },
  '56': { name: 'História', color: 'bg-amber-100 text-amber-800' },
  '18': { name: 'Diversos', color: 'bg-gray-100 text-gray-800' },
} as const;

type CategoryId = keyof typeof CATEGORIES;

// Extract first image URL from HTML
function extractImageFromHtml(html?: string): string | null {
  if (!html) return null;
  const m = html.match(/<img[^>]+src=["']?([^"'>\s]+)["']?/i);
  return m ? m[1] : null;
}

export default function NewsList() {
  const [items, setItems] = useState<(news & { category_ids: number[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const hasFetched = useRef(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNoticiasByCategories(Object.keys(CATEGORIES));
      
      // Log de distribuição por categoria (posts podem ter múltiplas categorias)
      const distribution: Record<string, number> = {};
      data.forEach(item => {
        item.category_ids.forEach(catId => {
          const catIdStr = String(catId);
          distribution[catIdStr] = (distribution[catIdStr] || 0) + 1;
        });
      });
      
      console.log('Distribuição de posts por categoria:', distribution);
      console.log('Total de posts únicos:', data.length);
      
      setItems(data);
    } catch (err) {
      console.error(err);
      setError('Não conseguimos carregar as notícias no momento. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    load();
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return items;
    // Filtro inclusivo: mostra posts que contêm a categoria selecionada
    return items.filter(item => 
      item.category_ids.includes(Number(selectedCategory))
    );
  }, [items, selectedCategory]);

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const pagedItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center gap-3 text-primary mb-3">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="text-sm font-medium text-neutral-600">Carregando notícias...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-red-600">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => (window.location.hash = '')}
            className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
            aria-label="Voltar para a página inicial"
          >
            <ArrowRight size={16} className="rotate-180" />
            Voltar
          </button>
        </div>

        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Todas as Notícias</h1>
          <p className="text-neutral-600 mb-6">Filtre por tema para encontrar o que procura</p>

          {/* Filter select - melhor UX para muitas categorias */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-br from-neutral-50 to-neutral-100 px-6 py-4 rounded-xl border-2 border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <div className="flex flex-col gap-1">
              <label htmlFor="category-filter" className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Filtrar por tema</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as CategoryId | 'all')}
                className="text-base font-semibold text-neutral-900 bg-transparent border-none outline-none cursor-pointer -ml-1 pr-8"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%233d685d'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0 center',
                  backgroundSize: '1.5rem',
                  appearance: 'none',
                }}
              >
              <option value="all">Todas as categorias ({items.length})</option>
              {Object.entries(CATEGORIES).map(([id, cat]) => {
                // Pula Blog e Diversos do filtro
                if (id === '14' || id === '18') return null;
                const count = items.filter(item => item.category_ids.includes(Number(id))).length;
                if (count === 0) return null;
                return (
                  <option key={id} value={id} style={{ padding: '8px 12px' }}>
                    {cat.name} ({count})
                  </option>
                );
              })}
              </select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pagedItems.map((item) => {
            return (
              <article key={item.id} className="group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 card-anim flex flex-col">
                {extractImageFromHtml(item.content?.rendered) && (
                  <div className="aspect-[16/10] bg-neutral-200 overflow-hidden">
                    <img 
                      src={extractImageFromHtml(item.content?.rendered)!} 
                      alt={item.title.rendered.replace(/<[^>]*>/g, '')} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      loading="lazy" 
                      decoding="async" 
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <Calendar size={16} />
                      <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {(() => {
                        // Remove Blog (14) e Diversos (18) das tags
                        let displayCats = item.category_ids.filter(id => id !== 14 && id !== 18);
                        
                        // Se ainda tiver mais de 2, limita a 2
                        displayCats = displayCats.slice(0, 2);
                        
                        return displayCats.map(catId => {
                          const catInfo = CATEGORIES[String(catId) as CategoryId];
                          if (!catInfo) return null;
                          return (
                            <span key={catId} className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${catInfo.color}`}>
                              {catInfo.name}
                            </span>
                          );
                        });
                      })()}
                    </div>
                  </div>

                  <h3 
                    className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors line-clamp-2" 
                    dangerouslySetInnerHTML={{ __html: item.title.rendered }} 
                  />

                  <div 
                    className="text-neutral-600 mb-4 text-sm line-clamp-3" 
                    dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} 
                  />

                  <div className="flex-grow" />

                  <a
                    href={`#noticia-${item.id}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all mt-4"
                    aria-label={`Leia mais sobre ${item.title.rendered.replace(/<[^>]*>/g, '')}`}
                  >
                    Ler mais
                    <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">Nenhuma notícia encontrada neste tema.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredItems.length > pageSize && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button 
              className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-700 font-medium hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
              onClick={() => setPage((p) => Math.max(1, p - 1))} 
              disabled={page === 1}
            >
              Anterior
            </button>
            <span className="text-sm text-neutral-600 font-medium">Página {page} de {totalPages}</span>
            <button 
              className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-700 font-medium hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))} 
              disabled={page === totalPages}
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

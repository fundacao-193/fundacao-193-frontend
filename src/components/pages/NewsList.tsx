import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Calendar, ArrowRight, ChevronDown, Check } from 'lucide-react';

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
  const [anim, setAnim] = useState(false);
  const animTimer = useRef<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const triggerAnim = useCallback(() => {
    setAnim(true);
    if (animTimer.current) {
      window.clearTimeout(animTimer.current);
      animTimer.current = null;
    }
    animTimer.current = window.setTimeout(() => {
      setAnim(false);
      animTimer.current = null;
    }, 500);
  }, []);

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
    triggerAnim();
  }, [selectedCategory, triggerAnim]);

  useEffect(() => {
    triggerAnim();
  }, [page, triggerAnim]);

  useEffect(() => {
    return () => {
      if (animTimer.current) {
        window.clearTimeout(animTimer.current);
        animTimer.current = null;
      }
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (category: CategoryId | 'all') => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const getCategoryLabel = () => {
    if (selectedCategory === 'all') return 'Todas as categorias';
    return CATEGORIES[selectedCategory]?.name || 'Categoria';
  };

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

          {/* Custom Dropdown com animação */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center gap-3 bg-gradient-to-br from-neutral-50 to-neutral-100 px-6 py-4 rounded-xl border-2 border-neutral-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
            >
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Filtrar por tema</span>
                <span className="text-base font-semibold text-neutral-900">{getCategoryLabel()}</span>
              </div>
              <ChevronDown 
                size={20} 
                className={`text-primary ml-2 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl border-2 border-neutral-200 shadow-2xl z-50 animate-fade-in-up overflow-hidden">
                <div className="max-h-96 overflow-y-auto">
                  {/* Todas as categorias */}
                  <button
                    onClick={() => handleCategorySelect('all')}
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-50 transition-colors ${
                      selectedCategory === 'all' ? 'bg-primary/5' : ''
                    }`}
                  >
                    <span className="font-medium text-neutral-900">Todas as categorias</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-500 font-semibold bg-neutral-100 px-2 py-1 rounded-full">
                        {items.length}
                      </span>
                      {selectedCategory === 'all' && <Check size={16} className="text-primary" />}
                    </div>
                  </button>

                  <div className="border-t border-neutral-200" />

                  {/* Categorias específicas */}
                  {Object.entries(CATEGORIES).map(([id, cat]) => {
                    if (id === '14' || id === '18') return null;
                    const count = items.filter(item => item.category_ids.includes(Number(id))).length;
                    if (count === 0) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => handleCategorySelect(id as CategoryId)}
                        className={`w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-50 transition-colors ${
                          selectedCategory === id ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`inline-block w-3 h-3 rounded-full ${cat.color.split(' ')[0]}`} />
                          <span className="font-medium text-neutral-900">{cat.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-500 font-semibold bg-neutral-100 px-2 py-1 rounded-full">
                            {count}
                          </span>
                          {selectedCategory === id && <Check size={16} className="text-primary" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={`grid md:grid-cols-3 gap-8 ${anim ? 'animate-fade-in-up' : ''}`}>
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

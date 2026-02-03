import { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

import { fetchNoticias } from '../../services/api';
import type { news } from '../../types/news';

// Extract first image URL from HTML
function extractImageFromHtml(html?: string): string | null {
  if (!html) return null;
  const m = html.match(/<img[^>]+src=["']?([^"'>\s]+)["']?/i);
  return m ? m[1] : null;
}

export default function NewsList() {
  const [items, setItems] = useState<news[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNoticias();
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

  if (loading) return (
    <div className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-badge-text font-medium">Carregando notícias...</p>
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

        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-block bg-badge-bg text-badge-text px-4 py-2 rounded-full text-sm font-semibold mb-4">Notícias</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">Todas as Notícias</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <article key={item.id} className="group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 card-anim">
              {extractImageFromHtml(item.content?.rendered) ? (
                <div className="aspect-[16/10] bg-neutral-200 overflow-hidden">
                  <img src={extractImageFromHtml(item.content?.rendered) ?? undefined} alt={item.title.rendered.replace(/<[^>]*>/g, '')} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
              ) : null}

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                  <Calendar size={16} />
                  <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-neutral-900 mb-0" dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-badge-bg text-badge-text">Notícia</span>
                </div>

                <p className="text-neutral-600 mb-4" dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />

                <a
                  href={item.link || `#noticia-${item.id}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all hover:text-primary-hover"
                >
                  Ler mais
                  <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}

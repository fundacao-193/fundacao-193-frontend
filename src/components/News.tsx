import { useEffect, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

import { fetchNoticias, Noticia } from '../services/api';

export default function News() {
  // Estado para guardar as noticias vindas da API
  const [news, setNews] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Executa quando o componente carrega
  useEffect(() => {
    async function loadNoticias() {
      try {
        const data = await fetchNoticias();
        setNews(data);
      } catch (err) {
        setError('Erro ao carregar notícias');
      } finally {
        setLoading(false);
      }
    }

    loadNoticias();
  }, []);

  // Estados visuais basicos
  if (loading) {
    return <p className="text-center py-20">Carregando notícias...</p>;
  }

  if (error) {
    return <p className="text-center py-20 text-red-500">{error}</p>;
  }

  return (
    <section id="noticias" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-block bg-[#3d685d]/10 text-[#3d685d] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Notícias
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Acompanhe nossas atividades
            </h2>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 text-[#3d685d] font-semibold hover:gap-3 transition-all">
            Ver todas
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {/* Imagem (placeholder por enquanto) */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-[#3d685d] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Notícia
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                  <Calendar size={16} />
                  <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                </div>

                <h3
                  className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-[#3d685d] transition-colors"
                  dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                />

                <p
                  className="text-neutral-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
                />

                <button className="inline-flex items-center gap-2 text-[#3d685d] font-semibold text-sm hover:gap-3 transition-all">
                  Ler mais
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <button className="inline-flex items-center gap-2 text-[#3d685d] font-semibold hover:gap-3 transition-all">
            Ver todas as notícias
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

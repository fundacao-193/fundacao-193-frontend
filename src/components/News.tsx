import { useEffect, useState } from 'react';
import { Calendar, ArrowRight, AlertCircle, RotateCw } from 'lucide-react';

import { fetchNoticias } from '../services/api';
import type { news } from '../types/news';


export default function News() {
  // Estado para guardar as noticias vindas da API
  const [news, setNews] = useState<news[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Executa quando o componente carrega
  const loadNoticias = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNoticias();
      setNews(data);
    } catch (err) {
      console.error(err);
      setError('Não conseguimos carregar as notícias no momento. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNoticias();
  }, []);

  // Estados visuais basicos
  if (loading) {
    return (
      <section id="noticias" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 text-[#3d685d]">
              <div className="w-2 h-2 bg-[#3d685d] rounded-full animate-pulse"></div>
              <p className="text-sm font-medium">Carregando notícias...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="noticias" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 flex items-center gap-4">
            <AlertCircle size={24} className="text-red-600 flex-shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-1">Erro ao carregar notícias</h3>
              <p className="text-sm text-red-700 mb-4">{error}</p>
              <button
                onClick={loadNoticias}
                aria-label="Recarregar notícias"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors text-sm font-medium focus:outline-2 focus:outline-offset-2 focus:outline-white"
              >
                <RotateCw size={16} />
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </section>
    );
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

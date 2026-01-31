import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { fetchNoticia } from '../../services/api';
import type { news } from '../../types/news';

interface Props { id: number }

export default function NewsDetail({ id }: Props) {
  const [item, setItem] = useState<news | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNoticia(id);
        setItem(data);
      } catch (err) {
        console.error(err);
        setError('Não conseguimos carregar a notícia.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen py-20 bg-white"><div className="max-w-5xl mx-auto px-4">Carregando...</div></div>
  );

  if (error || !item) return (
    <div className="min-h-screen py-20 bg-white"><div className="max-w-5xl mx-auto px-4 text-center text-red-600">{error || 'Notícia não encontrada'}</div></div>
  );

  // Extract first image from content or excerpt
  const contentHtml = item.content?.rendered || item.excerpt.rendered || '';
  const imgMatch = contentHtml.match(/<img[^>]+src=["']?([^"'>\s]+)["']?/i);
  const image = imgMatch ? imgMatch[1] : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => window.location.hash = '#noticias'}
          className="flex items-center gap-2 text-[#3d685d] hover:text-[#2f5349] font-medium mb-8 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-[#3d685d]"
          aria-label="Voltar para lista de notícias"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        {image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img src={image} alt={item.title.rendered.replace(/<[^>]*>/g, '')} className="w-full h-64 object-cover" loading="lazy" decoding="async" />
          </div>
        )}

        <div className="mb-6 text-neutral-500 text-sm flex items-center gap-3"><Calendar size={16} />{new Date(item.date).toLocaleDateString('pt-BR')}</div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-6" dangerouslySetInnerHTML={{ __html: item.title.rendered }} />

        <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: (item.content && item.content.rendered) || item.excerpt.rendered }} />
      </div>
    </div>
  );
}

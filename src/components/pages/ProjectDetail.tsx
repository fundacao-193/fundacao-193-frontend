import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { fetchProjeto } from '../../services/api';
import type { Project } from '../../types/projects';

interface Props { id: number }

export default function ProjectDetail({ id }: Props) {
  const [item, setItem] = useState<Project | null>(null);
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
        const data = await fetchProjeto(id);
        setItem(data);
      } catch (err) {
        console.error(err);
        setError('Não conseguimos carregar o projeto.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return (<div className="min-h-screen py-20 bg-white"><div className="max-w-5xl mx-auto px-4">Carregando...</div></div>);
  if (error || !item) return (<div className="min-h-screen py-20 bg-white"><div className="max-w-5xl mx-auto px-4 text-center text-red-600">{error || 'Projeto não encontrado'}</div></div>);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => window.location.hash = '#projetos'}
          className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium mb-8 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          aria-label="Voltar para lista de projetos"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        {item.acf?.project_image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={item.acf.project_image} 
              alt={item.title.rendered.replace(/<[^>]*>/g, '')} 
              className="w-full max-h-96 object-cover" 
              loading="lazy" 
              decoding="async" 
            />
          </div>
        )}

        <h1 className="text-3xl font-bold text-neutral-900 mb-6" dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
        
        <div className="prose max-w-none text-neutral-600 leading-relaxed mb-8">
          {item.content?.rendered && (
            <div dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
          )}
          {!item.content?.rendered && item.excerpt?.rendered && (
            <div dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
          )}
        </div>

        {item.acf?.impacto && (
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
            <h3 className="font-bold text-neutral-900 mb-2">Impacto</h3>
            <p className="text-primary font-semibold">{item.acf.impacto}</p>
          </div>
        )}
      </div>
    </div>
  );
}

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

        <h1 className="text-3xl font-bold text-neutral-900 mb-6" dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
        <div className="text-neutral-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: (item.excerpt && item.excerpt.rendered) || '' }} />
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { fetchEvento } from '../../services/api';
import type { Event } from '../../types/events';

interface Props { id: number }

function parseYmdToDateStr(ymd?: string): string | null {
  if (!ymd) return null;
  if (/^\d{8}$/.test(ymd)) {
    const year = Number(ymd.substring(0,4));
    const month = Number(ymd.substring(4,6)) - 1;
    const day = Number(ymd.substring(6,8));
    return new Date(year, month, day, 12,0,0).toLocaleDateString('pt-BR');
  }
  try {
    return new Date(ymd).toLocaleDateString('pt-BR');
  } catch {
    return null;
  }
}

export default function EventDetail({ id }: Props) {
  const [item, setItem] = useState<Event | null>(null);
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
        const data = await fetchEvento(id);
        setItem(data);
      } catch (err) {
        console.error(err);
        setError('Não conseguimos carregar o evento.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return (<div className="min-h-screen py-20 bg-white"><div className="max-w-5xl mx-auto px-4">Carregando...</div></div>);
  if (error || !item) return (<div className="min-h-screen py-20 bg-white"><div className="max-w-5xl mx-auto px-4 text-center text-red-600">{error || 'Evento não encontrado'}</div></div>);

  const start = parseYmdToDateStr(item.acf.event_start_date);
  const end = parseYmdToDateStr(item.acf.event_end_date);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => window.location.hash = '#eventos'}
          className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium mb-8 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          aria-label="Voltar para lista de eventos"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        {item.acf.event_featured_image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img src={item.acf.event_featured_image} alt={item.title.rendered.replace(/<[^>]*>/g, '')} className="w-full h-64 object-cover" loading="lazy" decoding="async" />
          </div>
        )}

        <h1 className="text-3xl font-bold text-neutral-900 mb-6" dangerouslySetInnerHTML={{ __html: item.title.rendered }} />

        <div className="mb-4 text-neutral-600 flex items-center gap-4">
          {start && <div className="flex items-center gap-2"><Calendar size={16} />{start}{end ? ` — ${end}` : ''}</div>}
          {item.acf.event_location && <div className="flex items-center gap-2"><MapPin size={16} />{item.acf.event_location}</div>}
        </div>

        <div className="prose max-w-none text-neutral-700 leading-relaxed mb-6">
          {item.content?.rendered && (
            <div dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
          )}
          {!item.content?.rendered && item.acf.event_summary && (
            <p>{item.acf.event_summary}</p>
          )}
        </div>

        {item.acf.event_registration_url && (
          <a href={item.acf.event_registration_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors">Inscreva-se</a>
        )}
      </div>
    </div>
  );
}

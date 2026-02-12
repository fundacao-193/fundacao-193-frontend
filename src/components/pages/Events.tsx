import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Users, AlertCircle, RotateCw } from 'lucide-react';

import { fetchEventos } from '../../services/api';
import type { Event } from '../../types/events';

/**
 * Parse Ymd (20260122) to Date using noon to avoid timezone shift
 */
function parseYmdToDate(ymd?: string): Date | null {
  if (!ymd || ymd.length !== 8) return null;

  const year = Number(ymd.substring(0, 4));
  const month = Number(ymd.substring(4, 6)) - 1;
  const day = Number(ymd.substring(6, 8));

  // Noon prevents UTC timezone offset issues
  return new Date(year, month, day, 12, 0, 0);
}

/**
 * Format Ymd to BR date
 */
function formatYmdToBr(ymd?: string): string {
  const d = parseYmdToDate(ymd);
  return d ? d.toLocaleDateString('pt-BR') : 'Data a definir';
}

/**
 * Normalize date to start of day
 */
function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEventos();
      setEvents(data);
    } catch (err) {
      console.error(err);
      setError('Não conseguimos carregar os eventos no momento. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-badge-text">
            <div className="w-2 h-2 bg-badge-text rounded-full animate-pulse"></div>
            <p className="text-sm font-medium">Carregando eventos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-8 flex items-center gap-4">
          <AlertCircle size={24} className="text-red-600 flex-shrink-0" aria-hidden="true" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 mb-1">Erro ao carregar eventos</h3>
            <p className="text-sm text-red-700 mb-4">{error}</p>
            <button
              onClick={loadEvents}
              aria-label="Recarregar eventos"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors text-sm font-medium focus:outline-2 focus:outline-offset-2 focus:outline-white"
            >
              <RotateCw size={16} />
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  const today = startOfDay(new Date());

  const upcomingEvents = events
    .filter(event => {
      const d = parseYmdToDate(event.acf?.event_start_date);
      return d && startOfDay(d) >= today;
    })
    .sort((a, b) => {
      const aDate = parseYmdToDate(a.acf?.event_start_date)?.getTime() ?? 0;
      const bDate = parseYmdToDate(b.acf?.event_start_date)?.getTime() ?? 0;
      return aDate - bDate;
    });

  const pastEvents = events
    .filter(event => {
      const d = parseYmdToDate(event.acf?.event_start_date);
      return d && startOfDay(d) < today;
    })
    .sort((a, b) => {
      const aDate = parseYmdToDate(a.acf?.event_start_date)?.getTime() ?? 0;
      const bDate = parseYmdToDate(b.acf?.event_start_date)?.getTime() ?? 0;
      return bDate - aDate;
    });

  const cardClass =
    'bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => (window.location.hash = '')}
          className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          Eventos
        </h1>

        <p className="text-xl text-neutral-600 mb-16">
          Encontros, seminários e atividades que promovem conhecimento e participação.
        </p>

        {/* Upcoming events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            Próximos Eventos
          </h2>

          {upcomingEvents.length === 0 && (
            <p className="text-neutral-500">Nenhum evento programado.</p>
          )}

          <div className="space-y-6">
            {/* DEMONSTRAÇÃO: Evento hardcoded com inscrição - COMENTAR EM PRODUÇÃO */}
             
            <div className={cardClass}>
              <div className="p-6">
                <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Inscrições Abertas
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  Capacitação em Salvamento Aquático
                </h3>

                <p className="text-neutral-600 leading-relaxed mb-4">
                  Curso especializado em técnicas de salvamento aquático para ambientes urbanos e naturais. Módulos práticos e teóricos ministrados por especialistas certificados.
                </p>

                <div className="flex flex-col md:flex-row gap-6 text-neutral-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-icon-fg" />
                    <span>15/03/2026</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-icon-fg" />
                    <span>Centro de Treinamento CBMDF</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href="https://forms.gle/exemplo-inscricao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors"
                  >
                    Inscrever-se
                  </a>
                  <a
                    href="#evento-demo-1"
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all px-4 py-2"
                  >
                    Saiba mais
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
            

            {upcomingEvents.map(event => (
              <div key={event.id} className={cardClass}>
                <div className="p-6">
                  <h3
                    className="text-2xl font-bold text-neutral-900 mb-2"
                    dangerouslySetInnerHTML={{ __html: event.title.rendered }}
                  />

                  <p className="text-neutral-600 leading-relaxed mb-4">
                    {event.acf?.event_summary || 'Descrição não informada.'}
                  </p>

                  <div className="flex flex-col md:flex-row gap-6 text-neutral-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-icon-fg" />
                      <span>{formatYmdToBr(event.acf?.event_start_date)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-icon-fg" />
                      <span>{event.acf?.event_location || 'Local a definir'}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {event.acf?.event_registration_url && (
                      <a
                        href={event.acf.event_registration_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors"
                      >
                        Inscrever-se
                      </a>
                    )}

                    <a
                      href={`#evento-${event.id}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all px-4 py-2"
                      aria-label={`Saiba mais sobre ${event.title.rendered.replace(/<[^>]*>/g, '')}`}
                    >
                      Saiba mais
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            Eventos Realizados
          </h2>

          {pastEvents.length === 0 && (
            <p className="text-neutral-500">Nenhum evento anterior.</p>
          )}

          <div className="space-y-6">
            {pastEvents.map(event => (
              <div key={event.id} className={cardClass}>
                <div className="p-6">
                  <h3
                    className="text-2xl font-bold text-neutral-900 mb-2"
                    dangerouslySetInnerHTML={{ __html: event.title.rendered }}
                  />

                  <p className="text-neutral-600 mb-4">
                    {event.acf?.event_summary || 'Descrição não informada.'}
                  </p>

                  <div className="flex flex-col md:flex-row gap-6 text-neutral-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-icon-fg" />
                      <span>{formatYmdToBr(event.acf?.event_start_date)}</span>
                    </div>

                    {event.acf?.event_location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-icon-fg" />
                        <span>{event.acf.event_location}</span>
                      </div>
                    )}
                  </div>

                  <a
                    href={`#evento-${event.id}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                    aria-label={`Saiba mais sobre ${event.title.rendered.replace(/<[^>]*>/g, '')}`}
                  >
                    Saiba mais
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary to-primary-hover rounded-2xl p-8 text-white">
          <div className="flex items-start gap-4 mb-6">
            <Users size={32} />
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Deseja Participar ou Patrocinar?
              </h3>
              <p>
                Entre em contato para apoiar ou participar dos proximos eventos.
              </p>
            </div>
          </div>

          <button className="px-6 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-neutral-100 transition-colors">
            Entre em Contato
          </button>
        </div>
      </div>
    </div>
  );
}

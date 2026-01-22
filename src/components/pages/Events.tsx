import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';

export default function Events() {
  const upcomingEvents = [
    {
      title: 'Simpósio Internacional de Gestão de Emergências',
      date: '15-17 de Março, 2024',
      location: 'Centro de Convenções, Brasília',
      type: 'Conferência',
      description: 'Encontro de especialistas internacionais discutindo inovação e tendências em gestão de crises.',
    },
    {
      title: 'Exercício Simulado de Resposta Integrada',
      date: '22 de Março, 2024',
      location: 'Polígono de Treinamento da Fundação',
      type: 'Simulado',
      description: 'Exercício prático envolvendo múltiplas agências e operações de resgate avançado.',
    },
    {
      title: 'Seminário de Sustentabilidade e Segurança',
      date: '10 de Abril, 2024',
      location: 'Auditório Principal, Sede da Fundação',
      type: 'Seminário',
      description: 'Discussão sobre responsabilidade social e sustentabilidade nas operações de emergência.',
    },
  ];

  const pastEvents = [
    {
      year: 2023,
      highlights: [
        'Encontro Anual de Bombeiros com 300+ participantes',
        'Workshop de Resgate em Altura com especialistas europeus',
        'Série de palestras em 12 escolas (5.000 alunos)',
      ],
    },
    {
      year: 2022,
      highlights: [
        'Conferência de Inovação em Segurança Pública',
        'Programa de Intercâmbio com Instituições Internacionais',
        'Semana da Prevenção em 50+ comunidades',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => window.location.hash = ''}
          className="flex items-center gap-2 text-[#3d685d] hover:text-[#2f5349] font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Eventos</h1>
        <p className="text-xl text-neutral-600 mb-16">
          Encontros, seminários e atividades que promovem conhecimento, networking e inovação.
        </p>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Próximos Eventos</h2>
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#3d685d]">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">{event.title}</h3>
                    <span className="inline-block px-3 py-1 bg-[#3d685d] bg-opacity-10 text-[#3d685d] rounded-full text-sm font-semibold mb-4">
                      {event.type}
                    </span>
                  </div>
                </div>
                <p className="text-neutral-600 leading-relaxed mb-4">{event.description}</p>
                <div className="flex flex-col md:flex-row gap-6 text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-[#3d685d]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-[#3d685d]" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-[#3d685d] text-white rounded-lg font-medium hover:bg-[#2f5349] transition-colors">
                  Inscrever-se
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Eventos Realizados</h2>
          <div className="space-y-8">
            {pastEvents.map((period) => (
              <div key={period.year} className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Ano {period.year}</h3>
                <ul className="space-y-3">
                  {period.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#3d685d] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-gradient-to-r from-[#3d685d] to-[#2f5349] rounded-2xl p-8 text-white">
          <div className="flex items-start gap-4 mb-6">
            <Users size={32} />
            <div>
              <h3 className="text-2xl font-bold mb-2">Deseja Participar ou Patrocinar?</h3>
              <p className="text-opacity-90">
                Oferecemos diversas oportunidades de participação e patrocínio em nossos eventos. Entre em contato com a equipe!
              </p>
            </div>
          </div>
          <button className="px-6 py-2 bg-white text-[#3d685d] rounded-lg font-semibold hover:bg-neutral-100 transition-colors">
            Entre em Contato
          </button>
        </div>
      </div>
    </div>
  );
}

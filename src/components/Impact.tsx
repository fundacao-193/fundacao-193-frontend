import { Award, Calendar, TrendingUp, Users, type LucideIcon } from 'lucide-react';

export default function Impact() {
  const services: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
  }> = [
    {
      icon: Calendar,
      title: '17+ Eventos Realizados',
      description: 'Treinamentos e ações institucionais.',
      color: 'from-institutional to-institutional',
    },
    {
      icon: Users,
      title: '150+ Profissionais Capacitados',
      description: 'Bombeiros formados e especializados.',
      color: 'from-institutional to-institutional',
    },
    {
      icon: Award,
      title: '7+ Projetos Apoiados',
      description: 'Iniciativas operacionais e sociais.',
      color: 'from-institutional to-institutional',
    },
    {
      icon: TrendingUp,
      title: '3+ Anos de Atuação',
      description: 'Apoiando quem salva vidas.',
      color: 'from-institutional to-institutional',
    },
  ];

  return (
    <section id="impacto" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-badge-bg text-badge-text px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Nosso Impacto
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            Números que salvam vidas
          </h2>
          <p className="text-lg text-neutral-600">
            Mais de três anos de compromisso com a excelência no apoio
            ao Corpo de Bombeiros e à comunidade do Distrito Federal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="text-white" size={32} />
              </div>

              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {service.title}
              </h3>

              <p className="text-neutral-600 leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Link to the most relevant section instead of a no-op button */}
              <a
                href={
                  service.title.includes('Eventos Realizados') ? '#eventos' :
                  service.title.includes('Profissionais Capacitados') ? '#capacitacao' :
                  service.title.includes('Projetos Apoiados') ? '#projetos' :
                  '#projetos'
                }
                className="text-primary font-semibold text-sm hover:gap-2 inline-flex items-center gap-1 transition-all group-hover:gap-2 hover:text-primary-hover"
                onClick={(e) => {
                  const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
                  if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.slice(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      window.history.pushState(null, '', href);
                    } else {
                      window.location.hash = href;
                    }
                  }
                }}
              >
                Saiba mais
                <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

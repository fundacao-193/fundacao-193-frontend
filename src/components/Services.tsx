import { GraduationCap, Flame, Users, Lightbulb } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Services() {
  const { elementRef, isVisible } = useScrollAnimation(0.15);
  const services = [
    {
      icon: Flame,
      title: 'Apoio Operacional',
      description: 'Fornecimento de equipamentos, tecnologia e recursos para aprimorar as operações de salvamento e combate a incêndios.',
      color: 'from-institutional to-institutional',
    },
    {
      icon: GraduationCap,
      title: 'Capacitação e Treinamentos',
      description: 'Programas especializados de formação e aperfeiçoamento para bombeiros, com instrutores qualificados e estrutura moderna.',
      color: 'from-institutional to-institutional',
    },
    {
      icon: Users,
      title: 'Eventos Institucionais',
      description: 'Organização de seminários, congressos e encontros técnicos para promover a troca de experiências e conhecimento.',
      color: 'from-institutional to-institutional',
    },
    {
      icon: Lightbulb,
      title: 'Projetos Sociais',
      description: 'Desenvolvimento de iniciativas voltadas à educação preventiva e conscientização da comunidade sobre segurança.',
      color: 'from-institutional to-institutional',
    },
  ];

  return (
    <section id="areas" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-badge-bg text-badge-text px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Áreas de Atuação
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            Como apoiamos o Corpo de Bombeiros
          </h2>
          <p className="text-lg text-neutral-600">
            Nossa atuação abrange diversas frentes estratégicas para fortalecer
            as operações e capacitar os profissionais que protegem a população.
          </p>
        </div>

        <div ref={elementRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 50}ms` : '0ms', transitionDuration: '500ms' }}
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
                  service.title === 'Apoio Operacional' ? '#projetos' :
                  service.title === 'Capacitação e Treinamentos' ? '#capacitacao' :
                  service.title === 'Eventos Institucionais' ? '#eventos' :
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

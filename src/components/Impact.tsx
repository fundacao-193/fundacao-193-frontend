import { TrendingUp, Users, Award, Calendar } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Impact() {
  const { elementRef, isVisible } = useScrollAnimation(0.15);
  const stats = [
    {
      icon: Calendar,
      value: '500+',
      label: 'Eventos Realizados',
      description: 'Treinamentos e ações institucionais',
    },
    {
      icon: Users,
      value: '15.000+',
      label: 'Profissionais Capacitados',
      description: 'Bombeiros formados e especializados',
    },
    {
      icon: Award,
      value: '200+',
      label: 'Projetos Apoiados',
      description: 'Iniciativas operacionais e sociais',
    },
    {
      icon: TrendingUp,
      value: '3+',
      label: 'Anos de Atuação',
      description: 'Apoiando quem salva vidas',
    },
  ];

  return (
    <section id="impacto" className="relative py-20 bg-gradient-to-br from-impact-start to-impact-end text-white overflow-hidden">
      {/* Background com AVIF + WebP + JPG fallback otimizado */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ 
          backgroundImage: `
            url('/images/impact.avif'),
            url('/images/impact.webp'),
            url('/images/impact.jpg')
          `,
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={elementRef} className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Nosso Impacto
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Números que salvam vidas
          </h2>
          <p className="text-lg text-white/80">
            Mais de três décadas de compromisso com a excelência no apoio
            ao Corpo de Bombeiros e à comunidade do Distrito Federal.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 50}ms` : '0ms', transitionDuration: '500ms' }}
            >
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <stat.icon size={28} />
              </div>

              <div className="text-4xl font-bold mb-2">{stat.value}</div>

              <div className="text-lg font-semibold mb-2">{stat.label}</div>

              <div className="text-sm text-white/80">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

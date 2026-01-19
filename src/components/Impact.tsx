import { TrendingUp, Users, Award, Calendar } from 'lucide-react';

export default function Impact() {
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
      value: '30+',
      label: 'Anos de Atuação',
      description: 'Apoiando quem salva vidas',
    },
  ];

  return (
    <section id="impacto" className="relative py-20 bg-gradient-to-br from-[#3d685d] to-[#3d685d] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5198239/pexels-photo-5198239.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
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
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all hover:scale-105"
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

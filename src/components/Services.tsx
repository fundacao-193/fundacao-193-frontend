import { GraduationCap, Flame, Users, Lightbulb, type LucideIcon } from 'lucide-react';
import impactImage from '../assets/images/impact.jpg';

export default function Services() {
  const stats: Array<{
    icon: LucideIcon;
    label: string;
    description: string;
  }> = [
    {
      icon: GraduationCap,
      label: 'Eventos Realizados',
      description: 'Fornecimento de equipamentos, tecnologia e recursos para aprimorar as operações de salvamento e combate a incêndios.',
    },
    {
      icon: Users,
      label: 'Profissionais Capacitados',
      description: 'Programas especializados de formação e aperfeiçoamento para bombeiros, com instrutores qualificados e estrutura moderna.',
    },
    {
      icon: Lightbulb,
      label: 'Projetos Apoiados',
      description: 'Organização de seminários, congressos e encontros técnicos para promover a troca de experiências e conhecimento.',
    },
    {
      icon: Flame,
      label: 'Anos de Atuação',
      description: 'Desenvolvimento de iniciativas voltadas à educação preventiva e conscientização da comunidade sobre segurança.',
    },
  ];

  return (
    <section id="areas" className="relative py-20 bg-gradient-to-br from-impact-start to-impact-end text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${impactImage})` }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Áreas de Atuação
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Como apoiamos o Corpo de Bombeiros
          </h2>
          <p className="text-lg text-white/80">
            Nossa atuação abrange diversas frentes estratégicas para fortalecer
            as operações e capacitar os profissionais que protegem a população.
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

              <div className="text-lg font-semibold mb-2">{stat.label}</div>

              <div className="text-sm text-white/80">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

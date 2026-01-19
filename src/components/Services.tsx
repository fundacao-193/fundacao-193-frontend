import { GraduationCap, Flame, Users, Lightbulb } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Flame,
      title: 'Apoio Operacional',
      description: 'Fornecimento de equipamentos, tecnologia e recursos para aprimorar as operações de salvamento e combate a incêndios.',
      color: 'from-[#3d685d] to-[#3d685d]',
    },
    {
      icon: GraduationCap,
      title: 'Capacitação e Treinamentos',
      description: 'Programas especializados de formação e aperfeiçoamento para bombeiros, com instrutores qualificados e estrutura moderna.',
      color: 'from-[#3d685d] to-[#3d685d]',
    },
    {
      icon: Users,
      title: 'Eventos Institucionais',
      description: 'Organização de seminários, congressos e encontros técnicos para promover a troca de experiências e conhecimento.',
      color: 'from-[#3d685d] to-[#3d685d]',
    },
    {
      icon: Lightbulb,
      title: 'Projetos Sociais',
      description: 'Desenvolvimento de iniciativas voltadas à educação preventiva e conscientização da comunidade sobre segurança.',
      color: 'from-[#3d685d] to-[#3d685d]',
    },
  ];

  return (
    <section id="areas" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-[#3d685d]/10 text-[#3d685d] px-4 py-2 rounded-full text-sm font-semibold mb-4">
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

              <button className="text-[#3d685d] font-semibold text-sm hover:gap-2 inline-flex items-center gap-1 transition-all group-hover:gap-2">
                Saiba mais
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ArrowLeft, Linkedin, Mail } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  level: 'executive' | 'director' | 'council';
}

interface Department {
  id: string;
  title: string;
  description: string;
  members: TeamMember[];
}

function OrgChartCard({ member, size = 'normal' }: { member: TeamMember; size?: 'large' | 'normal' | 'small' }) {
  const sizeClasses = {
    large: 'w-72',
    normal: 'w-60',
    small: 'w-52',
  };

  const imageHeightClasses = {
    large: 'h-36',
    normal: 'h-32',
    small: 'h-28',
  };

  return (
    <div className={`group ${sizeClasses[size]} mx-auto`}>
      <article className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-slate-200 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className={`relative overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 ${imageHeightClasses[size]}`}>
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="p-4 text-center">
          <h3 className="text-base font-bold text-neutral-900 mb-1 group-hover:text-primary transition-colors">
            {member.name}
          </h3>
          <p className="text-sm font-semibold text-primary mb-3">{member.role}</p>

          <div className="flex gap-2 justify-center pt-3 border-t border-slate-100">
            <a
              href="#"
              aria-disabled="true"
              tabIndex={-1}
              title="Perfil em breve"
              onClick={(e) => e.preventDefault()}
              className="text-neutral-400 opacity-50 cursor-not-allowed hover:opacity-75 transition-opacity"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:contato@fundacao193.org.br?subject=${encodeURIComponent(
                'Contato sobre ' + member.name,
              )}`}
              className="text-neutral-400 hover:text-primary transition-colors"
              title={`Enviar e-mail para ${member.name}`}
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

function VerticalConnector({ height = 'h-12' }: { height?: string }) {
  return <div className={`w-0.5 bg-gradient-to-b from-slate-300 to-slate-400 mx-auto ${height}`} />;
}

function TreeConnector({ branches = 3 }: { branches?: number }) {
  return (
    <div className="relative w-full h-16 my-4">
      <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gradient-to-b from-slate-300 to-slate-400 -translate-x-1/2" />

      <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />

      {Array.from({ length: branches }).map((_, idx) => {
        const position = `${((idx + 1) / (branches + 1)) * 100}%`;
        return (
          <div
            key={idx}
            className="absolute top-8 w-0.5 h-8 bg-gradient-to-b from-slate-400 to-slate-300"
            style={{ left: position, transform: 'translateX(-50%)' }}
          />
        );
      })}
    </div>
  );
}

export default function Team() {
  const executives: TeamMember[] = [
    {
      id: 'president',
      name: 'Presidente de Honra',
      role: 'Presidente de Honra',
      bio: 'Liderança institucional que inspira e orienta a atuação estratégica.',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=500&fit=crop',
      level: 'executive',
    },
    {
      id: 'ceo',
      name: 'Dr. Carlos Fernando',
      role: 'Presidente Executivo',
      bio: 'Profissional com ampla experiência em gestão estratégica e operações.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
      level: 'executive',
    },
  ];

  const directors: TeamMember[] = [
    {
      id: 'coo',
      name: 'Dra. Ana Paula Silva',
      role: 'Diretora de Operações',
      bio: 'Especialista em capacitação profissional e desenvolvimento organizacional.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
      level: 'director',
    },
    {
      id: 'cpo',
      name: 'Tenente Marcos Oliveira',
      role: 'Diretor de Projetos Especiais',
      bio: 'Oficial com expertise em planejamento estratégico e coordenação.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
      level: 'director',
    },
    {
      id: 'cio',
      name: 'Eng. Patricia Costa',
      role: 'Diretora de Infraestrutura',
      bio: 'Engenheira focada em modernização tecnológica e inovação.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
      level: 'director',
    },
  ];

  const departments: Department[] = [
    {
      id: 'board-curators',
      title: 'Conselho de Curadores',
      description:
        'Órgão máximo de governança, responsável por zelar pela missão institucional e pelos princípios da Fundação.',
      members: [
        {
          id: 'curator-1',
          name: 'Presidente do Conselho',
          role: 'Presidente',
          bio: 'Liderança e supervisão estratégica.',
          image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=500&fit=crop',
          level: 'council',
        },
        {
          id: 'curator-2',
          name: 'Membro do Conselho',
          role: 'Membro',
          bio: 'Governança institucional.',
          image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=500&h=500&fit=crop',
          level: 'council',
        },
        {
          id: 'curator-3',
          name: 'Membro do Conselho',
          role: 'Membro',
          bio: 'Conselheiro institucional.',
          image: 'https://images.unsplash.com/photo-1544723795-3fb0b90cff2f?w=500&h=500&fit=crop',
          level: 'council',
        },
        {
          id: 'curator-4',
          name: 'Membro do Conselho',
          role: 'Membro',
          bio: 'Representação e governança.',
          image: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=500&h=500&fit=crop',
          level: 'council',
        },
      ],
    },
    {
      id: 'board-fiscal',
      title: 'Conselho Fiscal',
      description: 'Responsável pela fiscalização econômico-financeira e pela transparência na aplicação dos recursos.',
      members: [
        {
          id: 'fiscal-1',
          name: 'Presidente do Conselho Fiscal',
          role: 'Presidente',
          bio: 'Supervisão fiscal e financeira.',
          image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=500&fit=crop',
          level: 'council',
        },
        {
          id: 'fiscal-2',
          name: 'Membro do Conselho Fiscal',
          role: 'Membro',
          bio: 'Fiscalização contábil.',
          image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=500&h=500&fit=crop',
          level: 'council',
        },
        {
          id: 'fiscal-3',
          name: 'Suplente do Conselho Fiscal',
          role: 'Suplente',
          bio: 'Apoio fiscal e financeiro.',
          image: 'https://images.unsplash.com/photo-1544723795-3fb0b90cff2f?w=500&h=500&fit=crop',
          level: 'council',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => window.location.hash = ''}
          className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium mb-8 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          aria-label="Voltar para página inicial"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Nossa Equipe</h1>
        <p className="text-xl text-neutral-600 mb-16">
          Profissionais dedicados e experientes comprometidos com a excelência e o impacto social.
        </p>

        <div className="mb-24 bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-lg">
          <div className="mb-8 text-center">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              Nível 1 - Presidência
            </span>
          </div>

          <OrgChartCard member={executives[0]} size="large" />

          <VerticalConnector />

          <div className="mb-8 text-center">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              Nível 2 - Presidência Executiva
            </span>
          </div>

          <OrgChartCard member={executives[1]} size="large" />

          <TreeConnector branches={3} />

          <div className="mb-8 text-center">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              Nível 3 - Diretoria Executiva
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {directors.map((member) => (
              <OrgChartCard key={member.id} member={member} size="normal" />
            ))}
          </div>
        </div>

        <div className="my-24 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Órgãos de Governança</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Conselhos independentes que garantem transparência, fiscalização e conformidade institucional.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {departments.map((dept) => (
              <section
                key={dept.id}
                className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="bg-gradient-to-r from-primary via-primary to-secondary p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {dept.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">{dept.description}</p>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {dept.members.map((member, idx) => (
                      <div key={member.id}>
                        <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-primary/30 hover:bg-slate-50 transition-all duration-300 group/item">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover rounded-lg group-hover/item:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-neutral-900 text-sm group-hover/item:text-primary transition-colors truncate">
                              {member.name}
                            </h4>
                            <p className="text-primary font-medium text-xs mb-1">{member.role}</p>
                            <p className="text-neutral-600 text-xs line-clamp-1">{member.bio}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <a
                              href="#"
                              aria-disabled="true"
                              tabIndex={-1}
                              title="Perfil em breve"
                              onClick={(e) => e.preventDefault()}
                              className="text-neutral-400 opacity-50 hover:opacity-75 transition-opacity"
                            >
                              <Linkedin size={14} />
                            </a>
                            <a
                              href={`mailto:contato@fundacao193.org.br?subject=${encodeURIComponent(
                                'Contato sobre ' + member.name,
                              )}`}
                              className="text-neutral-400 hover:text-primary transition-colors"
                              title={`Enviar e-mail para ${member.name}`}
                            >
                              <Mail size={14} />
                            </a>
                          </div>
                        </div>
                        {idx < dept.members.length - 1 && (
                          <div className="w-0.5 h-2 bg-slate-200 mx-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        <section className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Desenvolvimento Contínuo</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mb-8" />

          <p className="text-neutral-700 leading-relaxed mb-8 text-lg">
            Na Fundação 193, acreditamos que nosso maior ativo é nossa equipe. Por isso, investimos continuamente no
            desenvolvimento profissional e pessoal de cada membro da organização.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: 'Capacitação Profissional', desc: 'Programas contínuos e educação corporativa de excelência' },
              { title: 'Parcerias Acadêmicas', desc: 'Colaborações com instituições de ensino de renome' },
              { title: 'Mentoria Especializada', desc: 'Guia com especialistas internacionais e locais' },
              { title: 'Desenvolvimento de Carreira', desc: 'Oportunidades de crescimento e desenvolvimento pessoal' },
              { title: 'Bem-estar Integral', desc: 'Programa completo de qualidade de vida e saúde' },
              { title: 'Inclusão e Colaboração', desc: 'Ambiente inclusivo que valoriza diversidade e trabalho em equipe' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-5 rounded-lg bg-white border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 text-sm md:text-base mb-1">{item.title}</h3>
                  <p className="text-neutral-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

import { ArrowLeft, Building2, Users, Zap, ExternalLink } from 'lucide-react';

export default function OurPartnerships() {
  type PartnershipItem = {
    id: string;
    name: string;
    description: string;
    projects: string[];
    website?: string;
    logo?: string; // arquivo em /images/
    status?: 'validar' | 'ativo';
  };

  type PartnershipGroup = {
    category: string;
    icon: typeof Building2;
    description: string;
    items: PartnershipItem[];
  };

  const partnerGroups: PartnershipGroup[] = [
    {
      category: 'Parcerias Governamentais',
      icon: Building2,
      description:
        'Cooperação institucional com órgãos públicos para fortalecer ações, projetos e iniciativas de interesse social.',
      items: [
        {
          id: 'cbmdf',
          name: 'Corpo de Bombeiros Militar do Distrito Federal (CBMDF)',
          description:
            'Parceria institucional que orienta prioridades e apoia a execução de iniciativas ligadas ao fortalecimento das operações e à capacitação.',
          projects: ['Capacitações e treinamentos', 'Apoio a iniciativas de prevenção', 'Eventos institucionais'],
          status: 'ativo',
        },
        {
          id: 'defesa-civil',
          name: 'Defesa Civil',
          description:
            'Articulação para ações de prevenção e preparação, incluindo apoio a campanhas educativas e iniciativas de redução de riscos.',
          projects: ['Ações comunitárias e educativas', 'Integração em iniciativas de prevenção'],
          status: 'ativo',
        },
        {
          id: 'pmdf',
          name: 'Polícia Militar',
          description:
            'Cooperação para iniciativas conjuntas de interesse público e apoio a eventos e ações de segurança e bem-estar.',
          projects: ['Apoio a eventos institucionais', 'Ações integradas de interesse social'],
          status: 'ativo',
        },
        {
          id: 'cldf',
          name: 'Câmara Legislativa do Distrito Federal',
          description:
            'Relacionamento institucional para fortalecimento de iniciativas de transparência, governança e impacto social.',
          projects: ['Ações de transparência e governança', 'Apoio institucional a iniciativas sociais'],
          status: 'ativo',
        },
      ],
    },
    {
      category: 'Setor Privado',
      icon: Zap,
      description:
        'Parcerias com empresas e apoiadores para viabilizar projetos, fornecer recursos, serviços e tecnologia, e ampliar o impacto das ações.',
      items: [
        {
          id: 'egestor',
          name: 'uGestor',
          description: 'Apoio com soluções e serviços para fortalecer a gestão e a eficiência operacional.',
          projects: ['Suporte à gestão', 'Aprimoramento de processos'],
          website: 'https://www.ugestor.com.br/',
          logo: 'egestor.png',
          status: 'ativo',
        },
        {
          id: 'bonamix',
          name: 'Bona Mix Atacarejo',
          description: 'Apoio a iniciativas institucionais e ações de impacto social.',
          projects: ['Ações sociais e comunitárias', 'Apoio a campanhas e eventos'],
          website: 'https://bonamixatacarejo.com.br/',
          logo: 'bonamix.png',
          status: 'ativo',
        },
        {
          id: 'sasbio',
          name: 'SasBio',
          description: 'Colaboração com foco em soluções e insumos para projetos e ações institucionais.',
          projects: ['Apoio a projetos institucionais', 'Parceria técnica'],
          website: 'https://www.sasbio.com.br/',
          logo: 'sasbio.png',
          status: 'ativo',
        },
        {
          id: 'brasimpex',
          name: 'Brasimpex',
          description: 'Parceria voltada ao apoio institucional e a ações de fortalecimento da infraestrutura.',
          projects: ['Apoio a projetos estruturantes', 'Parceria em iniciativas institucionais'],
          logo: 'brasimpex.png',
          status: 'ativo',
        },
        {
          id: 'hospital-santa-marta',
          name: 'Hospital Santa Marta',
          description: 'Instituição de saúde parceira em iniciativas relacionadas à qualidade de vida e bem-estar.',
          projects: ['Ações de promoção de saúde', 'Apoio a campanhas institucionais'],
          logo: 'hospitalsantamaria.png',
          status: 'ativo',
        },
        {
          id: 'instituidor',
          name: 'Instituidor Pessoa Física: CEL. Lisandro Paixão dos Santos',
          description: 'Instituidor e apoiador da Fundação 193, fortalecendo sua base institucional.',
          projects: ['Apoio à estrutura institucional', 'Fomento à criação e consolidação da Fundação 193'],
          logo: 'instituidor.png',
          status: 'ativo',
        },
      ],
    },
    {
      category: 'Organizações Sociais, Academia e Associações',
      icon: Users,
      description:
        'Articulação com ONGs, universidades, associações e outras fundações para ações comunitárias, educação preventiva e projetos conjuntos.',
      items: [
        {
          id: 'ongs',
          name: 'Organizações Sociais (ONGs)',
          description:
            'Parcerias para ampliar alcance e capilaridade de ações comunitárias e educativas.',
          projects: ['Educação preventiva', 'Conscientização', 'Ações comunitárias'],
          status: 'ativo',
        },
        {
          id: 'universidades',
          name: 'Universidades e instituições de ensino',
          description:
            'Colaborações para desenvolvimento de pesquisas aplicadas, cursos e iniciativas de capacitação.',
          projects: ['Formação técnica', 'Seminários', 'Workshops'],
          status: 'ativo',
        },
        {
          id: 'associacoes',
          name: 'Associações e entidades representativas',
          description:
            'Cooperação com associações para ações de interesse público e iniciativas alinhadas à missão institucional.',
          projects: ['Projetos conjuntos', 'Campanhas e iniciativas sociais'],
          status: 'ativo',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => window.location.hash = ''}
          className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium mb-8 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          aria-label="Voltar para página inicial"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Parcerias Estratégicas</h1>
        <p className="text-xl text-neutral-600 mb-16">
          O trabalho da Fundação 193 é fortalecido por parcerias. Nesta página, organizamos as colaborações por categoria, com informações sobre cada parceria e exemplos de projetos conjuntos, conforme as boas práticas de transparência institucional.
        </p>

        <div className="space-y-10 mb-16">
          {partnerGroups.map((group) => {
            const Icon = group.icon;
            return (
              <section key={group.category} className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
                <div className="p-8 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-icon-bg rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold text-neutral-900">{group.category}</h2>
                      <p className="text-neutral-600 mt-1">{group.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-6">
                  {group.items.map((item) => {
                    const logoSrc = item.logo ? `/images/${item.logo}` : '';
                    return (
                      <article
                        key={item.id}
                        className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h3 className="text-lg font-bold text-neutral-900 truncate">{item.name}</h3>
                            <p className="text-sm text-neutral-600 mt-1">{item.description}</p>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {item.status === 'validar' && (
                              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                                Validar
                              </span>
                            )}
                            {item.website && (
                              <a
                                href={item.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
                                aria-label={`Visitar site de ${item.name}`}
                                title="Abrir site"
                              >
                                Site
                                <ExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        </div>

                        {logoSrc ? (
                          <div className="mt-5 bg-white border border-slate-100 rounded-lg p-4 flex items-center justify-center">
                            <img
                              src={logoSrc}
                              alt={`Logo ${item.name}`}
                              className="h-14 w-auto object-contain"
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        ) : null}

                        <div className="mt-5">
                          <p className="text-sm font-semibold text-neutral-900 mb-2">Projetos conjuntos</p>
                          <ul className="space-y-2">
                            {item.projects.map((p) => (
                              <li key={p} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm text-neutral-600">{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Benefícios das Parcerias</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">Compartilhamento de Expertise</p>
                  <p className="text-sm text-neutral-600">Acesso a conhecimento especializado e melhores práticas globais</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">Sinergia de Recursos</p>
                  <p className="text-sm text-neutral-600">Otimização e potencialização de investimentos conjuntos</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">Inovação Tecnológica</p>
                  <p className="text-sm text-neutral-600">Acesso a soluções inovadoras e tecnologia de ponta</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">Alcance Ampliado</p>
                  <p className="text-sm text-neutral-600">Expansão de atuação e impacto em diferentes regiões</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-hover rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Proposta de Parceria</h2>
            <p className="leading-relaxed mb-6">
              Estamos sempre abertos a novas parcerias estratégicas alinhadas à missão e aos valores da Fundação 193.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <p className="font-semibold mb-2">Tipos de Parcerias:</p>
                <ul className="list-disc list-inside text-opacity-90 space-y-1">
                  <li>Governamentais</li>
                  <li>Setor privado</li>
                  <li>Organizações sociais (ONGs)</li>
                  <li>Universidades e associações</li>
                </ul>
              </div>
            </div>
            <a
              href="#contato"
              className="w-full inline-flex items-center justify-center px-6 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
            >
              Propor Parceria
            </a>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Transparência nas Parcerias</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h4 className="text-lg font-bold text-neutral-900 mb-2">Logos, descrição e projetos conjuntos</h4>
              <p className="text-neutral-600">
                Cada parceria deve apresentar, sempre que possível, o logotipo, a descrição do vínculo e exemplos de projetos realizados em conjunto, reforçando a credibilidade e a rastreabilidade das ações.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h4 className="text-lg font-bold text-neutral-900 mb-2">Empresas específicas (não genérico)</h4>
              <p className="text-neutral-600">
                Para o setor privado, a lista deve priorizar empresas específicas (e não categorias genéricas), com detalhes do apoio prestado e resultados quando aplicável.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h4 className="text-lg font-bold text-neutral-900 mb-2">Atualização contínua</h4>
              <p className="text-neutral-600">
                Esta página é atualizada conforme novas parcerias são formalizadas e publicadas nos canais oficiais da Fundação 193.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import { ArrowLeft, Flame, Building2, Users, Leaf } from 'lucide-react';

export default function Projects({ onNavigate }: { onNavigate: (page: string | null) => void }) {
  const projects = [
    {
      icon: Flame,
      title: 'Centro de Treinamento Avançado',
      description: 'Instalação de última geração para capacitação em combate a incêndios, resgate avançado e gerenciamento de crises.',
      impact: '500+ profissionais treinados anualmente',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: Building2,
      title: 'Modernização de Infraestrutura',
      description: 'Reforma e equipagem de quartéis, aquisição de viaturas de última geração e sistemas de comunicação integrados.',
      impact: '15 unidades modernizadas',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Users,
      title: 'Educação Comunitária em Prevenção',
      description: 'Programas de educação em segurança preventiva, primeiros socorros e convivência com risco em escolas e comunidades.',
      impact: '50.000+ pessoas impactadas',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Leaf,
      title: 'Sustentabilidade e Responsabilidade Social',
      description: 'Projetos ambientais, inclusão social e desenvolvimento de comunidades vulneráveis através de parcerias estratégicas.',
      impact: '20+ comunidades beneficiadas',
      color: 'bg-emerald-100 text-emerald-600',
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

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Nossos Projetos</h1>
        <p className="text-xl text-neutral-600 mb-16">
          Iniciativas estratégicas que transformam a capacidade operacional e o impacto social do CBMDF.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div key={project.title} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 ${project.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">{project.title}</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">{project.description}</p>
                <div className="border-t border-neutral-200 pt-4">
                  <p className="text-[#3d685d] font-semibold">{project.impact}</p>
                </div>
              </div>
            );
          })}
        </div>

        <section className="bg-white rounded-2xl p-8 shadow-md mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Projetos em Desenvolvimento</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#3d685d] pl-6">
              <h4 className="text-xl font-bold text-neutral-900 mb-2">Plataforma Digital de Gerenciamento de Emergências</h4>
              <p className="text-neutral-600">Sistema integrado para otimização de respostas, análise de dados em tempo real e coordenação inter-agências.</p>
            </div>
            <div className="border-l-4 border-[#3d685d] pl-6">
              <h4 className="text-xl font-bold text-neutral-900 mb-2">Centro de Pesquisa e Inovação</h4>
              <p className="text-neutral-600">Laboratório dedicado a pesquisa de novas tecnologias, metodologias de resgate e equipamentos especializados.</p>
            </div>
            <div className="border-l-4 border-[#3d685d] pl-6">
              <h4 className="text-xl font-bold text-neutral-900 mb-2">Parcerias Internacionais de Cooperação Técnica</h4>
              <p className="text-neutral-600">Colaboração com instituições internacionais para compartilhamento de expertise e melhores práticas globais.</p>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-[#3d685d] to-[#2f5349] rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Como Contribuir com Nossos Projetos</h3>
          <p className="leading-relaxed mb-6">
            A Fundação 193 depende do apoio de parceiros privados, públicos e da sociedade civil para executar seus projetos. Existem várias formas de contribuir:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Investimentos diretos em projetos específicos</li>
            <li>Patrocínio de eventos e capacitações</li>
            <li>Doações de equipamentos e tecnologia</li>
            <li>Parcerias técnicas e consultoria</li>
            <li>Programas de voluntariado corporativo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import { ArrowLeft, Target, Heart, Lightbulb, Users, Shield, Zap } from 'lucide-react';

export default function MissionValues() {
  const values = [
    {
      icon: Target,
      title: 'Excelência',
      description: 'Buscamos a excelência em todas as nossas ações, estabelecendo padrões elevados de qualidade e desempenho.',
    },
    {
      icon: Heart,
      title: 'Humanidade',
      description: 'Colocamos as pessoas no centro de nossas decisões, promovendo dignidade, respeito e solidariedade.',
    },
    {
      icon: Lightbulb,
      title: 'Inovação',
      description: 'Estimulamos a criatividade e a busca contínua por soluções inovadoras e transformadoras.',
    },
    {
      icon: Users,
      title: 'Colaboração',
      description: 'Acreditamos no poder da parceria e trabalho em equipe para alcançar objetivos maiores.',
    },
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Priorizamos a segurança das pessoas e comunidades, implementando as melhores práticas e protocolos.',
    },
    {
      icon: Zap,
      title: 'Eficiência',
      description: 'Otimizamos recursos e processos para maximizar o impacto de nossas operações e investimentos.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => window.location.hash = ''}
          className="flex items-center gap-2 text-[#3d685d] hover:text-[#2f5349] font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">Missão e Valores</h1>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Nossa Missão</h2>
          <div className="bg-white rounded-2xl p-8 shadow-md border-l-4 border-[#3d685d]">
            <p className="text-lg text-neutral-700 leading-relaxed">
              Apoiar, fortalecer e potencializar as atividades do Corpo de Bombeiros Militar do Distrito Federal através de investimentos em capacitação profissional, modernização de infraestrutura, pesquisa e inovação, promovendo segurança e bem-estar para a população e comunidades do Distrito Federal.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Nossa Visão</h2>
          <div className="bg-white rounded-2xl p-8 shadow-md border-l-4 border-[#3d685d]">
            <p className="text-lg text-neutral-700 leading-relaxed">
              Ser reconhecida como a instituição de apoio mais inovadora, eficiente e comprometida com a excelência operacional dos bombeiros, sendo referência em prevenção, resposta e gestão de risco no Brasil e na América Latina.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Nossos Valores</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#3d685d] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">{value.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

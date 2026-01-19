import { ArrowLeft, Globe, Building2, Users, Zap } from 'lucide-react';

export default function OurPartnerships({ onNavigate }: { onNavigate: (page: string | null) => void }) {
  const partners = [
    {
      category: 'Instituições Governamentais',
      icon: Building2,
      items: [
        'Corpo de Bombeiros Militar do Distrito Federal',
        'Secretaria de Estado de Segurança Pública',
        'Defesa Civil do Distrito Federal',
        'Polícia Militar do Distrito Federal',
      ],
    },
    {
      category: 'Organizações Internacionais',
      icon: Globe,
      items: [
        'International Association of Fire Chiefs (IAFC)',
        'United Nations Office for Disaster Risk Reduction (UNDRR)',
        'International Fire Service Training Association (IFSTA)',
        'Pan American Health Organization (PAHO)',
      ],
    },
    {
      category: 'Setor Privado',
      icon: Zap,
      items: [
        'Grandes empresas de tecnologia e inovação',
        'Fornecedores de equipamentos especializados',
        'Empresas de consultoria e gestão',
        'Fabricantes de veículos e máquinas',
      ],
    },
    {
      category: 'Organizações Sociais',
      icon: Users,
      items: [
        'ONGs de responsabilidade social',
        'Instituições educacionais e universidades',
        'Associações comunitárias',
        'Fundações de interesse público',
      ],
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

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Parcerias Estratégicas</h1>
        <p className="text-xl text-neutral-600 mb-16">
          Colaborações com instituições nacionais e internacionais para potencializar impacto e inovação.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {partners.map((partnerGroup) => {
            const Icon = partnerGroup.icon;
            return (
              <div key={partnerGroup.category} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#3d685d] rounded-lg flex items-center justify-center">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">{partnerGroup.category}</h3>
                </div>
                <ul className="space-y-3">
                  {partnerGroup.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#3d685d] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Benefícios das Parcerias</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 bg-[#3d685d] rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">Compartilhamento de Expertise</p>
                  <p className="text-sm text-neutral-600">Acesso a conhecimento especializado e melhores práticas globais</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 bg-[#3d685d] rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">Sinergia de Recursos</p>
                  <p className="text-sm text-neutral-600">Otimização e potencialização de investimentos conjuntos</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 bg-[#3d685d] rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">Inovação Tecnológica</p>
                  <p className="text-sm text-neutral-600">Acesso a soluções inovadoras e tecnologia de ponta</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3 h-3 bg-[#3d685d] rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">Alcance Ampliado</p>
                  <p className="text-sm text-neutral-600">Expansão de atuação e impacto em diferentes regiões</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#3d685d] to-[#2f5349] rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Proposta de Parceria</h2>
            <p className="leading-relaxed mb-6">
              Estamos sempre abertos a novas parcerias estratégicas que estejam alinhadas com nossa missão e valores.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <p className="font-semibold mb-2">Tipos de Parcerias:</p>
                <ul className="list-disc list-inside text-opacity-90 space-y-1">
                  <li>Cooperação Técnica</li>
                  <li>Patrocínio de Programas</li>
                  <li>Fornecimento de Serviços</li>
                  <li>Desenvolvimento Conjunto</li>
                </ul>
              </div>
            </div>
            <button className="w-full px-6 py-2 bg-white text-[#3d685d] rounded-lg font-semibold hover:bg-neutral-100 transition-colors">
              Propor Parceria
            </button>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Histórico de Parcerias Bem-Sucedidas</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#3d685d] pl-6">
              <h4 className="text-lg font-bold text-neutral-900 mb-2">Modernização de Frota (2022-2023)</h4>
              <p className="text-neutral-600">Parceria com fabricante internacional resultou na aquisição de 8 viaturas de última geração, aumentando capacidade operacional em 40%.</p>
            </div>
            <div className="border-l-4 border-[#3d685d] pl-6">
              <h4 className="text-lg font-bold text-neutral-900 mb-2">Centro de Excelência (2021-2022)</h4>
              <p className="text-neutral-600">Cooperação técnica com universidade internacional para criação de programa especializado em gestão de crises.</p>
            </div>
            <div className="border-l-4 border-[#3d685d] pl-6">
              <h4 className="text-lg font-bold text-neutral-900 mb-2">Programa Comunitário (2020-Presente)</h4>
              <p className="text-neutral-600">Aliança com 15 ONGs locais para capacitação de 50.000+ pessoas em prevenção de incêndios e primeiros socorros.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

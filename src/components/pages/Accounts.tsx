import { ArrowLeft, Download, TrendingUp, BarChart3 } from 'lucide-react';

export default function Accounts({ onNavigate }: { onNavigate: (page: string | null) => void }) {
  const reports = [
    {
      year: 2023,
      documents: [
        { name: 'Relatório Financeiro Anual', size: '2.4 MB' },
        { name: 'Balanço Patrimonial', size: '1.2 MB' },
        { name: 'Demonstrativo de Resultado', size: '890 KB' },
        { name: 'Relatório de Auditoria Independente', size: '1.8 MB' },
      ],
    },
    {
      year: 2022,
      documents: [
        { name: 'Relatório Financeiro Anual', size: '2.3 MB' },
        { name: 'Balanço Patrimonial', size: '1.1 MB' },
        { name: 'Demonstrativo de Resultado', size: '850 KB' },
        { name: 'Relatório de Auditoria Independente', size: '1.7 MB' },
      ],
    },
    {
      year: 2021,
      documents: [
        { name: 'Relatório Financeiro Anual', size: '2.2 MB' },
        { name: 'Balanço Patrimonial', size: '1.0 MB' },
        { name: 'Demonstrativo de Resultado', size: '800 KB' },
        { name: 'Relatório de Auditoria Independente', size: '1.6 MB' },
      ],
    },
  ];

  const financialMetrics = [
    { label: 'Receita Total (2023)', value: 'R$ 15.2 M' },
    { label: 'Investimentos Realizados', value: 'R$ 12.8 M' },
    { label: 'Projetos Financiados', value: '47' },
    { label: 'Taxa de Transparência', value: '98%' },
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

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Prestação de Contas</h1>
        <p className="text-xl text-neutral-600 mb-12">
          Transparência financeira e prestação de contas de todas as atividades da Fundação 193.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {financialMetrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded-xl p-6 shadow-md">
              <p className="text-neutral-600 text-sm font-medium mb-2">{metric.label}</p>
              <p className="text-3xl font-bold text-[#3d685d]">{metric.value}</p>
            </div>
          ))}
        </div>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 size={28} className="text-[#3d685d]" />
            <h2 className="text-3xl font-bold text-neutral-900">Relatórios Financeiros por Ano</h2>
          </div>

          <div className="space-y-8">
            {reports.map((report) => (
              <div key={report.year} className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Ano {report.year}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {report.documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-neutral-900">{doc.name}</p>
                        <p className="text-sm text-neutral-500">{doc.size}</p>
                      </div>
                      <button className="text-[#3d685d] hover:text-[#2f5349] transition-colors">
                        <Download size={22} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp size={24} className="text-[#3d685d]" />
              <h3 className="text-2xl font-bold text-neutral-900">Política de Alocação de Recursos</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed mb-6">
              A Fundação 193 segue rigorosa política de alocação de recursos, garantindo máxima eficiência:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#3d685d] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">60% - Projetos e Capacitação</p>
                  <p className="text-sm text-neutral-600">Investimento direto em programas de impacto</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#3d685d] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">20% - Infraestrutura e Equipamentos</p>
                  <p className="text-sm text-neutral-600">Manutenção e modernização de recursos</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#3d685d] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">15% - Administração</p>
                  <p className="text-sm text-neutral-600">Custos operacionais e gestão</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#3d685d] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">5% - Contingência</p>
                  <p className="text-sm text-neutral-600">Reserva para situações emergenciais</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#3d685d] to-[#2f5349] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Certificações e Auditorias</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Auditoria Independente Anual</p>
                <p className="text-opacity-80 text-sm">Realizada por firma auditora externa certificada</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Conformidade com Lei 12.527/2011</p>
                <p className="text-opacity-80 text-sm">Lei de Acesso à Informação - 100% compliante</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Certificação ISO 9001:2015</p>
                <p className="text-opacity-80 text-sm">Gestão de Qualidade</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Registro no CNAS</p>
                <p className="text-opacity-80 text-sm">Conselho Nacional de Assistência Social</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-md">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Informações de Contato para Dúvidas</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-semibold text-neutral-900 mb-2">Departamento Financeiro</p>
              <p className="text-neutral-600 mb-2">Email: financeiro@fundacao193.org.br</p>
              <p className="text-neutral-600">Telefone: (61) 3321-3000 ramal 105</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900 mb-2">Assessoria Jurídica e Conformidade</p>
              <p className="text-neutral-600 mb-2">Email: juridico@fundacao193.org.br</p>
              <p className="text-neutral-600">Telefone: (61) 3321-3000 ramal 110</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

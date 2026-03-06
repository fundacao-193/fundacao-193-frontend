// import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download, TrendingUp, BarChart3 } from 'lucide-react';
import PageLoader from '../PageLoader';
// import { fetchPrestacaoContas } from '../../services/api';
// import type { Documento } from '../../types/documents';
// import { formatFileSize } from '../../utils/format';

export default function Accounts() {
  // ============================================================================
  // CÓDIGO PRONTO PARA API - COMENTADO ATÉ WORDPRESS HEADLESS ESTAR PRONTO
  // ============================================================================
  // const [contas, setContas] = useState<Documento[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const hasFetched = useRef(false);
  
  // Descomente a linha abaixo quando descomentar o código de API
  // if (loading) return <PageLoader message="Carregando relatórios..." />;

  // useEffect(() => {
  //   if (hasFetched.current) return;
  //   hasFetched.current = true;
  //   
  //   async function loadContas() {
  //     try {
  //       const data = await fetchPrestacaoContas();
  //       setContas(data);
  //     } catch (err) {
  //       setError('Não conseguimos carregar os relatórios. Tente novamente mais tarde.');
  //       console.error('Erro ao carregar prestação de contas:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   loadContas();
  // }, []);

  // // Agrupar prestações de contas por ano (extrair de data_publicacao Ymd)
  // const groupedByYear = contas.reduce((acc, conta) => {
  //   const dateStr = conta.acf?.data_publicacao;
  //   const year = dateStr ? parseInt(dateStr.substring(0, 4)) : new Date().getFullYear();
  //   if (!acc[year]) acc[year] = [];
  //   acc[year].push(conta);
  //   return acc;
  // }, {} as Record<number, Documento[]>);

  // // Ordenar anos em ordem decrescente
  // const sortedYears = Object.keys(groupedByYear)
  //   .map(Number)
  //   .sort((a, b) => b - a);
  // ============================================================================

  // PLACEHOLDER ESTÁTICO (remover quando API estiver pronta)
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
    { label: 'Relatórios Financeiros Publicados', value: 'Em construção' },
    { label: 'Projetos Financiados', value: 'Em atualização' },
    { label: 'Indicadores de Impacto', value: 'Em consolidação' },
    { label: 'Compromisso com a Transparência', value: 'Permanente' },
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

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Transparência e Prestação de Contas</h1>
        <p className="text-xl text-neutral-600 mb-12">
          A Fundação 193 preza pela transparência na gestão dos recursos, pela divulgação dos resultados e pela governança institucional, em alinhamento às melhores práticas de fundações nacionais e internacionais.
        </p>

        {/* ====================================================================== */}
        {/* LOADING/ERROR STATES - DESCOMENTAR QUANDO API ESTIVER PRONTA */}
        {/* ====================================================================== */}
        {/* {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-neutral-600">Carregando relatórios...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-16 bg-red-50 rounded-xl p-8">
            <p className="text-red-600 mb-4 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )} */}

        {/* ====================================================================== */}
        {/* PLACEHOLDER ATUAL - REMOVER QUANDO API ESTIVER PRONTA */}
        {/* ====================================================================== */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {financialMetrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded-xl p-6 shadow-md">
              <p className="text-neutral-600 text-sm font-medium mb-2">{metric.label}</p>
              <p className="text-3xl font-bold text-primary">{metric.value}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-neutral-500 mb-12">
          Os números apresentados nesta área são ilustrativos e serão substituídos pelos dados oficiais da Fundação 193, garantindo informações reais, auditáveis e em conformidade com as exigências legais.
        </p>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 size={28} className="text-icon-fg" />
        {/* ====================================================================== */}
        {/* RENDERIZAR DADOS DA API - DESCOMENTAR QUANDO ESTIVER PRONTA */}
        {/* ====================================================================== */}
        {/* {!loading && !error && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 size={28} className="text-icon-fg" />
              <h2 className="text-3xl font-bold text-neutral-900">Relatórios Financeiros por Ano</h2>
            </div>

            <div className="space-y-8">
              {sortedYears.map((year) => {
                const yearDocs = groupedByYear[year];
                return (
                  <div key={year} className="bg-white rounded-xl p-8 shadow-md">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-6">Ano {year}</h3>
                    <div className="space-y-4">
                      {yearDocs.map((doc) => {
                        const file = doc.acf?.arquivo_pdf;
                        const fileSize = file?.filesize
                          ? formatFileSize(file.filesize)
                          : 'N/A';

                        return (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-neutral-900 truncate">
                                {doc.title.rendered}
                              </p>
                              <p className="text-sm text-neutral-500">{fileSize}</p>
                            </div>
                            {file?.url ? (
                              <a
                                href={file.url}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary-hover transition-colors ml-3 flex-shrink-0"
                                aria-label={`Baixar ${doc.title.rendered}`}
                                title="Baixar relatório"
                              >
                                <Download size={22} />
                              </a>
                            ) : (
                              <span className="text-neutral-400 opacity-60 ml-3 flex-shrink-0" title="Arquivo não disponível">
                                <Download size={22} />
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )} */}

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
                      <button className="text-primary hover:text-primary-hover transition-colors">
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
              <TrendingUp size={24} className="text-icon-fg" />
              <h3 className="text-2xl font-bold text-neutral-900">Política de Alocação de Recursos</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed mb-6">
              A Fundação 193 segue rigorosa política de alocação de recursos, garantindo máxima eficiência:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">60% - Projetos e Capacitação</p>
                  <p className="text-sm text-neutral-600">Investimento direto em programas de impacto</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">20% - Infraestrutura e Equipamentos</p>
                  <p className="text-sm text-neutral-600">Manutenção e modernização de recursos</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">15% - Administração</p>
                  <p className="text-sm text-neutral-600">Custos operacionais e gestão</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-neutral-900">5% - Contingência</p>
                  <p className="text-sm text-neutral-600">Reserva para situações emergenciais</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-hover rounded-2xl p-8 text-white">
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
              <p className="text-neutral-600">Telefone: (61) 99382-3763</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

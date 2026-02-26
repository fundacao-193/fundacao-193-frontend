// ==============================================================================
// IMPORTS - Descomentar quando ativar API
// ==============================================================================
// import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, FileText, Download } from 'lucide-react';
// import { fetchEditais } from '../../services/api';
// import type { Documento } from '../../types/documents';
// import { formatFileSize, formatDate } from '../../utils/format';

export default function Edits() {
  // ============================================================================
  // CÓDIGO PRONTO PARA API - DESCOMENTAR QUANDO WORDPRESS ESTIVER PRONTO
  // ============================================================================
  // const [editais, setEditais] = useState<Documento[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const hasFetched = useRef(false);

  // useEffect(() => {
  //   if (hasFetched.current) return;
  //   hasFetched.current = true;
  //   
  //   async function loadEditais() {
  //     try {
  //       const data = await fetchEditais();  // Já filtra por tipo_documento = 'edital'
  //       setEditais(data);
  //     } catch (err) {
  //       setError('Não conseguimos carregar os editais. Tente novamente mais tarde.');
  //       console.error('Erro ao carregar editais:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   loadEditais();
  // }, []);

  // // Agrupar editais por ano (extrai ano da data de publicação)
  // const groupedByYear = editais.reduce((acc, edital) => {
  //   const dateStr = edital.acf?.data_publicacao || edital.date;
  //   const year = dateStr ? parseInt(dateStr.substring(0, 4)) : new Date().getFullYear();
  //   if (!acc[year]) acc[year] = [];
  //   acc[year].push(edital);
  //   return acc;
  // }, {} as Record<number, Documento[]>);

  // // Ordenar anos em ordem decrescente
  // const sortedYears = Object.keys(groupedByYear)
  //   .map(Number)
  //   .sort((a, b) => b - a);

  // // Encontrar edital em destaque (primeiro com status Aberto)
  // const featuredEdit = editais.find(e => e.acf?.status_edital === 'Aberto');

  // // Helper para formatar data Ymd → dd/mm/yyyy
  // const formatYmdDate = (ymd?: string): string => {
  //   if (!ymd || ymd.length !== 8) return '';
  //   const year = ymd.substring(0, 4);
  //   const month = ymd.substring(4, 6);
  //   const day = ymd.substring(6, 8);
  //   return `${day}/${month}/${year}`;
  // };
  // ============================================================================

  // PLACEHOLDER ESTÁTICO (remover quando API estiver pronta)
  const edits = [
    {
      year: 2024,
      items: [
        {
          title: 'Edital de Seleção de Projetos',
          description: 'Chamada pública para apresentação de projetos inovadores em segurança pública',
          date: 'Publicado em: 15/01/2024',
          status: 'Aberto',
        },
        {
          title: 'Edital de Contratação de Consultores',
          description: 'Processo de seleção para contratação de consultores especializados',
          date: 'Publicado em: 10/01/2024',
          status: 'Encerrado',
        },
      ],
    },
    {
      year: 2023,
      items: [
        {
          title: 'Edital de Fornecimento de Equipamentos',
          description: 'Seleção de fornecedores para equipamentos de treinamento especializado',
          date: 'Publicado em: 20/12/2023',
          status: 'Encerrado',
        },
        {
          title: 'Edital de Bolsas de Pós-Graduação',
          description: 'Programa de apoio a profissionais em especialização e mestrado',
          date: 'Publicado em: 01/11/2023',
          status: 'Encerrado',
        },
        {
          title: 'Edital de Pesquisa e Inovação',
          description: 'Edital para desenvolvimento de pesquisas aplicadas em segurança',
          date: 'Publicado em: 15/08/2023',
          status: 'Encerrado',
        },
      ],
    },
    {
      year: 2022,
      items: [
        {
          title: 'Edital de Seleção de Parceiros',
          description: 'Processo de seleção de instituições para parcerias estratégicas',
          date: 'Publicado em: 10/05/2022',
          status: 'Encerrado',
        },
        {
          title: 'Edital de Modernização de Infraestrutura',
          description: 'Chamada para projetos de melhoria de instalações e equipamentos',
          date: 'Publicado em: 20/03/2022',
          status: 'Encerrado',
        },
      ],
    },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'Aberto') {
      return 'bg-green-100 text-green-700';
    }
    return 'bg-neutral-100 text-neutral-600';
  };

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

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Editais</h1>
        <p className="text-xl text-neutral-600 mb-16">
          Chamadas públicas, seleções e oportunidades de participação em programas da Fundação 193.
        </p>

        {/* ====================================================================== */}
        {/* LOADING/ERROR STATES - DESCOMENTAR QUANDO API ESTIVER PRONTA */}
        {/* ====================================================================== */}
        {/* {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-neutral-600">Carregando editais...</p>
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
        {/* EDITAL EM DESTAQUE - DESCOMENTAR QUANDO API ESTIVER PRONTA */}
        {/* ====================================================================== */}
        {/* {!loading && !error && featuredEdit && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8 bg-white rounded-xl p-6 shadow-md">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-700 font-bold">!</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-neutral-900">{featuredEdit.title.rendered}</p>
                <p className="text-sm text-neutral-600">
                  {featuredEdit.acf?.descricao_curta || ''}
                </p>
              </div>
              {featuredEdit.acf?.arquivo_pdf?.url && (
                <a
                  href={featuredEdit.acf.arquivo_pdf.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors"
                >
                  Acessar
                </a>
              )}
            </div>
          </div>
        )} */}

        {/* ====================================================================== */}
        {/* PLACEHOLDER ATUAL - REMOVER QUANDO API ESTIVER PRONTA */}
        {/* ====================================================================== */}

        <div className="mb-12">
        {/* ====================================================================== */}
        {/* RENDERIZAR DADOS DA API - DESCOMENTAR QUANDO ESTIVER PRONTA */}
        {/* ====================================================================== */}
        {/* {!loading && !error && (
          <div className="space-y-12">
            {sortedYears.map((year) => {
              const yearEdits = groupedByYear[year];
              return (
                <section key={year}>
                  <h2 className="text-3xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                    <Calendar size={28} className="text-icon-fg" />
                    Ano {year}
                  </h2>
                  <div className="space-y-4">
                    {yearEdits.map((edital) => {
                      const file = edital.acf?.arquivo_pdf; // Arquivo principal documento
                      const status = edital.acf?.status_edital || 'Encerrado';
                      const publishDate = edital.acf?.data_publicacao
                        ? `Publicado em: ${formatYmdDate(edital.acf.data_publicacao)}`
                        : '';

                      return (
                        <div
                          key={edital.id}
                          className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <FileText size={20} className="text-icon-fg" />
                                <h4 className="text-lg font-bold text-neutral-900">
                                  {edital.title.rendered}
                                </h4>
                              </div>
                              {edital.acf?.descricao_curta && (
                                <p className="text-neutral-600 mb-3">{edital.acf.descricao_curta}</p>
                              )}
                              {publishDate && (
                                <p className="text-sm text-neutral-500">{publishDate}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                  status === 'Aberto' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-neutral-100 text-neutral-600'
                                }`}
                              >
                                {status}
                              </span>
                              {file?.url ? (
                                <a
                                  href={file.url}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:text-primary-hover transition-colors"
                                  aria-label={`Baixar ${edital.title.rendered}`}
                                  title="Baixar edital"
                                >
                                  <Download size={20} />
                                </a>
                              ) : (
                                <span className="text-neutral-400 opacity-60" title="Arquivo não disponível">
                                  <Download size={20} />
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )} */}

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-700 font-bold">!</span>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Edital Aberto</p>
              <p className="text-sm text-neutral-600">Edital de Seleção de Projetos 2024</p>
            </div>
            <button className="ml-auto px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors">
              Acessar
            </button>
          </div>
        </div>

        <div className="space-y-12">
          {edits.map((yearGroup) => (
            <section key={yearGroup.year}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <Calendar size={28} className="text-icon-fg" />
                Ano {yearGroup.year}
              </h2>
              <div className="space-y-4">
                {yearGroup.items.map((edit) => (
                  <div
                    key={edit.title}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText size={20} className="text-icon-fg" />
                          <h4 className="text-lg font-bold text-neutral-900">{edit.title}</h4>
                        </div>
                        <p className="text-neutral-600 mb-3">{edit.description}</p>
                        <p className="text-sm text-neutral-500">{edit.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                            edit.status
                          )}`}
                        >
                          {edit.status}
                        </span>
                        <button className="text-neutral-400 hover:text-primary transition-colors">
                          <Download size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 bg-gradient-to-r from-primary to-primary-hover rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">Como Participar de Nossos Editais</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Passo 1: Consulte os Requisitos</h4>
              <p className="text-opacity-90 leading-relaxed">
                Leia cuidadosamente o edital e verifique se sua instituição ou projeto atende aos critérios de elegibilidade.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Passo 2: Prepare a Documentação</h4>
              <p className="text-opacity-90 leading-relaxed">
                Reúna todos os documentos necessários conforme listado no edital (CNPJ, comprovantes, plano de trabalho, etc).
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Passo 3: Submeta Sua Proposta</h4>
              <p className="text-opacity-90 leading-relaxed">
                Envie sua proposta pelos canais indicados antes da data limite de inscrição.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Passo 4: Acompanhe o Processo</h4>
              <p className="text-opacity-90 leading-relaxed">
                Monitore o status da sua proposta através do portal da Fundação 193.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-white rounded-2xl p-8 shadow-md">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Dúvidas Frequentes</h3>
          <div className="space-y-6">
            <div className="border-b border-neutral-200 pb-6 last:border-0">
              <h4 className="font-bold text-neutral-900 mb-2">Quando são publicados novos editais?</h4>
              <p className="text-neutral-600">
                Publicamos editais regularmente ao longo do ano, conforme a necessidade de novos projetos e parcerias. Recomendamos se inscrever em nossa newsletter para receber notificações.
              </p>
            </div>
            <div className="border-b border-neutral-200 pb-6 last:border-0">
              <h4 className="font-bold text-neutral-900 mb-2">Qual é a documentação necessária?</h4>
              <p className="text-neutral-600">
                A documentação varia conforme o edital. Cada chamada especifica exatamente o que é necessário. Todos os editais disponibilizam modelos e templates.
              </p>
            </div>
            <div className="border-b border-neutral-200 pb-6 last:border-0">
              <h4 className="font-bold text-neutral-900 mb-2">Como posso acompanhar minha proposta?</h4>
              <p className="text-neutral-600">
                Após submeter sua proposta, você receberá um número de protocolo. Use este número para acompanhar o status em nosso portal online.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-12 bg-neutral-100 rounded-xl p-6">
          <p className="text-neutral-700 font-medium mb-4">Para mais informações sobre editais:</p>
          <p className="text-neutral-600">Email: contato@fundacao193.org.br | Telefone: (61) 99557-8286</p>
        </div>
      </div>
    </div>
  );
}

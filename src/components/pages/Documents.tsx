// ==============================================================================
// IMPORTS - Descomentar quando ativar API
// ==============================================================================
// import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, FileText, Download, Folder } from 'lucide-react';
// import { fetchDocumentos } from '../../services/api';
// import type { Documento } from '../../types/documents';
// import { isDocumentoInstitucional } from '../../types/documents';
// import { formatFileSize } from '../../utils/format';

export default function Documents() {
  // ============================================================================
  // CÓDIGO PRONTO PARA API - DESCOMENTAR QUANDO WORDPRESS ESTIVER PRONTO
  // ============================================================================
  // const [documents, setDocuments] = useState<Documento[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const hasFetched = useRef(false);

  // useEffect(() => {
  //   if (hasFetched.current) return;
  //   hasFetched.current = true;
  //   
  //   async function loadDocuments() {
  //     try {
  //       const data = await fetchDocumentos();
  //       // Filtra apenas documentos institucionais (exclui editais e prestação de contas)
  //       const docsInstitucionais = data.filter(doc => isDocumentoInstitucional(doc));
  //       setDocuments(docsInstitucionais);
  //     } catch (err) {
  //       setError('Não conseguimos carregar os documentos. Tente novamente mais tarde.');
  //       console.error('Erro ao carregar documentos:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   loadDocuments();
  // }, []);

  // // Agrupar documentos por tipo (usando taxonomy _embedded)
  // const groupedByType = documents.reduce((acc, doc) => {
  //   const tipoTerm = doc._embedded?.['wp:term']?.[0]?.find(
  //     term => term.taxonomy === 'tipo_documento'
  //   );
  //   const category = tipoTerm?.name || 'Outros';
  //   if (!acc[category]) acc[category] = [];
  //   acc[category].push(doc);
  //   return acc;
  // }, {} as Record<string, Documento[]>);

  // // Ordenar dentro de cada categoria por data (mais recentes primeiro)
  // Object.values(groupedByType).forEach(docs => {
  //   docs.sort((a, b) => {
  //     const aDate = a.acf?.data_publicacao || '';
  //     const bDate = b.acf?.data_publicacao || '';
  //     return bDate.localeCompare(aDate);
  //   });
  // });
  //
  // // Ordenar grupos por ano em ordem decrescente (2026 → 2023)
  // const sortedByYear = Object.entries(groupedByType)
  //   .sort(([yearA], [yearB]) => {
  //     const numA = Number(yearA) || 0;
  //     const numB = Number(yearB) || 0;
  //     return numB - numA;
  //   })
  //   .reduce((acc, [year, docs]) => {
  //     acc[year] = docs;
  //     return acc;
  //   }, {} as Record<string, Documento[]>);
  // ============================================================================

  // PLACEHOLDER ESTÁTICO (remover quando API estiver pronta)
  const documentCategories = [
    {
      name: 'Documentos Institucionais',
      icon: Folder,
      files: [
        { name: 'Estatuto Social', size: '1.2 MB', date: '2023' },
        { name: 'Regimento Interno', size: '890 KB', date: '2023' },
        { name: 'Código de Ética e Conduta', size: '650 KB', date: '2022' },
        { name: 'Política de Privacidade', size: '520 KB', date: '2023' },
      ],
    },
    {
      name: 'Relatórios de Gestão',
      icon: Folder,
      files: [
        { name: 'Relatório de Atividades 2023', size: '2.8 MB', date: '2023' },
        { name: 'Relatório de Atividades 2022', size: '2.5 MB', date: '2022' },
        { name: 'Relatório de Atividades 2021', size: '2.2 MB', date: '2021' },
        { name: 'Plano Estratégico 2024-2027', size: '1.5 MB', date: '2024' },
      ],
    },
    {
      name: 'Termos de Referência',
      icon: Folder,
      files: [
        { name: 'TR - Centro de Treinamento Avançado', size: '1.8 MB', date: '2023' },
        { name: 'TR - Modernização de Frota', size: '1.3 MB', date: '2023' },
        { name: 'TR - Pesquisa e Inovação', size: '950 KB', date: '2022' },
        { name: 'TR - Capacitação Profissional', size: '1.1 MB', date: '2023' },
      ],
    },
    {
      name: 'Normas e Procedimentos',
      icon: Folder,
      files: [
        { name: 'Manual de Procedimentos Operacionais', size: '3.2 MB', date: '2023' },
        { name: 'Guia de Boas Práticas', size: '2.1 MB', date: '2023' },
        { name: 'Protocolo de Segurança Institucional', size: '1.4 MB', date: '2022' },
        { name: 'Política de Gestão de Conflitos', size: '890 KB', date: '2023' },
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

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Documentos</h1>
        <p className="text-xl text-neutral-600 mb-16">
          Acesso a documentos, manuais, normas e procedimentos da Fundação 193.
        </p>

        {/* ====================================================================== */}
        {/* LOADING/ERROR STATES - DESCOMENTAR QUANDO API ESTIVER PRONTA */}
        {/* ====================================================================== */}
        {/* {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-neutral-600">Carregando documentos...</p>
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

        <div className="space-y-12">
          {documentCategories.map((category) => {
            const Icon = category.icon;
            return (
              <section key={category.name}>
                <div className="flex items-center gap-3 mb-6">
                  <Icon size={28} className="text-icon-fg" />
                  <h2 className="text-2xl font-bold text-neutral-900">{category.name}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.files.map((file) => (
                    <div
                      key={file.name}
                      className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-icon-fg" />
                        <div>
                          <p className="font-semibold text-neutral-900">{file.name}</p>
                          <p className="text-xs text-neutral-500">{file.size} • {file.date}</p>
                        </div>
                      </div>
                      {/* Placeholder download - not available yet */}
                      <a
                        href="#"
                        aria-disabled="true"
                        tabIndex={-1}
                        onClick={(e) => e.preventDefault()}
                        title="Disponível em breve"
                        className="text-neutral-400 opacity-60 cursor-not-allowed transition-colors"
                      >
                        <Download size={20} />
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* ====================================================================== */}
        {/* RENDERIZAR DADOS DA API - DESCOMENTAR QUANDO ESTIVER PRONTA */}
        {/* ====================================================================== */}
        {/* {!loading && !error && (
          <div className="space-y-12">
            {Object.entries(groupedByType).map(([category, docs]) => (
              <section key={category}>
                <div className="flex items-center gap-3 mb-6">
                  <Folder size={28} className="text-icon-fg" />
                  <h2 className="text-2xl font-bold text-neutral-900">{category}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {docs.map((doc) => {
                    const file = doc.acf?.arquivo_pdf;
                    const fileSize = file?.filesize
                      ? formatFileSize(file.filesize)
                      : 'N/A';
                    const year = doc.acf?.data_publicacao
                      ? doc.acf.data_publicacao.substring(0, 4)
                      : 'N/A';
                    
                    return (
                      <div
                        key={doc.id}
                        className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText size={20} className="text-icon-fg flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-semibold text-neutral-900 truncate">
                              {doc.title.rendered}
                            </p>
                            {doc.acf?.descricao_curta && (
                              <p className="text-sm text-neutral-600 line-clamp-1">
                                {doc.acf.descricao_curta}
                              </p>
                            )}
                            <p className="text-xs text-neutral-500">
                              {fileSize} • {year}
                            </p>
                          </div>
                        </div>
                        {file?.url ? (
                          <a
                            href={file.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-hover transition-colors flex-shrink-0 ml-3"
                            aria-label={`Baixar ${doc.title.rendered}`}
                            title="Baixar documento"
                          >
                            <Download size={20} />
                          </a>
                        ) : (
                          <span className="text-neutral-400 opacity-60 flex-shrink-0 ml-3" title="Arquivo não disponível">
                            <Download size={20} />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )} */}

        <section className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Solicitação de Documentos</h3>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Não encontrou o documento que procura? Você pode solicitar cópias de documentos específicos através do formulário eletrônico.
            </p>
            <a href="mailto:documentos@fundacao193.org.br?subject=Solicitação%20de%20Documento" className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors" aria-label="Solicitar documento">
              Solicitar Documento
            </a>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-hover rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Lei de Acesso à Informação</h3>
            <p className="text-opacity-90 leading-relaxed mb-6">
              Conforme Lei 12.527/2011, a Fundação 193 garante o direito de acesso à informação pública.
            </p>
            <a href="mailto:documentos@fundacao193.org.br?subject=Solicitação%20LAI" className="inline-block px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-neutral-100 transition-colors" aria-label="Fazer solicitação LAI">
              Fazer Solicitação LAI
            </a>
          </div>
        </section>

        <section className="mt-12 bg-white rounded-2xl p-8 shadow-md">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Informações Adicionais</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-neutral-900 mb-2">Versões de Documentos</h4>
              <p className="text-neutral-600">
                Os documentos são atualizados regularmente. Consulte a data de publicação para garantir que você possui a versão mais recente.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 mb-2">Acesso Restrito</h4>
              <p className="text-neutral-600">
                Alguns documentos requerem acesso restrito por motivos de segurança ou confidencialidade. Para acessá-los, entre em contato com o departamento responsável.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 mb-2">Formatos Disponíveis</h4>
              <p className="text-neutral-600">
                Todos os documentos estão disponíveis em formato PDF. Documentos de grande volume podem ser solicitados em outros formatos.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-12 bg-neutral-100 rounded-xl p-6">
          <h4 className="font-bold text-neutral-900 mb-2">Precisa de ajuda?</h4>
          <p className="text-neutral-600 mb-2">Email: contato@fundacao193.org.br</p>
          <p className="text-neutral-600">Telefone: (61) 99557-8286</p>
        </div>
      </div>
    </div>
  );
}

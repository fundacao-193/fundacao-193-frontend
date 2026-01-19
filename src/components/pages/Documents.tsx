import { ArrowLeft, FileText, Download, Folder } from 'lucide-react';

export default function Documents({ onNavigate }: { onNavigate: (page: string | null) => void }) {
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
          className="flex items-center gap-2 text-[#3d685d] hover:text-[#2f5349] font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Documentos</h1>
        <p className="text-xl text-neutral-600 mb-16">
          Acesso a documentos, manuais, normas e procedimentos da Fundação 193.
        </p>

        <div className="space-y-12">
          {documentCategories.map((category) => {
            const Icon = category.icon;
            return (
              <section key={category.name}>
                <div className="flex items-center gap-3 mb-6">
                  <Icon size={28} className="text-[#3d685d]" />
                  <h2 className="text-2xl font-bold text-neutral-900">{category.name}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.files.map((file) => (
                    <div
                      key={file.name}
                      className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-[#3d685d]" />
                        <div>
                          <p className="font-semibold text-neutral-900">{file.name}</p>
                          <p className="text-xs text-neutral-500">{file.size} • {file.date}</p>
                        </div>
                      </div>
                      <button className="text-neutral-400 hover:text-[#3d685d] transition-colors">
                        <Download size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Solicitação de Documentos</h3>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Não encontrou o documento que procura? Você pode solicitar cópias de documentos específicos através do formulário eletrônico.
            </p>
            <button className="px-6 py-3 bg-[#3d685d] text-white rounded-lg font-medium hover:bg-[#2f5349] transition-colors">
              Solicitar Documento
            </button>
          </div>

          <div className="bg-gradient-to-br from-[#3d685d] to-[#2f5349] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Lei de Acesso à Informação</h3>
            <p className="text-opacity-90 leading-relaxed mb-6">
              Conforme Lei 12.527/2011, a Fundação 193 garante o direito de acesso à informação pública.
            </p>
            <button className="px-6 py-3 bg-white text-[#3d685d] rounded-lg font-medium hover:bg-neutral-100 transition-colors">
              Fazer Solicitação LAI
            </button>
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
          <p className="text-neutral-600 mb-2">Email: documentos@fundacao193.org.br</p>
          <p className="text-neutral-600">Telefone: (61) 3321-3000 ramal 120</p>
        </div>
      </div>
    </div>
  );
}

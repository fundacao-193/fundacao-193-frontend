import { ArrowLeft, Calendar, FileText, Download } from 'lucide-react';

export default function Edits() {
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

        <div className="mb-12">
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

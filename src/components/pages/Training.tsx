import { ArrowLeft, BookOpen, Users, Award, Zap } from 'lucide-react';

export default function Training({ onNavigate }: { onNavigate: (page: string | null) => void }) {
  const programs = [
    {
      title: 'Combate a Incêndios Avançado',
      level: 'Especializado',
      duration: '120 horas',
      description: 'Treinamento intensivo em técnicas modernas de combate a incêndios estruturais, florestais e industriais.',
    },
    {
      title: 'Resgate em Altura',
      level: 'Avançado',
      duration: '80 horas',
      description: 'Capacitação em resgate de vítimas em locais de difícil acesso, com uso de equipamentos especializados.',
    },
    {
      title: 'Primeiros Socorros Avançados',
      level: 'Intermediário',
      duration: '40 horas',
      description: 'Programa completo de atendimento pré-hospitalar e trauma avançado conforme diretrizes internacionais.',
    },
    {
      title: 'Gestão de Emergências',
      level: 'Executivo',
      duration: '60 horas',
      description: 'Desenvolvimento de habilidades de liderança, planejamento e gestão de crises para oficiais.',
    },
    {
      title: 'Hazmat e Materiais Perigosos',
      level: 'Especializado',
      duration: '100 horas',
      description: 'Treinamento em resposta a incidentes com substâncias químicas, biológicas e radioativas.',
    },
    {
      title: 'Educa\u00e7\u00e3o Comunit\u00e1ria em Seguran\u00e7a',
      level: 'B\u00e1sico',
      duration: '20 horas',
      description: 'Programa para preparar instrutores que atuem em preven\u00e7\u00e3o em escolas e comunidades.',
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

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Programas de Capacitação</h1>
        <p className="text-xl text-neutral-600 mb-16">
          Desenvolvimento profissional contínuo através de programas internacionais e metodologias inovadoras.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {programs.map((program) => (
            <div key={program.title} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-3 py-1 bg-[#3d685d] bg-opacity-10 text-[#3d685d] rounded-full text-sm font-semibold">
                  {program.level}
                </span>
                <span className="text-neutral-600 text-sm font-medium">{program.duration}</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-3">{program.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{program.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <section className="bg-white rounded-2xl p-8 shadow-md">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#3d685d] rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">Metodologia de Ensino</h3>
              </div>
            </div>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Nossas capacitações utilizam metodologia blended learning, combinando:
            </p>
            <ul className="list-disc list-inside text-neutral-600 space-y-2">
              <li>Aulas teóricas com instrutores especializados</li>
              <li>Prática em ambientes simulados realísticos</li>
              <li>Exercícios de campo com cenários reais</li>
              <li>Mentorias individualizadas</li>
              <li>Avaliações contínuas de desempenho</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-md">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#3d685d] rounded-lg flex items-center justify-center flex-shrink-0">
                <Award size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">Certificações</h3>
              </div>
            </div>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Oferecemos certificações reconhecidas em nível nacional e internacional:
            </p>
            <ul className="list-disc list-inside text-neutral-600 space-y-2">
              <li>Certificados institucionais da Fundação 193</li>
              <li>Credenciamento CBMDF</li>
              <li>Certificações internacionais em parceria</li>
              <li>Renovação periódica de qualificações</li>
              <li>Reconhecimento de expertise especializada</li>
            </ul>
          </section>
        </div>

        <section className="bg-gradient-to-r from-[#3d685d] to-[#2f5349] rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Próximos Cursos e Inscrições</h3>
          <p className="leading-relaxed mb-6">
            Para informações sobre cronograma de cursos, vagas disponíveis e inscrições, entre em contato conosco:
          </p>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <p className="font-semibold mb-2">Email: capacitacao@fundacao193.org.br</p>
            <p className="font-semibold">Telefone: (61) 3321-3000</p>
          </div>
        </section>
      </div>
    </div>
  );
}

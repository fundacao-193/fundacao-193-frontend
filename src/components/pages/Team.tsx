import { ArrowLeft, Linkedin, Mail } from 'lucide-react';

export default function Team() {
  const teamMembers = [
    {
      name: 'Dr. Carlos Fernando',
      position: 'Presidente Executivo',
      bio: 'Profissional com 25 anos de experiência em gestão de emergências e operações de segurança pública.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      name: 'Dra. Ana Paula Silva',
      position: 'Diretora de Operações',
      bio: 'Especialista em capacitação profissional e desenvolvimento organizacional com mestrado em Administração Pública.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      name: 'Tenente Marcos Oliveira',
      position: 'Diretor de Projetos Especiais',
      bio: 'Oficial do CBMDF com expertise em planejamento estratégico e operações de resgate avançado.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
    {
      name: 'Eng. Patricia Costa',
      position: 'Diretora de Infraestrutura',
      bio: 'Engenheira com especialização em projetos de modernização tecnológica e eficiência operacional.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => window.location.hash = ''}
          className="flex items-center gap-2 text-[#3d685d] hover:text-[#2f5349] font-medium mb-8 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-[#3d685d]"
          aria-label="Voltar para página inicial"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Nossa Equipe</h1>
        <p className="text-xl text-neutral-600 mb-16">
          Profissionais dedicados e experientes comprometidos com a excelência e o impacto social.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-neutral-900 mb-1">{member.name}</h3>
                <p className="text-[#3d685d] font-semibold mb-4">{member.position}</p>
                <p className="text-neutral-600 leading-relaxed mb-4">{member.bio}</p>
                <div className="flex gap-3">
                  {/* Linkedin profile not available yet - mark as coming soon for accessibility */}
                  <a
                    href="#"
                    aria-disabled="true"
                    tabIndex={-1}
                    title="Perfil em breve"
                    onClick={(e) => e.preventDefault()}
                    className="text-neutral-400 opacity-60 cursor-not-allowed transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>

                  {/* Mail opens a new message to the general contact with prefilled subject */}
                  <a
                    href={`mailto:contato@fundacao193.org.br?subject=${encodeURIComponent('Contato sobre ' + member.name)}`}
                    className="text-neutral-400 hover:text-[#3d685d] transition-colors"
                    aria-label={`Enviar e-mail para ${member.name}`}
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Programa de Desenvolvimento de Talentos</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            A Fundação 193 investe continuamente no desenvolvimento profissional de sua equipe, oferecendo:
          </p>
          <ul className="list-disc list-inside text-neutral-600 space-y-2">
            <li>Programas de capacitação contínua e educação corporativa</li>
            <li>Parcerias com instituições acadêmicas para educação de excelência</li>
            <li>Mentoria com especialistas internacionais</li>
            <li>Oportunidades de carreira e desenvolvimento pessoal</li>
            <li>Programa de bem-estar e qualidade de vida</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

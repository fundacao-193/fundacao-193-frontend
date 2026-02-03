import { ArrowLeft } from 'lucide-react';

export default function OurStory() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => window.location.hash = ''}
          className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium mb-8 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          aria-label="Voltar para página inicial"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">Nossa História Completa</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Origem e Fundação</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              A Fundação 193 nasceu em 1993 como resultado do comprometimento de um grupo dedicado de profissionais que reconheciam a necessidade de fortalecer e apoiar o Corpo de Bombeiros Militar do Distrito Federal. O número 193 representa o código de emergência histórico, simbolizando o compromisso com a excelência e a prontidão no atendimento.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Naquela época, o CBMDF enfrentava desafios significativos em termos de recursos, capacitação e infraestrutura. A fundação foi criada como uma instituição sem fins lucrativos, dedicada a captar recursos e canalizar investimentos para potencializar as operações dos bombeiros.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Primeiros Anos (1993-2000)</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Os primeiros anos foram marcados por solidificação institucional e construção de parcerias estratégicas. Durante essa fase, a Fundação 193 desenvolveu seus primeiros projetos de impacto, focando em:
            </p>
            <ul className="list-disc list-inside text-neutral-700 leading-relaxed space-y-2 mb-4">
              <li>Capacitação de profissionais em técnicas modernas de combate a incêndios</li>
              <li>Modernização de equipamentos e infraestrutura das corporações</li>
              <li>Pesquisa e desenvolvimento de métodos inovadores de prevenção</li>
              <li>Engajamento comunitário e educação preventiva</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Consolidação e Expansão (2000-2010)</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              A década de 2000 marcou a consolidação da Fundação como referência na região Centro-Oeste. Expandimos nossas operações e estabelecemos parcerias com instituições internacionais, trazendo expertise global para o contexto local.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Nesse período, realizamos as primeiras missões internacionais de capacitação, enviando profissionais para aprender com os melhores centros de treinamento do mundo. Também iniciamos programas robustos de responsabilidade social, impactando diretamente as comunidades carentes do Distrito Federal.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Modernização (2010-2020)</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              O terceiro decênio foi marcado por uma transformação digital e modernização de processos. Investimos em tecnologia, dados e inovação para melhorar a tomada de decisão e a efetividade das operações.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Criamos centros de treinamento especializados, implementamos sistemas de gerenciamento avançados e expandimos nossos programas de prevenção de incêndios em escolas e comunidades vulneráveis.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Presente e Futuro</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Hoje, após mais de três décadas de atuação, a Fundação 193 se consolidou como uma instituição estratégica para o CBMDF e para a sociedade civil. Continuamos inovando e expandindo nosso impacto através de:
            </p>
            <ul className="list-disc list-inside text-neutral-700 leading-relaxed space-y-2 mb-4">
              <li>Pesquisa e desenvolvimento de novas metodologias</li>
              <li>Parcerias internacionais com organismos especializados</li>
              <li>Investimento em sustentabilidade e responsabilidade social</li>
              <li>Programas de inclusão e desenvolvimento comunitário</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed">
              Olhamos para o futuro com otimismo e compromisso de continuar sendo um agente transformador, promovendo excelência, inovação e segurança para o Distrito Federal e suas comunidades.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

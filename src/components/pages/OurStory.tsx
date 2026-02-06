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
              A Fundação 193 – Fundação de Apoio ao Corpo de Bombeiros Militar do Distrito Federal (CBMDF) nasceu a
              partir de um sonho institucional aliado a demandas estratégicas da Corporação. Sua criação foi concebida
              como uma das iniciativas previstas no Plano Estratégico 2017–2024 do CBMDF, com o objetivo de ampliar o
              apoio às atividades do Corpo de Bombeiros e fortalecer sua relação com a sociedade.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              A Fundação foi oficialmente constituída em 06 de dezembro de 2022, data marcada pela Solenidade de Posse
              de seus membros e pela aprovação dos documentos constitutivos pelo Ministério Público do Distrito Federal
              e Territórios (MPDFT). Desde sua origem, foi estabelecida como uma entidade civil, sem fins lucrativos,
              de direito privado, com autonomia administrativa, financeira e patrimonial.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              O nome Fundação 193 foi escolhido de forma simbólica, fazendo referência ao número de emergência do Corpo
              de Bombeiros, reforçando seu compromisso com a prestação de serviços relevantes à sociedade e ao CBMDF.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Estruturação Institucional (2022–2023)</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Nos primeiros momentos após sua constituição, a Fundação 193 concentrou esforços na estruturação
              administrativa, jurídica e institucional, estabelecendo bases sólidas para sua atuação. Esse período foi
              marcado pela organização interna, definição de diretrizes estratégicas e alinhamento com as finalidades
              estatutárias.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Entre as prioridades desse momento destacam-se:
            </p>
            <ul className="list-disc list-inside text-neutral-700 leading-relaxed space-y-2 mb-4">
              <li>Consolidação da governança institucional;</li>
              <li>Definição de programas e áreas de atuação;</li>
              <li>Fortalecimento do vínculo institucional com o CBMDF;</li>
              <li>Planejamento de ações voltadas ao interesse público e social.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Atuação e Desenvolvimento</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              A Fundação 193 atua no apoio a programas, projetos e ações do CBMDF, com foco em iniciativas de interesse
              coletivo, especialmente nas áreas de:
            </p>
            <ul className="list-disc list-inside text-neutral-700 leading-relaxed space-y-2 mb-4">
              <li>Preservação e conservação do meio ambiente;</li>
              <li>
                Prevenção de incêndios e acidentes, por meio do desenvolvimento da consciência comunitária;
              </li>
              <li>Difusão do conhecimento científico e tecnológico;</li>
              <li>
                Preservação, recuperação e divulgação da história, tradição e valores do Corpo de Bombeiros;
              </li>
              <li>Promoção da qualidade de vida dos bombeiros militares e de seus familiares;</li>
              <li>Desenvolvimento de atividades culturais, educacionais, sociais e desportivas.</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed">
              Sua atuação busca sempre complementar e fortalecer as atividades institucionais do CBMDF, respeitando os
              princípios da legalidade, transparência e responsabilidade social.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Presente e Futuro</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Atualmente, a Fundação 193 consolida-se como um elo estratégico entre o Corpo de Bombeiros Militar do
              Distrito Federal e a sociedade, contribuindo para o fortalecimento da Corporação e para a promoção da
              cidadania.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Com foco no futuro, a Fundação mantém o compromisso de ampliar seu impacto social por meio de:
            </p>
            <ul className="list-disc list-inside text-neutral-700 leading-relaxed space-y-2 mb-4">
              <li>Desenvolvimento de novos projetos e parcerias institucionais;</li>
              <li>Incentivo a ações de prevenção e educação comunitária;</li>
              <li>Promoção da sustentabilidade e da responsabilidade socioambiental;</li>
              <li>Valorização dos profissionais do CBMDF e de sua história.</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed">
              Guiada por princípios como ética, transparência, solidariedade e responsabilidade social, a Fundação 193
              segue comprometida em apoiar o CBMDF e contribuir para uma sociedade mais segura, consciente e integrada.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

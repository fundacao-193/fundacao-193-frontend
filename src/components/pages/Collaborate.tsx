import { ArrowLeft, Heart, QrCode } from 'lucide-react';

export default function Collaborate() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => window.location.hash = ''}
          className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium mb-8 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          aria-label="Voltar para página inicial"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Colabore</h1>
          <p className="text-xl text-neutral-600">
            Sua contribuição é fundamental para continuarmos realizando nossas ações.
          </p>
        </div>

        <section className="grid lg:grid-cols-2 gap-12 mb-20 items-start">
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Doações</h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Desenvolva o hábito de doar e faça a diferença na vida do planeta e das outras pessoas. Isso está relacionado à quantidade doada, mas sim ao incentivo de práticas de consumo consciente e empatia que podem ser desenvolvidas em nós mesmos e em nossas relações.
                </p>
                <p>
                  Todos podem fazer doações para o benefício do meio-ambiente ou da coletividade. Se estiver em dúvida, podemos elencar algumas possibilidades: você pode doar tempo, capital intelectual, sangue, leite materno, roupas, alimentos, dinheiro, trabalho, dentro e outros.
                </p>
                <p>
                  A doação é uma atitude que contribui diretamente para um futuro mais promissor e justo para todos.
                </p>
                <p>
                  O CBMDF desenvolve alguns projetos para auxiliar pessoas em vulnerabilidade, como a Campanha do Agasalho, o Natal Solidário e outros para sanar problemas específicos. Você poderá contribuir nestes e em outros projetos. Mas você também pode fazer a doação de dinheiro. Nesse caso, o CBMDF não tem condições de receber diretamente o recurso, mas a Fundação 193 tem, pois é uma entidade sem fins lucrativos e todo o recurso arrecadado é destinado a apoiar o Corpo de Bombeiros Militar do Distrito Federal no desenvolvimento de alguns de seus projetos.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Sua doação estará contribuindo para:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <span className="text-neutral-700">Preservar o meio ambiente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <span className="text-neutral-700">Prevenir acidentes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <span className="text-neutral-700">Prevenir incêndios</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <span className="text-neutral-700">Preservar a memória do CBMDF</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <span className="text-neutral-700">Incentivar a pesquisa em incêndios e explosões</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <span className="text-neutral-700">Desenvolvimento de atividades sociais, culturais e desportivas</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-8">
              <div className="bg-red-600 rounded-xl overflow-hidden aspect-[3/4] transition-transform hover:scale-[1.02] hover:shadow-lg">
                <img
                  src="https://images.pexels.com/photos/3683065/pexels-photo-3683065.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Coração na mão"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-6 flex items-center gap-2 text-primary font-semibold text-sm">
                <Heart size={16} />
                <span>Ajude-nos a salvar vidas</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 rounded-2xl p-12 mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Doação PIX</h2>
              <p className="text-lg text-neutral-700 mb-8">
                Sua contribuição é muito importante para que possamos realizar nossas ações.
              </p>

              <div className="space-y-2 mb-8">
                <p className="text-neutral-700 font-semibold">
                  Fundação 193 – Fundação de Apoio ao CBMDF
                </p>
                <p className="text-neutral-600">
                  CNPJ: 49.021.024/0001-16
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-2">Formas de Doação</h3>
                <ul className="space-y-2 text-neutral-700 text-sm">
                  <li>• PIX Copia e Cola</li>
                  <li>• PIX QR Code (veja ao lado)</li>
                  <li>• Transferência Bancária</li>
                  <li>• Depósito em Conta</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200 qr-card">
                <QrCode size={32} className="text-neutral-400 mb-4 mx-auto" />
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=000201260936049201099FUNDACAO193000520166360014br.gov.bcb.brcode01051.0.052023621390011br.com.mercadolibre06072.4012.0231230ABDCDEF123456789012345670123456789012345635400520540010BR5913FUNDACAO19360009SAO PAULO6009SAO PAULO62090505TESTE63041D21"
                  alt="QR Code PIX"
                  className="w-64 h-64 rounded-lg"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Add small hover interaction for visual feedback */}
                <style>{`.qr-card { transition: transform 180ms ease, box-shadow 180ms ease; } .qr-card:hover { transform: scale(1.03); box-shadow: 0 8px 30px rgba(23,23,23,0.08); }`}</style>
                <p className="text-center text-sm text-neutral-600 mt-4">
                  Escaneie com seu app de banco
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Outras Formas de Colaborar</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-primary rounded-xl p-8 text-white">
              <div className="text-3xl font-bold mb-3">01</div>
              <h3 className="text-xl font-bold mb-3">Voluntariado</h3>
              <p className="text-opacity-90">
                Disponibilize seu tempo e habilidades para apoiar nossas atividades e projetos.
              </p>
            </div>

            <div className="bg-primary rounded-xl p-8 text-white">
              <div className="text-3xl font-bold mb-3">02</div>
              <h3 className="text-xl font-bold mb-3">Parcerias Corporativas</h3>
              <p className="text-opacity-90">
                Sua empresa pode se tornar parceira em nossas iniciativas e contribuir para causas sociais.
              </p>
            </div>

            <div className="bg-primary rounded-xl p-8 text-white">
              <div className="text-3xl font-bold mb-3">03</div>
              <h3 className="text-xl font-bold mb-3">Doações em Espécie</h3>
              <p className="text-opacity-90">
                Contribua com materiais, equipamentos ou recursos específicos para nossos projetos.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-primary rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Dúvidas?</h2>
          <p className="text-lg text-opacity-90 mb-6">
            Entre em contato conosco para saber mais sobre as formas de colaboração.
          </p>
          <a
            href="mailto:contato@fundacao193.org.br"
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-neutral-50 transition-colors"
          >
            Enviar E-mail
          </a>
        </section>
      </div>
    </div>
  );
}

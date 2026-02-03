import { Shield, Target, Eye } from 'lucide-react';

export default function About() {
  return (
    <section id="quem-somos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-block bg-badge-bg text-badge-text px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Quem Somos
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
              Instituição de apoio ao Corpo de Bombeiros do Distrito Federal
            </h2>
            <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
              A Fundação 193 é uma instituição sem fins lucrativos criada para fortalecer
              e apoiar as atividades do Corpo de Bombeiros Militar do Distrito Federal.
            </p>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Atuamos no desenvolvimento de projetos, capacitação de profissionais,
              modernização de equipamentos e fortalecimento das operações de
              salvamento e prevenção de incêndios.
            </p>
            <a
              href="#nossa-historia"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all hover:text-primary-hover"
            >
              Nossa História Completa
              <span>→</span>
            </a>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/8761410/pexels-photo-8761410.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Bombeiros em treinamento"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-institutional text-white p-6 rounded-xl shadow-xl">
              <p className="text-4xl font-bold mb-1">30+</p>
              <p className="text-sm">Anos de história</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-neutral-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-icon-bg rounded-lg flex items-center justify-center mb-4">
              <Target className="text-icon-fg" size={28} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Missão</h3>
            <p className="text-neutral-600 leading-relaxed">
              Apoiar o CBMDF no desenvolvimento de projetos que fortaleçam suas
              operações e promovam a excelência no atendimento à população.
            </p>
          </div>

          <div className="bg-neutral-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-icon-bg rounded-lg flex items-center justify-center mb-4">
              <Eye className="text-icon-fg" size={28} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Visão</h3>
            <p className="text-neutral-600 leading-relaxed">
              Ser referência nacional em gestão e apoio institucional aos
              Corpos de Bombeiros, promovendo inovação e eficiência.
            </p>
          </div>

          <div className="bg-neutral-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-icon-bg rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-icon-fg" size={28} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Valores</h3>
            <p className="text-neutral-600 leading-relaxed">
              Comprometimento, transparência, excelência, inovação e
              respeito à vida são os pilares que guiam todas as nossas ações.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

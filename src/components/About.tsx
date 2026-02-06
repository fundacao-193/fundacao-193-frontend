import { Shield, Target, Eye } from 'lucide-react';
import aboutImage from '../assets/images/lineandFlag.jpg';

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
              A Fundação 193 é uma instituição sem fins lucrativos criada para apoiar e fortalecer o Corpo de Bombeiros Militar do Distrito Federal, atuando como um elo entre a Corporação e a sociedade.
            </p>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            Nossa atuação está voltada ao desenvolvimento de projetos socioambientais, preventivos, culturais, educacionais e desportivos, contribuindo para a capacitação de profissionais, o aprimoramento das operações e a promoção da segurança e do bem-estar da população.
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
                src={aboutImage}
                alt="Bombeiros em treinamento"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-institutional text-white p-6 rounded-xl shadow-xl">
              <p className="text-4xl font-bold mb-1">3+</p>
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
            Apoiar o Corpo de Bombeiros Militar do Distrito Federal por meio do desenvolvimento de projetos e ações que fortaleçam suas operações, promovam a prevenção, a segurança e o bem-estar da sociedade.
            </p>
          </div>

          <div className="bg-neutral-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-icon-bg rounded-lg flex items-center justify-center mb-4">
              <Eye className="text-icon-fg" size={28} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Visão</h3>
            <p className="text-neutral-600 leading-relaxed">
            Consolidar-se como instituição de referência no apoio institucional ao Corpo de Bombeiros Militar do Distrito Federal, fortalecendo a integração com a sociedade e ampliando o impacto social de suas ações.
            </p>
          </div>

          <div className="bg-neutral-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-icon-bg rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-icon-fg" size={28} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Valores</h3>
            <p className="text-neutral-600 leading-relaxed">
            Ética, transparência, compromisso social, responsabilidade institucional, inovação, solidariedade e respeito à vida.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

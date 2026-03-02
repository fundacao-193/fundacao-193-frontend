import { Shield, Target, Eye } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const { elementRef, isVisible } = useScrollAnimation(0.15);
  return (
    <section id="quem-somos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={elementRef} className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-block bg-badge-bg text-badge-text px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Quem Somos
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
              Fundação 193 – Instituição de Apoio ao Corpo de Bombeiros Militar do Distrito Federal
            </h2>
            <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
              A Fundação 193 é uma instituição sem fins lucrativos criada para apoiar e fortalecer o Corpo de Bombeiros Militar do Distrito Federal, atuando como elo institucional entre a Corporação, a sociedade e os parceiros públicos e privados.
            </p>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Nossa atuação está organizada em frentes estratégicas de apoio operacional, capacitação e treinamentos, eventos institucionais e projetos sociais, contribuindo para a prevenção, a segurança e o bem-estar da população.
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
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-neutral-100">
              {/* Placeholder */}
              {!isImageLoaded && !hasImageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
                  <img
                    src="/logo-reduzida.png"
                    alt="Fundação 193 Logo"
                    className="h-12 w-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              
              <picture>
                <source srcSet="/images/lineandFlag.webp" type="image/webp" />
                <img
                  src="/images/lineandFlag.jpg"
                  alt="Bombeiros em treinamento"
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setIsImageLoaded(true)}
                  onError={() => setHasImageError(true)}
                />
              </picture>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-institutional text-white p-6 rounded-xl shadow-xl">
              <p className="text-4xl font-bold mb-1">3+</p>
              <p className="text-sm">Anos de história</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className={`bg-neutral-50 p-8 rounded-xl hover:shadow-lg transition-all ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: isVisible ? '50ms' : '0ms', transitionDuration: '600ms' }}>
            <div className="w-14 h-14 bg-icon-bg rounded-lg flex items-center justify-center mb-4">
              <Target className="text-icon-fg" size={28} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Missão</h3>
            <p className="text-neutral-600 leading-relaxed">
              Apoiar institucionalmente o Corpo de Bombeiros Militar do Distrito Federal, captando e gerindo recursos, projetos e parcerias que fortaleçam suas operações, promovam a prevenção, a segurança e o bem-estar da sociedade.
            </p>
          </div>

          <div className={`bg-neutral-50 p-8 rounded-xl hover:shadow-lg transition-all ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: isVisible ? '100ms' : '0ms', transitionDuration: '600ms' }}>
            <div className="w-14 h-14 bg-icon-bg rounded-lg flex items-center justify-center mb-4">
              <Eye className="text-icon-fg" size={28} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Visão</h3>
            <p className="text-neutral-600 leading-relaxed">
              Consolidar-se como fundação de referência nacional em transparência, governança e impacto social no apoio ao Corpo de Bombeiros Militar do Distrito Federal, reconhecida por doadores, parceiros e pela sociedade.
            </p>
          </div>

          <div className={`bg-neutral-50 p-8 rounded-xl hover:shadow-lg transition-all ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: isVisible ? '150ms' : '0ms', transitionDuration: '600ms' }}>
            <div className="w-14 h-14 bg-icon-bg rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-icon-fg" size={28} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Valores</h3>
            <p className="text-neutral-600 leading-relaxed">
              Ética, transparência, compromisso social, responsabilidade institucional, inovação, solidariedade, respeito à vida e à coisa pública.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

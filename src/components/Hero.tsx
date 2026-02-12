import { MouseEvent } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import lineImage from '../assets/images/HeroImgLine.jpg';

export default function Hero() {
  const handleScrollClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;

    const targetId = href.slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <section id="inicio" className="relative bg-gradient-to-br from-hero-start via-hero-mid to-hero-end text-white overflow-hidden">
      {/* Background image - otimizado */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 will-change-auto"
        style={{ backgroundImage: `url(${lineImage})`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }}
      ></div>
      
      {/* Directional gradient overlay - darker left (text), lighter right (helicopter action) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-hero-badge-bg border border-hero-badge-border rounded-full px-4 py-2 mb-6">
            <Heart size={16} className="text-hero-badge-icon" />
            <span className="text-sm font-medium">Apoio ao Corpo de Bombeiros</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Apoiando quem
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end">
              salva vidas
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 mb-8 leading-relaxed">
            Fundação de apoio ao Corpo de Bombeiros Militar do Distrito Federal,
            promovendo capacitação, inovação e suporte às operações de salvamento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#quem-somos"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-hover transition-all shadow-lg shadow-primary/30 hover:shadow-2xl hover:shadow-primary/60 hover:scale-105"
              onClick={(event) => handleScrollClick(event, '#quem-somos')}
            >
              Conheça a Fundação
              <ArrowRight size={20} />
            </a>
            <a
              href="#areas"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all shadow-md hover:shadow-xl hover:shadow-white/20 hover:scale-105"
              onClick={(event) => handleScrollClick(event, '#areas')}
            >
              Nossos Projetos
            </a>
          </div>
        </div>
      </div>
      {/* Directional gradient overlay - darker left (text), lighter right (helicopter action) 
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>*/}
    </section>
  );
}

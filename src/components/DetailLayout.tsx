import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import type { ReactNode } from 'react';

interface DetailLayoutProps {
  titleHtml: string;
  meta?: ReactNode;
  featuredImage?: {
    src: string;
    alt: string;
  };
  imageStyle?: 'contained' | 'blurred-bg' | 'cover';
  children: ReactNode;
}

export default function DetailLayout({ titleHtml, meta, featuredImage, imageStyle = 'cover', children }: DetailLayoutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    setIsContentLoaded(true);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-16">
        <div className={`bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-neutral-100 transition-all duration-700
          ${isContentLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight transition-all duration-700
              ${isContentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />

          {meta && (
            <div className={`mb-8 transition-all duration-700 delay-100
              ${isContentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {meta}
            </div>
          )}

          {featuredImage && (
            <>
              {/* Opção 1: Contained (imagem contida com fundo escuro) */}
              {imageStyle === 'contained' && (
                <div className={`-mx-8 md:-mx-12 mb-8 bg-neutral-900 transition-all duration-700 delay-200
                  ${isContentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <img
                    src={featuredImage.src}
                    alt={featuredImage.alt}
                    className="w-full h-auto max-h-[460px] object-contain"
                    loading="eager"
                  />
                </div>
              )}

              {/* Opção 2: Background blurred (efeito cinematic/editorial) */}
              {imageStyle === 'blurred-bg' && (
                <div className={`-mx-8 md:-mx-12 mb-8 relative overflow-hidden h-[460px] transition-all duration-700 delay-200
                  ${isContentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {/* Imagem de fundo desfocada */}
                  <img
                    src={featuredImage.src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-3xl scale-110 opacity-40"
                  />
                  {/* Imagem nítida centralizada */}
                  <img
                    src={featuredImage.src}
                    alt={featuredImage.alt}
                    className="relative w-full h-full object-contain"
                    loading="eager"
                  />
                </div>
              )}

              {/* Opção 3: Cover com imagem nítida sobreposta (blurred background + sharp foreground) */}
              {imageStyle === 'cover' && (
                <div className={`-mx-8 md:-mx-12 mb-8 relative h-[520px] overflow-hidden transition-all duration-700 delay-200
                  ${isContentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {/* Imagem de fundo blurred ocupando todo o espaço (full-bleed) */}
                  <img
                    src={featuredImage.src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110"
                  />
                  {/* Imagem nítida com padding do card */}
                  <div className="absolute top-6 bottom-6 left-8 right-8 md:top-10 md:bottom-10 md:left-12 md:right-12">
                    <img
                      src={featuredImage.src}
                      alt={featuredImage.alt}
                      className="w-full h-full object-cover rounded-2xl shadow-2xl"
                      loading="eager"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {children && (
            <div className={`transition-all duration-700 delay-300
              ${isContentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {children}
            </div>
          )}
        </div>
      </article>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-primary hover:bg-primary-dark text-white rounded-full p-3 shadow-lg z-[100]
          transform transition-all duration-500 ease-out
          hover:scale-110 hover:shadow-2xl hover:-translate-y-1
          active:scale-95
          ${isVisible 
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 scale-75 translate-y-16 pointer-events-none'
          }`}
        aria-label="Voltar ao topo"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  );
}

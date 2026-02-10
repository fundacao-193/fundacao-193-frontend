import { MouseEvent, useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isScrolled, setIsScrolled] = useState(false);

  // Timer used to debounce closing the dropdown, prevents race with rendering
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearCloseTimer = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };
  const startCloseTimer = (label: string) => {
    clearCloseTimer();
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown((current) => (current === label ? null : current));
      closeTimeoutRef.current = null;
    }, 150);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearCloseTimer();
    };
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    // Deixa esses hashs irem direto para a página (App.tsx renderiza)
    if (href === '#colabore' || href === '#noticias') {
      return;
    }
    
    if (!href.startsWith('#')) return;

    const targetId = href.slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
    }
  };

  type NavItem =
    | {
        label: string;
        href: string;
      }
    | {
        label: string;
        dropdown: { label: string; href: string }[];
      };

  const hasDropdown = (item: NavItem): item is Extract<NavItem, { dropdown: unknown }> => {
    return 'dropdown' in item && item !== null && typeof item === 'object';
  };

  // Helper to create stable id for aria-controls
  const getPanelId = (label: string) => `dropdown-${label.replace(/\s+/g, '-').toLowerCase()}`;

  // Keyboard handler for dropdown trigger buttons
  const handleDropdownTriggerKeyDown = (label: string) => (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      setOpenDropdown(null);
      (e.currentTarget as HTMLElement).focus();
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpenDropdown(label);
      // focus first menuitem
      const first = dropdownRefs.current[label]?.querySelector('a') as HTMLElement | null;
      if (first) first.focus();
    }
  };
  const navItems: NavItem[] = [
    { label: 'Início', href: '#inicio' },
    {
      label: 'Institucional',
      dropdown: [
        { label: 'Quem Somos', href: '#quem-somos' },
        { label: 'Nossa História', href: '#nossa-historia' },
        { label: 'Missão e Valores', href: '#missao-valores' },
        { label: 'Equipe', href: '#equipe' },
      ]
    },
    {
      label: 'Atuação',
      dropdown: [
        { label: 'Projetos', href: '#projetos' },
        { label: 'Capacitação', href: '#capacitacao' },
        { label: 'Eventos', href: '#eventos' },
        { label: 'Parcerias', href: '#parcerias' },
      ]
    },
    {
      label: 'Transparência',
      dropdown: [
        { label: 'Prestação de Contas', href: '#prestacao-contas' },
        { label: 'Editais', href: '#editais' },
        { label: 'Documentos', href: '#documentos' },
        { label: 'LGPD', href: '#lgpd' },
      ]
    },
    { label: 'Impacto', href: '#impacto' },
    { label: 'Notícias', href: '#noticias' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-200 animate-slide-down ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Navegação principal">
          <div className="flex items-center justify-between h-20">
            <a 
              href="#" 
              className="flex items-center gap-3 header-logo-animate hover:opacity-80 transition-opacity focus:outline-2 focus:outline-offset-2 focus:outline-institutional"
              aria-label="Voltar para a página inicial"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src="/logo-reduzida.png"
                alt="Fundação 193 Logo"
                className="h-12 w-auto"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h1 className="text-xl font-bold text-neutral-900">Fundação 193</h1>
                <p className="text-xs text-neutral-600">Instituição de Apoio ao CBMDF</p>
              </div>
            </a>

            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                hasDropdown(item) ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseOver={() => {
                      clearCloseTimer();
                      setOpenDropdown(item.label);
                    }}
                    onMouseOut={() => {
                      // start a short timer to close if the mouse doesn't enter the dropdown panel
                      startCloseTimer(item.label);
                    }}
                  >
                    <button 
                      className="flex items-center gap-1 text-neutral-700 hover:text-institutional font-medium transition-colors py-2 focus:outline-2 focus:outline-offset-2 focus:outline-institutional"
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      aria-controls={getPanelId(item.label)}
                      onKeyDown={handleDropdownTriggerKeyDown(item.label)}
                    >
                      <span className={`animated-underline ${openDropdown === item.label ? 'underline-active' : ''}`}>{item.label}</span>
                      <ChevronDown size={16} className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* GAP INVISIVEL entre botao e dropdown */}
                    <div className="absolute top-full left-0 w-full h-2" />
                    
                    {openDropdown === item.label && (
                      <div                        id={getPanelId(item.label)}                        ref={(el) => { dropdownRefs.current[item.label] = el; }}
                        className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg py-2 min-w-[200px] z-50 dropdown-panel animate-scale-in"
                        role="menu"
                        onMouseOver={() => {
                          clearCloseTimer();
                          setOpenDropdown(item.label);
                        }}
                        onMouseOut={() => {
                          startCloseTimer(item.label);
                        }}
                      >
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-institutional transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-institutional"
                            role="menuitem"
                            onClick={(event) => handleNavClick(event, subItem.href)}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-neutral-700 hover:text-institutional font-medium transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-institutional animated-underline"
                    onClick={(event) => handleNavClick(event, item.href)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <a
                href="#colabore"
                className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-white"
              >
                Colabore
              </a>
            </div>

            <button
              className="lg:hidden p-2 focus:outline-2 focus:outline-offset-2 focus:outline-institutional rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t animate-slide-down" id="mobile-menu" role="navigation" aria-label="Menu móvel">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                hasDropdown(item) ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full py-2 text-neutral-700 hover:text-institutional font-medium transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-institutional"
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                    >
                      <span className={`animated-underline ${openDropdown === item.label ? 'underline-active' : ''}`}>{item.label}</span>
                      <ChevronDown size={16} className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.label && (
                      <div className="pl-4 space-y-1 mt-1" role="menu">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.href}
                            href={subItem.href}
                            className="block py-2 text-sm text-neutral-600 hover:text-institutional transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-institutional"
                            role="menuitem"
                            onClick={(event) => {
                              handleNavClick(event, subItem.href);
                              setIsMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-neutral-700 hover:text-institutional font-medium transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-institutional"
                    onClick={(event) => {
                      handleNavClick(event, item.href);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <a
                href="#colabore"
                className="block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors text-center mt-4 focus:outline-2 focus:outline-offset-2 focus:outline-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Colabore
              </a>
            </div>
          </div>
        )}
      </header>
  );
}
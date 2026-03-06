import { Facebook, Instagram, Twitter, Linkedin, Youtube, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    institucional: [
      { label: 'Quem Somos', href: '#quem-somos' },
      { label: 'Nossa História', href: '#nossa-historia' },
      { label: 'Missão e Valores', href: '#missao-valores' },
      { label: 'Equipe', href: '#equipe' },
    ],
    atuacao: [
      { label: 'Projetos', href: '#projetos' },
      { label: 'Capacitação', href: '#capacitacao' },
      { label: 'Eventos', href: '#eventos' },
      { label: 'Parcerias', href: '#parcerias' },
    ],
    transparencia: [
      { label: 'Prestação de Contas', href: '#prestacao-contas' },
      { label: 'Editais', href: '#editais' },
      { label: 'Documentos', href: '#documentos' },
      { label: 'LGPD', href: '#lgpd' },
    ],
  };

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo-reduzida.png"
                alt="Fundação 193 Logo"
                className="h-16 w-auto"
                width="64"
                height="64"
              />
              <div>
                <h3 className="text-xl font-bold">Fundação 193</h3>
                <p className="text-sm text-neutral-400">Instituição de Apoio ao CBMDF</p>
              </div>
            </div>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Instituição sem fins lucrativos criada para apoiar e fortalecer o Corpo de Bombeiros Militar do Distrito Federal, promovendo projetos, capacitações e iniciativas sociais em benefício da sociedade.
            </p>
            <p className="text-neutral-500 text-sm mb-4">
              Endereço: SHS Quadra 6, Conj. A, Bloco A, Sala 501, Brasília-DF
            </p>
            <div className="mb-6 space-y-2">
              <a
                href="tel:+5561993823763"
                className="flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors"
              >
                <Phone size={16} />
                <span>(61) 99382-3763</span>
              </a>
              <a
                href="mailto:contato@fundacao193.org.br"
                className="flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors"
              >
                <Mail size={16} />
                <span>contato@fundacao193.org.br</span>
              </a>
            </div>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100091474837798"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook da Fundação 193"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-[#1877F2] transition-colors"
                aria-label="Acesse nossa página no Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/fundacao193/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram da Fundação 193"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] transition-colors"
                aria-label="Acesse nosso Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://x.com/fundacao193"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter/X da Fundação 193"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Acesse nosso Twitter/X"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/fundacao193"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn da Fundação 193"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-[#0A66C2] transition-colors"
                aria-label="Acesse nosso LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.youtube.com/@fundacao193"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube da Fundação 193"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-[#FF0000] transition-colors"
                aria-label="Acesse nosso canal no YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Institucional</h4>
            <ul className="space-y-2">
              {links.institucional.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Atuação</h4>
            <ul className="space-y-2">
              {links.atuacao.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Transparência</h4>
            <ul className="space-y-2">
              {links.transparencia.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-400 text-sm text-center md:text-left">
              {currentYear} Fundação 193. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#lgpd" className="text-neutral-400 hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="#documentos" className="text-neutral-400 hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

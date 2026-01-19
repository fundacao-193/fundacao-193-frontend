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
              />
              <div>
                <h3 className="text-xl font-bold">Fundação 193</h3>
                <p className="text-sm text-neutral-400">Instituição de Apoio ao CBMDF</p>
              </div>
            </div>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Apoiando o Corpo de Bombeiros Militar do Distrito Federal
              há mais de três décadas, promovendo capacitação, inovação
              e excelência no atendimento à população.
            </p>
            <div className="mb-6 space-y-2">
              <a
                href="tel:+556133213000"
                className="flex items-center gap-2 text-neutral-400 hover:text-[#3d685d] transition-colors"
              >
                <Phone size={16} />
                <span>(61) 3321-3000</span>
              </a>
              <a
                href="mailto:contato@fundacao193.org.br"
                className="flex items-center gap-2 text-neutral-400 hover:text-[#3d685d] transition-colors"
              >
                <Mail size={16} />
                <span>contato@fundacao193.org.br</span>
              </a>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-[#3d685d] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-[#3d685d] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-[#3d685d] transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-[#3d685d] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-[#3d685d] transition-colors"
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
                    className="text-neutral-400 hover:text-[#3d685d] transition-colors"
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
                    className="text-neutral-400 hover:text-[#3d685d] transition-colors"
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
                    className="text-neutral-400 hover:text-[#3d685d] transition-colors"
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
              <a href="#" className="text-neutral-400 hover:text-[#3d685d] transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-neutral-400 hover:text-[#3d685d] transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

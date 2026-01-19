import { ArrowRight, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-[#3d685d] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1661806/pexels-photo-1661806.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#3d685d]/20 border border-[#3d685d]/30 rounded-full px-4 py-2 mb-6">
            <Heart size={16} className="text-[#3d685d]" />
            <span className="text-sm font-medium">Apoio ao Corpo de Bombeiros</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Apoiando quem
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#3d685d] to-[#3d685d]">
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
              className="inline-flex items-center justify-center gap-2 bg-[#3d685d] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#2f5349] transition-all hover:shadow-lg hover:shadow-[#3d685d]/30"
            >
              Conheça a Fundação
              <ArrowRight size={20} />
            </a>
            <a
              href="#areas"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              Nossos Projetos
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}

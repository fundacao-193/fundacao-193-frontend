import { Calendar, ArrowRight } from 'lucide-react';

export default function News() {
  const news = [
    {
      date: '15 Jan 2026',
      title: 'Novo curso de resgate em altura capacita 50 bombeiros',
      excerpt: 'Treinamento especializado prepara equipes para operações complexas em edifícios e estruturas elevadas.',
      image: 'https://images.pexels.com/photos/5198239/pexels-photo-5198239.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Capacitação',
    },
    {
      date: '10 Jan 2026',
      title: 'Fundação 193 entrega novos equipamentos de salvamento',
      excerpt: 'Investimento de R$ 2 milhões moderniza frota e equipamentos de resgate do CBMDF.',
      image: 'https://images.pexels.com/photos/5605061/pexels-photo-5605061.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Notícias',
    },
    {
      date: '05 Jan 2026',
      title: 'Seminário nacional discute inovação no combate a incêndios',
      excerpt: 'Evento reúne especialistas de todo o país para debater novas tecnologias e estratégias operacionais.',
      image: 'https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Eventos',
    },
  ];

  return (
    <section id="noticias" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-block bg-[#3d685d]/10 text-[#3d685d] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Notícias e Eventos
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Acompanhe nossas atividades
            </h2>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 text-[#3d685d] font-semibold hover:gap-3 transition-all">
            Ver todas
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <article
              key={index}
              className="group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-[#3d685d] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                  <Calendar size={16} />
                  <span>{item.date}</span>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-[#3d685d] transition-colors">
                  {item.title}
                </h3>

                <p className="text-neutral-600 mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                <button className="inline-flex items-center gap-2 text-[#3d685d] font-semibold text-sm hover:gap-3 transition-all">
                  Ler mais
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <button className="inline-flex items-center gap-2 text-[#3d685d] font-semibold hover:gap-3 transition-all">
            Ver todas as notícias
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

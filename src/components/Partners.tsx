export default function Partners() {
  const partners = [
    { name: 'Bonamix', logo: '/bonamix-300x180.png' },
    { name: 'Parceiro 1', logo: '/Design-sem-nome-17-300x225.png' },
    { name: 'Parceiro 2', logo: '/Design-sem-nome-18-300x225.png' },
    { name: 'Parceiro 3', logo: '/Design-sem-nome-21-300x188.png' },
    { name: 'Parceiro 4', logo: '/Design-sem-nome-32-300x188.png' },
    { name: 'Parceiro 5', logo: '/O86YKgNIAzDFCqeeaeHMl5zPyI.avif' },
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Parceiros e Apoiadores
          </h2>
          <p className="text-neutral-600">
            Instituições que acreditam no nosso propósito
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-xl px-6 py-5 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full h-20 md:h-24 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

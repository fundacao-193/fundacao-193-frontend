export default function Partners() {
  const partners = [
    { name: 'CBMDF', logo: 'https://via.placeholder.com/150x60/dc2626/ffffff?text=CBMDF' },
    { name: 'GDF', logo: 'https://via.placeholder.com/150x60/991b1b/ffffff?text=GDF' },
    { name: 'Parceiro 1', logo: 'https://via.placeholder.com/150x60/7f1d1d/ffffff?text=Parceiro+1' },
    { name: 'Parceiro 2', logo: 'https://via.placeholder.com/150x60/dc2626/ffffff?text=Parceiro+2' },
    { name: 'Parceiro 3', logo: 'https://via.placeholder.com/150x60/991b1b/ffffff?text=Parceiro+3' },
    { name: 'Parceiro 4', logo: 'https://via.placeholder.com/150x60/7f1d1d/ffffff?text=Parceiro+4' },
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full h-12 object-contain grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

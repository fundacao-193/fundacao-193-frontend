import { useEffect, useState } from 'react';
import { fetchParceiros } from '../services/api';
import type { Partner } from '../types/partners';

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPartners() {
      try {
        const data = await fetchParceiros();
        setPartners(data);
      } catch (error) {
        console.error('Erro ao carregar parceiros', error);
        setPartners([]);
      } finally {
        setLoading(false);
      }
    }

    loadPartners();
  }, []);

  if (loading || partners.length === 0) {
    return null;
  }

  const extractLogoUrl = (logoValue: unknown): string => {
    if (!logoValue) return '';

    if (typeof logoValue === 'string') return logoValue;

    if (typeof logoValue === 'object' && logoValue !== null) {
      const obj = logoValue as Record<string, unknown>;
      if (typeof obj.url === 'string') return obj.url;
    }

    return '';
  };

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 items-center">
          {partners.map((partner) => {
            const name =
              partner.acf?.partner_name ||
              partner.title?.rendered ||
              '';

            const logoUrl = extractLogoUrl(partner.acf?.partner_logo);
            const link = partner.acf?.partner_website;

            if (!logoUrl) return null;

            const image = (
              <img
                src={logoUrl}
                alt={name}
                className="
                  max-w-full
                  h-20
                  md:h-24
                  object-contain
                  opacity-90
                  transition-all
                  hover:opacity-100
                "
                onError={(e) => {
                  console.error('Erro ao carregar logo:', logoUrl);
                  e.currentTarget.style.display = 'none';
                }}
              />
            );

            return (
              <div
                key={partner.id}
                className="
                  bg-white
                  rounded-xl
                  px-6
                  py-5
                  flex
                  items-center
                  justify-center
                  shadow-sm
                  hover:shadow-md
                  hover:-translate-y-1
                  transition-all
                  duration-200
                "
              >
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full h-full"
                  >
                    {image}
                  </a>
                ) : (
                  image
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

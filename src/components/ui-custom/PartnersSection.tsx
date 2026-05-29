import { ExternalLink } from 'lucide-react';

interface Partner {
  name: string;
  subtitle: string;
  logo: string;
  url: string;
}

const partners: Partner[] = [
  {
    name: 'Universidad de Los Andes',
    subtitle: 'ULA - Mérida, Venezuela',
    logo: '/app/images/logo-ula.png',
    url: 'https://www.ula.ve',
  },
  {
    name: 'FERMENTUM',
    subtitle: 'Revista Científica del HUMANIC',
    logo: '/app/images/logo-fermentum.png',
    url: '/revista',
  },
];

export function PartnersSection() {
  return (
    <section className="relative py-10 lg:py-14 bg-white border-y border-slate-100">
      <div className="w-full section-padding">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400 font-medium">
            Con el respaldo institucional de
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 lg:gap-24">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target={partner.url.startsWith('http') ? '_blank' : undefined}
              rel={partner.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105"
            >
              <div className={`relative h-20 w-auto flex items-center justify-center px-4 rounded-lg ${partner.name === 'Universidad de Los Andes' ? 'bg-ula-navy' : ''}`}>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-20 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700 group-hover:text-neon-lime transition-colors">
                  {partner.name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {partner.subtitle}
                </p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ExternalLink } from 'lucide-react';

interface Partner {
  name: string;
  logo: string;
  url: string;
}

const partners: Partner[] = [
  {
    name: 'Facultad de Humanidades y Educación',
    logo: '/app/images/logo-humanidades.png',
    url: 'https://www.ula.ve/humanidades',
  },
  {
    name: 'Universidad de Los Andes',
    logo: '/app/images/logo-ula.png',
    url: 'https://www.ula.ve',
  },
  {
    name: 'Saber ULA',
    logo: '/app/images/logo-saber.png',
    url: 'http://www.saber.ula.ve',
  },
  {
    name: 'FERMENTUM',
    logo: '/app/images/logo-fermentum.png',
    url: '/revista',
  },
];

export function PartnersSection() {
  return (
    <section className="py-10 lg:py-14 bg-slate-50 border-y border-slate-200">
      <div className="w-full section-padding">
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 lg:gap-20">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target={partner.url.startsWith('http') ? '_blank' : undefined}
              rel={partner.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-center transition-all duration-300 hover:opacity-100 opacity-50 hover:-translate-y-1"
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain max-w-[150px] sm:max-w-[180px] transition-all duration-300 group-hover:scale-105"
                style={{ filter: 'brightness(0)' }}
              />
              <ExternalLink className="w-3 h-3 text-slate-300 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

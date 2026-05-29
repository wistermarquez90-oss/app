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
        <p className="text-center text-xs text-slate-400 uppercase tracking-widest mb-6">
          Instituciones Aliadas
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 lg:gap-14">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target={partner.url.startsWith('http') ? '_blank' : undefined}
              rel={partner.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-2 transition-all duration-300 hover:opacity-100 opacity-55 hover:-translate-y-0.5"
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain max-w-[140px] sm:max-w-[160px]"
                style={{ filter: 'brightness(0)' }}
              />
              <ExternalLink className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ExternalLink } from 'lucide-react';

interface Partner {
  name: string;
  logo: string;
  url: string;
}

const partners: Partner[] = [
  {
    name: 'Universidad de Los Andes',
    logo: '/app/images/logo-ula.png',
    url: 'https://www.ula.ve',
  },
  {
    name: 'FERMENTUM',
    logo: '/app/images/logo-fermentum.png',
    url: '/revista',
  },
];

export function PartnersSection() {
  return (
    <section className="py-5 bg-white border-y border-slate-100">
      <div className="w-full section-padding">
        <p className="text-center text-[11px] uppercase tracking-[0.25em] text-slate-400 font-medium mb-3">
          Con el respaldo institucional de
        </p>

        <div className="flex items-center justify-center gap-6 sm:gap-10">
          {partners.map((partner, index) => (
            <>
              <a
                key={partner.name}
                href={partner.url}
                target={partner.url.startsWith('http') ? '_blank' : undefined}
                rel={partner.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center transition-opacity duration-300 hover:opacity-100 opacity-60"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 sm:h-10 w-auto object-contain"
                />
                <ExternalLink className="w-3 h-3 text-slate-300 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              {index < partners.length - 1 && (
                <span className="text-slate-300 text-xs">·</span>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}

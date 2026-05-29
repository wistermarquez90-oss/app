
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
    <section className="py-12 lg:py-16 bg-gradient-to-r from-[#e0f2fe] via-[#f0f9ff] to-[#e0f2fe] border-y border-slate-200/60 relative overflow-hidden">
      {/* Decorative left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-humanic-green/40 via-neon-lime/30 to-humanic-green/40"></div>
      
      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(2,132,199,0.4) 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }}></div>
      
      <div className="relative w-full section-padding">
        <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-16 lg:gap-24">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target={partner.url.startsWith('http') ? '_blank' : undefined}
              rel={partner.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative flex items-center transition-all duration-500 hover:opacity-100 opacity-40 hover:-translate-y-1"
              title={partner.name}
            >
              {/* Hover glow effect */}
              <div className="absolute -inset-4 rounded-xl bg-humanic-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              <img
                src={partner.logo}
                alt={partner.name}
                className="relative h-11 sm:h-13 lg:h-15 w-auto object-contain max-w-[160px] sm:max-w-[190px] transition-all duration-500 group-hover:scale-110"
                style={{ filter: 'brightness(0)' }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

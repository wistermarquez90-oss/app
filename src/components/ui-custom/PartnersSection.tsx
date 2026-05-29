import { ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';

interface Partner {
  name: string;
  shortName: string;
  logo: string;
  url: string;
  description: string;
}

const partners: Partner[] = [
  {
    name: 'Facultad de Humanidades y Educación',
    shortName: 'Humanidades ULA',
    logo: '/app/images/logo-humanidades.png',
    url: 'https://www.ula.ve/humanidades',
    description: 'Formación académica en humanidades y ciencias de la educación',
  },
  {
    name: 'Universidad de Los Andes',
    shortName: 'ULA',
    logo: '/app/images/logo-ula.png',
    url: 'https://www.ula.ve',
    description: 'Institución líder en investigación y educación superior en Venezuela',
  },
  {
    name: 'Saber ULA',
    shortName: 'Saber ULA',
    logo: '/app/images/logo-saber.png',
    url: 'http://www.saber.ula.ve',
    description: 'Repositorio institucional de acceso abierto a la producción académica',
  },
  {
    name: 'FERMENTUM',
    shortName: 'FERMENTUM',
    logo: '/app/images/logo-fermentum.png',
    url: '/revista',
    description: 'Revista científica de ciencias humanas con más de 45 años de trayectoria',
  },
];

export function PartnersSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(2,132,199,0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="relative w-full section-padding">
        <SectionHeader
          title="Instituciones Aliadas"
          subtitle="Nuestra Red"
          description="Colaboramos con instituciones académicas de excelencia para fortalecer la investigación y la difusión del conocimiento"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {partners.map((partner, index) => (
            <a
              key={partner.name}
              href={partner.url}
              target={partner.url.startsWith('http') ? '_blank' : undefined}
              rel={partner.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`
                group relative flex flex-col items-center p-6 
                bg-white rounded-2xl border border-slate-200 
                hover:border-humanic-green/40 transition-all duration-500 
                hover:-translate-y-2 hover:shadow-xl
                ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
              `}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Decorative gradient on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-humanic-green/5 via-transparent to-neon-lime/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative flex flex-col items-center">
                {/* Logo container */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-5 
                                bg-white rounded-2xl p-4 
                                border border-slate-100 group-hover:border-slate-200 transition-colors duration-300">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain transition-all duration-500 
                               group-hover:scale-110"
                  />
                </div>
                
                {/* Name */}
                <h3 className="text-slate-800 font-semibold text-base text-center mb-2 
                               group-hover:text-humanic-green transition-colors duration-300">
                  {partner.shortName}
                </h3>
                
                {/* Description */}
                <p className="text-slate-400 text-xs text-center leading-relaxed mb-4">
                  {partner.description}
                </p>
                
                {/* Link indicator */}
                <div className="flex items-center gap-1 text-slate-300 text-xs 
                                group-hover:text-neon-lime transition-colors duration-300">
                  <span>Visitar sitio</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-humanic-green/30"></span>
          <span className="w-2 h-2 rounded-full bg-humanic-green/30"></span>
          <span className="w-24 h-px bg-gradient-to-r from-humanic-green/30 via-neon-lime/30 to-humanic-green/30"></span>
          <span className="w-2 h-2 rounded-full bg-neon-lime/30"></span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-neon-lime/30"></span>
        </div>
      </div>
    </section>
  );
}

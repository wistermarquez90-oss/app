import { Target, Eye, BookOpen, Users, Award, Globe, Leaf, Lightbulb, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { editorialTeam, researchLines } from '@/data/fermentum-data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const values = [
  {
    icon: BookOpen,
    title: 'Excelencia Académica',
    description: 'Compromiso con los más altos estándares de calidad en la investigación científica.',
  },
  {
    icon: Globe,
    title: 'Impacto Regional',
    description: 'Contribución al desarrollo sostenible de la región andina mediante el conocimiento.',
  },
  {
    icon: Users,
    title: 'Colaboración',
    description: 'Trabajo en red con investigadores, instituciones y comunidades locales.',
  },
  {
    icon: Leaf,
    title: 'Sostenibilidad',
    description: 'Enfoque en el desarrollo sostenible y la preservación del patrimonio natural.',
  },
  {
    icon: Lightbulb,
    title: 'Innovación',
    description: 'Promoción de nuevas metodologías y enfoques interdisciplinarios.',
  },
  {
    icon: Heart,
    title: 'Compromiso Social',
    description: 'Investigación orientada al bienestar de las comunidades andinas.',
  },
];

export function QuienesSomos() {
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: linesRef, isVisible: linesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative py-12 lg:py-20 bg-ula-navy-dark/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-humanic-green/10 via-transparent to-transparent"></div>
        
        <div className="relative w-full section-padding">
          <SectionHeader
            title="Quiénes Somos"
            subtitle="Sobre FERMENTUM"
            description="Conoce nuestra historia, misión y el equipo que hace posible la difusión del conocimiento científico sobre la región andina"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 lg:py-20">
        <div className="w-full section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={missionVisible ? 'animate-fade-in-up' : 'opacity-0'} ref={missionRef}>
              <Badge className="bg-humanic-green/20 text-humanic-green border-humanic-green/30 mb-4">
                Nuestra Historia
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-white font-serif mb-6">
                Cuatro décadas de <span className="text-neon-lime">conocimiento andino</span>
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  FERMENTUM nace en 1979 como iniciativa de un grupo de investigadores de la Universidad 
                  de Los Andes comprometidos con el estudio científico de la región andina venezolana. 
                  Desde entonces, se ha consolidado como una de las publicaciones académicas más 
                  importantes del país en el ámbito de las ciencias sociales y naturales.
                </p>
                <p>
                  El nombre "FERMENTUM" evoca el proceso de transformación y crecimiento que caracteriza 
                  tanto a la región andina como al conocimiento científico en constante evolución. 
                  Nuestra revista ha publicado más de 1,200 artículos de investigadores nacionales e 
                  internacionales, contribuyendo significativamente al desarrollo académico de la región.
                </p>
                <p>
                  Actualmente, FERMENTUM mantiene un riguroso proceso de arbitraje internacional y está 
                  indexada en múltiples bases de datos académicas, garantizando la visibilidad y el 
                  impacto de las investigaciones que publicamos.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-humanic-green/20 to-neon-lime/10 rounded-3xl blur-2xl"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="text-4xl font-bold text-neon-lime mb-2">45+</div>
                    <div className="text-white/60 text-sm">Años de trayectoria</div>
                  </div>
                  <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="text-4xl font-bold text-humanic-green mb-2">1,200+</div>
                    <div className="text-white/60 text-sm">Artículos publicados</div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="text-4xl font-bold text-bronze mb-2">180+</div>
                    <div className="text-white/60 text-sm">Investigadores</div>
                  </div>
                  <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="text-4xl font-bold text-white mb-2">85K+</div>
                    <div className="text-white/60 text-sm">Descargas anuales</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 lg:py-20 bg-ula-navy-dark/30">
        <div className="w-full section-padding">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-14 h-14 rounded-xl bg-humanic-green/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-humanic-green" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Misión</h3>
              <p className="text-white/70 leading-relaxed">
                Difundir el conocimiento científico de excelencia sobre la región andina, 
                promoviendo la investigación interdisciplinaria que contribuya al desarrollo 
                sostenible, la preservación del patrimonio cultural y natural, y el bienestar 
                de las comunidades locales. Facilitamos un espacio de diálogo académico riguroso 
                que conecta investigadores, instituciones y sociedad.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-14 h-14 rounded-xl bg-neon-lime/20 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-neon-lime" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Visión</h3>
              <p className="text-white/70 leading-relaxed">
                Ser la revista científica de referencia en Latinoamérica para el estudio de 
                regiones de montaña, reconocida por la calidad académica de sus publicaciones, 
                su impacto en políticas públicas y su contribución al desarrollo sostenible. 
                Consolidarnos como un puente entre el conocimiento científico y las necesidades 
                de las comunidades andinas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-12 lg:py-20">
        <div className="w-full section-padding">
          <SectionHeader
            title="Nuestros Valores"
            subtitle="Principios Fundamentales"
            description="Los valores que guían nuestro trabajo editorial y académico"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={value.title}
                  className={`
                    group p-6 bg-white/5 rounded-xl border border-white/10 
                    hover:border-humanic-green/50 transition-all duration-300 
                    hover:-translate-y-1 hover:shadow-lg hover:bg-white/[0.07]
                    ${valuesVisible ? 'animate-fade-in-up' : 'opacity-0'}
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-humanic-green/10 flex items-center justify-center mb-4 group-hover:bg-humanic-green/20 transition-colors">
                    <Icon className="w-6 h-6 text-humanic-green group-hover:text-neon-lime transition-colors" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-neon-lime transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Research Lines */}
      <section id="lineas" ref={linesRef} className="py-12 lg:py-20 bg-ula-navy-dark/30">
        <div className="w-full section-padding">
          <SectionHeader
            title="Líneas de Investigación"
            subtitle="Áreas de Conocimiento"
            description="Las principales áreas de investigación que promovemos y desarrollamos"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchLines.map((line, index) => (
              <div 
                key={line.id}
                className={`
                  group p-6 bg-white/5 rounded-xl border border-white/10 
                  hover:border-neon-lime/50 transition-all duration-300 
                  hover:-translate-y-1 hover:shadow-lg
                  ${linesVisible ? 'animate-fade-in-up' : 'opacity-0'}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-neon-lime/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-neon-lime" />
                  </div>
                  <Badge className="bg-white/10 text-white/70">
                    {line.publications} publ.
                  </Badge>
                </div>
                
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-neon-lime transition-colors">
                  {line.name}
                </h3>
                
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {line.description}
                </p>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">
                      Coordinador: <span className="text-white/70">{line.leader}</span>
                    </span>
                    <span className="text-white/50">
                      {line.members} miembros
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Team */}
      <section id="equipo" ref={teamRef} className="py-12 lg:py-20">
        <div className="w-full section-padding">
          <SectionHeader
            title="Equipo Editorial"
            subtitle="Nuestro Equipo"
            description="Las personas que hacen posible la publicación de FERMENTUM"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {editorialTeam.map((member, index) => {
              const initials = member.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();

              return (
                <div 
                  key={member.id}
                  className={`
                    group text-center p-6 bg-white/5 rounded-xl border border-white/10 
                    hover:border-humanic-green/50 transition-all duration-300 
                    hover:-translate-y-1 hover:bg-white/[0.07]
                    ${teamVisible ? 'animate-fade-in-up' : 'opacity-0'}
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Avatar className="w-20 h-20 mx-auto mb-4 bg-humanic-green/20 border-2 border-humanic-green/30">
                    <AvatarFallback className="bg-humanic-green/20 text-humanic-green text-xl font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-white font-semibold mb-1 group-hover:text-neon-lime transition-colors">
                    {member.name}
                  </h3>
                  
                  <p className="text-humanic-green text-sm mb-3">
                    {member.role}
                  </p>
                  
                  <p className="text-white/50 text-xs leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

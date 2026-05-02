import { Target, Eye, BookOpen, Users, Award, Globe, Lightbulb, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { editorialTeam, researchLines } from '@/data/fermentum-data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const values = [
  {
    icon: BookOpen,
    title: 'Excelencia Académica',
    description: 'Compromiso con los más altos estándares de calidad en la producción, discusión e intercambio de conocimientos en las ciencias humanas.',
  },
  {
    icon: Globe,
    title: 'Flexibilidad y Versatilidad',
    description: 'Capacidad de adaptación a los cambios y apertura a nuevas metodologías y enfoques interdisciplinarios.',
  },
  {
    icon: Heart,
    title: 'Responsabilidad Social',
    description: 'Valorización del sentido de lo humano y aporte de conocimientos para el bienestar común.',
  },
  {
    icon: Users,
    title: 'Trabajo en Equipo',
    description: 'La conjunción de habilidades y conocimientos de los miembros en función de los propósitos comunes.',
  },
  {
    icon: Lightbulb,
    title: 'Sentido de Pertenencia',
    description: 'Espíritu de cuerpo que incentiva la obtención de logros individuales y colectivos.',
  },
];

export function QuienesSomos() {
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: objectivesRef, isVisible: objectivesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
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
            subtitle="Sobre HUMANIC"
            description="Conoce nuestra historia, misión y el equipo que hace posible la investigación y difusión del conocimiento sobre las ciencias humanas en la región andina"
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
                Más de tres décadas de <span className="text-neon-lime">conocimiento humano</span>
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  <strong className="text-white">HUMANIC</strong> (Centro de Investigaciones en Ciencias Humanas) 
                  tiene sus orígenes en 1989, cuando un grupo de investigadores de la Universidad de Los Andes — 
                  encabezados por la Profesora <strong className="text-white">Carmen Teresa García</strong> y el 
                  Profesor <strong className="text-white">Oswaldo Jiménez</strong> — concibieron la Revista 
                  <strong className="text-white"> FERMENTUM</strong> como un espacio de encuentro para sociólogos 
                  y antropólogos de la región andina, quienes se sentían aislados del diálogo académico nacional e internacional.
                </p>
                <p>
                  En abril de 1991 vio la luz el primer número de Fermentum, presentado en un Congreso Latinoamericano 
                  en La Habana, Cuba. Paralelamente, el grupo formalizó sus actividades como 
                  <strong className="text-white"> GISAC</strong> (Grupo de Investigación de Sociología y Antropología de la Ciudad), 
                  con el apoyo del CDCCHT (Consejo de Desarrollo Científico, Humanístico y Tecnológico) y 
                  FUNDACITE del Estado Mérida.
                </p>
                <p>
                  Tras la muerte del Profesor Oswaldo Jiménez en 1994 y el año sabático de la Profesora García, 
                  el grupo se fortaleció con la incorporación de nuevos investigadores como 
                  <strong className="text-white"> Alejandrina Silva</strong>, <strong className="text-white"> Nelson Morales</strong>, 
                  <strong className="text-white"> Luz Pargas</strong>, <strong className="text-white"> Ana Rita Tiberi</strong> y 
                  <strong className="text-white"> María Méndez Peña</strong>. En agosto de 1999 se solicitó formalmente 
                  al Consejo Universitario el reconocimiento como Centro de Investigaciones, cimiento de lo que hoy es HUMANIC.
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
                Nuestro compromiso se orienta en dos vertientes: hacia la Universidad, en la búsqueda 
                de consolidar un espacio académico para la formación de recursos humanos y la producción, 
                discusión e intercambio de conocimientos en las ciencias humanas; hacia el entorno social, 
                valorizando el sentido de lo humano y aportando conocimientos y experticias para el 
                logro del bien y del bienestar común.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-14 h-14 rounded-xl bg-neon-lime/20 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-neon-lime" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Visión</h3>
              <p className="text-white/70 leading-relaxed">
                Ser un Centro de referencia académica a escala nacional e internacional en la 
                producción de conocimientos y tecnología social en las ciencias humanas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section ref={objectivesRef} className="py-12 lg:py-20">
        <div className="w-full section-padding">
          <SectionHeader
            title="Objetivos"
            subtitle="Propósitos Institucionales"
            description="Los fines que orientan el quehacer de HUMANIC en la Universidad y la sociedad"
          />

          {/* General Objective */}
          <div className={`mb-12 ${objectivesVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-humanic-green"></div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-humanic-green/20 flex items-center justify-center shrink-0">
                  <Target className="w-7 h-7 text-humanic-green" />
                </div>
                <div>
                  <Badge className="bg-humanic-green/20 text-humanic-green border-humanic-green/30 mb-3">
                    Objetivo General
                  </Badge>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Incentivar la reflexión, el estudio y la investigación de las distintas 
                    manifestaciones de <strong className="text-white">lo humano</strong> y de la 
                    <strong className="text-white"> vida en sociedad</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Specific Objectives */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${objectivesVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '150ms' }}>
            {[
              {
                num: '01',
                title: 'Líneas de investigación',
                desc: 'Desarrollar las líneas de investigación definidas por el Centro.',
              },
              {
                num: '02',
                title: 'Formación continua',
                desc: 'Realizar talleres, seminarios y cursos no conducentes a grado académico.',
              },
              {
                num: '03',
                title: 'Recursos humanos',
                desc: 'Formar recursos humanos para la investigación a nivel de Pre y Postgrado.',
              },
              {
                num: '04',
                title: 'Asesorías y consultorías',
                desc: 'Prestar asesorías, consultorías y servicios para y con la comunidad local, regional, nacional e internacional.',
              },
              {
                num: '05',
                title: 'Intercambios institucionales',
                desc: 'Sostener intercambios con organizaciones afines en el plano académico, ONG y organizaciones gubernamentales.',
              },
              {
                num: '06',
                title: 'Difusión de resultados',
                desc: 'Difundir los productos y resultados de las investigaciones a través de los distintos medios (impresos, informáticos y digitales).',
              },
              {
                num: '07',
                title: 'Acompañamiento social',
                desc: 'Llevar a cabo actividades de acompañamiento social en las comunidades.',
              },
            ].map((obj) => (
              <div
                key={obj.num}
                className="group p-6 bg-white/5 rounded-xl border border-white/10 hover:border-humanic-green/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white/[0.07]"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-humanic-green/40 group-hover:text-humanic-green/60 transition-colors shrink-0">
                    {obj.num}
                  </span>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-neon-lime transition-colors">
                      {obj.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {obj.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-12 lg:py-20">
        <div className="w-full section-padding">
          <SectionHeader
            title="Nuestros Principios"
            subtitle="Filosofía de Gestión"
            description="Los valores y creencias que guían las acciones de los miembros de HUMANIC"
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

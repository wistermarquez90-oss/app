import { Link } from 'react-router-dom';
import { 
  FileText, CheckCircle, Clock, Users, BookOpen, 
  Download, ArrowRight, AlertCircle, List, FileCheck,
  Send, Calendar, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { publicationGuidelines } from '@/data/fermentum-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const evaluationSteps = [
  {
    icon: FileText,
    title: 'Recepción',
    description: 'El manuscrito es recibido y se verifica que cumpla con los requisitos formales.',
    duration: '5 días',
  },
  {
    icon: Users,
    title: 'Asignación de Evaluadores',
    description: 'Se seleccionan dos evaluadores especializados en el tema del artículo.',
    duration: '3 días',
  },
  {
    icon: CheckCircle,
    title: 'Primera Evaluación',
    description: 'Los evaluadores revisan el manuscrito y emiten sus recomendaciones.',
    duration: '30 días',
  },
  {
    icon: FileCheck,
    title: 'Revisión por Autores',
    description: 'Los autores realizan las correcciones sugeridas por los evaluadores.',
    duration: '15 días',
  },
  {
    icon: CheckCircle,
    title: 'Segunda Evaluación',
    description: 'Si es necesario, se realiza una segunda ronda de evaluación.',
    duration: '15 días',
  },
  {
    icon: BookOpen,
    title: 'Publicación',
    description: 'El artículo aprobado es editado y publicado en el siguiente volumen.',
    duration: 'Variable',
  },
];

const formatRequirements = [
  {
    title: 'Extensión',
    description: '6,000 a 10,000 palabras incluyendo referencias bibliográficas',
    icon: FileText,
  },
  {
    title: 'Formato',
    description: 'Times New Roman 12, interlineado 1.5, márgenes de 2.5 cm',
    icon: FileCheck,
  },
  {
    title: 'Resumen',
    description: 'Máximo 250 palabras en español e inglés (abstract)',
    icon: BookOpen,
  },
  {
    title: 'Palabras Clave',
    description: 'Máximo 5 palabras clave en español e inglés (keywords)',
    icon: List,
  },
  {
    title: 'Citación',
    description: 'Norma APA 7ma edición para todas las referencias',
    icon: CheckCircle,
  },
  {
    title: 'Archivo',
    description: 'Formato Word (.docx) sin macros ni protección',
    icon: FileText,
  },
];

export function Normas() {
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: formatRef, isVisible: formatVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative py-12 lg:py-20 bg-ula-navy-dark/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-humanic-green/10 via-transparent to-transparent"></div>
        
        <div className="relative w-full section-padding">
          <SectionHeader
            title="Normas de Publicación"
            subtitle="Guía para Autores"
            description="Todo lo que necesitas saber para publicar tu investigación en FERMENTUM"
          />
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-8 lg:py-12">
        <div className="w-full section-padding">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white/5 rounded-xl border border-white/10 text-center">
              <Clock className="w-8 h-8 text-humanic-green mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">45-60</div>
              <div className="text-white/60 text-sm">Días promedio de evaluación</div>
            </div>
            <div className="p-5 bg-white/5 rounded-xl border border-white/10 text-center">
              <Users className="w-8 h-8 text-neon-lime mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">Doble Ciego</div>
              <div className="text-white/60 text-sm">Sistema de revisión por pares</div>
            </div>
            <div className="p-5 bg-white/5 rounded-xl border border-white/10 text-center">
              <Calendar className="w-8 h-8 text-bronze mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">2x/año</div>
              <div className="text-white/60 text-sm">Publicaciones semestrales</div>
            </div>
            <div className="p-5 bg-white/5 rounded-xl border border-white/10 text-center">
              <FileCheck className="w-8 h-8 text-humanic-green mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">Gratuito</div>
              <div className="text-white/60 text-sm">Sin costos de publicación</div>
            </div>
          </div>
        </div>
      </section>

      {/* Evaluation Process */}
      <section ref={processRef} className="py-12 lg:py-20 bg-ula-navy-dark/30">
        <div className="w-full section-padding">
          <SectionHeader
            title="Proceso de Evaluación"
            subtitle="Revisión por Pares"
            description="Conoce el riguroso proceso que garantiza la calidad de nuestras publicaciones"
          />

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-humanic-green via-neon-lime to-humanic-green hidden md:block"></div>

            <div className="space-y-8">
              {evaluationSteps.map((step, index) => {
                const Icon = step.icon;
                const isLeft = index % 2 === 0;

                return (
                  <div 
                    key={step.title}
                    className={`
                      relative flex flex-col md:flex-row items-start gap-4 md:gap-8
                      ${processVisible ? 'animate-fade-in-up' : 'opacity-0'}
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neon-lime border-4 border-ula-navy hidden md:block"></div>

                    {/* Content */}
                    <div className={`
                      flex-1 md:w-1/2 pl-16 md:pl-0
                      ${isLeft ? 'md:pr-12 lg:pr-16 md:text-right' : 'md:pl-12 lg:pl-16 md:ml-auto'}
                    `}>
                      <div className={`
                        p-6 bg-white/5 rounded-xl border border-white/10 
                        hover:border-humanic-green/50 transition-all duration-300
                        ${isLeft ? 'md:ml-auto' : ''}
                      `}>
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                          <div className="w-10 h-10 rounded-lg bg-humanic-green/20 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-humanic-green" />
                          </div>
                          <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                        </div>
                        <p className="text-white/60 text-sm mb-3">{step.description}</p>
                        <Badge variant="outline" className="border-neon-lime/30 text-neon-lime">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Format Requirements */}
      <section ref={formatRef} className="py-12 lg:py-20">
        <div className="w-full section-padding">
          <SectionHeader
            title="Requisitos de Formato"
            subtitle="Guía de Estilo"
            description="Especificaciones técnicas para la preparación de manuscritos"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {formatRequirements.map((req, index) => {
              const Icon = req.icon;
              return (
                <div 
                  key={req.title}
                  className={`
                    group p-6 bg-white/5 rounded-xl border border-white/10 
                    hover:border-neon-lime/50 transition-all duration-300 
                    hover:-translate-y-1 hover:shadow-lg hover:bg-white/[0.07]
                    ${formatVisible ? 'animate-fade-in-up' : 'opacity-0'}
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-neon-lime/10 flex items-center justify-center mb-4 group-hover:bg-neon-lime/20 transition-colors">
                    <Icon className="w-6 h-6 text-neon-lime" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {req.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {req.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Download Template */}
          <div className="mt-12 p-8 bg-gradient-to-br from-humanic-green/20 to-neon-lime/10 rounded-2xl border border-humanic-green/30 text-center">
            <FileText className="w-12 h-12 text-humanic-green mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Plantilla de Manuscrito
            </h3>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              Descarga nuestra plantilla en formato Word con todos los estilos 
              predefinidos para facilitar la preparación de tu manuscrito.
            </p>
            <Button 
              size="lg"
              className="bg-neon-lime text-ula-navy-dark hover:bg-neon-lime-light font-semibold"
            >
              <Download className="w-5 h-5 mr-2" />
              Descargar Plantilla
            </Button>
          </div>
        </div>
      </section>

      {/* Detailed Guidelines */}
      <section className="py-12 lg:py-20 bg-ula-navy-dark/30">
        <div className="w-full section-padding">
          <SectionHeader
            title="Normas Detalladas"
            subtitle="Información Completa"
            description="Respuestas a las preguntas más frecuentes sobre el proceso de publicación"
          />

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {publicationGuidelines.map((guideline, index) => (
                <AccordionItem 
                  key={guideline.id} 
                  value={guideline.id}
                  className="bg-white/5 rounded-xl border border-white/10 px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-white hover:text-neon-lime py-4 hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <span className="w-8 h-8 rounded-lg bg-humanic-green/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-humanic-green">
                        {index + 1}
                      </span>
                      <span className="font-semibold">{guideline.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 pb-4 pl-11">
                    <p className="mb-4">{guideline.description}</p>
                    
                    {guideline.steps && (
                      <ol className="space-y-2">
                        {guideline.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-neon-lime/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs text-neon-lime font-medium">
                              {i + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                    
                    {guideline.requirements && (
                      <ul className="space-y-2">
                        {guideline.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-humanic-green flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-12 lg:py-20">
        <div className="w-full section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="p-6 bg-amber-500/10 rounded-xl border border-amber-500/30 mb-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-amber-400 font-semibold mb-2">Consideraciones Importantes</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• Los manuscritos deben ser originales y no haber sido publicados previamente.</li>
                    <li>• Se aceptan contribuciones en español, inglés y portugués.</li>
                    <li>• La publicación en FERMENTUM es gratuita; no se cobran tarifas de procesamiento.</li>
                    <li>• Los autores conservan los derechos de autor de sus trabajos (licencia Creative Commons).</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 bg-humanic-green/10 rounded-xl border border-humanic-green/30">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-humanic-green flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-humanic-green font-semibold mb-2">¿Necesitas ayuda?</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Si tienes dudas sobre el proceso de publicación o necesitas asistencia 
                    con tu manuscrito, no dudes en contactar a nuestro equipo editorial.
                  </p>
                  <Button 
                    variant="outline"
                    className="border-humanic-green/50 text-humanic-green hover:bg-humanic-green/10"
                    asChild
                  >
                    <Link to="/contacto">
                      Contactar al Equipo Editorial
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-20 bg-ula-navy-dark/50">
        <div className="w-full section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white font-serif mb-4">
              ¿Listo para enviar tu artículo?
            </h2>
            <p className="text-white/70 mb-8">
              Accede a nuestra plataforma OJS para iniciar el proceso de envío de tu manuscrito.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-neon-lime text-ula-navy-dark hover:bg-neon-lime-light font-semibold px-8"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Manuscrito
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8"
                asChild
              >
                <Link to="/contacto">
                  Contactar Soporte
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

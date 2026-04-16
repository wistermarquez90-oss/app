import { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, 
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  CheckCircle, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { contactInfo, socialLinks } from '@/data/fermentum-data';

const getIcon = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
  };
  return icons[iconName] || Mail;
};

export function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { ref: formRef, isVisible: formVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative py-12 lg:py-20 bg-ula-navy-dark/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-humanic-green/10 via-transparent to-transparent"></div>
        
        <div className="relative w-full section-padding">
          <SectionHeader
            title="Contacto"
            subtitle="Estamos aquí para ayudarte"
            description="Ponte en contacto con nuestro equipo para cualquier consulta sobre publicaciones, envío de manuscritos o información general"
          />
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 lg:py-20">
        <div className="w-full section-padding">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div 
              ref={infoRef}
              className={`lg:col-span-2 space-y-6 ${infoVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Información de Contacto
                </h2>
                <p className="text-white/70 mb-8">
                  Nuestro equipo está disponible para atender tus consultas sobre el 
                  proceso de publicación, envío de manuscritos o cualquier otra 
                  información relacionada con FERMENTUM.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 bg-white/5 rounded-xl border border-white/10 hover:border-humanic-green/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-humanic-green/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-humanic-green" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Dirección</h3>
                    <p className="text-white/60 text-sm">{contactInfo.address}</p>
                    <p className="text-white/60 text-sm">{contactInfo.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white/5 rounded-xl border border-white/10 hover:border-humanic-green/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-neon-lime/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-neon-lime" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Correo Electrónico</h3>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-white/60 text-sm hover:text-neon-lime transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white/5 rounded-xl border border-white/10 hover:border-humanic-green/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-bronze/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-bronze" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Teléfono</h3>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-white/60 text-sm hover:text-bronze transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white/5 rounded-xl border border-white/10 hover:border-humanic-green/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-humanic-green/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-humanic-green" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Horario de Atención</h3>
                    <p className="text-white/60 text-sm">{contactInfo.hours}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Síguenos en Redes Sociales</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = getIcon(social.icon);
                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-white/60 hover:bg-humanic-green hover:text-white transition-all duration-300 border border-white/10 hover:border-humanic-green"
                        aria-label={social.platform}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div 
              ref={formRef}
              className={`lg:col-span-3 ${formVisible ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'}`}
            >
              <div className="p-6 lg:p-8 bg-white/5 rounded-2xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Envíanos un Mensaje
                </h2>
                <p className="text-white/60 mb-6">
                  Completa el formulario y te responderemos lo antes posible.
                </p>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-humanic-green/20 rounded-xl border border-humanic-green/30 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-humanic-green flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-humanic-green font-semibold">¡Mensaje enviado!</h4>
                      <p className="text-white/70 text-sm">
                        Gracias por contactarnos. Te responderemos en breve.
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-500/20 rounded-xl border border-red-500/30 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-red-400 font-semibold">Error</h4>
                      <p className="text-white/70 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white/80">
                        Nombre Completo <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-humanic-green focus:ring-humanic-green/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/80">
                        Correo Electrónico <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-humanic-green focus:ring-humanic-green/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white/80">
                      Asunto <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="¿Sobre qué nos quieres contactar?"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-humanic-green focus:ring-humanic-green/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white/80">
                      Mensaje <span className="text-red-400">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={6}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-humanic-green focus:ring-humanic-green/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-neon-lime text-ula-navy-dark hover:bg-neon-lime-light font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-ula-navy-dark/30 border-t-ula-navy-dark rounded-full animate-spin mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 lg:py-20 bg-ula-navy-dark/30">
        <div className="w-full section-padding">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Nuestra Ubicación
            </h2>
            <p className="text-white/60">
              Centro de Investigaciones, Universidad de Los Andes
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-ula-navy-light to-ula-navy flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-humanic-green mx-auto mb-4" />
                <p className="text-white font-semibold text-lg">Universidad de Los Andes</p>
                <p className="text-white/60">Mérida, Venezuela</p>
                <a 
                  href="https://maps.google.com/?q=Universidad+de+Los+Andes+Mérida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-neon-lime hover:text-neon-lime-light transition-colors"
                >
                  Ver en Google Maps
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-20">
        <div className="w-full section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              ¿Tienes preguntas frecuentes?
            </h2>
            <p className="text-white/70 mb-8">
              Revisa nuestras normas de publicación para obtener información detallada 
              sobre el proceso de envío y evaluación de manuscritos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-humanic-green hover:bg-humanic-green-light"
                asChild
              >
                <a href="/normas">Ver Normas de Publicación</a>
              </Button>
              <Button 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <a href="/revista">Explorar Revista</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

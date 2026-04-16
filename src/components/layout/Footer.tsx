import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { contactInfo, socialLinks } from '@/data/fermentum-data';

const quickLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Revista', href: '/revista' },
  { name: 'Autores', href: '/autores' },
  { name: 'Quiénes Somos', href: '/quienes-somos' },
  { name: 'Catálogo', href: '/catalogo' },
  { name: 'Normas de Publicación', href: '/normas' },
  { name: 'Contacto', href: '/contacto' },
];

const resourceLinks = [
  { name: 'Última Edición', href: '/revista' },
  { name: 'Archivo de Volúmenes', href: '/revista/archivo' },
  { name: 'Directorio de Autores', href: '/autores' },
  { name: 'Líneas de Investigación', href: '/quienes-somos#lineas' },
  { name: 'Equipo Editorial', href: '/quienes-somos#equipo' },
];

const getIcon = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
  };
  return icons[iconName] || ExternalLink;
};

export function Footer() {
  return (
    <footer className="bg-ula-navy-dark border-t border-white/10">
      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-humanic-green to-neon-lime rounded-xl transition-transform duration-300 group-hover:scale-105">
                <Building2 className="w-7 h-7 text-ula-navy-dark" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white font-serif">
                  HUMANIC
                </span>
                <span className="text-xs text-white/60 uppercase tracking-widest">
                  Centro ULA
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Centro de Investigaciones en Ciencias Humanas de la Universidad de Los Andes. 
              Difundimos el conocimiento investigativo sobre la región andina a través de 
              nuestra revista FERMENTUM.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = getIcon(social.icon);
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-white/60 hover:bg-humanic-green hover:text-white transition-all duration-300"
                    aria-label={social.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-neon-lime"></span>
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-neon-lime transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-neon-lime transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-humanic-green"></span>
              Recursos
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-neon-lime transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-neon-lime transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-bronze"></span>
              Contacto
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-humanic-green flex-shrink-0 mt-0.5" />
                <div className="text-white/60 text-sm">
                  <p>{contactInfo.address}</p>
                  <p>{contactInfo.city}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-humanic-green flex-shrink-0" />
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-white/60 hover:text-neon-lime transition-colors text-sm"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-humanic-green flex-shrink-0" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-white/60 hover:text-neon-lime transition-colors text-sm"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-white/40 text-xs mb-1">Horario de Atención</p>
              <p className="text-white/80 text-sm">{contactInfo.hours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} HUMANIC - Centro de Investigaciones ULA. 
              Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                to="/politicas" 
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                Políticas de Privacidad
              </Link>
              <Link 
                to="/terminos" 
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

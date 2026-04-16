import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { 
    name: 'Revista', 
    href: '/revista',
    submenu: [
      { name: 'Última Edición', href: '/revista' },
      { name: 'Archivo', href: '/revista/archivo' },
      { name: 'Categorías', href: '/revista/categorias' },
    ]
  },
  { name: 'Autores', href: '/autores' },
  { name: 'Quiénes Somos', href: '/quienes-somos' },
  { name: 'Normas', href: '/normas' },
  { name: 'Contacto', href: '/contacto' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ula-navy/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full section-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-humanic-green to-neon-lime rounded-lg transition-transform duration-300 group-hover:scale-105">
              <Building2 className="w-6 h-6 text-ula-navy-dark" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white font-serif tracking-tight">
                HUMANIC
              </span>
              <span className="text-[10px] text-white/60 uppercase tracking-widest">
                Centro de Investigaciones ULA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.submenu ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`px-4 py-2 text-sm font-medium transition-colors duration-300 flex items-center gap-1 rounded-md ${
                        isActive(link.href)
                          ? 'text-white bg-white/10'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="bg-ula-navy-light border-white/10 min-w-[180px]"
                    align="start"
                  >
                    {link.submenu.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link
                          to={subItem.href}
                          className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                        >
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md ${
                    isActive(link.href)
                      ? 'text-white bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              className="bg-neon-lime text-ula-navy-dark hover:bg-neon-lime-light font-semibold px-6 transition-all duration-300 hover:shadow-glow"
            >
              Enviar Artículo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col gap-1 bg-ula-navy-light/90 backdrop-blur-md rounded-xl p-2 border border-white/10">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.href}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isActive(link.href)
                      ? 'text-white bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
                {link.submenu && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="px-4 py-2 text-xs text-white/60 hover:text-white transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button
              className="mt-2 bg-neon-lime text-ula-navy-dark hover:bg-neon-lime-light font-semibold"
            >
              Enviar Artículo
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

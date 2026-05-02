import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, BookOpen, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AuthorCard } from '@/components/ui-custom/AuthorCard';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { authors } from '@/data/fermentum-data';

export function Autores() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  // Get all unique specialties
  const specialties = useMemo(() => {
    const allSpecialties = authors.flatMap(a => a.specialty);
    return [...new Set(allSpecialties)].sort();
  }, []);

  // Filter authors
  const filteredAuthors = useMemo(() => {
    return authors.filter(author => {
      const matchesSearch = searchQuery === '' || 
        author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.affiliation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.bio.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpecialty = selectedSpecialty === '' || 
        author.specialty.includes(selectedSpecialty);
      
      return matchesSearch && matchesSpecialty;
    });
  }, [searchQuery, selectedSpecialty]);

  // Get featured authors (those with most articles)
  const featuredAuthors = useMemo(() => {
    return [...authors].sort((a, b) => b.articlesCount - a.articlesCount).slice(0, 3);
  }, []);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('');
  };

  const hasActiveFilters = searchQuery || selectedSpecialty;

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative py-12 lg:py-20 bg-sky-50/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-humanic-green/10 via-transparent to-transparent"></div>
        
        <div className="relative w-full section-padding">
          <SectionHeader
            title="Directorio de Autores"
            subtitle="Nuestros Investigadores"
            description="Conoce a los investigadores que contribuyen al conocimiento científico sobre la región andina"
          />
        </div>
      </section>

      {/* Featured Authors */}
      <section className="py-12 lg:py-16">
        <div className="w-full section-padding">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-humanic-green to-neon-lime flex items-center justify-center">
              <User className="w-5 h-5 text-ula-navy-dark" />
            </span>
            Investigadores Destacados
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredAuthors.map((author, index) => (
              <div 
                key={author.id}
                className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AuthorCard author={author} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Authors */}
      <section ref={ref} className="py-12 lg:py-16 bg-sky-50/60">
        <div className="w-full section-padding">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-humanic-green" />
              Todos los Autores
            </h2>
            
            <p className="text-slate-500">
              <span className="text-slate-800 font-semibold">{filteredAuthors.length}</span> investigadores registrados
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Buscar por nombre, afiliación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-humanic-green focus:ring-humanic-green/20"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-md text-slate-700 focus:border-humanic-green focus:outline-none"
              >
                <option value="" className="bg-ula-navy">Todas las especialidades</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty} className="bg-ula-navy">
                    {specialty}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  className="text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  onClick={clearFilters}
                >
                  <X className="w-4 h-4 mr-2" />
                  Limpiar
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <Badge className="bg-slate-50 text-slate-700 hover:bg-white/20">
                  Búsqueda: {searchQuery}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSearchQuery('')} />
                </Badge>
              )}
              {selectedSpecialty && (
                <Badge className="bg-slate-50 text-slate-700 hover:bg-white/20">
                  Especialidad: {selectedSpecialty}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedSpecialty('')} />
                </Badge>
              )}
            </div>
          )}

          {/* Authors Grid */}
          {filteredAuthors.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAuthors.map((author, index) => {
                const initials = author.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase();

                return (
                  <div 
                    key={author.id}
                    className={`
                      group p-5 bg-white rounded-xl border border-slate-200 
                      hover:border-humanic-green/50 transition-all duration-300 
                      hover:bg-white/[0.07] hover:-translate-y-1
                      ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-14 h-14 bg-humanic-green/20 border-2 border-humanic-green/30">
                        <AvatarFallback className="bg-humanic-green/20 text-humanic-green font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-slate-800 font-semibold group-hover:text-neon-lime transition-colors line-clamp-2">
                          {author.name}
                        </h3>
                        <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                          {author.affiliation}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {author.specialty.slice(0, 2).map((spec) => (
                        <span 
                          key={spec}
                          className="px-2 py-0.5 bg-humanic-green/10 rounded text-xs text-humanic-green"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {author.articlesCount} artículos
                      </span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-humanic-green hover:text-neon-lime hover:bg-humanic-green/10 p-2"
                        asChild
                      >
                        <Link to={`/autores/${author.id}`}>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-slate-800 text-xl font-semibold mb-2">
                No se encontraron autores
              </h3>
              <p className="text-slate-400 mb-6">
                Intenta ajustar los filtros de búsqueda
              </p>
              <Button 
                variant="outline" 
                className="border-slate-200 text-slate-800 hover:bg-slate-50"
                onClick={clearFilters}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full section-padding">
          <div className="max-w-3xl mx-auto text-center p-8 lg:p-12 bg-gradient-to-br from-humanic-green/20 to-neon-lime/10 rounded-2xl border border-humanic-green/30">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
              ¿Eres investigador y quieres publicar?
            </h2>
            <p className="text-slate-600 mb-8">
              Únete a nuestra red de investigadores y contribuye al conocimiento científico 
              sobre la región andina. Revisa nuestras normas de publicación.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-neon-lime text-ula-navy-dark hover:bg-neon-lime-light font-semibold"
                asChild
              >
                <Link to="/normas">
                  Ver Normas de Publicación
                </Link>
              </Button>
              <Button 
                variant="outline"
                className="border-white/30 text-slate-800 hover:bg-slate-50"
                asChild
              >
                <Link to="/contacto">
                  Contactar al Editor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

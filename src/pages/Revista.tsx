import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, Calendar, BookOpen, Download, 
  ChevronDown, Grid3X3, List, X, FileText 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArticleCard } from '@/components/ui-custom/ArticleCard';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { articles, volumes, categories } from '@/data/fermentum-data';
import type { Article } from '@/types';

const categoryNames: Record<string, string> = {
  'ciencias-sociales': 'Ciencias Sociales',
  'economia': 'Economía',
  'humanidades': 'Humanidades',
  'ciencias-naturales': 'Ciencias Naturales',
  'tecnologia': 'Tecnología',
  'salud': 'Salud',
};

const categoryColors: Record<string, string> = {
  'ciencias-sociales': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'economia': 'bg-green-500/20 text-green-300 border-green-500/30',
  'humanidades': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'ciencias-naturales': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'tecnologia': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'salud': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

function ArticleListItem({ article }: { article: Article }) {
  return (
    <div className="group flex flex-col lg:flex-row gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-humanic-green/50 transition-all duration-300 hover:bg-white/[0.07]">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge 
            variant="outline" 
            className={`${categoryColors[article.category]} text-xs`}
          >
            {categoryNames[article.category]}
          </Badge>
          <span className="text-white/40 text-xs flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(article.publishedDate).toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'short' 
            })}
          </span>
          <span className="text-white/40 text-xs">
            Vol. {article.volume}, N° {article.issue}
          </span>
        </div>
        
        <h4 className="text-white font-medium group-hover:text-neon-lime transition-colors line-clamp-2 mb-2">
          {article.title}
        </h4>
        
        <p className="text-white/50 text-sm line-clamp-1 mb-2">
          {article.authors.map(a => a.name).join(', ')}
        </p>
        
        <p className="text-white/40 text-sm line-clamp-2">
          {article.abstract}
        </p>
      </div>
      
      <div className="flex lg:flex-col items-center lg:items-end gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              size="sm" 
              variant="outline"
              className="border-white/20 text-white/70 hover:text-white hover:bg-white/10"
            >
              <FileText className="w-4 h-4 mr-1" />
              Abstract
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-ula-navy-light border-white/10 max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">{article.title}</DialogTitle>
              <DialogDescription className="text-white/60">
                {article.authors.map(a => a.name).join(', ')}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <h4 className="text-neon-lime font-semibold mb-2">Resumen</h4>
              <p className="text-white/80 leading-relaxed">{article.abstract}</p>
              
              <h4 className="text-neon-lime font-semibold mt-6 mb-2">Palabras Clave</h4>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="bg-white/10 text-white/80">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          size="sm" 
          className="bg-humanic-green hover:bg-humanic-green-light"
        >
          <Download className="w-4 h-4 mr-1" />
          PDF
        </Button>
      </div>
    </div>
  );
}

function VolumeCard({ volume }: { volume: typeof volumes[0] }) {
  return (
    <div className="group bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-humanic-green/50 transition-all duration-300 hover:shadow-lg">
      <div className="aspect-[3/4] bg-gradient-to-br from-ula-navy-light to-ula-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-humanic-green/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <BookOpen className="w-16 h-16 text-humanic-green/50 mb-4" />
          <span className="text-6xl font-bold text-white/20 font-serif">{volume.number}</span>
          <span className="text-xl text-white/40 mt-2">{volume.year}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-neon-lime transition-colors">
          {volume.title}
        </h3>
        <p className="text-white/50 text-sm line-clamp-2 mb-4">
          {volume.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-white/40 text-sm">
            {volume.articles.length} artículos
          </span>
          <Button 
            size="sm" 
            variant="ghost"
            className="text-humanic-green hover:text-neon-lime hover:bg-humanic-green/10"
            asChild
          >
            <Link to={`/revista?volumen=${volume.number}`}>
              Ver contenido
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Revista() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedVolume, setSelectedVolume] = useState<string>(searchParams.get('volumen') || '');
  
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  // Get unique years from articles
  const years = useMemo(() => {
    const uniqueYears = [...new Set(articles.map(a => a.year))];
    return uniqueYears.sort((a, b) => b - a);
  }, []);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.authors.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(article.category);
      
      const matchesYear = selectedYear === '' || 
        article.year.toString() === selectedYear;
      
      const matchesVolume = selectedVolume === '' || 
        article.volume.toString() === selectedVolume;
      
      return matchesSearch && matchesCategory && matchesYear && matchesVolume;
    });
  }, [searchQuery, selectedCategories, selectedYear, selectedVolume]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedYear('');
    setSelectedVolume('');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedYear || selectedVolume;

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative py-12 lg:py-20 bg-ula-navy-dark/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-humanic-green/10 via-transparent to-transparent"></div>
        
        <div className="relative w-full section-padding">
          <SectionHeader
            title="Revista FERMENTUM"
            subtitle="Publicaciones Científicas"
            description="Explora nuestro archivo de artículos científicos arbitrados sobre la región andina"
          />
        </div>
      </section>

      {/* Filters & Content */}
      <section ref={ref} className="py-8 lg:py-12">
        <div className="w-full section-padding">
          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="text"
                placeholder="Buscar por título, autor, palabra clave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-humanic-green focus:ring-humanic-green/20"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {/* Category Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white/80 hover:bg-white/10"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Categorías
                    {selectedCategories.length > 0 && (
                      <Badge className="ml-2 bg-neon-lime text-ula-navy-dark">
                        {selectedCategories.length}
                      </Badge>
                    )}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-ula-navy-light border-white/10 min-w-[200px]">
                  {categories.map((cat) => (
                    <DropdownMenuCheckboxItem
                      key={cat.id}
                      checked={selectedCategories.includes(cat.id)}
                      onCheckedChange={() => toggleCategory(cat.id)}
                      className="text-white/80 hover:text-white hover:bg-white/10"
                    >
                      {cat.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Year Filter */}
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[140px] bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent className="bg-ula-navy-light border-white/10">
                  <SelectItem value="" className="text-white/80 hover:bg-white/10">Todos</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()} className="text-white/80 hover:bg-white/10">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Volume Filter */}
              <Select value={selectedVolume} onValueChange={setSelectedVolume}>
                <SelectTrigger className="w-[140px] bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Volumen" />
                </SelectTrigger>
                <SelectContent className="bg-ula-navy-light border-white/10">
                  <SelectItem value="" className="text-white/80 hover:bg-white/10">Todos</SelectItem>
                  {volumes.map(vol => (
                    <SelectItem key={vol.id} value={vol.number.toString()} className="text-white/80 hover:bg-white/10">
                      Vol. {vol.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border border-white/20 rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-white/10"
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
                <Badge className="bg-white/10 text-white/80 hover:bg-white/20">
                  Búsqueda: {searchQuery}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSearchQuery('')} />
                </Badge>
              )}
              {selectedCategories.map(cat => (
                <Badge key={cat} className="bg-white/10 text-white/80 hover:bg-white/20">
                  {categoryNames[cat]}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleCategory(cat)} />
                </Badge>
              ))}
              {selectedYear && (
                <Badge className="bg-white/10 text-white/80 hover:bg-white/20">
                  Año: {selectedYear}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedYear('')} />
                </Badge>
              )}
              {selectedVolume && (
                <Badge className="bg-white/10 text-white/80 hover:bg-white/20">
                  Volumen: {selectedVolume}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedVolume('')} />
                </Badge>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/60">
              Mostrando <span className="text-white font-semibold">{filteredArticles.length}</span> artículos
            </p>
          </div>

          {/* Articles Grid/List - SIEMPRE VISIBLE */}
          {filteredArticles.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <div 
                    key={article.id}
                    className={isVisible ? 'animate-fade-in-up' : ''}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredArticles.map((article, index) => (
                  <div 
                    key={article.id}
                    className={isVisible ? 'animate-fade-in-up' : ''}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ArticleListItem article={article} />
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">
                No se encontraron artículos
              </h3>
              <p className="text-white/50 mb-6">
                Intenta ajustar los filtros o términos de búsqueda
              </p>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={clearFilters}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Volumes Archive */}
      <section className="py-16 lg:py-24 bg-ula-navy-dark/30">
        <div className="w-full section-padding">
          <SectionHeader
            title="Archivo de Volúmenes"
            subtitle="Ediciones Anteriores"
            description="Accede a todas las ediciones publicadas de FERMENTUM"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {volumes.map((volume, index) => (
              <div 
                key={volume.id}
                className={isVisible ? 'animate-fade-in-up' : ''}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <VolumeCard volume={volume} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

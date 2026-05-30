import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, BookOpen, X, Grid3X3, List, ChevronDown,
  BookMarked, ArrowDown, FileSearch, Quote, PenTool
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArticleCard } from '@/components/ui-custom/ArticleCard';
import { IssueCarousel } from '@/components/IssueCarousel';
import { articles, issues, categories } from '@/data/fermentum-data';
import type { Article } from '@/types';
import { PartnersSection } from '@/components/ui-custom/PartnersSection';

const categoryNames: Record<string, string> = {
  'ciencias-sociales': 'Ciencias Sociales',
  'economia': 'Economía',
  'humanidades': 'Humanidades',
  'ciencias-naturales': 'Ciencias Naturales',
  'tecnologia': 'Tecnología',
  'salud': 'Salud',
};

const categoryBorderColors: Record<string, string> = {
  'ciencias-sociales': 'border-l-blue-500/60',
  'economia': 'border-l-emerald-500/60',
  'humanidades': 'border-l-amber-500/60',
  'ciencias-naturales': 'border-l-teal-500/60',
  'tecnologia': 'border-l-cyan-500/60',
  'salud': 'border-l-rose-500/60',
};

const categoryBadgeColors: Record<string, string> = {
  'ciencias-sociales': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'economia': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'humanidades': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'ciencias-naturales': 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  'tecnologia': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  'salud': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

function ArticleListItem({ article }: { article: Article }) {
  return (
    <div className={`group flex flex-col lg:flex-row gap-4 p-5 bg-slate-900/40 rounded-xl border border-slate-700/40 hover:border-slate-500/60 transition-all duration-300 hover:bg-slate-800/40 ${categoryBorderColors[article.category]} border-l-[3px]`}>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge 
            variant="outline" 
            className={`${categoryBadgeColors[article.category]} text-xs`}
          >
            {categoryNames[article.category]}
          </Badge>
          <span className="text-slate-500 text-xs flex items-center gap-1">
            <BookMarked className="w-3 h-3" />
            N° {article.number}
          </span>
          <span className="text-slate-500 text-xs">
            {article.year}
          </span>
        </div>
        
        <h4 className="text-slate-200 font-medium group-hover:text-white transition-colors line-clamp-2 mb-2">
          {article.title}
        </h4>
        
        <p className="text-slate-500 text-sm line-clamp-1 mb-2">
          {article.authors.map(a => a.name).join(', ')}
        </p>
        
        <p className="text-slate-500 text-sm line-clamp-2">
          {article.abstract || 'Sin resumen disponible.'}
        </p>
      </div>
      
      <div className="flex lg:flex-col items-center lg:items-end gap-2">
        <Button 
          size="sm" 
          variant="ghost"
          className="text-slate-400 hover:text-white hover:bg-slate-700/50"
          asChild
        >
          <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
            <ArrowDown className="w-4 h-4 mr-1" />
            PDF
          </a>
        </Button>
      </div>
    </div>
  );
}

export function Revista() {
  const [, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedNumber, setSelectedNumber] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const years = useMemo(() => {
    const uniqueYears = [...new Set(articles.map(a => a.year))];
    return uniqueYears.sort((a, b) => b - a);
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.authors.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(article.category);
      
      const matchesYear = selectedYear === 'all' || 
        article.year.toString() === selectedYear;
      
      const matchesNumber = selectedNumber === 'all' || 
        article.number.toString() === selectedNumber;
      
      return matchesSearch && matchesCategory && matchesYear && matchesNumber;
    });
  }, [searchQuery, selectedCategories, selectedYear, selectedNumber]);

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
    setSelectedYear('all');
    setSelectedNumber('all');
    setSearchParams({});
  };

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPaginationRange = () => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    const range = [];
    
    if (start > 1) {
      range.push(1);
      if (start > 2) range.push('...');
    }
    
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    if (end < totalPages) {
      if (end < totalPages - 1) range.push('...');
      range.push(totalPages);
    }
    
    return range;
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedYear !== 'all' || selectedNumber !== 'all';

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-humanic-green/20 via-slate-950/80 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative w-full section-padding">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-humanic-green/15 border border-humanic-green/30 text-humanic-green text-sm font-medium mb-6">
              <PenTool className="w-4 h-4" />
              Publicación Académica Arbitrada
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Revista <span className="text-humanic-green">FERMENTUM</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Archivo de artículos científicos sobre la región andina. 
              Publicación del Centro de Investigación <span className="text-slate-300">HUMANIC</span>.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-humanic-green" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">{issues.length}</div>
                  <div className="text-xs text-slate-500">Números</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center">
                  <FileSearch className="w-5 h-5 text-humanic-green" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">{articles.length}</div>
                  <div className="text-xs text-slate-500">Artículos</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center">
                  <Quote className="w-5 h-5 text-humanic-green" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">{categories.length}</div>
                  <div className="text-xs text-slate-500">Categorías</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers Archive - Dark section */}
      <section className="relative py-10 lg:py-14 bg-slate-900/50 border-y border-slate-800/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-humanic-green/5 via-transparent to-transparent"></div>
        <div className="relative w-full section-padding">
          <IssueCarousel issues={issues} />
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-10 lg:py-16">
        <div className="w-full section-padding">
          {/* Filter Bar Card */}
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 lg:p-5 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="text"
                  placeholder="Buscar por título, autor, palabra clave..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/60 border-slate-600/50 text-slate-200 placeholder:text-slate-500 focus:border-humanic-green/50 focus:ring-humanic-green/10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-slate-600/50 text-slate-300 hover:bg-slate-800/60 hover:text-white"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Categorías
                      {selectedCategories.length > 0 && (
                        <Badge className="ml-2 bg-humanic-green/20 text-humanic-green border-humanic-green/30">
                          {selectedCategories.length}
                        </Badge>
                      )}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-900 border-slate-700 min-w-[200px]">
                    {categories.map((cat) => (
                      <DropdownMenuCheckboxItem
                        key={cat.id}
                        checked={selectedCategories.includes(cat.id)}
                        onCheckedChange={() => toggleCategory(cat.id)}
                        className="text-slate-300 hover:text-white hover:bg-slate-800"
                      >
                        {cat.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-[130px] bg-slate-800/60 border-slate-600/50 text-slate-200">
                    <SelectValue placeholder="Año" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="all" className="text-slate-300 hover:bg-slate-800">Todos los años</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()} className="text-slate-300 hover:bg-slate-800">
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedNumber} onValueChange={setSelectedNumber}>
                  <SelectTrigger className="w-[120px] bg-slate-800/60 border-slate-600/50 text-slate-200">
                    <SelectValue placeholder="Número" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="all" className="text-slate-300 hover:bg-slate-800">Todos</SelectItem>
                    {issues.map(vol => (
                      <SelectItem key={vol.id} value={vol.number.toString()} className="text-slate-300 hover:bg-slate-800">
                        N° {vol.number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex border border-slate-600/50 rounded-md overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${viewMode === 'grid' ? 'bg-slate-700/60 text-slate-200' : 'text-slate-500 hover:text-slate-300'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${viewMode === 'list' ? 'bg-slate-700/60 text-slate-200' : 'text-slate-500 hover:text-slate-300'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    className="text-slate-500 hover:text-slate-200 hover:bg-slate-800/60"
                    onClick={clearFilters}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Limpiar
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <Badge className="bg-slate-800/60 text-slate-300 border-slate-600/50 hover:bg-slate-700/60">
                  Búsqueda: {searchQuery}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSearchQuery('')} />
                </Badge>
              )}
              {selectedCategories.map(cat => (
                <Badge key={cat} className="bg-slate-800/60 text-slate-300 border-slate-600/50 hover:bg-slate-700/60">
                  {categoryNames[cat]}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleCategory(cat)} />
                </Badge>
              ))}
              {selectedYear !== 'all' && (
                <Badge className="bg-slate-800/60 text-slate-300 border-slate-600/50 hover:bg-slate-700/60">
                  Año: {selectedYear}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedYear('all')} />
                </Badge>
              )}
              {selectedNumber !== 'all' && (
                <Badge className="bg-slate-800/60 text-slate-300 border-slate-600/50 hover:bg-slate-700/60">
                  N° {selectedNumber}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedNumber('all')} />
                </Badge>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-400">
              Mostrando <span className="text-slate-200 font-semibold">{paginatedArticles.length}</span> de{' '}
              <span className="text-slate-200 font-semibold">{filteredArticles.length}</span> artículos
              {totalPages > 1 && (
                <span className="text-slate-500"> — Página {currentPage} de {totalPages}</span>
              )}
            </p>
          </div>

          {/* Articles */}
          {filteredArticles.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {paginatedArticles.map((article) => (
                  <ArticleListItem key={article.id} article={article} />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-slate-800/60 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-slate-200 text-xl font-semibold mb-2">
                No se encontraron artículos
              </h3>
              <p className="text-slate-500 mb-6">
                Intenta ajustar los filtros o términos de búsqueda
              </p>
              <Button 
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800/60 hover:text-white"
                onClick={clearFilters}
              >
                <X className="w-4 h-4 mr-2" />
                Limpiar filtros
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-12 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600/50 text-slate-300 hover:bg-slate-800/60 hover:text-white px-3"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Anterior
              </Button>
              
              {getPaginationRange().map((item, index) => (
                item === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-slate-500">...</span>
                ) : (
                  <Button
                    key={item}
                    variant={item === currentPage ? 'default' : 'outline'}
                    size="sm"
                    className={item === currentPage 
                      ? 'bg-humanic-green text-white hover:bg-humanic-green-light px-3 min-w-[36px]' 
                      : 'border-slate-600/50 text-slate-300 hover:bg-slate-800/60 hover:text-white px-3 min-w-[36px]'
                    }
                    onClick={() => goToPage(item as number)}
                  >
                    {item}
                  </Button>
                )
              ))}
              
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600/50 text-slate-300 hover:bg-slate-800/60 hover:text-white px-3"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente →
              </Button>
            </div>
          )}
        </div>
      </section>

      <PartnersSection />
    </main>
  );
}

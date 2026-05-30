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
import { IssueCarousel } from '@/components/IssueCarousel';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { articles, issues, categories } from '@/data/fermentum-data';
import type { Article, Issue } from '@/types';
import { PartnersSection } from '@/components/ui-custom/PartnersSection';

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
    <div className="group flex flex-col lg:flex-row gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-humanic-green/50 transition-all duration-300 hover:bg-white/[0.07]">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge 
            variant="outline" 
            className={`${categoryColors[article.category]} text-xs`}
          >
            {categoryNames[article.category]}
          </Badge>
          <span className="text-slate-400 text-xs flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {article.publishedDate ? new Date(article.publishedDate).toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'short' 
            }) : article.year}
          </span>
          <span className="text-slate-400 text-xs">
            N° {article.number}, N° {article.issue}
          </span>
        </div>
        
        <h4 className="text-slate-800 font-medium group-hover:text-neon-lime transition-colors line-clamp-2 mb-2">
          {article.title}
        </h4>
        
        <p className="text-slate-400 text-sm line-clamp-1 mb-2">
          {article.authors.map(a => a.name).join(', ')}
        </p>
        
        <p className="text-slate-400 text-sm line-clamp-2">
          {article.abstract}
        </p>
      </div>
      
      <div className="flex lg:flex-col items-center lg:items-end gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              size="sm" 
              variant="outline"
              className="border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50"
            >
              <FileText className="w-4 h-4 mr-1" />
              Abstract
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-ula-navy-light border-slate-200 max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-slate-800 text-xl">{article.title}</DialogTitle>
              <DialogDescription className="text-slate-500">
                {article.authors.map(a => a.name).join(', ')}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <h4 className="text-neon-lime font-semibold mb-2">Resumen</h4>
              <p className="text-slate-700 leading-relaxed">{article.abstract}</p>
              
              <h4 className="text-neon-lime font-semibold mt-6 mb-2">Palabras Clave</h4>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="bg-slate-50 text-slate-700">
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

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-humanic-green/50 transition-all duration-300 hover:shadow-lg">
      <div className="aspect-[3/4] bg-gradient-to-br from-ula-navy-light to-ula-navy relative overflow-hidden">
        {issue.coverImage ? (
          <img 
            src={issue.coverImage} 
            alt={`Portada N° ${issue.number}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-humanic-green/30 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <BookOpen className="w-16 h-16 text-humanic-green/50 mb-4" />
              <span className="text-6xl font-bold text-slate-300 font-serif">{issue.number}</span>
              <span className="text-xl text-slate-400 mt-2">{issue.year}</span>
            </div>
          </>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-slate-800 font-semibold mb-2 line-clamp-2 group-hover:text-neon-lime transition-colors">
          {issue.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4">
          {issue.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-400 text-sm">
            {issue.articles.length} artículos
          </span>
          <Button 
            size="sm" 
            variant="ghost"
            className="text-humanic-green hover:text-neon-lime hover:bg-humanic-green/10"
            asChild
          >
            <Link to={`/revista/numero/${issue.number}`}>
              Ver contenido
            </Link>
          </Button>
        </div>
        {issue.pdfUrl && (
          <Button 
            size="sm" 
            className="w-full bg-humanic-green hover:bg-humanic-green-light"
            asChild
          >
            <a href={issue.pdfUrl} target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4 mr-2" />
              Descargar Número Completo
            </a>
          </Button>
        )}
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

  // Pagination
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

  // Pagination logic - show limited page buttons
  const getPaginationRange = () => {
    const maxVisible = 5; // Maximum page buttons to show
    const half = Math.floor(maxVisible / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    const range = [];
    
    // First page
    if (start > 1) {
      range.push(1);
      if (start > 2) range.push('...');
    }
    
    // Middle pages
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    // Last page
    if (end < totalPages) {
      if (end < totalPages - 1) range.push('...');
      range.push(totalPages);
    }
    
    return range;
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedYear !== 'all' || selectedNumber !== 'all';

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative py-12 lg:py-20 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-humanic-green/30 via-transparent to-transparent"></div>
        
        <div className="relative w-full section-padding">
          <SectionHeader
            title="Revista FERMENTUM"
            subtitle="Publicación del Centro HUMANIC"
            description="Explora nuestro archivo de artículos científicos arbitrados sobre la región andina"
          />
        </div>
      </section>

      {/* Volumes Archive Carousel - Moved to top */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="w-full section-padding">
          <IssueCarousel issues={issues} />
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-8 lg:py-12">
        <div className="w-full section-padding">
          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Buscar por título, autor, palabra clave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-humanic-green focus:ring-humanic-green/20"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {/* Category Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Categorías
                    {selectedCategories.length > 0 && (
                      <Badge className="ml-2 bg-neon-lime text-white">
                        {selectedCategories.length}
                      </Badge>
                    )}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-ula-navy-light border-slate-200 min-w-[200px]">
                  {categories.map((cat) => (
                    <DropdownMenuCheckboxItem
                      key={cat.id}
                      checked={selectedCategories.includes(cat.id)}
                      onCheckedChange={() => toggleCategory(cat.id)}
                      className="text-slate-700 hover:text-slate-800 hover:bg-slate-50"
                    >
                      {cat.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Year Filter */}
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[140px] bg-white border-slate-200 text-slate-800">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent className="bg-ula-navy-light border-slate-200">
                  <SelectItem value="all" className="text-slate-700 hover:bg-slate-50">Todos los años</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()} className="text-slate-700 hover:bg-slate-50">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Número Filter */}
              <Select value={selectedNumber} onValueChange={setSelectedNumber}>
                <SelectTrigger className="w-[140px] bg-white border-slate-200 text-slate-800">
                  <SelectValue placeholder="Número" />
                </SelectTrigger>
                <SelectContent className="bg-ula-navy-light border-slate-200">
                  <SelectItem value="all" className="text-slate-700 hover:bg-slate-50">Todos</SelectItem>
                  {issues.map(vol => (
                    <SelectItem key={vol.id} value={vol.number.toString()} className="text-slate-700 hover:bg-slate-50">
                      N° {vol.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border border-slate-200 rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === 'grid' ? 'bg-slate-50 text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === 'list' ? 'bg-slate-50 text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Clear Filters */}
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
              {selectedCategories.map(cat => (
                <Badge key={cat} className="bg-slate-50 text-slate-700 hover:bg-white/20">
                  {categoryNames[cat]}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleCategory(cat)} />
                </Badge>
              ))}
              {selectedYear !== 'all' && (
                <Badge className="bg-slate-50 text-slate-700 hover:bg-white/20">
                  Año: {selectedYear}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedYear('all')} />
                </Badge>
              )}
              {selectedNumber !== 'all' && (
                <Badge className="bg-slate-50 text-slate-700 hover:bg-white/20">
                  Número: {selectedNumber}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedNumber('all')} />
                </Badge>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-500">
              Mostrando <span className="text-slate-800 font-semibold">{paginatedArticles.length}</span> de{' '}
              <span className="text-slate-800 font-semibold">{filteredArticles.length}</span> artículos
              {totalPages > 1 && (
                <span className="text-slate-400"> — Página {currentPage} de {totalPages}</span>
              )}
            </p>
          </div>

          {/* Articles Grid/List */}
          {filteredArticles.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedArticles.map((article) => (
                  <div key={article.id}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {paginatedArticles.map((article) => (
                  <div key={article.id}>
                    <ArticleListItem article={article} />
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-slate-800 text-xl font-semibold mb-2">
                No se encontraron artículos
              </h3>
              <p className="text-slate-400 mb-6">
                Intenta ajustar los filtros o términos de búsqueda
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

          {/* Compact Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-10 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-200 text-slate-700 hover:bg-slate-50 px-3"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Anterior
              </Button>
              
              {getPaginationRange().map((item, index) => (
                item === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-slate-400">...</span>
                ) : (
                  <Button
                    key={item}
                    variant={item === currentPage ? 'default' : 'outline'}
                    size="sm"
                    className={item === currentPage 
                      ? 'bg-humanic-green text-white hover:bg-humanic-green-light px-3 min-w-[36px]' 
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50 px-3 min-w-[36px]'
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
                className="border-slate-200 text-slate-700 hover:bg-slate-50 px-3"
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

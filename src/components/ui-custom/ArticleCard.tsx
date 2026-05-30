import { FileText, Download, Eye, Calendar, User, ExternalLink, Tag } from 'lucide-react';
import type { Article } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
}

const categoryColors: Record<string, string> = {
  'ciencias-sociales': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'economia': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'humanidades': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'ciencias-naturales': 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  'tecnologia': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  'salud': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

const categoryBorderColors: Record<string, string> = {
  'ciencias-sociales': 'border-l-blue-500/60',
  'economia': 'border-l-emerald-500/60',
  'humanidades': 'border-l-amber-500/60',
  'ciencias-naturales': 'border-l-teal-500/60',
  'tecnologia': 'border-l-cyan-500/60',
  'salud': 'border-l-rose-500/60',
};

const categoryNames: Record<string, string> = {
  'ciencias-sociales': 'Ciencias Sociales',
  'economia': 'Economía',
  'humanidades': 'Humanidades',
  'ciencias-naturales': 'Ciencias Naturales',
  'tecnologia': 'Tecnología',
  'salud': 'Salud',
};

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <div className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/50">
        <div className="absolute inset-0 bg-gradient-to-br from-humanic-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge 
              variant="outline" 
              className={`${categoryColors[article.category]} text-xs border`}
            >
              {categoryNames[article.category]}
            </Badge>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedDate ? new Date(article.publishedDate).toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long' 
              }) : article.year}
            </span>
          </div>
          
          <h3 className="text-xl lg:text-2xl font-bold text-slate-100 mb-4 group-hover:text-white transition-colors duration-300 line-clamp-3">
            {article.title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {article.authors.map((author) => (
              <span 
                key={author.id || author.name} 
                className="text-sm text-slate-400 flex items-center gap-1"
              >
                <User className="w-3 h-3" />
                {author.name}
              </span>
            ))}
          </div>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {article.abstract || 'Sin resumen disponible.'}
          </p>
          
          <div className="flex flex-wrap items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Ver Abstract
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-slate-100 text-xl">{article.title}</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    {article.authors.map(a => a.name).join(', ')}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <h4 className="text-humanic-green font-semibold mb-2">Resumen</h4>
                  <p className="text-slate-300 leading-relaxed">{article.abstract || 'Sin resumen disponible.'}</p>
                  
                  {article.keywords.length > 0 && (
                    <>
                      <h4 className="text-humanic-green font-semibold mt-6 mb-2">Palabras Clave</h4>
                      <div className="flex flex-wrap gap-2">
                        {article.keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                  
                  <div className="mt-6 pt-4 border-t border-slate-700">
                    <p className="text-slate-400 text-sm">
                      <span className="text-slate-300">DOI:</span> {article.doi}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      <span className="text-slate-300">Páginas:</span> {article.pages || 'N/A'}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              className="bg-humanic-green hover:bg-humanic-green-light text-white"
              asChild
            >
              <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </a>
            </Button>
            
            <div className="flex items-center gap-4 text-slate-500 text-sm ml-auto">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {article.views?.toLocaleString() || 0}
              </span>
              <span className="flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                {article.downloads?.toLocaleString() || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`group flex flex-col sm:flex-row gap-4 p-4 bg-slate-900/40 rounded-xl border border-slate-700/40 hover:border-slate-600/60 transition-all duration-300 hover:bg-slate-800/40 ${categoryBorderColors[article.category]} border-l-2`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge 
              variant="outline" 
              className={`${categoryColors[article.category]} text-xs`}
            >
              {categoryNames[article.category]}
            </Badge>
            <span className="text-slate-500 text-xs">
              N° {article.number}, N° {article.issue}
            </span>
          </div>
          
          <h4 className="text-slate-200 font-medium group-hover:text-white transition-colors line-clamp-2 mb-2">
            {article.title}
          </h4>
          
          <p className="text-slate-500 text-sm line-clamp-1">
            {article.authors.map(a => a.name).join(', ')}
          </p>
        </div>
        
        <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
          <Button size="sm" variant="ghost" className="text-slate-500 hover:text-slate-200 hover:bg-slate-700/50">
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="sm" className="bg-humanic-green hover:bg-humanic-green-light" asChild>
            <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    );
  }

  // Default variant - improved
  return (
    <div className={`group bg-slate-900/40 rounded-xl overflow-hidden border border-slate-700/40 hover:border-slate-600/60 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-1 ${categoryBorderColors[article.category]} border-l-[3px]`}>
      <div className="p-5">
        {/* Top row: category + year + number */}
        <div className="flex items-center justify-between mb-3">
          <Badge 
            variant="outline" 
            className={`${categoryColors[article.category]} text-[11px] px-2 py-0.5`}
          >
            {categoryNames[article.category]}
          </Badge>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {article.year}
            </span>
            <span>N° {article.number}</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-slate-100 font-semibold group-hover:text-white transition-colors line-clamp-2 mb-2 leading-snug">
          {article.title}
        </h3>
        
        {/* Authors */}
        <p className="text-slate-400 text-sm line-clamp-1 mb-3 flex items-center gap-1.5">
          <User className="w-3 h-3 text-slate-500" />
          {article.authors.map(a => a.name).join(', ')}
        </p>
        
        {/* Abstract */}
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
          {article.abstract || 'Sin resumen disponible.'}
        </p>
        
        {/* Keywords */}
        {article.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.keywords.slice(0, 3).map((keyword) => (
              <span key={keyword} className="text-[10px] text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" />
                {keyword}
              </span>
            ))}
            {article.keywords.length > 3 && (
              <span className="text-[10px] text-slate-600 px-1">+{article.keywords.length - 3}</span>
            )}
          </div>
        )}
        
        {/* Footer: stats + actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-700/30">
          <div className="flex items-center gap-3 text-slate-500 text-[11px]">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.views?.toLocaleString() || 0}
            </span>
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {article.downloads?.toLocaleString() || 0}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 text-xs h-7 px-2"
                >
                  <FileText className="w-3.5 h-3.5 mr-1" />
                  Abstract
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-slate-100 text-lg">{article.title}</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    {article.authors.map(a => a.name).join(', ')}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <h4 className="text-humanic-green font-semibold mb-2">Resumen</h4>
                  <p className="text-slate-300 leading-relaxed">{article.abstract || 'Sin resumen disponible.'}</p>
                  
                  {article.keywords.length > 0 && (
                    <>
                      <h4 className="text-humanic-green font-semibold mt-6 mb-2">Palabras Clave</h4>
                      <div className="flex flex-wrap gap-2">
                        {article.keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              size="sm" 
              className="bg-humanic-green hover:bg-humanic-green-light text-white h-7 px-2.5 text-xs"
              asChild
            >
              <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3.5 h-3.5 mr-1" />
                PDF
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

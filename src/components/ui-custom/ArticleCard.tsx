import { FileText, Download, Eye, Calendar, User } from 'lucide-react';
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
  'ciencias-sociales': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'economia': 'bg-green-500/20 text-green-300 border-green-500/30',
  'humanidades': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'ciencias-naturales': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'tecnologia': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'salud': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
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
      <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200 hover:border-neon-lime/50 transition-all duration-500 hover:shadow-glow">
        <div className="absolute inset-0 bg-gradient-to-br from-humanic-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge 
              variant="outline" 
              className={`${categoryColors[article.category]} border`}
            >
              {categoryNames[article.category]}
            </Badge>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.publishedDate).toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long' 
              })}
            </span>
          </div>
          
          <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-4 group-hover:text-neon-lime transition-colors duration-300 line-clamp-3">
            {article.title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {article.authors.map((author) => (
              <span 
                key={author.id} 
                className="text-sm text-slate-500 flex items-center gap-1"
              >
                <User className="w-3 h-3" />
                {author.name}
              </span>
            ))}
          </div>
          
          <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
            {article.abstract}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-neon-lime/50"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Ver Abstract
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
                  
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <p className="text-slate-400 text-sm">
                      <span className="text-slate-600">DOI:</span> {article.doi}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      <span className="text-slate-600">Páginas:</span> {article.pages}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              className="bg-humanic-green hover:bg-humanic-green-light text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar PDF
            </Button>
            
            <div className="flex items-center gap-4 text-slate-400 text-sm ml-auto">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                {article.downloads.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="group flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-humanic-green/50 transition-all duration-300 hover:bg-white/[0.07]">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge 
              variant="outline" 
              className={`${categoryColors[article.category]} text-xs`}
            >
              {categoryNames[article.category]}
            </Badge>
            <span className="text-slate-400 text-xs">
              Vol. {article.volume}, N° {article.issue}
            </span>
          </div>
          
          <h4 className="text-slate-800 font-medium group-hover:text-neon-lime transition-colors line-clamp-2 mb-2">
            {article.title}
          </h4>
          
          <p className="text-slate-400 text-sm line-clamp-1">
            {article.authors.map(a => a.name).join(', ')}
          </p>
        </div>
        
        <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
          <Button size="sm" variant="ghost" className="text-slate-500 hover:text-slate-800 hover:bg-slate-50">
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="sm" className="bg-humanic-green hover:bg-humanic-green-light">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-humanic-green/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <Badge 
            variant="outline" 
            className={`${categoryColors[article.category]}`}
          >
            {categoryNames[article.category]}
          </Badge>
          <span className="text-slate-400 text-xs">
            {new Date(article.publishedDate).getFullYear()}
          </span>
        </div>
        
        <h3 className="text-slate-800 font-semibold group-hover:text-neon-lime transition-colors line-clamp-2 mb-3">
          {article.title}
        </h3>
        
        <p className="text-slate-400 text-sm line-clamp-1 mb-3">
          {article.authors.map(a => a.name).join(', ')}
        </p>
        
        <p className="text-slate-400 text-sm line-clamp-2 mb-4">
          {article.abstract}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {article.downloads.toLocaleString()}
            </span>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-humanic-green hover:text-neon-lime hover:bg-humanic-green/10"
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
        </div>
      </div>
    </div>
  );
}

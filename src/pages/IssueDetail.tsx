import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, Calendar, Download, FileText, 
  ChevronLeft, User, Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { articles, issues } from '@/data/fermentum-data';
import type { Article } from '@/types';

function IssueDetail() {
  const { id } = useParams<{ id: string }>();
  const issue = issues.find(i => i.id === id || i.id === `issue-${id}`);
  
  const issueArticles = issue 
    ? articles.filter(a => a.issue === issue.number || a.number === issue.number)
    : [];

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  if (!issue) {
    return (
      <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Número no encontrado</h1>
          <Button asChild className="bg-humanic-green hover:bg-humanic-green-light">
            <Link to="/revista">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Volver a la revista
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16">
      {/* Hero Section + Articles Combined */}
      <section ref={headerRef} className={`relative py-12 lg:py-20 bg-slate-50 transition-opacity duration-700 ${headerVisible ? 'opacity-100' : 'opacity-90'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-humanic-green/20 via-transparent to-transparent"></div>
        
        <div className="relative w-full section-padding">
          <div className="mb-6">
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50" asChild>
              <Link to="/revista">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Todos los números
              </Link>
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Cover Image */}
            <div className="w-full lg:w-1/3 flex-shrink-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img 
                  src={issue.coverImage || "/app/images/default-cover.jpg"} 
                  alt={`Portada ${issue.title}`}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/app/images/default-cover.jpg";
                  }}
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-neon-lime/95 text-slate-900 border-0 shadow-lg text-xs font-bold px-3 py-1.5">
                    <Star className="w-3 h-3 mr-1" />
                    N° {issue.number}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="w-full lg:w-2/3">
              <div className="mb-2">
                <span className="text-humanic-green font-bold text-xs tracking-[0.2em] uppercase">
                  Año {issue.year}
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                {issue.title}
              </h1>
              
              <p className="text-slate-500 text-base leading-[1.7] mb-8 text-justify">
                {issue.description}
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200">
                  <BookOpen className="w-5 h-5 text-humanic-green" />
                  <span className="font-bold text-lg">{issueArticles.length}</span>
                  <span className="text-sm text-slate-500">artículos</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200">
                  <Calendar className="w-5 h-5 text-humanic-green" />
                  <span className="text-sm text-slate-500">{issue.year}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200">
                  <FileText className="w-5 h-5 text-humanic-green" />
                  <span className="text-sm text-slate-500">Vol. {issue.number}</span>
                </div>
              </div>

              {issue.pdfUrl && (
                <div className="mb-8">
                  <Button 
                    className="bg-humanic-green hover:bg-humanic-green-light text-white font-bold px-6"
                    asChild
                  >
                    <a href={issue.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Volumen Completo
                    </a>
                  </Button>
                </div>
              )}

              {/* Artículos - Directamente debajo del volumen */}
              <div className="border-t-2 border-slate-200 pt-6 mt-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-humanic-green/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-humanic-green" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Artículos ({issueArticles.length})
                    </h2>
                    <p className="text-xs text-slate-500">
                      Descarga individual de cada artículo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {issueArticles.map((article, index) => (
                <ArticleRow 
                  key={article.id} 
                  article={article} 
                  index={index + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ArticleRow({ article, index }: { article: Article; index: number }) {
  return (
    <div className="group bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md hover:border-humanic-green/30 transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-humanic-green/10 text-humanic-green font-bold flex items-center justify-center text-sm">
          {index}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-slate-800 mb-1 group-hover:text-humanic-green transition-colors leading-snug">
            {article.title}
          </h3>

          <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {article.authors.map(a => a.name).join(', ')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              {article.doi && (
                <span className="font-mono text-[10px]">{article.doi}</span>
              )}
            </div>

            <Button 
              size="sm"
              className="bg-humanic-green hover:bg-humanic-green-light text-white h-8 text-xs"
              asChild
            >
              <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Download className="w-3 h-3 mr-1" />
                PDF
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueDetail;

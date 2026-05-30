import { BookOpen, Calendar, ArrowRight, Download, FileText } from 'lucide-react';
import type { Issue } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <div className="group flex-shrink-0 w-[260px] sm:w-[280px]">
      <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-humanic-green/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Cover Image */}
        <div className="aspect-[3/4] bg-gradient-to-br from-ula-navy-light to-ula-navy relative overflow-hidden">
          {issue.coverImage ? (
            <img 
              src={issue.coverImage} 
              alt={`Portada N° ${issue.number}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          
          {/* Year badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-semibold text-slate-700 shadow-sm">
            {issue.year}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-slate-800 font-semibold mb-2 line-clamp-2 group-hover:text-humanic-green transition-colors text-sm">
            {issue.title}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              {issue.articles.length} artículos
            </span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              N° {issue.number}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="ghost"
              className="text-humanic-green hover:text-neon-lime hover:bg-humanic-green/10 text-xs px-2 h-7"
              asChild
            >
              <Link to={`/revista/numero/${issue.number}`}>
                <ArrowRight className="w-3.5 h-3.5 mr-1" />
                Ver contenido
              </Link>
            </Button>
            
            {issue.pdfUrl && (
              <Button 
                size="sm" 
                className="bg-humanic-green hover:bg-humanic-green-light text-white text-xs px-2 h-7"
                asChild
              >
                <a href={issue.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="w-3.5 h-3.5 mr-1" />
                  PDF
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

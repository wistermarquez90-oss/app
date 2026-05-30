import { BookOpen, Calendar, ArrowRight, Download, FileText } from 'lucide-react';
import type { Issue } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface IssueCardProps {
  issue: Issue;
}

const accentColors = [
  'from-emerald-500/20 to-teal-600/20',
  'from-amber-500/20 to-orange-600/20',
  'from-rose-500/20 to-pink-600/20',
  'from-sky-500/20 to-blue-600/20',
  'from-violet-500/20 to-purple-600/20',
  'from-cyan-500/20 to-teal-600/20',
];

const borderColors = [
  'border-emerald-500/30',
  'border-amber-500/30',
  'border-rose-500/30',
  'border-sky-500/30',
  'border-violet-500/30',
  'border-cyan-500/30',
];

const textColors = [
  'text-emerald-400',
  'text-amber-400',
  'text-rose-400',
  'text-sky-400',
  'text-violet-400',
  'text-cyan-400',
];

const bgColors = [
  'bg-emerald-500/10',
  'bg-amber-500/10',
  'bg-rose-500/10',
  'bg-sky-500/10',
  'bg-violet-500/10',
  'bg-cyan-500/10',
];

export function IssueCard({ issue }: IssueCardProps) {
  // Use issue number to pick a color (consistent per number)
  const colorIndex = (issue.number % accentColors.length);

  return (
    <div className="group relative flex-shrink-0 w-[240px] sm:w-[260px]">
      <div className={`relative bg-gradient-to-br ${accentColors[colorIndex]} backdrop-blur-sm rounded-2xl overflow-hidden border ${borderColors[colorIndex]} hover:shadow-2xl hover:shadow-${textColors[colorIndex].split('-')[1]}-500/10 transition-all duration-500 hover:-translate-y-2`}>

        {/* Top decorative bar */}
        <div className={`h-1.5 bg-gradient-to-r ${accentColors[colorIndex].replace('20', '50')}`} />

        {/* Cover area */}
        <div className="relative px-5 pt-6 pb-4">
          {/* Issue badge */}
          <div className="flex items-center justify-between mb-5">
            <span className={`text-[10px] uppercase tracking-widest font-semibold ${textColors[colorIndex]}`}>
              Revista FERMENTUM
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
              {issue.year}
            </span>
          </div>

          {/* Big number */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Número</span>
              <div className={`text-5xl font-bold ${textColors[colorIndex]} leading-none mt-1`}>
                {issue.number}
              </div>
            </div>
            <div className={`w-10 h-10 rounded-full ${bgColors[colorIndex]} flex items-center justify-center`}>
              <BookOpen className={`w-5 h-5 ${textColors[colorIndex]}`} />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-slate-200 text-sm font-medium leading-snug line-clamp-2 min-h-[2.5rem]">
            {issue.title}
          </h3>

          {/* Meta info */}
          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/10">
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <FileText className="w-3 h-3" />
              {issue.articles.length} artículos
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Calendar className="w-3 h-3" />
              {issue.year}
            </span>
          </div>
        </div>

        {/* Hover action overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 rounded-2xl">
          <Button
            size="sm"
            className="bg-white/90 text-slate-900 hover:bg-white hover:scale-105 transition-transform"
            asChild
          >
            <Link to={`/revista/numero/${issue.number}`}>
              <ArrowRight className="w-4 h-4 mr-1" />
              Ver contenido
            </Link>
          </Button>
          {issue.pdfUrl && (
            <Button
              size="sm"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-transform"
              asChild
            >
              <a href={issue.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-1" />
                Descargar PDF
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

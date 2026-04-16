import { Link } from 'react-router-dom';
import { Mail, BookOpen, ExternalLink } from 'lucide-react';
import type { Author } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AuthorCardProps {
  author: Author;
  variant?: 'default' | 'compact';
}

export function AuthorCard({ author, variant = 'default' }: AuthorCardProps) {
  const initials = author.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  if (variant === 'compact') {
    return (
      <Link 
        to={`/autores/${author.id}`}
        className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-humanic-green/50 hover:bg-white/[0.07] transition-all duration-300 group"
      >
        <Avatar className="w-10 h-10 bg-humanic-green/20 border border-humanic-green/30">
          <AvatarFallback className="bg-humanic-green/20 text-humanic-green text-sm font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium text-sm group-hover:text-neon-lime transition-colors truncate">
            {author.name}
          </h4>
          <p className="text-white/50 text-xs truncate">{author.affiliation}</p>
        </div>
        <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-humanic-green transition-colors" />
      </Link>
    );
  }

  return (
    <div className="group bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-humanic-green/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16 bg-humanic-green/20 border-2 border-humanic-green/30">
            <AvatarFallback className="bg-humanic-green/20 text-humanic-green text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-lg group-hover:text-neon-lime transition-colors">
              {author.name}
            </h3>
            <p className="text-white/50 text-sm mt-1 line-clamp-2">
              {author.affiliation}
            </p>
          </div>
        </div>
        
        <p className="text-white/60 text-sm line-clamp-3 mb-4">
          {author.bio}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {author.specialty.slice(0, 3).map((spec) => (
            <Badge 
              key={spec} 
              variant="secondary" 
              className="bg-humanic-green/10 text-humanic-green border-humanic-green/20"
            >
              {spec}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-4 text-white/50 text-sm">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {author.articlesCount} artículos
            </span>
            {author.orcid && (
              <span className="text-xs text-white/40">
                ORCID: {author.orcid}
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/10"
              asChild
            >
              <a href={`mailto:${author.email}`}>
                <Mail className="w-4 h-4" />
              </a>
            </Button>
            <Button 
              size="sm"
              className="bg-humanic-green hover:bg-humanic-green-light text-white"
              asChild
            >
              <Link to={`/autores/${author.id}`}>
                Ver Perfil
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  variant?: 'default' | 'light';
}

export function SectionHeader({ 
  title, 
  subtitle, 
  description, 
  align = 'center',
  variant = 'default'
}: SectionHeaderProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const titleColor = variant === 'light' ? 'text-ula-navy' : 'text-slate-800';
  const subtitleColor = variant === 'light' ? 'text-humanic-green' : 'text-neon-lime';
  const descColor = variant === 'light' ? 'text-ula-navy/70' : 'text-slate-500';

  return (
    <div 
      ref={ref}
      className={`${alignClasses[align]} mb-10 lg:mb-14 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
    >
      {subtitle && (
        <span className={`inline-block text-sm font-semibold uppercase tracking-widest ${subtitleColor} mb-3`}>
          {subtitle}
        </span>
      )}
      
      <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${titleColor} font-serif mb-4`}>
        {title}
      </h2>
      
      {description && (
        <p className={`text-base lg:text-lg max-w-3xl ${align === 'center' ? 'mx-auto' : ''} ${descColor}`}>
          {description}
        </p>
      )}
      
      <div className={`flex items-center gap-2 mt-6 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
        <span className="w-12 h-0.5 bg-gradient-to-r from-humanic-green to-neon-lime"></span>
        <span className="w-3 h-3 rounded-full bg-neon-lime"></span>
        <span className="w-12 h-0.5 bg-gradient-to-r from-neon-lime to-humanic-green"></span>
      </div>
    </div>
  );
}

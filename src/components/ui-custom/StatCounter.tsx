import { useEffect, useRef } from 'react';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { FileText, Users, BookOpen, Download, TrendingUp, Award } from 'lucide-react';

interface StatCounterProps {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Users,
  BookOpen,
  Download,
  TrendingUp,
  Award,
};

export function StatCounter({ label, value, suffix = '', icon }: StatCounterProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const { count, startAnimation } = useCountUp(value, 2000);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      startAnimation();
    }
  }, [isVisible, startAnimation]);

  const Icon = iconMap[icon] || FileText;

  return (
    <div 
      ref={ref}
      className="group relative p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-neon-lime/30 transition-all duration-500 hover:shadow-glow"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-humanic-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      
      <div className="relative flex items-start gap-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-humanic-green/20 to-neon-lime/10 border border-humanic-green/30 group-hover:border-neon-lime/50 transition-colors duration-300">
          <Icon className="w-7 h-7 text-humanic-green group-hover:text-neon-lime transition-colors" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white font-serif">
              {count.toLocaleString()}
            </span>
            {suffix && (
              <span className="text-2xl font-bold text-neon-lime">{suffix}</span>
            )}
          </div>
          <p className="text-white/60 text-sm mt-1">{label}</p>
        </div>
      </div>
    </div>
  );
}

interface StatsSectionProps {
  stats: StatCounterProps[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <StatCounter {...stat} />
        </div>
      ))}
    </div>
  );
}

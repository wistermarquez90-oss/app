import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Issue } from '@/types';
import { IssueCard } from '@/components/IssueCard';

export function IssueCarousel({ issues }: { issues: Issue[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 320;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Auto-scroll
  useEffect(() => {
    if (!autoScroll || !carouselRef.current) return;
    const interval = setInterval(() => {
      if (!carouselRef.current || isDragging) return;
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: 1, behavior: 'auto' });
      }
    }, 50);
    return () => clearInterval(interval);
  }, [autoScroll, isDragging]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
    setAutoScroll(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setAutoScroll(true), 2000);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTimeout(() => setAutoScroll(true), 2000);
    }
  };

  return (
    <div className="relative group">
      {/* Left Button */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-humanic-green hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Button */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-humanic-green hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex gap-5 overflow-x-auto pb-4 pt-2 cursor-grab active:cursor-grabbing scroll-smooth scrollbar-hide"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {issues.map((issue: Issue) => (
          <div
            key={issue.id}
            className="flex-shrink-0 w-[280px]"
          >
            <IssueCard issue={issue} />
          </div>
        ))}
      </div>
    </div>
  );
}

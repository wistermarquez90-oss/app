import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Sparkles, ChevronRight, Star, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArticleCard } from '@/components/ui-custom/ArticleCard';
import { StatsSection } from '@/components/ui-custom/StatCounter';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { NewsletterModal } from '@/components/NewsletterModal';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { articles, volumes, statistics, categories, authors } from '@/data/fermentum-data';

const iconMap: Record<string, React.ElementType> = {
  Users,
  TrendingUp,
  BookOpen,
  Leaf: BookOpen,
  Cpu: BookOpen,
  Heart: BookOpen,
};

function HeroSection() {
  const latestVolume = volumes[0];
  const featuredArticles = articles.slice(0, 3);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-humanic-green/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-neon-lime/10 via-transparent to-transparent"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-humanic-green/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-neon-lime/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative w-full section-padding pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Sparkles className="w-4 h-4 text-neon-lime" />
              <span className="text-sm text-white/80">Nuevo Volumen {latestVolume.year}</span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-serif leading-tight mb-4">
                HUMANIC
              </h1>
              <p className="text-xl sm:text-2xl text-neon-lime font-medium mb-2">
                Centro de Investigaciones en Ciencias Humanas
              </p>
              <p className="text-white/60 text-lg max-w-xl">
                Universidad de Los Andes - ULA
              </p>
            </div>

            <p className="text-white/70 text-base lg:text-lg leading-relaxed max-w-xl">
              Centro de investigación dedicado al estudio y difusión del conocimiento 
              sobre las ciencias humanas en la región andina. Publicamos la revista 
              FERMENTUM y promovemos la investigación académica de excelencia.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-neon-lime text-ula-navy-dark hover:bg-neon-lime-light font-semibold px-8 transition-all duration-300 hover:shadow-glow-strong group"
                asChild
              >
                <Link to="/revista">
                  Explorar Revista
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-8"
                asChild
              >
                <Link to="/normas">
                  Enviar Artículo
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {authors.slice(0, 4).map((author) => (
                  <div 
                    key={author.id}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-humanic-green to-neon-lime border-2 border-ula-navy flex items-center justify-center text-xs font-bold text-ula-navy-dark"
                  >
                    {author.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-semibold">+180 Investigadores</p>
                <p className="text-white/50 text-sm">Red académica activa</p>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Article Card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-humanic-green/20 to-neon-lime/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <Badge className="bg-neon-lime/20 text-neon-lime border-neon-lime/30">
                  <Star className="w-3 h-3 mr-1" />
                  Artículo Destacado
                </Badge>
                <span className="text-white/40 text-sm">
                  Vol. {latestVolume.number}, N° 1
                </span>
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 line-clamp-3">
                {featuredArticles[0].title}
              </h3>

              <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-4">
                {featuredArticles[0].abstract}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {featuredArticles[0].keywords.slice(0, 4).map((keyword) => (
                  <span 
                    key={keyword}
                    className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-sm text-white/50">
                  {featuredArticles[0].authors.map(a => a.name).join(', ')}
                </div>
                <Button 
                  size="sm"
                  className="bg-humanic-green hover:bg-humanic-green-light"
                  asChild
                >
                  <Link to={`/revista/articulo/${featuredArticles[0].id}`}>
                    Leer más
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSectionWrapper() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="relative py-16 lg:py-24 bg-ula-navy-dark/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-humanic-green/5 via-transparent to-transparent"></div>
      
      <div ref={ref} className="relative w-full section-padding">
        <SectionHeader
          title="Impacto Académico"
          subtitle="Nuestros Números"
          description="Más de cuatro décadas contribuyendo al conocimiento científico sobre la región andina"
        />
        
        {isVisible && <StatsSection stats={statistics} />}
      </div>
    </section>
  );
}

function FeaturedArticlesSection() {
  const featuredArticles = articles.slice(0, 6);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-16 lg:py-24">
      <div className="w-full section-padding">
        <SectionHeader
          title="Artículos Destacados"
          subtitle="Contenido Reciente"
          description="Explora las últimas investigaciones publicadas en FERMENTUM"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article, index) => (
            <div 
              key={article.id}
              className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:border-neon-lime/50 group"
            asChild
          >
            <Link to="/revista">
              Ver Todos los Artículos
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-16 lg:py-24 bg-ula-navy-dark/30">
      <div className="w-full section-padding">
        <SectionHeader
          title="Áreas de Investigación"
          subtitle="Categorías"
          description="Contenido especializado organizado por disciplinas científicas"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || BookOpen;
            return (
              <Link
                key={category.id}
                to={`/revista?categoria=${category.id}`}
                className={`
                  group relative p-6 bg-white/5 rounded-xl border border-white/10 
                  hover:border-humanic-green/50 transition-all duration-300 
                  hover:-translate-y-1 hover:shadow-lg hover:bg-white/[0.07]
                  ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <Icon 
                    className="w-6 h-6 transition-colors duration-300" 
                    style={{ color: category.color }}
                  />
                </div>
                
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-neon-lime transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-white/50 text-sm leading-relaxed">
                  {category.description}
                </p>

                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-neon-lime" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative py-16 lg:py-20 bg-ula-navy-dark/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-humanic-green/5 via-transparent to-transparent"></div>
      
      <div className="relative w-full section-padding">
        <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <NewsletterModal variant="banner" />
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-humanic-green/20 to-neon-lime/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
      
      <div className="relative w-full section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white font-serif mb-6">
            ¿Tienes una investigación lista para publicar?
          </h2>
          
          <p className="text-white/70 text-lg lg:text-xl mb-10 max-w-2xl mx-auto">
            FERMENTUM te invita a contribuir al conocimiento científico sobre la región andina. 
            Nuestro proceso de revisión por pares garantiza la calidad académica.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-neon-lime text-ula-navy-dark hover:bg-neon-lime-light font-semibold px-8 transition-all duration-300 hover:shadow-glow-strong"
              asChild
            >
              <Link to="/normas">
                <BookOpen className="w-5 h-5 mr-2" />
                Ver Normas de Publicación
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8"
              asChild
            >
              <Link to="/contacto">
                Contactar al Equipo Editorial
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSectionWrapper />
      <FeaturedArticlesSection />
      <CategoriesSection />
      <NewsletterSection />
      <CTASection />
    </main>
  );
}

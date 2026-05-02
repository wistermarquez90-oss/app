import { useState } from 'react';
import { 
  ShoppingBag, BookOpen, Shirt, Package, Phone, Heart, 
  ChevronRight, Tag, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { LucideIcon } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'revistas' | 'libros' | 'merchandising';
  image?: string;
  stock: 'disponible' | 'agotado' | 'preventa';
  featured?: boolean;
  details?: string;
}

const products: Product[] = [
  // Revistas
  {
    id: 'rev-001',
    name: 'FERMENTUM Vol. 45, N° 1 (2024)',
    description: 'Edición impresa de la revista FERMENTUM. Incluye artículos sobre desarrollo sostenible en los Andes, ecoturismo y cambio climático.',
    price: '15,00 $',
    category: 'revistas',
    stock: 'disponible',
    featured: true,
    details: 'Formato: 21×27 cm | Páginas: 180 | ISSN: 0798-0934',
  },
  {
    id: 'rev-002',
    name: 'FERMENTUM Vol. 44, N° 2 (2023)',
    description: 'Edición completa con investigaciones sobre economía andina, patrimonio cultural y transformación digital.',
    price: '12,00 $',
    category: 'revistas',
    stock: 'disponible',
    details: 'Formato: 21×27 cm | Páginas: 165 | ISSN: 0798-0934',
  },
  {
    id: 'rev-003',
    name: 'FERMENTUM Vol. 44, N° 1 (2023)',
    description: 'Número especial sobre desarrollo regional y políticas públicas en la región andina.',
    price: '10,00 $',
    category: 'revistas',
    stock: 'agotado',
    details: 'Formato: 21×27 cm | Páginas: 172 | ISSN: 0798-0934',
  },
  {
    id: 'rev-pack',
    name: 'Pack Suscripción Anual 2025',
    description: 'Recibe las 2 ediciones de FERMENTUM del año 2025 con envío incluido. Ideal para bibliotecas y centros de investigación.',
    price: '25,00 $',
    category: 'revistas',
    stock: 'preventa',
    featured: true,
    details: 'Incluye: Vol. 46 (2 números) | Envío incluido | 10% de descuento',
  },
  // Libros
  {
    id: 'lib-001',
    name: 'Economía Andina: Desafíos del Siglo XXI',
    description: 'Autor: Dr. Carlos Ramírez. Análisis exhaustivo de los desafíos económicos de la región andina en la era post-pandemia.',
    price: '35,00 $',
    category: 'libros',
    stock: 'disponible',
    featured: true,
    details: 'Formato: 16×23 cm | Páginas: 320 | ISBN: 978-980-00-0001-1',
  },
  {
    id: 'lib-002',
    name: 'Patrimonio Cultural de los Andes',
    description: 'Autor: Dra. Ana María González. Estudio antropológico sobre las tradiciones y patrimonio material de la región.',
    price: '28,00 $',
    category: 'libros',
    stock: 'disponible',
    details: 'Formato: 16×23 cm | Páginas: 245 | ISBN: 978-980-00-0002-8',
  },
  {
    id: 'lib-003',
    name: 'Ecoturismo y Desarrollo Sostenible',
    description: 'Autor: Dr. Luis Fernando Torres. Guía práctica sobre el potencial del ecoturismo en Venezuela.',
    price: '30,00 $',
    category: 'libros',
    stock: 'disponible',
    details: 'Formato: 16×23 cm | Páginas: 280 | ISBN: 978-980-00-0003-5',
  },
  {
    id: 'lib-004',
    name: 'Historia de la ULA: 237 Años de Excelencia',
    description: 'Autor: Varios autores. Conmemoración del aniversario de la Universidad de Los Andes con ensayos históricos.',
    price: '42,00 $',
    category: 'libros',
    stock: 'disponible',
    featured: true,
    details: 'Formato: 18×25 cm | Páginas: 450 | ISBN: 978-980-00-0004-2',
  },
  {
    id: 'lib-005',
    name: 'Derechos Humanos y Justicia Constitucional',
    description: 'Autor: Dra. Patricia Mendoza. Análisis jurídico de los avances en derechos humanos en Venezuela.',
    price: '25,00 $',
    category: 'libros',
    stock: 'agotado',
    details: 'Formato: 16×23 cm | Páginas: 195 | ISBN: 978-980-00-0005-9',
  },
  // Merchandising
  {
    id: 'merch-001',
    name: 'Camiseta HUMANIC Oficial',
    description: 'Camiseta negra 100% algodón con logo de HUMANIC en serigrafía dorada. Disponible en tallas S, M, L, XL, XXL.',
    price: '18,00 $',
    category: 'merchandising',
    stock: 'disponible',
    featured: true,
    details: 'Material: Algodón peinado 180gr | Colores: Negro, Azul marino | Tallas: S-XXL',
  },
  {
    id: 'merch-002',
    name: 'Gorra HUMANIC',
    description: 'Gorra ajustable con logo bordado. Perfecta para eventos académicos y uso diario.',
    price: '12,00 $',
    category: 'merchandising',
    stock: 'disponible',
    details: 'Material: Algodón | Ajuste: Snapback | Colores: Negro, Verde bosque',
  },
  {
    id: 'merch-003',
    name: 'Taza HUMANIC',
    description: 'Taza cerámica de 11oz con logo de HUMANIC y frase "Investigación para el desarrollo".',
    price: '8,00 $',
    category: 'merchandising',
    stock: 'disponible',
    details: 'Capacidad: 325ml | Material: Cerámica premium | Apta para microondas',
  },
  {
    id: 'merch-004',
    name: 'Bolso Ecológico HUMANIC',
    description: 'Bolso de tela reciclada con diseño del centro. Ideal para transportar libros y documentos.',
    price: '10,00 $',
    category: 'merchandising',
    stock: 'disponible',
    details: 'Material: Tela reciclada | Dimensiones: 35×40 cm | Asas reforzadas',
  },
  {
    id: 'merch-005',
    name: 'Libreta HUMANIC',
    description: 'Libreta de 100 páginas con portada rígida y logo en foil dorado. Incluye cinta separadora.',
    price: '7,00 $',
    category: 'merchandising',
    stock: 'disponible',
    details: 'Páginas: 100 rayadas | Tamaño: A5 | Acabado: Foil dorado',
  },
  {
    id: 'merch-pack',
    name: 'Pack HUMANIC Fan',
    description: 'Kit completo: Camiseta + Gorra + Taza + Libreta + Bolso. El mejor regalo para apoyar a HUMANIC.',
    price: '50,00 $',
    category: 'merchandising',
    stock: 'disponible',
    featured: true,
    details: 'Ahorra $5 | Incluye todos los productos de merchandising | Envoltorio de regalo opcional',
  },
];

const categoryInfo: Record<string, { name: string; description: string; icon: LucideIcon }> = {
  revistas: {
    name: 'Revistas',
    description: 'Ediciones impresas de FERMENTUM y suscripciones',
    icon: BookOpen,
  },
  libros: {
    name: 'Libros',
    description: 'Publicaciones de investigadores del centro y aliados',
    icon: BookOpen,
  },
  merchandising: {
    name: 'Merchandising',
    description: 'Productos oficiales de HUMANIC para apoyar el centro',
    icon: Shirt,
  },
};

const stockColors: Record<string, string> = {
  disponible: 'bg-green-500/20 text-green-300 border-green-500/30',
  agotado: 'bg-red-500/20 text-red-300 border-red-500/30',
  preventa: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
};

const stockLabels: Record<string, string> = {
  disponible: 'Disponible',
  agotado: 'Agotado',
  preventa: 'Preventa',
};

function ProductCard({ product }: { product: Product }) {
  const CategoryIcon = categoryInfo[product.category].icon;

  return (
    <div className={`group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-humanic-green/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${product.featured ? 'ring-1 ring-neon-lime/30' : ''}`}>
      {/* Featured Badge */}
      {product.featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-neon-lime/20 text-slate-800 border-neon-lime/30">
            Destacado
          </Badge>
        </div>
      )}

      {/* Image Placeholder */}
      <div className="aspect-[4/3] bg-gradient-to-br from-ula-navy-light to-ula-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-humanic-green/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <CategoryIcon className="w-12 h-12 text-humanic-green/40 mb-2" />
          <span className="text-slate-300 text-sm font-medium">{product.name}</span>
        </div>
        
        {/* Stock Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="outline" className={stockColors[product.stock]}>
            {stockLabels[product.stock]}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-slate-800 font-semibold mb-2 group-hover:text-neon-lime transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-neon-lime">{product.price}</span>
            <span className="text-slate-400 text-sm ml-1">USD</span>
          </div>
          <Badge variant="outline" className="bg-white text-slate-500 border-slate-200">
            <Tag className="w-3 h-3 mr-1" />
            {categoryInfo[product.category].name}
          </Badge>
        </div>

        {/* CTA */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-humanic-green hover:bg-humanic-green-light text-white"
              disabled={product.stock === 'agotado'}
            >
              {product.stock === 'agotado' ? 'Agotado' : 'Consultar'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-ula-navy-light border-slate-200 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-slate-800">{product.name}</DialogTitle>
              <DialogDescription className="text-slate-500">
                {product.description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <h4 className="text-neon-lime font-semibold mb-2">Detalles del producto</h4>
                <p className="text-slate-600 text-sm">{product.details}</p>
              </div>
              
              <div className="p-4 bg-neon-lime/10 rounded-lg border border-neon-lime/20">
                <h4 className="text-neon-lime font-semibold mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contacto para pedidos
                </h4>
                <p className="text-slate-700 text-sm mb-2">
                  Para adquirir este producto, contáctanos directamente:
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <a 
                    href="tel:+582742712345" 
                    className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-slate-800 hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-neon-lime" />
                    <span className="font-mono">(0274) 271-2345</span>
                  </a>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  Horario: Lunes a Viernes, 8:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export function Catalogo() {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const filteredProducts = activeCategory === 'todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const featuredProducts = products.filter(p => p.featured);

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-12 lg:py-20 bg-gradient-to-b from-ula-navy-dark/50 to-ula-navy">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-lime/30 via-transparent to-transparent"></div>
        
        <div className="relative w-full section-padding">
          <SectionHeader
            title="Catálogo de Productos"
            subtitle="Apoya a HUMANIC"
            description="Adquiere nuestras revistas, libros y productos oficiales. Tu compra contribuye directamente al financiamiento de las investigaciones del centro."
          />

          {/* Support Banner */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="p-6 bg-gradient-to-r from-humanic-green/40 to-neon-lime/10 rounded-2xl border border-humanic-green/30 flex items-start gap-4">
              <div className="w-12 h-12 bg-humanic-green/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-neon-lime" />
              </div>
              <div>
                <h3 className="text-slate-800 font-semibold text-lg mb-1">Tu apoyo es fundamental</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Todas las ganancias de este catálogo se destinan a financiar investigaciones, 
                  becas para estudiantes y el mantenimiento de nuestras publicaciones científicas. 
                  Al comprar, estás contribuyendo al desarrollo del conocimiento en la región andina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="w-full section-padding">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-neon-lime/20 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-neon-lime" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Productos Destacados</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products with Filter */}
      <section className="py-12">
        <div className="w-full section-padding">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={activeCategory === 'todos' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('todos')}
              className={activeCategory === 'todos' 
                ? 'bg-neon-lime text-white hover:bg-neon-lime-light' 
                : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-800'
              }
            >
              <Package className="w-4 h-4 mr-2" />
              Todos
            </Button>
            {Object.entries(categoryInfo).map(([key, info]) => {
              const Icon = info.icon;
              return (
                <Button
                  key={key}
                  variant={activeCategory === key ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(key)}
                  className={activeCategory === key 
                    ? 'bg-neon-lime text-white hover:bg-neon-lime-light' 
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-800'
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {info.name}
                </Button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-slate-800 text-xl font-semibold mb-2">
                No hay productos en esta categoría
              </h3>
              <p className="text-slate-400">
                Selecciona otra categoría para ver más productos
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="w-full section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
              ¿Interesado en algún producto?
            </h2>
            <p className="text-slate-600 mb-8">
              Contáctanos directamente para realizar tu pedido. Ofrecemos descuentos 
              para estudiantes, investigadores y compras al mayor.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:+582742712345"
                className="flex items-center gap-3 px-6 py-4 bg-humanic-green hover:bg-humanic-green-light rounded-xl text-white font-semibold transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span className="font-mono">(0274) 271-2345</span>
              </a>
              <a 
                href="mailto:libreria@humanic.ula.ve"
                className="flex items-center gap-3 px-6 py-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold transition-all duration-300"
              >
                <Info className="w-5 h-5" />
                libreria@humanic.ula.ve
              </a>
            </div>

            <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200 max-w-lg mx-auto">
              <p className="text-slate-400 text-sm">
                <Info className="w-4 h-4 inline mr-2" />
                <strong className="text-slate-600">Nota importante:</strong> Los precios están sujetos 
                a cambio sin previo aviso. El inventario se actualiza semanalmente. 
                Recomendamos confirmar disponibilidad antes de visitarnos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

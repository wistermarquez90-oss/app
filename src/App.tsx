import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Home } from '@/pages/Home';
import { Revista } from '@/pages/Revista';
import { Autores } from '@/pages/Autores';
import { QuienesSomos } from '@/pages/QuienesSomos';
import { Normas } from '@/pages/Normas';
import { Contacto } from '@/pages/Contacto';
import { Catalogo } from '@/pages/Catalogo';
import { NewsletterModal } from '@/components/NewsletterModal';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-ula-navy">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/revista" element={<Revista />} />
          <Route path="/revista/archivo" element={<Revista />} />
          <Route path="/revista/categorias" element={<Revista />} />
          <Route path="/autores" element={<Autores />} />
          <Route path="/autores/:id" element={<Autores />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/normas" element={<Normas />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/catalogo" element={<Catalogo />} />
        </Routes>
        <Footer />
        <NewsletterModal />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1e3a5f',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;

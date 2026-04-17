import { useState } from 'react';
import { Mail, Bell, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NewsletterModalProps {
  variant?: 'button' | 'banner' | 'inline';
  onSubscribe?: () => void;
}

// ID del formulario de Formspree - Reemplazar con el tuyo
// Obtener gratis en: https://formspree.io/register
const FORMSPREE_URL = 'https://formspree.io/f/mldjvdnq';

export function NewsletterModal({ variant = 'button', onSubscribe }: NewsletterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    interest: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enviar a Formspree
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          institution: formData.institution || 'No especificada',
          interest: formData.interest || 'Todas las áreas',
          _subject: 'Nueva suscripción a Newsletter HUMANIC',
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', institution: '', interest: '' });
        
        // Cerrar después de 3 segundos
        setTimeout(() => {
          setIsSuccess(false);
          setIsOpen(false);
          onSubscribe?.();
        }, 3000);
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      console.error('Error al suscribir:', error);
      alert('Hubo un error al procesar tu suscripción. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Variant: Botón flotante (default) - AHORA CON Z-INDEX MÁS ALTO Y POSICIÓN AJUSTADA
  if (variant === 'button') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button 
            className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 px-5 py-3.5 bg-[#a3e635] text-[#152a45] font-bold rounded-full shadow-[0_4px_20px_rgba(163,230,53,0.4)] hover:shadow-[0_6px_30px_rgba(163,230,53,0.6)] transition-all duration-300 hover:scale-105 group"
            style={{ 
              position: 'fixed',
              bottom: '24px',
              right: '24px'
            }}
          >
            <Bell className="w-5 h-5 group-hover:animate-bounce" />
            <span className="hidden sm:inline">Suscríbete</span>
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#1e3a5f] border-white/10 max-w-md">
          <NewsletterFormContent 
            isSuccess={isSuccess}
            isSubmitting={isSubmitting}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    );
  }

  // Variant: Banner (para usar en secciones de página)
  if (variant === 'banner') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="bg-gradient-to-r from-[#2d8659]/20 to-[#a3e635]/10 rounded-2xl border border-[#2d8659]/30 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                <Mail className="w-5 h-5 inline mr-2 text-[#a3e635]" />
                Suscríbete a nuestro Newsletter
              </h3>
              <p className="text-white/70">
                Recibe notificaciones sobre nuevas publicaciones, eventos académicos y noticias de HUMANIC.
              </p>
            </div>
            <DialogTrigger asChild>
              <Button className="bg-[#a3e635] text-[#152a45] hover:bg-[#bef264] font-semibold px-6">
                Suscribirme
                <Bell className="w-4 h-4 ml-2" />
              </Button>
            </DialogTrigger>
          </div>
        </div>
        <DialogContent className="bg-[#1e3a5f] border-white/10 max-w-md">
          <NewsletterFormContent 
            isSuccess={isSuccess}
            isSubmitting={isSubmitting}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    );
  }

  // Variant: Inline (para footer o sidebar)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
          <Mail className="w-4 h-4 mr-2" />
          Newsletter
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1e3a5f] border-white/10 max-w-md">
        <NewsletterFormContent 
          isSuccess={isSuccess}
          isSubmitting={isSubmitting}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

// Componente interno del formulario
interface NewsletterFormContentProps {
  isSuccess: boolean;
  isSubmitting: boolean;
  formData: {
    name: string;
    email: string;
    institution: string;
    interest: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function NewsletterFormContent({ isSuccess, isSubmitting, formData, onChange, onSubmit }: NewsletterFormContentProps) {
  if (isSuccess) {
    return (
      <div className="py-8 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">¡Suscripción exitosa!</h3>
        <p className="text-white/70">
          Gracias por unirte a nuestra comunidad. Recibirás nuestras actualizaciones pronto.
        </p>
      </div>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#a3e635]" />
          Suscríbete al Newsletter
        </DialogTitle>
        <DialogDescription className="text-white/60">
          Recibe noticias sobre publicaciones, eventos y actividades de HUMANIC.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white/80">Nombre completo *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Ej: María González"
            required
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80">Correo electrónico *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="maria@ejemplo.com"
            required
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="institution" className="text-white/80">Institución (opcional)</Label>
          <Input
            id="institution"
            value={formData.institution}
            onChange={(e) => onChange('institution', e.target.value)}
            placeholder="Ej: Universidad de Los Andes"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interest" className="text-white/80">Área de interés</Label>
          <Select value={formData.interest} onValueChange={(value) => onChange('interest', value)}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Selecciona un área" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e3a5f] border-white/10">
              <SelectItem value="ciencias-sociales" className="text-white/80">Ciencias Sociales</SelectItem>
              <SelectItem value="economia" className="text-white/80">Economía</SelectItem>
              <SelectItem value="humanidades" className="text-white/80">Humanidades</SelectItem>
              <SelectItem value="todas" className="text-white/80">Todas las áreas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#a3e635] text-[#152a45] hover:bg-[#bef264] font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Suscribirme
            </>
          )}
        </Button>

        <p className="text-white/40 text-xs text-center">
          Al suscribirte, aceptas recibir correos de HUMANIC. Puedes darte de baja en cualquier momento.
        </p>
      </form>
    </>
  );
}

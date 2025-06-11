import { Globe } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-10 border-t border-border/30 bg-black">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="flex justify-center items-center mb-4">
          <Globe className="w-8 h-8 mr-2 text-primary" />
          <p className="text-2xl font-headline gradient-text">Astroya</p>
        </div>
        <p className="text-sm">&copy; {currentYear} Astroya Landing Pilot. Todos os direitos reservados.</p>
        <p className="text-xs mt-2">Pilotamos sua presença digital para você decolar no mercado.</p>
      </div>
    </footer>
  );
}

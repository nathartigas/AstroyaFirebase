import Link from 'next/link';

export function Header() {
  return (
    <header className="py-6 fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold font-headline gradient-text-animated">
          Astroya
        </Link>
        <nav className="space-x-6">
          <Link href="#workflow" className="text-foreground/80 hover:text-primary transition-colors">
            Como Trabalhamos
          </Link>
          <Link href="#differentials" className="text-foreground/80 hover:text-primary transition-colors">
            Diferenciais
          </Link>
          <Link href="#plans" className="text-foreground/80 hover:text-primary transition-colors">
            Planos
          </Link>
          <Link href="#portfolio" className="text-foreground/80 hover:text-primary transition-colors">
            Portfólio
          </Link>
          <Link href="#contact" className="text-foreground/80 hover:text-primary transition-colors">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}

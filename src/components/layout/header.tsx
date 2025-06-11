import Link from 'next/link';

export function Header() {
  return (
    <header className="py-6 fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold font-headline gradient-text">
          Astroya
        </Link>
        <nav className="space-x-6">
          <Link href="#services" className="text-foreground/80 hover:text-foreground transition-colors">
            Services
          </Link>
          <Link href="#workflow" className="text-foreground/80 hover:text-foreground transition-colors">
            Workflow
          </Link>
          <Link href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

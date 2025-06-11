export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {currentYear} Astroya Landing Pilot. All rights reserved.</p>
        <p className="text-sm mt-2">Crafting digital experiences that launch your business forward.</p>
      </div>
    </footer>
  );
}

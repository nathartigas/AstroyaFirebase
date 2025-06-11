import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-12 bg-gradient-to-br from-background via-purple-900/10 to-orange-500/10">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Launch Your Vision with <span className="gradient-text">Astroya</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-10 max-w-xl mx-auto md:mx-0">
            Expertly crafted landing pages, delivered fast. Propel your business with a subscription that grows with you.
          </p>
          <Link href="#contact">
            <Button
              size="lg"
              className="font-bold text-lg px-10 py-7 gradient-bg text-primary-foreground hover:opacity-90 transition-opacity duration-300 shadow-xl hover:shadow-primary/50"
            >
              Start Your Free Trial
            </Button>
          </Link>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://placehold.co/700x500.png"
            alt="Modern digital illustration for Astroya"
            width={700}
            height={500}
            className="rounded-xl shadow-2xl object-cover"
            data-ai-hint="futuristic abstract"
            priority
          />
        </div>
      </div>
    </section>
  );
}

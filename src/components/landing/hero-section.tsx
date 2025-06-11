import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Rocket, Users } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-32 pb-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* Placeholder for animated particles/abstract forms. For now, a subtle static image or gradient. */}
        <Image
          src="https://placehold.co/1920x1080.png?text=." 
          alt="Fundo abstrato espacial"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
          data-ai-hint="abstract space"
        />
      </div>
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight gradient-text-animated">
            A gente pilota, você decola.
          </h1>
          <p className="text-xl text-foreground/80 mb-10 max-w-xl mx-auto md:mx-0">
            Landing pages criadas sob medida, com entrega rápida, manutenção e assinatura mensal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="#contact">
              <Button
                size="lg"
                className="font-bold text-lg px-10 py-7 gradient-bg text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-primary/50 transform hover:scale-105"
              >
                <Rocket className="mr-2 h-5 w-5" /> Começar agora
              </Button>
            </Link>
            <Link href="#plans">
              <Button
                variant="outline"
                size="lg"
                className="font-bold text-lg px-10 py-7 text-foreground border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 shadow-lg hover:shadow-primary/30 transform hover:scale-105"
              >
                <Users className="mr-2 h-5 w-5" /> Ver planos
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <div className="relative w-[500px] h-[400px] lg:w-[600px] lg:h-[500px]">
            <Image
              src="https://placehold.co/600x500.png"
              alt="Ilustração futurista de um foguete decolando ou painel de controle"
              width={600}
              height={500}
              className="rounded-xl shadow-2xl object-cover"
              data-ai-hint="futuristic spaceship launch"
              priority
            />
             <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/30 rounded-full blur-2xl animate-pulse"></div>
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { SectionWrapper } from "./section-wrapper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Target } from "lucide-react";

export function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-card/80">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 flex justify-center">
           <Image
            src="https://placehold.co/550x450.png"
            alt="Equipe Astroya colaborando em projetos futuristas"
            width={550}
            height={450}
            className="rounded-xl shadow-2xl border-2 border-primary/30"
            data-ai-hint="team futuristic collaboration"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-4xl font-bold mb-6 gradient-text">Sobre a Astroya</h2>
          <p className="text-lg text-foreground/80 mb-4">
            Na Astroya, somos mais que criadores de landing pages; somos seus copilotos na jornada digital. Especializamo-nos em impulsionar pequenos e médios negócios, além de profissionais autônomos, com uma presença online que converte e encanta.
          </p>
          <p className="text-lg text-foreground/80 mb-4">
            Nosso modelo de assinatura é a chave para um voo tranquilo: design de ponta, entrega ágil, e a certeza de que sua página estará sempre atualizada e performando no auge, sem que você precise se preocupar com os detalhes técnicos.
          </p>
          <p className="text-lg text-foreground/80 mb-6">
            Com a Astroya, você não contrata um serviço, você adquire um parceiro estratégico dedicado a fazer sua marca decolar.
          </p>
          <Link href="#contact">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all transform hover:scale-105">
              <Target className="mr-2 h-5 w-5" /> Fale com um especialista
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

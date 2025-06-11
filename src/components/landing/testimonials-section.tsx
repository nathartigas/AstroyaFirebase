import Image from "next/image";
import { SectionWrapper } from "./section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react"; // Assuming you might want star ratings

const testimonials = [
  {
    quote: "A Astroya não só entregou nossa landing page em tempo recorde, como o design superou todas as expectativas. Nossas conversões dispararam!",
    name: "Julia Almeida",
    company: "CEO, InovaTech Soluções",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait"
  },
  {
    quote: "O modelo de assinatura é um divisor de águas. Suporte contínuo, zero preocupações com hospedagem ou manutenção. Recomendo de olhos fechados!",
    name: "Marcos Silva",
    company: "Fundador, Criativa Hub",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "man portrait"
  },
  {
    quote: "Profissionalismo, agilidade e um resultado final impecável. A Astroya captou nossa essência e traduziu em uma página que vende.",
    name: "Beatriz Costa",
    company: "Diretora de Marketing, Expansão Digital",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "person smiling"
  },
];

const trustBadges = [
  { src: "https://placehold.co/120x60.png?text= ParceiroA", alt: "Parceiro A", hint: "logo badge" },
  { src: "https://placehold.co/120x60.png?text=SeloB", alt: "Selo B", hint: "award seal" },
  { src: "https://placehold.co/120x60.png?text=CertC", alt: "Certificação C", hint: "security certificate" },
  { src: "https://placehold.co/120x60.png?text=EmpresaD", alt: "Empresa D", hint: "partner logo" },
];

export function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials" className="bg-background">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Aprovado por quem já Decolou Conosco</h2>
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Veja o que nossos clientes dizem sobre a experiência de ter a Astroya como copiloto em sua jornada digital.
        </p>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="glassmorphism-card p-6 shadow-xl transform hover:scale-105 transition-transform duration-300 rounded-xl border-primary/20">
            <CardContent className="p-0 flex flex-col h-full">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-lg text-foreground/90 italic mb-6 flex-grow">&quot;{testimonial.quote}&quot;</p>
              <div className="flex items-center mt-auto">
                <Avatar className="h-12 w-12 mr-4 border-2 border-primary/50">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                  <AvatarFallback>{testimonial.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold font-headline text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-primary">{testimonial.company}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-bold mb-8 text-foreground/90">Parceiros Estratégicos e Reconhecimentos</h3>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
          {trustBadges.map((badge, index) => (
            <Image
              key={index}
              src={badge.src}
              alt={badge.alt}
              width={130}
              height={65}
              className="opacity-60 hover:opacity-100 transition-opacity duration-300"
              data-ai-hint={badge.hint}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

import { SectionWrapper } from "./section-wrapper";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Zap, Palette, ShieldCheck, Server, Gem, Clock } from "lucide-react";

const differentials = [
  {
    icon: <Zap className="w-12 h-12 mb-4 text-primary" />,
    title: "Entrega Ultra-Rápida",
    description: "Sua landing page no ar em até 5 dias úteis. Agilidade é nosso sobrenome.",
  },
  {
    icon: <Palette className="w-12 h-12 mb-4 text-primary" />,
    title: "Design Exclusivo e Sob Medida",
    description: "Criamos uma identidade visual única que reflete a alma do seu negócio.",
  },
  {
    icon: <ShieldCheck className="w-12 h-12 mb-4 text-primary" />,
    title: "Manutenção Inclusa, Zero Dor de Cabeça",
    description: "Atualizações e suporte contínuo para sua página operar sempre no máximo.",
  },
  {
    icon: <Server className="w-12 h-12 mb-4 text-primary" />,
    title: "Hospedagem de Alta Performance",
    description: "Deixe a infraestrutura conosco. Sua página segura e veloz, sempre online.",
  },
  {
    icon: <Gem className="w-12 h-12 mb-4 text-primary" />,
    title: "Assinatura Mensal Sem Complicações",
    description: "Planos flexíveis e transparentes para impulsionar seu crescimento.",
  },
  {
    icon: <Clock className="w-12 h-12 mb-4 text-primary" />,
    title: "Foco Total no Seu Core Business",
    description: "Enquanto pilotamos sua presença online, você foca no que faz de melhor.",
  }
];

export function DifferentialsSection() {
  return (
    <SectionWrapper id="differentials" className="bg-gradient-to-br from-background via-purple-900/10 to-orange-500/5">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 gradient-text">Nossos Diferenciais Exclusivos</h2>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
          Entregamos mais que uma landing page: fornecemos a plataforma completa para o seu sucesso online, com a vanguarda da tecnologia e design.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {differentials.map((item, index) => (
          <Card 
            key={index} 
            className="bg-card/60 backdrop-blur-sm border-border/30 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-primary/20 shadow-xl rounded-xl"
          >
            <CardHeader className="items-center text-center">
              {item.icon}
              <CardTitle className="font-headline text-2xl text-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-foreground/70 text-base">{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}

import { SectionWrapper } from "./section-wrapper";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Zap, Palette, ShieldCheck, ServerCog, Gem, Clock } from "lucide-react";

const differentials = [
  {
    icon: <Clock className="w-12 h-12 mb-4 text-primary" />,
    title: "Entrega em até 5 Dias Úteis",
    description: "Sua landing page pronta para decolar em tempo recorde, sem comprometer a qualidade.",
  },
  {
    icon: <Palette className="w-12 h-12 mb-4 text-primary" />,
    title: "Design Exclusivo Para Cada Cliente",
    description: "Criamos uma identidade visual única que reflete a alma e os objetivos do seu negócio.",
  },
  {
    icon: <ShieldCheck className="w-12 h-12 mb-4 text-primary" />,
    title: "Manutenção Incluída no Plano",
    description: "Atualizações e suporte contínuo para sua página operar sempre no máximo de performance e segurança.",
  },
  {
    icon: <ServerCog className="w-12 h-12 mb-4 text-primary" />,
    title: "Hospedagem Por Nossa Conta",
    description: "Deixe a infraestrutura conosco. Sua página segura e veloz, sempre online para seus clientes.",
  },
  {
    icon: <Gem className="w-12 h-12 mb-4 text-primary" />,
    title: "Assinatura Mensal Sem Complicações",
    description: "Planos flexíveis e transparentes, desenhados para impulsionar seu crescimento contínuo.",
  },
  {
    icon: <Zap className="w-12 h-12 mb-4 text-primary" />,
    title: "Tecnologia de Vanguarda",
    description: "Utilizamos as mais recentes tecnologias para garantir uma experiência de usuário fluida e moderna.",
  }
];

export function DifferentialsSection() {
  return (
    <SectionWrapper id="differentials" className="bg-gradient-to-br from-background via-purple-950/20 to-black py-20 md:py-28">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-animated">Por Que Escolher a Astroya?</h2>
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Entregamos mais que uma landing page: fornecemos a plataforma completa para o seu sucesso online, com a vanguarda da tecnologia, design impactante e um serviço que te permite focar no que realmente importa.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {differentials.map((item, index) => (
          <Card 
            key={index} 
            className="glassmorphism-card border-primary/30 hover:border-primary/70 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-primary/30 shadow-2xl rounded-xl overflow-hidden"
          >
            <CardHeader className="items-center text-center p-6">
              <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
                {item.icon}
              </div>
              <CardTitle className="font-headline text-2xl text-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center p-6 pt-0">
              <CardDescription className="text-foreground/70 text-base">{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}

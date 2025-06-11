
"use client";

import { SectionWrapper } from "./section-wrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Star, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

const plans = [
  {
    name: "Plano Decolar",
    price: "R$ 297",
    period: "/mês",
    icon: <Rocket className="w-8 h-8 text-primary mb-2" />,
    description: "Ideal para quem está começando e busca impacto rápido.",
    features: [
      "Landing Page Exclusiva",
      "Entrega em 7 dias úteis",
      "Design Responsivo",
      "Otimização SEO básica",
      "1 ciclo de manutenção mensal",
      "Hospedagem Inclusa",
    ],
    cta: "Assinar Decolar",
    featured: false,
  },
  {
    name: "Plano Orbital",
    price: "R$ 497",
    period: "/mês",
    icon: <Sparkles className="w-8 h-8 text-primary mb-2" />,
    description: "Para negócios que precisam de mais performance e customização.",
    features: [
      "Tudo do Plano Decolar",
      "Entrega em 5 dias úteis",
      "Design Premium Personalizado",
      "Otimização SEO Avançada",
      "2 ciclos de manutenção mensal",
      "Integração com Ferramentas",
      "Relatórios de Performance",
    ],
    cta: "Assinar Orbital",
    featured: true,
  },
  {
    name: "Plano Galáctico",
    price: "R$ 797",
    period: "/mês",
    icon: <Star className="w-8 h-8 text-primary mb-2" />,
    description: "A solução completa para empresas que miram o universo.",
    features: [
      "Tudo do Plano Orbital",
      "Entrega Prioritária (3-4 dias)",
      "Consultoria Estratégica",
      "Manutenção Ilimitada",
      "Suporte Premium Dedicado",
      "Testes A/B e Otimizações",
      "Analytics Avançado",
    ],
    cta: "Assinar Galáctico",
    featured: false,
  },
];

export function PlansSection() {
  const isMobile = useIsMobile();

  return (
    <SectionWrapper id="plans" className="bg-background">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-animated">Escolha Seu Plano de Voo</h2>
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Temos a opção perfeita para cada estágio da sua jornada. Todos os planos incluem nossa expertise e o compromisso com o seu sucesso.
        </p>
      </div>
      <div className={
        isMobile
          ? "flex overflow-x-auto space-x-6 py-4 snap-x snap-mandatory scroll-smooth scroll-px-[max(0px,calc((100vw-2rem-85vw)/2))]"
          : "grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
      }>
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`
              flex flex-col rounded-xl shadow-2xl transition-all duration-300 hover:shadow-primary/40
              ${plan.featured ? "border-2 border-primary bg-primary/5 glassmorphism-card-darker" : "bg-card/70 backdrop-blur-sm border-border/30"}
              transform hover:-translate-y-2
              ${isMobile ? "flex-shrink-0 w-[85vw] sm:w-[320px] snap-center" : ""}
            `}
          >
            <CardHeader className="text-center p-6">
              {plan.icon}
              <CardTitle className={`text-3xl font-headline ${plan.featured ? 'text-primary' : 'text-foreground'}`}>{plan.name}</CardTitle>
              <div className="flex items-baseline justify-center my-4">
                <span className={`text-5xl font-bold ${plan.featured ? 'text-primary' : 'text-foreground'}`}>{plan.price}</span>
                <span className="text-lg text-muted-foreground">{plan.period}</span>
              </div>
              <CardDescription className={`min-h-[40px] ${plan.featured ? 'text-foreground/90' : 'text-foreground/70'}`}>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-6 space-y-3">
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${plan.featured ? 'text-primary' : 'text-green-500'}`} />
                    <span className={`${plan.featured ? 'text-foreground/90' : 'text-foreground/80'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6 mt-auto">
              <Link href="#contact" className="w-full">
                <Button size="lg" className={`w-full font-semibold text-lg py-6 transition-all duration-300
                  ${plan.featured ? 'gradient-bg text-primary-foreground hover:opacity-90' 
                                   : 'bg-primary/80 text-primary-foreground hover:bg-primary'}`}>
                  {plan.cta} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}

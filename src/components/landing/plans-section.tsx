
"use client";

import { useState } from "react";
import { SectionWrapper } from "./section-wrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Star, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const plansData = [
  {
    id: "decolar",
    name: "Plano Decolar",
    icon: <Rocket className="w-8 h-8 text-primary mb-2" />,
    description: "Ideal para quem está começando e busca impacto rápido.",
    pricing: {
      monthly: { price: 297, periodLabel: "/mês", cta: "Assinar Mensal" },
      annual: { price: 297 * 10, periodLabel: "/ano", discountBadge: "Economize 2 meses!", cta: "Assinar Anual" }
    },
    features: [
      "Landing Page Exclusiva",
      "Entrega em 7 dias úteis",
      "Design Responsivo",
      "Otimização SEO básica",
      "1 ciclo de manutenção mensal",
      "Hospedagem Inclusa",
    ],
    featured: false,
  },
  {
    id: "orbital",
    name: "Plano Orbital",
    icon: <Sparkles className="w-8 h-8 text-primary mb-2" />,
    description: "Para negócios que precisam de mais performance e customização.",
    pricing: {
      monthly: { price: 497, periodLabel: "/mês", cta: "Assinar Mensal" },
      annual: { price: 497 * 10, periodLabel: "/ano", discountBadge: "Economize 2 meses!", cta: "Assinar Anual" }
    },
    features: [
      "Tudo do Plano Decolar",
      "Entrega em 5 dias úteis",
      "Design Premium Personalizado",
      "Otimização SEO Avançada",
      "2 ciclos de manutenção mensal",
      "Integração com Ferramentas",
      "Relatórios de Performance",
    ],
    featured: true,
  },
  {
    id: "galactico",
    name: "Plano Galáctico",
    icon: <Star className="w-8 h-8 text-primary mb-2" />,
    description: "A solução completa para empresas que miram o universo.",
    pricing: {
      monthly: { price: 797, periodLabel: "/mês", cta: "Assinar Mensal" },
      annual: { price: 797 * 10, periodLabel: "/ano", discountBadge: "Economize 2 meses!", cta: "Assinar Anual" }
    },
    features: [
      "Tudo do Plano Orbital",
      "Entrega Prioritária (3-4 dias)",
      "Consultoria Estratégica",
      "Manutenção Ilimitada",
      "Suporte Premium Dedicado",
      "Testes A/B e Otimizações",
      "Analytics Avançado",
    ],
    featured: false,
  },
];

export function PlansSection() {
  const isMobile = useIsMobile();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <SectionWrapper id="plans" className="bg-background">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-animated">Escolha Seu Plano de Voo</h2>
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Temos a opção perfeita para cada estágio da sua jornada. Todos os planos incluem nossa expertise e o compromisso com o seu sucesso.
        </p>
      </div>

      <div className="flex flex-col items-center mb-10 md:mb-12">
        <div className="flex items-center justify-center space-x-3">
          <Label htmlFor="billing-cycle-switch" className={`text-lg font-medium transition-colors ${billingCycle === 'monthly' ? 'text-primary' : 'text-foreground/70'}`}>
            Mensal
          </Label>
          <Switch
            id="billing-cycle-switch"
            checked={billingCycle === 'annual'}
            onCheckedChange={(checked) => setBillingCycle(checked ? 'annual' : 'monthly')}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
          />
          <Label htmlFor="billing-cycle-switch" className={`text-lg font-medium transition-colors ${billingCycle === 'annual' ? 'text-primary' : 'text-foreground/70'}`}>
            Anual
          </Label>
        </div>
        {billingCycle === 'annual' && (
          <div className="mt-2">
            <Badge variant="secondary" className="text-sm bg-secondary/20 text-secondary border-secondary/50">
              Economize 2 meses!
            </Badge>
          </div>
        )}
      </div>

      <div className={
        isMobile
          ? "flex overflow-x-auto space-x-6 py-4 snap-x snap-mandatory scroll-smooth scroll-px-[max(0px,calc((100vw-2rem-85vw)/2))]"
          : "grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
      }>
        {plansData.map((plan) => {
          const currentPricing = billingCycle === 'annual' ? plan.pricing.annual : plan.pricing.monthly;
          const displayPrice = `R$ ${currentPricing.price.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
          const displayPeriod = currentPricing.periodLabel;
          const ctaText = currentPricing.cta;

          return (
            <Card
              key={plan.id}
              className={`
                flex flex-col rounded-xl shadow-2xl transition-all duration-300 
                ${!isMobile ? 'md:hover:shadow-primary/40 transform md:hover:-translate-y-2' : ''}
                ${isMobile ? "flex-shrink-0 w-[85vw] sm:w-[320px] snap-center" : ""}
                ${plan.featured
                  ? `border-2 border-primary ${isMobile ? 'bg-card/70 backdrop-blur-sm' : 'bg-primary/5 backdrop-blur-lg'}`
                  : 'bg-card/70 backdrop-blur-sm border-border/30'
                }
              `}
            >
              <CardHeader className="text-center p-6">
                {plan.icon}
                <CardTitle className={`text-3xl font-headline ${plan.featured ? 'text-primary' : 'text-foreground'}`}>{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center my-2">
                  <span className={`text-5xl font-bold ${plan.featured ? 'text-primary' : 'text-foreground'}`}>{displayPrice}</span>
                  <span className="text-lg text-muted-foreground">{displayPeriod}</span>
                </div>
                {billingCycle === 'annual' && plan.pricing.annual.discountBadge && (
                   <Badge variant="outline" className="text-xs border-primary/50 text-primary bg-primary/10 mx-auto mt-1 mb-2">
                     {plan.pricing.annual.discountBadge}
                   </Badge>
                )}
                <CardDescription className={`min-h-[40px] text-base ${plan.featured ? 'text-foreground/90' : 'text-foreground/70'}`}>{plan.description}</CardDescription>
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
                    {ctaText} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

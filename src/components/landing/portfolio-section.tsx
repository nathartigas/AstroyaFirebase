import { SectionWrapper } from "./section-wrapper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const portfolioItems = [
  {
    title: "Landing Page para Startup Tech",
    description: "Um design moderno e focado em conversão para o lançamento de um SaaS inovador.",
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "website interface tech",
    tags: ["SaaS", "Tecnologia", "Conversão"],
  },
  {
    title: "Página de Vendas para Infoproduto",
    description: "Layout persuasivo e otimizado para maximizar as vendas de um curso online.",
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "sales page education",
    tags: ["Infoproduto", "Marketing Digital", "Vendas"],
  },
  {
    title: "Site Institucional para Consultoria",
    description: "Presença online profissional e elegante para uma consultoria de negócios.",
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "corporate website professional",
    tags: ["Institucional", "Consultoria", "Profissional"],
  },
];

export function PortfolioSection() {
  return (
    <SectionWrapper id="portfolio" className="bg-card/80">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-animated">Nossas Missões Anteriores</h2>
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Confira alguns exemplos (fictícios para demonstração) de como transformamos ideias em landing pages de alto impacto, prontas para decolar.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item, index) => (
          <Card key={index} className="group rounded-xl overflow-hidden shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-2 glassmorphism-card">
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={item.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10"></div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-2xl font-headline font-semibold mb-2 text-foreground">{item.title}</h3>
              <p className="text-foreground/70 mb-4 text-sm min-h-[60px]">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium">{tag}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-16">
        <Link href="#contact">
          <Button size="lg" className="gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity duration-300 shadow-lg hover:shadow-primary/40 text-lg px-8 py-6">
            <Eye className="mr-2 h-5 w-5" /> Quero um Projeto Assim
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}

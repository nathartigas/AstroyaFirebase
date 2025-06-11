import { SectionWrapper } from "./section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, DraftingCompass, CheckCircle, Rocket, Wrench, ChevronRight } from "lucide-react";

const workflowSteps = [
  {
    icon: <FileText className="w-10 h-10 text-primary mb-3" />,
    title: "Briefing Detalhado",
    description: "Entendemos sua visão e objetivos para um projeto alinhado.",
  },
  {
    icon: <DraftingCompass className="w-10 h-10 text-primary mb-3" />,
    title: "Prototipagem Ágil",
    description: "Criamos o design e a estrutura, validando cada etapa com você.",
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-primary mb-3" />,
    title: "Aprovação Final",
    description: "Você revisa e aprova o design final antes do lançamento.",
  },
  {
    icon: <Rocket className="w-10 h-10 text-primary mb-3" />,
    title: "Entrega & Decolagem",
    description: "Sua landing page no ar, otimizada para performance e conversão.",
  },
  {
    icon: <Wrench className="w-10 h-10 text-primary mb-3" />,
    title: "Manutenção Contínua",
    description: "Suporte e atualizações para sua página voar sempre alto.",
  },
];

export function WorkflowSection() {
  return (
    <SectionWrapper id="workflow" className="bg-background">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 gradient-text">Como Pilomos Seu Sucesso</h2>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
          Nosso processo é transparente e colaborativo, garantindo que sua landing page seja exatamente o que você precisa para decolar.
        </p>
      </div>
      <div className="relative">
        {/* Desktop horizontal line - hidden on smaller screens */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-border/50 -translate-y-1/2" style={{ width: 'calc(100% - 10rem)', margin: '0 auto' }}></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-stretch">
          {workflowSteps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center lg:text-left">
              <Card className="w-full h-full flex flex-col bg-card/50 hover:border-primary/70 border-2 border-transparent transition-all duration-300 shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 z-10">
                <CardHeader className="items-center lg:items-start">
                  {step.icon}
                  <CardTitle className="text-xl font-headline text-foreground">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/70 text-sm">{step.description}</p>
                </CardContent>
              </Card>
              {index < workflowSteps.length - 1 && (
                <>
                  {/* Arrow for desktop view */}
                  <ChevronRight className="hidden lg:block absolute top-1/2 right-[-1.75rem] transform -translate-y-1/2 translate-x-1/2 w-10 h-10 text-primary z-0" />
                  {/* Vertical line for mobile/tablet view */}
                  <div className="lg:hidden w-1 h-8 bg-border/50 my-4"></div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

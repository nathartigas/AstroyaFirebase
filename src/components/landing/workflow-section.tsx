import { SectionWrapper } from "./section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Settings2, PackageCheck, History, ChevronRight } from "lucide-react";

const workflowSteps = [
  {
    icon: <ClipboardList className="w-8 h-8 text-primary" />,
    title: "1. Briefing & Discovery",
    description: "We start by understanding your vision, goals, and target audience to lay a solid foundation.",
  },
  {
    icon: <Settings2 className="w-8 h-8 text-primary" />,
    title: "2. Design & Creation",
    description: "Our experts craft a custom design and develop your high-performance landing page.",
  },
  {
    icon: <PackageCheck className="w-8 h-8 text-primary" />,
    title: "3. Delivery & Launch",
    description: "Your page goes live after rigorous testing, ready to captivate and convert visitors.",
  },
  {
    icon: <History className="w-8 h-8 text-primary" />,
    title: "4. Ongoing Maintenance",
    description: "We provide continuous support, updates, and optimizations to ensure lasting success.",
  },
];

export function WorkflowSection() {
  return (
    <SectionWrapper id="workflow" className="bg-card">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Our Streamlined Workflow</h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          From initial concept to ongoing support, we make the process seamless and efficient.
        </p>
      </div>
      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflowSteps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <Card className="w-full text-center p-6 bg-background/50 border-2 border-transparent hover:border-primary/50 transition-colors duration-300 shadow-lg z-10">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold font-headline mb-2 text-foreground">{step.title}</h3>
                  <p className="text-foreground/70 text-sm">{step.description}</p>
                </CardContent>
              </Card>
              {index < workflowSteps.length - 1 && (
                <ChevronRight className="hidden lg:block absolute top-1/2 right-[-1rem] transform -translate-y-1/2 translate-x-1/2 w-8 h-8 text-primary z-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

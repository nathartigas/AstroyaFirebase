import { SectionWrapper } from "./section-wrapper";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Rocket, Palette, ServerCog, Wrench, CreditCard, Zap } from "lucide-react";

const services = [
  {
    icon: <Rocket className="w-10 h-10 mb-4 text-primary" />,
    title: "Rapid Delivery",
    description: "Get your custom landing page live in record time. We prioritize speed without compromising quality.",
  },
  {
    icon: <Palette className="w-10 h-10 mb-4 text-primary" />,
    title: "Bespoke Design",
    description: "Unique, modern designs tailored to your brand identity, ensuring you stand out from the crowd.",
  },
  {
    icon: <ServerCog className="w-10 h-10 mb-4 text-primary" />,
    title: "Integrated Hosting",
    description: "Hassle-free, reliable hosting included. We handle the technical bits so you don't have to.",
  },
  {
    icon: <Wrench className="w-10 h-10 mb-4 text-primary" />,
    title: "Continuous Maintenance",
    description: "Ongoing support and updates to keep your page secure, fast, and performing optimally.",
  },
  {
    icon: <CreditCard className="w-10 h-10 mb-4 text-primary" />,
    title: "Flexible Subscriptions",
    description: "Affordable and scalable plans designed to fit your business needs and budget.",
  },
  {
    icon: <Zap className="w-10 h-10 mb-4 text-primary" />,
    title: "Performance Optimized",
    description: "Built for speed and conversions, ensuring a seamless experience for your visitors.",
  }
];

export function ServicesShowcaseSection() {
  return (
    <SectionWrapper id="services">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Core Services</h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Everything you need for a compelling online presence, bundled into one simple subscription.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="bg-card/50 hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
              {service.icon}
              <CardTitle className="font-headline text-2xl text-foreground">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-foreground/70 text-base">{service.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}

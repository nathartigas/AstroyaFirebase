import { SectionWrapper } from "./section-wrapper";
import { BadgeDollarSign, SmilePlus, UsersRound, TrendingUp, ShieldCheck, Clock } from "lucide-react";

const benefits = [
  {
    icon: <BadgeDollarSign className="w-10 h-10 text-secondary" />,
    title: "Cost-Effective Solution",
    description: "Predictable monthly fees, no large upfront costs. Get premium quality without breaking the bank.",
  },
  {
    icon: <SmilePlus className="w-10 h-10 text-secondary" />,
    title: "Hassle-Free Management",
    description: "We handle everything from hosting to updates, so you can focus on your core business.",
  },
  {
    icon: <UsersRound className="w-10 h-10 text-secondary" />,
    title: "Expert Support",
    description: "Access to our team of experienced designers and developers for ongoing assistance.",
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-secondary" />,
    title: "Scalable & Future-Proof",
    description: "Your landing page evolves with your business, always utilizing the latest technologies.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-secondary" />,
    title: "Enhanced Security",
    description: "Robust security measures to protect your page and visitor data, giving you peace of mind.",
  },
  {
    icon: <Clock className="w-10 h-10 text-secondary" />,
    title: "Time Saving",
    description: "Free up your valuable time by letting us manage your online presence efficiently.",
  }
];

export function SubscriptionBenefitsSection() {
  return (
    <SectionWrapper id="benefits">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Why Subscribe to Astroya?</h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Unlock a suite of advantages designed to maximize your impact and minimize your effort.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-4 p-6 bg-card/30 rounded-lg shadow-md hover:shadow-secondary/20 transition-shadow duration-300">
            <div>{benefit.icon}</div>
            <div>
              <h3 className="text-xl font-bold font-headline mb-2 text-foreground">{benefit.title}</h3>
              <p className="text-foreground/70">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

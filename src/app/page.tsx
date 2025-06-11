import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { AboutSection } from "@/components/landing/about-section";
import { ServicesShowcaseSection } from "@/components/landing/services-showcase-section";
import { WorkflowSection } from "@/components/landing/workflow-section";
import { SubscriptionBenefitsSection } from "@/components/landing/subscription-benefits-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { ContactSection } from "@/components/landing/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ServicesShowcaseSection />
        <WorkflowSection />
        <SubscriptionBenefitsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

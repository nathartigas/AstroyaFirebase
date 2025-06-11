import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { AboutSection } from "@/components/landing/about-section";
import { DifferentialsSection } from "@/components/landing/differentials-section";
import { WorkflowSection } from "@/components/landing/workflow-section";
import { PlansSection } from "@/components/landing/plans-section";
import { PortfolioSection } from "@/components/landing/portfolio-section";
import { ContactSection } from "@/components/landing/contact-section";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <WorkflowSection />
        <DifferentialsSection />
        <PlansSection />
        <PortfolioSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

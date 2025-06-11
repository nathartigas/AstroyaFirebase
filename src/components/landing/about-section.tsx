import { SectionWrapper } from "./section-wrapper";
import Image from "next/image";

export function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-card">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6 gradient-text">About Astroya</h2>
          <p className="text-lg text-foreground/80 mb-4">
            Astroya is your dedicated partner for creating stunning, high-performance landing pages. We specialize in serving small to medium-sized businesses and professionals who need a powerful online presence without the complexity of managing it themselves.
          </p>
          <p className="text-lg text-foreground/80 mb-4">
            Our subscription model ensures you receive not just a website, but continuous support, updates, and expertise. We focus on rapid delivery and custom designs tailored to your brand, allowing you to concentrate on what you do best.
          </p>
          <p className="text-lg text-foreground/80">
            With Astroya, you get more than a service; you get a strategic ally committed to your digital success.
          </p>
        </div>
        <div className="flex justify-center">
           <Image
            src="https://placehold.co/500x400.png"
            alt="Team or abstract representation of support"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
            data-ai-hint="team collaboration"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

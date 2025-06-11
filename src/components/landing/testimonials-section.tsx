import Image from "next/image";
import { SectionWrapper } from "./section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Astroya delivered our landing page incredibly fast, and the design was spot-on! Our conversions have significantly improved.",
    name: "Jane Doe",
    company: "CEO, Tech Solutions Inc.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait"
  },
  {
    quote: "The subscription model is perfect for us. Continuous support and no headaches with hosting or maintenance. Highly recommend!",
    name: "John Smith",
    company: "Founder, Creative Minds Co.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "man portrait"
  },
  {
    quote: "Professional, responsive, and a fantastic final product. Astroya understood our needs perfectly.",
    name: "Alice Brown",
    company: "Marketing Director, Innovate Hub",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "person smiling"
  },
];

const trustBadges = [
  { src: "https://placehold.co/120x60.png", alt: "Trust Badge 1", hint: "logo badge" },
  { src: "https://placehold.co/120x60.png", alt: "Trust Badge 2", hint: "award seal" },
  { src: "https://placehold.co/120x60.png", alt: "Trust Badge 3", hint: "security certification" },
  { src: "https://placehold.co/120x60.png", alt: "Trust Badge 4", hint: "partner logo" },
];

export function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials" className="bg-card">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Loved by Businesses Like Yours</h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Hear what our satisfied clients have to say about their Astroya experience.
        </p>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-background/50 p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-0">
              <p className="text-lg text-foreground/90 italic mb-6">&quot;{testimonial.quote}&quot;</p>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                  <AvatarFallback>{testimonial.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold font-headline text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-primary">{testimonial.company}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold mb-6 text-foreground/90">Trusted By Industry Leaders</h3>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {trustBadges.map((badge, index) => (
            <Image
              key={index}
              src={badge.src}
              alt={badge.alt}
              width={120}
              height={60}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300"
              data-ai-hint={badge.hint}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

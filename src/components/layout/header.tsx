
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, CalendarCheck, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ConsultationModal } from '@/components/feature/consultation-modal';

const navLinks = [
  { href: "#workflow", label: "Como Trabalhamos" },
  { href: "#differentials", label: "Diferenciais" },
  { href: "#plans", label: "Planos" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#contact", label: "Contato" },
];

export function Header() {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  return (
    <header className="py-4 md:py-6 fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold font-headline gradient-text-animated">
          Astroya
        </Link>
        {isMobile ? (
          <div className="flex items-center gap-2">
            <ConsultationModal open={isConsultationModalOpen} onOpenChange={setIsConsultationModalOpen}>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:text-primary/90"
                onClick={() => setIsConsultationModalOpen(true)}
              >
                <CalendarCheck className="h-6 w-6" />
                <span className="sr-only">Agendar Consultoria</span>
              </Button>
            </ConsultationModal>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-7 w-7 text-foreground" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-background p-6">
                <SheetHeader className="mb-8 text-left">
                   <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold font-headline gradient-text-animated" onClick={() => setIsSheetOpen(false)}>
                        Astroya
                    </Link>
                  </div>
                  <SheetTitle className="sr-only">Menu Principal</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-5">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="text-lg text-foreground/90 hover:text-primary transition-colors py-2"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center space-x-3 lg:space-x-4">
            <nav className="space-x-3 lg:space-x-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm lg:text-base text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <ConsultationModal open={isConsultationModalOpen} onOpenChange={setIsConsultationModalOpen}>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                onClick={() => setIsConsultationModalOpen(true)}
              >
                <CalendarCheck className="mr-2 h-4 w-4" /> Consultoria Gratuita
              </Button>
            </ConsultationModal>
          </div>
        )}
      </div>
    </header>
  );
}

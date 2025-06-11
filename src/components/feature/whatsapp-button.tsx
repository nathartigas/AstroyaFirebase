
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react'; // Using MessageCircle as a stand-in for WhatsApp icon

export function WhatsAppButton() {
  const phoneNumber = "5511999998888"; // Same as contact section
  const message = "Olá! Gostaria de saber mais sobre os serviços da Astroya.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" passHref>
      <Button
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1DAE54] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 transition-transform hover:scale-110"
        aria-label="Entre em contato pelo WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
    </Link>
  );
}

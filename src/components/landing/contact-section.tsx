"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionWrapper } from "./section-wrapper";
import { useToast } from "@/hooks/use-toast"; // Corrected import path
import { Send, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Added Card imports

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Seu nome precisa ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido.",
  }),
  message: z.string().min(10, {
    message: "Sua mensagem precisa ter pelo menos 10 caracteres.",
  }).max(500, {
    message: "Sua mensagem não pode exceder 500 caracteres."
  }),
});

export function ContactSection() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // Placeholder for actual submission logic
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    toast({
      title: "Mensagem Enviada!",
      description: "Obrigado por entrar em contato. Sua decolagem começa em breve!",
      variant: "default", 
    });
    form.reset();
  }

  return (
    <SectionWrapper id="contact" className="bg-background">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-4xl font-bold mb-6 gradient-text">Pronto para Decolar?</h2>
          <p className="text-lg text-foreground/80 mb-6">
            Sua jornada rumo a uma presença online de alto impacto começa aqui. Preencha o formulário e nossa equipe de especialistas entrará em contato para traçar o plano de voo ideal para seu negócio.
          </p>
          <p className="text-lg text-foreground/80 mb-8">
            Prefere um contato direto? Estamos à disposição para transformar suas ideias em realidade.
          </p>
           <div className="space-y-6 text-lg">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-primary"/>
              <a href="mailto:contato@astroya.com.br" className="text-foreground/90 hover:text-primary transition-colors">contato@astroya.com.br</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-primary"/>
              <a href="tel:+5511999998888" className="text-foreground/90 hover:text-primary transition-colors">(11) 99999-8888</a>
            </div>
            <p className="text-foreground/70">Segunda a Sexta, das 9h às 18h.</p>
          </div>
        </div>
        <Card className="bg-card/50 backdrop-blur-sm border-border/30 shadow-xl p-0 rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center gradient-text">Solicite Sua Proposta Personalizada</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome de piloto" {...field} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Seu Melhor E-mail</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contato@suaempresa.com.br" {...field} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Descreva Seu Projeto ou Dúvida</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Conte-nos sobre os seus desafios e como podemos ajudar a Astroya a pilotar seu sucesso..."
                          {...field}
                          className="min-h-[120px] bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity duration-300 flex items-center gap-2 rounded-md shadow-lg hover:shadow-primary/40" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Enviando Sua Missão..." : "Enviar Proposta"}
                  {!form.formState.isSubmitting && <Send size={18} />}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}

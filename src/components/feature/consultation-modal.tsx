
"use client";

import { useState, type ReactNode, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, CalendarIcon, Building, Globe, Target, CheckSquare, Rocket, Clock, Mail, User, Loader2 } from "lucide-react";
import { cn } from '@/lib/utils';
import { sendConsultationEmailAction } from '@/app/actions/send-consultation-email';
import { getBookedSlots } from '@/app/actions/schedule-manager';

const availableTimes = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
];

const consultationFormSchema = z.object({
  clientName: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  companyName: z.string().min(2, { message: "Nome da empresa deve ter pelo menos 2 caracteres." }),
  clientEmail: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  companyWebsite: z.string().url({ message: "Por favor, insira uma URL válida." }).optional().or(z.literal("")),
  mainChallenge: z.string().min(10, { message: "Descreva o desafio em pelo menos 10 caracteres." }).max(300, { message: "Máximo de 300 caracteres."}),
  targetAudience: z.string().min(5, { message: "Descreva o público-alvo em pelo menos 5 caracteres." }).max(200, { message: "Máximo de 200 caracteres."}),
  serviceLandingPage: z.boolean().optional(),
  serviceSEO: z.boolean().optional(),
  serviceMaintenance: z.boolean().optional(),
  preferredDate: z.date({ required_error: "Por favor, selecione uma data." }),
  preferredTime: z.string({ required_error: "Por favor, selecione um horário."}),
}).refine(data => data.serviceLandingPage || data.serviceSEO || data.serviceMaintenance, {
  message: "Selecione ao menos um serviço de interesse.",
  path: ["serviceLandingPage"],
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;

interface ConsultationModalProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConsultationModal({ children, open, onOpenChange }: ConsultationModalProps) {
  const { toast } = useToast();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [unavailableTimesForSelectedDate, setUnavailableTimesForSelectedDate] = useState<string[]>([]);

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      clientName: "",
      companyName: "",
      clientEmail: "",
      companyWebsite: "",
      mainChallenge: "",
      targetAudience: "",
      serviceLandingPage: false,
      serviceSEO: false,
      serviceMaintenance: false,
    },
  });

  const selectedDate = form.watch("preferredDate");

  useEffect(() => {
    async function fetchUnavailableTimes() {
      if (selectedDate) {
        setLoadingTimes(true);
        try {
          const dateStr = format(selectedDate, 'yyyy-MM-dd');
          const booked = await getBookedSlots(dateStr);
          setUnavailableTimesForSelectedDate(booked);
        } catch (error) {
          console.error("Erro ao buscar horários: ", error);
          setUnavailableTimesForSelectedDate([]); // Em caso de erro, assume todos disponíveis
          toast({
            title: "Erro ao carregar horários",
            description: "Não foi possível verificar os horários disponíveis. Tente novamente.",
            variant: "destructive",
          });
        } finally {
          setLoadingTimes(false);
        }
      } else {
        setUnavailableTimesForSelectedDate([]);
      }
    }
    fetchUnavailableTimes();
  }, [selectedDate, toast]);


  async function onSubmit(values: ConsultationFormValues) {
    form.control.disabled = true;
    setLoadingTimes(true); // Reutilizar para indicar processamento geral

    try {
      // Verificar novamente se o slot está disponível antes de enviar
      const dateStr = format(values.preferredDate, 'yyyy-MM-dd');
      const currentBookedSlots = await getBookedSlots(dateStr);
      if (currentBookedSlots.includes(values.preferredTime)) {
        toast({
          title: "Horário Indisponível",
          description: "Este horário foi reservado enquanto você preenchia o formulário. Por favor, escolha outro.",
          variant: "destructive",
        });
        setUnavailableTimesForSelectedDate(currentBookedSlots); // Atualiza a lista de indisponíveis
        form.control.disabled = false;
        setLoadingTimes(false);
        return;
      }

      const result = await sendConsultationEmailAction(values);
      if (result.success) {
        toast({
          title: "Agendamento Solicitado!",
          description: result.message,
          variant: "default",
        });
        form.reset();
        setUnavailableTimesForSelectedDate([]); // Limpa após sucesso
        onOpenChange(false);
      } else {
        toast({
          title: "Erro no Agendamento",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting consultation:", error);
      toast({
        title: "Erro Inesperado",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
        form.control.disabled = false;
        setLoadingTimes(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-4 bg-card/80 rounded-t-lg">
          <DialogTitle className="text-2xl font-headline gradient-text-animated flex items-center">
            <Briefcase className="mr-3 h-7 w-7 text-primary" />
            Agende sua Consultoria Estratégica Gratuita
          </DialogTitle>
          <DialogDescription className="text-foreground/70">
            Preencha o formulário abaixo para entendermos suas necessidades e agendarmos um horário.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-foreground/90"><User className="mr-2 h-4 w-4 text-primary" />Seu Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome Completo" {...field} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-foreground/90"><Mail className="mr-2 h-4 w-4 text-primary" />Seu E-mail para Contato</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu.email@exemplo.com" {...field} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-foreground/90"><Building className="mr-2 h-4 w-4 text-primary" />Nome da Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Sua Empresa Inc." {...field} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-foreground/90"><Globe className="mr-2 h-4 w-4 text-primary" />Website da Empresa (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://suaempresa.com.br" {...field} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mainChallenge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-foreground/90"><Rocket className="mr-2 h-4 w-4 text-primary" />Principal Desafio/Objetivo</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ex: Aumentar leads, melhorar conversões, nova presença online..." {...field} className="min-h-[80px] bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-foreground/90"><Target className="mr-2 h-4 w-4 text-primary" />Público-Alvo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Pequenas empresas de tecnologia, profissionais liberais..." {...field} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="flex items-center text-foreground/90"><CheckSquare className="mr-2 h-4 w-4 text-primary" />Serviços de Interesse</FormLabel>
              <div className="space-y-2 pt-1">
                {[
                  { id: "serviceLandingPage", label: "Criação de Landing Pages de Alta Conversão" },
                  { id: "serviceSEO", label: "Otimização SEO para Melhor Visibilidade" },
                  { id: "serviceMaintenance", label: "Manutenção Contínua e Suporte Técnico" },
                ].map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={item.id as keyof ConsultationFormValues}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value as boolean | undefined}
                            onCheckedChange={field.onChange}
                            className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-foreground/80">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
               <FormMessage>{form.formState.errors.serviceLandingPage?.message}</FormMessage>
            </FormItem>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center text-foreground/90"><CalendarIcon className="mr-2 h-4 w-4 text-primary" />Data Preferida</FormLabel>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 hover:bg-accent/50 focus:border-primary",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Escolha uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date: Date | undefined) => {
                             if (date) {
                                field.onChange(date);
                                // Resetar horário selecionado ao mudar a data
                                form.setValue('preferredTime', ''); 
                             }
                             setCalendarOpen(false); 
                          }}
                          disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) }
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-foreground/90">
                      <Clock className="mr-2 h-4 w-4 text-primary" />
                      Horário Preferido
                      {loadingTimes && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value} // Controlar valor para reset
                      disabled={!selectedDate || loadingTimes}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-input text-foreground placeholder:text-muted-foreground rounded-md border-border/50 focus:border-primary">
                          <SelectValue placeholder={!selectedDate ? "Selecione uma data primeiro" : (loadingTimes ? "Carregando horários..." : "Selecione um horário")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover text-popover-foreground">
                        {availableTimes.map(time => (
                          <SelectItem 
                            key={time} 
                            value={time}
                            disabled={unavailableTimesForSelectedDate.includes(time)}
                          >
                            {time}{unavailableTimesForSelectedDate.includes(time) ? " (Indisponível)" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="w-full sm:w-auto" disabled={form.formState.isSubmitting || loadingTimes}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button 
                type="submit" 
                className="w-full sm:w-auto gradient-bg text-primary-foreground font-semibold hover:opacity-90" 
                disabled={form.formState.isSubmitting || loadingTimes}
              >
                {(form.formState.isSubmitting || loadingTimes) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Solicitar Consultoria"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

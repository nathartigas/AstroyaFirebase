
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock, PlusCircle, Trash2, Ban, ListChecks, Loader2 } from "lucide-react";
import { updateDynamicAvailabilityRule } from "@/app/actions/schedule-manager";
import type { PredefinedAvailabilityRules } from "@/app/actions/schedule-manager";

const ruleTypeSchema = z.enum(["UNAVAILABLE", "SPECIFIC_TIMES"]);

const availabilityFormSchema = z.object({
  date: z.date({ required_error: "Data é obrigatória." }),
  ruleType: ruleTypeSchema,
  specificTimes: z.array(z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato HH:MM inválido"))
    .optional()
    .refine((times, ctx) => {
      if (ctx.parent.ruleType === "SPECIFIC_TIMES" && (!times || times.length === 0)) {
        return false;
      }
      return true;
    }, { message: "Pelo menos um horário específico é necessário." }),
});

type AvailabilityFormValues = z.infer<typeof availabilityFormSchema>;

interface AvailabilityFormProps {
  onRuleAddedOrUpdated: () => void;
  initialRule?: { dateISO: string; rule: string[] | 'UNAVAILABLE' };
}

const BASE_AVAILABLE_TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

export function AvailabilityForm({ onRuleAddedOrUpdated, initialRule }: AvailabilityFormProps) {
  const { toast } = useToast();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [currentSpecificTimes, setCurrentSpecificTimes] = useState<string[]>(
    initialRule && Array.isArray(initialRule.rule) ? initialRule.rule : []
  );
  const [newTimeInput, setNewTimeInput] = useState("");

  const form = useForm<AvailabilityFormValues>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      date: initialRule ? parseISO(initialRule.dateISO) : new Date(),
      ruleType: initialRule ? (initialRule.rule === 'UNAVAILABLE' ? 'UNAVAILABLE' : 'SPECIFIC_TIMES') : "UNAVAILABLE",
      specificTimes: initialRule && Array.isArray(initialRule.rule) ? initialRule.rule : [],
    },
  });

  const ruleType = form.watch("ruleType");

  const handleAddTime = () => {
    if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(newTimeInput) && !currentSpecificTimes.includes(newTimeInput)) {
      const updatedTimes = [...currentSpecificTimes, newTimeInput].sort();
      setCurrentSpecificTimes(updatedTimes);
      form.setValue("specificTimes", updatedTimes, { shouldValidate: true });
      setNewTimeInput("");
    } else {
      toast({ title: "Horário Inválido", description: "Formato HH:MM ou horário já adicionado.", variant: "destructive" });
    }
  };

  const handleRemoveTime = (timeToRemove: string) => {
    const updatedTimes = currentSpecificTimes.filter(time => time !== timeToRemove);
    setCurrentSpecificTimes(updatedTimes);
    form.setValue("specificTimes", updatedTimes, { shouldValidate: true });
  };

  async function onSubmit(values: AvailabilityFormValues) {
    setIsLoading(true);
    const dateISO = format(values.date, "yyyy-MM-dd");
    let ruleToSend: string[] | 'UNAVAILABLE';

    if (values.ruleType === "UNAVAILABLE") {
      ruleToSend = "UNAVAILABLE";
    } else {
      ruleToSend = values.specificTimes || [];
      if (ruleToSend.length === 0) {
        toast({ title: "Erro", description: "Se 'Horários Específicos' é selecionado, adicione pelo menos um horário.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
    }
    
    const result = await updateDynamicAvailabilityRule(dateISO, ruleToSend);

    if (result.success) {
      toast({ title: "Sucesso", description: result.message, variant: "default" });
      onRuleAddedOrUpdated();
      form.reset({
        date: new Date(),
        ruleType: "UNAVAILABLE",
        specificTimes: []
      });
      setCurrentSpecificTimes([]);
    } else {
      toast({ title: "Erro", description: result.message, variant: "destructive" });
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 border rounded-lg shadow-md bg-card">
      <h3 className="text-xl font-semibold text-primary">Adicionar/Editar Regra de Disponibilidade</h3>
      
      <Controller
        name="date"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <Label htmlFor="date-picker" className="flex items-center"><CalendarIcon className="mr-2 h-4 w-4" /> Data</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="date-picker"
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                >
                  {field.value ? format(field.value, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    if (date) field.onChange(date);
                    setCalendarOpen(false);
                  }}
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
            {fieldState.error && <p className="text-sm text-destructive">{fieldState.error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="ruleType"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <Label htmlFor="ruleType-select" className="flex items-center">
                {field.value === 'UNAVAILABLE' ? <Ban className="mr-2 h-4 w-4" /> : <ListChecks className="mr-2 h-4 w-4" />}
                Tipo de Regra
            </Label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger id="ruleType-select">
                <SelectValue placeholder="Selecione o tipo de regra" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UNAVAILABLE">Dia Inteiro Indisponível</SelectItem>
                <SelectItem value="SPECIFIC_TIMES">Horários Específicos Disponíveis</SelectItem>
              </SelectContent>
            </Select>
            {fieldState.error && <p className="text-sm text-destructive">{fieldState.error.message}</p>}
          </div>
        )}
      />

      {ruleType === "SPECIFIC_TIMES" && (
        <div className="space-y-4 p-4 border rounded-md bg-background/50">
            <Label className="flex items-center text-base"><Clock className="mr-2 h-5 w-5" />Horários Específicos (HH:MM)</Label>
            <div className="flex gap-2 items-center">
                <Input
                type="time"
                value={newTimeInput}
                onChange={(e) => setNewTimeInput(e.target.value)}
                className="w-auto"
                />
                <Button type="button" onClick={handleAddTime} size="sm" variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4"/> Adicionar Horário
                </Button>
            </div>
            {form.formState.errors.specificTimes && <p className="text-sm text-destructive">{form.formState.errors.specificTimes.message}</p>}
            
            {currentSpecificTimes.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium">Horários adicionados:</p>
                    <ul className="flex flex-wrap gap-2">
                    {currentSpecificTimes.map(time => (
                        <li key={time} className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-sm">
                        {time}
                        <Button type="button" onClick={() => handleRemoveTime(time)} variant="ghost" size="icon" className="h-5 w-5">
                            <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                        </li>
                    ))}
                    </ul>
                </div>
            )}
            {currentSpecificTimes.length === 0 && <p className="text-sm text-muted-foreground">Nenhum horário específico adicionado.</p>}
        </div>
      )}

      <Button type="submit" className="w-full gradient-bg text-primary-foreground" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (initialRule ? "Atualizar Regra" : "Salvar Regra")}
      </Button>
    </form>
  );
}

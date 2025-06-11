
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Loader2, CalendarX2, CalendarCheck2 } from "lucide-react";
import type { PredefinedAvailabilityRules } from "@/app/actions/schedule-manager";
import { deleteDynamicAvailabilityRule } from "@/app/actions/schedule-manager";
import { useState } from "react";

interface AvailabilityListProps {
  rules: PredefinedAvailabilityRules;
  onRuleDeleted: () => void;
  onEditRule: (dateISO: string, rule: string[] | 'UNAVAILABLE') => void;
  isLoading: boolean;
}

export function AvailabilityList({ rules, onRuleDeleted, onEditRule, isLoading }: AvailabilityListProps) {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (dateISO: string) => {
    setDeletingId(dateISO);
    const result = await deleteDynamicAvailabilityRule(dateISO);
    if (result.success) {
      toast({ title: "Sucesso", description: result.message });
      onRuleDeleted();
    } else {
      toast({ title: "Erro", description: result.message, variant: "destructive" });
    }
    setDeletingId(null);
  };

  const sortedDates = Object.keys(rules).sort((a,b) => new Date(a).getTime() - new Date(b).getTime());

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Carregando regras...</p>
      </div>
    );
  }

  if (sortedDates.length === 0) {
    return <p className="text-muted-foreground mt-4 text-center">Nenhuma regra de disponibilidade dinâmica definida.</p>;
  }

  return (
    <div className="space-y-4">
      {sortedDates.map((dateISO) => {
        const rule = rules[dateISO];
        const isUnavailable = rule === 'UNAVAILABLE';
        return (
          <Card key={dateISO} className="bg-card/70">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                {isUnavailable ? <CalendarX2 className="mr-2 h-5 w-5 text-destructive" /> : <CalendarCheck2 className="mr-2 h-5 w-5 text-green-500" />}
                {dateISO}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEditRule(dateISO, rule)} disabled={deletingId === dateISO}>
                  <Edit className="mr-1 h-4 w-4" /> Editar
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(dateISO)} disabled={deletingId === dateISO}>
                  {deletingId === dateISO ? <Loader2 className="mr-1 h-4 w-4 animate-spin"/> : <Trash2 className="mr-1 h-4 w-4" />}
                  Remover
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isUnavailable ? (
                <p className="text-sm text-destructive">Dia inteiro indisponível.</p>
              ) : (
                <div className="text-sm text-foreground/80">
                  <p className="font-medium">Horários disponíveis específicos:</p>
                  <ul className="list-disc list-inside pl-1">
                    {(rule as string[]).map(time => <li key={time}>{time}</li>)}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

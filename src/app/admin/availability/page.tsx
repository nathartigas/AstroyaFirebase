
"use client";

import { useState, useEffect, useCallback } from "react";
import { AvailabilityForm } from "@/components/admin/availability-form";
import { AvailabilityList } from "@/components/admin/availability-list";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getDynamicAvailabilityRules, resetAllDataForPrototyping } from "@/app/actions/schedule-manager";
import type { PredefinedAvailabilityRules } from "@/app/actions/schedule-manager";
import { RefreshCcw, AlertTriangle } from "lucide-react";

export default function AdminAvailabilityPage() {
  const [rules, setRules] = useState<PredefinedAvailabilityRules>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [editingRule, setEditingRule] = useState<{ dateISO: string; rule: string[] | 'UNAVAILABLE' } | undefined>(undefined);
  const { toast } = useToast();

  const fetchRules = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentRules = await getDynamicAvailabilityRules();
      setRules(currentRules);
    } catch (error) {
      console.error("Erro ao buscar regras:", error);
      toast({ title: "Erro", description: "Não foi possível carregar as regras de disponibilidade.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const handleRuleChange = () => {
    fetchRules(); // Recarrega as regras após uma adição/atualização/deleção
    setEditingRule(undefined); // Limpa o estado de edição
  };

  const handleEditRule = (dateISO: string, rule: string[] | 'UNAVAILABLE') => {
    setEditingRule({ dateISO, rule });
    // Scroll to form or open in a modal might be good UX here
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetRules = async () => {
    setIsResetting(true);
    if(confirm("Tem certeza que deseja resetar TODAS as regras dinâmicas e horários agendados para o estado inicial (definido em availability-rules.json)? Esta ação não pode ser desfeita.")) {
        try {
            await resetAllDataForPrototyping();
            toast({ title: "Sucesso", description: "Regras e agendamentos resetados para o estado inicial do JSON." });
            fetchRules();
        } catch (error) {
            console.error("Erro ao resetar regras:", error);
            toast({ title: "Erro", description: "Não foi possível resetar as regras.", variant: "destructive" });
        }
    }
    setIsResetting(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-background">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary gradient-text-animated">Gerenciamento de Disponibilidade (Admin Dinâmico)</h1>
        <p className="text-muted-foreground mt-2">
          Configure dias indisponíveis ou horários específicos de atendimento.
        </p>
         <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-md text-destructive flex items-start">
          <AlertTriangle className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h2 className="font-semibold">Atenção: Modo de Prototipagem</h2>
            <p className="text-sm">
              As regras configuradas aqui são armazenadas <strong>em memória</strong> e serão perdidas se o servidor reiniciar.
              O arquivo <code>src/config/availability-rules.json</code> define o estado inicial das regras.
              Esta interface é para demonstração e não possui persistência de dados real ou autenticação.
            </p>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-1">
          <AvailabilityForm key={editingRule ? editingRule.dateISO : 'new'} onRuleAddedOrUpdated={handleRuleChange} initialRule={editingRule} />
           {editingRule && (
            <Button variant="outline" onClick={() => setEditingRule(undefined)} className="mt-4 w-full">
              Cancelar Edição / Adicionar Nova Regra
            </Button>
          )}
        </section>

        <section className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Regras Atuais</h2>
            <Button onClick={handleResetRules} variant="outline" size="sm" disabled={isResetting || isLoading} className="border-destructive text-destructive hover:bg-destructive/10">
              {isResetting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <RefreshCcw className="mr-2 h-4 w-4" />}
              Resetar para JSON Inicial
            </Button>
          </div>
          <AvailabilityList rules={rules} onRuleDeleted={handleRuleChange} onEditRule={handleEditRule} isLoading={isLoading} />
        </section>
      </main>
    </div>
  );
}


'use server';

import initialAvailabilityRulesData from '@/config/availability-rules.json';

const BASE_AVAILABLE_TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

export interface PredefinedAvailabilityRules {
  [dateISO: string]: string[] | 'UNAVAILABLE';
}

// Armazenamento em memória para regras dinâmicas
let dynamicAvailabilityRules: PredefinedAvailabilityRules = {};
let bookedSlots: Record<string, string[]> = {}; // Simulação de armazenamento em memória para horários agendados

// Função para inicializar/resetar regras dinâmicas a partir do arquivo JSON
function initializeRules() {
  // Deep copy para evitar modificar o objeto importado diretamente
  dynamicAvailabilityRules = JSON.parse(JSON.stringify((initialAvailabilityRulesData as any).PREDEFINED_AVAILABILITY_RULES || {}));
  // console.log('[ScheduleManager] Initialized dynamic rules from JSON:', dynamicAvailabilityRules);
}

// Inicializa as regras quando o módulo é carregado (quando o servidor inicia)
initializeRules();


export async function getDynamicAvailabilityRules(): Promise<PredefinedAvailabilityRules> {
  return JSON.parse(JSON.stringify(dynamicAvailabilityRules)); // Retorna uma cópia
}

export async function updateDynamicAvailabilityRule(dateISO: string, rule: string[] | 'UNAVAILABLE'): Promise<{ success: boolean; message: string }> {
  if (!dateISO || !rule) {
    return { success: false, message: 'Data e regra são obrigatórias.' };
  }
  // Validação simples da data (poderia ser mais robusta)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateISO)) {
      return { success: false, message: 'Formato de data inválido. Use YYYY-MM-DD.' };
  }

  dynamicAvailabilityRules[dateISO] = rule;
  // console.log(`[ScheduleManager] Updated rule for ${dateISO}. New rules:`, dynamicAvailabilityRules);
  return { success: true, message: `Regra para ${dateISO} atualizada.` };
}

export async function deleteDynamicAvailabilityRule(dateISO: string): Promise<{ success: boolean; message: string }> {
  if (dynamicAvailabilityRules.hasOwnProperty(dateISO)) {
    delete dynamicAvailabilityRules[dateISO];
    // console.log(`[ScheduleManager] Deleted rule for ${dateISO}. New rules:`, dynamicAvailabilityRules);
    return { success: true, message: `Regra para ${dateISO} removida.` };
  }
  return { success: false, message: `Nenhuma regra encontrada para ${dateISO}.` };
}

export async function getUnavailableSlotsForDate(dateISO: string): Promise<string[]> {
  const alreadyBookedForDate = bookedSlots[dateISO] || [];
  const ruleForDate = dynamicAvailabilityRules[dateISO]; // Usa as regras dinâmicas

  let unavailableTimes: string[] = [];

  if (ruleForDate === 'UNAVAILABLE') {
    unavailableTimes = [...BASE_AVAILABLE_TIMES];
  } else if (Array.isArray(ruleForDate)) {
    unavailableTimes = BASE_AVAILABLE_TIMES.filter(time => !ruleForDate.includes(time));
    const specificButBooked = ruleForDate.filter(time => alreadyBookedForDate.includes(time));
    unavailableTimes = Array.from(new Set([...unavailableTimes, ...specificButBooked]));
  } else {
    unavailableTimes = [...alreadyBookedForDate];
  }
  // console.log(`[ScheduleManager] Dynamic Unavailable slots for ${dateISO}:`, unavailableTimes);
  return unavailableTimes;
}

export async function attemptToBookSlot(dateISO: string, time: string): Promise<boolean> {
  const unavailableSlots = await getUnavailableSlotsForDate(dateISO);
  if (unavailableSlots.includes(time)) {
    // console.log(`[ScheduleManager] Slot ${dateISO} ${time} is unavailable (dynamic rule or already booked).`);
    return false;
  }

  if (!bookedSlots[dateISO]) {
    bookedSlots[dateISO] = [];
  }
  if (bookedSlots[dateISO].includes(time)) {
     return false; 
  }

  bookedSlots[dateISO].push(time);
  bookedSlots[dateISO].sort();
  // console.log(`[ScheduleManager] Slot ${dateISO} ${time} booked successfully. Current slots for date:`, bookedSlots[dateISO]);
  return true;
}

export async function resetAllDataForPrototyping(): Promise<void> {
  // console.log('[ScheduleManager] Resetting all booked slots and dynamic rules to initial JSON state.');
  bookedSlots = {};
  initializeRules(); // Re-inicializa as regras dinâmicas com base no JSON
}

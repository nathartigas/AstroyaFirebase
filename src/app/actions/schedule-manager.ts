
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
  try {
    const rulesFromFile = (initialAvailabilityRulesData as any).PREDEFINED_AVAILABILITY_RULES || {};
    dynamicAvailabilityRules = JSON.parse(JSON.stringify(rulesFromFile));
    console.log('[ScheduleManager] Initialized/Reset dynamic rules. Current dynamicAvailabilityRules:', JSON.stringify(dynamicAvailabilityRules));
  } catch (error) {
    console.error('[ScheduleManager] Error parsing availability-rules.json:', error);
    dynamicAvailabilityRules = {}; // Fallback para objeto vazio em caso de erro
  }
  console.log('[ScheduleManager] State after initializeRules. bookedSlots:', JSON.stringify(bookedSlots));
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
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateISO)) {
      return { success: false, message: 'Formato de data inválido. Use YYYY-MM-DD.' };
  }

  dynamicAvailabilityRules[dateISO] = rule;
  console.log(`[ScheduleManager] Updated dynamic rule for ${dateISO}. New dynamicAvailabilityRules:`, JSON.stringify(dynamicAvailabilityRules));
  return { success: true, message: `Regra para ${dateISO} atualizada.` };
}

export async function deleteDynamicAvailabilityRule(dateISO: string): Promise<{ success: boolean; message: string }> {
  if (dynamicAvailabilityRules.hasOwnProperty(dateISO)) {
    delete dynamicAvailabilityRules[dateISO];
    console.log(`[ScheduleManager] Deleted dynamic rule for ${dateISO}. New dynamicAvailabilityRules:`, JSON.stringify(dynamicAvailabilityRules));
    return { success: true, message: `Regra para ${dateISO} removida.` };
  }
  return { success: false, message: `Nenhuma regra encontrada para ${dateISO}.` };
}

export async function getUnavailableSlotsForDate(dateISO: string): Promise<string[]> {
  console.log(`[ScheduleManager] getUnavailableSlotsForDate called for ${dateISO}.`);
  console.log(`[ScheduleManager] Current dynamicAvailabilityRules at start of getUnavailable:`, JSON.stringify(dynamicAvailabilityRules));
  console.log(`[ScheduleManager] Current bookedSlots at start of getUnavailable:`, JSON.stringify(bookedSlots));

  const alreadyBookedForDate = bookedSlots[dateISO] || [];
  const ruleForDate = dynamicAvailabilityRules[dateISO];

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
  console.log(`[ScheduleManager] Returning unavailable slots for ${dateISO}:`, JSON.stringify(unavailableTimes));
  return unavailableTimes;
}

export async function attemptToBookSlot(dateISO: string, time: string): Promise<boolean> {
  console.log(`[ScheduleManager] attemptToBookSlot called for ${dateISO} at ${time}.`);
  const unavailableSlots = await getUnavailableSlotsForDate(dateISO);
  
  if (unavailableSlots.includes(time)) {
    console.log(`[ScheduleManager] Slot ${dateISO} ${time} is ALREADY UNAVAILABLE based on getUnavailableSlotsForDate. Booking failed.`);
    return false;
  }

  // Se chegou aqui, o slot está teoricamente disponível. Vamos registrar.
  if (!bookedSlots[dateISO]) {
    bookedSlots[dateISO] = [];
  }
  // Adicionalmente, verificar explicitamente bookedSlots para evitar duplicidade, embora getUnavailableSlotsForDate já devesse cobrir.
  if (bookedSlots[dateISO].includes(time)) {
     console.log(`[ScheduleManager] Slot ${dateISO} ${time} was ALREADY in bookedSlots (direct check). Booking failed.`);
     return false; 
  }

  bookedSlots[dateISO].push(time);
  bookedSlots[dateISO].sort();
  console.log(`[ScheduleManager] Slot ${dateISO} ${time} BOOKED successfully. Current bookedSlots:`, JSON.stringify(bookedSlots));
  return true;
}

export async function resetAllDataForPrototyping(): Promise<void> {
  console.log('[ScheduleManager] Resetting all data (bookedSlots and dynamic rules to initial JSON state).');
  bookedSlots = {};
  initializeRules(); // Re-inicializa as regras dinâmicas com base no JSON e loga o estado.
  console.log('[ScheduleManager] Reset complete. Current bookedSlots:', JSON.stringify(bookedSlots));
}

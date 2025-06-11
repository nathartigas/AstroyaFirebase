
'use server';

import availabilityRulesData from '@/config/availability-rules.json';

// Horários base de atendimento, se não houver regras específicas para o dia.
const BASE_AVAILABLE_TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

interface PredefinedAvailabilityRules {
  [dateISO: string]: string[] | 'UNAVAILABLE'; // 'UNAVAILABLE' para dia todo, string[] para horários específicos
}

// ##########################################################################
// ## AS REGRAS DE INDISPONIBILIDADE/DISPONIBILIDADE ESPECIAL               ##
// ## AGORA SÃO LIDAS DE src/config/availability-rules.json                ##
// ##########################################################################
const PREDEFINED_AVAILABILITY_RULES: PredefinedAvailabilityRules = (availabilityRulesData as any).PREDEFINED_AVAILABILITY_RULES || {};
// ##########################################################################

// Simulação de armazenamento em memória para horários agendados
// Formato: { 'YYYY-MM-DD': ['HH:mm', 'HH:mm', ...] }
let bookedSlots: Record<string, string[]> = {};

/**
 * Retorna uma lista de horários (HH:mm) que estão indisponíveis para uma data específica,
 * considerando regras predefinidas e agendamentos já feitos.
 * @param dateISO String da data no formato 'yyyy-MM-dd'.
 * @returns Promise<string[]> Uma lista de horários indisponíveis.
 */
export async function getUnavailableSlotsForDate(dateISO: string): Promise<string[]> {
  const alreadyBookedForDate = bookedSlots[dateISO] || [];
  const ruleForDate = PREDEFINED_AVAILABILITY_RULES[dateISO];

  let unavailableTimes: string[] = [];

  if (ruleForDate === 'UNAVAILABLE') {
    // Se o dia todo está predefinido como indisponível, todos os horários base são retornados como indisponíveis.
    unavailableTimes = [...BASE_AVAILABLE_TIMES];
  } else if (Array.isArray(ruleForDate)) {
    // Se há horários específicos predefinidos como os ÚNICOS disponíveis para o dia.
    // Todos os horários base que NÃO estão na lista de específicos são indisponíveis.
    unavailableTimes = BASE_AVAILABLE_TIMES.filter(time => !ruleForDate.includes(time));
    // Adiciona também os horários específicos que já foram efetivamente agendados.
    const specificButBooked = ruleForDate.filter(time => alreadyBookedForDate.includes(time));
    unavailableTimes = Array.from(new Set([...unavailableTimes, ...specificButBooked]));

  } else {
    // Se não há regra predefinida para a data, apenas os já agendados estão indisponíveis.
    unavailableTimes = [...alreadyBookedForDate];
  }
  // console.log(`[ScheduleManager] Unavailable slots for ${dateISO}:`, unavailableTimes);
  return unavailableTimes;
}

/**
 * Tenta reservar um horário para uma data específica.
 * Adiciona o horário à lista de slots reservados se não estiver ocupado.
 * @param dateISO String da data no formato 'yyyy-MM-dd'.
 * @param time String da hora no formato 'HH:mm'.
 * @returns Promise<boolean> True se o slot foi reservado com sucesso, false se já estava ocupado ou se as regras predefinidas o impedem.
 */
export async function attemptToBookSlot(dateISO: string, time: string): Promise<boolean> {
  const unavailableSlots = await getUnavailableSlotsForDate(dateISO);
  if (unavailableSlots.includes(time)) {
    // console.log(`[ScheduleManager] Slot ${dateISO} ${time} is unavailable (predefined or already booked).`);
    return false; // Slot indisponível por regra ou já ocupado
  }

  // Se chegou aqui, o slot está disponível segundo as regras e não está nos `bookedSlots` ainda.
  if (!bookedSlots[dateISO]) {
    bookedSlots[dateISO] = [];
  }
  // bookedSlots[dateISO] não deve conter `time` neste ponto, devido à verificação anterior com getUnavailableSlotsForDate.
  // Mas, como uma dupla checagem (especialmente se a lógica de getUnavailableSlotsForDate e attemptToBookSlot divergir no futuro):
  if (bookedSlots[dateISO].includes(time)) {
     // console.log(`[ScheduleManager] Slot ${dateISO} ${time} was booked concurrently.`);
     return false; 
  }

  bookedSlots[dateISO].push(time);
  bookedSlots[dateISO].sort(); // Manter ordenado para consistência, se necessário
  // console.log(`[ScheduleManager] Slot ${dateISO} ${time} booked successfully. Current slots for date:`, bookedSlots[dateISO]);
  // console.log(`[ScheduleManager] All booked slots:`, bookedSlots);
  return true; // Slot reservado com sucesso
}

/**
 * (Opcional - Para fins de teste/reset em desenvolvimento)
 * Limpa todos os horários reservados e as regras predefinidas (se elas fossem dinâmicas).
 */
export async function resetBookedSlots(): Promise<void> {
  // console.log('[ScheduleManager] Resetting all booked slots.');
  bookedSlots = {};
  // PREDEFINED_AVAILABILITY_RULES são lidas do JSON, então não são resetadas aqui.
}


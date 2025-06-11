
'use server';

// Simulação de armazenamento em memória para horários agendados
// Formato: { 'YYYY-MM-DD': ['HH:mm', 'HH:mm', ...] }
let bookedSlots: Record<string, string[]> = {};

/**
 * Retorna uma lista de horários (HH:mm) que já foram reservados para uma data específica.
 * @param dateISO String da data no formato 'yyyy-MM-dd'.
 * @returns Promise<string[]> Uma lista de horários ocupados.
 */
export async function getBookedSlots(dateISO: string): Promise<string[]> {
  // console.log(`[ScheduleManager] Getting booked slots for ${dateISO}:`, bookedSlots[dateISO] || []);
  return bookedSlots[dateISO] || [];
}

/**
 * Tenta reservar um horário para uma data específica.
 * Adiciona o horário à lista de slots reservados se não estiver ocupado.
 * @param dateISO String da data no formato 'yyyy-MM-dd'.
 * @param time String da hora no formato 'HH:mm'.
 * @returns Promise<boolean> True se o slot foi reservado com sucesso, false se já estava ocupado.
 */
export async function attemptToBookSlot(dateISO: string, time: string): Promise<boolean> {
  if (!bookedSlots[dateISO]) {
    bookedSlots[dateISO] = [];
  }
  if (bookedSlots[dateISO].includes(time)) {
    // console.log(`[ScheduleManager] Slot ${dateISO} ${time} already booked.`);
    return false; // Slot já ocupado
  }
  bookedSlots[dateISO].push(time);
  // console.log(`[ScheduleManager] Slot ${dateISO} ${time} booked successfully. Current slots:`, bookedSlots);
  return true; // Slot reservado com sucesso
}

/**
 * (Opcional - Para fins de teste/reset em desenvolvimento)
 * Limpa todos os horários reservados.
 */
export async function resetBookedSlots(): Promise<void> {
  // console.log('[ScheduleManager] Resetting all booked slots.');
  bookedSlots = {};
}

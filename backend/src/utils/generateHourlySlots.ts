function generateHourlySlots(startHour = 8, endHour = 20): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    const from = hour.toString().padStart(2, '0') + ':00';
    const to = (hour + 1).toString().padStart(2, '0') + ':00';
    slots.push(`${from} - ${to}`);
  }
  return slots;
}

export const slots = generateHourlySlots();

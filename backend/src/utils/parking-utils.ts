import { Reservation } from '@prisma/client';
import { DEFAULT_LOCALE, DEFAULT_TIME_ZONE } from './constants';
import { slots } from './generateHourlySlots';
import { AvailibiltyStatus } from 'src/parking-spots/dto/month-availability.dto';

function formatDate(date: Date): string {
  return date.toLocaleDateString(DEFAULT_LOCALE, {
    timeZone: DEFAULT_TIME_ZONE,
  });
}

function getMonthDates(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function determineAvailabilityStatus(
  date: Date,
  reservations: Reservation[],
  userId: string,
): AvailibiltyStatus {
  const dateStr = formatDate(date);

  const dayReservations = reservations.filter(
    (r) => formatDate(r.reservedDate) === dateStr,
  );

  const myReservation = dayReservations.some((r) => r.userId === userId);

  if (myReservation) return 'booked-by-me';
  if (dayReservations.length === slots.length) return 'unavailable';
  return 'available';
}
function normalizeDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export {
  normalizeDate,
  formatDate,
  getMonthDates,
  determineAvailabilityStatus,
};

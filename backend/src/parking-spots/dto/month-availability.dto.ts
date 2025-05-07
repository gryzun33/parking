export class MonthAvailabilityResponse {
  date: string;
  status: AvailibiltyStatus;
}

export type AvailibiltyStatus = 'available' | 'unavailable' | 'booked-by-me';

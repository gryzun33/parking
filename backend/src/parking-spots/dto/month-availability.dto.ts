import { ParkingSpot } from '@prisma/client';

export type AvailibiltyStatus = 'available' | 'unavailable' | 'booked-by-me';

export type DateInfo = {
  date: string;
  status: AvailibiltyStatus;
};

export type MonthAvailabilityResponse = {
  monthInfo: DateInfo[];
  parkingSpot: ParkingSpot;
};

export type ParkingSpot = {
  id: string;
  slug: string;
  location: string;
};

export type MonthAvailabilityResponse = {
  monthInfo: DateInfo[];
  parkingSpot: ParkingSpot;
};

export type DateInfo = {
  date: string;
  status: AvailibiltyStatus;
};

export type AvailibiltyStatus = 'available' | 'unavailable' | 'booked-by-me';

export type DayStatus = AvailibiltyStatus | 'past';

export type SlotInfo = {
  slotLabel: string;
  status: 'booked' | 'available';
  isMine: boolean;
};

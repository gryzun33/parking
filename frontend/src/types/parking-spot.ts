export type ParkingSpot = {
  id: string;
  slug: string;
  location: string;
};

export type ParkingSpotMonthParams = {
  slug: string;
  month: number;
  year: number;
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

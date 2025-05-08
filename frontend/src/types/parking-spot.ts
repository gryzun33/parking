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
  date: string;
  status: AvailibiltyStatus;
};

export type AvailibiltyStatus = 'available' | 'unavailable' | 'booked-by-me';

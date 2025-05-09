export type UserReservationResponse = {
  id: string;
  userId: string;
  parkingSpotId: string;
  reservedDate: string;
  reservedTime: string;
  status: string;
  spotSlug: string;
  location: string;
};

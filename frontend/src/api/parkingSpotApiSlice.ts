import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';
import type {
  MonthAvailabilityResponse,
  ParkingSpot,
  ParkingSpotMonthParams,
} from '@/types/parking-spot';

export const parkingSpotApiSlice = createApi({
  reducerPath: 'parkingSpotApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getParkingSpots: builder.query<ParkingSpot[], void>({
      query: () => '/parking-spots',
    }),
    getParkingSpotMonthInfo: builder.query<
      MonthAvailabilityResponse,
      ParkingSpotMonthParams
    >({
      query: ({ slug, month, year }) =>
        `/parking-spots/${slug}/available-times/month?year=${year}&month=${month}`,
    }),
  }),
});

export const { useGetParkingSpotsQuery, useGetParkingSpotMonthInfoQuery } =
  parkingSpotApiSlice;

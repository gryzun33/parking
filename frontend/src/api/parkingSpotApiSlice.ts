import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './api';
import type {
  MonthAvailabilityResponse,
  ParkingSpot,
  ParkingSpotMonthParams,
} from '@/types/parking-spot';

export const parkingSpotApiSlice = createApi({
  reducerPath: 'parkingSpotApi',
  baseQuery: baseQuery,
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

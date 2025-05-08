import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';
import type {
  MonthAvailabilityResponse,
  ParkingSpot,
  SlotInfo,
} from '@/types/parking-spot';

export const parkingSpotApiSlice = createApi({
  reducerPath: 'parkingSpotApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getParkingSpots: builder.query<ParkingSpot[], void>({
      query: () => '/parking-spots',
    }),
    getParkingSpotMonthInfo: builder.query<MonthAvailabilityResponse, string>({
      query: (slug) => `/parking-spots/${slug}/available-times/month`,
    }),

    getParkingSpotDayInfo: builder.query<
      SlotInfo[],
      { slug: string; dateStr: string }
    >({
      query: ({ slug, dateStr }) => ({
        url: `/parking-spots/${slug}/available-times/day?date=${dateStr}`,
      }),
    }),
  }),
});

export const {
  useGetParkingSpotsQuery,
  useGetParkingSpotMonthInfoQuery,
  useGetParkingSpotDayInfoQuery,
} = parkingSpotApiSlice;

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';
import type {
  MonthAvailabilityResponse,
  ParkingSpot,
  SlotInfo,
} from '@/types/parking-spot';
import { setSelectedSpotId } from '@/store/slices/parkingSpotSlice';

export const parkingSpotApiSlice = createApi({
  reducerPath: 'parkingSpotApi',
  tagTypes: ['ParkingSpot'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getParkingSpots: builder.query<ParkingSpot[], void>({
      query: () => '/parking-spots',
    }),
    getParkingSpotMonthInfo: builder.query<MonthAvailabilityResponse, string>({
      query: (slug) => `/parking-spots/${slug}/available-times/month`,

      onQueryStarted: async (_, api) => {
        const { dispatch, queryFulfilled } = api;
        try {
          const { data } = await queryFulfilled;
          const { parkingSpot } = data;
          dispatch(setSelectedSpotId(parkingSpot.id));
        } catch (error) {
          console.error('Login rtk failed:', error);
        }
      },
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

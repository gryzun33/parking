import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';
import type { CreateReservationDto } from '@/types/reservations';
import { parkingSpotApiSlice } from './parkingSpotApiSlice';

export const reservationApiSlice = createApi({
  reducerPath: 'reservationApi',
  tagTypes: ['Reservation'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createReservation: builder.mutation<void, CreateReservationDto>({
      query: (body) => ({
        url: '/reservations',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, api) => {
        const { dispatch, queryFulfilled } = api;
        try {
          await queryFulfilled;
          dispatch(parkingSpotApiSlice.util.resetApiState());
        } catch (error) {
          console.error('Error during creating reservation:', error);
        }
      },
    }),
  }),
});

export const { useCreateReservationMutation } = reservationApiSlice;

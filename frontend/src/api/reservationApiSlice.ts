import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';
import type {
  CreateReservationDto,
  UserReservationResponse,
} from '@/types/reservations';
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
      invalidatesTags: ['Reservation'],
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

    getUserReservations: builder.query<UserReservationResponse[], void>({
      query: () => '/reservations/me',
      providesTags: ['Reservation'],
    }),
  }),
});

export const { useCreateReservationMutation, useGetUserReservationsQuery } =
  reservationApiSlice;

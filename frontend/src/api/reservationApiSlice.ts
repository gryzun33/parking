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
          dispatch(parkingSpotApiSlice.util.resetApiState());
        }
      },
    }),

    getUserReservations: builder.query<UserReservationResponse[], void>({
      query: () => '/reservations/me',
      providesTags: ['Reservation'],
    }),

    cancelReservation: builder.mutation<void, { reservationId: string }>({
      query: ({ reservationId }) => ({
        url: `/reservations/${reservationId}`,
        method: 'PATCH',
        body: { status: 'cancelled' },
      }),
      invalidatesTags: ['Reservation'],
      onQueryStarted: async (_, api) => {
        const { dispatch, queryFulfilled } = api;
        try {
          await queryFulfilled;
          dispatch(parkingSpotApiSlice.util.resetApiState());
        } catch (error) {
          console.error('Error during cancelling reservation:', error);
        }
      },
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useGetUserReservationsQuery,
  useCancelReservationMutation,
} = reservationApiSlice;

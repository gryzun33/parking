import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';
import type { CreateReservationDto } from '@/types/reservations';

export const reservationApiSlice = createApi({
  reducerPath: 'reservationApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createReservation: builder.mutation<void, CreateReservationDto>({
      query: (body) => ({
        url: '/reservations',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateReservationMutation } = reservationApiSlice;

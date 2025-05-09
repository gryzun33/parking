import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './api';
import { login, logout } from '../store/slices/userSlice';
import type { AuthFormData } from '@/validators/authSchema';
import { parkingSpotApiSlice } from './parkingSpotApiSlice';
import { reservationApiSlice } from './reservationApiSlice';

export const authApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<void, AuthFormData>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),

    login: builder.mutation<void, AuthFormData>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (_, api) => {
        const { dispatch, queryFulfilled } = api;
        try {
          await queryFulfilled;
          dispatch(login());
        } catch (error) {
          console.error('Login rtk failed:', error);
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),

      onQueryStarted: async (_, api) => {
        const { dispatch, queryFulfilled } = api;
        try {
          await queryFulfilled;
          dispatch(logout());
          dispatch(parkingSpotApiSlice.util.resetApiState());
          dispatch(reservationApiSlice.util.resetApiState());
        } catch (err) {
          console.error('Logout failed:', err);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApiSlice;

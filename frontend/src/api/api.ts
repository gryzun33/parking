import { logout } from '@/store/slices/userSlice';
import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000',
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

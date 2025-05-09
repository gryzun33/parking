import { configureStore } from '@reduxjs/toolkit';
import persistedUserReducer from './slices/userSlice';
import parkingSpotReducer from './slices/parkingSpotSlice';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { authApiSlice } from '@/api/authApiSlice';
import { parkingSpotApiSlice } from '@/api/parkingSpotApiSlice';
import { reservationApiSlice } from '@/api/reservationApiSlice';

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    parkingSpot: parkingSpotReducer,
    [parkingSpotApiSlice.reducerPath]: parkingSpotApiSlice.reducer,
    [reservationApiSlice.reducerPath]: reservationApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApiSlice.middleware,
      parkingSpotApiSlice.middleware,
      reservationApiSlice.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

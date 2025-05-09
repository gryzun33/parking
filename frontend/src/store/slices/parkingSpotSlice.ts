import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

interface ParkingSpotState {
  selectedSpotId: string;
}

const initialState: ParkingSpotState = {
  selectedSpotId: '',
};

const parkingSpotSlice = createSlice({
  name: 'parkingSpot',
  initialState,
  reducers: {
    setSelectedSpotId(state, action: PayloadAction<string>) {
      state.selectedSpotId = action.payload;
    },
    clearSelectedSpotId(state) {
      state.selectedSpotId = '';
    },
  },
});

const persistConfig = {
  key: 'parkingSpot',
  storage,
  whitelist: ['selectedSpotId'],
};

export const { setSelectedSpotId, clearSelectedSpotId } =
  parkingSpotSlice.actions;

const persistedParkingSpotReducer = persistReducer(
  persistConfig,
  parkingSpotSlice.reducer
);

export default persistedParkingSpotReducer;

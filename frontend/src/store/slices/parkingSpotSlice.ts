import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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

export const { setSelectedSpotId, clearSelectedSpotId } =
  parkingSpotSlice.actions;

export default parkingSpotSlice.reducer;

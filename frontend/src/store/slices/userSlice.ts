import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

interface UserState {
  isLogin: boolean;
}

const initialState: UserState = {
  isLogin: false,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isLogin'],
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);
export const { login, logout } = userSlice.actions;
export default persistedUserReducer;

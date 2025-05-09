import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import type { User } from '@/types/user';

interface UserState {
  isLogin: boolean;
  user: User;
}

const initialState: UserState = {
  isLogin: false,
  user: {
    id: '',
    email: '',
  },
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = { id: '', email: '' };
    },
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isLogin', 'user'],
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);
export const { login, logout } = userSlice.actions;
export default persistedUserReducer;

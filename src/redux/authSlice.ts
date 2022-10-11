import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from './store';
import { checkUser } from '../api-Service';
import { emailPassword } from '../values/customTypes';

const initialState = {
  isAuthenticated: false,
  userID: '',
};

export const loginUser = createAsyncThunk(
  'authentication/checkUser',
  async (payload: emailPassword) => {
    const response = await checkUser(payload);
    return response;
  }
);

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.userID = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userID = '';
    },
  },
});

export const selectAuth = (state: RootState) => state.authentication;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

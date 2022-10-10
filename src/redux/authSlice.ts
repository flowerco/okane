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
      // add JWT authenticaiton here otherwise return empty state
      state.isAuthenticated = true;
      state.userID = action.payload;
    },
    logout: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.userID = '';
    },
    register: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.userID = action.payload;
    },
  },
});

export const selectAuth = (state: RootState) => state.authentication;

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;

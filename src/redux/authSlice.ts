import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from './store';
import { verifyUser } from '../api/LoginService';
import { emailPassword } from '../values/customTypes';

const initialState = {
  isAuthenticated: false,
  userID: '',
  status: '',
};

export const loginUser = createAsyncThunk(
  'authentication/loginUser',
  async (payload: emailPassword) => {
    const response = await verifyUser(payload.email, payload.password);
    return response as string;
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
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.userID = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error);
        // state.error = action.error.message || undefined;
      });
  },
});

export const selectAuth = (state: RootState) => state.authentication;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

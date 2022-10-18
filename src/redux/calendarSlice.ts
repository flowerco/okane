import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSubscriptionTransactions } from '../api/CalendarService';

import { CalendarState, SubscriptionTransactions } from '../values/customTypes';
import { RootState } from './store';

const initialState: CalendarState = {
  transactions: [],
  status: 'idle',
  error: null,
};

export const fetchCalendar = createAsyncThunk('calendar/fetchCalendar', async () => {
  const response = await getSubscriptionTransactions();
  return response;
});

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    changeStatusToIdle(state) {
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCalendar.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        fetchCalendar.fulfilled, //fetchCalendar
        (state, action: PayloadAction<SubscriptionTransactions[]>) => {
          state.status = 'succeeded';
          state.transactions = action.payload;
        }
      )
      .addCase(fetchCalendar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectCalendar = (state: RootState) => state.calendar;

export const { changeStatusToIdle } = calendarSlice.actions;

export default calendarSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSubscriptions } from '../api/SubscriptionService';
import {
  SubscriptionType,
  SubscriptionState,
  SubscriptionResponse,
} from '../values/customTypes';
import { RootState } from './store';

const initialState: SubscriptionState = {
  data: [],
  month: '',
  status: 'idle',
  error: null,
};

export const fetchSubs = createAsyncThunk(
  'subscriptions/fetchSubs',
  async () => {
    const response = await getSubscriptions();
    return response;
  }
);

// never reassign the state (state = state.concat(action.payload)) - can reassign property
// either directly modify the state or return a new one. NOT BOTH
const subsSlice = createSlice({
  name: 'subscriptions', // actions will have format 'subscriptions/action'
  initialState,
  reducers: {
    subsAdd(state, action: PayloadAction<SubscriptionType>) {
      state.data.push(action.payload);
    },
    subsDelete(state, action: PayloadAction<SubscriptionType>) {
      state.data = state.data.filter((sub) => sub.name !== action.payload.name);
      // return {...state, data:filteredSubs}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSubs.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        fetchSubs.fulfilled,
        (state, action: PayloadAction<SubscriptionResponse>) => {
          state.status = 'succeeded';
          state.data = action.payload.subs;
          state.month = action.payload.month;
        }
      )
      .addCase(fetchSubs.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error);
        state.error = action.error.message;
      });
  },
});

export const selectSubs = (state: RootState) => state.subscriptions;

export const { subsAdd, subsDelete } = subsSlice.actions;

export default subsSlice.reducer;

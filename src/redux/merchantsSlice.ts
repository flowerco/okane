import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  MerchantsForSubState,
  MerchantsForSubType,
} from '../values/customTypes';
import { RootState } from './store';
import { getMerchantsForSubscription } from '../api/SubscriptionService';

const initialState: MerchantsForSubState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchMerchants = createAsyncThunk(
  'merchantsForSub/fetchMerchantsForSub',
  async (subscription_id: string) => {
    const response = await getMerchantsForSubscription(subscription_id);
    return response;
  }
);

const merchantsSlice = createSlice({
  name: 'merchantsForSub',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMerchants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchMerchants.fulfilled,
        (state, action: PayloadAction<MerchantsForSubType[]>) => {
          state.status = 'succeeded';
          state.data = action.payload;
        }
      )
      .addCase(fetchMerchants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectSubs = (state: RootState) => state.merchantsForSub;

export default merchantsSlice.reducer;

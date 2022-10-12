import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchMerchants = createAsyncThunk(
  'merchantsForSub/fetchMerchantsForSub',
  async (subscription_id: string) => {
    const response = await fetch(
      `http:localhost:3001/getMerchantsBySubscriptions/${subscription_id}`
    );
    return response;
  }
);

// never reassign the state (state = state.concat(action.payload)) - can reassign property
// either directly modify the state or return a new one. NOT BOTH
const subsSlice = createSlice({
  name: 'merchantsForSub', // actions will have format 'subscriptions/action'
  initialState,
  reducers: {},
  extraReducers(builder) {
    // builder
    //   .addCase(fetchMerchants.pending, (state, action) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(fetchMerchants.fulfilled, (state, action: PayloadAction<>) => {
    //     state.status = 'succeeded';
    //     state.data = action.payload.subs;
    //   })
    //   .addCase(fetchMerchants.rejected, (state, action) => {
    //     state.status = 'failed';
    //     console.log(action.error);
    //     state.error = action.error.message;
    //   });
  },
});

export const selectSubs = (state: RootState) => state.merchantsForSub;

export default subsSlice.reducer;

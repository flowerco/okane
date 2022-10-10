import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSubscriptions } from '../api-Service';
import { SubscriptionType, SubscriptionState } from '../values/customTypes';
import { RootState } from './store';

const initialState: SubscriptionState = {
  data: [],
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
        (state, action: PayloadAction<SubscriptionType[]>) => {
          state.status = 'succeeded';
          state.data = action.payload;
        }
      )
      .addCase(fetchSubs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectSubs = (state: RootState) => state.subscriptions;

export const { subsLoad, subsAdd, subsDelete } = subsSlice.actions;

export default subsSlice.reducer;

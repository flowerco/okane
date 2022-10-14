import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategories } from '../api/CategoryService';
import { CategoryState, CategoryResponse } from '../values/customTypes';
import { RootState } from './store';

const initialState: CategoryState = {
  totals: [],
  transactions: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCats',
  async () => {
    const response = await getCategories();
    return response;
  }
);

const catsSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // catChange -- when drag and drop
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        fetchCategories.fulfilled, //fetchCats
        (state, action: PayloadAction<CategoryResponse>) => {
          state.status = 'succeeded';
          state.totals = action.payload.category_totals;
          state.transactions = action.payload.transactions;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectCats = (state: RootState) => state.categories;

// export const { subsAdd, subsDelete } = subsSlice.actions;

export default catsSlice.reducer;

<<<<<<< HEAD
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCategories } from "../api-Service";
import {
  CategoryType,
  CategoryState,
  CategoryResponse,
} from "../values/customTypes";
import { RootState } from "./store";

const initialState: CategoryState = {
  //   data: [], ??????????????????
  //   month: "", ??????????????????
  //   status: "idle", ?????????????????
  //   error: null, ??????????????????
};

export const fetchCats = createAsyncThunk("categories/fetchCats", async () => {
  const response = await getCategories();
  return response;
});

// never reassign the state (state = state.concat(action.payload)) - can reassign property
// either directly modify the state or return a new one. NOT BOTH
const catsSlice = createSlice({
  name: "categories", // actions will have format 'subscriptions/action'
  initialState,
  reducers: {
    catsAdd(state, action: PayloadAction<CategoryType>) {
      state.data.push(action.payload);
    },
    catsDelete(state, action: PayloadAction<CategoryType>) {
      state.data = state.data.filter((sub) => sub.name !== action.payload.name);
      // return {...state, data:filteredSubs}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCats.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        fetchCats.fulfilled, //fetchCats
        (state, action: PayloadAction<CategoryResponse>) => {
          state.status = "succeeded";
          state.data = action.payload.subs;
          state.month = action.payload.month;
        }
      )
      .addCase(fetchCats.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.error);
        state.error = action.error.message;
      });
  },
});

export const selectCats = (state: RootState) => state.categories;

export const { catsAdd, catsDelete } = catsSlice.actions;

export default catsSlice.reducer;
=======
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategories } from '../api/CategoryService';
import { CategoryState, CategoryResponse } from '../values/customTypes';
import { RootState } from './store';

const initialState: CategoryState = {
  totals: [],
  transactions: [],
  clicked: '',
  hovered: '',
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCats', async () => {
  const response = await getCategories();
  return response;
});

const catsSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    changeClicked(state, action: PayloadAction<string>) {
      state.clicked = action.payload;
    },
    // catChange -- when drag and drop
    changeStatusToIdle(state) {
      state.status = 'idle';
    },
    enterTarget(state, action: PayloadAction<string>) {
      state.hovered = action.payload;
    },
    leftTarget(state) {
      state.hovered = '';
    },
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
          // console.log('undefined check', state.clicked === '');
          if (state.clicked === '') state.clicked = action.payload.category_totals[0].category_name;
          // console.log('new (after reload) stateClicked', state.clicked);
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectCats = (state: RootState) => state.categories;

export const { changeClicked, changeStatusToIdle, enterTarget, leftTarget } = catsSlice.actions;

export default catsSlice.reducer;
>>>>>>> 7c8d47d0e3598b70629ed95863f85c875dd8f610

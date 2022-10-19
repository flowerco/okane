import { createSlice, PayloadAction } from  '@reduxjs/toolkit'
import {RootState} from './store'

const initialState =  {
  sidebarOpen: false,
  searchString: ''
}

const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers:{
    toggleSidebar:  (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    }
  }
})

export const selectScreen = (state: RootState) => state.screen;

export const { toggleSidebar, setSearch } = screenSlice.actions;

export default screenSlice.reducer

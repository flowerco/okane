import { createSlice } from  '@reduxjs/toolkit'
import { SidebarMenu } from '../components/widgets/SidebarMenu'
import {RootState} from './store'

const initialState =  {
  sidebarOpen: false
}

const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers:{
    toggleSidebar:  (state) => {
      console.log('Setting sidebarOpen to: ', !state.sidebarOpen);
      state.sidebarOpen = !state.sidebarOpen;
    },
  }
})

export const selectScreen = (state: RootState) => state.screen;

export const { toggleSidebar } = screenSlice.actions;

export default screenSlice.reducer

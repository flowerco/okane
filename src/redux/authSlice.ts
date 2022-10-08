import { createSlice, nanoid, PayloadAction } from  '@reduxjs/toolkit'
import { create } from 'domain'
import {RootState} from './store'

const initialState =  {
  isAuthenticated: false,
  userID: ''
}

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers:{
    login:  (state, action: PayloadAction<string>) => {
      // add JWT authenticaiton here otherwise return empty state
      state.isAuthenticated = true;
      state.userID = action.payload
    },
    logout:  (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false
      state.userID = ''
    },
    register: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.userID = action.payload
    },
  }
})

export const selectAuth = (state: RootState) => state.authentication

export const {login, logout, register} = authSlice.actions;

export default authSlice.reducer

import { createSlice, PayloadAction } from  '@reduxjs/toolkit'
import { SubscriptionType } from '../customTypes';
import {RootState} from './store'

const initialState =  [{name:'test',price:69, style: {color:'red'}}] as SubscriptionType[]

const subsSlice = createSlice({
  name: 'subscriptions', // actions will have format 'subscriptions/action'
  initialState,
  reducers:{
    subsLoad(state, action: PayloadAction<SubscriptionType[]>) {
      state = state.concat(action.payload) // can be mutable due to under the hood of configure slice
    },
    subsAdd(state, action: PayloadAction<SubscriptionType>) {
      state.push(action.payload)
    },
    subsDelete(state, action: PayloadAction<SubscriptionType>) {
      state = state.filter((sub) => sub.name !== action.payload.name)
    }
  }

})

export const selectSubs = (state: RootState) => state.subscriptions

export const {subsLoad, subsAdd, subsDelete} = subsSlice.actions


export default subsSlice.reducer
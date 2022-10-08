import { createSlice, PayloadAction } from  '@reduxjs/toolkit'
import { SubscriptionType } from '../values/customTypes';
import {RootState} from './store'



const initialState =  {
  data:[{name:'test',price:69, style: {color:'red'}}] as SubscriptionType[],
  status: 'idle',
  error: null
}

// never reassign the state (state = state.concat(action.payload)) - can reassign property
// either directly modify the state or return a new one. NOT BOTH

const subsSlice = createSlice({
  name: 'subscriptions', // actions will have format 'subscriptions/action'
  initialState,
  reducers:{
    subsLoad(state, action: PayloadAction<SubscriptionType[]>) {
      state.data = action.payload

    },
    subsAdd(state, action: PayloadAction<SubscriptionType>) {
      state.data.push(action.payload)
    },
    subsDelete(state, action: PayloadAction<SubscriptionType>) {
      state.data = state.data.filter((sub) => sub.name !== action.payload.name)
      // return {...state, data:filteredSubs}
    }
  }

})

export const selectSubs = (state: RootState) => state.subscriptions

export const {subsLoad, subsAdd, subsDelete} = subsSlice.actions


export default subsSlice.reducer
import {configureStore} from '@reduxjs/toolkit'

import subscriptionReducer from './subsSlice'
import authenticationReducer from './authSlice'
import screenReducer from './screenSlice'


export const store = configureStore({
  reducer: {
    subscriptions: subscriptionReducer,
    authentication: authenticationReducer,
    screen: screenReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

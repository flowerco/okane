import {configureStore} from '@reduxjs/toolkit'

import subscriptionReducer from './subsSlice'
import authenticationReducer from './authSlice'

export const store = configureStore({
  reducer: {
    subscriptions: subscriptionReducer,
    authentication: authenticationReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

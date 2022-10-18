import { configureStore } from '@reduxjs/toolkit';

import subscriptionReducer from './subsSlice';
import authenticationReducer from './authSlice';
import merchantsForSubReducer from './merchantsSlice';
import screenReducer from './screenSlice';
import categoriesReducer from './catSlice';
import calendarReducer from './calendarSlice';

export const store = configureStore({
  reducer: {
    subscriptions: subscriptionReducer,
    authentication: authenticationReducer,
    merchantsForSub: merchantsForSubReducer,
    categories: categoriesReducer,
    screen: screenReducer,
    calendar: calendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

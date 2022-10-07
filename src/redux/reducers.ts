import { combineReducers } from 'redux';
import { SubscriptionType } from '../customTypes';

const initialStateSubscriptions = {
  subscriptions: [] as SubscriptionType[],
}

const subsReducer = (
  state = initialStateSubscriptions,
  action: { type: string, payload?: SubscriptionType[] | SubscriptionType}
) => {
  switch (action.type) {
    case 'LOAD_SUBS':
      return {
        subscriptions: action.payload
      }

    case 'ADD_SUB':
      return {
        subscriptions: [...state.subscriptions, action.payload ]
      }

    default: return state;
  }
}

const initialStateAuth = {
  isAuthenticated: false,
  userID: ''
}

const authReducer = (
  state = initialStateAuth,
  action: {
    type: string,
    payload: string //userID
  }
) => {
  switch (action.type) {
    case 'LOGIN':
      // add JWT authentication here otherwise return empty state that isn't authenticated
      return {isAuthenticated:true, userID: action.payload}
    case 'LOGOUT':
      return {...state, isAuthenticated:false, userID: ''}
  }
}



const reducer = combineReducers({
  subsReducer,
  authReducer
});

export default reducer;
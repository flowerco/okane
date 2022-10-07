import { combineReducers } from 'redux';
import { SubscriptionType } from '../customTypes';

const initialStateSubscriptions = {
  subscriptions: [] as SubscriptionType[],
}

const subsReducer = (
  state = initialStateSubscriptions,
  action: { type: string, payload: SubscriptionType[]}
) => {
  switch (action.type) {
    case 'LOAD_SUBS':
      return {
        ...state,
        subscriptions: action.payload
      }

    case 'ADD_SUB':
      return {
        ...state,
        subscriptions: state.subscriptions.concat(action.payload)
      }
    case 'DELETE_SUB':
      const subObj = action.payload[0]
      const subsCopy = [...state.subscriptions]
      const filteredSubs = subsCopy.filter((sub) => sub.name !== subObj.name)
      return {
        ...state,
        subscriptions: [...filteredSubs ]
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
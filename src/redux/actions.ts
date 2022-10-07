import { SubscriptionType } from "../customTypes"

export const loadSubscriptions = (subscriptions: SubscriptionType[]) => {
  return {
    type: 'LOAD_SUBS',
    payload: subscriptions
  }
}

export const addSubscription = (subscription: SubscriptionType) => {
  return {
    type: "ADD_SUB",
    payload: subscription
  }
}

export const login = (user_id: string) => {
  return {
    type: "LOGIN",
    payload: user_id
  }
}

export const logout = () => {
  return {
    type: "LOGOUT",
  }
}
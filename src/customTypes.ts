import { Style } from "util";

export type SubscriptionType = {name: string,
price: number,
style?: groupStyle}

export type groupStyle = {
  color: string
  image?: string
}
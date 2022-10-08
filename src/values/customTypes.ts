import { Style } from "util";

export type SubscriptionType = {
  name: string,
  monthlyPrice: number,
  style?: groupStyle}

export type groupStyle = {
  textColor: string,
  bgColor: string,
  image?: string
}
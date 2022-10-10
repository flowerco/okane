import { Style } from "util";

export type SubscriptionType = {
  id: string;
  name: string;
  monthlyPrice: number;
  style?: groupStyle;
};

export type SubscriptionState = {
  data: SubscriptionType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined | null;
};

export type groupStyle = {
  bgColor: string;
  textColor: string;
};

export type StreamingType = {
  month: string;
  netflix: number;
  amazonPrime: number;
  spotify: number;
  disneyPlus: number;
};

export interface Istatus {
  status: "idle" | "loading" | "succeeded" | "failed";
}

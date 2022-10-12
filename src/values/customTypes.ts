import { SerializedError } from "@reduxjs/toolkit";
import { Style } from "util";

export type SubscriptionType = {
  subscription_id: number;
  name: string;
  monthlyPrice: number;
};

export type SubscriptionResponse = {
  month: string;
  subs: SubscriptionType[];
};

export type SubscriptionState = {
  data: SubscriptionType[];
  month: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
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

export type emailPassword = {
  email: string;
  password: string;
};

import { SerializedError } from '@reduxjs/toolkit';
import { Style } from 'util';

export type SubscriptionType = {
  subscription_id: string;
  name: string;
  monthlyPrice: number;
};

export type MerchantType = {
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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

export type MerchantsForSubType = {
  [key: string]: string | number;
};

export type MerchantsForSubState = {
  data: MerchantsForSubType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

export type groupStyle = {
  bgColor: string;
  textColor: string;
};

export interface StreamingType {
  [key: string]: string | number;
}

export interface Istatus {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export type emailPassword = {
  email: string;
  password: string;
};

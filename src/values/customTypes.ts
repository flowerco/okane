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

export type CategoryTotals = {
  category_total: number;
  category_name: string;
  category_code: string;
  category_id: number;
};

export type CategoryTransactions = {
  price: number;
  category_name: string;
  date: string;
  category_code: string;
  merchant_name: string;
  category_id: number;
  merchant_code: string;
  merchant_id: number;
};

export type CategoryResponse = {
  category_totals: CategoryTotals[];
  transactions: CategoryTransactions[];
};

export type CategoryState = {
  totals: CategoryTotals[];
  transactions: CategoryTransactions[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

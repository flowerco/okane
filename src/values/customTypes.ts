import { SerializedError } from '@reduxjs/toolkit';
import { Style } from 'util';

export type SubscriptionType = {
  id: string;
  name: string;
  monthlyPrice: number;
  style?: groupStyle;
};

export type SubscriptionState = {
  data: SubscriptionType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

export type groupStyle = {
  bgColor: string;
  textColor: string;
};

export interface Istatus {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export type emailPassword = {
  email: string;
  password: string;
};
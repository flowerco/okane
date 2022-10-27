import { SerializedError } from "@reduxjs/toolkit";
import { Style } from "util";

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
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
};

export type MerchantsForSubType = {
  [key: string]: string | number;
};

export type MerchantsForSubState = {
  data: MerchantsForSubType[];
  status: "idle" | "loading" | "succeeded" | "failed";
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
  status: "idle" | "loading" | "succeeded" | "failed";
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
  clicked: string;
  hovered: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
};

export type updateCategoryType = {
  merchant_id: number;
  newCategory_id: number;
};

type ThumbnailType = {
  url: string;
  width: number;
  height: number;
};

export type YoutubeItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: ThumbnailType;
      medium: ThumbnailType;
      high: ThumbnailType;
      standard: ThumbnailType;
      maxres: ThumbnailType;
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
  };
};

export type YoutubeRequest = {
  kind: string;
  etag: string;
  items: YoutubeItem[];
};

export type SubscriptionTransactions = {
  month_end_date: string,
  date: string,
  subscription_code: string,
  subscription_name: string,
  merchant_name: string,
  price: number
};

export type CalendarState = {
  transactions: SubscriptionTransactions[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
};
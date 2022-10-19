import { MerchantType } from "../values/customTypes";

const rootUrl = 'http://localhost';

export const getSubscriptions = async () => {
  let output: any = "";
  return await fetch(`${rootUrl}:${process.env.REACT_APP_PORT}/subscriptions`, {
    credentials: "include",
  }).then((res) => {
    const data = res.json();
    output = data;
    return data;
  });
  // .catch((err) => console.log('error @getSubscriptions', err));
};

export const getSubName = async (id: string) => {
  try {
    const sub = await fetch(
      `${rootUrl}:${process.env.REACT_APP_PORT}/subscriptions/${id}`,
      {
        credentials: "include",
      }
    );
    const data = await sub.json();
    return data.name;
  } catch (err) {
    console.log("Error getting subscription name in front-end: ", err);
  }
};

export const getMerchants = async () => {
  let output: MerchantType[] = [];
  return await fetch(`${rootUrl}:${process.env.REACT_APP_PORT}/merchants`, {
    credentials: 'include',
  }).then(async (res) => {
    const data = await res.json();
    output = data;
    return data;
  });
  // .catch((err) => console.log('error @getSubscriptions', err));
};

export const getMerchantsForSubscription = async (subscription_id: string) => {
  try {
    const response = await fetch(
      `${rootUrl}:${process.env.REACT_APP_PORT}/merchants/${subscription_id}`,
      { credentials: "include" }
    );
    return await response.json();
  } catch (e) {
    console.log(e, "error in getting");
  }
};

export const getSubNameForMerchant = async (merchantId: number) => {
  try {
    const subName = await fetch(`${rootUrl}:${process.env.REACT_APP_PORT}/subscriptionCode/${merchantId}`, {
      credentials: 'include',
    });
    const data = await subName.json();
    return data.subscription_code;
  } catch (err) {
    console.log('Error getting subscription name in front-end: ', err);
  }
}

import { MerchantType } from "../values/customTypes";

const rootUrl = process.env.REACT_APP_HOST;
const rootPort = process.env.REACT_APP_PORT;

export const getSubscriptions = async () => {
  let output: any = "";
  return await fetch(`${rootUrl}:${rootPort}/api/subscriptions`, {
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
      `${rootUrl}:${rootPort}/api/subscriptions/${id}`,
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
  return await fetch(`${rootUrl}:${rootPort}/api/merchantsList`, {
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
      `${rootUrl}:${rootPort}/api/merchants/${subscription_id}`,
      { credentials: "include" }
    );
    return await response.json();
  } catch (e) {
    console.log(e, "error in getting");
  }
};

export const getSubNameForMerchant = async (merchantId: number) => {
  try {
    const subName = await fetch(`${rootUrl}:${rootPort}/api/subscriptionCode/${merchantId}`, {
      credentials: 'include',
    });
    const data = await subName.json();
    return data.subscription_code;
  } catch (err) {
    console.log('Error getting subscription name in front-end: ', err);
  }
}
const rootUrl = process.env.REACT_APP_HOST;


export const getSubscriptions = async () => {
  return await fetch(`${rootUrl}/api/subscriptions`, {
    credentials: "include",
  }).then(async (res) => {
    return await res.json();
  });
  // Error page now implemented - catch not currently required
  // .catch((err) => console.log('error @getSubscriptions', err));
};

export const getSubName = async (id: string) => {
  try {
    const sub = await fetch(
      `${rootUrl}/api/subscriptions/${id}`,
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
  return await fetch(`${rootUrl}/api/merchantsList`, {
    credentials: 'include',
  }).then(async (res) => {
    return await res.json();
  });
  // .catch((err) => console.log('error @getSubscriptions', err));
};

export const getMerchantsForSubscription = async (subscription_id: string) => {
  try {
    const response = await fetch(
      `${rootUrl}/api/merchants/${subscription_id}`,
      { credentials: "include" }
    );
    return await response.json();
  } catch (e) {
    console.log(e, "error in getting");
  }
};

export const getSubNameForMerchant = async (merchantId: number) => {
  try {
    const subName = await fetch(`${rootUrl}/api/subscriptionCode/${merchantId}`, {
      credentials: 'include',
    });
    const data = await subName.json();
    return data.subscription_code;
  } catch (err) {
    console.log('Error getting subscription name in front-end: ', err);
  }
}
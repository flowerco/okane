const rootUrl = 'http://localhost';

export const getSubscriptions = async () => {
  let output: any = '';
  return await fetch(`${rootUrl}:${process.env.REACT_APP_PORT}/subscriptions`, {
    credentials: 'include',
  }).then((res) => {
    const data = res.json();
    output = data;
    return data;
  });
  // .catch((err) => console.log('error @getSubscriptions', err));
};

export const getMerchantsForSubscription = async (subscription_id: string) => {
  try {
    const response = await fetch(
      `${rootUrl}:${process.env.REACT_APP_PORT}/merchants/${subscription_id}`,
      { credentials: 'include' }
    );
    return await response.json();
  } catch (e) {
    console.log(e, 'error in getting');
  }
};

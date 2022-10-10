const rootUrl = 'http://localhost:3001';

export const getSubscriptions = async () => {
  return await fetch(`${rootUrl}/subscriptions`).then((res) => res.json());

  // .catch((err) => console.log('error @getSubscriptions', err));
};

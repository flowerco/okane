const rootUrl = 'http://localhost';

export const getSubscriptions = async () => {
  return await fetch(
    `${rootUrl}:${process.env.REACT_APP_PORT}/subscriptions`, { credentials:"include" }
  ).then((res) => res.json());
  // .catch((err) => console.log('error @getSubscriptions', err));
};

import { SubscriptionTransactions } from '../values/customTypes';

const rootUrl = 'http://localhost';

export const getSubscriptionTransactions = async () => {
  const transactionResponse = await fetch(
    `${rootUrl}:${process.env.REACT_APP_PORT}/calendar`,
    { credentials: 'include' }
  );
  return await transactionResponse.json();
};

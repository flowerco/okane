const rootUrl = process.env.REACT_APP_HOST;
const rootPort = process.env.REACT_APP_PORT;

export const getSubscriptionTransactions = async () => {
  const transactionResponse = await fetch(
    `${rootUrl}:${rootPort}/api/calendar`,
    { credentials: 'include' }
  );
  return await transactionResponse.json();
};
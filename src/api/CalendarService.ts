const rootUrl = process.env.REACT_APP_HOST;


export const getSubscriptionTransactions = async () => {
  const transactionResponse = await fetch(
    `${rootUrl}/api/calendar`,
    { credentials: 'include' }
  );
  return await transactionResponse.json();
};
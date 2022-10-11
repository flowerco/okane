const rootUrl = 'http://localhost';

export const getSubscriptions = async () => {
  let output: any = '';
  return await fetch(
    `${rootUrl}:${process.env.REACT_APP_PORT}/subscriptions`, { credentials:"include" }
  ).then((res) => {
    const data = res.json();
    output=data;
    return data;
  })
  .finally(() => console.log('Final subs output: ', output));
  // .catch((err) => console.log('error @getSubscriptions', err));
};

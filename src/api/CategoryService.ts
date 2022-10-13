const rootUrl = 'http://localhost';

export const getCategories = async () => {
  const categoryResponse = await fetch(
    `${rootUrl}:${process.env.REACT_APP_PORT}/categories`,
    { credentials: 'include' }
  );
  return await categoryResponse.json();
};

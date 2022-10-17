import { updateCategoryType } from '../values/customTypes';
const rootUrl = 'http://localhost';

export const getCategories = async () => {
  const categoryResponse = await fetch(
    `${rootUrl}:${process.env.REACT_APP_PORT}/categories`,
    { credentials: 'include' }
  );
  return await categoryResponse.json();
};

export const updateCategory = async (data: updateCategoryType) => {
  const result = await fetch(
    `${rootUrl}:${process.env.REACT_APP_PORT}/category`,
    {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    }
  );
  const response = await result.json();

  if (response.error) {
    console.log('ERROR: ', response.error);
  } else {
    return response;
  }
};

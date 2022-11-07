import { updateCategoryType } from '../values/customTypes';
const rootUrl = process.env.REACT_APP_HOST;


export const getCategories = async () => {
  const categoryResponse = await fetch(
    `${rootUrl}/api/categories`,
    { credentials: 'include' }
  );
  return await categoryResponse.json();
};

export const updateCategory = async (data: updateCategoryType) => {
  const result = await fetch(
    `${rootUrl}/api/category`,
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

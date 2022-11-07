const rootUrl = process.env.REACT_APP_HOST;


export const createUser = async (
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
  name: FormDataEntryValue | null
) => {
  try {
    const response = await fetch(
      `${rootUrl}/api/register`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, name }),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('SignUp CreateUser error:', err);
    return new Error('Failed to create user');
  }
};

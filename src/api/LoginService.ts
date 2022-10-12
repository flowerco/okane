import jwt_decode from 'jwt-decode';

export const verifyUser = async (
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null
) => {
  try {
    const response = await fetch(
      `http://localhost:${process.env.REACT_APP_PORT}/login`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      }
    );
    // Return the JWT from the JSON output
    const data = await response.text();
    console.log('Data received from validation:', data);
    // Decode the JWT to get the user ID
    const decoded: { expiresAt: number; id_hash: string; iat: number } =
      jwt_decode(data);
    return decoded.id_hash;
  } catch (error) {
    console.log('LOGIN SERVICE ERROR: ', error);
    return new Error('Failed to Login at service');
  }
};

export const validateJwtCookie = async () => {
  let output = 'LOGOUT';
  try {
    const response = await fetch(
      `http://localhost:${process.env.REACT_APP_PORT}/validate`,
      { credentials: 'include' }
    );
    if (response.status === 200) {
      const data = await response.json();
      console.log('Data received from jwt validation:', data);
      output = data.userId;
    }
    return output;
  } catch (err) {
    console.log('Err in frontend cookie validation: ', err);
  }
};

export const removeJwtCookie = async () => {
  console.log('Port: ', process.env.REACT_APP_PORT);
  try {
    await fetch(`http://localhost:${process.env.REACT_APP_PORT}/remove`, {
      credentials: 'include',
    });
  } catch (err) {
    console.log('Error removing Jwt cookie: ', err);
  }
};

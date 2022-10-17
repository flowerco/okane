import React, { useState } from 'react';
import { verifyUser } from '../../api/LoginService';
import { createUser } from '../../api/RegisterService';
import { login } from '../../redux/authSlice';
import { useAppDispatch } from '../../redux/hooks';

export const LoginScreen = () => {
  const initialState = { email: '', password: '', name: '' };
  const [formState, setFormState] = useState(initialState);
  const [registerFlag, setRegisterFlag] = useState(false);
  const dispatch = useAppDispatch();

  const toggleRegisterFlag = () => {
    setRegisterFlag(!registerFlag);
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    toggleRegisterFlag();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Check for the registerFlag or login process:
    if (registerFlag) {
      createUser(
        data.get('email'),
        data.get('password'),
        data.get('name')
      ).then((res) => {
        console.log('Returned data: ', res);   
        dispatch(login(res.id_hash));
      });
    } else {
      const verificationResult = await verifyUser(
        data.get('email'),
        data.get('password')
      );
      if (verificationResult instanceof Error)
        return alert('Problem with log in');
      console.log('ID received after login verification: ', verificationResult);
      dispatch(login(verificationResult));
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center border-2 border-white rounded-lg w-4/5 max-w-4xl space-y-8 py-10 -mt-16">
        <h1 className="text-3xl text-white font-bold text-center">
          {registerFlag ? 'Register New Account' : 'Log In'}
        </h1>
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col w-full space-y-8 justify-center items-center px-4">
          {registerFlag ? (
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Name"
              className="text-2xl w-full rounded-md px-4"></input>
          ) : (
            <></>
          )}
          <input
            type="text"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
            className="text-2xl w-full rounded-md px-4"></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="text-2xl w-full rounded-md px-4"></input>
          <button
            type="submit"
            className="bg-blue-500 rounded-md text-2xl text-white px-6 py-2 font-semibold">
            {registerFlag ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
      </div>
      <div className="text-white text-xl pt-4 text-center">
        {registerFlag ? 'Already' : "Don't"} have an account?
        <br />
        <span onClick={handleClick} className="underline cursor-pointer">
          Sign {registerFlag ? 'in' : 'up'} here!
        </span>
      </div>
    </div>
  );
};

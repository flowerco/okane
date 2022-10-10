import React, { useState } from "react";
import { Link } from "react-router-dom"
import { verifyUser } from "../../api/LoginService";
import { login } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/hooks"
import jwt_decode from 'jwt-decode';

export const LoginScreen = () => {

  const initialState = { email: '', password: '' };
  const [formState , setFormState] = useState(initialState);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const verificationResult = await verifyUser(data.get('email'), data.get('password'));
    if (verificationResult instanceof Error) return alert('Problem with log in');
     console.log('Verification result: ', verificationResult);
    // const decoded: { expiresAt: number, id_hash: string, iat: number } = 
    //   jwt_decode(verificationResult);
    console.log('ID received from login: ', verificationResult)
    dispatch(login(verificationResult));
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center -mt-16">
      <div className="flex flex-col justify-center items-center border-2 border-white rounded-lg w-4/5 space-y-8 py-10">
        <h1 className="text-3xl text-white font-bold">Log In</h1>
        <form onSubmit={handleSubmit} action="" className="flex flex-col space-y-8 justify-center items-center">
          <input type="text" name="email" value={formState.email} 
            onChange={handleChange}
            placeholder="Email" 
            className="text-2xl rounded-md pl-4"></input>
          <input type="password" name="password"
            placeholder="Password"
            className="text-2xl rounded-md pl-4" ></input>
          <button 
            type="submit"
            className="bg-blue-500 rounded-md text-2xl text-white px-6 py-2 font-semibold"
          >
            Sign In
          </button>
        </form>
      </div>
      <div className="text-white text-xl pt-4 text-center">
        Don't have an account?<br />
        <a href="/register">
          Sign up here!
        </a> 
      </div>
    </div>
  )
}
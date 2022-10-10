export const LoginScreen = () => {

  return ( 
    <div className="w-full h-full flex flex-col justify-center items-center -mt-16">
      <div className="flex flex-col bg-orange-500 rounded-lg w-4/5 h-20">
        <h1>Log In</h1>
        <form action="">
          <input type="text" placeholder="Email" ></input>
          <input type="text" placeholder="Password" ></input>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  )
}
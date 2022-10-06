export const Navbar = (
  { isAuthenticated, callback } 
  : { isAuthenticated: boolean,
    callback: React.Dispatch<React.SetStateAction<boolean>>}
) => {
  return (
    <nav className="flex items-center justify-between h-16 px-6 bg-yellow-600">
      Hello, I'm a navbar.
      <button 
        className="bg-blue-500 rounded-md px-6 py-1 text-white font-semibold"
        onClick={() => callback(!isAuthenticated)}
      >
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </nav>
  )
}
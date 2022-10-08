import icon from '../../assets/g21.png';
import magnifier from '../../assets/search.png';
import { Divide as Hamburger } from 'hamburger-react';

export const Navbar = (
  { isAuthenticated, callback }
  : { isAuthenticated: boolean,
    callback: React.Dispatch<React.SetStateAction<boolean>>}
) => {

  const toggleDrawer = (drawerFlag: boolean) => {

  }

  return (
    <nav className="flex items-center justify-evenly h-20 px-6">
      <div className="h-16 w-16 pt-2">
        <img src={icon} className="object-cover"></img>
      </div>
        { isAuthenticated && (
        <>
          <form className="flex items-center justify-center">
            <input type="text" className="py-3 px-9 rounded-full w-4/5 bg-[#D9D9D9]"></input>
            <button type="submit" className="border-none bg-transparent outline-none -ml-8">
              <img src={magnifier} className="w-5 h-5 object-cover"/>
            </button>
          </form>
          <Hamburger distance="md" color="white" hideOutline={true}/>
        </>
        )
      }
    </nav>
  )
}
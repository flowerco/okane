import icon from "../../assets/g21.png";
import magnifier from "../../assets/search.png";
import { Divide as Hamburger } from "hamburger-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSidebar } from "../../redux/screenSlice";
import { Link } from "react-router-dom";
import DarkModeButton from "../widgets/DarkModeButton";

export const Navbar = () => {
  const authState = useAppSelector((state) => state.authentication);
  const screenState = useAppSelector((state) => state.screen);
  const dispatch = useAppDispatch();

  // Return a column so that we can have an empty area above the nav for the notch.
  return (
    <nav className="flex flex-col items-center justify-center px-6 sticky top-0 left-0">
      <div id="notch" className="h-[5.3mm] w-full"></div>
      <div className="flex items-center justify-between h-20 w-full">
        <div className="h-20 w-20 pt-2">
          <Link
            to="/"
            onClick={() => {
              if (screenState.sidebarOpen) dispatch(toggleSidebar());
            }}
          >
            <img src={icon} className="object-cover"></img>
          </Link>
          <DarkModeButton />
        </div>
        {authState.isAuthenticated && (
          <>
            <form className="flex items-center justify-center w-4/5 -ml-3">
              <input
                type="text"
                className="py-3 px-9 rounded-full w-4/5 bg-[#D9D9D9] max-w-md "
              ></input>
              <button
                type="submit"
                className="border-none bg-transparent outline-none -ml-8"
              >
                <img src={magnifier} className="w-5 h-5 object-cover" />
              </button>
            </form>
            <div className="flex h-14 aspect-square items-center justify-center">
              <Hamburger
                distance="md"
                color="white"
                hideOutline={true}
                toggled={screenState.sidebarOpen}
                onToggle={() => dispatch(toggleSidebar())}
              />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

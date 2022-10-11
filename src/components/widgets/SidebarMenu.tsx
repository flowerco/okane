import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import '../../index.css';
import { logout } from "../../redux/authSlice";
import { removeJwtCookie } from "../../api/LoginService";
import { toggleSidebar } from "../../redux/screenSlice";

export const SidebarMenu = () => {

  const screenState = useAppSelector(state => state.screen);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    removeJwtCookie();
    dispatch(logout());
    dispatch(toggleSidebar())
  }

  return (
    <>
      <div className={`menu-transition h-full w-[100vw] text-white bg-[#428c97] ${screenState.sidebarOpen ? 'open' : 'closed'}`}>
        <ul className="flex flex-col justify-center items-center text-3xl space-y-6 mt-6">
          <li className="border-2 border-white rounded-lg py-3 px-8">Calendar</li>
          <li className="border-2 border-white rounded-lg py-3 px-8">Categories</li>
          <li className="border-2 border-white rounded-lg py-3 px-8">Settings</li>
          <li className="bg-[#6161cc] rounded-lg py-3 px-8" onClick={handleLogout}>Log Out</li>
        </ul>
      </div>
    </>
  )

}
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import '../../index.css';
import { logout } from "../../redux/authSlice";
import { removeJwtCookie } from "../../api/LoginService";
import { toggleSidebar } from "../../redux/screenSlice";
import { Link, useNavigate } from "react-router-dom";

export const SidebarMenu = () => {
  const screenState = useAppSelector((state) => state.screen);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    removeJwtCookie();
    dispatch(logout());
    dispatch(toggleSidebar());
    navigate(0);
  };

  const handleCalendar = () => {
    dispatch(toggleSidebar());
    navigate('/calendar');
  };

  const handleCategories = () => {
    dispatch(toggleSidebar());
    navigate('/categories');
  };



  return (
    <>
      <div
        className={`menu-transition fixed z-20 h-[calc(100vh_-_4rem_-_5.3mm)] w-[100vw] text-white bg-[#428c97] ${
          screenState.sidebarOpen ? 'open' : 'closed'
        }`}
      >
        <ul className="h-full flex flex-col justify-between items-center text-3xl space-y-6 pt-6 pb-10">
          <div className="flex flex-col justify-center items-center space-y-6">
            <li
              className="border-2 border-white rounded-lg py-3 px-8"
              onClick={handleCalendar}
            >
              Calendar
            </li>
            <li
              className="border-2 border-white rounded-lg py-3 px-8"
              onClick={handleCategories}
            >
              Categories
            </li>
            <li className="border-2 border-white rounded-lg py-3 px-8 cursor-pointer">
              <Link to='/lushScreen' onClick={() => dispatch(toggleSidebar())} >
                Contributors
              </Link>
            </li>
            <li className="border-2 border-white rounded-lg py-3 px-8">
              Settings
            </li>
          </div>
          <li
            className="border-2 border-black text-black font-semibold bg-[#6161cc] rounded-lg py-3 px-8"
            onClick={handleLogout}
          >
            Log Out
          </li>
        </ul>
      </div>
    </>
  );
};

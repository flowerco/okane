import { useAppSelector } from "../../redux/hooks";
import { SidebarMenu } from "../widgets/SidebarMenu";
import { LoginScreen } from "./LoginScreen";
import { SummaryScreen } from "./SummaryScreen"

export const MainScreen = () => {

  const authState = useAppSelector(state => state.authentication);

  return (
    <div className="h-[calc(100vh_-_4rem_-_5.3mm)] w-full overflow-y-auto">
      <div className="h-full relative">
        { authState.isAuthenticated
        ? 
        <>
          <SummaryScreen />
          <div className="absolute h-full top-0 left-0">
            <SidebarMenu />
          </div>
        </>
        : <LoginScreen /> }
      </div>
    </div>
  )
}
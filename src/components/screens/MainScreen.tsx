import { useAppSelector } from "../../redux/hooks";
import { LoginScreen } from "./LoginScreen";
import { SummaryScreen } from "./SummaryScreen"

export const MainScreen = () => {

  const authState = useAppSelector(state => state.authentication);

  return (
    <div className="h-[calc(100vh_-_4rem_-_5.3mm)] w-full overflow-y-auto">
      { !authState.isAuthenticated
      ? <SummaryScreen />
      : <LoginScreen /> }
    </div>
  )
}
import { useAppSelector } from "../../redux/hooks";
import { SidebarMenu } from "../widgets/SidebarMenu";
import { AnalysisScreen } from "./AnalysisScreen";
import { LoginScreen } from "./LoginScreen";
import { SummaryScreen } from "./SummaryScreen";
import { CalendarScreen } from "./CalendarScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoriesScreen from "./CategoriesScreen";
import { ContributorsScreen } from "./ContributorsScreen";
import { YoutubeScreen } from "./YoutubeScreen";
import { Loading } from "../widgets/Loading";
import OpenBankingScreen from "./OpenBankingScreen";

export const MainScreen = ({
  appLoading,
  online,
}: {
  appLoading: boolean;
  online: boolean;
}) => {
  const authState = useAppSelector((state) => state.authentication);

  if (appLoading) {
    return (
      <div className="h-[calc(100vh_-_4rem_-_5.3mm)] w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh_-_4rem_-_5.3mm)] w-full">
      <div className="h-full relative overflow-auto">
        {authState.isAuthenticated ? (
          <>
            <div className="h-full relative">
              <Routes>
                <Route path="/connect" element={<OpenBankingScreen />}></Route>
                <Route path="/callback" element={<OpenBankingScreen />}></Route>
                <Route path="/" element={<SummaryScreen />}></Route>
                <Route
                  path="/analysis/:id"
                  element={<AnalysisScreen />}
                ></Route>
                <Route path="/calendar" element={<CalendarScreen />}></Route>
                <Route
                  path="/categories"
                  element={<CategoriesScreen />}
                ></Route>
                <Route path="/advice" element={<YoutubeScreen />}></Route>
                <Route
                  path="/contributors"
                  element={<ContributorsScreen />}
                ></Route>
              </Routes>
            </div>
            <div className="absolute z-20 h-full top-0 left-0">
              <SidebarMenu />
            </div>
          </>
        ) : (
          <>
            <LoginScreen />
          </>
        )}
      </div>
    </div>
  );
};

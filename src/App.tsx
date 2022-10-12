import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { validateJwtCookie } from "./api/LoginService";
import { Navbar } from "./components/navbars/Navbar";
import { LoginScreen } from "./components/screens/LoginScreen";
import { MainScreen } from "./components/screens/MainScreen";
import { SidebarMenu } from "./components/widgets/SidebarMenu";
import "./index.css";
import { login } from "./redux/authSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

function App() {
  const authState = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // On first booting up the app, check if we are already logged in.
    // TODO: Can this also use Alex's loading logic?
    validateJwtCookie().then((res) => {
      console.log("Validating cookie... result: ", res);
      if (res && res !== "LOGOUT") {
        dispatch(login(res as string));
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App  h-screen w-screen radial-gradient fixed">
        <Navbar />
        <div>
          <MainScreen />
          {/* <SidebarMenu /> */}
        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;

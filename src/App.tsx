import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { validateJwtCookie } from './api/LoginService';
import { Navbar } from './components/navbars/Navbar';
import { LoginScreen } from './components/screens/LoginScreen';
import { MainScreen } from './components/screens/MainScreen';
import { SidebarMenu } from './components/widgets/SidebarMenu';
import './index.css';
import { login } from './redux/authSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';

function App() {
  const authState = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  // App-level loading indicator to be used before any other states are fetched
  const [appLoading, setAppLoading] = useState(true);

  // App-level online indicator
  const [online, setOnline] = useState(true);

  useEffect(() => {
    // On first booting up the app, check if we are already logged in.
    validateJwtCookie().then((res) => {
      setAppLoading(false);
      console.log('Validating cookie... result: ', res);
      if (res && res !== 'LOGOUT') {
        dispatch(login(res as string));
      }
    });
  }, []);


  // Add listeners for change in online status
  useEffect(() => {
    window.addEventListener("online", () => {
      setOnline(true);
    });
    window.addEventListener("offline", () => {
      setOnline(false);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App  h-screen w-screen radial-gradient fixed">
        <Navbar />
        <div>
          <MainScreen appLoading={appLoading} online={online} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

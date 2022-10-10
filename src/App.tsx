import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/navbars/Navbar";
import { AnalysisScreen } from "./components/screens/AnalysisScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { MainScreen } from "./components/screens/MainScreen";
import "./index.css";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      <div className="App  h-screen w-screen radial-gradient fixed">
        <Navbar isAuthenticated={isAuthenticated} callback={setAuthenticated} />
        <div>
          {isAuthenticated ? (
            <Routes>
              <Route path="/" element={<MainScreen />} />
              <Route path="/analysis" element={<AnalysisScreen />} />
            </Routes>
          ) : (
            <LoginScreen />
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

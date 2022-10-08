import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/navbars/Navbar';
import { LoginScreen } from './components/screens/LoginScreen';
import { MainScreen } from './components/screens/MainScreen';
import './index.css';

function App() {

  const [isAuthenticated, setAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      <div className="App  h-screen w-screen radial-gradient">
        <Navbar isAuthenticated={isAuthenticated} callback={setAuthenticated} />
        { isAuthenticated 
         ? <MainScreen />
         : <LoginScreen /> }
      </div>
    </BrowserRouter>
  );
}

export default App;

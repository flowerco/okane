import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/navbars/Navbar';
import { LoginScreen } from './components/screens/LoginScreen';
import { MainScreen } from './components/screens/MainScreen';

function App() {

  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} callback={setAuthenticated} />
        { isAuthenticated 
         ? <MainScreen />
         : <LoginScreen /> }
      </div>
    </BrowserRouter>
  );
}

export default App;

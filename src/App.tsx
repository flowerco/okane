import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/navbars/Navbar';
import { LoginScreen } from './components/screens/LoginScreen';
import { MainScreen } from './components/screens/MainScreen';
import './index.css';

function App() {

  return (
    <BrowserRouter>
      <div className="App  h-screen w-screen radial-gradient fixed">
        <Navbar />
        <MainScreen />
      </div>
    </BrowserRouter>
  );
}

export default App;

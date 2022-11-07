import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { validateJwtCookie } from './api/LoginService';
import { Navbar } from './components/navbars/Navbar';
import { MainScreen } from './components/screens/MainScreen';
import './styles/index.css';
import { login } from './redux/authSlice';
import { useAppDispatch } from './redux/hooks';
import { useColorMode } from '@chakra-ui/react';

function App() {
	const { colorMode } = useColorMode();
	const dispatch = useAppDispatch();

	// App-level loading indicator to be used before any other states are fetched
	const [appLoading, setAppLoading] = useState(true);

	// App-level online indicator
	const [online, setOnline] = useState(true);

	useEffect(() => {
		// On first booting up the app, check if we are already logged in.
		validateJwtCookie().then((res) => {
			setAppLoading(false);
			// console.log('Validating cookie... result: ', res);
			if (res && res !== 'LOGOUT') {
				dispatch(login(res as string));
			}
		});
	}, [dispatch]);

	// Add listeners for change in online status
	useEffect(() => {
		window.addEventListener('online', () => {
			setOnline(true);
		});
		window.addEventListener('offline', () => {
			setOnline(false);
		});
	}, []);

	return (
		<BrowserRouter>
			<div
				className={`App  h-screen w-screen ${
					colorMode === 'dark' ? 'radial-gradient' : 'radial-gradient2'
				}  fixed`}
			>
				<Navbar />
				<div>
					<MainScreen appLoading={appLoading} online={online} />
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;

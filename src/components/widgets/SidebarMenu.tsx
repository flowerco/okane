import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/authSlice';
import { removeJwtCookie } from '../../api/LoginService';
import { toggleSidebar } from '../../redux/screenSlice';
import { useNavigate } from 'react-router-dom';
import DarkModeButton from '../widgets/DarkModeButton';
import { Divide as Hamburger } from 'hamburger-react';
import { useColorMode } from '@chakra-ui/react';
import '../../styles/index.css';

export const SidebarMenu = () => {
	const screenState = useAppSelector((state) => state.screen);
  const { colorMode } = useColorMode();
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const handleLogout = () => {
		removeJwtCookie();
		dispatch(logout());
		dispatch(toggleSidebar());
		navigate('/');
		navigate(0);
	};

	const handleCalendar = () => {
		dispatch(toggleSidebar());
		navigate('/calendar');
	};

	const handleCategories = () => {
		dispatch(toggleSidebar());
		navigate('/categories');
	};

	const handleAdvice = () => {
		dispatch(toggleSidebar());
		navigate('/advice');
	};

	const handleContributors = () => {
		dispatch(toggleSidebar());
		navigate('/contributors');
	};

	const handleSettings = () => {
		dispatch(toggleSidebar());
	};

	const BoxButton = ({
		text,
		callback,
	}: {
		text: string;
		callback: () => void;
	}) => {
		return (
			<li
				id='btn-rainbow'
				className='border-2 border-white rounded-lg w-full py-3 px-8 cursor-pointer text-center'
				onClick={callback}
			>
				{text}
			</li>
		);
	};

	return (
		<>
			<div
				className={`menu-transition fixed z-50 h-full w-[100vw] text-white backdrop-blur-3xl ${
					screenState.sidebarOpen ? 'open' : 'closed'
				}`}
			>
				<div className={`flex justify-end self-end pt-9 pr-7 ${colorMode === 'light' ? 'text-black' : 'text-white'}`}>
					<Hamburger
						distance='md'
						hideOutline={true}
						toggled={screenState.sidebarOpen}
						onToggle={() => dispatch(toggleSidebar())}
					/>
				</div>
				<ul className='h-full  flex flex-col justify-between items-center text-3xl space-y-6 pt-6 pb-36'>
					<div className='flex flex-col justify-center items-center space-y-6'>
						<DarkModeButton></DarkModeButton>
						<BoxButton text={'Calendar'} callback={handleCalendar} />
						<BoxButton text={'Categories'} callback={handleCategories} />
						<BoxButton text={'Advice'} callback={handleAdvice} />
						<BoxButton text={'Contributors'} callback={handleContributors} />
						<BoxButton text={'Settings'} callback={handleSettings} />
					</div>
					<li
						id='btn-rainbow'
						className='border-2 border-black text-black font-semibold bg-[#6161cc] rounded-lg'
						onClick={handleLogout}
					>
						Log Out
					</li>
				</ul>
			</div>
		</>
	);
};
// bg-[#428c97]

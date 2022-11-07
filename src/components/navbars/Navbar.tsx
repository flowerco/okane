import icon from '../../assets/g21.png';
import magnifier from '../../assets/search.png';
import { Divide as Hamburger } from 'hamburger-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSearch, toggleSidebar } from '../../redux/screenSlice';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

export const Navbar = () => {
	const { isAuthenticated } = useAppSelector((state) => state.authentication);
	const { sidebarOpen, searchString } = useAppSelector((state) => state.screen);
	const dispatch = useAppDispatch();

	const [expandSearch, setExpandSearch] = useState(false);

	const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Get the new search string and dispatch so that the searchList is updated.
		const newVal = event.target.value;
		dispatch(setSearch(newVal));
	};

	const flexContent = useRef(null!);

	// Return a column so that we can have an empty area above the nav for the notch.
	return (
		<nav className='flex flex-col items-center justify-center px-6 sticky top-0 left-0 z-30'>
			<div id='notch' className='h-[5.3mm] w-full'></div>
			<div
				ref={flexContent}
				className={`flex items-center h-20 w-full ${
					expandSearch ? 'justify-center' : 'justify-between'
				}`}
			>
				{!expandSearch && (
					<div className='flex h-20 w-20 justify-center items-center'>
						<Link
							to='/'
							onClick={() => {
								if (sidebarOpen) dispatch(toggleSidebar());
							}}
						>
 							<img src={icon} className='object-cover' alt=''></img>
						</Link>
					</div>
				)}

				{isAuthenticated && (
					<>
						<form
							className={`flex items-center justify-center -ml-3 transition-all ${
								expandSearch ? 'w-full' : 'w-4/5'
							}`}
						>
							<input
								type='text'
								value={searchString}
								onChange={searchChangeHandler}
								onFocus={() => setExpandSearch(true)}
								onBlur={() => setExpandSearch(false)}
								className={`py-2 pl-6 pr-9 rounded-full text-black bg-[#D9D9D9] text-2xl max-w-md ${
									expandSearch ? 'w-full' : 'w-4/5'
								}`}
							></input>
							<button
								type='submit'
								className='border-none bg-transparent outline-none -ml-8'
							>
								<img src={magnifier} className='w-5 h-5 object-cover' alt=''/>
							</button>
						</form>

						{!expandSearch && (
							<div className='flex h-14 aspect-square items-center justify-center z-50'>
								<Hamburger
									distance='md'
									hideOutline={true}
									toggled={sidebarOpen}
									onToggle={() => dispatch(toggleSidebar())}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</nav>
	);
};

import { useAppSelector } from '../../redux/hooks';
import { SidebarMenu } from '../widgets/SidebarMenu';
import { AnalysisScreen } from './AnalysisScreen';
import { LoginScreen } from './LoginScreen';
import { SummaryScreen } from './SummaryScreen';
import { CalendarScreen } from './CalendarScreen';
import { Route, Routes } from 'react-router-dom';
import CategoriesScreen from './CategoriesScreen';
import { ContributorsScreen } from './ContributorsScreen';
import { YoutubeScreen } from './YoutubeScreen';
import { Loading } from '../widgets/Loading';
import OpenBankingScreen from './OpenBankingScreen';
import { SearchList } from '../widgets/SearchList';

export const MainScreen = ({
	appLoading,
	online,
}: {
	appLoading: boolean;
	online: boolean;
}) => {
	const authState = useAppSelector((state) => state.authentication);
	const { searchString } = useAppSelector((state) => state.screen);

	if (appLoading) {
		return (
			<div className='h-[calc(100vh_-_4rem_-_5.3mm)] w-full flex justify-center items-center'>
				<Loading />
			</div>
		);
	}

	return (
		<>
			{!online && (
				<div className='flex items-center text-center h-16 bg-orange-500 py-3 px-6'>
					<p>
						Device is not online, some functionality may not be available.
					</p>
				</div>
			)}
			<div
				className={`relative w-full ${
					online
						? 'h-[calc(100vh_-_4rem_-_5.3mm)]'
						: 'h-[calc(100vh_-_8rem_-_5.3mm)]'
				}`}
			>
				{searchString && <SearchList />}
					{authState.isAuthenticated ? (
						<>
								<Routes>
									<Route
										path='/connect'
										element={<OpenBankingScreen />}
									></Route>
									<Route path='/' element={<SummaryScreen />}></Route>
									<Route
										path='/analysis/:id'
										element={<AnalysisScreen />}
									></Route>
									<Route path='/calendar' element={<CalendarScreen />}></Route>
									<Route
										path='/categories'
										element={<CategoriesScreen />}
									></Route>
									<Route path='/advice' element={<YoutubeScreen />}></Route>
									<Route
										path='/contributors'
										element={<ContributorsScreen />}
									></Route>
								</Routes>
						</>
					) : (
						<>
							<LoginScreen />
						</>
					)}
				</div>
			<div className='absolute z-40 h-[calc(100vh_-_4rem_-_5.3mm)] top-0 left-0'>
				<SidebarMenu />
			</div>
		</>
	);
};

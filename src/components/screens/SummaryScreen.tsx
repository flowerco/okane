import { okaneColorTheme } from '../../values/customColors';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectSubs } from '../../redux/subsSlice';
import { useEffect } from 'react';
import { fetchSubs } from '../../redux/subsSlice';
import { Loading } from '../widgets/Loading';
import { Error } from '../widgets/Error';
import { ItemList } from '../widgets/ItemList';
import { useNavigate } from 'react-router-dom';
import { SubscriptionType } from '../../values/customTypes';
import { RechartsPieChart } from '../widgets/RechartsPieChart';
import { useColorMode } from '@chakra-ui/react';

export const SummaryScreen = () => {
	const dispatch = useAppDispatch();
	const { colorMode } = useColorMode();
	const navigate = useNavigate();

	const colors = okaneColorTheme;
	const subscriptionsState = useAppSelector(selectSubs);
	const subscriptions = subscriptionsState.data;
	const status = subscriptionsState.status;
	const error = subscriptionsState.error;

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchSubs());
		}
	}, [dispatch, status]);


	if (status === 'loading') {
		return <Loading />;
	}
	if (status === 'failed') {
		return <Error error={error} />;
	}

	const handleClick = async (item: SubscriptionType) => {
		navigate(`analysis/${item.subscription_id}`);
	};

	const formatDate = new Date(subscriptionsState.month).toLocaleDateString(
		'en-GB',
		{
			month: 'long',
			year: 'numeric',
		}
	);

	const total = subscriptions
			.reduce((accumulator, sub) => {
				return accumulator + sub.monthlyPrice;
			}, 0);

	return (
		<div className='lg:flex lg:flex-row-reverse lg:overflow-hidden lg:px-10 h-full w-full justify-center items-center'>
			
			{/* Pie Chart */}
			<div className='flex w-full lg:h-full h-[50%] relative mx-auto justify-center items-center'>
				<RechartsPieChart
					data={subscriptions}
					colors={colors}
					total={total}
					outerPcnt={"80%"}
					innerPcnt={"60%"}
				/>
				<div className='text-green-400 text-5xl z-0 h-full w-full absolute top-0 left-0 align-center flex justify-center items-center'>
					{`£${total.toFixed(0)}`}
				</div>
			</div>

			{/* List of subscriptions */}
			<div className='lg:flex-col lg:space-y-3 sm:w-full lg:h-full h-[50%] text-center content-center lg:px-24 lg:py-16'>
				<h1 className={`change-text text-3xl font-semibold hidden lg:block ${colorMode === 'light' ? 'text-black' : 'text-white' }`}>
					<span id="show-on-hover">お金へようこそ</span>
					<span id="hide-on-hover">Welcome to Okané</span>
				</h1>
				<div className={`text-3xl font-semibold ${colorMode === 'light' ? 'text-black' : 'text-white' }`}>{formatDate}</div>
				<div className='pt-8 w-full h-full'>
				<div className='flex flex-col justify-center items-center w-full px-12 lg:h-[80%] h-[70%] overflow-y-auto'>
					<ItemList
						data={subscriptions}
						colors={colors}
						callback={handleClick}
					/>
				</div>
				</div>
			</div>
		</div>
	);
};

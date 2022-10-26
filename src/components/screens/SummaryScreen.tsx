import { PieChartColorList1 } from '../../values/customColors';
import { MinPieChart } from '../widgets/MinPieChart';
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

export const SummaryScreen = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const colors = PieChartColorList1;
	const subscriptionsState = useAppSelector(selectSubs);
	const subscriptions = subscriptionsState.data;
	const status = subscriptionsState.status;
	const error = subscriptionsState.error;

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchSubs());
		}
	}, [dispatch, status]);

	// TODO: Loading/failed logic to be added to redux.
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
			year: '2-digit',
		}
	);

	const total = subscriptions
			.reduce((accumulator, sub) => {
				return accumulator + sub.monthlyPrice;
			}, 0);

	return (
		<div className='lg:flex lg:flex-row-reverse lg:overflow-hidden sm:grid sm:grid-cols-1 sm:justify-items-center sm:overflow-auto h-full w-full px-10 justify-center items-center'>
			
			{/* Pie Chart */}
			<div className='flex w-full lg:h-full h-[50%] aspect-square relative mx-auto justify-center items-center'>
				<RechartsPieChart
					data={subscriptions}
					colors={colors}
					total={total}
				/>
				<div className='text-green-400 text-5xl z-0 h-full w-full absolute top-0 left-0 align-center flex justify-center items-center'>
					{`£${total.toFixed(0)}`}
				</div>
			</div>

			{/* List of subscriptions */}
			<div className='lg:flex-col lg:space-y-3 sm:w-full h-full text-center content-center p-24'>
				<h1 className='change-text text-white text-3xl font-semibold hidden lg:block'>
					<span id="show-on-hover">お金へようこそ</span>
					<span id="hide-on-hover">Welcome to Okané</span>
				</h1>
				<div className=' text-white text-3xl font-semibold'>{formatDate}</div>
				<div className='flex flex-col w-full px-12 mt-4 h-[80%] overflow-y-auto'>
					<ItemList
						data={subscriptions}
						colors={colors}
						callback={handleClick}
					/>
				</div>
			</div>
		</div>
	);
};

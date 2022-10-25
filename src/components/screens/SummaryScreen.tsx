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

	const total = () => {
		return subscriptions
			.reduce((accumulator, sub) => {
				return accumulator + sub.monthlyPrice;
			}, 0)
			.toFixed(0);
	};

	return (
		<div className='lg:flex lg:flex-row-reverse sm:grid sm:grid-cols-1 h-full w-full justify-center items-center sm:justify-items-center lg:overflow-hidden sm:overflow-auto'>
			<div className='flex w-full h-full aspect-square relative mx-auto '>
				<RechartsPieChart
					data={subscriptions}
					colors={colors}
					total={total()}
				/>
				<div className='text-green-400 text-5xl z-0 h-full w-full absolute top-0 left-0 align-center flex justify-center items-center'>
					{`£${total()}`}
				</div>
			</div>
			<div className='lg:flex-col  lg:w-full lg:h-[80%]  lg:m-28 sm:w-full text-center content-center'>
				<h1 className='text-white text-3xl font-semibold hidden lg:block  '>
					お金へようこそ。
				</h1>
				<div className=' text-white text-3xl font-semibold'>{formatDate}</div>
				<div className='lg:h-full flex flex-col w-full px-12 mt-4 pb-6 overflow-hidden'>
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

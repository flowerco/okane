import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchMerchants, selectMerchants } from '../../redux/merchantsSlice';
import { okaneColorTheme } from '../../values/customColors';
import {
	MerchantType,
	StreamingType,
} from '../../values/customTypes';
import { ItemList } from '../widgets/ItemList';
import { Loading } from '../widgets/Loading';
import { MonthlyGraph } from '../widgets/MonthlyGraph';
import { Error } from '../widgets/Error';
import { getSubName } from '../../api/SubscriptionService';

export const AnalysisScreen = () => {
	const dispatch = useAppDispatch();
	const merchantsState = useAppSelector(selectMerchants);
	const status = merchantsState.status;
	const error = merchantsState.error;
	const merchants = merchantsState.data;

	const { id } = useParams();
	const currentUrl = window.location.pathname;
	const colors = okaneColorTheme;
	const [subName, setSubName] = useState('ERROR');

	useEffect(() => {
		console.log('Calling useEffect for analysis screen');
		if (status === 'idle' || status === 'succeeded') {
			getSubName(id!).then((name) => {
				setSubName(name);
			});
			dispatch(fetchMerchants(id!));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUrl]);

	if (status === 'loading') {
		return <Loading />;
	}
	if (status === 'failed') {
		return <Error error={error} />;
	}

	function formatName(name: string): string {
		let result = name.replace(/([A-Z])/g, ' $1');
		result = result.replace('_','');
		return result.charAt(0).toUpperCase() + result.slice(1);
	}

	const latestMonth =
		merchants.length > 0
			? Object.entries(merchants[merchants.length - 1])
					.filter((merchant) => merchant[0] !== 'monthEndDate')
					.map((merchant) => {
						return {
							name: formatName(merchant[0]),
							monthlyPrice: merchant[1],
						} as MerchantType;
					})
			: [];

	const handleClick = () => {};

	return (
		<div className='flex flex-col lg:flex-row-reverse lg:overflow-hidden lg:px-10 h-full w-full justify-center items-center'>
			
			{/* Line Chart */}
			<div className='flex flex-col w-full lg:h-full h-[50%] relative mx-auto mt-4 justify-center items-center'>
				<h1 className='text-3xl'>{subName}</h1>
				<MonthlyGraph data={merchants as StreamingType[]} colors={colors} />
			</div>

			{/* List of subscriptions */}
			<div className='flex lg:space-y-3 lg:h-full h-[50%] w-4/5 justify-center items-center lg:p-24'>
				<div className='flex flex-col justify-center items-center w-full px-4 lg:h-[80%] h-[70%] overflow-y-auto'>
				<ItemList
						data={latestMonth as MerchantType[]}
						colors={colors}
						callback={handleClick}
					/>
				</div>
			</div>
		</div>
	);
};

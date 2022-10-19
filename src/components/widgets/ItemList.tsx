import { MerchantType, SubscriptionType } from '../../values/customTypes';
import '../../ButtonStyles.css';

export const ItemList = ({
	data,
	colors,
	callback,
}: {
	data: SubscriptionType[] | MerchantType[];
	colors: string[];
	callback: ((item: SubscriptionType) => void) | ((item: MerchantType) => void);
}) => {
	return (
		<>
			{data.map((item, index) => {
				return (
					<div
						id='btn-clear'
						key={index}
						onClick={() => callback(item as SubscriptionType)}
						className='flex justify-between items-center px-6 mb-6 rounded-3xl h-24 border-2 cursor-pointer w-full'
						style={{ color: colors[index % colors.length] }}
					>
						<p className='text-3xl'>{item.name}</p>
						<p className='text-2xl'>£{Number(item.monthlyPrice).toFixed(2)}</p>
					</div>
				);
			})}
		</>
	);
};

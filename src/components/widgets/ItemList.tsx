import { MerchantType, SubscriptionType } from '../../values/customTypes';
import { useColorMode } from '@chakra-ui/react';
import '../../styles/button-styles.css';

export const ItemList = ({
  data,
  colors,
  callback,
}: {
  data: SubscriptionType[] | MerchantType[];
  colors: string[];
  callback: ((item: SubscriptionType) => void) | ((item: MerchantType) => void);
}) => {
  const { colorMode } = useColorMode();
  return (
    <div className='h-full w-full'>
      {data.map((item, index) => {
        return (
          <div
            id="btn-clear"
            key={index}
            onClick={() => callback(item as SubscriptionType)}
            className="flex justify-between items-center text-left px-6 mb-6 rounded-3xl h-24 border-2 cursor-pointer w-full"
            style={{ color: colors[index % colors.length] }}>
            <p className={`lg:text-3xl text-2xl ${colorMode === 'light' ? 'text-black' : 'text-white' }`}>{item.name}</p>
            <p className="text-2xl">£{Number(item.monthlyPrice).toFixed(2)}</p>
          </div>
        );
      })}
    </div>
  );
};

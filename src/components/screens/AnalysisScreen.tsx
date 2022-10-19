import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchMerchants, selectMerchants } from '../../redux/merchantsSlice';
import { PieChartColorList1 } from '../../values/customColors';
import {
  MerchantType,
  StreamingType,
  SubscriptionType,
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
  const colors = PieChartColorList1;
  const [subName, setSubName] = useState('ERROR');

  useEffect(() => {
    if (status === 'idle' || status === 'succeeded') {
      getSubName(id!).then((name) => {
        setSubName(name);
      });
      dispatch(fetchMerchants(id!));
    }
  }, [currentUrl]);

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'failed') {
    return <Error error={error} />;
  }

  function formatName(name: string): string {
    const result = name.replace(/([A-Z])/g, ' $1');
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
    <div className="h-[calc(100vh_-_4rem_-_5.3mm)] w-full overflow-y-auto">
      <div className="grid grid-cols-1 h-full w-full justify-items-center">
        <div className="mt-3 text-white text-3xl font-semibold">{subName}</div>
        <div className="w-4/5 aspect-square relative">
          <div className="text-green-400 text-5xl z-0 h-full w-full absolute top-0 left-0 align-center flex justify-center items-center">
            <MonthlyGraph data={merchants as StreamingType[]} colors={colors} />
          </div>
        </div>
        <div className="flex flex-col w-full px-12 mt-4 pb-6">
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

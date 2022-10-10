import { summaryScreenMock } from '../../redux/mocks';
import { PieChartColorList1 } from '../../values/customColors';
import { MinPieChart } from '../widgets/MinPieChart';
import { useAppSelector } from '../../redux/hooks';
import { selectSubs } from '../../redux/subsSlice';

export const SummaryScreen = () => {

  const subscriptionsState = useAppSelector(selectSubs)
  const subscriptions = subscriptionsState.data

  const colors = PieChartColorList1;
  console.log('subs ',subscriptions)
  console.log('mocks', summaryScreenMock)

  return (
    <div className="flex flex-col h-full w-full items-center">
       <div className='flex items-center justify-center w-4/5 aspect-square my-6'>
        <MinPieChart data={subscriptions} colors={colors} />
        <div className='text-green-400 text-5xl z-0 h-full relative top-0 left-0 align-center flex justify-center items-center'>
          { `£${summaryScreenMock.reduce((accumulator,sub) => {
            return accumulator + sub.monthlyPrice;
          },0).toFixed(2)}` }
        </div>
      </div>
      <div className='flex flex-col w-full px-12 mt-4'>
        { summaryScreenMock.map((sub, index) => {
            return (
              <div
                key={index}
                className='flex justify-between items-center px-6 mb-6 rounded-3xl h-24 border-2 border-white'
                style={{ color: colors[index % colors.length] }}
              >
                <p className='text-3xl'>{sub.name}</p>
                <p className='text-2xl'>£{sub.monthlyPrice}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
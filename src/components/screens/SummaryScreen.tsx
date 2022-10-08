import { PieChart } from 'react-minimal-pie-chart';
import { summaryScreenMock } from '../../redux/mocks';
import { PieChartColorList1, PieChartColorList2 } from '../../values/customColors';

export const SummaryScreen = () => {

  const colors = PieChartColorList1;

  return (
    <div className="flex flex-col h-full w-full items-center">
      <div className='w-4/5 aspect-square mt-6'>
        <PieChart
          data={
            summaryScreenMock.map((sub, index) => {
              return (
                { title: sub.longName, 
                value: sub.monthlyPrice,
                color: colors[index % colors.length] }
              )
            })
          } 
          animate={true}
          lineWidth={25}
        />
      </div>
      <div className='flex flex-col mt-6'>
        { summaryScreenMock.map(sub => {
            return (
              <>
              <div className='flex text-white'>
                <p>{sub.longName}</p>
                <p>{sub.monthlyPrice}</p>
              </div>
              </>
            )
          })
        }
      </div>
    </div>
  );
}
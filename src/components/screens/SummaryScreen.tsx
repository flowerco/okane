import { PieChart } from 'react-minimal-pie-chart';

export const SummaryScreen = () => {

  return (
    <div className="flex flex-col h-full w-full items-center">
      <div className='w-4/5 aspect-square mt-6'>
        <PieChart
          data={[
            { title: 'Netflix', value: 9.99, color: 'red' },
            { title: 'Prime', value: 7.99, color: 'blue' },
            { title: 'NowTV', value: 15, color: 'lightgreen' },
          ]} 
          animate={true}
          lineWidth={25}
        />
      </div>
    </div>
  );
}
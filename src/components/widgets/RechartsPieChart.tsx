import { PieChart, Pie } from 'recharts';
import { SubscriptionType } from '../../values/customTypes';

export const RechartsPieChart = ({ data, colors } : { data: SubscriptionType[], colors: string[] }) => {

  return (
    <div className='w-4/5 relative max-w-sm aspect-square mt-6'>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          outerRadius={150}
          innerRadius={100}
          paddingAngle={5}
          data={
            data.map((sub, index) => {
              return (
                { title: sub.name, 
                value: sub.monthlyPrice,
                fill: colors[index % colors.length] }
              )
            })
          }
        />
        </PieChart>
      </div>
  ) 
}
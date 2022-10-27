import { useColorMode } from '@chakra-ui/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { StreamingType } from '../../values/customTypes';

export const MonthlyGraph = ({
  data,
  colors,
}: {
  data: StreamingType[];
  colors: string[];
}) => {

  const { colorMode } = useColorMode();

  // Convert the chart data to the correct format for display.
  let streamArr: string[] = [];
  let monthArr: string[] = [];

  for (let month of data) {
    for (let sub in month) {
      if (sub === 'monthEndDate') {
        monthArr.push(formatDate(sub));
      } else if (!streamArr.includes(sub)) {
        streamArr.push(sub);
      }
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('en-GB', {
        month: 'short',
        year: '2-digit',
      })
      .replace(/ /g, '-');
  }

  return (
    <ResponsiveContainer height="90%" width="90%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="monthEndDate"
          interval={1}
          alignmentBaseline="after-edge"
          angle={-45}
          dy={24}
          height={80}
          tick={{ fill: colorMode === 'light' ? "black" : "white" , fontSize: 16 }}
          tickFormatter={(tick) => formatDate(tick)}
        />
        <YAxis
          tick={{ fill: colorMode === 'light' ? "black" : "white", fontSize: 18 }}
          tickFormatter={(tick) => {
            return '£' + tick;
          }}
        />
        {streamArr.map((sub, index) => {
          return (
            <Area
              key={index}
              type="monotone"
              dataKey={sub}
              stackId="1"
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

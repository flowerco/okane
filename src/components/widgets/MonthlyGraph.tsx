import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StreamingType } from "../../values/customTypes";

export const MonthlyGraph = ({
  data,
  colors,
}: {
  data: StreamingType[];
  colors: string[];
}) => {
  let streamArr: string[] = [];
  let monthArr: string[] = [];
  for (let month of data) {
    for (let sub in month) {
      if (sub === "monthEndDate") {
        monthArr.push(formatDate(sub));
      } else if (!streamArr.includes(sub)) {
        streamArr.push(sub);
      }
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        month: "short",
        year: "2-digit",
      })
      .replace(/ /g, "-");
  }
  // console.log('Formatted date: ', formatDate(data[0].monthEndDate as string));

  const testData = [
    { monthEndDate: "Jan-22", netflix: 7.99, prime: 9.99 },
    { monthEndDate: "Feb-22", netflix: 2.99, prime: 8.99 },
    { monthEndDate: "Mar-22", netflix: 6.99, prime: 4.99 },
  ];

  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="monthEndDate"
          interval={1}
          alignmentBaseline="after-edge"
          angle={-45}
          dy={24}
          height={80}
          tick={{ fill: "white", fontSize: 16 }}
          tickFormatter={(tick) => formatDate(tick)}
        />
        <YAxis
          tick={{ fill: "white", fontSize: 18 }}
          tickFormatter={(tick) => {
            return "£" + tick;
          }}
        />
        <Tooltip />
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
        {/* <Area
              type="monotone"
              dataKey="netflix"
              stackId="1"
              stroke="#fff"
              fill="#fff"
            />
            <Area
              type="monotone"
              dataKey="prime"
              stackId="1"
              stroke="lightBlue"
              fill="lightgreen"
            /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};

// import "./styles.css";
import { objectTraps } from "immer/dist/internal";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { analysisScreenMock } from "../../redux/mocks";
import { subsAdd } from "../../redux/subsSlice";
import { StreamingType } from "../../values/customTypes";

export const MonthlyGraph = ({
  data,
  colors,
}: {
  data: StreamingType[];
  colors: string[];
}) => {

  let streamArr: string[] = [];
  for (let month of data) {
    for (let sub in month){
      if (sub !== 'monthEndDate' && !streamArr.includes(sub)) {
        streamArr.push(sub)
      }
    }
  }
  console.log('Full list of merchants: ', streamArr);

  return (
    <AreaChart
      width={350}
      height={200}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" fontSize={"small"} />
      <YAxis fontSize={"small"} />
      <Tooltip />
      {streamArr.map((sub, index) => {
        if (index !== 0) {
          console.log(sub);
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
        }
      })}
      {/* <Area
        type="monotone"
        dataKey="netflix"
        stackId="1"
        stroke="#E50914"
        fill="#E50914"
      />
      <Area
        type="monotone"
        dataKey="amazonPrime"
        stackId="1"
        stroke="#00A8E1"
        fill="#00A8E1"
      />
      <Area
        type="monotone"
        dataKey="spotify"
        stackId="1"
        stroke="#1AB26B"
        fill="#1AB26B"
      />
      <Area
        type="monotone"
        dataKey="disneyPlus"
        connectNulls
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      /> */}
    </AreaChart>
  );
};

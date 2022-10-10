// import "./styles.css";
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

const data = analysisScreenMock;

export default function MonthlyGraph() {
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
      <Area
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
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />
    </AreaChart>
  );
}

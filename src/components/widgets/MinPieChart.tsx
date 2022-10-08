import { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { SubscriptionType } from "../../values/customTypes";

export const MinPieChart = ({
  data,
  colors,
}: {
  data: SubscriptionType[];
  colors: string[];
}) => {
  const [selected, setSelected] = useState<number | undefined>(undefined);

  useEffect(() => {
    console.log("Selected chart element number: ", selected);
  }, [selected]);

  return (
    <PieChart
      style={{
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: "8px",
        zIndex: "10",
        position: "absolute",
      }}
      data={data.map((sub, index) => {
        return {
          title: sub.name,
          value: sub.monthlyPrice,
          color: colors[index % colors.length],
        };
      })}
      lineWidth={40}
      radius={42}
      segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
      segmentsShift={(index) => (index === selected ? 6 : 1)}
      animate
      label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
      labelPosition={100 - 40 / 2}
      labelStyle={(index) =>
        index === selected
          ? {
              opacity: 0.75,
              pointerEvents: "none",
            }
          : { display: "none" }
      }
      onClick={(_, index) => {
        setSelected(index === selected ? undefined : index);
      }}
    />
  );
};

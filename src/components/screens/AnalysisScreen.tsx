import { summaryScreenMock, analysisScreenMock } from "../../redux/mocks";
import { PieChartColorList1 } from "../../values/customColors";
import { MonthlyGraph } from "../widgets/MonthlyGraph";

export const AnalysisScreen = () => {
  const colors = PieChartColorList1;

  return (
    <div className="h-[calc(100vh_-_4rem_-_5.3mm)] w-full overflow-y-auto">
      <div className="grid grid-cols-1 h-full w-full justify-items-center">
        <div className="w-4/5 aspect-square relative">
          <div className="text-green-400 text-5xl z-0 h-full w-full absolute top-0 left-0 align-center flex justify-center ">
            {"Streaming"}
          </div>
          <div className="text-green-400 text-5xl z-0 h-full w-full absolute top-0 left-0 align-center flex justify-center items-center">
            <MonthlyGraph data={analysisScreenMock} colors={colors} />
          </div>
        </div>
        <div className="flex flex-col w-full px-12 mt-4">
          {summaryScreenMock.map((sub, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center px-6 mb-6 rounded-3xl h-24 border-2 border-white"
                style={{ color: colors[index % colors.length] }}
              >
                <p className="text-3xl">{sub.name}</p>
                <p className="text-2xl">£{sub.monthlyPrice.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

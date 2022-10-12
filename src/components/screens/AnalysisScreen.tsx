import { SubstitutionType } from "typescript";
import { summaryScreenMock, analysisScreenMock } from "../../redux/mocks";
import { PieChartColorList1 } from "../../values/customColors";
import { MerchantType, StreamingType, SubscriptionType } from "../../values/customTypes";
import { ItemList } from "../widgets/ItemList";
import { MonthlyGraph } from "../widgets/MonthlyGraph";

export const AnalysisScreen = () => {
  const colors = PieChartColorList1;

  function formatName (name:string):string {
    const result = name.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  const latestMonth = Object.entries(analysisScreenMock[analysisScreenMock.length - 1])
  .filter(merchant => merchant[0] !== 'month')
  .map(merchant => {
    return ({
      name: formatName(merchant[0]),
      monthlyPrice: merchant[1]
    } as MerchantType)
  });

  // TODO: handleClick function. Clicking on the merchant should lead to the payment history calendar.
  const handleClick = () => {

  }

  return (
    <div className="h-[calc(100vh_-_4rem_-_5.3mm)] w-full overflow-y-auto">
      <div className="grid grid-cols-1 h-full w-full justify-items-center">
        <div className="w-4/5 aspect-square relative">
          <div className="text-green-400 text-5xl z-0 h-full w-full absolute top-0 left-0 align-center flex justify-center ">
            {"Streaming"}
          </div>
          <div className="text-green-400 text-5xl z-0 h-full w-full absolute top-0 left-0 align-center flex justify-center items-center">
            <MonthlyGraph data={analysisScreenMock as StreamingType[]} colors={colors} />
          </div>
        </div>
        <div className="flex flex-col w-full px-12 mt-4 pb-6">
          <ItemList data={latestMonth as MerchantType[]} colors={colors} callback={handleClick} />
        </div>
      </div>
    </div>
  );
};

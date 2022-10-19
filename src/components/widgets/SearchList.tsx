import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { getMerchants, getSubNameForMerchant } from "../../api/SubscriptionService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setSearch } from "../../redux/screenSlice";
import { MerchantType } from "../../values/customTypes";
import { Loading } from "./Loading";

export const SearchList = () => {

  const { searchString } = useAppSelector(state => state.screen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  type MerchantData = {
    id: number,
    name: string
  }

  const [merchants, setMerchants] = useState([] as MerchantData[])
  const [loading, setLoading] = useState(false);

  const merchantSearch = async (substr: string) => {
    // TODO: This currently searches through ALL merchants, needs updating to only search through 
    // merchants used by the current user. Currently we can select merchants with no data for this user.
    const response = await getMerchants();
    const lower = substr.toLowerCase();
    let results = [];
    for (let i=0; i<response.length; i++) {
      const res = response[i];
      if (res['name'].toLowerCase().indexOf(lower) != -1){
        results.push({ id: res['id'], name: res['name'] });
      }
    }
    return results;
  }

  useEffect(() => {
    setLoading(true);
    merchantSearch(searchString)
    .then(res => {
      setMerchants(res)
    });
  }, [searchString])

  useEffect(() => {
    setLoading(false);
  }, [merchants])

  const clickHandler = ((merchId:number) => {
    dispatch(setSearch(''));
    getSubNameForMerchant(merchId).then(res => {
      navigate(`analysis/${res}`);
    })
  })

  return (
    <div className="flex justify-center items-center w-full absolute top-0 left-0 z-30">
    { searchString && (
        <ul className="flex flex-col justify-center items-center text-2xl space-y-4 w-4/5 bg-customGreen py-6 rounded-b-md">
          {loading 
            ? <Loading />
            : merchants.length > 0 
              ? merchants.map(merchant => {
                // TODO: Would be nice to have a small logo for each of the merchants when searching...
                return (
                  <li
                    key={merchant.id}
                    className="border border-black py-4 px-10 rounded-md"
                    onClick={() => clickHandler(merchant.id)}
                  >
                    {merchant.name}
                  </li>
              )})
              : <li>No Results Found</li>
          }
        </ul>
    )}
    </div>
  )
}
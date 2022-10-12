import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { SubscriptionType } from "../../values/customTypes"
import { RootState } from './store';
import { fetchMerchants } from '../../redux/merchantsSlice';

//TODO: the type for the input will need to be "merchant[] || sub[] || cat[]" but these don't exist yet.
// Add in once available.
export const ItemList = ({ data, colors } : { data: SubscriptionType[], colors: string[] }) => {

  const dispatch = useAppDispatch()
  const merchantState = useAppSelector((state: RootState) => state.merchantsForSub )

  return (
    <>
    { data.map((sub, index) => {
        return (
          <div
            key={sub.subscription_id}
            className='flex justify-between items-center px-6 mb-6 rounded-3xl h-24 border-2 border-white'
            style={{ color: colors[index % colors.length] }}
          >
          <button onClick={() => {dispatch(fetchMerchants(sub.subscription_id))}}>
            <p className='text-3xl'>{sub.name}</p>
            <p className='text-2xl'>£{sub.monthlyPrice.toFixed(2)}</p>
          </button>
          </div>
        )
      })
    }
    </>
  )
}
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectSubs } from "../../redux/subsSlice"
import { SummaryScreen } from "./SummaryScreen"
import { fetchSubs } from "../../redux/subsSlice"
import { useEffect } from "react"
import MoonLoader from "react-spinners/MoonLoader"

export const MainScreen = () => {
  const dispatch = useAppDispatch()
  const subscriptionsState = useAppSelector(selectSubs)
  const subscriptions = subscriptionsState.data
  const error = subscriptionsState.error
  const status = subscriptionsState.status

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSubs())
    }
  }, [status, dispatch])


  let content;


  return <div className="flex cont"><MoonLoader className="" color="#36d7b7" /></div>


  // return (
  //   <div className="h-[calc(100vh_-_4rem_-_5.3mm)] w-full overflow-y-auto">
  //       <SummaryScreen />
  //   </div>
  // )
}
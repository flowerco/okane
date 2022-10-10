import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectSubs } from "../../redux/subsSlice"
import { SummaryScreen } from "./SummaryScreen"
import { fetchSubs } from "../../redux/subsSlice"
import { useEffect } from "react"

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

  if (status === 'loading') {
    return <h1>hello</h1>
  }

  return (
    <div className="h-[calc(100vh_-_4rem_-_5.3mm)] w-full overflow-y-auto">
        <SummaryScreen />
    </div>
  )
}
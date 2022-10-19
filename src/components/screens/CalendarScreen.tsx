// @ts-nocheck
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCalendar, selectCalendar, } from '../../redux/calendarSlice';
import { useEffect } from 'react';
import { SubscriptionTransactions } from '../../values/customTypes';
import { OkaneSubsColorList } from "../../values/customColors";

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../widgets/react-big-calendar.css';

const localizer = momentLocalizer(moment);


export const CalendarScreen = () =>{

  const colors = OkaneSubsColorList;

  const dispatch = useAppDispatch();
  const calendarState = useAppSelector(selectCalendar);
  const status = calendarState.status;
  const calendarError = calendarState.error;

   
  //  Data format from sequelize
  //  { month_end_date: "2022-09-30T00:00:00.000Z", date: "2022-09-12T00:00:00.000Z", subscription_code: "GYM",
  //    subscription_name: "Gym", merchant_name: "Fitness First", price: 21.99 }
  //
  //  Data format required by <Calendar/>
  //  { id: 0, title: 'Netfix: £11.99', start: new Date(2022, 9, 3), end: new Date(2022, 9, 3), subscription: 'STR' }

  const data = calendarState.transactions.map((e, i) => {

    return {
            id: i,
            title: `${e.merchant_name}: £${e.price}`,
            start: new Date(e.date),
            end: new Date(e.date),
            subscription: e.subscription_code,
    }
  })

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCalendar());
    }
  }, [status, dispatch]);

  const dateLastMonth = moment(new Date()).subtract(1, 'month');

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>

      <div className="w-3/4 h-3/4">
        <Calendar
          toolbar={true}
          views={'month'}
          events={data}
          startAccessor="start"
          defaultDate={dateLastMonth}
          localizer={localizer}
          eventPropGetter={(data) => {
            const backgroundColor = colors.get(data.subscription)
            return { style: { backgroundColor } }
          }}
        />
      </div>
        
    </div>
  );

}
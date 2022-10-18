// @ts-nocheck
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCalendar, selectCalendar, } from '../../redux/calendarSlice';
import { useEffect } from 'react';
import { SubscriptionTransactions } from '../../values/customTypes';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../widgets/react-big-calendar.css';

const localizer = momentLocalizer(moment);


export const CalendarScreen = () =>{

  // Retrieve data from /getTransactionsByMerchant.ß
  // Default calendar page last completed month 
  // 12 months data returned, assign to calendar page
  // Colour each day by type of subscription payment, e.g. streaming = red, gym = blue
  // Date Hoverover displays merchant and value.

  const dispatch = useAppDispatch();
  const calendarState = useAppSelector(selectCalendar);
  const status = calendarState.status;
  const calendarError = calendarState.error;

  // Required data format
  const data = [
    {
      id: 0,
      title: 'Netfix: £11.99',
      start: new Date(2022, 9, 3),
      end: new Date(2022, 9, 3),
      subscription: 'STR'
    },
    {
      id: 1,
      title: 'Amazon: £9.99',
      start: new Date(2022, 9, 12),
      end: new Date(2022, 9, 12),
      subscription: 'STR'
    },
    {
      id: 2,
      title: 'Xow: £11.98',
      start: new Date(2022, 9, 12),
      end: new Date(2022, 9, 12),
      subscription: 'STR'
    }
  ]

  // Sequelize data format
  const sqlData = [
    { 
      month_end_date: "2022-01-31T00:00:00.000Z",
      date: "2022-01-17T00:00:00.000Z",
      subscription_code: "STR",
      subscription_name: "Streaming",
      merchant_name: "Netflix",
      price: 10.99
    },
    {
      month_end_date: "2022-09-30T00:00:00.000Z",
      date: "2022-09-12T00:00:00.000Z",
      subscription_code: "GYM",
      subscription_name: "Gym",
      merchant_name: "Fitness First",
      price: 21.99
    },
    {
      month_end_date: "2022-09-30T00:00:00.000Z",
      date: "2022-09-15T00:00:00.000Z",
      subscription_code: "GYM",
      subscription_name: "Gym",
      merchant_name: "Peleton",
      price: 11.99
    }]


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCalendar());
    }
    if (status === 'succeeded') {
      // TODO Reformat data for <Calendar/> input
      const latestMonth = Object.values(calendarState.transactions).sort((a,b) => new Date(b.month_end_date) - new Date(a.month_end_date))[0]  
      const latestMonthsData = Object.values(calendarState.transactions).filter(e => e.month_end_date === latestMonth.month_end_date);
    }
  }, [status, dispatch]);

  const dateMon = moment(new Date()).subtract(1, 'month').format('MMM YYYY');

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>

      <h1 className='text-center text-2xl font-semibold text-white mb-4'>{dateMon}</h1>

      <div className="w-3/4 h-3/4">
        <Calendar
          toolbar={false}
          views={'month'}
          events={data}
          startAccessor="start"
          defaultDate={moment().toDate()}
          localizer={localizer}
          eventPropGetter={(data) => {
            const backgroundColor = (data.subscription === 'STR') ? 'blue' : (data.subscription === 'GYM') ? 'green' : 'red';
              return { style: { backgroundColor } }
          }}
        />
      </div>
        
    </div>
  );

}
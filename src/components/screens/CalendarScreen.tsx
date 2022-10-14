// @ts-nocheck
import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../../css/react-big-calendar.css';

const localizer = momentLocalizer(moment);


export const CalendarScreen = () =>{

  // Retrieve data from /getTransactionsByMerchant.
  // Default calendar page last completed month 
  // 12 months data returned, assign to calendar page
  // Colour each day by type of subscription payment, e.g. streaming = red, gym = blue
  // Date Hoverover displays merchant and value.

  const data = [
    {
      id: 0,
      title: 'Netfix: £11.99',
      allDay: true,
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
      title: 'Now: £11.98',
      start: new Date(2022, 9, 12),
      end: new Date(2022, 9, 12),
      subscription: 'STR'
    },
    {
      id: 3,
      title: 'Disney: £4.99',
      start: new Date(2022, 9, 23),
      end: new Date(2022, 9, 23),
      subscription: 'STR'
    },
    {
      id: 4,
      title: 'Fitness First: £11.99',
      start: new Date(2022, 9, 3),
      end: new Date(2022, 9, 3),
      subscription: 'GYM'
    },
    {
      id: 5,
      title: 'Peleton: £7.99',
      start: new Date(2022, 9, 27),
      end: new Date(2022, 9, 27),
      subscription: 'GYM'
    },
    {
      id: 6,
      title: 'Halifax: £33.32',
      start: new Date(2022, 9, 26),
      end: new Date(2022, 9, 26),
      subscription: 'CCD'
    }
  ]

  useEffect(() => {

  }, []);
  

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
// @ts-nocheck
import { useState, useEffect } from 'react';

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../css/react-big-calendar.css';

const localizer = momentLocalizer(moment);


export const CalendarScreen = () =>{

  // Retrieve data from /getTransactionsByMerchant.
  // Default calendar page last completed month 
  // 12 months data returned, assign to calendar page
  // Colour each day by type of subscription payment, e.g. streaming = red, gym = blue
  // Date Hoverover displays merchant and value.

  const events = [
    {
      id: 0,
      title: 'Netfix : 11.99',
      allDay: true,
      start: new Date(2022, 9, 12),
      end: new Date(2022, 9, 12),
    },
    {
      id: 1,
      title: 'Amazon : 9.99',
      start: new Date(2022, 9, 3),
      end: new Date(2022, 9, 3),
    },
    {
      id: 2,
      title: 'Now : 11.98',
      start: new Date(2022, 9, 12),
      end: new Date(2022, 9, 12),
      color: 'red',
    },
    {
      id: 3,
      title: 'Disney : 4.99',
      start: new Date(2022, 9, 23),
      end: new Date(2022, 9, 23),
    }
  ]

  const [date, setDate] = useState(new Date());

  const activeDate=new Date(2022, 9, 30)

  console.log('Day: ', date.getDay())
  console.log('DateString: ', date.toDateString())

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>

      <h1 className='text-center text-xl font-semibold text-yellow-800 mb-4'>{date.toDateString()}</h1>

      {/* <div style={{ height: '300pt' }}> */}
       <div className="w-3/4 h-3/4">
          <Calendar
            toolbar={false}
            views={'month'}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
        
    </div>
  );

}
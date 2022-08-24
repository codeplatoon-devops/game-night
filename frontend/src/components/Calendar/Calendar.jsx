import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import "./Calendar.css"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'

export default function Calendar({data}) {
  
  const [eventList, setEventList] = useState(null)

  // need to build an array of objects like:
  // [{title:'something', start: 'date_time'},{title:'something else', start: 'date_time2'}]
  
  // useEffect(()=>{
  //   if (data) {
  //     list = data.map(event => {'name' : event.fields.name})
  //     setEventList({
  //     }
  //     )
  //   }

  // },[])
  
  

  const handleDateClick = (date) => {
    // When a date field is clicked
    // add logic here
    // ideally we would change the calendar to that day's view
    console.log(date.dateStr)
  }

  const handleEventClick = (event) => {
    // When an event is clicked
    // add logic here
    // ideally we could navigate to that event's page
    console.log(event.event._def.title)
  }

  return(
    <div className='container-fluid calendar'>
      {/* {data && <Button onClick={()=>{listEvents}}>list event</Button>} */}
      {data && data.map(event => <div>{event.fields.code}</div>)}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={ 
          data.map((event) => ({title: event.fields.name, start: event.fields.date_time, end:"2022-09-02T15:30:00" }))
          
          // Dummy data
          // ideally, we would be able to pull user's events from the db and pass that into this field
          // {title: 'Group Projects Due', start: data.date_time, end: "2022-08-12T12:44:59Z" },
          // {title: 'Group Project Presentations', start: '2022-09-01T09:00:00', end: '2022-09-02T15:30:00'},
          // {title: 'Graduation Day!', date: '2022-09-02', allDay:true}
        }
      />
    </div>
  )
}
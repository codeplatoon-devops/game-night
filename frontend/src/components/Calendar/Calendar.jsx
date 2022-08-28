import FullCalendar, { ViewApi } from '@fullcalendar/react'
import dayGridPlugin, { DayGridView } from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import "./Calendar.css"


export default function Calendar({data}) {
  
  // source of data-date confusion :(
  const handleDateClick = (date) => {
    let calendarApi = date.view.calendar
    console.log(date)
    if (date.view.type === 'dayGridMonth'){
      calendarApi.changeView('timeGridDay', date.dateStr)
    } else {
      calendarApi.changeView('dayGridMonth',date.dateStr)
    }
    }
  

  const handleEventClick = (event) => {

    console.log(event.event._def)
  }

  return(
    <div className='container-fluid calendar'>
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
          data.map((event) => ({title: event.name, start: event.start_time, end: event.end_time , allDay: event.all_day, url: `/#/events/${event.code}`}))
        }
      />
    </div>
  )
}
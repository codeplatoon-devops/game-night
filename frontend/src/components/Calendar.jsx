import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

function Calendar() {
  
  /*****************************************************************************
  *    Ideally, we would request user's event info from database and create    *
  *    a list of dictionaries with required info such as title, date, etc.     *
  *    possible ex:                                                            *
  *                                                                            *
  *    const [myEvents, setMyEvents] = useState(null)                          *
  *                                                                            *
  *    useEffect(() => {                                                       *
  *      axios.get('/myEvents').then((response) => {                           *
  *        setMyEvents(response)                                               *
  *      })                                                                    *
  *    }, [])                                                                  *
  *****************************************************************************/

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
      events={[
        // Dummy data
        // ideally, we would be able to pull user's events from the db and pass that into this field
        {title: 'Group Projects Due', date: '2022-08-30T13:00:00'},
        {title: 'Group Project Presentations', start: '2022-09-01T09:00:00', end: '2022-09-02T15:30:00'},
        {title: 'Graduation Day!', date: '2022-09-02', allDay:true}
      ]}
    />
  )
}

export default Calendar
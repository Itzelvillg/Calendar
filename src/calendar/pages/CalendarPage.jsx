import { Navbar } from "../components/Navbar"
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { addHours } from "date-fns"
import 'react-big-calendar/lib/css/react-big-calendar.css'


const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,

})

const events = [
  {title: "gingi caca",
    notes: "Saquenla", 
    start: new Date() ,
    end: addHours(new Date, 3)
  },

]


export const CalendarPage = () => {
  return (
    <>
      <Navbar />

      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </>
  )
}

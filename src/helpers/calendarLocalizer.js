import enUS from 'date-fns/locale/en-US'
import { format, parse, startOfWeek, getDay } from "date-fns"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { dateFnsLocalizer } from 'react-big-calendar'


const locales = {
  'en-US': enUS,
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,

})
import { Navbar } from "../components/Navbar"
import { Calendar,  } from 'react-big-calendar'

import { addHours} from "date-fns"
import { localizer } from "../../helpers/calendarLocalizer"
import { CalendarEvent } from "../components/CalendarEvent"



const events = [
  {title: "gingi caca",
    notes: "Saquenla", 
    start: new Date() ,
    end: addHours(new Date, 3),
    bgColor:'#fafafa',
    user:{
      id:'123',
      name:'jejo'
    }
  },

]


export const CalendarPage = () => {

  const eventStyleGetter = (event, start, end, isSelected)=>{
    console.log({event, start, end, isSelected})
    const style={
      backgroundColor: '#387CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white' 
    }
    return {style}
  }

  return (
    <>
      <Navbar />

      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      eventPropGetter={eventStyleGetter}
        components={{events: CalendarEvent}}
    />
    </>
  )
}

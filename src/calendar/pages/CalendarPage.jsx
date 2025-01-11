import { Navbar } from "../components/Navbar"
import { Calendar,  } from 'react-big-calendar'

import { addHours} from "date-fns"
import { localizer } from "../../helpers/calendarLocalizer"
import { CalendarEvent } from "../components/CalendarEvent"
import { useState } from "react"



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
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'day' )

  const eventStyleGetter = (event, start, end, isSelected)=>{
  
    const style={
      backgroundColor: '#387CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white' 
    }
    return {style}
  }

  const onDoubleClick = (event)=>{
    console.log({DoubleClick: event})
  }

  const onSelect = (event)=>{
    console.log({Selected: event})
  }
  const onViewChanged= (event)=>{
    console.log( event)
    localStorage.setItem('lastView', event)
  }

  return (
    <>
      <Navbar />

      <Calendar
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      eventPropGetter={eventStyleGetter}
      components={{event: CalendarEvent}}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />
    </>
  )
}

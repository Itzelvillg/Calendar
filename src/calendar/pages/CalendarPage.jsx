import { Navbar } from "../components/Navbar"
import { Calendar,  } from 'react-big-calendar'

import { addHours} from "date-fns"
import { localizer } from "../../helpers/calendarLocalizer"
import { CalendarEvent } from "../components/CalendarEvent"
import { useState } from "react"
import { CalendarModal } from "../components/CalendarModal"
import { useUiStore } from "../../hooks/useUiStore"
import { useCalendarStore } from "../../hooks/useCalendarStore"
import { FabAddNew } from "../components/FabAddNew"






export const CalendarPage = () => {
  const {openDateModal} = useUiStore();
  const {events, setActiveEvent} = useCalendarStore();
  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week' )

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
    openDateModal()
  }

  const onSelect = (event)=>{
    console.log({click: event})
    setActiveEvent(event)
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
    <CalendarModal/>
    <FabAddNew/>
    </>
  )
}

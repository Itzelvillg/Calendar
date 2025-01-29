import { Navbar } from "../components/Navbar"
import { Calendar,  } from 'react-big-calendar'

import { localizer } from "../../helpers/calendarLocalizer"
import { CalendarEvent } from "../components/CalendarEvent"
import { useEffect, useState } from "react"
import { CalendarModal } from "../components/CalendarModal"
import { useUiStore } from "../../hooks/useUiStore"
import { useCalendarStore } from "../../hooks/useCalendarStore"
import { FabAddNew } from "../components/FabAddNew"
import { FabDelete } from "../components/FabDelete"
import { useAuthStore } from "../../hooks/useAuthStore"






export const CalendarPage = () => {
  const {openDateModal} = useUiStore();
  const {events,setActiveEvent, startLoadingEvents} = useCalendarStore();
  const {user} = useAuthStore()
  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week' )

  const eventStyleGetter = (event, start, end, isSelected)=>{

    const isMyEvent = (user.uid === event.user.uid)|| (user.uid === event.user._id);
    
    const style={
      backgroundColor: isMyEvent ? '#387CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white' 
    }
    return {style}
  }

  const onDoubleClick = (event)=>{
    
    openDateModal()
  }

  const onSelect = (event)=>{
    
    setActiveEvent(event)
  }
  const onViewChanged= (event)=>{
    
    localStorage.setItem('lastView', event)
    setLastView( event )
  }


  useEffect(() => {
    startLoadingEvents()
    
  }, []);

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
    <FabDelete/>
    </>
  )
}

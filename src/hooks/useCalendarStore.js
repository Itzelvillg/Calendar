import { useDispatch, useSelector } from "react-redux";
import {onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent,} from "../store/calendar/calendarSlice";
import { calendarApi } from "../api/calendarAPI";
import { convertEventsToDateEvents } from "./convertEventsToDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user} = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {

        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      } 
        const {data} = await calendarApi.post('/events', calendarEvent);
        console.log(data)
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user}));
  
    } catch (error) {
      Swal.fire('Error while saving event', error.response.data.msg, 'error')
    }
  };

  const startDeletingEvent =async () => {
    try {
      console.log("BORRADo")
      await calendarApi.delete(`/events/${ activeEvent.id }` );
      dispatch( onDeleteEvent() );

      
  } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
  }

  };


  const startLoadingEvents = async()=>{
    try {

      const {data} = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.events)
      
      dispatch(onLoadEvents(events))

    } catch (error) {
      console.log(error)
    
    }
  }
 

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    hasEventSelected: !!activeEvent,
    startLoadingEvents,
   
  };
};

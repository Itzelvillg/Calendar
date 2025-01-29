import { useDispatch, useSelector } from "react-redux";
import {onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent,} from "../store/calendar/calendarSlice";
import { calendarApi } from "../api/calendarAPI";
import { convertEventsToDateEvents } from "./convertEventsToDateEvents";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user} = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      const {data} = await calendarApi.post('/events', calendarEvent);
      console.log(data)
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user}));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
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
    startLoadingEvents
  };
};

import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store/calendar/calendarSlice";



export const useCalendarStore = () => {
  const {events,activeEvents} = useSelector(state => state.calendar)
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }



  return {events, activeEvents, setActiveEvent}
}

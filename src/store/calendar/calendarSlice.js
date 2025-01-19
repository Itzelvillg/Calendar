import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const tempEvent =   {
    _id: new Date().getTime(),
    title: "Gingi",
    notes: "Saquenla", 
    start: new Date() ,
    end: addHours(new Date, 3),
    bgColor:'#fafafa',
    user:{
      id:'123',
      name:'jejo'
    }
  }


export const calendarSlice = createSlice({
  name: 'calendar',
  initialState:{
    events:[tempEvent],
    activeEvent : null
  },
  reducers: {
    onSetActiveEvent: (state, {payload}) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, {payload}) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onDeleteEvent: (state) => {
       if(state.activeEvent) {
        state.events = state.events.filter(event => event._id !== state.activeEvent._id);
        state.activeEvent = null}
    },
    onUpdateEvent: (state, {payload}) => {
      state.events = state.events.map(event => {
          if(event._id === payload._id){
            return payload
          }


        return event
      })
    },
  },
})
// Action creators are generated for each case reducer function
export const {  onSetActiveEvent,onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions
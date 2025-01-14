import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const tempEvent =   {
    _id: new Date().getTime(),
    title: "gingi caca",
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
  },
})
// Action creators are generated for each case reducer function
export const { activeEvent, events, onSetActiveEvent } = calendarSlice.actions
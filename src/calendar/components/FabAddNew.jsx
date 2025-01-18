import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore"

export const FabAddNew = () => {

const {openDateModal} = useUiStore();
const {setActiveEvent} = useCalendarStore();

const handleClick = ()=>{
  setActiveEvent({
        title: "Hola",
        notes: "Mundoo", 
        start: new Date() ,
        end: addHours(new Date, 3),
        bgColor:'#fafafa',
        user:{
          id:'123',
          name:'jejo'
        }

  })
  openDateModal()
}

  return (
    <button onClick={handleClick} className="btn btn-primary fab">
      <i className="fas fa-plus"></i>
      </button>
  )
}

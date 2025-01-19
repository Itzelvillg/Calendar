import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore"

export const FabDelete= () => {


const {startDeletingEvent} = useCalendarStore();

const handleDelete = ()=>{
  startDeletingEvent()
}

  return (
    <button onClick={handleDelete} className="btn btn-danger fab-danger">
      <i className="fas fa-trash-alt"></i>
      </button>
  )
}

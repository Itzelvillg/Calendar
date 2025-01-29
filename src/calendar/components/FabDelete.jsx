import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FabDelete= () => {


  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

const handleDelete = ()=>{
  startDeletingEvent()
}

  return (
    <button onClick={handleDelete}   style={{
      display: hasEventSelected ? '': 'none'
  }}className="btn btn-danger fab-danger">
      <i className="fas fa-trash-alt"></i>
      </button>
  )
}

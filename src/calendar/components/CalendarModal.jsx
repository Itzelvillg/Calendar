import { addHours, differenceInSeconds } from "date-fns";
import { useMemo, useState } from "react";
import ReactModal from "react-modal"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);
    const [formValues, setFormValues] = useState( {title: 'Jejo', notes: 'cola', start: new Date(), end: addHours(new Date(), 2)})
    const [formSubmited, setFormSubmited] = useState(false);

    const titleClass = useMemo(() => {
        if(!formSubmited) return '';
        return (formValues.title > 0)? 'is-valid' : 'is-invalid'
    }, [formValues.title, formSubmited])


    const onCloseModal = () => {    
        console.log('cerrando modal') 
        setIsOpen(false)
    }

    const onInputChange = ({target})=>{
        setFormValues({...formValues,[target.name]: target.value })
    }
    
    const onDateChanged = (event, changing) => {
        setFormValues({...formValues, [changing]:event})
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        setFormSubmited(true);

        const difference = differenceInSeconds(formValues.end, formValues.end);
        
        if(isNaN(difference ) || difference <=0){
            Swal.fire('Fechas Incorrectas', 'Revisa la fecha', 'error')
            console.log('Error en las fechas')
            return;
        }

        if(formValues.title <= 0) return;
        console.log(formValues);

        //TODO: close modal, remove errors on screen
    }


  return (

   <ReactModal 
        isOpen={isOpen}
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={200}
        onRequestClose={onCloseModal}
        style={customStyles}
    >

    <h1> Nuevo evento </h1>
    <hr />
    <form className="container">

        <div className="form-group mb-2 ">
            <label>Fecha y hora inicio</label>
            <DatePicker selected={formValues.start} className={`form-control ${titleClass}`} onChange={(event) => onDateChanged(event, 'start')} dateFormat='Pp' showTimeSelect/>
        </div>

        <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker minDate={formValues.start} selected={formValues.end} className={`form-control ${titleClass}`} onChange={(event) => onDateChanged(event, 'end')}  dateFormat='Pp' showTimeSelect/>
        </div>

        <hr />
        <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input 
                type="text" 
                className={`form-control ${titleClass}`}
                placeholder="Título del evento"
                name="title"
                value={formValues.title}
                autoComplete="off"
                onChange={onInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
            <textarea 
                type="text" 
                className="form-control"
                placeholder="Notas"
                rows="5"
                name="notes"
                value={formValues.notes}
                onChange={onInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
            type="submit"
            className="btn btn-outline-primary btn-block"
             onClick={onSubmit}
        >
            <i className="far fa-save"></i>
            <span> Guardar</span>
        </button>

    </form>
   </ReactModal>
  )
}

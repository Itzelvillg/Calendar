import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api/calendarAPI";




export const useAuthStore = () =>{
  const dispatch = useDispatch();
  const {status, user, errorMessage} = useSelector(state => state.auth);

  const startLogin= async ({email, password}) =>{
    console.log(email, password);

    try {
      const resp = await calendarApi.post('/auth', {email, password});
      console.log(resp)
    } catch (error) {
      console.log(error)
    }



  }


return{
  status,
  user, 
  errorMessage,
  startLogin
}

}
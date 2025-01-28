import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api/calendarAPI";
import { onChecking, onLogin,onLogout, clearErrorMessage } from "../store/auth/authSlice";




export const useAuthStore = () =>{
  const dispatch = useDispatch();
  const {status, user, errorMessage} = useSelector(state => state.auth);

  const startLogin= async ({email, password}) =>{
    console.log(email, password);
    dispatch(onChecking())
    try {
      const {data} = await calendarApi.post('/auth', {email, password});
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      console.log(data)

      dispatch(onLogin({name: data.name, uid: data.uid}))
    } catch (error) {
      dispatch(onLogout('The credentials are wrong'))

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10);
    }

  }

  const startRegister= async ({name,email, password}) =>{
    console.log(email, password);
    dispatch(onChecking())
    try {
      const {data} = await calendarApi.post('/auth/new', {name, email, password});
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      console.log(data)

      dispatch(onLogin({ name, uid: data.uid}))
    } catch (error) {

 
      
      console.log(error)
      dispatch(onLogout( error.response.data?.msg ||'ERROR- try agaib'))

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10);
    }



  }


return{
  status,
  user, 
  errorMessage,
  startLogin,
  startRegister
}

}
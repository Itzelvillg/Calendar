import { Navigate, Route, Routes } from "react-router"
import { LoginPage } from "../auth/pages/LoginPage"
import { CalendarPage } from "../calendar/pages/CalendarPage"
import { getEnvVariables } from "../helpers/getEnvVariables"
import { useAuthStore } from "../hooks/useAuthStore"
import { useEffect } from "react"


export const AppRouter = () => {



  const {status,checkAuthToken} = useAuthStore();

  useEffect(() => {
    
   checkAuthToken();
  }, []);


  if(status === 'checking'){
    return(
      <h3>Loading...</h3>
    )
  }
  return (
    <Routes>
      {
      (status === 'not-authenticated')
        ?<Route path="/auth/*" element={<LoginPage/>}/>
        :<Route path="/*" element={<CalendarPage/>}/>
      }
      <Route path="/*" element={<Navigate to='/auth/login'/>}/>
      <Route/>
    </Routes>
  )
}

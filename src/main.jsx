import { createRoot } from 'react-dom/client'
import './normalize.css'
import './styles.css'
import { AppRouter } from './router/AppRouter.jsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <AppRouter />
    </BrowserRouter>
  
)

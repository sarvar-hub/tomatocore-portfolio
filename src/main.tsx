import ReactDOM from 'react-dom/client'
import App from '@/components/App'
import '@/index.css'
import { BrowserRouter } from "react-router-dom"
import StoreContextProvider from '@/context/store.context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
)

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { PrimeReactProvider } from 'primereact/api'
import './index.scss'
import 'primeicons/primeicons.css'
import "primereact/resources/themes/lara-light-cyan/theme.css"

createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <App />
  </PrimeReactProvider> 
)
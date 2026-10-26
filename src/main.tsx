import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate } from 'react-router'
import { RouterProvider } from 'react-router'
import { App } from './App.tsx'
import { ViewMain } from './views/ViewMain/ViewMain.tsx'
import { PrimeReactProvider } from 'primereact/api'
import './main.scss'
import 'primeicons/primeicons.css'
import "primereact/resources/themes/lara-light-cyan/theme.css"

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        element: <Navigate to="/main" replace />,
      },
      {
        path: 'main',
        Component: ViewMain
      },
      // {
      //   path: 'login',
      //   Component: ViewLogin
      // }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <RouterProvider router={router} />
  </PrimeReactProvider> 
)
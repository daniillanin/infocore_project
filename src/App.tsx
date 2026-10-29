import './App.scss'
import { Outlet } from 'react-router'
import { DataContextProvider } from './contexts/DataContext'

export function App() {
  return (
    <DataContextProvider>
      <Outlet />
    </DataContextProvider>
  )
}
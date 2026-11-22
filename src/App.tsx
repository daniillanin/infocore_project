import './App.scss'
import type { DataReducerInterface } from './types/DataReducerTypes'
import { GET_LIBRARIES, GET_FOLDERS, GET_PAGES } from './store/actions/DataActions'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet } from 'react-router'
import { DataContextProvider } from './contexts/DataContext'

export function App() {
  const selectedLibrary = useSelector((state: DataReducerInterface) => state.selectedLibrary)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GET_LIBRARIES())
  }, [])

  useEffect(() => {
    if (selectedLibrary) {
      dispatch(GET_FOLDERS(selectedLibrary))
      dispatch(GET_PAGES(selectedLibrary))
    }
  }, [selectedLibrary])

  return (
    <DataContextProvider>
      <Outlet />
    </DataContextProvider>
  )
}
import './AppSidebar.scss'
import type { AppSidebarPropInterface } from './AppSidebarTypes'
import type { DataContextInterface } from '../../types/DataContextTypes'
import { CREATE_PAGE, CREATE_FOLDER, CREATE_LIBRARY } from '../../store/actions/DataActions'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { dataContext } from '../../contexts/DataContext'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'

export default function AppSidebar({visible, setVisible}: AppSidebarPropInterface) {
    const {createLibrary, createPage, createFolder} = useContext<DataContextInterface>(dataContext)
    const dispatch = useDispatch()
    return (
        <Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>
            <div className='sidebar-wrapper'>
                <Button onClick={() => {createLibrary(); dispatch(CREATE_LIBRARY())}} disabled>Создать библиотеку</Button>
                <Button onClick={() => {createPage(); dispatch(CREATE_PAGE())}}>Создать страницу</Button>
                <Button onClick={() => {createFolder(); dispatch(CREATE_FOLDER())}}>Создать папку</Button>
                {/* добавить кнопки перехода в избранное, архив, изменения профиля, выхода */}
            </div>
        </Sidebar>
    )
}
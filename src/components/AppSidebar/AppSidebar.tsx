import './AppSidebar.scss'
import type { AppSidebarPropInterface } from '../../types/AppSidebarTypes'
import type { DataContextInterface } from '../../types/DataContextTypes'
import { useContext } from 'react'
import { dataContext } from '../../contexts/DataContext'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'

export default function AppSidebar({visible, setVisible}: AppSidebarPropInterface) {
    const {createLibrary, createPage, createFolder} = useContext<DataContextInterface>(dataContext)
    return (
        <Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>
            <div className='sidebar-wrapper'>
                <Button onClick={createLibrary}>Создать библиотеку</Button>
                <Button onClick={createPage}>Создать страницу</Button>
                <Button onClick={createFolder}>Создать папку</Button>
                <p>наполнение сайдбара</p>
                {/* добавить кнопки перехода в избранное, архив, изменения профиля, выхода */}
            </div>
        </Sidebar>
    )
}
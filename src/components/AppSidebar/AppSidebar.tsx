import './AppSidebar.scss'
import type { AppSidebarPropInterface } from './AppSidebarTypes'
import { CREATE_PAGE, CREATE_FOLDER, CREATE_LIBRARY } from '../../store/actions/DataActions'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import { AppConfirm } from '../AppConfirm/AppConfirm'

export default function AppSidebar({visible, setVisible}: AppSidebarPropInterface) {
    const [ visibleConfirm, setVisibleConfirm ] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>
                <div className='sidebar-wrapper'>
                    <Button onClick={() => {dispatch(CREATE_LIBRARY())}} disabled>Создать библиотеку</Button>
                    <Button onClick={() => {dispatch(CREATE_PAGE())}}>Создать страницу</Button>
                    <Button onClick={() => {setVisibleConfirm(true)}}>Создать папку</Button>
                    {/* добавить кнопки перехода в избранное, архив, изменения профиля, выхода */}
                </div>
            </Sidebar>
            <AppConfirm
                visibleConfirm={visibleConfirm}
                setVisibleConfirm={setVisibleConfirm}
                titleConfirm='Создать папку?'
                onSaveButton={() => dispatch(CREATE_FOLDER())}>
            </AppConfirm>
        </>
        
    )
}
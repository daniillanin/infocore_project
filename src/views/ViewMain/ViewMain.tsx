import './ViewMain.scss'
import type { DataContextInterface } from '../../types/DataContextTypes'
import { useState, useContext } from 'react'
import { dataContext } from '../../contexts/DataContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { AppTree } from "../../components/AppTree/AppTree"
import { AppTreeFolders } from '../../components/AppTreeFolders/AppTreeFolders'
import { AppNavbar } from "../../components/AppNavbar/AppNavbar"
import { AppFooter } from '../../components/AppFooter/AppFooter'
import { AppStructure } from "../../components/AppSrtucture/AppSrtucture"
import { AppPage } from '../../components/AppPage/AppPage'

export function ViewMain() {
    const { selectedNode, selectedNodeMove, moveItem } = useContext<DataContextInterface>(dataContext)
    const [ visibleDialog, setVisibleDialog ] = useState(false)

    const buttonDialog = () => {

        const foldersOrDefault = () => {
            if (selectedNodeMove) {
                return <Button onClick={moveItem}>Сохранить</Button>
            } else {
                return <Button onClick={() => console.log('корень')}>В корень</Button>
            }
        }

        return (
            <>
                <Button onClick={() => setVisibleDialog(false)}>Отменить</Button>
                {foldersOrDefault()}
            </>
        )
    }

    const visibleNode = () => {
        switch (selectedNode?.data?.type) {
            case 'folder':
                return <AppStructure setDialog={setVisibleDialog}/>;
            case 'page':
                return <AppPage setDialog={setVisibleDialog}/>;
            default:
                return <p>прописать компонент заглушки</p>  
        }
    }

    return (
        <>
        <div className='viewmain-wrapper'>
            <AppNavbar/>
            <div className='viewmain-wrapper-main'>
                <AppTree/>
                <div className='viewmain-content'>
                    {visibleNode()}
                </div>
            </div>
            <AppFooter />
        </div>
        <Dialog
        header="Выберите папку для перемещения"
        footer={buttonDialog}
        visible={visibleDialog}
        style={{ width: '50vw' }}
        onHide={() => {if (!visibleDialog) return; setVisibleDialog(false)}}>
            <AppTreeFolders/>
        </Dialog>
        </>
    )
}
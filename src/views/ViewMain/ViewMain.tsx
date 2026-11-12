import './ViewMain.scss'
import type { DataContextInterface } from '../../types/DataContextTypes'
import { useContext } from 'react'
import { dataContext } from '../../contexts/DataContext'
import { AppTree } from "../../components/AppTree/AppTree"
import { AppNavbar } from "../../components/AppNavbar/AppNavbar"
import { AppFooter } from '../../components/AppFooter/AppFooter'
import { AppStructure } from "../../components/AppSrtucture/AppSrtucture"
import { AppPage } from '../../components/AppPage/AppPage'

export function ViewMain() {
    const { selectedNode } = useContext<DataContextInterface>(dataContext)

    const visibleNode = () => {
        switch (selectedNode?.data?.type) {
            case 'folder':
                return <AppStructure/>;
            case 'page':
                return <AppPage/>;
            default:
                return <p>прописать компонент заглушки</p>  
        }
    }

    return (
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
    )
}
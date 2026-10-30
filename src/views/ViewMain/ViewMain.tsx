import './ViewMain.scss'
import { useContext } from 'react'
import { dataContext } from '../../contexts/DataContext'
import { AppTree } from "../../components/AppTree/AppTree"
import { AppNavbar } from "../../components/AppNavbar/AppNavbar"
import { AppFooter } from '../../components/AppFooter/AppFooter'
import { AppStructure } from "../../components/AppSrtucture/AppSrtucture"
import { AppPage } from '../../components/AppPage/AppPage'

export function ViewMain() {
    const { selectedNode } = useContext(dataContext)
    return (
        <div className='viewmain-wrapper'>
            <AppNavbar/>
            <div className='viewmain-wrapper-main'>
                <AppTree/>
                <div className='viewmain-content'>
                    {selectedNode && selectedNode.data.type === 'folder' ? <AppStructure /> : <AppPage/>}
                </div>
            </div>
            <AppFooter />
        </div>
    )
}
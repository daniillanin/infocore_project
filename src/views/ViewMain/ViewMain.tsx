import './ViewMain.scss'
import { AppTree } from "../../components/AppTree/AppTree"
import { AppNavbar } from "../../components/AppNavbar/AppNavbar"
import { AppFooter } from '../../components/AppFooter/AppFooter'
import { AppStructure } from "../../components/AppSrtucture/AppSrtucture"

export function ViewMain() {
    return (
        <div className='viewmain-wrapper'>
            <AppNavbar/>
            <div className='viewmain-wrapper-main'>
                <AppTree/>
                <div className='viewmain-content'>
                    <AppStructure />
                </div>
            </div>
            <AppFooter />
        </div>
    )
}
import './AppNavbar.scss'
import { Component } from 'react'
import { dataContext } from '../../contexts/DataContext'
import { Avatar } from 'primereact/avatar'
import { Dropdown } from 'primereact/dropdown'
import AppSidebar from '../AppSidebar/AppSidebar'

export class AppNavbar extends Component {
    static contextType = dataContext
    state = {
        selectedLibrary: null,
        visibleSidebar: false
    }
    setSelectedLibrary = (value: string): void => {
        this.setState(() => ({
            selectedLibrary: value
        }))
    }
    setVisibleSidebar = (value: boolean): void => {
            this.setState(() => ({
            visibleSidebar: value
        }))
    }
    componentDidUpdate(prevProps, prevState): void {
        if (prevState.selectedLibrary !== this.state.selectedLibrary) {
            this.context.setSelectedLibrary(this.state.selectedLibrary)
        }
    }
    render() {
        return (
            <div className='navbar-wrapper'>
                <img src="./src/assets/logo.png" alt="" />
                <Dropdown
                    value={this.state.selectedLibrary}
                    onChange={(e) => this.setSelectedLibrary(e.value)}
                    options={this.context.libraries}
                    optionLabel='name' 
                    placeholder='Выберите библиотеку'
                    className='navbar-dropdown'
                    checkmark={true}
                    highlightOnSelect={false}
                />
                <div className='navbar-wrapper-avatar'>
                    <Avatar image="./src/assets/IMG_3091.JPG" size="large" shape="circle" onClick={() => this.setVisibleSidebar(true)}/>
                    {/* <p>добавить инфо user</p> */}
                </div>
                <AppSidebar visible={this.state.visibleSidebar} setVisible={this.setVisibleSidebar}/>
            </div>
        ) 
    }
}
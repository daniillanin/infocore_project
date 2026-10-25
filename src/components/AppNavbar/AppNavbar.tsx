import { Component } from 'react'
import './AppNavbar.scss'
import { Avatar } from 'primereact/avatar'
import { Dropdown } from 'primereact/dropdown'

export class AppNavbar extends Component {
    state = {
        libraries: [
            {id: '254425', name: 'One', key: 'ON'},
            {id: 'wer345', name: 'Two', key: 'TW'},
        ],
        selectedLibrary: ''
    }
    setSelectedLibrary = (value: string): void => {
        this.setState(() => ({
            selectedLibrary: value
        }))
    }

    render() {
        return (
            <div className='navbar-wrapper'>
                <img src="./src/assets/logo.png" alt="" />
                <Dropdown
                    value={this.state.selectedLibrary}
                    onChange={(e) => this.setSelectedLibrary(e.value)}
                    options={this.state.libraries}
                    optionLabel='name' 
                    placeholder='Выберите библиотеку'
                    className='navbar-dropdown'
                    checkmark={true}
                    highlightOnSelect={false}
                />
                <div className='navbar-wrapper-avatar'>
                    <Avatar image="./src/assets/IMG_3091.JPG" size="large" shape="circle" />
                    {/* <p>добавить инфо user</p> */}
                </div>
            </div>
        ) 
    }
}
import { Component } from 'react'
import './AppNavbar.scss'
import { Avatar } from 'primereact/avatar'
import { Dropdown } from 'primereact/dropdown'


export class AppNavbar extends Component {
    state = {
        libraries: [
            {id: '254425', name: 'One', key: '1'},
            {id: 'wer345', name: 'Two', key: '2'},
        ],
        selectedLibrary: ''
    }
    setSelectedLibrary = (value: string): void => {
            this.setState(() => ({
                selectedDirection: value                               
            }))
        } 

    render() {
        return (
            <div className='navbar-wrapper'>
                <p>icon</p>
                <Dropdown
                    value={this.state.selectedLibrary}
                    onChange={(e) => this.setSelectedLibrary(e.value)}
                    options={this.state.libraries}
                    optionLabel="name" 
                    placeholder="Направление"
                    className='navbar-dropdown'
                    checkmark={true}
                    highlightOnSelect={true}
                />
                <div className='navbar-avatar-wrapper'>
                    <Avatar image="./src/assets/IMG_3091.JPG" size="large" shape="circle" />
                    <p>Добавить ФИО</p>
                </div>
            </div>
        ) 
    }
}
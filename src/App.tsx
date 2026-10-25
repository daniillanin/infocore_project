import './App.scss'
import { AppTree } from './components/AppTree/AppTree'
import { AppNavbar } from './components/AppNavbar/AppNavbar'

function App() {
  return (
    <div className='app-wrapper'>
      <AppNavbar/>
      <div className='app-wrapper-main'>
        <AppTree/>
        <div className='app-content'>
          содержание основного блока
        </div>
      </div>
      {/* место для футера */}
    </div>
  )
}

export default App

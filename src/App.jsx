import './App.css'
import { NavLink, Outlet } from 'react-router-dom'
import NavBar from './Navbar.jsx'

function App() {
  

  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}

export default App

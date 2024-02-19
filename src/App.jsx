import { NavLink, Outlet } from 'react-router-dom'
import NavBar from './Navbar.jsx'
import Table from './Table.jsx'

function App() {
  

  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}

export default App

import './App.css'
import { NavLink, Outlet } from 'react-router-dom'

function App() {
  

  return (
    <>
      <header>
        <ul className="nav-links">
          <li>
                <NavLink className="Home" to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink className="linksL" to="/to-do">To-Do</NavLink>
              </li>
              <li>
                <NavLink className="links" to="/trips">Trips</NavLink>
              </li>
              <li>
                <NavLink className="links" to="/past-trips">past</NavLink>
              </li>
        </ul>
      </header>
      <Outlet/>
    </>
  )
}

export default App

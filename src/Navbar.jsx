import "./Navbar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import TSLogo from '/appImages/TSLogo.png';
import Hamburger from './assets/hamburger.svg';

const NavBar = () => {

  const [showNavbar, setShowNavbar] = useState(false)
  
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  
  return (
    <nav className="navbar tab-content">
      <div className="navContainer">
        <div>
          <img src={TSLogo} alt="Logo" className="logo"/>
        </div>
        <div className="appName">TripSync</div>
        <div className="menu-icon-container" onClick={handleShowNavbar}>
          <img src={Hamburger} alt='Hamburger menu' className="menu-icon" />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
              <li>
                <NavLink className="links" to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink className="links" to="/to-do">To-Do</NavLink>
              </li>
              <li>
                <NavLink className="links" to="/trips">Trips</NavLink>
              </li>
              <li>
                <NavLink className="links" to="/past-trips">past</NavLink>
              </li>
              <li>
                <NavLink className="links" to="/settings">
                  <img
                    className="settings-2-icon"
                    loading="eager"
                    alt="settings icon"
                    src="../public/appImages/settings.png"
                  />
                </NavLink>
              </li>
              <li>
                <NavLink className="links" to="/user">
                  <img
                    className="user-2-icon"
                    loading="eager"
                    alt="user icon"
                    src="../public/appImages/user.png"
                  />
                </NavLink>
              </li>
            </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

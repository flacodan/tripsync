import "./App.css";
import { NavLink } from "react-router-dom";
import TSLogo from '../public/appImages/TSLogo.png';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navContainer">
        <div>
          <img src={TSLogo} alt="Logo" className="logo"/>
        </div>
        <div className="appName">TripSync</div>
        <div className="nav-elements">
          <ul>
              <li>
                <NavLink className="Home" to="/home">Home</NavLink>
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
            </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;


{/* <div className="navbar">
      <img className="navbar-child" alt="" />
      <div className="appName">TripSync</div>
      <div className="home1">{`Home `}</div>
      <div className="to-do1">To-Do</div>
      <div className="trips1">Trips</div>
        <img
          className="user-2-icon"
          loading="eager"
          alt="user icon"
          src="../public/appImages/user.png"
        />
        <img
          className="settings-2-icon"
          loading="eager"
          alt="settings icon"
          src="../public/appImages/settings.png"
        />
      <section className="frame-container">
        <div className="tab-content" />
        <img 
        className="logo" 
        src="../public/appImages/TSLogo.png" 
        alt="logo" />
      </section>
    </div> */}
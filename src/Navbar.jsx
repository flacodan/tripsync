import "./Navbar.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TSLogo from '/appImages/TSLogo.png';
import { HiOutlineMenu } from "react-icons/hi";


const NavBar = () => {

  const [showNavbar, setShowNavbar] = useState(false);
  const [trips, setTrips] = useState([]);
  
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await fetch("/api/getUsersOpenTrips");
      const data = await response.json();
      setTrips(data); 
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };
  
  return (
    <nav className="navbar tab-content">
      <div className="navContainer">
        <div>
          <img src={TSLogo} alt="Logo" className="logo"/>
        </div>
        <div className="appName">TripSync</div>
        <div className="menu-icon-container" onClick={handleShowNavbar}>
          <HiOutlineMenu className="menu-icon"/>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
              <li>
                <NavLink className="links" to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink className="links" to="/to-do">To-Do</NavLink>
              </li>
              <li className="dropdownNav">
                <span className="tripBtn">Trips</span>
                <div className="dropdown-content">
                  {trips.length > 0 ? (
                    trips.map((trip) => (
                      <NavLink 
                        key={trip.trip_id} 
                        to={`/trips/${trip.trip_id}`}
                        className="links"
                        onClick={window.location.reload}
                      >
                        {trip.trip_name}
                      </NavLink>
                    ))
                  ) : (
                    <p>Loading trips...</p>
                  )}
                  <NavLink className="links" to="/past-trips">Past Trips</NavLink>
                </div>
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

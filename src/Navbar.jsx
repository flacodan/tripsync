import "./App.css";

const NavBar = () => {
  return (
    <div className="navbar">
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
    </div>
  );
};

export default NavBar;

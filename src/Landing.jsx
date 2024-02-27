import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Landing() {

    const navigate = useNavigate();

    const getStarted = () => {
        navigate('/sign-up');
    }
  return (
    <div className="landing">
        <section className="slogan">
            <h1>Seamless Planning, <br/> Unforgettable Memories. </h1>
            
        </section>
        <section className="landing-description">
            <h3>TripSync is dedicated to simplifying your travel aspirations. <br/> With us, embark on a journey where coordination meets <br/> adventure. </h3>
        </section>
        <section className="signUp">
            <div onClick={getStarted} className='get-started-btn'>
                <h4 className='sign-up-link'>Get Started</h4>
            </div>
        </section>
        <section className="signIn">
            <h4>Already joined a TripSync group?</h4>
            <Link className='sign-in-link' to="/sign-in">Sign in</Link>
            {/* <h4> to enter your invite code</h4> */}
        </section>
        <section className="birds">
            <img className='brd-img' src="../public/appImages/birds.png" alt="birds" />
        </section>
        <section className="balloon">
            <img className='balloon-img' src="../public/appImages/balloon.png" alt="birds" />
        </section>
    </div>
  );
}

export default Landing;

import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
        <section className="slogan">
            <h1>Seamless Planning,</h1>
            <h1>Unforgettable Memories.</h1>
        </section>
        <section className="description">
            <h3>TripSync is dedicated to simplifying your travel aspirations.</h3>
            <h3>With us, embark on a journey where coordination meets</h3>
            <h3>adventure.</h3>
        </section>
        <section className="signUp">
            <div>
                <Link to="/sign-up">Get Started</Link>
            </div>
        </section>
        <section className="signIn">
            <h4>Already joined a TripSync group?</h4>
            <Link to="/sign-in">Sign in</Link>
            <h4> to enter your invite code</h4>
        </section>
    </div>
  );
}

export default Landing;

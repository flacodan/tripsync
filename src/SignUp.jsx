import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');
    const [signedUp, setSignedUp] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();  
        setSignedUp(true);
        e.preventDefault();
        console.log('signed up successfully');
        let userBod = {
            username: email,
            password: password
        }
        axios.post('/api/signUp', userBod)
        .then((response) => {
            console.log(response.data);
            if (response.data) {
                // setSignedUp(true);
                navigate('/sign-in')
            }
        })
        console.log('submitted');
    }

    return (
        <>

            {!signedUp ? (
                    <div className='sign-up-page'>
                        <section className='sign-up-container '>
                        <img src='../public/appImages/TSLogo.png' alt="Logo" className="logo-sign-up"/>
                        <div className="appName-sign-up">
                            <h1>TripSync</h1>
                        </div>
                        <form className='sign-up-form'>
                        <h1 className='sign-up-txt'>Create your Account</h1>
                            <label className='usernm-txt' htmlFor="email">Email/Username:</label>
                            <input
                                className='usernm-input'
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
            
                            <label className='pass-txt' htmlFor="password">Password:</label>
                            <input
                                className='pass-input'
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
            
                            <button className='sign-in-submit' onClick={handleSubmit} type="submit">Sign Up</button>
                            <h4 className='sign-up-redirect-title'>Already have an account?</h4>
                                <Link className='sign-up-redirect' to="/sign-in">Sign In</Link>
                        </form>
                        </section>
                    </div>
                ) : (
                    <div>
                        <h1>Sign Up</h1>
                        <h2>Thanks for signing up!</h2>
                        <Link to="/Home" >Proceed to Homepage</Link>
                    </div>
                )
            }
                
        </>

    )
}




export default SignUp

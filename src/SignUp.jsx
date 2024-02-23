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
                    <div>
                        <h1>Sign Up</h1>
                        <form>
                            <label htmlFor="email">Email/Username:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
            
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
            
                            <button onClick={handleSubmit} type="submit">Sign Up</button>
                        </form>
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

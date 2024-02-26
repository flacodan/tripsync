
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import  {Link}  from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signedIn, setSignedIn] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userBody = {
            username: username,
            password: password
        }
        axios.post('/api/signIn', userBody)
        .then((response) => {
            console.log(response.data);
            if (response.data) {
                setSignedIn(true);
                navigate('/home', { state: { userObj: response.data }});
                console.log("Sending from login " + JSON.stringify(response.data));
                //Sending from login {"user":{"user_id":1,"username":"user0@test.com","password":"test"},"success":true}
            }
        })
        console.log('submitted');
    };

    return (
        <>

            {!signedIn ? (
                    <div>
                        <h1>Welcome Back!</h1>
                        <h2>Sign in below</h2>
                        <form>
                            <label htmlFor="email">Email/Username:</label>
                            <input
                                type="email"
                                id="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
            
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
            
                            <button onClick={handleSubmit} type="submit">Sign In</button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h1>Welcome Back!</h1>
                        <h2>Thanks for signing in!</h2>
                        <Link to="/to-do" >Proceed</Link>
                    </div>
                )
            }
                
        </>

    )
    
};
    export default SignIn;

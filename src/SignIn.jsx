
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signedIn, setSignedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userBody = {
            username: username,
            password: password
        }
        axios.post('/api/signIn', userBody)
        .then((response) => {
            console.log(response.data);
            setSignedIn(true);
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


//   return (
    //     <div>
    //       <h1>Login</h1>
    //       <form onSubmit={handleSubmit}>
    //         <label htmlFor="email">Email:</label>
    //         <input
    //           type="email"
    //           id="email"
    //           value={email}
    //           onChange={handleEmailChange}
    //         />
    
    //         <label htmlFor="password">Password:</label>
    //         <input
    //           type="password"
    //           id="password"
    //           value={password}
    //           onChange={handlePasswordChange}
    //         />
    
    //         <button type="submit">Sign In</button>
    //       </form>
    //     </div>
    //   );
    // };
    
    // return (
    //     <div>
    //         <h1>Login</h1>
    //         <form onSubmit={handleSubmit}>
    //             <label htmlFor="email">Email:</label>
    //             <input
    //                 type="email"
    //                 id="email"
    //                 value={email}
    //                 onChange={handleEmailChange}
    //             />
    
    //             <label htmlFor="password">Password:</label>
    //             <input
    //                 type="password"
    //                 id="password"
    //                 value={password}
    //                 onChange={handlePasswordChange}
    //             />
    
    //             <button type="submit">Sign In</button>
    //         </form>
    //     </div>
    // );
    export default SignIn;

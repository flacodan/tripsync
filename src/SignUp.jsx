import React from 'react';

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="name" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

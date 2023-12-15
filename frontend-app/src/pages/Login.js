import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Implement login logic here
        // You may use fetch or Axios to communicate with the server
        // Check credentials and get a token
        // Redirect to dashboard or show an error
    };

    return (
        <div>
            

            <div className="login-container">
                <h2>Login</h2>
                <div className="login-form">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="login-form">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="login-button" onClick={handleLogin}>Login</button>
                {error && <p className="error-message">{error}</p>}

                <p className="signup-link">Don't have an account? <Link to="/signup" className='signup'>Sign up</Link></p>
            </div>
            

        </div>
    );
};

export default Login;

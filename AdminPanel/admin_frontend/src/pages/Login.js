import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configuration from '../config/config';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [ipAddress, setIpAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${configuration.token}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.IPv4)
                setIpAddress(data.IPv4);
            })
            .catch(error => console.error('Error fetching IP address:', error));
    }, []);

    const handleLogin = () => {
        axios.post(`${configuration.localhostBackend}/api/v1/login`, {
            email: email,
            password: password,
            ip: ipAddress,
        })
            .then(response => {
                var successMessage = response.data.message;
                if (successMessage) {
                    toast.success(successMessage, {
                        onClose: () => {
                            setTimeout(() => {
                                window.location.href = '/dashboard';
                              }, 1000);
                            // window.location.href = '/Dashboard';
                        },
                    });
                    const token = response.data.token;

                    localStorage.setItem('token', token);

                } else {
                    var errorMessage = response.data.error;
                    if (errorMessage) {
                        toast.error(errorMessage);
                    }
                }
            })
            .catch(err => {
                console.error('Error during login:', err);
                toast.error('Invalid credentials. Please try again.');
            });
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
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="toggle-password-button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 'Hide' : 'Show'} Password
                    </button>
                </div>
                <button className="login-button" onClick={handleLogin}>
                    Login
                </button>

                <ToastContainer />

                <p className="signup-link">
                    Don't have an account? <Link to="/register" className="signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

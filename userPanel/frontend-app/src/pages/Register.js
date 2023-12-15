
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Register.css';
import configuration from '../config/config';

const Register = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();


  const handleRegister = async () => {
    try {
      const response = await axios.post(`${configuration.localhostBackend}/api/v1/register`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      if (!response) {
        // Handle the case where the response is undefined
        toast.error('An unexpected error occurred. Please try again later.');
        return;
      }

      console.log(response);

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      console.log(response.data.message);

      if (response.data.message) {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 3000, // 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            setTimeout(() => {
              window.location.href = '/login';
            }, 1000);
          },
        });
      }
    } catch (error) {
      // Handle other errors, e.g., network issues
      toast.error('Email is already registered.');
      // console.error('Registration error:', error);
    }
  };


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div>
      <div className='container-fluid text-white'>
        <div className='row min-vh-100 align-items-center home-banner-section'>
          <div className='col'>
            <div className="register-container">
              <h2>Register</h2>
              <div className="register-form">
                <div className="form-group">
                  <label>First Name:</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {confirmPasswordVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
                <button className="register-button" onClick={handleRegister}>
                  Register
                </button>
              </div>
              <ToastContainer />
              <p className="login-link">
                Already have an account? <Link to="/login" className="signin">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

// Profile.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/Profile.css'; // Import the CSS file for styling
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdate = () => {
    // Add logic to handle the update (e.g., send data to the server)
    if (firstName === '' || lastName === '') {
      toast.error('First Name and Last Name must not be empty');
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must be 8 or longer, contain at least one special character, one number, and one uppercase letter'
      );
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    var token = localStorage.getItem('token');

    // Create an object with the data to send
    const requestData = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      token: token,
    };

    // Example server endpoint URL, replace it with your actual endpoint
    const endpointURL = 'http://localhost:3001/api/v1/update';

    // Make an Axios POST request
    axios
      .post(endpointURL, requestData)
      .then((response) => {
        console.log('Update successful:', response.data.message);
        var successMessage = response.data.message;
        if (successMessage) {
          toast.success(successMessage, {
            position: 'top-right',
            autoClose: 3000, // 3 seconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose: () => {
              // Delayed redirection after 1 second
              setTimeout(() => {
                window.location.href = '/';
              }, 1000);
            },
          });
          localStorage.removeItem('token');
        }
      })
      .catch((error) => {
        console.error('Error during update:', error);
      });
  };

  return (
    <div className='container-fluid text-white'>
    <div className='row min-vh-100 align-items-center home-banner-section'>
        <div className='col'>
    <div className="profile-container">
      <h2>Profile</h2>

      {/* Input fields for first name, last name, password, and confirm password */}
      <div className="profile-form">
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
        />
      </div>

      <div className="profile-form">
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
        />
      </div>

      <div className="profile-form">
        <label>Password:</label>
        <input
          type={showPassword ? 'text' : 'password'} // Toggle between text and password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {/* Button to toggle password visibility */}
        <button
          className="toggle-password-button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'} Password
        </button>
      </div>

      <div className="profile-form">
        <label>Confirm Password:</label>
        <input
          type={showConfirmPassword ? 'text' : 'password'} // Toggle between text and password
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />
        {/* Button to toggle confirm password visibility */}
        <button
          className="toggle-password-button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? 'Hide' : 'Show'} Confirm Password
        </button>
      </div>
      <ToastContainer />

      {/* Button to trigger the update */}
      <button className="update-button" onClick={handleUpdate}>
        Update
      </button>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Profile;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'; // Import the CSS file for styling

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true when the user is logged in

    const handleLogout = () => {
        // Implement logout logic here
        // You may clear user session, update state, etc.
        setIsLoggedIn(false);
    };

    return (
        <header className="app-header">
            <nav className="dashboard-navbar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;

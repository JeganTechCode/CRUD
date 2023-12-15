import React from 'react';
import '../css/Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Your App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

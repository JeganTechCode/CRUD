const axios = require('axios');
const bcrypt = require('bcrypt');
const User = require('../model/UserSchema');

const Register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Check for required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Password validation
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      return res.status(400).json({ error: 'Password must contain only letters and numbers.' });
    } else if (!/[0-9]/.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one digit.' });
    } else if (!/[a-zA-Z]/.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one letter.' });
    } else if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    } else if (!/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/.test(password)) {
      return res.status(400).json({ error: 'Password cannot contain full alphabets, numbers, or special characters.' });
    } else if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Password and confirm password do not match.' });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with first name, last name, email, and hashed password
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { Register };

const axios = require('axios');
const bcrypt = require('bcrypt');
const User = require('../model/UserSchema');
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const mongoose = require('mongoose');


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
    const existingUser = await User.findOne({ email: email });
    console.log(existingUser, "existingUser");
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    } else {

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with first name, last name, email, and hashed password
      const newUser = new User({ firstName, lastName, email, password: hashedPassword });

      // Save the new user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully.' });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const Login = async (req, res) => {

  try {
    const { email, password, ip } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: 'Invalid email or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: '24h',
    });

    console.log('token----', token);

    // Update lastLoginIP
    const loginIpAddressUpdated = await User.findByIdAndUpdate(
      { _id: user._id },
      { $set: { lastLoginIP: token } }
    );

    console.log('loginIpAddressUpdated----', loginIpAddressUpdated);

    if (loginIpAddressUpdated) {
      // If loginIpAddressUpdated is truthy (meaning it was updated), send success response
      res.status(200).json({ message: 'Login successful.', status: true, token, results: loginIpAddressUpdated });
    } else {
      // If loginIpAddressUpdated is falsy (meaning it was not updated), send an error response
      res.status(500).json({ error: 'Failed to update lastLoginIP.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  const { userId } = req.params; // Assuming you pass userId in the route parameters
  const { firstName, lastName, password, token } = req.body;
  console.log(req.body, 'id', req.params);
  try {
    // Validate if userId is a valid ObjectId (assuming you are using MongoDB)
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).json({ error: 'Invalid user ID' });
    // }

    // Find the user by ID
    const user = await User.findOne({ lastLoginIP: token });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user properties
    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    if (password) {
      // Hash and update the password (assuming you use bcrypt for password hashing)
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error during user update:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { Register, Login, update };

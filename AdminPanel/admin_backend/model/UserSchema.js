const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
  },
  lastLoginIP:{
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // Add any other fields you may need for your user schema
  // For example, you might want to include a role field for user roles.
});

// Middleware to update the `updatedAt` field before saving
userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
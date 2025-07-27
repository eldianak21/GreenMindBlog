const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../config/email');
const { generateToken } = require('../utils/generateToken');
require('dotenv').config();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userId = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    await User.updateVerificationCode(userId, verificationCode);

    // Send verification email
    const emailText = `Your verification code is: ${verificationCode}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #013237;">Welcome to GreenMind Blog!</h2>
        <p>Please verify your email address by entering the following code:</p>
        <div style="background-color: #EAF9E7; padding: 15px; text-align: center; margin: 20px 0; font-size: 24px; font-weight: bold; color: #4CA771;">
          ${verificationCode}
        </div>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `;

    await sendEmail(email, 'Verify Your Email', emailText, emailHtml);

    res.status(201).json({
      message: 'User registered successfully. Please check your email for verification code.'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Verify user email
// @route   POST /api/auth/verify
// @access  Public
const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check verification code
    if (user.verification_code !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Update user as verified
    await User.updateVerification(user.id, true);
    await User.updateVerificationCode(user.id, null);

    // Generate token
    const token = generateToken(user.id);

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: true
      }
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Server error during email verification' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is verified
    if (!user.is_verified) {
      return res.status(401).json({ 
        message: 'Email not verified',
        email: user.email
      });
    }

    // Generate token
    const token = generateToken(user.id);

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profile_picture,
        isVerified: user.is_verified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Forgot password - send reset email
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check for user
    const user = await User.findByEmail(email);
    if (!user) {
      // Don't reveal if user doesn't exist for security
      return res.status(200).json({ message: 'If an account exists with this email, you will receive a reset link.' });
    }

    // Generate reset token
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

    // Save token to database
    await User.updateResetToken(user.id, resetToken, expiresAt);

    // Send reset email
    const emailText = `You requested a password reset. Click the link to reset your password: ${resetUrl}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #013237;">Password Reset Request</h2>
        <p>You requested to reset your password. Click the button below to proceed:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetUrl}" style="background-color: #4CA771; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request this, please ignore this email.</p>
        <p style="font-size: 12px; color: #757575;">Or copy and paste this link into your browser: ${resetUrl}</p>
      </div>
    `;

    await sendEmail(email, 'Password Reset Request', emailText, emailHtml);

    res.status(200).json({ message: 'If an account exists with this email, you will receive a reset link.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error during password reset request' });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token exists in database and is not expired
    const user = await User.findByResetToken(token);
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password and clear reset token
    await User.updatePassword(user.id, hashedPassword);

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Token has expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Server error during password reset' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      profilePicture: user.profile_picture,
      bio: user.bio,
      isVerified: user.is_verified
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error getting user profile' });
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  getMe
};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config();

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Create user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, verification_token) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, verificationToken]
    );

    const userId = result.insertId;

    // Create user profile
    await pool.query('INSERT INTO user_profiles (user_id) VALUES (?)', [userId]);

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const message = `Please verify your email by clicking on this link: ${verificationUrl}`;

    await sendEmail({
      email: email,
      subject: 'Email Verification',
      message: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #013237;">Welcome to GreenMind Blog!</h2>
          <p>Please verify your email address to complete your registration.</p>
          <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CA771; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">Verify Email</a>
          <p>If you didn't create an account with us, please ignore this email.</p>
        </div>
      `
    });

    res.status(201).json({
      message: 'User registered successfully. Please check your email for verification.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Verify email
// @route   POST /api/auth/verify-email
// @access  Public
const verifyEmail = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by email and token
    const [user] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND verification_token = ?',
      [decoded.email, token]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Update user as verified
    await pool.query(
      'UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?',
      [user[0].id]
    );

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Token has expired' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/signin
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user[0].is_verified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    // Generate token
    const token = generateToken(user[0].id);

    // Get user profile
    const [profile] = await pool.query('SELECT * FROM user_profiles WHERE user_id = ?', [user[0].id]);

    res.status(200).json({
      token,
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        avatar: profile[0]?.avatar_url || null,
        bio: profile[0]?.bio || null
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '10m' });
    const resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with reset token
    await pool.query(
      'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?',
      [resetToken, resetTokenExpires, user[0].id]
    );

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const message = `You requested a password reset. Click this link to reset your password: ${resetUrl}`;

    await sendEmail({
      email: email,
      subject: 'Password Reset Request',
      message: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #013237;">Password Reset Request</h2>
          <p>You have requested to reset your password. Click the button below to proceed.</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CA771; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
          <p>This link will expire in 10 minutes. If you didn't request a password reset, please ignore this email.</p>
        </div>
      `
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by id and token
    const [user] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND reset_token = ? AND reset_token_expires > NOW()',
      [decoded.id, token]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password and clear reset token
    await pool.query(
      'UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
      [hashedPassword, user[0].id]
    );

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Token has expired' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword
};
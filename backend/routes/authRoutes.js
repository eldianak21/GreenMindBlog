const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/auth/verify
// @desc    Verify user email
// @access  Public
router.post('/verify', authController.verifyEmail);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.login);

// @route   POST /api/auth/forgot-password
// @desc    Forgot password - send reset email
// @access  Public
router.post('/forgot-password', authController.forgotPassword);

// @route   POST /api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', authController.resetPassword);

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authController.getMe);

module.exports = router;
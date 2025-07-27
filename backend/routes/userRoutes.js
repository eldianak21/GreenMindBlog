const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

// @route   GET /api/users/:id
// @desc    Get user profile
// @access  Public
router.get('/:id', userController.getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, upload.single('profilePicture'), userController.updateProfile);

// @route   GET /api/users/search
// @desc    Search users
// @access  Public
router.get('/search', userController.searchUsers);

// @route   GET /api/users/dashboard/stats
// @desc    Get user dashboard stats
// @access  Private
router.get('/dashboard/stats', protect, userController.getDashboardStats);

module.exports = router;
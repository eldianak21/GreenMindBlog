
const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/follow/:userId
// @desc    Follow or unfollow a user
// @access  Private
router.post('/:userId', protect, followController.toggleFollow);

// @route   GET /api/users/:userId/followers
// @desc    Get followers for a user
// @access  Public
router.get('/users/:userId/followers', followController.getFollowers);

// @route   GET /api/users/:userId/following
// @desc    Get users a user is following
// @access  Public
router.get('/users/:userId/following', followController.getFollowing);

module.exports = router;
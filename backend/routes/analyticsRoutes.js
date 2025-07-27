const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/analytics/posts/:postId
// @desc    Get post analytics
// @access  Private
router.get('/posts/:postId', protect, analyticsController.getPostAnalytics);

// @route   GET /api/analytics/user
// @desc    Get user analytics
// @access  Private
router.get('/user', protect, analyticsController.getUserAnalytics);

module.exports = router;
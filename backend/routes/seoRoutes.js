const express = require('express');
const router = express.Router();
const seoController = require('../controllers/seoController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/seo/posts/:postId
// @desc    Get SEO data for a post
// @access  Private
router.get('/posts/:postId', protect, seoController.getPostSEOData);

// @route   GET /api/seo/top-keywords
// @desc    Get top performing keywords
// @access  Private
router.get('/top-keywords', protect, seoController.getTopKeywords);

// @route   GET /api/seo/opportunities
// @desc    Get keyword opportunities
// @access  Private
router.get('/opportunities', protect, seoController.getKeywordOpportunities);

module.exports = router;
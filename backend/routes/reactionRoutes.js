const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/reactions
// @desc    Add or update a reaction to a post or comment
// @access  Private
router.post('/', protect, reactionController.addReaction);

// @route   GET /api/reactions
// @desc    Get reactions for a post or comment
// @access  Public
router.get('/', reactionController.getReactions);

module.exports = router;
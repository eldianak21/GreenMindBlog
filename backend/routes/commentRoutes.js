const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/posts/:postId/comments
// @desc    Get comments for a post
// @access  Public
router.get('/posts/:postId/comments', commentController.getComments);

// @route   POST /api/posts/:postId/comments
// @desc    Add a comment to a post
// @access  Private
router.post('/posts/:postId/comments', protect, commentController.addComment);

// @route   PUT /api/comments/:id
// @desc    Update a comment
// @access  Private
router.put('/:id', protect, commentController.updateComment);

// @route   DELETE /api/comments/:id
// @desc    Delete a comment
// @access  Private
router.delete('/:id', protect, commentController.deleteComment);

module.exports = router;
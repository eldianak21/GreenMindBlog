const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', postController.getPosts);

// @route   GET /api/posts/popular
// @desc    Get popular posts
// @access  Public
router.get('/popular', postController.getPopularPosts);

// @route   GET /api/posts/:id
// @desc    Get single post
// @access  Public
router.get('/:id', postController.getPost);

// @route   POST /api/posts
// @desc    Create a post
// @access  Private
router.post('/', protect, upload.single('featuredImage'), postController.createPost);

// @route   PUT /api/posts/:id
// @desc    Update a post
// @access  Private
router.put('/:id', protect, upload.single('featuredImage'), postController.updatePost);

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', protect, postController.deletePost);

module.exports = router;
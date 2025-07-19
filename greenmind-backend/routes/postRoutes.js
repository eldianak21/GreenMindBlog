const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  createComment,
  getComments,
  createReply,
  getReplies,
  createLike,
  deleteLike
} = require('../controllers/postController');

router.post('/', protect, createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/comments', protect, createComment);
router.get('/:id/comments', getComments);
router.post('/comments/:id/replies', protect, createReply);
router.get('/comments/:id/replies', getReplies);
router.post('/likes', protect, createLike);
router.delete('/likes', protect, deleteLike);

module.exports = router;
const pool = require('../config/db');

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  const { title, content, category } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO posts (user_id, title, content, category) VALUES (?, ?, ?, ?)',
      [req.user.id, title, content, category]
    );

    const [post] = await pool.query('SELECT * FROM posts WHERE id = ?', [result.insertId]);

    res.status(201).json(post[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const [posts] = await pool.query(
      `SELECT p.*, u.name as author_name, up.avatar_url as author_avatar 
       FROM posts p 
       JOIN users u ON p.user_id = u.id 
       LEFT JOIN user_profiles up ON u.id = up.user_id
       ORDER BY p.created_at DESC`
    );

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const [post] = await pool.query(
      `SELECT p.*, u.name as author_name, up.avatar_url as author_avatar 
       FROM posts p 
       JOIN users u ON p.user_id = u.id 
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE p.id = ?`,
      [id]
    );

    if (post.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;

  try {
    // Check if post exists and belongs to user
    const [post] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (post.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    // Update post
    await pool.query(
      'UPDATE posts SET title = ?, content = ?, category = ? WHERE id = ?',
      [title, content, category, id]
    );

    const [updatedPost] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);

    res.status(200).json(updatedPost[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if post exists and belongs to user
    const [post] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (post.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    // Delete post
    await pool.query('DELETE FROM posts WHERE id = ?', [id]);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a comment
// @route   POST /api/posts/:id/comments
// @access  Private
const createComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    // Check if post exists
    const [post] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (post.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create comment
    const [result] = await pool.query(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [id, req.user.id, content]
    );

    const [comment] = await pool.query(
      `SELECT c.*, u.name as author_name, up.avatar_url as author_avatar 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE c.id = ?`,
      [result.insertId]
    );

    res.status(201).json(comment[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get comments for a post
// @route   GET /api/posts/:id/comments
// @access  Public
const getComments = async (req, res) => {
  const { id } = req.params;

  try {
    const [comments] = await pool.query(
      `SELECT c.*, u.name as author_name, up.avatar_url as author_avatar 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE c.post_id = ? 
       ORDER BY c.created_at DESC`,
      [id]
    );

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reply to a comment
// @route   POST /api/comments/:id/replies
// @access  Private
const createReply = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    // Check if comment exists
    const [comment] = await pool.query('SELECT * FROM comments WHERE id = ?', [id]);
    if (comment.length === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Create reply
    const [result] = await pool.query(
      'INSERT INTO comment_replies (comment_id, user_id, content) VALUES (?, ?, ?)',
      [id, req.user.id, content]
    );

    const [reply] = await pool.query(
      `SELECT r.*, u.name as author_name, up.avatar_url as author_avatar 
       FROM comment_replies r 
       JOIN users u ON r.user_id = u.id 
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE r.id = ?`,
      [result.insertId]
    );

    res.status(201).json(reply[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get replies for a comment
// @route   GET /api/comments/:id/replies
// @access  Public
const getReplies = async (req, res) => {
  const { id } = req.params;

  try {
    const [replies] = await pool.query(
      `SELECT r.*, u.name as author_name, up.avatar_url as author_avatar 
       FROM comment_replies r 
       JOIN users u ON r.user_id = u.id 
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE r.comment_id = ? 
       ORDER BY r.created_at ASC`,
      [id]
    );

    res.status(200).json(replies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Like a post or comment
// @route   POST /api/likes
// @access  Private
const createLike = async (req, res) => {
  const { postId, commentId } = req.body;

  try {
    if (!postId && !commentId) {
      return res.status(400).json({ message: 'Either postId or commentId is required' });
    }

    // Check if like already exists
    const [existingLike] = await pool.query(
      'SELECT * FROM likes WHERE user_id = ? AND (post_id = ? OR comment_id = ?)',
      [req.user.id, postId || null, commentId || null]
    );

    if (existingLike.length > 0) {
      return res.status(400).json({ message: 'Already liked' });
    }

    // Create like
    await pool.query(
      'INSERT INTO likes (user_id, post_id, comment_id) VALUES (?, ?, ?)',
      [req.user.id, postId || null, commentId || null]
    );

    res.status(201).json({ message: 'Liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Unlike a post or comment
// @route   DELETE /api/likes
// @access  Private
const deleteLike = async (req, res) => {
  const { postId, commentId } = req.body;

  try {
    if (!postId && !commentId) {
      return res.status(400).json({ message: 'Either postId or commentId is required' });
    }

    // Delete like
    const [result] = await pool.query(
      'DELETE FROM likes WHERE user_id = ? AND (post_id = ? OR comment_id = ?)',
      [req.user.id, postId || null, commentId || null]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Not liked yet' });
    }

    res.status(200).json({ message: 'Unliked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
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
};
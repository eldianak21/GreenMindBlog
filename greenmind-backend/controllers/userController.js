const pool = require('../config/db');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const [user] = await pool.query(
      'SELECT u.id, u.name, u.email, p.bio, p.avatar_url, p.website, p.location FROM users u LEFT JOIN user_profiles p ON u.id = p.user_id WHERE u.id = ?',
      [req.user.id]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const { name, bio, website, location } = req.body;

  try {
    // Update user
    await pool.query('UPDATE users SET name = ? WHERE id = ?', [name, req.user.id]);

    // Update or create profile
    await pool.query(
      'INSERT INTO user_profiles (user_id, bio, website, location) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE bio = VALUES(bio), website = VALUES(website), location = VALUES(location)',
      [req.user.id, bio, website, location]
    );

    // Get updated profile
    const [user] = await pool.query(
      'SELECT u.id, u.name, u.email, p.bio, p.avatar_url, p.website, p.location FROM users u LEFT JOIN user_profiles p ON u.id = p.user_id WHERE u.id = ?',
      [req.user.id]
    );

    res.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user posts
// @route   GET /api/users/posts
// @access  Private
const getUserPosts = async (req, res) => {
  try {
    const [posts] = await pool.query(
      'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Follow a user
// @route   POST /api/users/follow/:id
// @access  Private
const followUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if user is trying to follow themselves
    if (req.user.id === parseInt(id)) {
      return res.status(400).json({ message: 'You cannot follow yourself' });
    }

    // Check if user exists
    const [user] = await pool.query('SELECT id FROM users WHERE id = ?', [id]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already following
    const [existingFollow] = await pool.query(
      'SELECT * FROM followers WHERE follower_id = ? AND following_id = ?',
      [req.user.id, id]
    );

    if (existingFollow.length > 0) {
      return res.status(400).json({ message: 'Already following this user' });
    }

    // Create follow relationship
    await pool.query(
      'INSERT INTO followers (follower_id, following_id) VALUES (?, ?)',
      [req.user.id, id]
    );

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Unfollow a user
// @route   DELETE /api/users/follow/:id
// @access  Private
const unfollowUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete follow relationship
    const [result] = await pool.query(
      'DELETE FROM followers WHERE follower_id = ? AND following_id = ?',
      [req.user.id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Not following this user' });
    }

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get followers
// @route   GET /api/users/followers
// @access  Private
const getFollowers = async (req, res) => {
  try {
    const [followers] = await pool.query(
      `SELECT u.id, u.name, u.email, p.avatar_url 
       FROM users u 
       LEFT JOIN user_profiles p ON u.id = p.user_id
       JOIN followers f ON u.id = f.follower_id 
       WHERE f.following_id = ?`,
      [req.user.id]
    );

    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get following
// @route   GET /api/users/following
// @access  Private
const getFollowing = async (req, res) => {
  try {
    const [following] = await pool.query(
      `SELECT u.id, u.name, u.email, p.avatar_url 
       FROM users u 
       LEFT JOIN user_profiles p ON u.id = p.user_id
       JOIN followers f ON u.id = f.following_id 
       WHERE f.follower_id = ?`,
      [req.user.id]
    );

    res.status(200).json(following);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserPosts,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
};
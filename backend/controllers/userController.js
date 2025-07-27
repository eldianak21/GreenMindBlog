const User = require('../models/User');
const Post = require('../models/Post');
const Follow = require('../models/Follow');
const Analytics = require('../models/Analytics');
const { uploadToCloudinary } = require('../utils/upload');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's posts count
    const postsCount = await Post.count({ userId: user.id });

    // Get followers and following counts
    const followersCount = await Follow.countFollowers(user.id);
    const followingCount = await Follow.countFollowing(user.id);

    // Check if current user is following this user
    let isFollowing = false;
    if (req.user) {
      isFollowing = await Follow.isFollowing(req.user.id, user.id);
    }

    // Get user's recent posts
    const recentPosts = await Post.findAll({
      userId: user.id,
      page: 1,
      limit: 3
    });

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      profilePicture: user.profile_picture,
      bio: user.bio,
      postsCount,
      followersCount,
      followingCount,
      isFollowing,
      recentPosts
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error getting user profile' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    let profilePicture = null;

    if (req.file) {
      // Upload image to cloud storage
      const result = await uploadToCloudinary(req.file);
      profilePicture = result.secure_url;
    }

    await User.updateProfile(req.user.id, {
      name,
      bio,
      profilePicture
    });

    // Get updated user
    const user = await User.findById(req.user.id);

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      profilePicture: user.profile_picture,
      bio: user.bio
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
};

// @desc    Search users
// @route   GET /api/users/search
// @access  Public
const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.length < 3) {
      return res.status(400).json({ message: 'Search query must be at least 3 characters' });
    }

    const users = await User.searchUsers(query);
    res.status(200).json(users);
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ message: 'Server error searching users' });
  }
};

// @desc    Get user dashboard stats
// @route   GET /api/users/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    // Get user's posts count
    const postsCount = await Post.count({ userId: req.user.id });

    // Get followers and following counts
    const followersCount = await Follow.countFollowers(req.user.id);
    const followingCount = await Follow.countFollowing(req.user.id);

    // Get user's recent posts with view counts
    const recentPosts = await Post.findAll({
      userId: req.user.id,
      page: 1,
      limit: 5
    });

    // Get user activity stats
    const activityStats = await Analytics.getUserActivity(req.user.id);

    res.status(200).json({
      postsCount,
      followersCount,
      followingCount,
      recentPosts,
      activityStats
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error getting dashboard stats' });
  }
};

module.exports = {
  getUserProfile,
  updateProfile,
  searchUsers,
  getDashboardStats
};
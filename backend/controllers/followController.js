const Follow = require('../models/Follow');
const Analytics = require('../models/Analytics');

// @desc    Follow or unfollow a user
// @route   POST /api/follow/:userId
// @access  Private
const toggleFollow = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followerId = req.user.id;

    if (followerId === userId) {
      return res.status(400).json({ message: 'You cannot follow yourself' });
    }

    // Check if already following
    const isFollowing = await Follow.isFollowing(followerId, userId);

    if (isFollowing) {
      // Unfollow
      await Follow.delete(followerId, userId);
      
      // Record analytics event
      await Analytics.record('event', followerId, null, {
        event: 'unfollow',
        targetUserId: userId
      });

      res.status(200).json({ message: 'Unfollowed successfully', isFollowing: false });
    } else {
      // Follow
      await Follow.create(followerId, userId);
      
      // Record analytics event
      await Analytics.record('event', followerId, null, {
        event: 'follow',
        targetUserId: userId
      });

      res.status(201).json({ message: 'Followed successfully', isFollowing: true });
    }
  } catch (error) {
    console.error('Toggle follow error:', error);
    res.status(500).json({ message: 'Server error toggling follow' });
  }
};

// @desc    Get followers for a user
// @route   GET /api/users/:userId/followers
// @access  Public
const getFollowers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followers = await Follow.getFollowers(userId);
    res.status(200).json(followers);
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({ message: 'Server error getting followers' });
  }
};

// @desc    Get users a user is following
// @route   GET /api/users/:userId/following
// @access  Public
const getFollowing = async (req, res) => {
  try {
    const userId = req.params.userId;
    const following = await Follow.getFollowing(userId);
    res.status(200).json(following);
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({ message: 'Server error getting following' });
  }
};

module.exports = {
  toggleFollow,
  getFollowers,
  getFollowing
};
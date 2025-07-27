const Analytics = require('../models/Analytics');
const Post = require('../models/Post');

// @desc    Get post analytics
// @route   GET /api/analytics/posts/:postId
// @access  Private (post owner or admin)
const getPostAnalytics = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Check if post exists and belongs to user
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view these analytics' });
    }

    // Get analytics data
    const engagement = await Analytics.getPostEngagement(postId);
    const views = await Analytics.getPageViews(postId);

    res.status(200).json({
      postId,
      views,
      engagement
    });
  } catch (error) {
    console.error('Get post analytics error:', error);
    res.status(500).json({ message: 'Server error getting post analytics' });
  }
};

// @desc    Get user analytics
// @route   GET /api/analytics/user
// @access  Private
const getUserAnalytics = async (req, res) => {
  try {
    // Get user activity stats
    const activityStats = await Analytics.getUserActivity(req.user.id);

    // Get popular posts
    const popularPosts = await Analytics.getPopularPosts(5);

    res.status(200).json({
      activityStats,
      popularPosts
    });
  } catch (error) {
    console.error('Get user analytics error:', error);
    res.status(500).json({ message: 'Server error getting user analytics' });
  }
};

module.exports = {
  getPostAnalytics,
  getUserAnalytics
};
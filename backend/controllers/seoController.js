const SEO = require('../models/SEO');
const Post = require('../models/Post');

// @desc    Get SEO data for a post
// @route   GET /api/seo/posts/:postId
// @access  Private (post owner or admin)
const getPostSEOData = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Check if post exists and belongs to user
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this SEO data' });
    }

    // Get SEO data
    const keywords = await SEO.getKeywords(postId);

    res.status(200).json({
      postId,
      keywords
    });
  } catch (error) {
    console.error('Get post SEO data error:', error);
    res.status(500).json({ message: 'Server error getting post SEO data' });
  }
};

// @desc    Get top performing keywords
// @route   GET /api/seo/top-keywords
// @access  Private
const getTopKeywords = async (req, res) => {
  try {
    const keywords = await SEO.getTopPerformingKeywords(10);
    res.status(200).json(keywords);
  } catch (error) {
    console.error('Get top keywords error:', error);
    res.status(500).json({ message: 'Server error getting top keywords' });
  }
};

// @desc    Get keyword opportunities
// @route   GET /api/seo/opportunities
// @access  Private
const getKeywordOpportunities = async (req, res) => {
  try {
    const keywords = await SEO.getKeywordOpportunities(10);
    res.status(200).json(keywords);
  } catch (error) {
    console.error('Get keyword opportunities error:', error);
    res.status(500).json({ message: 'Server error getting keyword opportunities' });
  }
};

module.exports = {
  getPostSEOData,
  getTopKeywords,
  getKeywordOpportunities
};
const Reaction = require('../models/Reaction');
const Analytics = require('../models/Analytics');

// @desc    Add or update a reaction to a post or comment
// @route   POST /api/reactions
// @access  Private
const addReaction = async (req, res) => {
  try {
    const { postId, commentId, type } = req.body;

    // Check if user already reacted to this post/comment
    const existingReaction = commentId 
      ? await Reaction.findByUserAndComment(req.user.id, commentId)
      : await Reaction.findByUserAndPost(req.user.id, postId);

    if (existingReaction) {
      if (existingReaction.type === type) {
        // Remove reaction if same type clicked again
        await Reaction.remove({
          userId: req.user.id,
          postId,
          commentId
        });
        
        // Record analytics event
        await Analytics.record('event', req.user.id, postId, {
          event: 'unlike',
          commentId,
          type
        });

        return res.status(200).json({ message: 'Reaction removed' });
      } else {
        // Update reaction type
        await Reaction.remove({
          userId: req.user.id,
          postId,
          commentId
        });
      }
    }

    // Add new reaction
    await Reaction.create({
      userId: req.user.id,
      postId,
      commentId,
      type
    });

    // Record analytics event
    await Analytics.record('event', req.user.id, postId, {
      event: 'like',
      commentId,
      type
    });

    res.status(201).json({ message: 'Reaction added' });
  } catch (error) {
    console.error('Add reaction error:', error);
    res.status(500).json({ message: 'Server error adding reaction' });
  }
};

// @desc    Get reactions for a post or comment
// @route   GET /api/reactions
// @access  Public
const getReactions = async (req, res) => {
  try {
    const { postId, commentId } = req.query;
    let reactions = [];

    if (commentId) {
      reactions = await Reaction.findByComment(commentId);
    } else if (postId) {
      reactions = await Reaction.findByPost(postId);
    } else {
      return res.status(400).json({ message: 'postId or commentId is required' });
    }

    // Check if current user has reacted
    let userReaction = null;
    if (req.user) {
      userReaction = commentId 
        ? await Reaction.findByUserAndComment(req.user.id, commentId)
        : await Reaction.findByUserAndPost(req.user.id, postId);
    }

    res.status(200).json({
      reactions,
      userReaction: userReaction?.type || null
    });
  } catch (error) {
    console.error('Get reactions error:', error);
    res.status(500).json({ message: 'Server error getting reactions' });
  }
};

module.exports = {
  addReaction,
  getReactions
};
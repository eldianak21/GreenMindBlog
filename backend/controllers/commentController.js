const Comment = require('../models/Comment');
const Reaction = require('../models/Reaction');
const Analytics = require('../models/Analytics');

// @desc    Get comments for a post
// @route   GET /api/posts/:postId/comments
// @access  Public
const getComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.findByPost(postId);

    // Get replies for each comment and reactions
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.findReplies(comment.id);
        const reactions = await Reaction.findByComment(comment.id);
        
        // Check if current user has reacted to this comment
        let userReaction = null;
        if (req.user) {
          userReaction = await Reaction.findByUserAndComment(req.user.id, comment.id);
        }

        return {
          ...comment,
          replies,
          reactions,
          userReaction: userReaction?.type || null
        };
      })
    );

    res.status(200).json(commentsWithReplies);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error getting comments' });
  }
};

// @desc    Add a comment to a post
// @route   POST /api/posts/:postId/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content, parentId } = req.body;

    // Create comment
    const commentId = await Comment.create({
      userId: req.user.id,
      postId,
      parentId,
      content
    });

    // Record analytics event
    await Analytics.record('event', req.user.id, postId, {
      event: 'comment',
      commentId
    });

    // Get the created comment
    const comment = await Comment.findById(commentId);

    res.status(201).json(comment);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error adding comment' });
  }
};

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { content } = req.body;

    // Check if comment exists and belongs to user
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    await Comment.update(commentId, content);

    // Get the updated comment
    const updatedComment = await Comment.findById(commentId);

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ message: 'Server error updating comment' });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    // Check if comment exists and belongs to user
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.delete(commentId);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error deleting comment' });
  }
};

module.exports = {
  getComments,
  addComment,
  updateComment,
  deleteComment
};
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Reaction = require('../models/Reaction');
const Analytics = require('../models/Analytics');
const SEO = require('../models/SEO');
const { uploadToCloudinary } = require('../utils/upload');
const slugify = require('slugify');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category || null;
    const search = req.query.search || null;

    const posts = await Post.findAll({ page, limit, category, search });
    const totalPosts = await Post.count({ category, search });

    res.status(200).json({
      posts,
      page,
      pages: Math.ceil(totalPosts / limit),
      total: totalPosts
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error getting posts' });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPost = async (req, res) => {
  try {
    // Get post by slug or id
    const post = isNaN(req.params.id) 
      ? await Post.findBySlug(req.params.id)
      : await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Record view
    const ipAddress = req.ip || req.connection.remoteAddress;
    await Post.recordView(post.id, req.user?.id, ipAddress);
    await Analytics.record('pageview', req.user?.id, post.id, {
      ip: ipAddress,
      userAgent: req.headers['user-agent']
    });

    // Get post categories
    const categories = await Post.getCategories(post.id);

    // Get comments count
    const commentsCount = await Comment.countByPost(post.id);

    // Get reactions
    const reactions = await Reaction.findByPost(post.id);

    res.status(200).json({
      ...post,
      categories,
      commentsCount,
      reactions
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error getting post' });
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { title, content, excerpt, categories } = req.body;
    let featuredImage = null;

    if (req.file) {
      // Upload image to cloud storage
      const result = await uploadToCloudinary(req.file);
      featuredImage = result.secure_url;
    }

    // Generate slug
    const slug = slugify(title, { lower: true, strict: true });

    // Calculate read time (approx 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    // Create post
    const postId = await Post.create({
      userId: req.user.id,
      title,
      content,
      excerpt,
      slug,
      featuredImage,
      readTime
    });

    // Add categories
    if (categories && categories.length > 0) {
      for (const categoryId of categories) {
        await Post.addCategory(postId, categoryId);
      }
    }

    // Track keywords for SEO
    const keywords = extractKeywords(title + ' ' + excerpt);
    for (const keyword of keywords) {
      await SEO.trackKeyword(postId, keyword);
    }

    // Get the created post
    const post = await Post.findById(postId);

    res.status(201).json(post);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error creating post' });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
  try {
    const { title, content, excerpt, categories, status } = req.body;
    const postId = req.params.id;
    let featuredImage = null;

    // Check if post exists and belongs to user
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (existingPost.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    if (req.file) {
      // Upload image to cloud storage
      const result = await uploadToCloudinary(req.file);
      featuredImage = result.secure_url;
    }

    // Generate slug if title changed
    const slug = title !== existingPost.title 
      ? slugify(title, { lower: true, strict: true })
      : existingPost.slug;

    // Calculate read time (approx 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    // Update post
    await Post.update(postId, {
      title,
      content,
      excerpt,
      slug,
      featuredImage: featuredImage || existingPost.featured_image,
      readTime,
      status
    });

    // Update categories
    await Post.removeCategories(postId);
    if (categories && categories.length > 0) {
      for (const categoryId of categories) {
        await Post.addCategory(postId, categoryId);
      }
    }

    // Get the updated post
    const post = await Post.findById(postId);

    res.status(200).json(post);
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error updating post' });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Check if post exists and belongs to user
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.delete(postId);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error deleting post' });
  }
};

// @desc    Get popular posts
// @route   GET /api/posts/popular
// @access  Public
const getPopularPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const posts = await Post.getPopularPosts(limit);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Get popular posts error:', error);
    res.status(500).json({ message: 'Server error getting popular posts' });
  }
};

// Helper function to extract keywords from text
const extractKeywords = (text) => {
  // Simple implementation - in a real app you might use a more sophisticated NLP approach
  const words = text.toLowerCase().split(/\s+/);
  const stopWords = new Set(['the', 'and', 'a', 'an', 'in', 'on', 'at', 'for', 'to', 'of', 'with']);
  const keywords = new Set();
  
  for (const word of words) {
    if (word.length > 3 && !stopWords.has(word)) {
      keywords.add(word);
    }
  }
  
  return Array.from(keywords).slice(0, 5); // Return top 5 keywords
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPopularPosts
};
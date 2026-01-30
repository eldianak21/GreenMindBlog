import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiHeart, 
  FiBookmark, 
  FiShare2, 
  FiClock, 
  FiCalendar,
  FiUser,
  FiMessageCircle,
  FiTag
} from 'react-icons/fi';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // Fetch blog post data
    const fetchPost = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setPost({
          id: 1,
          title: 'The Future of Sustainable Technology',
          author: 'Alex Johnson',
          authorRole: 'Tech Evangelist',
          date: 'May 15, 2023',
          readTime: '8 min read',
          category: 'Technology',
          tags: ['Sustainability', 'Tech', 'Innovation', 'Future'],
          content: `
            <h2>The Dawn of a New Era</h2>
            <p>As we navigate through the 21st century, the intersection of technology and sustainability is becoming increasingly crucial. The challenges we face are complex, but so are the solutions emerging from innovative minds worldwide.</p>
            
            <p>From renewable energy systems to circular economy models, technology is playing a pivotal role in creating a more sustainable future. What was once considered futuristic is now becoming our present reality.</p>
            
            <h3>Renewable Energy Revolution</h3>
            <p>The rapid advancement in solar and wind technology has made renewable energy more accessible and affordable than ever before. Solar panel efficiency has increased by over 50% in the last decade, while costs have dropped by nearly 80%.</p>
            
            <blockquote>
              "The greatest threat to our planet is the belief that someone else will save it."
              <cite>- Robert Swan</cite>
            </blockquote>
            
            <h3>Smart Cities and IoT</h3>
            <p>The Internet of Things (IoT) is transforming urban landscapes into smart cities. From intelligent traffic management to energy-efficient buildings, IoT technologies are optimizing resource use and reducing environmental impact.</p>
            
            <p>Key developments include:</p>
            <ul>
              <li>Real-time energy monitoring systems</li>
              <li>Smart waste management solutions</li>
              <li>Water conservation technologies</li>
              <li>Sustainable transportation networks</li>
            </ul>
            
            <h3>Circular Economy and Technology</h3>
            <p>Technology is enabling the transition from a linear economy to a circular one. Through advanced recycling technologies, material science innovations, and digital platforms for resource sharing, we're creating systems where waste is minimized and resources are continually reused.</p>
            
            <h2>Looking Ahead</h2>
            <p>The convergence of AI, blockchain, and biotechnology holds even more promise for sustainable solutions. As these technologies mature, we can expect breakthroughs in areas like carbon capture, sustainable agriculture, and biodiversity conservation.</p>
            
            <p>The journey towards sustainability is ongoing, but with each technological advancement, we move closer to a balanced relationship with our planet.</p>
          `,
          image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          likes: 124,
          comments: 42,
          shares: 89,
          saved: 156
        });
        setLikes(124);
        setComments([
          {
            id: 1,
            author: 'Sarah Miller',
            date: '2 days ago',
            content: 'Excellent article! The section on smart cities particularly resonated with me. I\'m curious about the scalability of these solutions in developing countries.',
            likes: 12
          },
          {
            id: 2,
            author: 'David Chen',
            date: '1 week ago',
            content: 'Great insights! I work in renewable energy, and it\'s amazing to see how quickly the technology is evolving. The cost reductions you mentioned are even more dramatic in recent years.',
            likes: 8
          }
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchPost();
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'You',
        date: 'Just now',
        content: newComment,
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  if (isLoading) {
    return (
      <div className="blog-post-loading">
        <div className="loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-post-not-found">
        <h2>Article Not Found</h2>
        <p>The article you're looking for doesn't exist or has been moved.</p>
        <a href="/" className="back-home">
          <FiArrowLeft /> Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      {/* Navigation */}
      <nav className="post-navigation">
        <a href="/" className="back-button">
          <FiArrowLeft /> Back to Articles
        </a>
      </nav>

      {/* Hero Section */}
      <section className="post-hero">
        <div className="container">
          <div className="post-meta-header">
            <span className="category-badge">
              <FiTag /> {post.category}
            </span>
            <div className="post-stats">
              <span className="stat">
                <FiCalendar /> {post.date}
              </span>
              <span className="stat">
                <FiClock /> {post.readTime}
              </span>
            </div>
          </div>
          
          <h1 className="post-title">{post.title}</h1>
          
          <div className="author-info">
            <div className="author-avatar">
              {post.author.charAt(0)}
            </div>
            <div className="author-details">
              <h3 className="author-name">
                <FiUser /> {post.author}
              </h3>
              <p className="author-role">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="featured-image-container">
        <div className="container">
          <div className="featured-image">
            <img 
              src={post.image} 
              alt={post.title}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </div>
        </div>
      </div>

      {/* Post Content */}
      <article className="post-content">
        <div className="container">
          <div className="content-wrapper">
            {/* Sidebar Actions */}
            <aside className="post-actions-sidebar">
              <button 
                className={`action-button ${liked ? 'active' : ''}`}
                onClick={handleLike}
              >
                <FiHeart />
                <span className="action-count">{likes}</span>
              </button>
              
              <button 
                className={`action-button ${saved ? 'active' : ''}`}
                onClick={handleSave}
              >
                <FiBookmark />
                <span className="action-count">{post.saved}</span>
              </button>
              
              <button className="action-button">
                <FiShare2 />
                <span className="action-count">{post.shares}</span>
              </button>
            </aside>

            {/* Main Content */}
            <div className="post-body">
              <div 
                className="post-html-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Tags */}
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Bio */}
              <div className="author-bio">
                <div className="author-bio-content">
                  <h3>About the Author</h3>
                  <p>
                    {post.author} is a {post.authorRole.toLowerCase()} with over 10 years of experience 
                    in technology and sustainability. They are passionate about exploring how 
                    emerging technologies can solve global challenges and create positive impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="comments-section">
        <div className="container">
          <div className="comments-header">
            <h2 className="section-title">
              <FiMessageCircle /> Comments ({post.comments})
            </h2>
          </div>

          {/* Add Comment Form */}
          <div className="add-comment">
            <form onSubmit={handleCommentSubmit}>
              <div className="form-group">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows="4"
                />
              </div>
              <button type="submit" className="submit-comment">
                Post Comment
              </button>
            </form>
          </div>

          {/* Comments List */}
          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <div className="comment-author">
                    <div className="comment-avatar">
                      {comment.author.charAt(0)}
                    </div>
                    <div>
                      <h4>{comment.author}</h4>
                      <span className="comment-date">{comment.date}</span>
                    </div>
                  </div>
                  <button className="comment-like">
                    <FiHeart /> {comment.likes}
                  </button>
                </div>
                <div className="comment-content">
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="related-posts">
        <div className="container">
          <h2 className="section-title">Related Articles</h2>
          <div className="related-grid">
            {[1, 2, 3].map(item => (
              <div key={item} className="related-card">
                <div className="related-content">
                  <span className="related-category">Technology</span>
                  <h4>The Rise of AI in Everyday Life</h4>
                  <p>How artificial intelligence is transforming our daily routines and interactions.</p>
                  <a href={`/blog/${item}`} className="read-related">
                    Read Article
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
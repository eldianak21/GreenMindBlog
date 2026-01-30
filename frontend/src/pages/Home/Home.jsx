// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FiSearch, FiMenu, FiX, FiArrowRight, FiBookmark, FiHeart, FiShare2, FiUser } from 'react-icons/fi';
// import '@fontsource/poppins/300.css';
// import '@fontsource/poppins/400.css';
// import '@fontsource/poppins/500.css';
// import '@fontsource/poppins/600.css';
// import '@fontsource/poppins/700.css';
// import './Home.css';

// const Home = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check if user is logged in (replace with your actual auth logic)
//     const loggedInUser = localStorage.getItem('user');
//     if (loggedInUser) {
//       setUser(JSON.parse(loggedInUser));
//     }

//     const fetchPosts = async () => {
//       setIsLoading(true);
//       setTimeout(() => {
//         setPosts([
//           {
//             id: 1,
//             title: 'The Future of Sustainable Technology',
//             excerpt: 'Exploring how emerging technologies are addressing global sustainability challenges with innovative solutions.',
//             category: 'technology',
//             date: '2023-05-15',
//             readTime: '8 min read',
//             likes: 124,
//             saved: 56
//           },
//           {
//             id: 2,
//             title: 'Minimalist Design Principles for Modern Websites',
//             excerpt: 'How to apply minimalist design principles to create clean, effective, and user-friendly websites.',
//             category: 'design',
//             date: '2023-05-10',
//             readTime: '5 min read',
//             likes: 89,
//             saved: 42
//           },
//           {
//             id: 3,
//             title: 'Advanced React Patterns for 2025',
//             excerpt: 'Learn about the latest React patterns and best practices to improve your application architecture.',
//             category: 'development',
//             date: '2023-05-05',
//             readTime: '10 min read',
//             likes: 156,
//             saved: 78
//           }
//         ]);
//         setIsLoading(false);
//       }, 1000);
//     };

//     fetchPosts();
//   }, []);

//   const filteredPosts = activeCategory === 'all' 
//     ? posts 
//     : posts.filter(post => post.category === activeCategory);

//   const categories = [
//     { id: 'all', name: 'All' },
//     { id: 'technology', name: 'Technology' },
//     { id: 'design', name: 'Design' },
//     { id: 'development', name: 'Development' },
//     { id: 'lifestyle', name: 'Lifestyle' }
//   ];

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log('Searching for:', searchQuery);
//   };

//   // Mock login/logout functions (replace with actual auth implementation)
//   const handleLogin = () => {
//     const mockUser = { name: 'John Doe', email: 'john@example.com' };
//     localStorage.setItem('user', JSON.stringify(mockUser));
//     setUser(mockUser);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   return (
//     <div className="home-container">
//       {/* Header */}
//       <header className="header">
//         <div className="header-container">
//           <div className="logo">
//             <h1>GreenMind</h1>
//             <span>Blog</span>
//           </div>
          
//           <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
//             <ul className="nav-list">
//               {categories.map(category => (
//                 <li key={category.id} className="nav-item">
//                   <button 
//                     className={`nav-link ${activeCategory === category.id ? 'active' : ''}`}
//                     onClick={() => setActiveCategory(category.id)}
//                   >
//                     {category.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
          
//           <div className="search-container">
//             <form onSubmit={handleSearch} className="search-form">
//               <input
//                 type="text"
//                 placeholder="Search articles..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="search-input"
//               />
//               <button type="submit" className="search-button">
//                 <FiSearch className="search-icon" />
//               </button>
//             </form>
//           </div>

//           <div className="user-account">
//             {user ? (
//               <div className="user-profile-container">
//                 <Link to="/account" className="user-profile">
//                   <span className="user-name">{user.name}</span>
//                   <div className="user-avatar">
//                     {user.name.charAt(0).toUpperCase()}
//                   </div>
//                 </Link>
//                 <button onClick={handleLogout} className="logout-button">Logout</button>
//               </div>
//             ) : (
//               <Link to="/signin" className="account-icon">
//                 <FiUser className="user-icon" />
//                 <span className="sign-in-text"></span>
//               </Link>
//             )}
//           </div>
          
//           <button className="mobile-menu-button" onClick={toggleMobileMenu}>
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>
//       </header>

//       {/* Rest of your component remains the same... */}
//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-content">
//           <h2>Stay Curious, Keep Learning</h2>
//           <p>Discover stories, thinking, and expertise from writers on any topic.</p>
//           <button className="cta-button">Start Reading</button>
//         </div>
//       </section>

//       {/* Featured Posts */}
//       <section className="featured-posts">
//         <h3 className="section-title">Featured Today</h3>
//         <div className="featured-grid">
//           {isLoading ? (
//             <div className="loading-spinner"></div>
//           ) : (
//             filteredPosts.slice(0, 2).map(post => (
//               <div key={post.id} className="featured-card">
//                 <div className="featured-card-content">
//                   <span className="category-badge">{post.category}</span>
//                   <h4>{post.title}</h4>
//                   <p>{post.excerpt}</p>
//                   <div className="post-meta">
//                     <span>{post.date}</span>
//                     <span>•</span>
//                     <span>{post.readTime}</span>
//                   </div>
//                   <button className="read-more">
//                     Read more <FiArrowRight />
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </section>

//       {/* Main Content */}
//       <main className="main-content">
//         <div className="content-header">
//           <h3 className="section-title">Latest Articles</h3>
//           <div className="sort-options">
//             <select className="sort-select">
//               <option value="latest">Latest</option>
//               <option value="popular">Most Popular</option>
//               <option value="trending">Trending</option>
//             </select>
//           </div>
//         </div>

//         <div className="posts-grid">
//           {isLoading ? (
//             <div className="loading-spinner"></div>
//           ) : (
//             filteredPosts.map(post => (
//               <article key={post.id} className="post-card">
//                 <div className="post-card-content">
//                   <div className="post-header">
//                     <span className="category-badge">{post.category}</span>
//                     <div className="post-actions">
//                       <button className="action-button">
//                         <FiBookmark />
//                         <span className="action-count">{post.saved}</span>
//                       </button>
//                       <button className="action-button">
//                         <FiHeart />
//                         <span className="action-count">{post.likes}</span>
//                       </button>
//                       <button className="action-button">
//                         <FiShare2 />
//                       </button>
//                     </div>
//                   </div>
//                   <h4>{post.title}</h4>
//                   <p className="post-excerpt">{post.excerpt}</p>
//                   <div className="post-footer">
//                     <div className="post-meta">
//                       <span>{post.date}</span>
//                       <span>•</span>
//                       <span>{post.readTime}</span>
//                     </div>
//                     <button className="read-more">
//                       Read more <FiArrowRight />
//                     </button>
//                   </div>
//                 </div>
//               </article>
//             ))
//           )}
//         </div>

//         {!isLoading && (
//           <div className="pagination">
//             <button className="pagination-button active">1</button>
//             <button className="pagination-button">2</button>
//             <button className="pagination-button">3</button>
//             <button className="pagination-button next">Next</button>
//           </div>
//         )}
//       </main>

//       {/* Newsletter */}
//       <section className="newsletter">
//         <div className="newsletter-content">
//           <h3>Subscribe to our newsletter</h3>
//           <p>Get the latest articles and resources delivered to your inbox weekly.</p>
//           <form className="newsletter-form">
//             <input type="email" placeholder="Enter your email" required />
//             <button type="submit" className="subscribe-button">Subscribe</button>
//           </form>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <div className="footer-container">
//           <div className="footer-logo">
//             <h3>GreenMind</h3>
//             <p>Sharing knowledge, inspiring change.</p>
//           </div>
//           <div className="footer-links">
//             <div className="link-column">
//               <h4>Company</h4>
//               <ul>
//                 <li><a href="/about">About</a></li>
//                 <li><a href="/careers">Careers</a></li>
//                 <li><a href="/contact">Contact</a></li>
//               </ul>
//             </div>
//             <div className="link-column">
//               <h4>Resources</h4>
//               <ul>
//                 <li><a href="/blog">Blog</a></li>
//                 <li><a href="/guides">Guides</a></li>
//                 <li><a href="/webinars">Webinars</a></li>
//               </ul>
//             </div>
//             <div className="link-column">
//               <h4>Legal</h4>
//               <ul>
//                 <li><Link to="/legal/privacy">Privacy</Link></li>
//                 <li><Link to="/legal/terms">Terms</Link></li>
//                 <li><Link to="/legal/cookies">Cookies</Link></li>
//                 <li><Link to="/legal/service">Service</Link></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} GreenMind Blog. All rights reserved.</p>
//           <div className="social-links">
//             <a href="#" aria-label="Twitter">Twitter</a>
//             <a href="#" aria-label="LinkedIn">LinkedIn</a>
//             <a href="#" aria-label="Instagram">Instagram</a>
//             <a href="#" aria-label="GitHub">GitHub</a>
//           </div>
//         </div>
//       </footer>

//       {/* Development-only mock auth controls */}
//       {process.env.NODE_ENV === 'development' && (
//         <div className="dev-auth-controls">
//           {user ? (
//             <button onClick={handleLogout} className="dev-logout-button">
//               Dev: Logout
//             </button>
//           ) : (
//             <button onClick={handleLogin} className="dev-login-button">
//               Dev: Mock Login
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBookmark, FiHeart, FiShare2 } from 'react-icons/fi';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import '../../components/Header/Header.css';
import '../../components/Footer/Footer.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './Home.css';

const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [user, setUser] = useState(null);
  const [sortOption, setSortOption] = useState('latest');

  const mockPosts = [
    {
      id: 1,
      title: 'The Future of Sustainable Technology',
      excerpt: 'Exploring how emerging technologies are addressing global sustainability challenges with innovative solutions.',
      category: 'technology',
      date: '2023-05-15',
      readTime: '8 min read',
      likes: 124,
      saved: 56,
      featured: true
    },
    {
      id: 2,
      title: 'Minimalist Design Principles for Modern Websites',
      excerpt: 'How to apply minimalist design principles to create clean, effective, and user-friendly websites.',
      category: 'design',
      date: '2023-05-10',
      readTime: '5 min read',
      likes: 89,
      saved: 42,
      featured: true
    },
    {
      id: 3,
      title: 'Advanced React Patterns for 2025',
      excerpt: 'Learn about the latest React patterns and best practices to improve your application architecture.',
      category: 'development',
      date: '2023-05-05',
      readTime: '10 min read',
      likes: 156,
      saved: 78,
      featured: true
    },
    {
      id: 4,
      title: 'The Rise of AI in Everyday Life',
      excerpt: 'How artificial intelligence is transforming our daily routines and interactions.',
      category: 'technology',
      date: '2023-05-01',
      readTime: '6 min read',
      likes: 203,
      saved: 92
    },
    {
      id: 5,
      title: 'Modern CSS Techniques You Should Know',
      excerpt: 'Explore the latest CSS features and techniques for modern web development.',
      category: 'design',
      date: '2023-04-28',
      readTime: '7 min read',
      likes: 142,
      saved: 67
    },
    {
      id: 6,
      title: 'Building Scalable Node.js Applications',
      excerpt: 'Best practices and patterns for building scalable backend applications with Node.js.',
      category: 'development',
      date: '2023-04-25',
      readTime: '12 min read',
      likes: 178,
      saved: 81
    },
    {
      id: 7,
      title: 'Mindfulness and Productivity',
      excerpt: 'How mindfulness practices can significantly boost your productivity and focus.',
      category: 'lifestyle',
      date: '2023-04-20',
      readTime: '5 min read',
      likes: 95,
      saved: 43
    },
    {
      id: 8,
      title: 'The Evolution of Web Development',
      excerpt: 'From static HTML to dynamic SPAs - tracing the evolution of web development.',
      category: 'development',
      date: '2023-04-18',
      readTime: '9 min read',
      likes: 167,
      saved: 75
    }
  ];

  useEffect(() => {
    // Check if user is logged in (replace with your actual auth logic)
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    const fetchPosts = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setPosts(mockPosts);
        setIsLoading(false);
      }, 1000);
    };

    fetchPosts();
  }, []);

  // Filter and search logic
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(post => post.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }

    // Sort the results
    switch (sortOption) {
      case 'latest':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'popular':
        result.sort((a, b) => b.likes - a.likes);
        break;
      case 'trending':
        result.sort((a, b) => (b.likes + b.saved) - (a.likes + a.saved));
        break;
      default:
        break;
    }

    return result;
  }, [posts, activeCategory, searchQuery, sortOption]);

  // Mock login/logout functions (replace with actual auth implementation)
  const handleLogin = () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleCreateBlog = () => {
    if (user) {
      // Redirect to create blog page
      console.log('Redirecting to create blog page');
      // window.location.href = '/create-blog';
    } else {
      // Redirect to sign in page
      console.log('Redirecting to sign in page');
      // window.location.href = '/signin';
    }
  };

  return (
    <div className="home-container">
      {/* Header Component */}
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        user={user}
        handleLogout={handleLogout}
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Stay Curious, Keep Learning</h2>
          <p>Discover stories, thinking, and expertise from writers on any topic.</p>
          <div className="hero-buttons">
            <button className="cta-button">Start Reading</button>
            <button className="cta-button secondary" onClick={handleCreateBlog}>
              Create Blog
            </button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="featured-posts">
        <h3 className="section-title">Featured Today</h3>
        <div className="featured-grid">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            filteredAndSortedPosts
              .filter(post => post.featured)
              .slice(0, 2)
              .map(post => (
                <div key={post.id} className="featured-card">
                  <div className="featured-card-content">
                    <span className="category-badge">{post.category}</span>
                    <h4>{post.title}</h4>
                    <p>{post.excerpt}</p>
                    <div className="post-meta">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <button className="read-more">
                      Read more <FiArrowRight />
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-header">
          <h3 className="section-title">Latest Articles</h3>
          <div className="content-controls">
            <div className="search-info">
              {searchQuery && (
                <span className="search-results-info">
                  Showing results for "{searchQuery}"
                </span>
              )}
              {activeCategory !== 'all' && (
                <span className="category-filter-info">
                  Filtered by: {categories.find(c => c.id === activeCategory)?.name}
                </span>
              )}
            </div>
            <div className="sort-options">
              <select 
                className="sort-select" 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="posts-grid">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : filteredAndSortedPosts.length > 0 ? (
            filteredAndSortedPosts
              .filter(post => !post.featured)
              .map(post => (
                <article key={post.id} className="post-card">
                  <div className="post-card-content">
                    <div className="post-header">
                      <span className="category-badge">{post.category}</span>
                      <div className="post-actions">
                        <button className="action-button">
                          <FiBookmark />
                          <span className="action-count">{post.saved}</span>
                        </button>
                        <button className="action-button">
                          <FiHeart />
                          <span className="action-count">{post.likes}</span>
                        </button>
                        <button className="action-button">
                          <FiShare2 />
                        </button>
                      </div>
                    </div>
                    <h4>{post.title}</h4>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="post-footer">
                      <div className="post-meta">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <button className="read-more">
                        Read more <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </article>
              ))
          ) : (
            <div className="no-results">
              <h4>No articles found</h4>
              <p>Try adjusting your search or filter to find what you're looking for.</p>
              <button 
                className="cta-button" 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {!isLoading && filteredAndSortedPosts.length > 0 && (
          <div className="pagination">
            <button className="pagination-button active">1</button>
            <button className="pagination-button">2</button>
            <button className="pagination-button">3</button>
            <button className="pagination-button next">Next</button>
          </div>
        )}
      </main>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h3>Subscribe to our newsletter</h3>
          <p>Get the latest articles and resources delivered to your inbox weekly.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="subscribe-button">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />

      {/* Development-only mock auth controls */}
      {process.env.NODE_ENV === 'development' && (
        <div className="dev-auth-controls">
          {user ? (
            <button onClick={handleLogout} className="dev-logout-button">
              Dev: Logout
            </button>
          ) : (
            <button onClick={handleLogin} className="dev-login-button">
              Dev: Mock Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
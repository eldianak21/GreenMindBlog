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

//   useEffect(() => {
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
//              <div className="user-account">
//       {user ? (
//         <Link to="/account" className="user-profile">
//           <span className="user-name">{user.name}</span>
//           <div className="user-avatar">
//             {user.name.charAt(0).toUpperCase()}
//           </div>
//         </Link>
//       ) : (
//         <Link to="/signin" className="account-icon">
//           <FiUser className="user-icon" />
//           <span className="sign-in-text">Sign In</span>
//         </Link>
//       )}
//     </div>
//           <button className="mobile-menu-button" onClick={toggleMobileMenu}>
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>
//       </header>

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
// <li><Link to="/legal/terms">Terms</Link></li>
// <li><Link to="/legal/cookies">Cookies</Link></li>
// <li><Link to="/legal/service">Service</Link></li>
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
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiArrowRight, FiBookmark, FiHeart, FiShare2, FiUser } from 'react-icons/fi';
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

  useEffect(() => {
    // Check if user is logged in (replace with your actual auth logic)
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    const fetchPosts = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setPosts([
          {
            id: 1,
            title: 'The Future of Sustainable Technology',
            excerpt: 'Exploring how emerging technologies are addressing global sustainability challenges with innovative solutions.',
            category: 'technology',
            date: '2023-05-15',
            readTime: '8 min read',
            likes: 124,
            saved: 56
          },
          {
            id: 2,
            title: 'Minimalist Design Principles for Modern Websites',
            excerpt: 'How to apply minimalist design principles to create clean, effective, and user-friendly websites.',
            category: 'design',
            date: '2023-05-10',
            readTime: '5 min read',
            likes: 89,
            saved: 42
          },
          {
            id: 3,
            title: 'Advanced React Patterns for 2025',
            excerpt: 'Learn about the latest React patterns and best practices to improve your application architecture.',
            category: 'development',
            date: '2023-05-05',
            readTime: '10 min read',
            likes: 156,
            saved: 78
          }
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchPosts();
  }, []);

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'technology', name: 'Technology' },
    { id: 'design', name: 'Design' },
    { id: 'development', name: 'Development' },
    { id: 'lifestyle', name: 'Lifestyle' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

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

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1>GreenMind</h1>
            <span>Blog</span>
          </div>
          
          <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <ul className="nav-list">
              {categories.map(category => (
                <li key={category.id} className="nav-item">
                  <button 
                    className={`nav-link ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FiSearch className="search-icon" />
              </button>
            </form>
          </div>

          <div className="user-account">
            {user ? (
              <div className="user-profile-container">
                <Link to="/account" className="user-profile">
                  <span className="user-name">{user.name}</span>
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </Link>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>
            ) : (
              <Link to="/signin" className="account-icon">
                <FiUser className="user-icon" />
                <span className="sign-in-text"></span>
              </Link>
            )}
          </div>
          
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {/* Rest of your component remains the same... */}
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Stay Curious, Keep Learning</h2>
          <p>Discover stories, thinking, and expertise from writers on any topic.</p>
          <button className="cta-button">Start Reading</button>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="featured-posts">
        <h3 className="section-title">Featured Today</h3>
        <div className="featured-grid">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            filteredPosts.slice(0, 2).map(post => (
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
          <div className="sort-options">
            <select className="sort-select">
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
            </select>
          </div>
        </div>

        <div className="posts-grid">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            filteredPosts.map(post => (
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
          )}
        </div>

        {!isLoading && (
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <h3>GreenMind</h3>
            <p>Sharing knowledge, inspiring change.</p>
          </div>
          <div className="footer-links">
            <div className="link-column">
              <h4>Company</h4>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="link-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/guides">Guides</a></li>
                <li><a href="/webinars">Webinars</a></li>
              </ul>
            </div>
            <div className="link-column">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/legal/privacy">Privacy</Link></li>
                <li><Link to="/legal/terms">Terms</Link></li>
                <li><Link to="/legal/cookies">Cookies</Link></li>
                <li><Link to="/legal/service">Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} GreenMind Blog. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="GitHub">GitHub</a>
          </div>
        </div>
      </footer>

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
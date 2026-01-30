import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiUser } from 'react-icons/fi';
import './Header.css';

const Header = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory,
  user,
  handleLogout
}) => {
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

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>GreenMind</h1>
            <span>Blog</span>
          </Link>
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
              <span className="sign-in-text">Sign In</span>
            </Link>
          )}
        </div>
        
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
};

export default Header;
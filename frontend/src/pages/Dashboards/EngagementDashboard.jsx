import React from 'react';
import './DashboardStyles.css';

const EngagementDashboard = () => {
  const comments = [
    { user: 'Sarah K.', text: 'This post changed how I approach CSS layouts!', post: 'CSS Grid Techniques' },
    { user: 'Mark T.', text: 'When will you cover advanced React hooks?', post: 'React 2025 Patterns' },
    { user: 'Alex P.', text: 'Great insights on sustainable design!', post: 'Sustainable Architecture' }
  ];

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h3 className="sidebar-title">Engagement</h3>
        <nav className="sidebar-nav">
          <a href="#" className="active">Comments</a>
          <a href="#">Social Shares</a>
          <a href="#">Newsletter</a>
          <a href="#">Community</a>
        </nav>
      </aside>
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Audience Engagement</h1>
          <button className="btn btn--secondary">
            <span>Export Data</span>
          </button>
        </header>

        <div className="stats-grid">
          <div className="data-card">
            <h3 className="data-card__title">Total Comments</h3>
            <p className="data-card__value">1,240</p>
            <span className="data-card__change positive">↑ 18%</span>
          </div>
          <div className="data-card">
            <h3 className="data-card__title">Social Shares</h3>
            <p className="data-card__value">3.2K</p>
            <span className="data-card__change positive">↑ 24%</span>
          </div>
          <div className="data-card">
            <h3 className="data-card__title">Engagement Rate</h3>
            <p className="data-card__value">4.2%</p>
            <span className="data-card__change positive">↑ 1.1%</span>
          </div>
        </div>

        <div className="card-grid">
          <div className="data-card">
            <div className="chart-header">
              <h2 className="chart-title">Recent Comments</h2>
              <button className="btn btn--secondary btn--sm">View All</button>
            </div>
            <div className="comments-list">
              {comments.map((comment, index) => (
                <div key={index} className="comment-item">
                  <p className="comment-text">"{comment.text}"</p>
                  <p className="comment-meta">— {comment.user} on "{comment.post}"</p>
                </div>
              ))}
            </div>
          </div>
          <div className="data-card">
            <div className="chart-header">
              <h2 className="chart-title">Top Shared Content</h2>
            </div>
            <ul className="top-list">
              <li>Sustainable Architecture (1.2K shares)</li>
              <li>CSS Grid Techniques (980 shares)</li>
              <li>React 2025 Patterns (750 shares)</li>
            </ul>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">Engagement Over Time</h2>
            <div className="chart-actions">
              <select className="btn btn--secondary">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
          </div>
          {/* Engagement chart would go here */}
        </div>
      </main>
    </div>
  );
};

export default EngagementDashboard;
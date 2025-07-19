import React, { useState } from 'react';
import './DashboardStyles.css';

const ContentDashboard = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Sustainable Architecture Trends', status: 'published', views: 4200, comments: 24 },
    { id: 2, title: 'CSS Grid Techniques', status: 'published', views: 3800, comments: 18 },
    { id: 3, title: 'React 2025 Patterns', status: 'draft', views: 0, comments: 0 },
    { id: 4, title: 'Next.js Optimization Guide', status: 'scheduled', views: 2100, comments: 12 }
  ]);

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h3 className="sidebar-title">Content</h3>
        <nav className="sidebar-nav">
          <a href="#" className="active">All Posts</a>
          <a href="#">Published</a>
          <a href="#">Drafts</a>
          <a href="#">Scheduled</a>
        </nav>
      </aside>
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Content Manager</h1>
          <button className="btn btn--primary">
            <span>+ New Post</span>
          </button>
        </header>

        <div className="stats-grid">
          <div className="data-card">
            <h3 className="data-card__title">Published Posts</h3>
            <p className="data-card__value">24</p>
            <span className="data-card__change positive">↑ 12%</span>
          </div>
          <div className="data-card">
            <h3 className="data-card__title">Total Views</h3>
            <p className="data-card__value">12.4K</p>
            <span className="data-card__change positive">↑ 8%</span>
          </div>
          <div className="data-card">
            <h3 className="data-card__title">Avg. Engagement</h3>
            <p className="data-card__value">3.2%</p>
            <span className="data-card__change negative">↓ 1.2%</span>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">Recent Activity</h2>
            <div className="chart-actions">
              <select className="btn btn--secondary">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
          </div>
          {/* Chart visualization would go here */}
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Post Title</th>
                <th>Status</th>
                <th>Views</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <span className={`status-badge ${post.status}`}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                  </td>
                  <td>{post.views.toLocaleString()}</td>
                  <td>{post.comments}</td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn--secondary btn--sm">Edit</button>
                      <button className="btn btn--secondary btn--sm">Stats</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ContentDashboard;
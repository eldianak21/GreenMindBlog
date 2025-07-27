import React from 'react';
import './DashboardStyles.css';

const AnalyticsDashboard = () => {
  const trafficData = [
    { day: 'Mon', visitors: 420, sessions: 520 },
    { day: 'Tue', visitors: 800, sessions: 920 },
    { day: 'Wed', visitors: 650, sessions: 780 },
    { day: 'Thu', visitors: 710, sessions: 850 },
    { day: 'Fri', visitors: 950, sessions: 1120 },
    { day: 'Sat', visitors: 520, sessions: 620 },
    { day: 'Sun', visitors: 380, sessions: 450 }
  ];

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h3 className="sidebar-title">Analytics</h3>
        <nav className="sidebar-nav">
          <a href="#" className="active">Overview</a>
          <a href="#">Traffic</a>
          <a href="#">Content</a>
          <a href="#">Audience</a>
        </nav>
      </aside>
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Performance Analytics</h1>
          <div className="time-filter">
            <select className="btn btn--secondary">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last quarter</option>
            </select>
          </div>
        </header>

        <div className="stats-grid">
          <div className="data-card">
            <h3 className="data-card__title">Total Visitors</h3>
            <p className="data-card__value">4,830</p>
            <span className="data-card__change positive">↑ 18%</span>
          </div>
          <div className="data-card">
            <h3 className="data-card__title">Avg. Session</h3>
            <p className="data-card__value">2:24</p>
            <span className="data-card__change positive">↑ 6%</span>
          </div>
          <div className="data-card">
            <h3 className="data-card__title">Bounce Rate</h3>
            <p className="data-card__value">38%</p>
            <span className="data-card__change negative">↑ 2%</span>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">Traffic Overview</h2>
            <div className="chart-actions">
              <button className="btn btn--secondary">Export</button>
            </div>
          </div>
          <div className="chart-visualization">
            <div className="bar-chart">
              {trafficData.map((data, index) => (
                <div key={index} className="bar-container">
                  <div 
                    className="bar-fill visitors"
                    style={{ height: `${(data.visitors / 1200) * 100}%` }}
                    data-value={data.visitors}
                  ></div>
                  <div 
                    className="bar-fill sessions"
                    style={{ height: `${(data.sessions / 1200) * 100}%` }}
                    data-value={data.sessions}
                  ></div>
                  <span className="bar-label">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-grid">
          <div className="data-card">
            <h3 className="data-card__title">Top Content</h3>
            <ul className="top-list">
              <li>Sustainable Architecture (4.2K views)</li>
              <li>CSS Grid Techniques (3.8K views)</li>
              <li>Next.js Optimization (3.1K views)</li>
            </ul>
          </div>
          <div className="data-card">
            <h3 className="data-card__title">Traffic Sources</h3>
            <ul className="top-list">
              <li>Organic Search (42%)</li>
              <li>Direct (28%)</li>
              <li>Social (18%)</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
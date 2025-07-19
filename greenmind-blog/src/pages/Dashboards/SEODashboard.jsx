import React from 'react';
import './DashboardStyles.css';

const SEODashboard = () => {
  const seoData = [
    { keyword: "sustainable architecture", rank: 8, traffic: 320 },
    { keyword: "CSS grid techniques", rank: 3, traffic: 540 },
    { keyword: "React patterns 2025", rank: 15, traffic: 210 },
    { keyword: "Next.js optimization", rank: 5, traffic: 480 }
  ];

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h3 className="sidebar-title">SEO</h3>
        <nav className="sidebar-nav">
          <a href="#" className="active">Keywords</a>
          <a href="#">Backlinks</a>
          <a href="#">Content Audit</a>
          <a href="#">Competitors</a>
        </nav>
      </aside>
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">SEO Performance</h1>
          <button className="btn btn--primary">
            <span>Refresh Data</span>
          </button>
        </header>

        <div className="stats-grid">
          <div className="data-card">
            <h3 className="data-card__title">Avg. Position</h3>
            <p className="data-card__value">8.7</p>
            <span className="data-card__change positive">↑ 1.2</span>
          </div>
          <div className="data-card">
            <h3 className="data-card__title">Total Keywords</h3>
            <p className="data-card__value">42</p>
            <span className="data-card__change positive">↑ 3</span>
          </div>
          <div className="data-card">
            <h3 className="data-card__title">Organic Traffic</h3>
            <p className="data-card__value">3.2K</p>
            <span className="data-card__change positive">↑ 12%</span>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">Keyword Rankings</h2>
            <div className="chart-actions">
              <button className="btn btn--secondary">Export</button>
            </div>
          </div>
          {/* SEO chart would go here */}
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Keyword</th>
                <th>Position</th>
                <th>Traffic</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {seoData.map((item, index) => (
                <tr key={index}>
                  <td>{item.keyword}</td>
                  <td>
                    <span className={`rank-badge ${item.rank <= 10 ? 'good' : 'bad'}`}>
                      #{item.rank}
                    </span>
                  </td>
                  <td>{item.traffic}</td>
                  <td>
                    <span className={`data-card__change ${index % 3 === 0 ? 'positive' : 'negative'}`}>
                      {index % 3 === 0 ? '↑ 2' : '↓ 1'}
                    </span>
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

export default SEODashboard;
import React from 'react';
import './DashboardStyles.css';

const MonetizationDashboard = () => {
  const revenueData = [
    { source: 'Ad Revenue', amount: 420, change: '+12%' },
    { source: 'Affiliate', amount: 315, change: '+8%' },
    { source: 'Memberships', amount: 280, change: '-4%' },
    { source: 'Sponsorships', amount: 195, change: '+22%' }
  ];

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h3 className="sidebar-title">Monetization</h3>
        <nav className="sidebar-nav">
          <a href="#" className="active">Overview</a>
          <a href="#">Ad Revenue</a>
          <a href="#">Affiliates</a>
          <a href="#">Memberships</a>
        </nav>
      </aside>
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Revenue Dashboard</h1>
          <button className="btn btn--primary">
            <span>Withdraw Earnings</span>
          </button>
        </header>

        <div className="stats-grid">
          <div className="data-card">
            <h3 className="data-card__title">Total Balance</h3>
            <p className="data-card__value">$1,015.00</p>
            <span className="data-card__change positive">↑ 12%</span>
          </div>
          <div className="data-card">
            <h3 className="data-card__title">This Month</h3>
            <p className="data-card__value">$420.00</p>
            <span className="data-card__change positive">↑ 8%</span>
          </div>
          <div className="data-card">
            <h3 className="data-card__title">Avg. RPM</h3>
            <p className="data-card__value">$12.40</p>
            <span className="data-card__change negative">↓ 1.2%</span>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">Revenue Breakdown</h2>
            <div className="chart-actions">
              <select className="btn btn--secondary">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
          </div>
          {/* Revenue chart would go here */}
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Revenue Source</th>
                <th>Amount</th>
                <th>Change</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((item, index) => (
                <tr key={index}>
                  <td>{item.source}</td>
                  <td>${item.amount.toFixed(2)}</td>
                  <td>
                    <span className={`data-card__change ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                      {item.change}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn--secondary btn--sm">Details</button>
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

export default MonetizationDashboard;
import React from 'react';
import { Link } from 'react-router-dom';
import './AuthStyles.css';

const AuthContainer = ({ children, title, footerText, footerLink, footerLinkText }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">{title}</h1>
          <div className="auth-logo">
            <span>GreenMind</span>
          </div>
        </div>
        
        {children}
        
        <div className="auth-footer">
          <p>{footerText} <Link to={footerLink}>{footerLinkText}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
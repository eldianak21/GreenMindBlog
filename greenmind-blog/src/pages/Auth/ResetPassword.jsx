import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContainer from './AuthContainer';
import './AuthStyles.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const { email, code } = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Resetting password for:', email, 'with code:', code);
    console.log('New password:', formData.password);
    navigate('/signin'); // Redirect to sign in after reset
  };

  return (
    <AuthContainer
      title="Set New Password"
      footerText="Remember your password?"
      footerLink="/signin"
      footerLinkText="Sign In"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="auth-button">
          Reset Password
        </button>
      </form>
    </AuthContainer>
  );
};

export default ResetPassword;
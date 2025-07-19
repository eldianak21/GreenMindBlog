import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from './AuthContainer';
import './AuthStyles.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    setMessage('If an account exists with this email, you will receive a reset link.');
    navigate('/verify-reset', { state: { email } });
  };

  return (
    <AuthContainer
      title="Reset Password"
      footerText="Remember your password?"
      footerLink="/signin"
      footerLinkText="Sign In"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {message && <p className="auth-message">{message}</p>}
        
        <button type="submit" className="auth-button">
          Send Reset Link
        </button>
      </form>
    </AuthContainer>
  );
};

export default ForgotPassword;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContainer from './AuthContainer';
import './AuthStyles.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signing in with:', formData);
    // Handle sign in logic
  };

  return (
    <AuthContainer
      title="Welcome Back"
      footerText="Don't have an account?"
      footerLink="/signup"
      footerLinkText="Sign Up"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        
        <button type="submit" className="auth-button">
          Sign In
        </button>
      </form>
    </AuthContainer>
  );
};

export default SignIn;
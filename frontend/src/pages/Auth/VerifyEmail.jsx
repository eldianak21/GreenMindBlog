import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContainer from './AuthContainer';
import './AuthStyles.css';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const email = location.state?.email || 'your@email.com';

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value && !/^[0-9]$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto focus to next input
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    console.log('Verification code:', verificationCode);
    // Verify code with backend
    navigate('/'); // Redirect to home after verification
  };

  return (
    <AuthContainer
      title="Verify Your Email"
      footerText="Didn't receive a code?"
      footerLink="/resend-code"
      footerLinkText="Resend Code"
    >
      <div className="verification-message">
        <p>We've sent a 6-digit verification code to</p>
        <p className="verification-email">{email}</p>
      </div>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="verification-code">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              required
              autoFocus={index === 0}
            />
          ))}
        </div>
        
        <button type="submit" className="auth-button">
          Verify Email
        </button>
      </form>
    </AuthContainer>
  );
};

export default VerifyEmail;
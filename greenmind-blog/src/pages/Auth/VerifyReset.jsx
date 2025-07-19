import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContainer from './AuthContainer';
import './AuthStyles.css';

const VerifyReset = () => {
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
    
    if (value && index < 5) {
      document.getElementById(`reset-code-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    console.log('Reset verification code:', verificationCode);
    navigate('/reset-password', { state: { email, code: verificationCode } });
  };

  return (
    <AuthContainer
      title="Verify Reset Code"
      footerText="Didn't receive a code?"
      footerLink="/resend-reset-code"
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
              id={`reset-code-${index}`}
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
          Verify Code
        </button>
      </form>
    </AuthContainer>
  );
};

export default VerifyReset;
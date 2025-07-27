// src/pages/MainLegal/TermsOfService.jsx
import React from 'react';

const TermsOfService = () => {
  return (
    <article className="terms-service">
      <h1>Terms of Service</h1>
      <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using our service, you agree to be bound by these terms.</p>
      </section>

      <section>
        <h2>2. User Responsibilities</h2>
        <p>You agree not to misuse the service or help others do so.</p>
      </section>

      <section>
        <h2>3. Termination</h2>
        <p>We may terminate or suspend access immediately for violations.</p>
      </section>
    </article>
  );
};

// This is the crucial default export
export default TermsOfService;
// // src/pages/MainLegal/TermsOfService.jsx
// import React from 'react';

// const TermsOfService = () => {
//   return (
//     <article className="terms-service">
//       <h1>Terms of Service</h1>
//       <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
      
//       <section>
//         <h2>1. Acceptance of Terms</h2>
//         <p>By accessing or using our service, you agree to be bound by these terms.</p>
//       </section>

//       <section>
//         <h2>2. User Responsibilities</h2>
//         <p>You agree not to misuse the service or help others do so.</p>
//       </section>

//       <section>
//         <h2>3. Termination</h2>
//         <p>We may terminate or suspend access immediately for violations.</p>
//       </section>
//     </article>
//   );
// };

// // This is the crucial default export
// export default TermsOfService;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './LegalPages.css';

const TermsOfService = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <article className="terms-service">
      <header className="legal-header">
        <h1>Terms of Service</h1>
        <p className="description">
          These Terms of Service govern your use of GreenMind Blog. By accessing or using our services, you agree to comply with these terms.
        </p>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </header>

      <section className="legal-section">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using GreenMind Blog ("Service"), you accept and agree to be bound by the terms and provisions of this agreement. 
          If you do not agree to abide by these terms, please do not use this Service.
        </p>
        <p>
          We reserve the right to modify these terms at any time. You should check this page periodically for changes. 
          Your continued use of the Service following the posting of changes will mean you accept and agree to the changes.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. User Responsibilities</h2>
        <p>As a user of the Service, you agree to:</p>
        <ul>
          <li>Provide accurate and complete information when creating an account</li>
          <li>Maintain the confidentiality of your account credentials</li>
          <li>Not use the Service for any illegal or unauthorized purpose</li>
          <li>Not violate any laws in your jurisdiction (including but not limited to copyright laws)</li>
          <li>Not upload or transmit viruses or any other type of malicious code</li>
          <li>Not attempt to gain unauthorized access to any portion of the Service</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. Content Guidelines</h2>
        <h3>3.1 User-Generated Content</h3>
        <p>
          Users may post content as long as it is not illegal, obscene, threatening, defamatory, invasive of privacy, 
          infringing on intellectual property rights, or otherwise injurious to third parties.
        </p>
        
        <h3>3.2 Content Ownership</h3>
        <p>
          You retain all ownership rights to the content you create and share on our platform. However, by posting content, 
          you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display your content.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Account Management</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account and password and for restricting access 
          to your computer. You agree to accept responsibility for all activities that occur under your account.
        </p>
        <p>
          We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our sole discretion.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, 
          under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
        </p>
        <p>
          Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, 
          you may simply discontinue using the Service or contact us to delete your account.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Limitation of Liability</h2>
        <p>
          In no event shall GreenMind Blog, nor its directors, employees, partners, agents, suppliers, or affiliates, 
          be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
          loss of profits, data, use, goodwill, or other intangible losses, resulting from:
        </p>
        <ul>
          <li>Your access to or use of or inability to access or use the Service</li>
          <li>Any conduct or content of any third party on the Service</li>
          <li>Any content obtained from the Service</li>
          <li>Unauthorized access, use or alteration of your transmissions or content</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>7. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the United States, without regard to 
          its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered 
          a waiver of those rights.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
          material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a 
          material change will be determined at our sole discretion.
        </p>
      </section>

      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us:</p>
        <div className="contact-details">
          <p><strong>Email:</strong> legal@greenmindblog.com</p>
          <p><strong>Address:</strong> 123 Blog Street, San Francisco, CA 94107</p>
          <p><strong>Phone:</strong> (555) 123-4567</p>
        </div>
      </div>

      <footer className="back-to-top">
        <a href="#top">↑ Back to Top</a>
      </footer>
    </article>
  );
};

export default TermsOfService;
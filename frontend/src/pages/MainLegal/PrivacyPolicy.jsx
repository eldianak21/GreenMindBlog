// import React from 'react';

// const PrivacyPolicy = () => {
//   return (
//     <article>
//       <h1>Privacy Policy</h1>
//       <p className="last-updated">Last Updated: June 15, 2023</p>
      
//       <section>
//         <h2>1. Information We Collect</h2>
//         <p>We collect information when you register, subscribe, or interact with our site...</p>
//       </section>

//       <section>
//         <h2>2. How We Use Your Information</h2>
//         <p>Your information helps us personalize your experience and improve our website...</p>
//       </section>
//     </article>
//   );
// };

// export default PrivacyPolicy;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './LegalPages.css';

const PrivacyPolicy = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <article className="privacy-policy">
      <header className="legal-header">
        <h1>Privacy Policy</h1>
        <p className="description">
          Your privacy is important to us. This Privacy Policy explains how GreenMind Blog collects, uses, discloses, 
          and safeguards your information when you use our service.
        </p>
        <p className="last-updated">Last Updated: June 15, 2023</p>
      </header>

      <section className="legal-section">
        <h2>1. Information We Collect</h2>
        
        <h3>1.1 Personal Information</h3>
        <p>When you register on our site, subscribe to our newsletter, or interact with our platform, we may collect:</p>
        <ul>
          <li>Name and email address</li>
          <li>Profile information (bio, profile picture)</li>
          <li>Account credentials</li>
          <li>Contact information you provide</li>
        </ul>

        <h3>1.2 Usage Data</h3>
        <p>We automatically collect certain information when you visit our website:</p>
        <ul>
          <li>IP address and browser type</li>
          <li>Pages visited and time spent</li>
          <li>Device information</li>
          <li>Cookies and tracking technologies data</li>
        </ul>

        <h3>1.3 Content Data</h3>
        <p>When you create content on our platform, we collect:</p>
        <ul>
          <li>Articles, comments, and posts you create</li>
          <li>Likes, saves, and other interactions</li>
          <li>Reading preferences and history</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Personalize your experience and content recommendations</li>
          <li>Send periodic emails and updates (you can unsubscribe at any time)</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Monitor and analyze usage patterns and trends</li>
          <li>Detect, prevent, and address technical issues</li>
          <li>Enforce our terms and conditions</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. Information Sharing and Disclosure</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share information:</p>
        
        <div className="definition-list">
          <dl>
            <dt>With Service Providers:</dt>
            <dd>To assist in operating our website and conducting our business</dd>
            
            <dt>For Legal Compliance:</dt>
            <dd>When required by law or to protect our rights</dd>
            
            <dt>With Your Consent:</dt>
            <dd>When you explicitly give us permission to share</dd>
            
            <dt>Business Transfers:</dt>
            <dd>In connection with a merger, acquisition, or sale of assets</dd>
          </dl>
        </div>
      </section>

      <section className="legal-section">
        <h2>4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information. However, no method of 
          transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially 
          acceptable means to protect your information, we cannot guarantee absolute security.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Your Rights and Choices</h2>
        
        <h3>5.1 Access and Correction</h3>
        <p>You can access and update your personal information through your account settings.</p>
        
        <h3>5.2 Data Deletion</h3>
        <p>You may request deletion of your account and associated data by contacting us.</p>
        
        <h3>5.3 Opt-Out Rights</h3>
        <p>You can unsubscribe from marketing communications at any time using the link in our emails.</p>
        
        <h3>5.4 Cookie Management</h3>
        <p>You can control cookies through your browser settings. See our Cookies Policy for more information.</p>
      </section>

      <section className="legal-section">
        <h2>6. Children's Privacy</h2>
        <p>
          Our Service is not intended for children under 13. We do not knowingly collect personal information from 
          children under 13. If you become aware that a child has provided us with personal information, please 
          contact us immediately.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. International Data Transfers</h2>
        <p>
          Your information may be transferred to — and maintained on — computers located outside of your state, 
          province, country, or other governmental jurisdiction where the data protection laws may differ from 
          those of your jurisdiction.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
          Privacy Policy on this page and updating the "Last Updated" date.
        </p>
      </section>

      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>If you have questions about this Privacy Policy, please contact us:</p>
        <div className="contact-details">
          <p><strong>Data Protection Officer:</strong> privacy@greenmindblog.com</p>
          <p><strong>General Inquiries:</strong> support@greenmindblog.com</p>
          <p><strong>Mailing Address:</strong> 123 Blog Street, San Francisco, CA 94107</p>
        </div>
      </div>

      <footer className="back-to-top">
        <a href="#top">↑ Back to Top</a>
      </footer>
    </article>
  );
};

export default PrivacyPolicy;
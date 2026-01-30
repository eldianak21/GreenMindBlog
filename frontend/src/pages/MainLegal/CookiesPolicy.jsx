// import React from 'react';

// const CookiesPolicy = () => {
//   return (
//     <article>
//       <h1>Cookies Policy</h1>
//       <p className="last-updated">Last Updated: June 15, 2023</p>
      
//       <section>
//         <h2>1. What Are Cookies</h2>
//         <p>Cookies are small text files stored on your device when you visit websites...</p>
//       </section>

//       <section>
//         <h2>2. How We Use Cookies</h2>
//         <p>We use cookies to analyze traffic, personalize content, and serve targeted ads...</p>
//       </section>
//     </article>
//   );
// };

// export default CookiesPolicy;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './LegalPages.css';

const CookiesPolicy = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <article className="cookies-policy">
      <header className="legal-header">
        <h1>Cookies Policy</h1>
        <p className="description">
          This Cookies Policy explains how GreenMind Blog uses cookies and similar technologies to recognize you 
          when you visit our website. It explains what these technologies are and why we use them.
        </p>
        <p className="last-updated">Last Updated: June 15, 2023</p>
      </header>

      <section className="legal-section">
        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you visit websites. 
          They are widely used to make websites work more efficiently and provide information to the website owners.
        </p>
        <p>
          Cookies are set by the website you're visiting (first-party cookies) or by third parties (third-party cookies). 
          They can be "session cookies" (deleted when you close your browser) or "persistent cookies" (remain until deleted).
        </p>
      </section>

      <section className="legal-section">
        <h2>2. How We Use Cookies</h2>
        <p>We use cookies for several purposes:</p>
        
        <div className="definition-list">
          <dl>
            <dt>Essential Cookies:</dt>
            <dd>Required for basic website functionality (login, account security)</dd>
            
            <dt>Performance Cookies:</dt>
            <dd>Help us understand how visitors interact with our website (analytics)</dd>
            
            <dt>Functionality Cookies:</dt>
            <dd>Remember your preferences and settings (language, theme)</dd>
            
            <dt>Targeting/Advertising Cookies:</dt>
            <dd>Used to deliver relevant advertisements and measure ad effectiveness</dd>
          </dl>
        </div>
      </section>

      <section className="legal-section">
        <h2>3. Types of Cookies We Use</h2>
        
        <h3>3.1 Essential Cookies</h3>
        <p>These cookies are strictly necessary to provide you with services available through our website:</p>
        <ul>
          <li>Authentication cookies (keep you logged in)</li>
          <li>Security cookies (protect against attacks)</li>
          <li>Load balancing cookies (distribute traffic)</li>
        </ul>

        <h3>3.2 Analytics and Performance Cookies</h3>
        <p>These cookies help us understand how our website is being used:</p>
        <ul>
          <li>Google Analytics cookies (anonymous usage data)</li>
          <li>Heatmap cookies (user interaction patterns)</li>
          <li>Error reporting cookies (identify technical issues)</li>
        </ul>

        <h3>3.3 Functionality Cookies</h3>
        <p>These cookies enable enhanced functionality and personalization:</p>
        <ul>
          <li>Language preference cookies</li>
          <li>Theme/display preference cookies</li>
          <li>Font size preference cookies</li>
          <li>Reading progress cookies</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Third-Party Cookies</h2>
        <p>
          In addition to our own cookies, we may also use various third-party cookies to report usage statistics, 
          deliver advertisements, and provide other services.
        </p>
        <p>Third-party services that may set cookies on our website include:</p>
        <ul>
          <li>Google Analytics for website analytics</li>
          <li>Social media platforms for sharing features</li>
          <li>Advertising networks for relevant ads</li>
          <li>Payment processors for transactions</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>5. How to Control Cookies</h2>
        
        <h3>5.1 Browser Controls</h3>
        <p>
          Most web browsers allow you to control cookies through their settings preferences. You can:
        </p>
        <ul>
          <li>See what cookies are set and delete them individually</li>
          <li>Block third-party cookies</li>
          <li>Block all cookies</li>
          <li>Delete all cookies when you close your browser</li>
        </ul>
        <p>
          However, please note that if you delete cookies or refuse to accept them, you might not be able to use 
          all the features we offer.
        </p>

        <h3>5.2 Cookie Consent Manager</h3>
        <p>
          When you first visit our website, you can choose which types of cookies to accept through our cookie 
          consent banner. You can change these preferences at any time by clicking the "Cookie Settings" link in 
          the footer of our website.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Do Not Track Signals</h2>
        <p>
          Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not 
          want to have your online activity tracked. Currently, we do not respond to DNT signals because there is 
          no common industry standard for how to respond.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Updates to This Policy</h2>
        <p>
          We may update this Cookies Policy from time to time to reflect changes in technology, legislation, or 
          our data practices. We encourage you to check this page periodically for the latest information.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Additional Information</h2>
        <p>
          For more information about cookies, including how to see what cookies have been set and how to manage 
          and delete them, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
        </p>
      </section>

      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>If you have any questions about our use of cookies, please contact us:</p>
        <div className="contact-details">
          <p><strong>Email:</strong> privacy@greenmindblog.com</p>
          <p><strong>Subject:</strong> Cookies Policy Inquiry</p>
          <p><strong>Response Time:</strong> We aim to respond within 5 business days</p>
        </div>
      </div>

      <footer className="back-to-top">
        <a href="#top">↑ Back to Top</a>
      </footer>
    </article>
  );
};

export default CookiesPolicy;
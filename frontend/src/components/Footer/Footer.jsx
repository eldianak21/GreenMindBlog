import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h3>GreenMind</h3>
          <p>Sharing knowledge, inspiring change.</p>
        </div>
        <div className="footer-links">
          <div className="link-column">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="link-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/guides">Guides</a></li>
              <li><a href="/webinars">Webinars</a></li>
            </ul>
          </div>
          <div className="link-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Terms</a></li>
              <li><a href="/cookies">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} GreenMind Blog. All rights reserved.</p>
        <div className="social-links">
          <a href="#" aria-label="Twitter">Twitter</a>
          <a href="#" aria-label="LinkedIn">LinkedIn</a>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="GitHub">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
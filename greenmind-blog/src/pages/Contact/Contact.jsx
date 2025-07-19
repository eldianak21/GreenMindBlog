import React, { useState } from 'react';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend, 
  FiCheckCircle,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiFacebook
} from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset submission status after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you! Reach out for collaborations, questions, or feedback.</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="contact-content">
        {/* Contact Form */}
        <section className="contact-form-section">
          <h2>Send Us a Message</h2>
          
          {isSubmitted ? (
            <div className="success-message">
              <FiCheckCircle className="success-icon" />
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
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
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                <FiSend className="button-icon" />
                Send Message
              </button>
            </form>
          )}
        </section>

        {/* Contact Info */}
        <section className="contact-info-section">
          <h2>Contact Information</h2>
          
          <div className="contact-info-card">
            <div className="info-item">
              <div className="info-icon">
                <FiMail />
              </div>
              <div className="info-content">
                <h3>Email</h3>
                <p>hello@greenmindblog.com</p>
                <p>support@greenmindblog.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <FiPhone />
              </div>
              <div className="info-content">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
                <p>Mon-Fri: 9am-5pm EST</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <FiMapPin />
              </div>
              <div className="info-content">
                <h3>Office</h3>
                <p>123 Green Street</p>
                <p>Eco City, EC 10001</p>
              </div>
            </div>
          </div>
          
         <div className="social-icons">
  <a href="#" aria-label="Twitter">
    <FiTwitter />
  </a>
  <a href="#" aria-label="LinkedIn">
    <FiLinkedin />
  </a>
  <a href="#" aria-label="Instagram">
    <FiInstagram />
  </a>
  <a href="#" aria-label="Facebook">
    <FiFacebook />
  </a>
</div>
        </section>
      </div>

      {/* Map Placeholder */}
      <section className="map-section">
        <div className="map-placeholder">
          <h3>Our Location</h3>
          <div className="map-frame">
            {/* In a real app, you would embed a Google Map or similar here */}
            <p>Map would be displayed here</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
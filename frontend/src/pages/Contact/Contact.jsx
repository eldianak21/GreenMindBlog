// import React, { useState } from 'react';
// import { 
//   FiMail, 
//   FiPhone, 
//   FiMapPin, 
//   FiSend, 
//   FiCheckCircle,
//   FiTwitter,
//   FiLinkedin,
//   FiInstagram,
//   FiFacebook
// } from 'react-icons/fi';
// import './Contact.css';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In a real app, you would send the form data to your backend
//     console.log('Form submitted:', formData);
//     setIsSubmitted(true);
//     setFormData({
//       name: '',
//       email: '',
//       subject: '',
//       message: ''
//     });
    
//     // Reset submission status after 3 seconds
//     setTimeout(() => {
//       setIsSubmitted(false);
//     }, 3000);
//   };

//   return (
//     <div className="contact-container">
//       {/* Hero Section */}
//       <section className="contact-hero">
//         <div className="contact-hero-content">
//           <h1>Get in Touch</h1>
//           <p>We'd love to hear from you! Reach out for collaborations, questions, or feedback.</p>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="contact-content">
//         {/* Contact Form */}
//         <section className="contact-form-section">
//           <h2>Send Us a Message</h2>
          
//           {isSubmitted ? (
//             <div className="success-message">
//               <FiCheckCircle className="success-icon" />
//               <h3>Thank You!</h3>
//               <p>Your message has been sent successfully. We'll get back to you soon.</p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="contact-form">
//               <div className="form-group">
//                 <label htmlFor="name">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="subject">Subject</label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="message">Message</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows="6"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//               </div>
              
//               <button type="submit" className="submit-button">
//                 <FiSend className="button-icon" />
//                 Send Message
//               </button>
//             </form>
//           )}
//         </section>

//         {/* Contact Info */}
//         <section className="contact-info-section">
//           <h2>Contact Information</h2>
          
//           <div className="contact-info-card">
//             <div className="info-item">
//               <div className="info-icon">
//                 <FiMail />
//               </div>
//               <div className="info-content">
//                 <h3>Email</h3>
//                 <p>hello@greenmindblog.com</p>
//                 <p>support@greenmindblog.com</p>
//               </div>
//             </div>
            
//             <div className="info-item">
//               <div className="info-icon">
//                 <FiPhone />
//               </div>
//               <div className="info-content">
//                 <h3>Phone</h3>
//                 <p>+1 (555) 123-4567</p>
//                 <p>Mon-Fri: 9am-5pm EST</p>
//               </div>
//             </div>
            
//             <div className="info-item">
//               <div className="info-icon">
//                 <FiMapPin />
//               </div>
//               <div className="info-content">
//                 <h3>Office</h3>
//                 <p>123 Green Street</p>
//                 <p>Eco City, EC 10001</p>
//               </div>
//             </div>
//           </div>
          
//          <div className="social-icons">
//   <a href="#" aria-label="Twitter">
//     <FiTwitter />
//   </a>
//   <a href="#" aria-label="LinkedIn">
//     <FiLinkedin />
//   </a>
//   <a href="#" aria-label="Instagram">
//     <FiInstagram />
//   </a>
//   <a href="#" aria-label="Facebook">
//     <FiFacebook />
//   </a>
// </div>
//         </section>
//       </div>

//       {/* Map Placeholder */}
//       <section className="map-section">
//         <div className="map-placeholder">
//           <h3>Our Location</h3>
//           <div className="map-frame">
//             {/* In a real app, you would embed a Google Map or similar here */}
//             <p>Map would be displayed here</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    }, 1000);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get In Touch</h1>
          <p className="hero-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <div className="contact-container">
        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info-section">
            <h2 className="section-title">Contact Information</h2>
            <p className="section-subtitle">
              Feel free to reach out through any of these channels
            </p>
            
            <div className="contact-info-grid">
              <div className="contact-info-card">
                <div className="contact-icon">
                  <FiMail />
                </div>
                <h3>Email</h3>
                <p>support@greenmindblog.com</p>
                <a href="mailto:support@greenmindblog.com" className="contact-link">
                  Send us an email
                </a>
              </div>
              
              <div className="contact-info-card">
                <div className="contact-icon">
                  <FiPhone />
                </div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
                <p className="contact-hours">Mon-Fri, 9AM-6PM EST</p>
              </div>
              
              <div className="contact-info-card">
                <div className="contact-icon">
                  <FiMapPin />
                </div>
                <h3>Office</h3>
                <p>123 Blog Street</p>
                <p>San Francisco, CA 94107</p>
                <p>United States</p>
              </div>
            </div>
            
            <div className="social-contact">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">GitHub</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2 className="section-title">Send us a Message</h2>
            
            {submitMessage && (
              <div className="success-message">
                {submitMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">
                  <FiUser className="form-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">
                  <FiMail className="form-icon" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">
                  <FiMessageSquare className="form-icon" />
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">
                  <FiMessageSquare className="form-icon" />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="6"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="button-loading">
                    <span className="spinner"></span>
                    Sending...
                  </span>
                ) : (
                  <>
                    <FiSend className="button-icon" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How can I contribute to the blog?</h3>
              <p>
                We welcome guest contributors! Please visit our "Write for Us" page 
                to learn about submission guidelines and the review process.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>How long does it take to get a response?</h3>
              <p>
                We typically respond to inquiries within 24-48 hours during business 
                days. For urgent matters, please contact us via phone.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Can I advertise on GreenMind?</h3>
              <p>
                Yes, we offer advertising opportunities. Please contact our 
                partnerships team at ads@greenmindblog.com for more information.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Do you offer API access?</h3>
              <p>
                Yes, we provide API access for approved developers and partners. 
                Contact our technical team for documentation and access requests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2 className="section-title">Visit Our Office</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <FiMapPin className="map-icon" />
              <h3>San Francisco Office</h3>
              <p>123 Blog Street, San Francisco, CA 94107</p>
              <p className="map-hours">Open: Mon-Fri, 9AM-6PM EST</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
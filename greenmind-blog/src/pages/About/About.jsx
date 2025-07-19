import React from 'react';
import { FiUsers, FiBook, FiAward, FiGlobe } from 'react-icons/fi';
import './About.css';

const About = () => {
  const stats = [
    { value: '500+', label: 'Articles Published', icon: <FiBook /> },
    { value: '50K+', label: 'Monthly Readers', icon: <FiUsers /> },
    { value: '100+', label: 'Expert Contributors', icon: <FiAward /> },
    { value: '10+', label: 'Countries Reached', icon: <FiGlobe /> }
  ];

  const team = [
    { name: 'Alex Johnson', role: 'Founder & Editor', bio: 'Tech enthusiast with 10+ years in content creation', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Sarah Miller', role: 'Lead Writer', bio: 'Specializes in sustainable technology and design', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'David Chen', role: 'Developer Advocate', bio: 'Bridges the gap between developers and content', img: 'https://randomuser.me/api/portraits/men/22.jpg' }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About GreenMind</h1>
          <p className="subtitle">Where knowledge meets sustainability</p>
          <p className="description">
            Founded in 2023, GreenMind is a premier destination for thought-provoking content 
            on technology, design, and sustainable living. We're committed to delivering 
            high-quality, well-researched articles that inspire positive change.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <div className="mission-points">
            <div className="mission-point">
              <h3>Educate</h3>
              <p>Provide accessible, well-researched content that empowers our readers</p>
            </div>
            <div className="mission-point">
              <h3>Inspire</h3>
              <p>Spark creativity and innovation through diverse perspectives</p>
            </div>
            <div className="mission-point">
              <h3>Sustain</h3>
              <p>Promote environmentally conscious practices in tech and design</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.img} alt={member.name} className="team-photo" />
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Join Our Community</h2>
        <p>Whether as a reader or contributor, we'd love to have you be part of GreenMind</p>
        <div className="cta-buttons">
          <button className="primary-button">Subscribe to Newsletter</button>
          <button className="secondary-button">Write for Us</button>
        </div>
      </section>
    </div>
  );
};

export default About;
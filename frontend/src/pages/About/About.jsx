// import React from 'react';
// import { FiUsers, FiBook, FiAward, FiGlobe } from 'react-icons/fi';
// import './About.css';

// const About = () => {
//   const stats = [
//     { value: '500+', label: 'Articles Published', icon: <FiBook /> },
//     { value: '50K+', label: 'Monthly Readers', icon: <FiUsers /> },
//     { value: '100+', label: 'Expert Contributors', icon: <FiAward /> },
//     { value: '10+', label: 'Countries Reached', icon: <FiGlobe /> }
//   ];

//   const team = [
//     { name: 'Alex Johnson', role: 'Founder & Editor', bio: 'Tech enthusiast with 10+ years in content creation', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
//     { name: 'Sarah Miller', role: 'Lead Writer', bio: 'Specializes in sustainable technology and design', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
//     { name: 'David Chen', role: 'Developer Advocate', bio: 'Bridges the gap between developers and content', img: 'https://randomuser.me/api/portraits/men/22.jpg' }
//   ];

//   return (
//     <div className="about-container">
//       {/* Hero Section */}
//       <section className="about-hero">
//         <div className="about-hero-content">
//           <h1>About GreenMind</h1>
//           <p className="subtitle">Where knowledge meets sustainability</p>
//           <p className="description">
//             Founded in 2023, GreenMind is a premier destination for thought-provoking content 
//             on technology, design, and sustainable living. We're committed to delivering 
//             high-quality, well-researched articles that inspire positive change.
//           </p>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="stats-section">
//         <div className="stats-grid">
//           {stats.map((stat, index) => (
//             <div key={index} className="stat-card">
//               <div className="stat-icon">{stat.icon}</div>
//               <h3>{stat.value}</h3>
//               <p>{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Mission Section */}
//       <section className="mission-section">
//         <div className="mission-content">
//           <h2>Our Mission</h2>
//           <div className="mission-points">
//             <div className="mission-point">
//               <h3>Educate</h3>
//               <p>Provide accessible, well-researched content that empowers our readers</p>
//             </div>
//             <div className="mission-point">
//               <h3>Inspire</h3>
//               <p>Spark creativity and innovation through diverse perspectives</p>
//             </div>
//             <div className="mission-point">
//               <h3>Sustain</h3>
//               <p>Promote environmentally conscious practices in tech and design</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="team-section">
//         <h2>Meet Our Team</h2>
//         <div className="team-grid">
//           {team.map((member, index) => (
//             <div key={index} className="team-card">
//               <img src={member.img} alt={member.name} className="team-photo" />
//               <h3>{member.name}</h3>
//               <p className="role">{member.role}</p>
//               <p className="bio">{member.bio}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="about-cta">
//         <h2>Join Our Community</h2>
//         <p>Whether as a reader or contributor, we'd love to have you be part of GreenMind</p>
//         <div className="cta-buttons">
//           <button className="primary-button">Subscribe to Newsletter</button>
//           <button className="secondary-button">Write for Us</button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;

import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About GreenMind</h1>
          <p className="hero-subtitle">
            Empowering minds, inspiring change through knowledge sharing
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="icon-wrapper">
                <span className="icon">🎯</span>
              </div>
              <h3>Our Mission</h3>
              <p>
                To create a platform where knowledge meets inspiration, enabling 
                individuals to grow, learn, and contribute to meaningful conversations 
                that shape our future.
              </p>
            </div>
            
            <div className="vision-card">
              <div className="icon-wrapper">
                <span className="icon">🔭</span>
              </div>
              <h3>Our Vision</h3>
              <p>
                To become the world's most trusted platform for thought leadership, 
                where diverse perspectives converge to solve complex challenges 
                and drive positive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="story-content">
            <h2 className="section-title">Our Story</h2>
            <div className="story-text">
              <p>
                Founded in 2020, GreenMind began as a simple idea: to create a space 
                where curiosity could thrive and knowledge could be shared freely. 
                What started as a small blog among friends has grown into a vibrant 
                community of writers, thinkers, and learners.
              </p>
              <p>
                Today, we host thousands of articles across various domains, reaching 
                millions of readers worldwide. Our commitment remains the same: to 
                provide a platform that celebrates diverse voices and fosters meaningful 
                conversations.
              </p>
            </div>
            <div className="milestones">
              <div className="milestone">
                <h4>50K+</h4>
                <p>Articles Published</p>
              </div>
              <div className="milestone">
                <h4>5M+</h4>
                <p>Monthly Readers</p>
              </div>
              <div className="milestone">
                <h4>150+</h4>
                <p>Countries Reached</p>
              </div>
              <div className="milestone">
                <h4>10K+</h4>
                <p>Active Writers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="our-values">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Authenticity</h3>
              <p>We believe in genuine, well-researched content that adds real value to our readers' lives.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>We're committed to environmentally conscious practices and promoting sustainable thinking.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>We foster a supportive environment where everyone can share, learn, and grow together.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>We constantly evolve to provide the best reading and writing experience for our users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="our-team">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            Passionate individuals dedicated to making knowledge accessible to everyone
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">SD</div>
              <h4>Sarah Johnson</h4>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">
                Passionate about creating spaces for meaningful conversations and knowledge sharing.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">MR</div>
              <h4>Michael Chen</h4>
              <p className="member-role">CTO</p>
              <p className="member-bio">
                Tech enthusiast focused on building scalable, user-friendly platforms.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">AD</div>
              <h4>Aisha Patel</h4>
              <p className="member-role">Content Director</p>
              <p className="member-bio">
                Curates and guides content strategy to ensure quality and diversity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Community</h2>
            <p>
              Whether you're a reader, writer, or thinker, there's a place for you 
              in the GreenMind community.
            </p>
            <div className="cta-buttons">
              <a href="/signup" className="cta-button primary">Start Reading</a>
              <a href="/signup" className="cta-button secondary">Start Writing</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
import React from 'react';
import { FiBriefcase, FiDollarSign, FiMapPin, FiClock, FiCheckCircle } from 'react-icons/fi';
import './Careers.css';

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Frontend Developer",
      type: "Full-time",
      location: "Remote",
      salary: "$80,000 - $100,000",
      description: "We're looking for an experienced React developer to join our team and help build our next generation of web applications.",
      responsibilities: [
        "Develop new user-facing features",
        "Build reusable components and front-end libraries",
        "Optimize applications for maximum performance",
        "Collaborate with design and backend teams"
      ],
      requirements: [
        "3+ years experience with React",
        "Proficient in JavaScript, HTML, CSS",
        "Experience with Redux or Context API",
        "Familiarity with RESTful APIs"
      ]
    },
    {
      id: 2,
      title: "Content Writer",
      type: "Part-time",
      location: "Remote",
      salary: "$40 - $60 per article",
      description: "Join our editorial team to create engaging content about technology, design, and sustainability.",
      responsibilities: [
        "Research and write high-quality articles",
        "Collaborate with editors and designers",
        "Stay updated on industry trends",
        "Optimize content for SEO"
      ],
      requirements: [
        "2+ years writing experience",
        "Strong research skills",
        "Knowledge of tech/design topics",
        "SEO understanding is a plus"
      ]
    },
    {
      id: 3,
      title: "UX/UI Designer",
      type: "Contract",
      location: "Remote",
      salary: "$60 - $80 per hour",
      description: "Help us create beautiful, intuitive interfaces for our digital products.",
      responsibilities: [
        "Create user flows and wireframes",
        "Design high-fidelity mockups",
        "Conduct user research",
        "Collaborate with development team"
      ],
      requirements: [
        "Portfolio demonstrating UI/UX work",
        "Proficiency in Figma or Sketch",
        "Understanding of design systems",
        "Experience with user testing"
      ]
    }
  ];

  const benefits = [
    {
      icon: <FiBriefcase />,
      title: "Flexible Work",
      description: "Remote work options and flexible schedules"
    },
    {
      icon: <FiDollarSign />,
      title: "Competitive Pay",
      description: "Industry-competitive salaries and bonuses"
    },
    {
      icon: <FiMapPin />,
      title: "Global Team",
      description: "Work with talented people around the world"
    },
    {
      icon: <FiClock />,
      title: "Generous Time Off",
      description: "Unlimited PTO and paid holidays"
    }
  ];

  return (
    <div className="careers-container">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="careers-hero-content">
          <h1>Join Our Team</h1>
          <p>Help us create meaningful content and build innovative products</p>
          <button className="cta-button">View Open Positions</button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Why Work With Us</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="positions-section">
        <h2>Current Openings</h2>
        <div className="positions-list">
          {jobOpenings.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <h3>{job.title}</h3>
                <div className="job-meta">
                  <span><FiBriefcase /> {job.type}</span>
                  <span><FiMapPin /> {job.location}</span>
                  <span><FiDollarSign /> {job.salary}</span>
                </div>
              </div>
              <div className="job-content">
                <p className="job-description">{job.description}</p>
                
                <div className="job-details">
                  <div className="responsibilities">
                    <h4>Responsibilities</h4>
                    <ul>
                      {job.responsibilities.map((item, i) => (
                        <li key={i}><FiCheckCircle /> {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="requirements">
                    <h4>Requirements</h4>
                    <ul>
                      {job.requirements.map((item, i) => (
                        <li key={i}><FiCheckCircle /> {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <button className="apply-button">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Culture Section */}
      <section className="culture-section">
        <div className="culture-content">
          <h2>Our Culture</h2>
          <p>
            At GreenMind, we believe in fostering a creative, inclusive environment where everyone 
            can do their best work. We value transparency, collaboration, and continuous learning.
          </p>
          <div className="culture-points">
            <div className="culture-point">
              <FiCheckCircle />
              <span>Mission-driven work</span>
            </div>
            <div className="culture-point">
              <FiCheckCircle />
              <span>Diverse perspectives</span>
            </div>
            <div className="culture-point">
              <FiCheckCircle />
              <span>Work-life balance</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
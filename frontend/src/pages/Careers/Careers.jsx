// import React from 'react';
// import { FiBriefcase, FiDollarSign, FiMapPin, FiClock, FiCheckCircle } from 'react-icons/fi';
// import './Careers.css';

// const Careers = () => {
//   const jobOpenings = [
//     {
//       id: 1,
//       title: "Frontend Developer",
//       type: "Full-time",
//       location: "Remote",
//       salary: "$80,000 - $100,000",
//       description: "We're looking for an experienced React developer to join our team and help build our next generation of web applications.",
//       responsibilities: [
//         "Develop new user-facing features",
//         "Build reusable components and front-end libraries",
//         "Optimize applications for maximum performance",
//         "Collaborate with design and backend teams"
//       ],
//       requirements: [
//         "3+ years experience with React",
//         "Proficient in JavaScript, HTML, CSS",
//         "Experience with Redux or Context API",
//         "Familiarity with RESTful APIs"
//       ]
//     },
//     {
//       id: 2,
//       title: "Content Writer",
//       type: "Part-time",
//       location: "Remote",
//       salary: "$40 - $60 per article",
//       description: "Join our editorial team to create engaging content about technology, design, and sustainability.",
//       responsibilities: [
//         "Research and write high-quality articles",
//         "Collaborate with editors and designers",
//         "Stay updated on industry trends",
//         "Optimize content for SEO"
//       ],
//       requirements: [
//         "2+ years writing experience",
//         "Strong research skills",
//         "Knowledge of tech/design topics",
//         "SEO understanding is a plus"
//       ]
//     },
//     {
//       id: 3,
//       title: "UX/UI Designer",
//       type: "Contract",
//       location: "Remote",
//       salary: "$60 - $80 per hour",
//       description: "Help us create beautiful, intuitive interfaces for our digital products.",
//       responsibilities: [
//         "Create user flows and wireframes",
//         "Design high-fidelity mockups",
//         "Conduct user research",
//         "Collaborate with development team"
//       ],
//       requirements: [
//         "Portfolio demonstrating UI/UX work",
//         "Proficiency in Figma or Sketch",
//         "Understanding of design systems",
//         "Experience with user testing"
//       ]
//     }
//   ];

//   const benefits = [
//     {
//       icon: <FiBriefcase />,
//       title: "Flexible Work",
//       description: "Remote work options and flexible schedules"
//     },
//     {
//       icon: <FiDollarSign />,
//       title: "Competitive Pay",
//       description: "Industry-competitive salaries and bonuses"
//     },
//     {
//       icon: <FiMapPin />,
//       title: "Global Team",
//       description: "Work with talented people around the world"
//     },
//     {
//       icon: <FiClock />,
//       title: "Generous Time Off",
//       description: "Unlimited PTO and paid holidays"
//     }
//   ];

//   return (
//     <div className="careers-container">
//       {/* Hero Section */}
//       <section className="careers-hero">
//         <div className="careers-hero-content">
//           <h1>Join Our Team</h1>
//           <p>Help us create meaningful content and build innovative products</p>
//           <button className="cta-button">View Open Positions</button>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="benefits-section">
//         <h2>Why Work With Us</h2>
//         <div className="benefits-grid">
//           {benefits.map((benefit, index) => (
//             <div key={index} className="benefit-card">
//               <div className="benefit-icon">{benefit.icon}</div>
//               <h3>{benefit.title}</h3>
//               <p>{benefit.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Open Positions */}
//       <section className="positions-section">
//         <h2>Current Openings</h2>
//         <div className="positions-list">
//           {jobOpenings.map(job => (
//             <div key={job.id} className="job-card">
//               <div className="job-header">
//                 <h3>{job.title}</h3>
//                 <div className="job-meta">
//                   <span><FiBriefcase /> {job.type}</span>
//                   <span><FiMapPin /> {job.location}</span>
//                   <span><FiDollarSign /> {job.salary}</span>
//                 </div>
//               </div>
//               <div className="job-content">
//                 <p className="job-description">{job.description}</p>
                
//                 <div className="job-details">
//                   <div className="responsibilities">
//                     <h4>Responsibilities</h4>
//                     <ul>
//                       {job.responsibilities.map((item, i) => (
//                         <li key={i}><FiCheckCircle /> {item}</li>
//                       ))}
//                     </ul>
//                   </div>
                  
//                   <div className="requirements">
//                     <h4>Requirements</h4>
//                     <ul>
//                       {job.requirements.map((item, i) => (
//                         <li key={i}><FiCheckCircle /> {item}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
                
//                 <button className="apply-button">Apply Now</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Culture Section */}
//       <section className="culture-section">
//         <div className="culture-content">
//           <h2>Our Culture</h2>
//           <p>
//             At GreenMind, we believe in fostering a creative, inclusive environment where everyone 
//             can do their best work. We value transparency, collaboration, and continuous learning.
//           </p>
//           <div className="culture-points">
//             <div className="culture-point">
//               <FiCheckCircle />
//               <span>Mission-driven work</span>
//             </div>
//             <div className="culture-point">
//               <FiCheckCircle />
//               <span>Diverse perspectives</span>
//             </div>
//             <div className="culture-point">
//               <FiCheckCircle />
//               <span>Work-life balance</span>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Careers;

import React from 'react';
import { FiBriefcase, FiDollarSign, FiUsers, FiGlobe, FiCalendar, FiMapPin } from 'react-icons/fi';
import './Careers.css';

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Build beautiful, responsive user interfaces for our blogging platform.'
    },
    {
      id: 2,
      title: 'Content Strategist',
      department: 'Content',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Develop and execute content strategies to engage our growing community.'
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Create intuitive and delightful user experiences for our platform.'
    },
    {
      id: 4,
      title: 'Community Manager',
      department: 'Community',
      location: 'Remote',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Engage with our community and help writers succeed on our platform.'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Build and maintain scalable infrastructure for our growing platform.'
    },
    {
      id: 6,
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Develop and execute marketing campaigns to grow our user base.'
    }
  ];

  const benefits = [
    {
      icon: '🏖️',
      title: 'Flexible Time Off',
      description: 'Take the time you need to recharge and come back refreshed.'
    },
    {
      icon: '💻',
      title: 'Remote Work',
      description: 'Work from anywhere - we support flexible work arrangements.'
    },
    {
      icon: '🏥',
      title: 'Health Insurance',
      description: 'Comprehensive medical, dental, and vision coverage.'
    },
    {
      icon: '📚',
      title: 'Learning Budget',
      description: 'Annual budget for courses, books, and conferences.'
    },
    {
      icon: '🏡',
      title: 'Home Office Setup',
      description: 'Budget to set up your perfect home office environment.'
    },
    {
      icon: '🎉',
      title: 'Team Retreats',
      description: 'Regular company retreats to connect and collaborate.'
    }
  ];

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="careers-hero-content">
          <h1>Build the Future of Blogging</h1>
          <p className="hero-subtitle">
            Join our mission to create the world's most engaging platform for writers and readers.
          </p>
          <a href="#openings" className="cta-button">View Open Positions</a>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="why-work-with-us">
        <div className="container">
          <h2 className="section-title">Why Work at GreenMind</h2>
          <p className="section-subtitle">
            We're building more than just a platform - we're creating a community
          </p>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FiUsers />
              </div>
              <h3>Impact Millions</h3>
              <p>
                Your work will directly impact millions of readers and writers worldwide,
                helping share knowledge and foster meaningful conversations.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FiBriefcase />
              </div>
              <h3>Growth Mindset</h3>
              <p>
                We believe in continuous learning and provide ample opportunities for
                professional development and career growth.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FiGlobe />
              </div>
              <h3>Global Community</h3>
              <p>
                Join a diverse, distributed team working together to build a truly
                global platform for knowledge sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Perks & Benefits</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="job-openings">
        <div className="container">
          <h2 className="section-title">Open Positions</h2>
          <p className="section-subtitle">
            Ready to join our team? Check out our current openings
          </p>
          
          <div className="job-filters">
            <button className="filter-button active">All</button>
            <button className="filter-button">Engineering</button>
            <button className="filter-button">Design</button>
            <button className="filter-button">Marketing</button>
            <button className="filter-button">Content</button>
            <button className="filter-button">Community</button>
          </div>
          
          <div className="jobs-grid">
            {jobOpenings.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <span className="department-badge">{job.department}</span>
                </div>
                
                <p className="job-description">{job.description}</p>
                
                <div className="job-details">
                  <div className="detail-item">
                    <FiMapPin className="detail-icon" />
                    <span>{job.location}</span>
                  </div>
                  
                  <div className="detail-item">
                    <FiCalendar className="detail-icon" />
                    <span>{job.type}</span>
                  </div>
                  
                  <div className="detail-item">
                    <FiBriefcase className="detail-icon" />
                    <span>{job.experience}</span>
                  </div>
                </div>
                
                <button className="apply-button">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="hiring-process">
        <div className="container">
          <h2 className="section-title">Our Hiring Process</h2>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Initial Application</h3>
              <p>
                Submit your application through our portal. We review every 
                application carefully.
              </p>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Initial Screening</h3>
              <p>
                A 30-minute video call with our recruiting team to learn more 
                about your experience and aspirations.
              </p>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Skills Assessment</h3>
              <p>
                A practical assessment relevant to the role to evaluate your 
                skills and problem-solving approach.
              </p>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Team Interviews</h3>
              <p>
                Meet with potential teammates and managers to discuss technical 
                challenges and team fit.
              </p>
            </div>
            
            <div className="process-step">
              <div className="step-number">5</div>
              <h3>Offer</h3>
              <p>
                Receive an offer to join our team and start your journey with 
                GreenMind!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="careers-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Don't See the Perfect Role?</h2>
            <p>
              We're always looking for talented people to join our team. 
              Send us your resume and tell us how you can contribute.
            </p>
            <button className="cta-button">
              Submit General Application
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
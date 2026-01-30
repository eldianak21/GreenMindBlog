// import React from 'react';
// import { Routes, Route, Outlet, Link } from 'react-router-dom';
// import PrivacyPolicy from './PrivacyPolicy'; // Add this import
// import TermsOfService from './TermsOfService'; // Add this import
// import CookiesPolicy from './CookiesPolicy';
// import './LegalPages.css';

// const LegalLayout = () => {
//   return (
//     <div className="legal-container">
//       <div className="legal-sidebar">
//         <h2>Legal Information</h2>
//         <nav>
//           <ul>
//             <li><Link to="/legal/privacy">Privacy Policy</Link></li>
//             <li><Link to="/legal/terms">Terms of Service</Link></li>
//             <li><Link to="/legal/cookies">Cookies Policy</Link></li>
//           </ul>
//         </nav>
//       </div>
//       <div className="legal-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// const LegalRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<LegalLayout />}>
//         <Route path="privacy" element={<PrivacyPolicy />} />
//         <Route path="terms" element={<TermsOfService />} />
//         <Route path="cookies" element={<CookiesPolicy />} />
//         <Route index element={<PrivacyPolicy />} />
//       </Route>
//     </Routes>
//   );
// };

// export default LegalRoutes;

import React from 'react';
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import CookiesPolicy from './CookiesPolicy';
import './LegalPages.css';

const LegalLayout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === `/legal${path}` || 
           (location.pathname === '/legal' && path === '/privacy');
  };

  return (
    <div className="legal-container">
      <div className="legal-sidebar">
        <h2>Legal Information</h2>
        <nav>
          <ul>
            <li>
              <Link 
                to="/legal/privacy" 
                className={isActive('/privacy') ? 'active' : ''}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link 
                to="/legal/terms" 
                className={isActive('/terms') ? 'active' : ''}
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link 
                to="/legal/cookies" 
                className={isActive('/cookies') ? 'active' : ''}
              >
                Cookies Policy
              </Link>
            </li>
            <li>
              <Link 
                to="/legal/service" 
                className={isActive('/service') ? 'active' : ''}
              >
                Service Level Agreement
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="legal-content">
        <Outlet />
      </div>
    </div>
  );
};

const LegalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LegalLayout />}>
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="cookies" element={<CookiesPolicy />} />
        <Route index element={<PrivacyPolicy />} />
      </Route>
    </Routes>
  );
};

export default LegalRoutes;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Careers from './pages/Careers/Careers';
import LegalRoutes from './pages/MainLegal/LegalRoutes';
import EngagementDashboard from './pages/Dashboards/EngagementDashboard';
import ContentDashboard from './pages/Dashboards/ContentDashboard';
import AnalyticsDashboard from './pages/Dashboards/AnalyticsDashboard';
import MonetizationDashboard from './pages/Dashboards/MonetizationDashboard';
import SEODashboard from './pages/Dashboards/SEODashboard';
import VerifyEmail from './pages/Auth/VerifyEmail';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import ForgotPassword from './pages/Auth/ForgotPassword';
import VerifyReset from './pages/Auth/VerifyReset';
import ResetPassword from './pages/Auth/ResetPassword';
import Account from './pages/Account/Account';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Main Home Route */}
          <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/careers" element={<Careers />} />
           <Route path="/legal/*" element={<LegalRoutes />} />
               <Route path="/engagement-dashboard" element={<EngagementDashboard/>} />
               <Route path="/content-dashboard" element={<ContentDashboard/>} />
               <Route path="/analytics-dashboard" element={<AnalyticsDashboard/>} />
               <Route path="/monetization-dashboard" element={<MonetizationDashboard/>} />
               <Route path="/seo-dashboard" element={<SEODashboard/>} />
                <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset" element={<VerifyReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
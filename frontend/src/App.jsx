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
// Remove CreateBlog import for now since we haven't created it yet
// import CreateBlog from './pages/Blog/CreateBlog';
import BlogPost from './pages/Blog/BlogPost';
import BlogCategory from './pages/Blog/BlogCategory';
import MainLayout from './components/Layout/MainLayout';
import './App.css';

// MainLayout wrapper component for pages that need header and footer
const withMainLayout = (Component, props = {}) => {
  return function MainLayoutWrapper() {
    return (
      <MainLayout {...props}>
        <Component />
      </MainLayout>
    );
  };
};

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public routes with MainLayout (Header & Footer) */}
          <Route path="/" element={withMainLayout(Home)} />
          <Route path="/about" element={withMainLayout(About)} />
          <Route path="/contact" element={withMainLayout(Contact)} />
          <Route path="/careers" element={withMainLayout(Careers)} />
          
          {/* Blog Routes */}
          {/* Comment out CreateBlog route for now */}
          {/* <Route path="/blog/create" element={withMainLayout(CreateBlog)} /> */}
          <Route path="/blog/:id" element={withMainLayout(BlogPost)} />
          <Route path="/category/:category" element={withMainLayout(BlogCategory)} />
          
          {/* Legal Routes - Uses its own layout */}
          <Route path="/legal/*" element={<LegalRoutes />} />
          
          {/* Dashboard Routes - Protected, use MainLayout */}
          <Route path="/engagement-dashboard" element={withMainLayout(EngagementDashboard)} />
          <Route path="/content-dashboard" element={withMainLayout(ContentDashboard)} />
          <Route path="/analytics-dashboard" element={withMainLayout(AnalyticsDashboard)} />
          <Route path="/monetization-dashboard" element={withMainLayout(MonetizationDashboard)} />
          <Route path="/seo-dashboard" element={withMainLayout(SEODashboard)} />
          
          {/* Account Route */}
          <Route path="/account" element={withMainLayout(Account)} />
          
          {/* Auth Routes - No MainLayout (clean auth pages) */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-reset" element={<VerifyReset />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* 404 Page */}
          <Route path="*" element={withMainLayout(() => (
            <div className="not-found">
              <h1>404 - Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          ))} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
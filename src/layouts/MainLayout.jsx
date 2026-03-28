import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  const location = useLocation();

  // Debug: Log location changes
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
  }, [location.pathname]);

  // Tooltip initialization disabled - using native browser tooltips via title attribute
  // Bootstrap tooltip causing JSON parse errors with data-bs-* attributes
  useEffect(() => {
    // Remove all data-bs-toggle="tooltip" attributes to prevent Bootstrap from trying to initialize
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipElements.forEach(el => {
      el.removeAttribute('data-bs-toggle');
      el.removeAttribute('data-bs-placement');
    });
  }, [location.pathname]);

  // Force scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="main-wrapper">
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="page-wrapper">
        <div className="content">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="footer d-sm-flex align-items-center justify-content-between bg-white py-2 px-4 border-top">
          {/* <p className="text-dark mb-0">© 2025 <Link href="#" className="link-primary">Kanakku</Link>, All Rights Reserved</p> */}
          <p className="text-dark">Version : 1.3.8</p>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

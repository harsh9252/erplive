import { useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  const location = useLocation();

  // Debug: Log location changes
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
  }, [location.pathname]);

  // Initialize Bootstrap tooltips on route change
  useEffect(() => {
    // Only proceed if bootstrap is available on window
    const bootstrap = window.bootstrap;
    if (!bootstrap) return;

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
      // Cleanup existing instances to prevent memory leaks and "JSON parse" ghost errors
      const existingInstance = bootstrap.Tooltip.getInstance(tooltipTriggerEl);
      if (existingInstance) {
        existingInstance.dispose();
      }
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Cleanup on unmount or route change
    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
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

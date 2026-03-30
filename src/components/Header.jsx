import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import companyService from '../services/companyService';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, activeCompany, logout, switchCompany } = useAuth();
  const [isMiniSidebar, setIsMiniSidebar] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const fetchInProgress = useRef(null);

  useEffect(() => {
    if (user) {
      fetchCompanies();
    }
  }, [user]);

  const fetchCompanies = async () => {
    if (fetchInProgress.current) return fetchInProgress.current;

    fetchInProgress.current = (async () => {
      try {
      setLoadingCompanies(true);
      const response = await companyService.getAccessibleCompanies();
      const data = response.data || response || [];
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoadingCompanies(false);
      fetchInProgress.current = null;
    }
    })();
    
    return fetchInProgress.current;
  };

  const handleSwitchCompany = async (companyId) => {
    if (activeCompany?.id === companyId) return;

    try {
      toast.info('Switching company...', { autoClose: 1000 });
      await switchCompany(companyId);
      toast.success('Switched company successfully');
      // The switchCompany in context handles token and state update
      // We might want to force a partial reload or navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to switch company');
    }
  };
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    const pageName = path.split('/').pop().replace(/-/g, ' ');
    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };
  const toggleSidebar = () => {
    if (window.innerWidth <= 991) {
      // Mobile: slide-in sidebar
      document.body.classList.toggle("slide-nav");
    } else {
      // Desktop: mini-sidebar
      document.body.classList.toggle("mini-sidebar");
    }
  };
  // Close sidebar when clicking on overlay
  const closeSidebar = () => {
    document.body.classList.remove('slide-nav');
  };

  return (
    <div className="header">
      <div className="main-header d-flex align-items-center justify-content-between flex-wrap">
        {/* Logo */}
        {/* <div className="header-left">
          <Link to="/" className="logo">
            <img src="/assets/img/logo.svg" alt="Logo" />
          </Link>
          <Link to="/" className="dark-logo">
            <img src="/assets/img/logo-white.svg" alt="Logo" />
          </Link>
        </div> */}

        {/* Sidebar Menu Toggle */}
        <button
          id="toggle_btn"
          className="btn btn-menubar"
          onClick={toggleSidebar}
        >
          <i className=" toogle-icons isax isax-menu-1"></i>
        </button>



        <div className="header-user w-100 w-lg-auto">
          <div className="nav user-menu nav-list d-flex align-items-center justify-content-between flex-wrap w-100">
            <div className="me-auto d-flex align-items-center flex-wrap">
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-divide mb-0">
                  <li className="breadcrumb-item d-flex align-items-center">
                    <Link to="/"><i className="isax isax-home-2 me-1"></i>Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">{getPageTitle()}</li>
                </ol>
              </nav>
            </div>

            <div className="d-flex align-items-center gap-2 flex-wrap">
              {/* Search */}
              {/* <div className="input-icon-end position-relative">
                <input type="text" className="form-control" placeholder="Search" style={{ width: '180px' }} />
                <span className="input-icon-addon">
                  <i className="isax isax-search-normal"></i>
                </span>
              </div> */}

              {/* Language Dropdown */}
              {/* <div className="nav-item dropdown has-arrow flag-nav">
                <Link className="btn btn-menubar" data-bs-toggle="dropdown" href="#" role="button">
                  <img src="/assets/img/flags/us.svg" alt="Language" className="img-fluid" />
                </Link >
                <ul className="dropdown-menu p-2 " >
                  <li>
                    <Link href="#" className="dropdown-item">
                      <img src="/assets/img/flags/us.svg" alt="flag" className="me-2" />English
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item">
                      <img src="/assets/img/flags/de.svg" alt="flag" className="me-2" />German
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item">
                      <img src="/assets/img/flags/fr.svg" alt="flag" className="me-2" />French
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item">
                      <img src="/assets/img/flags/ae.svg" alt="flag" className="me-2" />Arabic
                    </Link>
                  </li>
                </ul>
              </div> */}

              {/* Notifications */}
              {/* <div className="notification_item">
                <Link href="#" className="btn btn-menubar position-relative" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                  <i className="isax isax-notification-bing5"></i>
                  <span className="position-absolute badge bg-success border border-white"></span>
                </Link >                <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-lg" style={{ minHeight: '300px' }}>
                  <div className="p-2 border-bottom">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="m-0 fs-16 fw-semibold">Notifications</h6>
                      </div>
                      <div className="col-auto">
                        <div className="dropdown">
                          <Link href="#" className="dropdown-toggle drop-arrow-none link-dark" data-bs-toggle="dropdown">
                            <i className="isax isax-setting-2 fs-16 text-body align-middle"></i>
                          </Link >
                          <div className="dropdown-menu dropdown-menu-end">
                            <Link href="#" className="dropdown-item"><i className="ti ti-bell-check me-1"></i>Mark as Read</Link>
                            <Link href="#" className="dropdown-item"><i className="ti ti-trash me-1"></i>Delete All</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="notification-body position-relative z-2 rounded-0" data-simplebar>
                    <div className="dropdown-item notification-item py-2 text-wrap border-bottom">
                      <div className="d-flex">
                        <div className="me-2 position-relative flex-shrink-0">
                          <img src="/assets/img/profiles/avatar-05.jpg" className="avatar-md rounded-circle" alt="User Img" />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 fw-semibold text-dark">John Smith</p>
                          <p className="mb-1 text-wrap fs-14">A <span className="fw-semibold">new sale</span> has been recorded.</p>
                          <span className="fs-12"><i className="isax isax-clock me-1"></i>4 min ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-item notification-item py-2 text-wrap border-bottom">
                      <div className="d-flex">
                        <div className="me-2 position-relative flex-shrink-0">
                          <img src="/assets/img/profiles/avatar-03.jpg" className="avatar-md rounded-circle" alt="User Img" />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 fw-semibold text-dark">Robert Fox</p>
                          <p className="mb-1 text-wrap fs-14">Completed payment for <span className="fw-semibold">#INV00025</span></p>
                          <span className="fs-12"><i className="isax isax-clock me-1"></i>4 min ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 rounded-bottom border-top text-center">
                    <Link to="/notifications" className="text-center fw-medium fs-14 mb-0">View All</Link>
                  </div>
                </div>
              </div> */}

              {/* Company Switcher Dropdown */}
              <div className="dropdown position-relative">
                <button
                  type="button"
                  className="btn bg-primary-transparent d-flex align-items-center"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="isax isax-building-3 me-2 text-primary"></i>
                  <span
                    className="fs-13 fw-semibold text-primary text-truncate"
                    style={{ maxWidth: '140px', minWidth: '80px', whiteSpace: 'nowrap' }}
                  >
                    {activeCompany?.name || 'Select Company'}
                  </span>
                  <i className="isax isax-arrow-down-1 ms-2 fs-12 text-primary"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-end p-2" style={{ minWidth: '220px' }}>
                  <div className="dropdown-header p-2 border-bottom mb-2">
                    <h6 className="m-0 fs-12 text-muted text-uppercase fw-bold">Switch Company</h6>
                  </div>
                  <div className="company-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {loadingCompanies ? (
                      <div className="text-center p-3">
                        <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                      </div>
                    ) : companies.length > 0 ? (
                      companies.map((comp) => (
                        <button
                          key={comp.id}
                          className={`dropdown-item d-flex align-items-center rounded-1 mb-1 ${activeCompany?.id === comp.id ? 'active' : ''}`}
                          onClick={() => handleSwitchCompany(comp.id)}
                        >
                          <div className={`avatar avatar-xs rounded-circle me-2 ${activeCompany?.id === comp.id ? 'bg-white text-primary' : 'bg-primary-transparent text-primary'}`}>
                            {comp.name?.charAt(0) || 'C'}
                          </div>
                          <div className="overflow-hidden">
                            <span className="d-block text-truncate fs-13">{comp.name}</span>
                            {activeCompany?.id === comp.id && <span className="fs-10 text-success">Active</span>}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center p-3 text-muted fs-12">No companies found</div>
                    )}
                  </div>
                  <hr className="dropdown-divider my-2" />
                  <Link to="/add-company" className="dropdown-item d-flex align-items-center text-primary fw-medium rounded-1">
                    <i className="isax isax-add-circle me-2"></i>+ Add Company
                  </Link>
                  <Link to="/companies" className="dropdown-item d-flex align-items-center text-primary fw-medium rounded-1">
                    <i className="isax isax-building-3 me-2"></i>View All Companies
                  </Link>
                </div>
              </div>

              {/* User Dropdown */}
              <div className="dropdown profile-dropdown position-relative">
                <button
                  type="button"
                  className="dropdown-toggle btn p-0 border-0 bg-transparent d-flex align-items-center"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  <span className="avatar online">
                    <img src="/assets/img/profiles/avatar-01.jpg" alt="Img" className="img-fluid rounded-circle" />
                  </span>
                </button>
                <div className="dropdown-menu p-2" style={{ top: 'auto', right: 0, }}>
                  <div className="d-flex align-items-center bg-light rounded-1 p-2 mb-2">
                    <span className="avatar avatar-lg me-2">
                      <img src="/assets/img/profiles/avatar-01.jpg" alt="img" className="rounded-circle" />
                    </span>
                    <div>
                      <h6 className="fs-14 fw-medium mb-1">{user?.firstName || user?.name || 'User'}</h6>
                      <p className="fs-13 mb-0">{user?.role || 'User'}</p>
                      {activeCompany && (
                        <p className="fs-12 text-primary fw-semibold mb-0">
                          <i className="isax isax-building-3 me-1"></i>
                          {activeCompany.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <Link className="dropdown-item d-flex align-items-center" to="/account-settings">
                    <i className="isax isax-profile-circle me-2"></i>Profile Settings
                  </Link>
                  <Link className="dropdown-item d-flex align-items-center" to="/inventory-report">
                    <i className="isax isax-document-text me-2"></i>Reports
                  </Link>
                  <div className="form-check form-switch form-check-reverse d-flex align-items-center justify-content-between dropdown-item mb-0">
                    <label className="form-check-label" htmlFor="notify"><i className="isax isax-notification me-2"></i>Notifications</label>
                    <input className="form-check-input" type="checkbox" role="switch" id="notify" />
                  </div>
                  <hr className="dropdown-divider my-2" />
                  <button
                    className="dropdown-item logout d-flex align-items-center"
                    onClick={handleLogout}
                    style={{ cursor: 'pointer', border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                  >
                    <i className="isax isax-logout me-2"></i>Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

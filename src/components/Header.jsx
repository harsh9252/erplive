import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import companyService from '../services/companyService';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import financialYearService from '../services/financialYearService';
import branchService from '../services/branchService';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, activeCompany, logout, switchCompany, roles } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMiniSidebar, setIsMiniSidebar] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [financialYears, setFinancialYears] = useState([]);
  const [activeFY, setActiveFY] = useState(null);
  const [loadingFY, setLoadingFY] = useState(false);
  const [branches, setBranches] = useState([]);
  const [activeBranch, setActiveBranch] = useState(null);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [switchMessage, setSwitchMessage] = useState('');
  const fetchInProgress = useRef(null);
  const isSwitchingFYRef = useRef(false);

  useEffect(() => {
    if (user) {
      fetchCompanies();
    }
  }, [user]);

  useEffect(() => {
    if (activeCompany) {
      fetchFinancialYears();
      fetchBranches();
    }
  }, [activeCompany]);

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

  const fetchFinancialYears = async (silent = false) => {
    try {
      if (!silent) setLoadingFY(true);
      const res = await financialYearService.getFinancialYears();
      const list = res.data || res || [];
      setFinancialYears(list);

      // Try to find active, otherwise take the first one
      const savedFyId = localStorage.getItem('activeFinancialYearId');
      let active = null;
      if (savedFyId) {
        active = list.find(y => String(y.id) === String(savedFyId));
      }
      
      if (!active) {
        active = list.find(y => y.is_active) || list[0];
        if (active) {
          localStorage.setItem('activeFinancialYearId', String(active.id));
        }
      }
      
      setActiveFY(active);
    } finally {
      if (!silent) setLoadingFY(false);
    }
  };

  const fetchBranches = async () => {
    try {
      setLoadingBranches(true);
      const res = await branchService.getBranches();
      const list = res.data || res || [];
      setBranches(list);

      const savedBranchId = localStorage.getItem('selectedBranchId');
      let active = null;
      if (savedBranchId) {
        active = list.find(b => b.id.toString() === savedBranchId);
      }

      if (!active && list.length > 0) {
        active = list[0];
        localStorage.setItem('selectedBranchId', active.id.toString());
      }

      setActiveBranch(active);
    } catch (err) {
      console.error('Error fetching branches:', err);
    } finally {
      setLoadingBranches(false);
    }
  };

  useEffect(() => {
    const handleFYUpdate = () => fetchFinancialYears(true);
    window.addEventListener('FINANCIAL_YEARS_UPDATED', handleFYUpdate);

    const handleCompanyUpdate = () => fetchCompanies();
    window.addEventListener('COMPANY_CREATED', handleCompanyUpdate);

    const handleBranchesUpdate = () => fetchBranches();
    window.addEventListener('BRANCHES_MODIFIED', handleBranchesUpdate);

    return () => {
      window.removeEventListener('FINANCIAL_YEARS_UPDATED', handleFYUpdate);
      window.removeEventListener('COMPANY_CREATED', handleCompanyUpdate);
      window.removeEventListener('BRANCHES_MODIFIED', handleBranchesUpdate);
    };
  }, []);

  const handleSwitchCompany = async (companyId) => {
    if (activeCompany?.id === companyId) return;

    try {
      setSwitchMessage('Switching company...');
      setIsSwitching(true);
      await switchCompany(companyId);
      toast.success('Switched company successfully');
      // The switchCompany in context handles token and state update
      setTimeout(() => {
        navigate('/dashboard');
        setIsSwitching(false);
      }, 500);
    } catch (error) {
      toast.error('Failed to switch company');
      setIsSwitching(false);
    }
  };

  const handleSwitchFY = async (fyId) => {
    if (activeFY?.id === fyId) return;
    if (isSwitchingFYRef.current) return;

    try {
      isSwitchingFYRef.current = true;
      setSwitchMessage('Switching financial year...');
      setIsSwitching(true);
      await financialYearService.switchFinancialYear(fyId);
      localStorage.setItem('activeFinancialYearId', String(fyId));
      toast.success('Switched financial year successfully');
      
      const response = await financialYearService.getFinancialYears();
      const years = response.data || response;
      setFinancialYears(years);
      setActiveFY(years.find(y => String(y.id) === String(fyId)) || years.find(y => y.is_active));
      window.dispatchEvent(new Event('FINANCIAL_YEARS_UPDATED'));

      setTimeout(() => {
        navigate('/dashboard');
        setIsSwitching(false);
        isSwitchingFYRef.current = false;
      }, 500);
    } catch (error) {
      toast.error('Failed to switch financial year');
      isSwitchingFYRef.current = false;
      setIsSwitching(false);
    }
  };

  const handleSwitchBranch = (branchId) => {
    const branch = branches.find(b => b.id === branchId);
    if (branch) {
      setActiveBranch(branch);
      localStorage.setItem('selectedBranchId', branchId.toString());
      toast.success(`Switched to branch: ${branch.name}`);
      // Notify other components
      window.dispatchEvent(new Event('BRANCH_UPDATED'));
    }
  };
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    
    const parts = path.split('/').filter(Boolean);
    if (parts.length > 1 && !isNaN(parts[parts.length - 1])) {
      const pageName = parts[parts.length - 2].replace(/-/g, ' ');
      return pageName.charAt(0).toUpperCase() + pageName.slice(1);
    }
    
    const pageName = parts.length > 0 ? parts[parts.length - 1].replace(/-/g, ' ') : '';
    return pageName ? pageName.charAt(0).toUpperCase() + pageName.slice(1) : '';
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
    <>
      {isSwitching && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: theme === 'dark' ? 'rgba(34, 43, 69, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}>
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-3 text-primary fw-medium">{switchMessage}</h4>
        </div>
      )}
      <div className="header d-print-none">
      <div className="main-header d-flex align-items-center justify-content-between h-100 px-3">
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



        <div className="header-user d-flex align-items-center justify-content-end flex-grow-1">
          <div className="nav user-menu nav-list d-flex align-items-center justify-content-end w-100">
            <div className="me-auto d-none d-md-flex align-items-center flex-wrap">
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


              {/* Dark Mode Toggle */}
              <button
                type="button"
                className="btn btn-menubar"
                onClick={toggleTheme}
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                <i className={`isax ${theme === 'light' ? 'isax-moon' : 'isax-sun-1'}`}></i>
              </button>

              {/* Financial Year Switcher */}
              <div className="dropdown position-relative me-1">
                <button
                  type="button"
                  className="btn btn-outline-warning border-dashed d-flex align-items-center py-1 px-2 rounded-pill"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => fetchFinancialYears(true)}
                  style={{ background: 'rgba(255, 193, 7, 0.05)', borderStyle: 'dashed !important' }}
                >
                  <i className="isax isax-calendar me-1 text-warning fs-14"></i>
                  <span
                    className="fs-12 fw-bold text-warning text-truncate"
                    style={{ whiteSpace: 'nowrap', letterSpacing: '0.5px' }}
                  >
                    {activeFY?.name || (activeFY ? `${activeFY.start_date?.split('-')[0]}-${activeFY.end_date?.split('-')[0]?.slice(2)}` : 'Select FY')}
                  </span>
                  <i className="isax isax-arrow-down-1 ms-1 fs-10 text-warning opacity-50"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-end p-2 shadow-lg border-0" style={{ minWidth: '200px', borderRadius: '12px' }}>
                  <div className="dropdown-header p-2 border-bottom mb-2 d-flex align-items-center">
                    <i className="isax isax-calendar-1 me-2 text-warning fs-16"></i>
                    <h6 className="m-0 fs-11 text-muted text-uppercase fw-bold">Active Financial Year</h6>
                  </div>
                  <div className="fy-list" style={{ maxHeight: '220px', overflowY: 'auto' }}>
                    {loadingFY ? (
                      <div className="text-center p-4">
                        <div className="spinner-border spinner-border-sm text-warning" role="status"></div>
                        <p className="fs-10 text-muted mt-2 mb-0">Loading periods...</p>
                      </div>
                    ) : financialYears.length > 0 ? (
                      financialYears.map((fy) => (
                        <button
                          key={fy.id}
                          className={`dropdown-item d-flex align-items-center rounded-8 mb-1 py-1 ${activeFY?.id === fy.id ? 'active bg-soft-warning' : ''}`}
                          onClick={() => handleSwitchFY(fy.id)}
                          style={{ transition: 'all 0.2s' }}
                        >
                          <div className={`avatar avatar-xs rounded-circle me-2 ${activeFY?.id === fy.id ? 'bg-warning text-white' : 'bg-light text-muted'}`}>
                            <i className={`isax ${activeFY?.id === fy.id ? 'isax-tick-circle' : 'isax-calendar-tick'} fs-14`}></i>
                          </div>
                          <div className="overflow-hidden flex-grow-1">
                            <span className={`d-block text-truncate fs-13 ${activeFY?.id === fy.id ? 'fw-bold text-warning' : 'text-dark'}`}>
                              {fy.name || `${fy.start_date} - ${fy.end_date}`}
                            </span>
                            <span className="fs-10 text-muted d-block" style={{ marginTop: '-2px' }}>
                              {activeFY?.id === fy.id ? 'Current Active Period' : 'Switch to this period'}
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center p-3 text-muted fs-12">
                        <i className="isax isax-info-circle d-block fs-20 mb-1 opacity-25"></i>
                        No periods found
                      </div>
                    )}
                  </div>
                  <hr className="dropdown-divider my-2 opacity-50" />
                  <Link to="/company/financial-years" className="dropdown-item d-flex align-items-center text-warning fw-semibold rounded-8 py-2">
                    <i className="isax isax-setting-2 me-2 fs-16"></i>Configure Periods
                  </Link>
                </div>
              </div>

              {/* Branch Switcher */}
              <div className="dropdown position-relative me-1">
                <button
                  type="button"
                  className="btn btn-outline-info border-dashed d-flex align-items-center py-1 px-2 rounded-pill"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: 'rgba(13, 202, 240, 0.05)', borderStyle: 'dashed !important' }}
                >
                  <i className="isax isax-location me-1 text-info fs-14"></i>
                  <span
                    className="fs-12 fw-bold text-info text-truncate"
                    style={{ whiteSpace: 'nowrap', letterSpacing: '0.5px', maxWidth: '120px' }}
                  >
                    {activeBranch?.name || 'Select Branch'}
                  </span>
                  <i className="isax isax-arrow-down-1 ms-1 fs-10 text-info opacity-50"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-end p-2 shadow-lg border-0" style={{ minWidth: '200px', borderRadius: '12px' }}>
                  <div className="dropdown-header p-2 border-bottom mb-2 d-flex align-items-center">
                    <i className="isax isax-location me-2 text-info fs-16"></i>
                    <h6 className="m-0 fs-11 text-muted text-uppercase fw-bold">Active Branch</h6>
                  </div>
                  <div className="branch-list" style={{ maxHeight: '220px', overflowY: 'auto' }}>
                    {loadingBranches ? (
                      <div className="text-center p-4">
                        <div className="spinner-border spinner-border-sm text-info" role="status"></div>
                      </div>
                    ) : branches.length > 0 ? (
                      branches.map((b) => (
                        <button
                          key={b.id}
                          className={`dropdown-item d-flex align-items-center rounded-8 mb-1 py-1 ${activeBranch?.id === b.id ? 'active bg-soft-info' : ''}`}
                          onClick={() => handleSwitchBranch(b.id)}
                          style={{ transition: 'all 0.2s' }}
                        >
                          <div className={`avatar avatar-xs rounded-circle me-2 ${activeBranch?.id === b.id ? 'bg-info text-white' : 'bg-light text-muted'}`}>
                            <i className={`isax ${activeBranch?.id === b.id ? 'isax-tick-circle' : 'isax-location'} fs-14`}></i>
                          </div>
                          <div className="overflow-hidden flex-grow-1">
                            <span className={`d-block text-truncate fs-13 ${activeBranch?.id === b.id ? 'fw-bold text-info' : 'text-dark'}`}>
                              {b.name}
                            </span>
                            {activeBranch?.id === b.id && <span className="fs-10 text-muted d-block" style={{ marginTop: '-2px' }}>Current Branch</span>}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center p-3 text-muted fs-12">No branches found</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Switcher Dropdown */}
              <div className="dropdown position-relative">
                <button
                  type="button"
                  className="btn bg-primary-transparent d-flex align-items-center"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => fetchCompanies()}
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
                    {loadingCompanies && companies.length === 0 ? (
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
                    <i className="isax isax-add-circle me-2"></i>Add Company
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
                      <p className="fs-13 mb-0 text-muted fw-medium text-capitalize">{user?.role || (roles?.length > 0 ? roles.map(r => r.name).join(', ') : 'User')}</p>
                      {activeCompany && (
                        <p className="fs-12 text-primary fw-semibold mb-0">
                          <i className="isax isax-building-3 me-1"></i>
                          {activeCompany.name}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* <Link className="dropdown-item d-flex align-items-center" to="/account-settings">
                    <i className="isax isax-profile-circle me-2"></i>Profile Settings
                  </Link>
                  <Link className="dropdown-item d-flex align-items-center" to="/inventory-report">
                    <i className="isax isax-document-text me-2"></i>Reports
                  </Link>
                  <div className="form-check form-switch form-check-reverse d-flex align-items-center justify-content-between dropdown-item mb-0">
                    <label className="form-check-label" htmlFor="notify"><i className="isax isax-notification me-2"></i>Notifications</label>
                    <input className="form-check-input" type="checkbox" role="switch" id="notify" />
                  </div> */}
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
    </>
  );
};

export default Header;

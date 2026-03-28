// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// const DashboardLayout = ({ children, pageTitle = "Dashboard" }) => {
//   const location = useLocation();

//   const toggleSidebar = (e) => {
//     if (e) e.preventDefault();
//     if (window.innerWidth <= 991) {
//       document.body.classList.toggle("slide-nav");
//     } else {
//       document.body.classList.toggle("mini-sidebar");
//     }
//   };

//   const closeSidebar = () => {
//     document.body.classList.remove('slide-nav');
//   };

//   React.useEffect(() => {
//     if (window.innerWidth <= 991) {
//       document.body.classList.remove('slide-nav');
//     }
//   }, [location.pathname]);

//   return (
//     <div className="main-wrapper">
//       {/* Header */}
//       <div className="header">
//         <div className="main-header">
//           <div className="header-left">
//             <Link to="/index" className="logo">
//               <img src="/assets/img/logo.svg" alt="Logo" />
//             </Link>
//             <Link to="/index" className="dark-logo">
//               <img src="/assets/img/logo-white.svg" alt="Logo" />
//             </Link>
//           </div>

//           <button id="mobile_btn" className="mobile_btn btn" onClick={toggleSidebar}>
//             <span className="bar-icon">
//               <span></span>
//               <span></span>
//               <span></span>
//             </span>
//           </button>
//             <span className="bar-icon">
//               <span></span>
//               <span></span>
//               <span></span>
//             </span>
//           </button>

//           <div className="header-user">
//             <div className="nav user-menu nav-list">
//               <div className="me-auto d-flex align-items-center" id="header-search">
//                 <div className="dropdown me-3">
//                   <Link className="btn btn-primary bg-gradient btn-xs btn-icon rounded-circle d-flex align-items-center justify-content-center" data-bs-toggle="dropdown" href="#" role="button">
//                     <i className="isax isax-add text-white"></i>
//                   </Link >
//                   <ul className="dropdown-menu dropdown-menu-start p-2">
//                     <li>
//                       <Link href="/add-invoice" className="dropdown-item d-flex align-items-center">
//                         <i className="isax isax-document-text-1 me-2"></i>Invoice
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/expenses" className="dropdown-item d-flex align-items-center">
//                         <i className="isax isax-money-send me-2"></i>Expense
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/add-credit-notes" className="dropdown-item d-flex align-items-center">
//                         <i className="isax isax-money-add me-2"></i>Credit Notes
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/add-debit-notes" className="dropdown-item d-flex align-items-center">
//                         <i className="isax isax-money-recive me-2"></i>Debit Notes
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/add-purchases-orders" className="dropdown-item d-flex align-items-center">
//                         <i className="isax isax-document me-2"></i>Purchase Order
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/add-quotation" className="dropdown-item d-flex align-items-center">
//                         <i className="isax isax-document-download me-2"></i>Quotation
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/add-delivery-challan" className="dropdown-item d-flex align-items-center">
//                         <i className="isax isax-document-forward me-2"></i>Delivery Challan
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>

//                 <nav aria-label="breadcrumb">
//                   <ol className="breadcrumb breadcrumb-divide mb-0">
//                     <li className="breadcrumb-item d-flex align-items-center">
//                       <Link href="/index">
//                         <i className="isax isax-home-2 me-1"></i>Home
//                       </Link>
//                     </li>
//                     <li className="breadcrumb-item active" aria-current="page">{pageTitle}</li>
//                   </ol>
//                 </nav>
//               </div>

//               <div className="d-flex align-items-center">
//                 <div className="input-icon-end position-relative me-2">
//                   <input type="text" className="form-control" placeholder="Search" />
//                   <span className="input-icon-addon">
//                     <i className="isax isax-search-normal"></i>
//                   </span>
//                 </div>

//                 <div className="nav-item dropdown has-arrow flag-nav me-2">
//                   <Link className="btn btn-menubar" data-bs-toggle="dropdown" href="#" role="button">
//                     <img src="/assets/img/flags/us.svg" alt="Language" className="img-fluid" />
//                   </Link>
//                   <ul className="dropdown-menu p-2">
//                     <li>
//                       <Link href="#" className="dropdown-item">
//                         <img src="/assets/img/flags/us.svg" alt="flag" className="me-2" />English
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="#" className="dropdown-item">
//                         <img src="/assets/img/flags/de.svg" alt="flag" className="me-2" />German
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="#" className="dropdown-item">
//                         <img src="/assets/img/flags/fr.svg" alt="flag" className="me-2" />French
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="#" className="dropdown-item">
//                         <img src="/assets/img/flags/ae.svg" alt="flag" className="me-2" />Arabic
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>

//                 <div className="notification_item me-2">
//                   <Link href="#" className="btn btn-menubar position-relative" id="notification_popup"
//                     data-bs-toggle="dropdown" data-bs-auto-close="outside">
//                     <i className="isax isax-notification-bing5"></i>
//                     <span className="position-absolute badge bg-success border border-white"></span>
//                   </Link>
//                   <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-lg" style={{ minHeight: "300px" }}>
//                     <div className="p-2 border-bottom">
//                       <div className="row align-items-center">
//                         <div className="col">
//                           <h6 className="m-0 fs-16 fw-semibold">Notifications</h6>
//                         </div>
//                         <div className="col-auto">
//                           <div className="dropdown">
//                             <Link href="#" className="dropdown-toggle drop-arrow-none link-dark"
//                               data-bs-toggle="dropdown" data-bs-offset="0,15" aria-expanded="false">
//                               <i className="isax isax-setting-2 fs-16 text-body align-middle"></i>
//                             </Link>
//                             <div className="dropdown-menu dropdown-menu-end">
//                               <Link href="#" className="dropdown-item">
//                                 <i className="ti ti-bell-check me-1"></i>Mark as Read
//                               </Link>
//                               <Link href="#" className="dropdown-item">
//                                 <i className="ti ti-trash me-1"></i>Delete All
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="notification-body position-relative z-2 rounded-0" data-simplebar>
//                       <div className="dropdown-item notification-item py-2 text-wrap border-bottom" id="notification-1">
//                         <div className="d-flex">
//                           <div className="me-2 position-relative flex-shrink-0">
//                             <img src="/assets/img/profiles/avatar-05.jpg" className="avatar-md rounded-circle" alt="User Img" />
//                           </div>
//                           <div className="flex-grow-1">
//                             <p className="mb-0 fw-semibold text-dark">John Smith</p>
//                             <p className="mb-1 text-wrap fs-14">
//                               A <span className="fw-semibold">new sale</span> has been recorded.
//                             </p>
//                             <div className="d-flex justify-content-between align-items-center">
//                               <span className="fs-12"><i className="isax isax-clock me-1"></i>4 min ago</span>
//                               <div className="notification-action d-flex align-items-center float-end gap-2">
//                                 <Link href="#" className="notification-read rounded-circle bg-info"
//                                   data-bs-toggle="tooltip" title="Make as Read" aria-label="Make as Read"></Link>
//                                 <button className="btn rounded-circle text-danger p-0" data-dismissible="#notification-1">
//                                   <i className="isax isax-close-circle fs-12"></i>
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="p-2 rounded-bottom border-top text-center">
//                       <Link href="/notifications" className="text-center fw-medium fs-14 mb-0">
//                         View All
//                       </Link>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="me-2 theme-item">
//                   <Link href="#" id="dark-mode-toggle" className="theme-toggle btn btn-menubar">
//                     <i className="isax isax-moon"></i>
//                   </Link>
//                   <Link href="#" id="light-mode-toggle" className="theme-toggle btn btn-menubar">
//                     <i className="isax isax-sun-1"></i>
//                   </Link>
//                 </div>

//                 <div className="dropdown profile-dropdown">
//                   <Link href="#" className="dropdown-toggle d-flex align-items-center"
//                     data-bs-toggle="dropdown" data-bs-auto-close="outside">
//                     <span className="avatar online">
//                       <img src="/assets/img/profiles/avatar-01.jpg" alt="Img" className="img-fluid rounded-circle" />
//                     </span>
//                   </Link>
//                   <div className="dropdown-menu p-2">
//                     <div className="d-flex align-items-center bg-light rounded-1 p-2 mb-2">
//                       <span className="avatar avatar-lg me-2">
//                         <img src="/assets/img/profiles/avatar-01.jpg" alt="img" className="rounded-circle" />
//                       </span>
//                       <div>
//                         <h6 className="fs-14 fw-medium mb-1">Jafna Cremson</h6>
//                         <p className="fs-13">Administrator</p>
//                       </div>
//                     </div>
//                     <Link className="dropdown-item d-flex align-items-center" href="/account-settings">
//                       <i className="isax isax-profile-circle me-2"></i>Profile Settings
//                     </Link>
//                     <Link className="dropdown-item d-flex align-items-center" href="/inventory-report">
//                       <i className="isax isax-document-text me-2"></i>Reports
//                     </Link>
//                     <div className="form-check form-switch form-check-reverse d-flex align-items-center justify-content-between dropdown-item mb-0">
//                       <label className="form-check-label" htmlFor="notify">
//                         <i className="isax isax-notification me-2"></i>Notifications
//                       </label>
//                       <input className="form-check-input" type="checkbox" role="switch" id="notify" />
//                     </div>
//                     <hr className="dropdown-divider my-2" />
//                     <Link className="dropdown-item logout d-flex align-items-center" href="/login">
//                       <i className="isax isax-logout me-2"></i>Sign Out
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="dropdown mobile-user-menu profile-dropdown">
//         <Link href="#" className="dropdown-toggle d-flex align-items-center"
//           data-bs-toggle="dropdown" data-bs-auto-close="outside">
//           <span className="avatar avatar-md online">
//             <img src="/assets/img/profiles/avatar-01.jpg" alt="Img" className="img-fluid rounded-circle" />
//           </span>
//         </Link>
//         <div className="dropdown-menu p-2 mt-0">
//           <Link className="dropdown-item d-flex align-items-center" href="/profile">
//             <i className="isax isax-profile-circle me-2"></i>Profile Settings
//           </Link>
//           <Link className="dropdown-item d-flex align-items-center" href="/reports">
//             <i className="isax isax-document-text me-2"></i>Reports
//           </Link>
//           <Link className="dropdown-item d-flex align-items-center" href="/account-settings">
//             <i className="isax isax-setting me-2"></i>Settings
//           </Link>
//           <Link className="dropdown-item logout d-flex align-items-center" href="/login">
//             <i className="isax isax-logout me-2"></i>Signout
//           </Link>
//         </div>
//       </div>

//       {/* Two Column Sidebar */ }
//   <div className="two-col-sidebar" id="two-col-sidebar">
//     <div className="twocol-mini">
//       <div className="dropdown">
//         <Link className="btn btn-primary bg-gradient btn-sm btn-icon rounded-circle d-flex align-items-center justify-content-center"
//           data-bs-toggle="dropdown" href="#" role="button" data-bs-display="static" data-bs-reference="parent">
//           <i className="isax isax-add"></i>
//         </Link>
//         <ul className="dropdown-menu dropdown-menu-start">
//           <li>
//             <Link href="/add-invoice" className="dropdown-item d-flex align-items-center">
//               <i className="isax isax-document-text-1 me-2"></i>Invoice
//             </Link>
//           </li>
//           <li>
//             <Link href="/expenses" className="dropdown-item d-flex align-items-center">
//               <i className="isax isax-money-send me-2"></i>Expense
//             </Link>
//           </li>
//           <li>
//             <Link href="/add-credit-notes" className="dropdown-item d-flex align-items-center">
//               <i className="isax isax-money-add me-2"></i>Credit Notes
//             </Link>
//           </li>
//           <li>
//             <Link href="/add-debit-notes" className="dropdown-item d-flex align-items-center">
//               <i className="isax isax-money-recive me-2"></i>Debit Notes
//             </Link>
//           </li>
//           <li>
//             <Link href="/add-purchases-orders" className="dropdown-item d-flex align-items-center">
//               <i className="isax isax-document me-2"></i>Purchase Order
//             </Link>
//           </li>
//           <li>
//             <Link href="/add-quotation" className="dropdown-item d-flex align-items-center">
//               <i className="isax isax-document-download me-2"></i>Quotation
//             </Link>
//           </li>
//           <li>
//             <Link href="/add-delivery-challan" className="dropdown-item d-flex align-items-center">
//               <i className="isax isax-document-forward me-2"></i>Delivery Challan
//             </Link>
//           </li>
//         </ul>
//       </div>
//       <ul className="menu-list">
//         <li>
//           <Link href="/account-settings" data-bs-toggle="tooltip" data-bs-placement="right" title="Settings">
//             <i className="isax isax-setting-25"></i>
//           </Link>
//         </li>
//         <li>
//           <Link href="#" data-bs-toggle="tooltip" data-bs-placement="right" title="Documentation">
//             <i className="isax isax-document-normal4"></i>
//           </Link>
//         </li>
//         <li>
//           <Link href="#" data-bs-toggle="tooltip" data-bs-placement="right" title="Changelog">
//             <i className="isax isax-cloud-change5"></i>
//           </Link>
//         </li>
//         <li>
//           <Link href="/login">
//             <i className="isax isax-login-15"></i>
//           </Link>
//         </li>
//       </ul>
//     </div>

//     <div className="sidebar" id="sidebar-two">
//       <div className="sidebar-logo">
//         <Link to="/index" className="logo logo-normal">
//           <img src="/assets/img/sidebarlogo.svg" alt="Logo" />
//         </Link>
//         <Link to="/index" className="logo-small">
//           <img src="/assets/img/sidebarlogo.svg" alt="Logo" />
//         </Link>
//         <Link to="/index" className="dark-logo">
//           <img src="/assets/img/sidebarlogo.svg" alt="Logo" />
//         </Link>
//         <Link to="/index" className="dark-small">
//           <img src="/assets/img/sidebarlogo.svg" alt="Logo" />
//         </Link>
//         <button id="toggle_btn" className="btn" onClick={toggleSidebar} style={{ border: 'none', background: 'none' }}>
//           <i className="isax isax-menu-1"></i>
//         </button>
//       </div>

//       <div className="sidebar-search">
//         <div className="input-icon-end position-relative">
//           <input type="text" className="form-control" placeholder="Search" />
//           <span className="input-icon-addon">
//             <i className="isax isax-search-normal"></i>
//           </span>
//         </div>
//       </div>

//       <div className="sidebar-inner" data-simplebar>
//         <div id="sidebar-menu" className="sidebar-menu">
//           <ul>
//             <li className="menu-title"><span>Main</span></li>
//             <li>
//               <ul>
//                 <li className="submenu">
//                   <Link href="#" className="active subdrop">
//                     <i className="isax isax-element-45"></i>
//                     <span>Dashboard</span>
//                     <span className="menu-arrow"></span>
//                   </Link>
//                   <ul>
//                     <li><Link href="/index" className="active">Admin Dashboard</Link></li>
//                     <li><Link href="/dashboard">Admin Dashboard 2</Link></li>
//                     <li><Link href="/customer-dashboard">Customer Dashboard</Link></li>
//                     <li><Link href="/super-admin-dashboard">Super Admin Dashboard</Link></li>
//                   </ul>
//                 </li>
//                 <li className="submenu">
//                   <Link href="#">
//                     <i className="isax isax-shapes5"></i>
//                     <span>Super Admin</span>
//                     <span className="menu-arrow"></span>
//                   </Link>
//                   <ul>
//                     <li><Link href="/super-admin-dashboard">Dashboard</Link></li>
//                     <li><Link href="/companies">Companies</Link></li>
//                     <li><Link href="/subscriptions">Subscriptions</Link></li>
//                     <li><Link href="/packages">Packages</Link></li>
//                     <li><Link href="/domain">Domain</Link></li>
//                     <li><Link href="/purchase-transaction">Purchase Transaction</Link></li>
//                   </ul>
//                 </li>
//                 <li><Link href="/frontend"><i className="isax isax-note-215"></i><span>Frontend</span></Link></li>
//                 <li className="submenu">
//                   <Link href="#">
//                     <i className="isax isax-category-25"></i>
//                     <span>Applications</span>
//                     <span className="menu-arrow"></span>
//                   </Link>
//                   <ul>
//                     <li><Link href="/chat">Chat</Link></li>
//                     <li className="submenu submenu-two">
//                       <Link href="/call">Calls<span className="menu-arrow inside-submenu"></span></Link>
//                       <ul>
//                         <li><Link href="/voice-call">Voice Call</Link></li>
//                         <li><Link href="/video-call">Video Call</Link></li>
//                         <li><Link href="/outgoing-call">Outgoing Call</Link></li>
//                         <li><Link href="/incoming-call">Incoming Call</Link></li>
//                         <li><Link href="/call-history">Call History</Link></li>
//                       </ul>
//                     </li>
//                     <li><Link href="/calendar">Calendar</Link></li>
//                     <li><Link href="/email">Email</Link></li>
//                     <li><Link href="/todo">To Do</Link></li>
//                     <li><Link href="/notes">Notes</Link></li>
//                     <li><Link href="/social-feed">Social Feed</Link></li>
//                     <li><Link href="/file-manager">File Manager</Link></li>
//                     <li><Link href="/kanban-view">Kanban</Link></li>
//                     <li><Link href="/contacts">Contacts</Link></li>
//                     <li><Link href="/invoice">Invoices</Link></li>
//                     <li><Link href="/search-list">Search List</Link></li>
//                   </ul>
//                 </li>
//               </ul>
//             </li>

//             <li className="menu-title"><span>Inventory & Sales</span></li>
//             <li>
//               <ul>
//                 <li className="submenu">
//                   <Link href="#">
//                     <i className="isax isax-box5"></i>
//                     <span>Product / Services</span>
//                     <span className="menu-arrow"></span>
//                   </Link>
//                   <ul>
//                     <li><Link href="/products">Products</Link></li>
//                     <li><Link href="/category">Category</Link></li>
//                     <li><Link href="/units">Units</Link></li>
//                   </ul>
//                 </li>
//                 <li><Link href="/inventory"><i className="isax isax-lifebuoy5"></i><span>Inventory</span></Link></li>
//                 <li className="submenu">
//                   <Link href="#">
//                     <i className="isax isax-receipt-item5"></i>
//                     <span>Invoices</span>
//                     <span className="menu-arrow"></span>
//                   </Link>
//                   <ul>
//                     <li><Link href="/invoices">Invoices</Link></li>
//                     <li><Link href="/add-invoice">Create Invoice</Link></li>
//                     <li><Link href="/invoice-details">Invoice Details</Link></li>
//                     <li><Link href="/invoice-templates">Invoice Templates</Link></li>
//                     <li><Link href="/recurring-invoices">Recurring Invoices</Link></li>
//                   </ul>
//                 </li>
//                 <li><Link href="/credit-notes"><i className="isax isax-note5"></i><span>Credit Notes</span></Link></li>
//                 <li><Link href="/quotations"><i className="isax isax-strongbox5"></i><span>Quotations</span></Link></li>
//                 <li><Link href="/delivery-challans"><i className="isax isax-bookmark-25"></i><span>Delivery Challans</span></Link></li>
//                 <li className="submenu">
//                   <Link href="#">
//                     <i className="isax isax-profile-2user5"></i>
//                     <span>Customers</span>
//                     <span className="menu-arrow"></span>
//                   </Link>
//                   <ul>
//                     <li><Link href="/customers">Customers</Link></li>
//                     <li><Link href="/customer-details">Customer Details</Link></li>
//                   </ul>
//                 </li>
//               </ul>
//             </li>

//             <li className="menu-title"><span>Purchases</span></li>
//             <li>
//               <ul>
//                 <li><Link href="/purchases"><i className="isax isax-bag-tick-25"></i><span>Purchases</span></Link></li>
//                 <li><Link href="/purchase-orders"><i className="isax isax-document-forward5"></i><span>Purchase Orders</span></Link></li>
//                 <li><Link href="/debit-notes"><i className="isax isax-document-text5"></i><span>Debit Notes</span></Link></li>
//                 <li><Link href="/suppliers"><i className="isax isax-security-user5"></i><span>Suppliers</span></Link></li>
//                 <li><Link href="/supplier-payments"><i className="isax isax-coin-15"></i><span>Supplier Payments</span></Link></li>
//               </ul>
//             </li>

//             <li className="menu-title"><span>Finance & Accounts</span></li>
//             <li>
//               <ul>
//                 <li><Link href="/expenses"><i className="isax isax-money-send5"></i><span>Expenses</span></Link></li>
//                 <li><Link href="/incomes"><i className="isax isax-money-recive5"></i><span>Incomes</span></Link></li>
//                 <li><Link href="/payments"><i className="isax isax-money-tick5"></i><span>Payments</span></Link></li>
//                 <li><Link href="/transactions"><i className="isax isax-moneys5"></i><span>Transactions</span></Link></li>
//                 <li><Link href="/bank-accounts"><i className="isax isax-card-tick-15"></i><span>Bank Accounts</span></Link></li>
//                 <li><Link href="/money-transfer"><i className="isax isax-convert-card5"></i><span>Money Transfer</span></Link></li>
//               </ul>
//             </li>

//             <li className="menu-title"><span>Administration</span></li>
//             <li>
//               <ul>
//                 <li className="submenu">
//                   <Link href="#">
//                     <i className="isax isax-chart-35"></i>
//                     <span>Reports</span>
//                     <span className="menu-arrow"></span>
//                   </Link>
//                   <ul>
//                     <li className="submenu submenu-two">
//                       <Link href="#">Item Reports<span className="menu-arrow"></span></Link>
//                       <ul>
//                         <li><Link href="/stock-summary">Stock Summary</Link></li>
//                         <li><Link href="/inventory-report">Inventory</Link></li>
//                         <li><Link href="/best-seller">Best Seller</Link></li>
//                         <li><Link href="/low-stock">Low Stock</Link></li>
//                         <li><Link href="/stock-history">Stock History</Link></li>
//                         <li><Link href="/sold-stock">Sold Stock</Link></li>
//                       </ul>
//                     </li>
//                     <li className="submenu submenu-two">
//                       <Link href="#">Transaction Reports<span className="menu-arrow"></span></Link>
//                       <ul>
//                         <li><Link href="/sales-report">Sales</Link></li>
//                         <li><Link href="/sales-returns">Sales Return</Link></li>
//                         <li><Link href="/sales-orders">Sales Orders</Link></li>
//                         <li><Link href="/purchases-report">Purchases</Link></li>
//                         <li><Link href="/purchase-return-report">Purchase Return</Link></li>
//                         <li><Link href="/purchase-orders-report">Purchase Orders</Link></li>
//                         <li><Link href="/quotation-report">Quotation</Link></li>
//                       </ul>
//                     </li>
//                     <li className="submenu submenu-two">
//                       <Link href="#">Finance Reports<span className="menu-arrow"></span></Link>
//                       <ul>
//                         <li><Link href="/payment-summary">Payment Summary</Link></li>
//                         <li><Link href="/tax-report">Taxes</Link></li>
//                       </ul>
//                     </li>
//                     <li className="submenu submenu-two">
//                       <Link href="#">Accounting Reports<span className="menu-arrow"></span></Link>
//                       <ul>
//                         <li><Link href="/expense-report">Expenses</Link></li>
//                         <li><Link href="/income-report">Income</Link></li>
//                         <li><Link href="/profit-loss-report">Profit & Loss</Link></li>
//                         <li><Link href="/annual-report">Annual Report</Link></li>
//                         <li><Link href="/balance-sheet">Balance Sheet</Link></li>
//                         <li><Link href="/trial-balance">Trial Balance</Link></li>
//                         <li><Link href="/cash-flow">Cash Flow</Link></li>
//                         <li><Link href="/account-statement">Account Statement</Link></li>
//                       </ul>
//                     </li>
//                     <li className="submenu submenu-two">
//                       <Link href="#">User Reports<span className="menu-arrow"></span></Link>
//                       <ul>
//                         <li><Link href="/customers-report">Customers</Link></li>
//                         <li><Link href="/customer-due-report">Customer Due Report</Link></li>
//                         <li><Link href="/supplier-report">Supplier</Link></li>
//                       </ul>
//                     </li>
//                   </ul>
//                 </li>
//                 <li className="submenu">
//                   <Link href="#">
//                     <i className="isax isax-setting-25"></i>
//                     <span>Settings</span>
//                     <span className="menu-arrow"></span>
//                   </Link>
//                   <ul>
//                     <li className="submenu submenu-two">
//                       <Link href="#">General Settings<span className="menu-arrow"></span></Link>
//                       <ul>
//                         <li><Link href="/account-settings">Account Settings</Link></li>
//                         <li><Link href="/plans-billings">Plans & Billing</Link></li>
//                         <li><Link href="/notifications-settings">Notifications</Link></li>
//                         <li><Link href="/integrations-settings">Integrations</Link></li>
//                       </ul>
//                     </li>
//                     <li className="submenu submenu-two">
//                       <Link href="#">App Settings<span className="menu-arrow"></span></Link>
//                       <ul>
//                         <li><Link href="/invoice-settings">Invoice Settings</Link></li>
//                         <li><Link href="/invoice-templates-settings">Invoice Templates</Link></li>
//                         <li><Link href="/esignatures">eSignatures</Link></li>
//                         <li><Link href="/barcode-settings">Barcode</Link></li>
//                         <li><Link href="/thermal-printer">Thermal Printer</Link></li>
//                         <li><Link href="/custom-fields">Custom Fields</Link></li>
//                       </ul>
//                     </li>
//                   </ul>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Page Wrapper */ }
//   <div className="page-wrapper">
//     {children}
//   </div>

//   {/* Footer */ }
//       <div className="footer d-sm-flex align-items-center justify-content-between bg-white py-2 px-4 border-top">
//         <p className="text-dark mb-0">
//           &copy; 2025 <Link href="#" className="link-primary">Kanakku</Link>, All Rights Reserved
//         </p>
//         <p className="text-dark">Version : 1.3.8</p>
//       </div>
//       <div className="sidebar-overlay" onClick={closeSidebar}></div>
//     </div >
//   );
// };

// export default DashboardLayout;

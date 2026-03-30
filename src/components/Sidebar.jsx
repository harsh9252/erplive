import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { hasPermission } from "../services/authService";

const QUICK_ACTIONS = [
  {
    label: 'Invoice',
    route: '/invoicing/sales/add',
    icon: 'isax-document-text-1',
    module: 'sales_invoice',
    action: 'create'
  },
  {
    label: 'Expense',
    route: '/expenses',
    icon: 'isax-money-send',
    module: 'accounting',
    action: 'create'
  },
  {
    label: 'Credit Note',
    route: '/invoicing/credit-notes/add',
    icon: 'isax-money-add',
    module: 'sales_invoice',
    action: 'create'
  },
  {
    label: 'Debit Note',
    route: '/invoicing/debit-notes/add',
    icon: 'isax-money-recive',
    module: 'purchase_invoice',
    action: 'create'
  },
  {
    label: 'Purchase Order',
    route: '/invoicing/purchase-orders/add',
    icon: 'isax-document',
    module: 'purchase_invoice',
    action: 'create'
  },
  // { 
  //   label: 'Quotation', 
  //   route: '/add-quotation', 
  //   icon: 'isax-document-download', 
  //   module: 'sales_invoice', 
  //   action: 'create' 
  // },
  // { 
  //   label: 'Delivery Challan', 
  //   route: '/add-delivery-challan', 
  //   icon: 'isax-document-forward', 
  //   module: 'sales_invoice', 
  //   action: 'create' 
  // },
];

const Sidebar = () => {
  const location = useLocation();
  const { activeCompany } = useAuth();
  const [openMenus, setOpenMenus] = useState({});
  const [isMiniSidebar, setIsMiniSidebar] = useState(false);

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };
  const closeSidebar = () => {
    document.body.classList.remove("slide-nav");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isMenuActive = (paths) => {
    return paths.some(
      (path) =>
        location.pathname === path || location.pathname.startsWith(path + "/"),
    );
  };

  // Toggle sidebar mini/full
  const toggleSidebar = (e) => {
    e.preventDefault();
    if (window.innerWidth <= 991) {
      document.body.classList.toggle("slide-nav");
    } else {
      setIsMiniSidebar(!isMiniSidebar);
    }
  };

  // Handle hover on mini sidebar
  const handleMouseEnter = () => {
    if (isMiniSidebar) {
      document.body.classList.add("expand-menu");
    }
  };

  const handleMouseLeave = () => {
    if (isMiniSidebar) {
      document.body.classList.remove("expand-menu");
    }
  };

  // Handle submenu link clicks - collapse sidebar if in mini mode
  const handleSubmenuLinkClick = () => {
    if (isMiniSidebar) {
      document.body.classList.remove("expand-menu");
    }
  };

  // Apply mini-sidebar class to body
  useEffect(() => {
    if (isMiniSidebar) {
      document.body.classList.add("mini-sidebar");
    } else {
      document.body.classList.remove("mini-sidebar");
      document.body.classList.remove("expand-menu");
    }
  }, [isMiniSidebar]);

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (window.innerWidth <= 991) {
      document.body.classList.remove("slide-nav");
    }
  }, [location.pathname]);

  return (
    <>
      <div
        className="two-col-sidebar"
        id="two-col-sidebar"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="twocol-mini">
          {/* Add */}
          <div className="dropdown">
            <button
              className="btn btn-primary bg-gradient btn-sm btn-icon rounded-circle d-flex align-items-center justify-content-center"
              data-bs-toggle="dropdown"
              type="button"
            >
              <i className="isax isax-add"></i>
            </button>

            <ul className="dropdown-menu dropdown-menu-start m-5">
              {QUICK_ACTIONS.filter(item => hasPermission(item.module, item.action)).map((item, idx) => (
                <li key={idx}>
                  <Link to={item.route} className="dropdown-item d-flex align-items-center">
                    <i className={`isax ${item.icon} me-2`}></i>
                    {item.label}
                  </Link>
                </li>
              ))}
              {QUICK_ACTIONS.filter(item => hasPermission(item.module, item.action)).length === 0 && (
                <li><span className="dropdown-item disabled text-muted">No actions available</span></li>
              )}
            </ul>
          </div>

          <ul className="menu-list">
            <li>
              <Link to="/account-settings" title="Settings">
                <i className="isax isax-setting-25"></i>
              </Link>
            </li>
            <li>
              <Link to="/company/backup" title="Data Backup">
                <i className="isax isax-document-normal4"></i>
              </Link>
            </li>
            <li>
              <Link to="/version-control" title="Version">
                <i className="isax isax-cloud-change5"></i>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <i className="isax isax-login-15"></i>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar" id="sidebar-two">
          {/* Start Logo */}
          <div className="sidebar-logo">
            <Link to="/" className="logo logo-normal">
              <img src="/assets/img/sidebarlogo.svg" alt="Logo" />{" "}
              {activeCompany?.name || "Yani Books"}
            </Link>
            <Link to="/" className="logo-small">
              <img src="/assets/img/sidebarlogo.svg" alt="Logo" />
            </Link>
            <Link to="/" className="dark-logo">
              <img src="/assets/img/sidebarlogo.svg" alt="Logo" />
            </Link>
            {/* <button
              id="toggle_btn"
              onClick={toggleSidebar}
              style={{ border: "none", background: "none" }}
            >
              <i className="isax isax-menu-1"></i>
            </button> */}

            {/* <div className="sidebar-overlay" onClick={closeSidebar}></div> */}
          </div>

          {/* Search */}
          <div className="sidebar-search">
            <div className="input-icon-end position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
              <span className="input-icon-addon">
                <i className="isax isax-search-normal"></i>
              </span>
            </div>
          </div>

          {/* Sidenav Menu */}
          <div className="sidebar-inner" data-simplebar>
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                {/* MAIN MENU */}
                {/* DASHBOARD */}
                <li>
                  <Link
                    to="/dashboard"
                    className={isActive("/dashboard") ? "active" : ""}
                  >
                    <i className="isax isax-element-45 fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">Dashboard</span>
                  </Link>
                </li>

                {/* COMPANY & SYSTEM SETUP */}
                <li className="submenu">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("companySetup");
                    }}
                    className={
                      openMenus["companySetup"] ||
                        isMenuActive([
                          "/companies",
                          "/company/financial-years",
                          "/company/users",
                          "/company/roles",
                          "/company/backup",
                        ])
                        ? "active subdrop"
                        : ""
                    }
                  >
                    <i className="isax isax-building-45 fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">
                      Company & System Setup
                    </span>
                    <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                  </a>
                  <ul
                    style={{
                      display:
                        openMenus["companySetup"] ||
                          isMenuActive([
                            "/companies",
                            "/company/financial-years",
                            "/company/users",
                            "/company/roles",
                            "/company/backup",
                          ])
                          ? "block"
                          : "none",
                    }}
                  >
                    <li>
                      <Link
                        to="/company/profile"
                        className={isActive("/company/profile") ? "active" : ""}
                      >
                        Company Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/company/financial-years"
                        className={
                          isActive("/company/financial-years") ? "active" : ""
                        }
                      >
                        Financial Years
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/company/users"
                        className={isActive("/company/users") ? "active" : ""}
                      >
                        Users & Access
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/company/roles"
                        className={isActive("/company/roles") ? "active" : ""}
                      >
                        Roles & Permissions
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/company/backup"
                        className={isActive("/company/backup") ? "active" : ""}
                      >
                        Data Backup
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* ACCOUNTING & FINANCE */}
                <li className="submenu">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("accountingFinance");
                    }}
                    className={
                      openMenus["accountingFinance"] ||
                        isMenuActive([
                          "/accounting/ledger-groups",
                          "/accounting/ledgers",
                          "/vouchers",
                          "/bank-reconciliation",
                          "/cost-centers",
                          "/accounting/budgets",
                        ])
                        ? "active subdrop"
                        : ""
                    }
                  >
                    <i className="isax isax-book5 fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">
                      Accounting & Finance
                    </span>
                    <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                  </a>
                  <ul
                    style={{
                      display:
                        openMenus["accountingFinance"] ||
                          isMenuActive([
                            "/accounting/ledger-groups",
                            "/accounting/ledgers",
                            "/vouchers",
                            "/bank-reconciliation",
                            "/cost-centers",
                            "/accounting/budgets",
                          ])
                          ? "block"
                          : "none",
                    }}
                  >
                    <li className="submenu">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleMenu("chartOfAccounts");
                        }}
                        className={
                          openMenus["chartOfAccounts"] ||
                            isMenuActive([
                              "/accounting/ledger-groups",
                              "/accounting/ledgers",
                            ])
                            ? "active subdrop"
                            : ""
                        }
                      >
                        <span className="fs-14 fw-medium">
                          Chart of Accounts
                        </span>
                        <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                      </a>
                      <ul
                        style={{
                          display:
                            openMenus["chartOfAccounts"] ||
                              isMenuActive([
                                "/accounting/ledger-groups",
                                "/accounting/ledgers",
                              ])
                              ? "block"
                              : "none",
                        }}
                      >
                        <li>
                          <Link
                            to="/accounting/ledger-groups"
                            className={
                              isActive("/accounting/ledger-groups")
                                ? "active"
                                : ""
                            }
                          >
                            Ledger Groups
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/accounting/ledgers"
                            className={
                              isActive("/accounting/ledgers") ? "active" : ""
                            }
                          >
                            Ledgers
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link
                        to="/vouchers"
                        className={isActive("/vouchers") ? "active" : ""}
                      >
                        Voucher Entry
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/bank-reconciliation"
                        className={
                          isActive("/bank-reconciliation") ? "active" : ""
                        }
                      >
                        Bank Reconciliation
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/accounting/interest"
                        className={
                          isActive("/accounting/interest") ? "active" : ""
                        }
                      >
                        Interest Calculation
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/accounting/cost-centres"
                        className={
                          isActive("/accounting/cost-centres") ? "active" : ""
                        }
                      >
                        Cost Centres
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/accounting/budgets"
                        className={
                          isActive("/accounting/budgets") ? "active" : ""
                        }
                      >
                        Budgets
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* INVOICING & BILLING */}
                <li className="submenu">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("invoicingBilling");
                    }}
                    className={
                      openMenus["invoicingBilling"] ||
                        isMenuActive([
                          "/invoicing/sales",
                          "/invoicing/purchases",
                          "/invoicing/credit-notes",
                          "/invoicing/debit-notes",
                          "/invoicing/proforma",
                          "/sales-orders",
                          "/purchase-orders",
                        ])
                        ? "active subdrop"
                        : ""
                    }
                  >
                    <i className="isax isax-receipt-item5 fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">
                      Invoicing & Billing
                    </span>
                    <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                  </a>
                  <ul
                    style={{
                      display:
                        openMenus["invoicingBilling"] ||
                          isMenuActive([
                            "/invoicing/sales",
                            "/invoicing/purchases",
                            "/invoicing/credit-notes",
                            "/invoicing/debit-notes",
                            "/invoicing/proforma",
                            "/invoicing/sales-orders",
                            "/purchase-orders",
                          ])
                          ? "block"
                          : "none",
                    }}
                  >
                    <li>
                      <Link
                        to="/invoicing/sales"
                        className={isMenuActive(["/invoicing/sales"]) ? "active" : ""}
                      >
                        Sales Invoices
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/invoicing/purchases"
                        className={isMenuActive(["/invoicing/purchases"]) ? "active" : ""}
                      >
                        Purchase Invoices
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/invoicing/credit-notes"
                        className={isMenuActive(["/invoicing/credit-notes"]) ? "active" : ""}
                      >
                        Credit Notes (Sales Returns)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/invoicing/debit-notes"
                        className={isMenuActive(["/invoicing/debit-notes"]) ? "active" : ""}
                      >
                        Debit Notes (Purchase Returns)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/invoicing/proforma"
                        className={isMenuActive(["/invoicing/proforma"]) ? "active" : ""}
                      >
                        Proforma Invoices
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/invoicing/sales-orders"
                        className={isMenuActive(["/invoicing/sales-orders"]) ? "active" : ""}
                      >
                        Sales Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/invoicing/purchase-orders"
                        className={isMenuActive(["/invoicing/purchase-orders"]) ? "active" : ""}
                      >
                        Purchase Orders
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* INVENTORY MANAGEMENT */}
                <li className="submenu">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("inventoryManagement");
                    }}
                    className={
                      openMenus["inventoryManagement"] ||
                        isMenuActive([
                          "/items",
                          "/products",
                          "/stock-summary",
                          "/stock-transfers",
                          "/wastage",
                          "/hsn-sac-master",
                        ])
                        ? "active subdrop"
                        : ""
                    }
                  >
                    <i className="isax isax-box5 fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">
                      Inventory Management
                    </span>
                    <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                  </a>
                  <ul
                    style={{
                      display:
                        openMenus["inventoryManagement"] ||
                          isMenuActive([
                            "/inventory/items",
                            "/inventory/stock-summary",
                            "/stock-transfers",
                            "/wastage",
                            "/hsn-sac-master",
                          ])
                          ? "block"
                          : "none",
                    }}
                  >
                    <li>
                      <Link
                        to="/inventory/items"
                        className={isMenuActive(["/inventory/items"]) ? "active" : ""}
                      >
                        Stock Items
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/inventory/stock-summary"
                        className={isMenuActive(["/inventory/stock-summary"]) ? "active" : ""}
                      >
                        Stock Summary
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/inventory/transfer"
                        className={isActive("/inventory/transfer") ? "active" : ""}
                      >
                        Stock Transfer
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/inventory/wastage"
                        className={isActive("/inventory/wastage") ? "active" : ""}
                      >
                        Wastage / Scrap
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/inventory/stock-verification"
                        className={isActive("/inventory/stock-verification") ? "active" : ""}
                      >
                        Stock Verification
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/inventory/hsn-sac"
                        className={isActive("/inventory/hsn-sac") ? "active" : ""}
                      >
                        HSN / SAC Codes
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* MANUFACTURING */}
                <li className="submenu">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("manufacturing");
                    }}
                    className={
                      openMenus["manufacturing"] ||
                        isMenuActive(["/manufacturing/bom"])
                        ? "active subdrop"
                        : ""
                    }
                  >
                    <i className="isax isax-setting-2 fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">Manufacturing</span>
                    <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                  </a>
                  <ul
                    style={{
                      display:
                        openMenus["manufacturing"] ||
                          isMenuActive(["/manufacturing/bom"])
                          ? "block"
                          : "none",
                    }}
                  >
                    <li>
                      <Link
                        to="/manufacturing/bom"
                        className={isActive("/manufacturing/bom") ? "active" : ""}
                      >
                        Bill of Materials (BOM)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/manufacturing/production-orders"
                        className={isActive("/manufacturing/production-orders") ? "active" : ""}
                      >
                        Production Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/manufacturing/job-work"
                        className={isActive("/manufacturing/job-work") ? "active" : ""}
                      >
                        Job Work
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* GST & TAXATION */}
                <li className="submenu">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("gstTaxation");
                    }}
                    className={
                      openMenus["gstTaxation"] ||
                        isMenuActive(["/tax-report", "/gst/summary"])
                        ? "active subdrop"
                        : ""
                    }
                  >
                    <i className="isax isax-receipt-text5 fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">GST & Taxation</span>
                    <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                  </a>
                  <ul
                    style={{
                      display:
                        openMenus["gstTaxation"] ||
                          isMenuActive(["/tax-report", "/gst/summary", "/gst/rcm"])
                          ? "block"
                          : "none",
                    }}
                  >
                    {/* <li>
                      <Link
                        to="/tax-report"
                        className={isActive("/tax-report") ? "active" : ""}
                      >
                        GST Report
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        to="/reports/gst-summary"
                        className={isActive("/reports/gst-summary") ? "active" : ""}
                      >
                        GST Report
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/gst/rcm"
                        className={isActive("/gst/rcm") ? "active" : ""}
                      >
                        Reverse Charge (RCM)
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* PAYROLL & HR */}
                <li className="submenu">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("payrollHr");
                    }}
                    className={openMenus["payrollHr"] ? "active subdrop" : ""}
                  >
                    <i className="isax isax-profile-2user5 fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">Payroll & HR</span>
                    <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                  </a>
                  <ul
                    style={{
                      display:
                        openMenus["payrollHr"] ||
                          isMenuActive(["/payroll/employees"])
                          ? "block"
                          : "none",
                    }}
                  >
                    <li>
                      <Link
                        to="/payroll/employees"
                        className={isActive("/payroll/employees") ? "active" : ""}
                      >
                        Employees
                      </Link>
                    </li>
                    <li className={isActive("/payroll/attendance") ? "active" : ""}>
                      <Link
                        to="/payroll/attendance"
                        className={isActive("/payroll/attendance") ? "active" : ""}
                      >
                        <i className="isax isax-calendar-1"></i>
                        Attendance
                      </Link>
                    </li>
                    <li className={isActive("/payroll/salary-structure") ? "active" : ""}>
                      <Link
                        to="/payroll/salary-structure"
                        className={isActive("/payroll/salary-structure") ? "active" : ""}
                      >
                        <i className="isax isax-money-recive"></i>
                        Salary Structure
                      </Link>
                    </li>
                    <li className={isActive("/payroll/payslips") ? "active" : ""}>
                      <Link
                        to="/payroll/payslips"
                        className={isActive("/payroll/payslips") ? "active" : ""}
                      >
                        <i className="isax isax-receipt-2"></i>
                        Payslips
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Banking & Payments */}
                <li className="submenu">
                  <Link
                    to="#"
                    onClick={(e) => { e.preventDefault(); toggleMenu("banking"); }}
                    className={openMenus["banking"] ? "active subdrop" : ""}
                  >
                    <i className="isax isax-bank fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">Banking & Payments</span>
                    <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                  </Link>
                  <ul
                    style={{
                      display: openMenus["banking"] || isMenuActive(["/banking/cheques", "/bank-reconciliation"]) ? "block" : "none"
                    }}
                  >
                    <li>
                      <Link
                        to="/bank-reconciliation"
                        className={
                          isActive("/bank-reconciliation") ? "active" : ""
                        }
                      >
                        Bank Reconciliation
                      </Link>
                    </li>
                    <li className={isActive("/banking/cheques") ? "active" : ""}>
                      <Link
                        to="/banking/cheques"
                        className={isActive("/banking/cheques") ? "active" : ""}
                      >
                        <i className="isax isax-wallet"></i>
                        Post-Dated Cheques
                      </Link>
                    </li>
                  </ul>                </li>

                {/* REPORTS & MIS */}
                <li className="submenu">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("reportsMis");
                    }}
                    className={
                      openMenus["reportsMis"] ||
                        isMenuActive([
                          "/trial-balance",
                          "/profit-loss-report",
                          "/balance-sheet",
                          "/ledger-report",
                          "/outstanding-reports",
                          "/stock-summary",
                          "/sales-report",
                          "/purchases-report",
                          "/gstr-1",
                          "/cash-flow",
                          "/fund-flow",
                        ])
                        ? "active subdrop"
                        : ""
                    }
                  >
                    <i className="isax isax-chart-215 fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">Reports & MIS</span>
                    <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                  </a>
                  <ul
                    style={{
                      display:
                        openMenus["reportsMis"] ||
                          isMenuActive([
                            "/trial-balance",
                            "/profit-loss-report",
                            "/balance-sheet",
                            "/ledger-report",
                            "/outstanding-reports",
                            "/stock-summary",
                            "/sales-report",
                            "/purchases-report",
                            "/gstr-1",
                            "/cash-flow",
                            "/fund-flow",
                          ])
                          ? "block"
                          : "none",
                    }}
                  >
                    <li>
                      <Link
                        to="/trial-balance"
                        className={isActive("/trial-balance") ? "active" : ""}
                      >
                        Trial Balance
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profit-loss-report"
                        className={
                          isActive("/profit-loss-report") ? "active" : ""
                        }
                      >
                        Profit & Loss
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/balance-sheet"
                        className={isActive("/balance-sheet") ? "active" : ""}
                      >
                        Balance Sheet
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/ledger-report"
                        className={isActive("/ledger-report") ? "active" : ""}
                      >
                        Ledger Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/outstanding-reports"
                        className={
                          isActive("/outstanding-reports") ? "active" : ""
                        }
                      >
                        Outstanding Receivables
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/outstanding-reports"
                        className={
                          isActive("/outstanding-reports") ? "active" : ""
                        }
                      >
                        Outstanding Payables
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/inventory/stock-summary"
                        className={isMenuActive(["/inventory/stock-summary"]) ? "active" : ""}
                      >
                        Stock Summary
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/reports/sales-analysis"
                        className={isActive("/reports/sales-analysis") ? "active" : ""}
                      >
                        Sales Analysis
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/reports/purchase-analysis"
                        className={isActive("/reports/purchase-analysis") ? "active" : ""}
                      >
                        Purchase Analysis
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/reports/gst-summary"
                        className={isActive("/reports/gst-summary") ? "active" : ""}
                      >
                        GST Summary
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/reports/cash-flow"
                        className={isActive("/reports/cash-flow") ? "active" : ""}
                      >
                        Cash Flow
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/reports/fund-flow"
                        className={isActive("/reports/fund-flow") ? "active" : ""}
                      >
                        Fund Flow
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/reports/cash-bank-book"
                        className={isActive("/reports/cash-bank-book") ? "active" : ""}
                      >
                        Cash/Bank Book
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/reports/day-book"
                        className={isActive("/reports/day-book") ? "active" : ""}
                      >
                        Day Book
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* MULTI-CURRENCY */}
                <li>
                  <Link

                    to="/currencies"
                    className={isActive("/currencies") ? "active" : ""}
                  >
                    <i className="isax isax-money-send fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">
                      Multi-Currency
                    </span>
                  </Link>
                </li>
                {/* APPROVAL WORKFLOW */}
                <li className={isActive("/approvals") ? "active" : ""}>
                  <Link
                    to="/approvals"
                    className={isActive("/approvals") ? "active" : ""}
                  >
                    <i className="isax isax-tick-square fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">
                      Approval Workflow
                    </span>
                  </Link>
                </li>

                {/* MASTER DATA */}
                <li className="submenu">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("masterData");
                    }}
                    className={
                      openMenus["masterData"] ||
                        isMenuActive(["/master/customers", "/master/vendors"])
                        ? "active subdrop"
                        : ""
                    }
                  >
                    <i className="isax isax-folder-2 fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">Master Data</span>
                    <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                  </a>
                  <ul
                    style={{
                      display:
                        openMenus["masterData"] ||
                          isMenuActive(["/master/customers", "/master/vendors"])
                          ? "block"
                          : "none",
                    }}
                  >
                    <li>
                      <Link
                        to="/master/customers"
                        className={isActive("/master/customers") ? "active" : ""}
                      >
                        Customers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/master/vendors"
                        className={isActive("/master/vendors") ? "active" : ""}
                      >
                        Vendors
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* SETTINGS */}
                <li className="submenu">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("settingsNew");
                    }}
                    className={
                      openMenus["settingsNew"] ||
                        isMenuActive([
                          "/company-settings",
                          "/financial-year",
                          "/warehouses",
                        ])
                        ? "active subdrop"
                        : ""
                    }
                  >
                    <i className="isax isax-setting-25 fs-18"></i>
                    <span className="fs-14 fw-medium ms-2">Settings</span>
                    <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                  </a>
                  <ul
                    style={{
                      display:
                        openMenus["settingsNew"] ||
                          isMenuActive([
                            "/company-settings",
                            "/financial-year",
                            "/warehouses",
                          ])
                          ? "block"
                          : "none",
                    }}
                  >
                    <li>
                      <Link
                        to="/settings/company"
                        className={
                          isActive("/settings/company") || isActive("/company-settings") ? "active" : ""
                        }
                      >
                        Company Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/financial-year"
                        className={isActive("/financial-year") ? "active" : ""}
                      >
                        Financial Years
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings/voucher-types"
                        className={isActive("/settings/voucher-types") ? "active" : ""}
                      >
                        Voucher Types
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/warehouses"
                        className={isActive("/warehouses") ? "active" : ""}
                      >
                        Warehouse
                      </Link>
                    </li>

                  </ul>
                </li>
              </ul>
              <Link to="/version-control" className="text-center p-1 version">
                Version Control
              </Link>
            </div>
          </div>
        </div>
      </div >
      <div className="sidebar-overlay" onClick={closeSidebar}></div>
    </>
  );
};

export default Sidebar;

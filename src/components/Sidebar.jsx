import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { hasPermission } from "../services/authService";

const QUICK_ACTIONS = [
  {
    label: "Invoice",
    route: "/invoicing/sales/add",
    icon: "isax-document-text-1",
    module: "sales_invoice",
    action: "create",
  },
  {
    label: "Expense",
    route: "/expenses",
    icon: "isax-money-send",
    module: "accounting",
    action: "create",
  },
  {
    label: "Credit Note",
    route: "/invoicing/credit-notes/add",
    icon: "isax-money-add",
    module: "sales_invoice",
    action: "create",
  },
  {
    label: "Debit Note",
    route: "/invoicing/debit-notes/add",
    icon: "isax-money-recive",
    module: "purchase_invoice",
    action: "create",
  },
  {
    label: "Purchase Order",
    route: "/invoicing/purchase-orders/add",
    icon: "isax-document",
    module: "purchase_invoice",
    action: "create",
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

const MENU_MAPPINGS = {
  companySetup: ["/companies", "/company-settings", "/business-nature", "/company/financial-years", "/company/users", "/company/roles", "/company/backup", "/audit-logs", "/company/profile"],
  accountingFinance: ["/accounting", "/accounting/vouchers", "/accounting/cost-centres", "/accounting/budgets", "/accounting/ledgers", "/accounting/ledger-groups", "/accounting/interest"],
  investments: ["/master/investments"],
  invoicingBilling: ["/invoicing", "/sales-orders", "/purchase-orders"],
  inventoryManagement: ["/inventory", "/inventory/uom", "/item-categories", "/stock-transfers", "/wastage", "/hsn-sac-master", "/batch-tracking", "/serial-numbers", "/stock-alerts"],
  manufacturing: ["/manufacturing"],
  gstTaxation: ["/tax-report", "/gst", "/settings/tds-master", "/settings/tcs-master", "/reports/tds-report", "/reports/tcs-report"],
  payrollHr: ["/payroll"],
  banking: ["/banking", "/banking/cheques", "/bank-reconciliation", "/bank-accounts", "/payment-methods", "/payments", "/supplier-payments"],
  reportsMis: ["/mis-dashboard", "/trial-balance", "/profit-loss-report", "/balance-sheet", "/ledger-report", "/outstanding-reports", "/reports", "/reports/stock-valuation"],
  masterData: ["/master/customers", "/master/vendors", "/master/ecommerce-operators", "/master/branches"],
  settingsNew: ["/company-settings", "/financial-year", "/warehouses", "/settings"]
};

// Sub-menu mappings for nested dropdowns
const SUBMENU_MAPPINGS = {
  chartOfAccounts: ["/accounting/ledgers", "/accounting/ledger-groups"]
};

const Sidebar = () => {
  const location = useLocation();
  const { activeCompany, hasPermission } = useAuth();

  const checkPermission = (module, action = 'can_read') => {
    if (typeof hasPermission !== 'function') return true;
    return hasPermission(module, action);
  };

  const [openMenus, setOpenMenus] = useState({});
  const [isMiniSidebar, setIsMiniSidebar] = useState(false);

  const toggleMenu = (menuName, isSubmenu = false) => {
    setOpenMenus((prev) => {
      if (isSubmenu) {
        return { ...prev, [menuName]: !prev[menuName] };
      }
      // Accordion: Only one top-level menu open at a time
      return { [menuName]: !prev[menuName] };
    });
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

  // Close sidebar on route change for mobile and auto-open active menu
  useEffect(() => {
    if (window.innerWidth <= 991) {
      document.body.classList.remove("slide-nav");
    }

    // Auto-open active menu category
    const currentPath = location.pathname;
    let categoryToOpen = null;
    let submenuToOpen = null;

    // Find top-level category
    for (const [category, paths] of Object.entries(MENU_MAPPINGS)) {
      if (paths.some(path => currentPath === path || currentPath.startsWith(path))) {
        categoryToOpen = category;
        break;
      }
    }

    // Find nested submenu
    for (const [submenu, paths] of Object.entries(SUBMENU_MAPPINGS)) {
      if (paths.some(path => currentPath === path || currentPath.startsWith(path))) {
        submenuToOpen = submenu;
        break;
      }
    }

    if (categoryToOpen) {
      const newState = { [categoryToOpen]: true };
      if (submenuToOpen) {
        newState[submenuToOpen] = true;
      }
      setOpenMenus(newState);
    }
  }, [location.pathname]);

  return (
    <>
      <div
        className="two-col-sidebar d-print-none"
        id="two-col-sidebar"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="twocol-mini">
          {/* Add */}
          {/* <div className="dropdown"> */}
          {/* <button
              className="btn btn-primary bg-gradient btn-sm btn-icon rounded-circle d-flex align-items-center justify-content-center shadow-sm"
              data-bs-toggle="dropdown"
              data-bs-boundary="viewport"
              type="button"
              title="Quick Add"
            >
              <i className="isax isax-add"></i>
            </button> */}

          {/* <ul className="dropdown-menu dropdown-menu-start shadow-lg border-0 mt-2">
              {QUICK_ACTIONS.filter((item) =>
                hasPermission(item.module, item.action),
              ).map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.route}
                    className="dropdown-item d-flex align-items-center"
                  >
                    <i className={`isax ${item.icon} me-2`}></i>
                    {item.label}
                  </Link>
                </li>
              ))}
              {QUICK_ACTIONS.filter((item) =>
                hasPermission(item.module, item.action),
              ).length === 0 && (
                  <li>
                    <span className="dropdown-item disabled text-muted">
                      No actions available
                    </span>
                  </li>
                )}
            </ul> */}
          {/* </div> */}

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

        <div className="sidebar d-print-none" id="sidebar-two">
          {/* Start Logo */}
          <div className="sidebar-logo">
            <Link to="/" className="logo logo-normal">
              <img src="/assets/img/sidebarlogo.svg" alt="Logo" />{" "}
              {"Yani Books"}
            </Link>
            <Link to="/" className="logo-small">
              <img src="/assets/img/sidebarlogo.svg" alt="Logo" />
            </Link>
            <Link to="/" className="dark-logo">
              <img src="/assets/img/sidebarlogo.svg" alt="Logo" />{" "}
              {"Yani Books"}
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
                {(checkPermission("settings", "can_read") || checkPermission("users", "can_read")) && (
                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("companySetup");
                      }}
                      className={openMenus["companySetup"] ? "active subdrop" : ""}
                    >
                      <i className="isax isax-building-45 fs-18"></i>
                      <span className="fs-14 fw-medium ms-2">
                        Company & System Setup
                      </span>
                      <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                    </a>
                    <ul
                      style={{
                        display: openMenus["companySetup"] ? "block" : "none",
                      }}
                    >
                      {checkPermission("settings", "can_read") && (
                        <li>
                          <Link
                            to="/company/profile"
                            className={isActive("/company/profile") ? "active" : ""}
                          >
                            Company Profile
                          </Link>
                        </li>
                      )}
                      {checkPermission("settings", "can_read") && (
                        <li>
                          <Link
                            to="/business-nature"
                            className={isActive("/business-nature") ? "active" : ""}
                          >
                            Business Nature
                          </Link>
                        </li>
                      )}
                      {checkPermission("settings", "can_read") && (
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
                      )}
                      {checkPermission("users", "can_read") && (
                        <li>
                          <Link
                            to="/company/users"
                            className={isActive("/company/users") ? "active" : ""}
                          >
                            Users & Access
                          </Link>
                        </li>
                      )}
                      {checkPermission("users", "can_read") && (
                        <li>
                          <Link
                            to="/company/roles"
                            className={isActive("/company/roles") ? "active" : ""}
                          >
                            Roles & Permissions
                          </Link>
                        </li>
                      )}
                      {checkPermission("settings", "can_read") && (
                        <li>
                          <Link
                            to="/company/backup"
                            className={isActive("/company/backup") ? "active" : ""}
                          >
                            Data Backup
                          </Link>
                        </li>
                      )}
                      {checkPermission("settings", "can_read") && (
                        <li>
                          <Link
                            to="/audit-logs"
                            className={isActive("/audit-logs") ? "active" : ""}
                          >
                            Audit Logs
                          </Link>
                        </li>
                      )}
                    </ul>
                  </li>
                )}

                {/* ACCOUNTING & FINANCE */}
                {(checkPermission("accounting", "can_read") || checkPermission("banking", "can_read")) && (
                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("accountingFinance");
                      }}
                      className={openMenus["accountingFinance"] ? "active subdrop" : ""}
                    >
                      <i className="isax isax-book5 fs-18"></i>
                      <span className="fs-14 fw-medium ms-2">
                        Accounting & Finance
                      </span>
                      <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                    </a>
                    <ul
                      style={{
                        display: openMenus["accountingFinance"] ? "block" : "none",
                      }}
                    >
                      {checkPermission("accounting", "can_read") && (
                        <li className="submenu">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleMenu("chartOfAccounts", true);
                            }}
                            className={openMenus["chartOfAccounts"] ? "active subdrop" : ""}
                          >
                            <span className="fs-14 fw-medium">
                              Chart of Accounts
                            </span>
                            <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                          </a>
                          <ul
                            style={{
                              display: openMenus["chartOfAccounts"] ? "block" : "none",
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
                      )}
                      {checkPermission("accounting", "can_read") && (
                        <li>
                          <Link
                            to="/accounting/vouchers"
                            className={isActive("/accounting/vouchers") ? "active" : ""}
                          >
                            Voucher Entry
                          </Link>
                        </li>
                      )}

                      {checkPermission("accounting", "can_read") && (
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
                      )}
                      {checkPermission("accounting", "can_read") && (
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
                      )}
                      {checkPermission("accounting", "can_read") && (
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
                      )}
                    </ul>
                  </li>
                )}

                {/* INVESTMENTS */}
                {checkPermission("reports", "can_read") && (
                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("investments");
                      }}
                      className={openMenus["investments"] ? "active subdrop" : ""}
                    >
                      <i className="isax isax-chart-success fs-18"></i>
                      <span className="fs-14 fw-medium ms-2">Investments</span>
                      <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                    </a>
                    <ul
                      style={{
                        display: openMenus["investments"] ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/master/investments"
                          className={isActive("/master/investments") ? "active" : ""}
                        >
                          Portfolio & Investments
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}

                {/* INVOICING & BILLING */}
                {(checkPermission("sales_invoice", "can_read") || checkPermission("purchase_invoice", "can_read")) && (
                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("invoicingBilling");
                      }}
                      className={openMenus["invoicingBilling"] ? "active subdrop" : ""}
                    >
                      <i className="isax isax-receipt-item5 fs-18"></i>
                      <span className="fs-14 fw-medium ms-2">
                        Invoicing & Billing
                      </span>
                      <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                    </a>
                    <ul
                      style={{
                        display: openMenus["invoicingBilling"] ? "block" : "none",
                      }}
                    >
                      {checkPermission("sales_invoice", "can_read") && (
                        <li>
                          <Link
                            to="/invoicing/sales"
                            className={
                              isMenuActive(["/invoicing/sales"]) ? "active" : ""
                            }
                          >
                            Sales Invoices
                          </Link>
                        </li>
                      )}
                      {checkPermission("purchase_invoice", "can_read") && (
                        <li>
                          <Link
                            to="/invoicing/purchases"
                            className={
                              isMenuActive(["/invoicing/purchases"]) ? "active" : ""
                            }
                          >
                            Purchase Invoices
                          </Link>
                        </li>
                      )}
                      {checkPermission("sales_invoice", "can_read") && (
                        <li>
                          <Link
                            to="/invoicing/credit-notes"
                            className={
                              isMenuActive(["/invoicing/credit-notes"])
                                ? "active"
                                : ""
                            }
                          >
                            Credit Notes (Sales Returns)
                          </Link>
                        </li>
                      )}
                      {checkPermission("purchase_invoice", "can_read") && (
                        <li>
                          <Link
                            to="/invoicing/debit-notes"
                            className={
                              isMenuActive(["/invoicing/debit-notes"])
                                ? "active"
                                : ""
                            }
                          >
                            Debit Notes (Purchase Returns)
                          </Link>
                        </li>
                      )}
                      {checkPermission("sales_invoice", "can_read") && (
                        <li>
                          <Link
                            to="/invoicing/proforma"
                            className={
                              isMenuActive(["/invoicing/proforma"]) ? "active" : ""
                            }
                          >
                            Proforma Invoices
                          </Link>
                        </li>
                      )}
                      {checkPermission("sales_invoice", "can_read") && (
                        <li>
                          <Link
                            to="/invoicing/sales-orders"
                            className={
                              isMenuActive(["/invoicing/sales-orders"])
                                ? "active"
                                : ""
                            }
                          >
                            Sales Orders
                          </Link>
                        </li>
                      )}
                      {checkPermission("purchase_invoice", "can_read") && (
                        <li>
                          <Link
                            to="/invoicing/purchase-orders"
                            className={
                              isMenuActive(["/invoicing/purchase-orders"])
                                ? "active"
                                : ""
                            }
                          >
                            Purchase Orders
                          </Link>
                        </li>
                      )}
                    </ul>
                  </li>
                )}

                {/* INVENTORY MANAGEMENT */}
                {checkPermission("inventory", "can_read") && (
                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("inventoryManagement");
                      }}
                      className={openMenus["inventoryManagement"] ? "active subdrop" : ""}
                    >
                      <i className="isax isax-box5 fs-18"></i>
                      <span className="fs-14 fw-medium ms-2">
                        Inventory Management
                      </span>
                      <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                    </a>
                    <ul
                      style={{
                        display: openMenus["inventoryManagement"] ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/inventory/items"
                          className={
                            isMenuActive(["/inventory/items"]) ? "active" : ""
                          }
                        >
                          Stock Items
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/item-categories"
                          className={isActive("/item-categories") ? "active" : ""}
                        >
                          Stock Groups
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/inventory/stock-summary"
                          className={
                            isMenuActive(["/inventory/stock-summary"])
                              ? "active"
                              : ""
                          }
                        >
                          Stock Summary
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/inventory/stock-ageing"
                          className={
                            isMenuActive(["/inventory/stock-ageing"])
                              ? "active"
                              : ""
                          }
                        >
                          Stock Ageing Report
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/inventory/expiry"
                          className={
                            isMenuActive(["/inventory/expiry"]) ? "active" : ""
                          }
                        >
                          Batch Expiry Report
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/inventory/transfer"
                          className={
                            isActive("/inventory/transfer") ? "active" : ""
                          }
                        >
                          Stock Transfer
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/inventory/stock-entry"
                          className={
                            isMenuActive(["/inventory/stock-entry"]) ? "active" : ""
                          }
                        >
                          Stock Entry
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/inventory/wastage"
                          className={
                            isActive("/inventory/wastage") ? "active" : ""
                          }
                        >
                          Wastage / Scrap
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/inventory/stock-verification"
                          className={
                            isActive("/inventory/stock-verification")
                              ? "active"
                              : ""
                          }
                        >
                          Stock Verification
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/batch-tracking"
                          className={isActive("/batch-tracking") ? "active" : ""}
                        >
                          Batch Tracking
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/serial-numbers"
                          className={isActive("/serial-numbers") ? "active" : ""}
                        >
                          Serial Numbers
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/stock-alerts"
                          className={isActive("/stock-alerts") ? "active" : ""}
                        >
                          Stock Alerts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/inventory/uom"
                          className={
                            isActive("/inventory/uom") ? "active" : ""
                          }
                        >
                          Unit of Measure (UOM)
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/inventory/hsn-sac"
                          className={
                            isActive("/inventory/hsn-sac") ? "active" : ""
                          }
                        >
                          HSN / SAC Codes
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/reports/stock-valuation"
                          className={
                            isActive("/reports/stock-valuation") ? "active" : ""
                          }
                        >
                          Stock Valuation
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}

                {/* MANUFACTURING */}
                {checkPermission("manufacturing", "can_read") && (
                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("manufacturing");
                      }}
                      className={openMenus["manufacturing"] ? "active subdrop" : ""}
                    >
                      <i className="isax isax-setting-2 fs-18"></i>
                      <span className="fs-14 fw-medium ms-2">Manufacturing</span>
                      <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                    </a>
                    <ul
                      style={{
                        display: openMenus["manufacturing"] ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/manufacturing/bom"
                          className={
                            isActive("/manufacturing/bom") ? "active" : ""
                          }
                        >
                          Bill of Materials (BOM)
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/manufacturing/production-orders"
                          className={
                            isActive("/manufacturing/production-orders")
                              ? "active"
                              : ""
                          }
                        >
                          Production Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/manufacturing/job-work"
                          className={
                            isActive("/manufacturing/job-work") ? "active" : ""
                          }
                        >
                          Job Work
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/manufacturing/material-movement"
                          className={
                            isActive("/manufacturing/material-movement") ? "active" : ""
                          }
                        >
                          Material Movement
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}

                {/* GST & TAXATION */}
                {(checkPermission("reports", "can_read") || checkPermission("settings", "can_read")) && (
                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("gstTaxation");
                      }}
                      className={openMenus["gstTaxation"] ? "active subdrop" : ""}
                    >
                      <i className="isax isax-receipt-text5 fs-18"></i>
                      <span className="fs-14 fw-medium ms-2">Tax & Compliances</span>
                      <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                    </a>
                    <ul
                      style={{
                        display: openMenus["gstTaxation"] ? "block" : "none",
                      }}
                    >
                      {checkPermission("reports", "can_read") && (
                        <li>
                          <Link
                            to="/reports/gst-summary"
                            className={
                              isActive("/reports/gst-summary") ? "active" : ""
                            }
                          >
                            GST Report
                          </Link>
                        </li>
                      )}
                      {checkPermission("reports", "can_read") && (
                        <li>
                          <Link
                            to="/reports/gst-by-rate"
                            className={
                              isActive("/reports/gst-by-rate") ? "active" : ""
                            }
                          >
                            GST Rate-Wise Report
                          </Link>
                        </li>
                      )}
                      {checkPermission("reports", "can_read") && (
                        <li>
                          <Link
                            to="/reports/tds-report"
                            className={
                              isActive("/reports/tds-report") ? "active" : ""
                            }
                          >
                            TDS Report
                          </Link>
                        </li>
                      )}
                      {checkPermission("reports", "can_read") && (
                        <li>
                          <Link
                            to="/reports/tcs-report"
                            className={
                              isActive("/reports/tcs-report") ? "active" : ""
                            }
                          >
                            TCS Report
                          </Link>
                        </li>
                      )}
                      {checkPermission("reports", "can_read") && (
                        <li>
                          <Link
                            to="/gst/rcm"
                            className={isActive("/gst/rcm") ? "active" : ""}
                          >
                            Reverse Charge (RCM)
                          </Link>
                        </li>
                      )}
                      {checkPermission("settings", "can_read") && (
                        <li>
                          <Link
                            to="/settings/tds-master"
                            className={
                              isActive("/settings/tds-master") ? "active" : ""
                            }
                          >
                            TDS Master
                          </Link>
                        </li>
                      )}
                      {checkPermission("settings", "can_read") && (
                        <li>
                          <Link
                            to="/settings/tcs-master"
                            className={
                              isActive("/settings/tcs-master") ? "active" : ""
                            }
                          >
                            TCS Master
                          </Link>
                        </li>
                      )}
                    </ul>
                  </li>
                )}

                {/* PAYROLL & HR */}
                {(checkPermission("hr", "can_read") || checkPermission("payroll", "can_read")) && (
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
                        display: openMenus["payrollHr"] ? "block" : "none",
                      }}
                    >
                      {checkPermission("hr", "can_read") && (
                        <li>
                          <Link
                            to="/payroll/employees"
                            className={
                              isActive("/payroll/employees") ? "active" : ""
                            }
                          >
                            Employees
                          </Link>
                        </li>
                      )}
                      {checkPermission("hr", "can_read") && (
                        <li
                          className={
                            isActive("/payroll/attendance") ? "active" : ""
                          }
                        >
                          <Link
                            to="/payroll/attendance"
                            className={
                              isActive("/payroll/attendance") ? "active" : ""
                            }
                          >
                            Attendance
                          </Link>
                        </li>
                      )}
                      {checkPermission("payroll", "can_read") && (
                        <li
                          className={
                            isActive("/payroll/salary-structure") ? "active" : ""
                          }
                        >
                          <Link
                            to="/payroll/salary-structure"
                            className={
                              isActive("/payroll/salary-structure") ? "active" : ""
                            }
                          >
                            Salary Structure
                          </Link>
                        </li>
                      )}
                      {checkPermission("payroll", "can_read") && (
                        <li
                          className={isActive("/payroll/payslips") ? "active" : ""}
                        >
                          <Link
                            to="/payroll/payslips"
                            className={
                              isActive("/payroll/payslips") ? "active" : ""
                            }
                          >
                            Payslips
                          </Link>
                        </li>
                      )}
                      {checkPermission("payroll", "can_read") && (
                        <li>
                          <Link
                            to="/payroll/bonuses"
                            className={
                              isMenuActive(["/payroll/bonuses"]) ? "active" : ""
                            }
                          >
                            Bonus & Incentives
                          </Link>
                        </li>
                      )}
                    </ul>
                  </li>
                )}

                {/* Banking & Payments */}
                {checkPermission("banking", "can_read") && (
                  <li className="submenu">
                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("banking");
                      }}
                      className={openMenus["banking"] ? "active subdrop" : ""}
                    >
                      <i className="isax isax-bank fs-18"></i>
                      <span className="fs-14 fw-medium ms-2">
                        Banking & Payments
                      </span>
                      <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                    </Link>
                    <ul
                      style={{
                        display: openMenus["banking"] ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/banking/cheques"
                          className={isActive("/banking/cheques") ? "active" : ""}
                        >
                          Post-Dated Cheques
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
                          to="/bank-accounts"
                          className={isActive("/bank-accounts") ? "active" : ""}
                        >
                          Bank Accounts
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}

                {/* REPORTS & MIS */}
                {checkPermission("reports", "can_read") && (
                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("reportsMis");
                      }}
                      className={openMenus["reportsMis"] ? "active subdrop" : ""}
                    >
                      <i className="isax isax-chart-215 fs-18"></i>
                      <span className="fs-14 fw-medium ms-2">Reports & MIS</span>
                      <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                    </a>
                    <ul
                      style={{
                        display: openMenus["reportsMis"] ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/mis-dashboard"
                          className={isActive("/mis-dashboard") ? "active" : ""}
                        >
                          MIS Dashboard
                        </Link>
                      </li>
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
                          to="/payroll/reports/payroll-summary"
                          className={
                            isActive("/payroll/reports/payroll-summary") ? "active" : ""
                          }
                        >
                          Payroll Summary
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
                          Outstanding Reports
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/reports/sales-analysis"
                          className={
                            isActive("/reports/sales-analysis") ? "active" : ""
                          }
                        >
                          Sales Analysis
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/reports/purchase-analysis"
                          className={
                            isActive("/reports/purchase-analysis") ? "active" : ""
                          }
                        >
                          Purchase Analysis
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/reports/gst-summary"
                          className={
                            isActive("/reports/gst-summary") ? "active" : ""
                          }
                        >
                          GST Summary
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/reports/cash-flow"
                          className={
                            isActive("/reports/cash-flow") ? "active" : ""
                          }
                        >
                          Cash Flow
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/reports/fund-flow"
                          className={
                            isActive("/reports/fund-flow") ? "active" : ""
                          }
                        >
                          Fund Flow
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/reports/cash-bank-book"
                          className={
                            isActive("/reports/cash-bank-book") ? "active" : ""
                          }
                        >
                          Cash/Bank Book
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/reports/day-book"
                          className={
                            isActive("/reports/day-book") ? "active" : ""
                          }
                        >
                          Day Book
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/reports/stock-valuation"
                          className={
                            isActive("/reports/stock-valuation") ? "active" : ""
                          }
                        >
                          Stock Valuation
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}

                {/* MULTI-CURRENCY */}
                {checkPermission("settings", "can_read") && (
                  <li>
                    <Link
                      to="/currencies"
                      className={isActive("/currencies") ? "active" : ""}
                    >
                      <i className="isax isax-money-send fs-18"></i>
                      <span className="fs-14 fw-medium ms-2">Multi-Currency</span>
                    </Link>
                  </li>
                )}
                {/* APPROVAL WORKFLOW */}
                {checkPermission("approvals", "can_read") && (
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
                )}

                {/* MASTER DATA */}
                {(checkPermission("customers", "can_read") || checkPermission("vendors", "can_read") || checkPermission("settings", "can_read")) && (
                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("masterData");
                      }}
                      className={openMenus["masterData"] ? "active subdrop" : ""}
                    >
                      <i className="isax isax-folder-2 fs-18"></i>
                      <span className="fs-14 fw-medium ms-2">Master Data</span>
                      <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                    </a>
                    <ul
                      style={{
                        display: openMenus["masterData"] ? "block" : "none",
                      }}
                    >
                      {checkPermission("customers", "can_read") && (
                        <li>
                          <Link
                            to="/master/customers"
                            className={
                              isActive("/master/customers") ? "active" : ""
                            }
                          >
                            Customers
                          </Link>
                        </li>
                      )}
                      {checkPermission("vendors", "can_read") && (
                        <li>
                          <Link
                            to="/master/vendors"
                            className={isActive("/master/vendors") ? "active" : ""}
                          >
                            Vendors
                          </Link>
                        </li>
                      )}
                      {checkPermission("vendors", "can_read") && (
                        <li>
                          <Link
                            to="/master/ecommerce-operators"
                            className={isActive("/master/ecommerce-operators") ? "active" : ""}
                          >
                            E-Commerce Operators
                          </Link>
                        </li>
                      )}
                      {checkPermission("settings", "can_read") && (
                        <li>
                          <Link
                            to="/master/branches"
                            className={isActive("/master/branches") ? "active" : ""}
                          >
                            Branches / Units
                          </Link>
                        </li>
                      )}
                    </ul>
                  </li>
                )}

                {/* SETTINGS */}
                {checkPermission("settings", "can_read") && (
                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("settingsNew");
                      }}
                      className={openMenus["settingsNew"] ? "active subdrop" : ""}
                    >
                      <i className="isax isax-setting-25 fs-18"></i>
                      <span className="fs-14 fw-medium ms-2">Settings</span>
                      <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                    </a>
                    <ul
                      style={{
                        display: openMenus["settingsNew"] ? "block" : "none",
                      }}
                    >
                      {/* <li>
                        <Link
                          to="/settings/company"
                          className={
                            isActive("/settings/company") ||
                              isActive("/company-settings")
                              ? "active"
                              : ""
                          }
                        >
                          Company Settings
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          to="/financial-year"
                          className={isActive("/financial-year") ? "active" : ""}
                        >
                          Financial Years
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          to="/settings/voucher-types"
                          className={
                            isActive("/settings/voucher-types") ? "active" : ""
                          }
                        >
                          Voucher Types
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/settings/voucher-series"
                          className={
                            isActive("/settings/voucher-series") ? "active" : ""
                          }
                        >
                          Voucher Series
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
                      <li>
                        <Link
                          to="/settings/payroll"
                          className={
                            isActive("/settings/payroll") ? "active" : ""
                          }
                        >
                          Payroll Settings
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
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

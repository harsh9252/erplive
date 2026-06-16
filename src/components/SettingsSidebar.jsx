import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SettingsSidebar = ({ activeItem }) => {
  const location = useLocation();
  
  const [openMenus, setOpenMenus] = useState({
    general: true,
    website: false,
    app: false,
    finance: false,
    system: false,
    other: false
  });

  // Update open menus when location changes
  useEffect(() => {
    const path = location.pathname;
    const newOpenMenus = {
      general: ['/account-settings', '/security-settings', '/plans-billings', '/notifications-settings', '/integrations-settings'].includes(path),
      website: ['/settings/company', '/company-settings', '/localization-settings', '/prefixes-settings', '/preference-settings', '/seo-setup', '/language-settings', '/maintenance-mode', '/authentication-settings', '/ai-configuration', '/appearance-settings', '/plugin-manager'].includes(path),
      app: ['/invoice-settings', '/invoice-templates-settings', '/esignatures', '/barcode-settings', '/thermal-printer', '/custom-fields', '/sass-settings'].includes(path),
      finance: ['/settings/voucher-types', '/financial-year-settings', '/payment-methods', '/bank-accounts-settings', '/tax-master', '/currencies'].includes(path),
      system: ['/email-settings', '/email-templates', '/sms-gateways', '/gdpr-cookies'].includes(path),
      other: ['/custom-css', '/custom-js', '/sitemap', '/clear-cache', '/storage', '/cronjob', '/system-backup', '/database-backup', '/system-update', '/version-control'].includes(path)
    };
    setOpenMenus(newOpenMenus);
  }, [location.pathname]);

  const toggleMenu = (menuName) => {
    console.log('=== TOGGLE MENU DEBUG ===');
    console.log('Menu Name:', menuName);
    console.log('Current State:', openMenus[menuName]);
    console.log('All Open Menus:', openMenus);
    console.log('Body Classes:', document.body.className);
    console.log('========================');
    
    setOpenMenus(prev => {
      const newState = {
        ...prev,
        [menuName]: !prev[menuName]
      };
      console.log('New State:', newState);
      return newState;
    });
  };

  const isActive = (path) => {
    return location.pathname === path || activeItem === path;
  };

  return (
    <div className="card settings-card" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
      <div className="card-header">
        <h6 className="mb-0">Settings</h6>
      </div>
      <div className="card-body">
        <div className="sidebars settings-sidebar" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
          <div className="sidebar-inner">
            <div className="sidebar-menu p-0">
              <ul>
                    {/* General Settings */}
                    <li className="submenu">
                      <a 
                        href="#" 
                        onClick={(e) => { 
                          console.log('CLICK EVENT FIRED - General Settings');
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          toggleMenu('general'); 
                        }}
                        className={openMenus.general ? 'active subdrop' : ''}
                        style={{ 
                          cursor: 'pointer', 
                          pointerEvents: 'auto', 
                          position: 'relative', 
                          zIndex: 2,
                          display: 'flex',
                          alignItems: 'center',
                          userSelect: 'none'
                        }}
                      >
                        <i className="isax isax-setting-2 fs-18"></i>
                        <span className="fs-14 fw-medium ms-2">General Settings</span>
                        <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                      </a>
                      <ul style={{ display: openMenus.general ? 'block' : 'none', overflow: 'visible', maxHeight: 'none' }}>
                        <li><Link to="/account-settings" className={isActive('/account-settings') ? 'active' : ''}>Account Settings</Link></li>
                        <li><Link to="/security-settings" className={isActive('/security-settings') ? 'active' : ''}>Security</Link></li>
                        <li><Link to="/plans-billings" className={isActive('/plans-billings') ? 'active' : ''}>Plans & Billing</Link></li>
                        <li><Link to="/notifications-settings" className={isActive('/notifications-settings') ? 'active' : ''}>Notifications</Link></li>
                        <li><Link to="/integrations-settings" className={isActive('/integrations-settings') ? 'active' : ''}>Integrations</Link></li>
                      </ul>
                    </li>

                    {/* Website Settings */}
                    <li className="submenu">
                      <a href="#" 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleMenu('website'); }}
                        className={openMenus.website ? 'active subdrop' : ''}
                        style={{ cursor: 'pointer', pointerEvents: 'auto', position: 'relative', zIndex: 2 }}
                      >
                        <i className="isax isax-global fs-18"></i>
                        <span className="fs-14 fw-medium ms-2">Website Settings</span>
                        <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                      </a>
                      <ul style={{ display: openMenus.website ? 'block' : 'none', overflow: 'visible', maxHeight: 'none' }}>
                        {/* <li><Link to="/settings/company" className={isActive('/settings/company') || isActive('/company-settings') ? 'active' : ''}>Company Settings</Link></li> */}
                        <li><Link to="/business-nature" className={isActive('/business-nature') ? 'active' : ''}>Business Nature</Link></li>
                        <li><Link to="/localization-settings" className={isActive('/localization-settings') ? 'active' : ''}>Localization</Link></li>
                        <li><Link to="/prefixes-settings" className={isActive('/prefixes-settings') ? 'active' : ''}>Prefixes</Link></li>
                        <li><Link to="/preference-settings" className={isActive('/preference-settings') ? 'active' : ''}>Preference</Link></li>
                        <li><Link to="/seo-setup" className={isActive('/seo-setup') ? 'active' : ''}>SEO Setup</Link></li>
                        <li><Link to="/language-settings" className={isActive('/language-settings') ? 'active' : ''}>Language</Link></li>
                        <li><Link to="/maintenance-mode" className={isActive('/maintenance-mode') ? 'active' : ''}>Maintenance Mode</Link></li>
                        <li><Link to="/authentication-settings" className={isActive('/authentication-settings') ? 'active' : ''}>Authentication</Link></li>
                        <li><Link to="/ai-configuration" className={isActive('/ai-configuration') || isActive('ai-configuration') ? 'active' : ''}>AI Configuration</Link></li>
                        <li><Link to="/appearance-settings" className={isActive('/appearance-settings') ? 'active' : ''}>Appearance</Link></li>
                        <li><Link to="/plugin-manager" className={isActive('/plugin-manager') ? 'active' : ''}>Plugin Manager</Link></li>
                      </ul>
                    </li>

                    {/* App Settings */}
                    <li className="submenu">
                      <a href="#" 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleMenu('app'); }}
                        className={openMenus.app ? 'active subdrop' : ''}
                        style={{ cursor: 'pointer', pointerEvents: 'auto', position: 'relative', zIndex: 2 }}
                      >
                        <i className="isax isax-shapes fs-18"></i>
                        <span className="fs-14 fw-medium ms-2">App Settings</span>
                        <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                      </a>
                      <ul style={{ display: openMenus.app ? 'block' : 'none', overflow: 'visible', maxHeight: 'none' }}>
                        <li><Link to="/invoice-settings" className={isActive('/invoice-settings') ? 'active' : ''}>Invoice Settings</Link></li>
                        <li><Link to="/invoice-templates-settings" className={isActive('/invoice-templates-settings') ? 'active' : ''}>Invoice Templates</Link></li>
                        <li><Link to="/esignatures" className={isActive('/esignatures') ? 'active' : ''}>eSignatures</Link></li>
                        <li><Link to="/barcode-settings" className={isActive('/barcode-settings') ? 'active' : ''}>Barcode</Link></li>
                        <li><Link to="/thermal-printer" className={isActive('/thermal-printer') ? 'active' : ''}>Thermal Printer</Link></li>
                        <li><Link to="/custom-fields" className={isActive('/custom-fields') ? 'active' : ''}>Custom Fields</Link></li>
                        <li><Link to="/sass-settings" className={isActive('/sass-settings') ? 'active' : ''}>SaaS Settings</Link></li>
                      </ul>
                    </li>

                    {/* Finance Settings */}
                    <li className="submenu">
                      <a href="#" 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleMenu('finance'); }}
                        className={openMenus.finance ? 'active subdrop' : ''}
                        style={{ cursor: 'pointer', pointerEvents: 'auto', position: 'relative', zIndex: 2 }}
                      >
                        <i className="isax isax-money-3 fs-18"></i>
                        <span className="fs-14 fw-medium ms-2">Finance Settings</span>
                        <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                      </a>
                      <ul style={{ display: openMenus.finance ? 'block' : 'none', overflow: 'visible', maxHeight: 'none' }}>
                        <li><Link to="/financial-year-settings" className={isActive('/financial-year-settings') ? 'active' : ''}>Financial Year</Link></li>
                         <li><Link to="/settings/payroll" className={isActive('/settings/payroll') ? 'active' : ''}>Payroll Settings</Link></li>
                        <li><Link to="/settings/voucher-types" className={isActive('/settings/voucher-types') ? 'active' : ''}>Voucher Types</Link></li>
                        <li><Link to="/payment-methods" className={isActive('/payment-methods') ? 'active' : ''}>Payment Methods</Link></li>
                        <li><Link to="/bank-accounts-settings" className={isActive('/bank-accounts-settings') ? 'active' : ''}>Bank Accounts</Link></li>
                        <li><Link to="/tax-master" className={isActive('/tax-master') ? 'active' : ''}>Tax Rates</Link></li>
                        <li><Link to="/settings/tds-master" className={isActive('/settings/tds-master') ? 'active' : ''}>TDS Master</Link></li>
                        <li><Link to="/settings/tcs-master" className={isActive('/settings/tcs-master') ? 'active' : ''}>TCS Master</Link></li>
                        <li><Link to="/settings/currencies" className={isActive('/settings/currencies') ? 'active' : ''}>Currencies</Link></li>
                      </ul>
                    </li>

                    {/* System Settings */}
                    <li className="submenu">
                      <a href="#" 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleMenu('system'); }}
                        className={openMenus.system ? 'active subdrop' : ''}
                        style={{ cursor: 'pointer', pointerEvents: 'auto', position: 'relative', zIndex: 2 }}
                      >
                        <i className="isax isax-more-2 fs-18"></i>
                        <span className="fs-14 fw-medium ms-2">System Settings</span>
                        <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                      </a>
                      <ul style={{ display: openMenus.system ? 'block' : 'none', overflow: 'visible', maxHeight: 'none' }}>
                        <li><Link to="/email-settings" className={isActive('/email-settings') ? 'active' : ''}>Email Settings</Link></li>
                        <li><Link to="/email-templates" className={isActive('/email-templates') ? 'active' : ''}>Email Templates</Link></li>
                        <li><Link to="/sms-gateways" className={isActive('/sms-gateways') ? 'active' : ''}>SMS Gateways</Link></li>
                        <li><Link to="/gdpr-cookies" className={isActive('/gdpr-cookies') ? 'active' : ''}>GDPR Cookies</Link></li>
                      </ul>
                    </li>

                    {/* Other Settings */}
                    <li className="submenu">
                      <a href="#" 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleMenu('other'); }}
                        className={openMenus.other ? 'active subdrop' : ''}
                        style={{ cursor: 'pointer', pointerEvents: 'auto', position: 'relative', zIndex: 2 }}
                      >
                        <i className="isax isax-document fs-18"></i>
                        <span className="fs-14 fw-medium ms-2">Other Settings</span>
                        <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                      </a>
                      <ul style={{ display: openMenus.other ? 'block' : 'none', overflow: 'visible', maxHeight: 'none' }}>
                        <li><Link to="/custom-css" className={isActive('/custom-css') ? 'active' : ''}>Custom CSS</Link></li>
                        <li><Link to="/custom-js" className={isActive('/custom-js') ? 'active' : ''}>Custom JS</Link></li>
                        <li><Link to="/sitemap" className={isActive('/sitemap') ? 'active' : ''}>Sitemap</Link></li>
                        <li><Link to="/clear-cache" className={isActive('/clear-cache') ? 'active' : ''}>Clear Cache</Link></li>
                        <li><Link to="/storage" className={isActive('/storage') ? 'active' : ''}>Storage</Link></li>
                        <li><Link to="/cronjob" className={isActive('/cronjob') ? 'active' : ''}>Cronjob</Link></li>
                        <li><Link to="/system-backup" className={isActive('/system-backup') ? 'active' : ''}>System Backup</Link></li>
                        <li><Link to="/database-backup" className={isActive('/database-backup') ? 'active' : ''}>Database Backup</Link></li>
                        <li><Link to="/system-update" className={isActive('/system-update') ? 'active' : ''}>System Update</Link></li>
                        <li><Link to="/version-control" className={isActive('/version-control') ? 'active' : ''}>Version Control</Link></li>
                      </ul>
                    </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;

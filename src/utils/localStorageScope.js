// Scopes specific localStorage keys to the currently selected company
const companyScopedKeys = new Set([
  'salesInvoices',
  'eWayBills',
  'companySettings',
  'units',
  'systemSettings',
  'suppliers',
  'stockTransfers',
  'inventory',
  'items',
  'invoices',
  'eInvoices',
  'costCategories',
  'businessNature',
  'attachments',
  'activeFinancialYearId',
  'selectedBranchId'
]);

// Store original localStorage methods
const originalGetItem = localStorage.getItem;
const originalSetItem = localStorage.setItem;
const originalRemoveItem = localStorage.removeItem;

const getCompanyId = () => {
  try {
    // Retrieve via original getItem to prevent recursion
    const activeCompanyStr = originalGetItem.call(localStorage, 'activeCompany');
    if (activeCompanyStr) {
      const activeCompany = JSON.parse(activeCompanyStr);
      if (activeCompany && (activeCompany.id || activeCompany.company_id)) {
        return String(activeCompany.id || activeCompany.company_id);
      }
    }
    const directCompanyId = originalGetItem.call(localStorage, 'company_id');
    if (directCompanyId) {
      return String(directCompanyId);
    }
  } catch (e) {
    // Ignore JSON parsing/access errors
  }
  return null;
};

const getScopedKey = (key) => {
  if (companyScopedKeys.has(key)) {
    const companyId = getCompanyId();
    if (companyId) {
      return `${key}_company_${companyId}`;
    }
  }
  return key;
};

// Override localStorage methods
localStorage.getItem = function(key) {
  const scopedKey = getScopedKey(key);
  return originalGetItem.call(this, scopedKey);
};

localStorage.setItem = function(key, value) {
  const scopedKey = getScopedKey(key);
  originalSetItem.call(this, scopedKey, value);
};

localStorage.removeItem = function(key) {
  const scopedKey = getScopedKey(key);
  originalRemoveItem.call(this, scopedKey);
};

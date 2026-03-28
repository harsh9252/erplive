export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  ACCOUNTANT: 'accountant',
  SALES_MANAGER: 'sales_manager',
  PURCHASE_MANAGER: 'purchase_manager',
  INVENTORY_MANAGER: 'inventory_manager',
  GST_OFFICER: 'gst_officer',
  AUDITOR: 'auditor',
  CASHIER: 'cashier',
  VIEWER: 'viewer',
};

export const ROLE_DESCRIPTIONS = {
  [ROLES.SUPER_ADMIN]: 'Full system access',
  [ROLES.ADMIN]: 'Full company access',
  [ROLES.ACCOUNTANT]: 'Accounting, vouchers, GST',
  [ROLES.SALES_MANAGER]: 'Sales, customers',
  [ROLES.PURCHASE_MANAGER]: 'Purchase, vendors',
  [ROLES.INVENTORY_MANAGER]: 'Inventory, items, stock',
  [ROLES.GST_OFFICER]: 'GST filing, e-invoice, e-way bill',
  [ROLES.AUDITOR]: 'Read-only all modules',
  [ROLES.CASHIER]: 'Voucher entry only',
  [ROLES.VIEWER]: 'Dashboard & reports read-only',
};

export const PERMISSIONS = {
  // Super Admin - Full Access
  [ROLES.SUPER_ADMIN]: [
    'view_dashboard',
    'manage_users',
    'manage_roles',
    'manage_companies',
    'manage_branches',
    'manage_invoices',
    'manage_customers',
    'manage_products',
    'manage_purchases',
    'manage_vendors',
    'manage_inventory',
    'manage_accounting',
    'manage_vouchers',
    'manage_gst',
    'manage_ewaybill',
    'manage_einvoice',
    'manage_reports',
    'manage_settings',
    'manage_api_keys',
    'manage_integrations',
  ],

  // Admin - Full Company Access
  [ROLES.ADMIN]: [
    'view_dashboard',
    'manage_users',
    'manage_invoices',
    'manage_customers',
    'manage_products',
    'manage_purchases',
    'manage_vendors',
    'manage_inventory',
    'manage_accounting',
    'manage_vouchers',
    'manage_gst',
    'manage_ewaybill',
    'manage_einvoice',
    'manage_reports',
    'manage_company_settings',
  ],

  // Accountant - Accounting, Vouchers, GST
  [ROLES.ACCOUNTANT]: [
    'view_dashboard',
    'view_invoices',
    'view_customers',
    'manage_accounting',
    'manage_vouchers',
    'manage_gst',
    'view_reports',
    'view_inventory',
  ],

  // Sales Manager - Sales, Customers
  [ROLES.SALES_MANAGER]: [
    'view_dashboard',
    'manage_invoices',
    'manage_customers',
    'view_products',
    'view_reports',
    'view_accounting',
  ],

  // Purchase Manager - Purchase, Vendors
  [ROLES.PURCHASE_MANAGER]: [
    'view_dashboard',
    'manage_purchases',
    'manage_vendors',
    'view_products',
    'view_inventory',
    'view_reports',
  ],

  // Inventory Manager - Inventory, Items, Stock
  [ROLES.INVENTORY_MANAGER]: [
    'view_dashboard',
    'manage_inventory',
    'manage_products',
    'view_purchases',
    'view_invoices',
    'view_reports',
  ],

  // GST Officer - GST Filing, E-Invoice, E-Way Bill
  [ROLES.GST_OFFICER]: [
    'view_dashboard',
    'view_invoices',
    'view_purchases',
    'manage_gst',
    'manage_einvoice',
    'manage_ewaybill',
    'view_reports',
  ],

  // Auditor - Read-only All Modules
  [ROLES.AUDITOR]: [
    'view_dashboard',
    'view_invoices',
    'view_customers',
    'view_products',
    'view_purchases',
    'view_vendors',
    'view_inventory',
    'view_accounting',
    'view_vouchers',
    'view_gst',
    'view_reports',
  ],

  // Cashier - Voucher Entry Only
  [ROLES.CASHIER]: [
    'view_dashboard',
    'manage_vouchers',
    'view_invoices',
    'view_accounting',
  ],

  // Viewer - Dashboard & Reports Read-only
  [ROLES.VIEWER]: [
    'view_dashboard',
    'view_reports',
  ],
};

export const ROLE_LIST = [
  {
    id: ROLES.SUPER_ADMIN,
    name: 'Super Admin',
    description: ROLE_DESCRIPTIONS[ROLES.SUPER_ADMIN],
    permissions: PERMISSIONS[ROLES.SUPER_ADMIN],
  },
  {
    id: ROLES.ADMIN,
    name: 'Admin',
    description: ROLE_DESCRIPTIONS[ROLES.ADMIN],
    permissions: PERMISSIONS[ROLES.ADMIN],
  },
  {
    id: ROLES.ACCOUNTANT,
    name: 'Accountant',
    description: ROLE_DESCRIPTIONS[ROLES.ACCOUNTANT],
    permissions: PERMISSIONS[ROLES.ACCOUNTANT],
  },
  {
    id: ROLES.SALES_MANAGER,
    name: 'Sales Manager',
    description: ROLE_DESCRIPTIONS[ROLES.SALES_MANAGER],
    permissions: PERMISSIONS[ROLES.SALES_MANAGER],
  },
  {
    id: ROLES.PURCHASE_MANAGER,
    name: 'Purchase Manager',
    description: ROLE_DESCRIPTIONS[ROLES.PURCHASE_MANAGER],
    permissions: PERMISSIONS[ROLES.PURCHASE_MANAGER],
  },
  {
    id: ROLES.INVENTORY_MANAGER,
    name: 'Inventory Manager',
    description: ROLE_DESCRIPTIONS[ROLES.INVENTORY_MANAGER],
    permissions: PERMISSIONS[ROLES.INVENTORY_MANAGER],
  },
  {
    id: ROLES.GST_OFFICER,
    name: 'GST Officer',
    description: ROLE_DESCRIPTIONS[ROLES.GST_OFFICER],
    permissions: PERMISSIONS[ROLES.GST_OFFICER],
  },
  {
    id: ROLES.AUDITOR,
    name: 'Auditor',
    description: ROLE_DESCRIPTIONS[ROLES.AUDITOR],
    permissions: PERMISSIONS[ROLES.AUDITOR],
  },
  {
    id: ROLES.CASHIER,
    name: 'Cashier',
    description: ROLE_DESCRIPTIONS[ROLES.CASHIER],
    permissions: PERMISSIONS[ROLES.CASHIER],
  },
  {
    id: ROLES.VIEWER,
    name: 'Viewer',
    description: ROLE_DESCRIPTIONS[ROLES.VIEWER],
    permissions: PERMISSIONS[ROLES.VIEWER],
  },
];

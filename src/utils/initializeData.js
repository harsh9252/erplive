// Initialize sample data for testing
export const initializeSampleData = () => {
  // Check if data already exists
  const existingSalesInvoices = localStorage.getItem('salesInvoices');
  const existingEWayBills = localStorage.getItem('eWayBills');

  // Initialize sample sales invoices if not exists
  if (!existingSalesInvoices) {
    const sampleInvoices = [
      {
        id: 'INV-001',
        invoiceNumber: 'INV-001',
        customer: 'Emily Clark',
        invoiceDate: '2025-02-20',
        dueDate: '2025-03-20',
        netTotal: 15000,
        status: 'Paid',
        eInvoice: null,
      },
      {
        id: 'INV-002',
        invoiceNumber: 'INV-002',
        customer: 'John Carter',
        invoiceDate: '2025-02-21',
        dueDate: '2025-03-21',
        netTotal: 25750,
        status: 'Pending',
        eInvoice: null,
      },
      {
        id: 'INV-003',
        invoiceNumber: 'INV-003',
        customer: 'Sophia White',
        invoiceDate: '2025-02-22',
        dueDate: '2025-03-22',
        netTotal: 120500,
        status: 'Overdue',
        eInvoice: null,
      },
      {
        id: 'INV-004',
        invoiceNumber: 'INV-004',
        customer: 'Michael Johnson',
        invoiceDate: '2025-02-23',
        dueDate: '2025-03-23',
        netTotal: 750300,
        status: 'Sent',
        eInvoice: null,
      },
      {
        id: 'INV-005',
        invoiceNumber: 'INV-005',
        customer: 'Daniel Martinez',
        invoiceDate: '2025-02-24',
        dueDate: '2025-03-24',
        netTotal: 999999,
        status: 'Sent',
        eInvoice: null,
      },
    ];
    localStorage.setItem('salesInvoices', JSON.stringify(sampleInvoices));
  }

  // Initialize sample e-way bills if not exists
  if (!existingEWayBills) {
    const sampleBills = [
      {
        id: 'EWB-001',
        ewb_date: '2025-02-20',
        valid_upto: '2025-02-21',
        supply_type: 'OUTWARD',
        from_gstin: '27AABCT1234H1Z0',
        from_address: '123 Business Street, Mumbai',
        from_state: 'Maharashtra',
        to_gstin: '29AABCT5678H1Z0',
        to_address: '456 Commerce Road, Delhi',
        to_state: 'Delhi',
        transport_mode: 'ROAD',
        vehicle_number: 'MH01AB1234',
        distance_km: 1400,
        status: 'DRAFT',
        created_at: new Date().toISOString(),
      },
      {
        id: 'EWB-002',
        ewb_date: '2025-02-21',
        valid_upto: '2025-02-22',
        supply_type: 'OUTWARD',
        from_gstin: '27AABCT1234H1Z0',
        from_address: '123 Business Street, Mumbai',
        from_state: 'Maharashtra',
        to_gstin: '33AABCT9012H1Z0',
        to_address: '789 Trade Center, Bangalore',
        to_state: 'Karnataka',
        transport_mode: 'ROAD',
        vehicle_number: 'MH02CD5678',
        distance_km: 1200,
        status: 'GENERATED',
        ewb_number: 'EWB123456789012',
        created_at: new Date().toISOString(),
      },
    ];
    localStorage.setItem('eWayBills', JSON.stringify(sampleBills));
  }
};

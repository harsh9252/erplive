import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import FilterControls from '../components/common/FilterControls';
import inventoryService from '../services/inventoryService';
import { toast } from 'react-toastify';

const StockHistory = () => {
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get('item_id');
  const itemName = searchParams.get('name') || 'Item';
  
  const [ledgerData, setLedgerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Latest');
  const [visibleColumns, setVisibleColumns] = useState({
    date: true,
    type: true,
    reference: true,
    warehouse: true,
    qtyIn: true,
    qtyOut: true,
    balance: true,
  });

  useEffect(() => {
    const fetchLedger = async () => {
      if (!itemId) return;
      setLoading(true);
      try {
        const response = await inventoryService.getStockLedger({ item_id: itemId });
        setLedgerData(response.data || []);
      } catch (error) {
        console.error('Error fetching stock ledger:', error);
        toast.error('Failed to load stock history');
      } finally {
        setLoading(false);
      }
    };

    fetchLedger();
  }, [itemId]);

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const filteredData = ledgerData.filter((item) =>
    (item.reference_no || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.txn_type || '').toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'Latest') return new Date(b.created_at) - new Date(a.created_at);
    return new Date(a.created_at) - new Date(b.created_at);
  });

  const columns = [
    { 
      id: 'date', 
      label: 'Date', 
      render: (_, row) => <span>{new Date(row.created_at || row.date).toLocaleDateString()}</span> 
    },
    { 
      id: 'type', 
      label: 'Type', 
      render: (val) => <span className={`badge ${val === 'IN' || val === 'Stock In' ? 'bg-light-success' : 'bg-light-danger'}`}>{val}</span>
    },
    { id: 'reference', label: 'Reference', render: (_, row) => <span>{row.reference_no || row.voucher_no || 'N/A'}</span> },
    { id: 'warehouse', label: 'Warehouse', render: (_, row) => <span>{row.warehouse?.name || row.warehouse_name || 'Main'}</span> },
    { 
      id: 'qtyIn', 
      label: 'Qty In', 
      render: (_, row) => <span className="text-success">{row.txn_type === 'IN' || row.type === 'IN' ? row.quantity || row.qty : '-'}</span> 
    },
    { 
      id: 'qtyOut', 
      label: 'Qty Out', 
      render: (_, row) => <span className="text-danger">{row.txn_type === 'OUT' || row.type === 'OUT' ? row.quantity || row.qty : '-'}</span> 
    },
    { id: 'balance', label: 'Balance', render: (val) => <span className="fw-bold">{val || '-'}</span> }
  ];

  return (
    <>
      <PageHeader 
        title={`Stock Ledger: ${itemName}`} 
        actions={[{ type: 'export' }]} 
      />

      <div className="row mb-3">
        <div className="col-xl-3 col-md-6">
          <div className="card shadow-none border mb-0">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 text-muted">Total In</p>
                  <h6 className="mb-0">{ledgerData.filter(i => i.txn_type === 'IN').reduce((acc, i) => acc + (i.quantity || 0), 0)}</h6>
                </div>
                <div className="avatar avatar-sm bg-light-success rounded">
                  <i className="isax isax-import fs-14 text-success"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card shadow-none border mb-0">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 text-muted">Total Out</p>
                  <h6 className="mb-0">{ledgerData.filter(i => i.txn_type === 'OUT').reduce((acc, i) => acc + (i.quantity || 0), 0)}</h6>
                </div>
                <div className="avatar avatar-sm bg-light-danger rounded">
                  <i className="isax isax-export fs-14 text-danger"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Search Reference..."
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOptions={['Latest', 'Oldest']}
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
        showFilter={false}
      />

      <DataTable
        columns={columns}
        data={filteredData}
        visibleColumns={visibleColumns}
        loading={loading}
        emptyMessage="No Stock Ledger entries found"
      />
    </>
  );
};

export default StockHistory;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import investmentService from '../services/investmentService';

const Investments = () => {
  // State for data
  const [holdings, setHoldings] = useState([]);
  const [masters, setMasters] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [types, setTypes] = useState([]);
  
  // Loading states
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSavingMaster, setIsSavingMaster] = useState(false);
  const [isSavingType, setIsSavingType] = useState(false);
  const [isSavingTransaction, setIsSavingTransaction] = useState(false);
  
  const [holdingsLoading, setHoldingsLoading] = useState(false);
  const [mastersLoading, setMastersLoading] = useState(false);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [typesLoading, setTypesLoading] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState('holdings');

  // Modal / Form state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [masterData, setMasterData] = useState({
    investment_type_id: '',
    name: '',
    unit: '',
    description: '',
  });

  const [typeData, setTypeData] = useState({
    name: '',
    description: '',
    is_active: true,
  });

  const [transactionData, setTransactionData] = useState({
    investment_master_id: '',
    txn_date: new Date().toISOString().split('T')[0],
    type: 'BUY',
    qty: '',
    rate: '',
    amount: '',
    narration: '',
  });

  const [confirmDialog, setConfirmDialog] = useState({ 
    isOpen: false, 
    id: null, 
    type: 'delete', // delete_master, delete_type, delete_transaction
  });

  // Stats
  const [stats, setStats] = useState({
    total_invested: 0,
    current_value: 0,
    profit_loss: 0,
    holdings_count: 0
  });

  // Fetch functions
  const fetchHoldings = async () => {
    try {
      setHoldingsLoading(true);
      const response = await investmentService.getHoldingsSummary();
      
      if (response && response.success) {
        const holdingsData = Array.isArray(response.data) ? response.data : (response.data?.holdings || []);
        setHoldings(holdingsData);
        
        // Use backend stats if available, otherwise calculate locally
        setStats({
          total_invested: response.total_invested || response.data?.total_invested || holdingsData.reduce((sum, h) => sum + (Number(h.total_cost || h.total_invested || 0)), 0),
          current_value: response.current_value || response.data?.current_value || 0, // Current value usually needs backend or market feed
          profit_loss: response.profit_loss || response.data?.profit_loss || 0,
          holdings_count: holdingsData.filter(h => Number(h.holding_qty || h.total_qty || 0) > 0).length
        });
      }
    } catch (error) {
      console.error('Error fetching holdings:', error);
      toast.error('Failed to load holdings summary');
    } finally {
      setHoldingsLoading(false);
    }
  };

  const fetchMasters = async () => {
    try {
      setMastersLoading(true);
      const response = await investmentService.getInvestmentMasters();
      setMasters(response.data || []);
    } catch (error) {
      console.error('Error fetching masters:', error);
      toast.error('Failed to load investment assets');
    } finally {
      setMastersLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      setTransactionsLoading(true);
      const response = await investmentService.getInvestmentTransactions();
      setTransactions(response.data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transaction history');
    } finally {
      setTransactionsLoading(false);
    }
  };

  const fetchTypes = async () => {
    try {
      setTypesLoading(true);
      // Fetch all categories including inactive ones
      const response = await investmentService.getInvestmentTypes({ include_inactive: true });
      setTypes(response.data || []);
    } catch (error) {
      console.error('Error fetching types:', error);
      toast.error('Failed to load investment categories');
    } finally {
      setTypesLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    const init = async () => {
      // INV-4: Run independent fetches in parallel
      await Promise.all([
        fetchTypes(),
        fetchMasters(),
        fetchHoldings(),
        fetchTransactions()
      ]);
    };
    init();
  }, []);

  // Handlers
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const resetForms = () => {
    setMasterData({ investment_type_id: '', name: '', unit: '', description: '' });
    setTypeData({ name: '', description: '', is_active: true });
    setTransactionData({
      investment_master_id: '',
      txn_date: new Date().toISOString().split('T')[0],
      type: 'BUY',
      qty: '',
      rate: '',
      amount: '',
      narration: '',
    });
    setIsEditMode(false);
    setEditingId(null);
  };

  const handleEdit = (item, type) => {
    setIsEditMode(true);
    setEditingId(item.id);
    if (type === 'master') {
      // Robustly extract type ID handling possible backend nested relations
      let typeId = item.investment_type_id || item.investmentType?.id || item.investment_type?.id;
      if (!typeId && typeof item.investmentType === 'object') typeId = item.investmentType?.id;
      if (!typeId && typeof item.investment_type === 'object') typeId = item.investment_type?.id;
      if (!typeId) typeId = item.category_id; // Fallback
      
      setMasterData({
        investment_type_id: typeId || '',
        name: item.name,
        unit: item.unit,
        description: item.description || '',
      });
    } else if (type === 'type') {
      setTypeData({
        name: item.name,
        description: item.description || '',
        // Backend returns is_active as boolean false/true
        is_active: item.is_active === true || item.is_active === 1 || item.is_active === '1',
      });
    } else if (type === 'transaction') {
      // Robustly extract master ID handling possible backend nested relations
      let masterId = item.investment_master_id || item.investmentMaster?.id || item.investment_master?.id;
      if (!masterId && typeof item.investmentMaster === 'object') masterId = item.investmentMaster?.id;
      if (!masterId && typeof item.investment_master === 'object') masterId = item.investment_master?.id;
      if (!masterId) masterId = item.asset_id; // Fallback

      setTransactionData({
        investment_master_id: masterId || '',
        txn_date: item.txn_date ? String(item.txn_date).split('T')[0] : new Date().toISOString().split('T')[0],
        type: item.type,
        qty: item.qty,
        rate: item.rate,
        amount: item.amount,
        narration: item.narration || '',
      });
    }
  };

  const handleDelete = (id, type) => {
    setConfirmDialog({ isOpen: true, id, type: `delete_${type}` });
  };

  const confirmAction = async () => {
    const { id, type } = confirmDialog;
    try {
      setIsDeleting(true);
      if (type === 'delete_master') {
        await investmentService.deleteInvestmentMaster(id);
        toast.success('Investment asset deleted');
        await new Promise(r => setTimeout(r, 200));
        await Promise.all([fetchMasters(), fetchHoldings(), fetchTransactions()]);
      } else if (type === 'delete_type') {
        await investmentService.deleteInvestmentType(id);
        toast.success('Category deleted');
        await new Promise(r => setTimeout(r, 200));
        await Promise.all([fetchTypes(), fetchMasters(), fetchHoldings()]);
      } else if (type === 'delete_transaction') {
        await investmentService.deleteTransaction(id);
        toast.success('Transaction record deleted');
        await new Promise(r => setTimeout(r, 200));
        await Promise.all([fetchTransactions(), fetchHoldings()]);
      }
    } catch (error) {
      let errMsg = error.message || 'Operation failed';
      if (errMsg.includes('Investment type has investments')) {
        errMsg = 'Investment category has investments. Cannot delete.';
      }
      toast.error(errMsg);
    } finally {
      setIsDeleting(false);
      setConfirmDialog({ isOpen: false, id: null, type: 'delete' });
    }
  };

  const handleSubmitMaster = async (e) => {
    e.preventDefault();
    try {
      setIsSavingMaster(true);
      if (isEditMode) {
        await investmentService.updateInvestmentMaster(editingId, masterData);
        toast.success('Asset updated');
      } else {
        await investmentService.createInvestmentMaster(masterData);
        toast.success('Asset created');
      }
      await new Promise(r => setTimeout(r, 200));
      await Promise.all([fetchMasters(), fetchHoldings(), fetchTransactions()]);
      resetForms();
      // INV-1: Safe dismiss
      const modalEl = document.getElementById('masterModal');
      if (modalEl) window.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    } catch (error) {
      toast.error('Failed to save asset');
    } finally {
      setIsSavingMaster(false);
    }
  };

  const handleSubmitType = async (e) => {
    e.preventDefault();
    try {
      setIsSavingType(true);
      if (isEditMode) {
        await investmentService.updateInvestmentType(editingId, typeData);
        toast.success('Category updated');
      } else {
        await investmentService.createInvestmentType(typeData);
        toast.success('Category created');
      }
      await new Promise(r => setTimeout(r, 200));
      await Promise.all([fetchTypes(), fetchMasters(), fetchHoldings()]);
      resetForms();
      const modalEl = document.getElementById('typeModal');
      if (modalEl) window.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    } catch (error) {
      toast.error('Failed to save category');
    } finally {
      setIsSavingType(false);
    }
  };

  const handleSubmitTransaction = async (e) => {
    e.preventDefault();
    
    // INV-5: Ensure amount is calculated before submit
    const qty = parseFloat(transactionData.qty) || 0;
    const rate = parseFloat(transactionData.rate) || 0;
    const finalTransactionData = {
        ...transactionData,
        amount: (qty * rate).toFixed(2)
    };

    // INV-10: Validation on SELL quantity
    if (finalTransactionData.type === 'SELL' && !isEditMode) {
      const holding = holdings.find(h => String(h.investment_master_id) === String(finalTransactionData.investment_master_id) || String(h.id) === String(finalTransactionData.investment_master_id));
      const currentQty = holding ? (Number(holding.holding_qty || holding.total_qty || 0)) : 0;
      if (qty > currentQty) {
          toast.error(`Cannot sell ${qty} units. You only hold ${currentQty} units.`);
          return;
      }
    }

    try {
      setIsSavingTransaction(true);
      if (isEditMode) {
        await investmentService.updateTransaction(editingId, finalTransactionData);
        toast.success('Transaction updated');
      } else {
        await investmentService.recordTransaction(finalTransactionData);
        toast.success('Transaction recorded');
      }
      await new Promise(r => setTimeout(r, 200));
      await Promise.all([fetchTransactions(), fetchHoldings()]);
      resetForms();
      const modalEl = document.getElementById('transactionModal');
      if (modalEl) window.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    } catch (error) {
      toast.error('Failed to record transaction');
    } finally {
      setIsSavingTransaction(false);
    }
  };

  const calculateAmount = () => {
    const qty = parseFloat(transactionData.qty) || 0;
    const rate = parseFloat(transactionData.rate) || 0;
    setTransactionData(prev => ({ ...prev, amount: (qty * rate).toFixed(2) }));
  };

  return (
    <div className="container-fluid p-0">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null, type: 'delete' })}
        onConfirm={confirmAction}
        title="Confirm Action"
        message="Are you sure you want to perform this action? This cannot be undone."
      />

      {/* Header section with Breadcrumbs */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">Investments & Portfolio</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-muted"><i className="isax isax-home-2 me-1"></i>Home</Link>
              </li>
              <li className="breadcrumb-item active text-primary">Portfolio Management</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary d-flex align-items-center shadow-sm px-4 rounded-pill transition-all"
            data-bs-toggle="modal"
            data-bs-target="#transactionModal"
            onClick={() => { resetForms(); setShowModal('transaction'); }}
          >
            <i className="isax isax-add-circle me-2 fs-18"></i>Record Transaction
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="row g-3 mb-4">
        <div className="col-xl-6 col-md-6">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <span className="avatar avatar-md bg-soft-info text-info rounded-circle">
                    <i className="isax isax-wallet-money fs-20"></i>
                  </span>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-muted mb-1 fs-12">Total Invested</p>
                  <h5 className="mb-0 fw-bold">₹{Number(stats.total_invested || 0).toLocaleString()}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-6 col-md-6">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <span className="avatar avatar-md bg-soft-warning text-warning rounded-circle">
                    <i className="isax isax-wallet-check fs-20"></i>
                  </span>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-muted mb-1 fs-12">Active Holdings</p>
                  <h5 className="mb-0 fw-bold">{stats.holdings_count} Assets</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white p-0 border-bottom">
          <ul className="nav nav-tabs nav-tabs-solid border-0 px-3 pt-3">
            <li className="nav-item">
              <button 
                className={`nav-link rounded-top-3 border-0 py-2 px-4 transition-all ${activeTab === 'holdings' ? 'active bg-soft-primary text-primary fw-bold' : 'text-muted'}`}
                onClick={() => handleTabChange('holdings')}
              >
                Holdings Summary
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link rounded-top-3 border-0 py-2 px-4 transition-all ${activeTab === 'masters' ? 'active bg-soft-primary text-primary fw-bold' : 'text-muted'}`}
                onClick={() => handleTabChange('masters')}
              >
                Investment Assets
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link rounded-top-3 border-0 py-2 px-4 transition-all ${activeTab === 'transactions' ? 'active bg-soft-primary text-primary fw-bold' : 'text-muted'}`}
                onClick={() => handleTabChange('transactions')}
              >
                Transactions
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link rounded-top-3 border-0 py-2 px-4 transition-all ${activeTab === 'types' ? 'active bg-soft-primary text-primary fw-bold' : 'text-muted'}`}
                onClick={() => handleTabChange('types')}
              >
                Categories
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body p-0">
          {/* TAB 1: HOLDINGS */}
          {activeTab === 'holdings' && (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light text-muted fs-11 text-uppercase tracking-wider">
                  <tr>
                    <th className="ps-4">Asset Name</th>
                    <th>Category</th>
                    <th className="text-end">Avg. Rate</th>
                    <th className="text-end">Cur. Quantity</th>
                    <th className="text-end pe-4">Invested</th>
                  </tr>
                </thead>
                <tbody>
                  {holdingsLoading ? (
                    <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary"></div></td></tr>
                  ) : masters.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-5 text-muted">Create investment categories and assets first to record holdings.</td></tr>
                  ) : holdings.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-5 text-muted">No active holdings found.</td></tr>
                  ) : holdings.map((item, idx) => (
                    <tr key={item.id || item.investment_master_id || idx}>
                      <td className="ps-4 fw-medium text-wrap text-break" style={{ maxWidth: '250px' }}>{item.name || item.investment_master?.name || item.investmentMaster?.name || 'N/A'}</td>
                      <td><span className="badge bg-soft-info text-info text-wrap text-break" style={{ maxWidth: '150px' }}>{item.investment_type?.name || item.investmentType?.name || item.investmentMaster?.investmentType?.name || item.investment_master?.investment_type?.name || item.type?.name || 'N/A'}</span></td>
                      <td className="text-end">₹{Number(item.avg_rate || 0).toLocaleString()}</td>
                      <td className="text-end text-primary fw-bold">{item.holding_qty || item.total_qty || 0} {item.unit || item.investment_master?.unit}</td>
                      <td className="text-end pe-4">₹{Number(item.total_cost || item.total_invested || 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: MASTERS */}
          {activeTab === 'masters' && (
            <div>
              <div className="p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
                <h6 className="mb-0 fw-bold small text-uppercase text-muted">Manage Investment Assets</h6>
                <button 
                  className="btn btn-sm btn-primary rounded-pill px-3"
                  data-bs-toggle="modal"
                  data-bs-target="#masterModal"
                  onClick={() => { resetForms(); setShowModal('master'); }}
                >
                  Add Asset
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-white text-muted fs-11 text-uppercase tracking-wider">
                    <tr>
                      <th className="ps-4">Asset Name</th>
                      <th>Category</th>
                      <th>Unit</th>
                      <th>Description</th>
                      <th className="text-end pe-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mastersLoading ? (
                      <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary"></div></td></tr>
                    ) : masters.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-5 text-muted">No assets defined.</td></tr>
                    ) : masters.map((item) => (
                      <tr key={item.id}>
                        <td className="ps-4 fw-medium text-wrap text-break" style={{ maxWidth: '250px' }}>{item.name}</td>
                        <td className="text-wrap text-break" style={{ maxWidth: '150px' }}>{item.investment_type?.name || item.investmentType?.name || item.type?.name || 'N/A'}</td>
                        <td>{item.unit}</td>
                        <td className="text-muted small text-wrap text-break" style={{ maxWidth: '250px' }}>{item.description}</td>
                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end align-items-center gap-2 text-nowrap">
                            <button 
                              className="btn btn-sm btn-icon btn-soft-warning" 
                              data-bs-toggle="modal"
                              data-bs-target="#masterModal"
                              onClick={() => handleEdit(item, 'master')}
                            >
                              <i className="isax isax-edit-2"></i>
                            </button>
                            <button className="btn btn-sm btn-icon btn-soft-danger" onClick={() => handleDelete(item.id, 'master')}><i className="isax isax-trash"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: TRANSACTIONS */}
          {activeTab === 'transactions' && (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light text-muted fs-11 text-uppercase tracking-wider">
                  <tr>
                    <th className="ps-4">Date</th>
                    <th>Asset</th>
                    <th>Type</th>
                    <th className="text-end">Qty</th>
                    <th className="text-end">Rate</th>
                    <th className="text-end">Total Amount</th>
                    <th className="text-end pe-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsLoading ? (
                    <tr><td colSpan="7" className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary"></div></td></tr>
                  ) : transactions.length === 0 ? (
                    <tr><td colSpan="7" className="text-center py-5 text-muted">No transaction history.</td></tr>
                  ) : transactions.map((item) => (
                    <tr key={item.id}>
                      <td className="ps-4 text-muted fs-12">{item.txn_date ? new Date(item.txn_date).toLocaleDateString('en-IN') : '-'}</td>
                      <td className="fw-medium text-wrap text-break" style={{ maxWidth: '250px' }}>{item.investment_master?.name || item.investmentMaster?.name || item.master?.name || 'N/A'}</td>
                      <td>
                        <span className={`badge rounded-pill bg-soft-${item.type === 'BUY' ? 'success' : 'danger'} text-${item.type === 'BUY' ? 'success' : 'danger'}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="text-end fw-bold">{item.qty || 0}</td>
                      <td className="text-end">₹{item.rate?.toLocaleString()}</td>
                      <td className="text-end fw-bold">₹{item.amount?.toLocaleString()}</td>
                      <td className="text-end pe-4">
                        <div className="d-flex justify-content-end align-items-center gap-2 text-nowrap">
                          <button 
                            className="btn btn-sm btn-icon btn-soft-warning" 
                            data-bs-toggle="modal"
                            data-bs-target="#transactionModal"
                            onClick={() => handleEdit(item, 'transaction')}
                          >
                            <i className="isax isax-edit-2"></i>
                          </button>
                          <button className="btn btn-sm btn-icon btn-soft-danger" onClick={() => handleDelete(item.id, 'transaction')}><i className="isax isax-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: TYPES */}
          {activeTab === 'types' && (
            <div>
              <div className="p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
                <h6 className="mb-0 fw-bold small text-uppercase text-muted">Investment Categories</h6>
                <button 
                  className="btn btn-sm btn-primary rounded-pill px-3"
                  data-bs-toggle="modal"
                  data-bs-target="#typeModal"
                  onClick={() => { resetForms(); setShowModal('type'); }}
                >
                  Add Category
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-white text-muted fs-11 text-uppercase tracking-wider">
                    <tr>
                      <th className="ps-4">Category Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th className="text-end pe-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {typesLoading ? (
                      <tr><td colSpan="4" className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary"></div></td></tr>
                    ) : types.length === 0 ? (
                      <tr><td colSpan="4" className="text-center py-5 text-muted">No categories defined.</td></tr>
                    ) : types.map((item) => (
                      <tr key={item.id}>
                        <td className="ps-4 fw-medium text-wrap text-break" style={{ maxWidth: '250px' }}>{item.name}</td>
                        <td className="text-muted small text-wrap text-break" style={{ maxWidth: '350px' }}>{item.description}</td>
                        <td>
                          <span className={`badge bg-soft-${item.is_active ? 'success' : 'secondary'} text-${item.is_active ? 'success' : 'secondary'}`}>
                            {item.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end align-items-center gap-2 text-nowrap">
                            <button 
                              className="btn btn-sm btn-icon btn-soft-warning" 
                              data-bs-toggle="modal"
                              data-bs-target="#typeModal"
                              onClick={() => handleEdit(item, 'type')}
                            >
                              <i className="isax isax-edit-2"></i>
                            </button>
                            <button className="btn btn-sm btn-icon btn-soft-danger" onClick={() => handleDelete(item.id, 'type')}><i className="isax isax-trash"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      
      {/* 1. Master Modal */}
      <div className="modal fade" id="masterModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-bottom-0 pt-4 px-4">
              <h5 className="modal-title fw-bold">{isEditMode ? 'Edit Investment Asset' : 'Add New Investment Asset'}</h5>
              <button type="button" id="masterModalClose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmitMaster}>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label fs-13 text-muted">Asset Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control rounded-3" value={masterData.name} onChange={(e) => setMasterData({...masterData, name: e.target.value})} placeholder="e.g. Reliance Industries" required />
                </div>
                <div className="mb-3">
                  <label className="form-label fs-13 text-muted">Investment Category <span className="text-danger">*</span></label>
                  <select className="form-select rounded-3 text-truncate" value={String(masterData.investment_type_id || '')} onChange={(e) => setMasterData({...masterData, investment_type_id: e.target.value})} required>
                    <option value="">Select Category</option>
                    {types.map(t => <option key={t.id} value={String(t.id)} title={t.name}>{t.name?.length > 30 ? t.name.substring(0, 30) + '...' : t.name}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fs-13 text-muted">Unit of Measure <span className="text-danger">*</span></label>
                  <select 
                    className="form-select rounded-3" 
                    value={masterData.unit} 
                    onChange={(e) => setMasterData({...masterData, unit: e.target.value})}
                    required
                  >
                    <option value="">Select Unit</option>
                    <option value="Share">Share</option>
                    <option value="Unit">Unit</option>
                    <option value="Sq Ft">Sq Ft</option>
                    <option value="Acre">Acre</option>
                    <option value="Bond">Bond</option>
                    <option value="Debenture">Debenture</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-0">
                  <label className="form-label fs-13 text-muted">Description</label>
                  <textarea className="form-control rounded-3" value={masterData.description} onChange={(e) => setMasterData({...masterData, description: e.target.value})} rows="2" placeholder="NSE/BSE Code or other details"></textarea>
                </div>
              </div>
              <div className="modal-footer border-top-0 pb-4 px-4">
                <button type="button" className="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary rounded-pill px-4" disabled={isSavingMaster}>
                  {isSavingMaster ? 'Saving...' : (isEditMode ? 'Update Asset' : 'Create Asset')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 2. Type Modal */}
      <div className="modal fade" id="typeModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-bottom-0 pt-4 px-4">
              <h5 className="modal-title fw-bold">{isEditMode ? 'Edit Category' : 'Add New Category'}</h5>
              <button type="button" id="typeModalClose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmitType}>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label fs-13 text-muted">Category Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control rounded-3" value={typeData.name} onChange={(e) => setTypeData({...typeData, name: e.target.value})} placeholder="e.g. Equity, Mutual Funds" required />
                </div>
                <div className="mb-3">
                  <label className="form-label fs-13 text-muted">Description</label>
                  <textarea className="form-control rounded-3" value={typeData.description} onChange={(e) => setTypeData({...typeData, description: e.target.value})} rows="2"></textarea>
                </div>
                <div className="form-check form-switch mt-3">
                  <input className="form-check-input" type="checkbox" checked={typeData.is_active} onChange={(e) => setTypeData({...typeData, is_active: e.target.checked})} />
                  <label className="form-check-label fs-13 ms-2">Active</label>
                </div>
              </div>
              <div className="modal-footer border-top-0 pb-4 px-4">
                <button type="button" className="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary rounded-pill px-4" disabled={isSavingType}>
                  {isSavingType ? 'Saving...' : (isEditMode ? 'Update Category' : 'Create Category')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Transaction Modal */}
      <div className="modal fade" id="transactionModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-bottom-0 pt-4 px-4">
              <h5 className="modal-title fw-bold">{isEditMode ? 'Update Transaction' : 'Record New Transaction'}</h5>
              <button type="button" id="txnModalClose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmitTransaction}>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fs-13 text-muted">Investment Asset <span className="text-danger">*</span></label>
                    <select className="form-select rounded-3 text-truncate" value={transactionData.investment_master_id} onChange={(e) => setTransactionData({...transactionData, investment_master_id: e.target.value})} required>
                      <option value="">Select Asset</option>
                      {masters.map(m => <option key={m.id} value={m.id} title={m.name}>{m.name?.length > 30 ? m.name.substring(0, 30) + '...' : m.name}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-13 text-muted">Type <span className="text-danger">*</span></label>
                    <select className="form-select rounded-3" value={transactionData.type} onChange={(e) => setTransactionData({...transactionData, type: e.target.value})} required>
                      <option value="BUY">BUY</option>
                      <option value="SELL">SELL</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-13 text-muted">Date <span className="text-danger">*</span></label>
                    <input type="date" className="form-control rounded-3" value={transactionData.txn_date} onChange={(e) => setTransactionData({...transactionData, txn_date: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-13 text-muted">Quantity <span className="text-danger">*</span></label>
                    <input type="number" step="any" className="form-control rounded-3" value={transactionData.qty} onChange={(e) => setTransactionData({...transactionData, qty: e.target.value})} onBlur={calculateAmount} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-13 text-muted">Rate <span className="text-danger">*</span></label>
                    <input type="number" step="any" className="form-control rounded-3" value={transactionData.rate} onChange={(e) => setTransactionData({...transactionData, rate: e.target.value})} onBlur={calculateAmount} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fs-13 text-muted">Total Amount</label>
                    <input type="number" className="form-control rounded-3 bg-light" value={transactionData.amount} onChange={(e) => setTransactionData({...transactionData, amount: e.target.value})} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fs-13 text-muted">Narration</label>
                    <textarea className="form-control rounded-3" value={transactionData.narration} onChange={(e) => setTransactionData({...transactionData, narration: e.target.value})} rows="2"></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-top-0 pb-4 px-4">
                <button type="button" className="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary rounded-pill px-4" disabled={isSavingTransaction}>
                  {isSavingTransaction ? 'Recording...' : (isEditMode ? 'Update Record' : 'Post Transaction')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;

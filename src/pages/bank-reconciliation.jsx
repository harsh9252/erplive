import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { bankReconciliationService } from '../services/bankReconciliationService';
import { bankAccountService } from '../services/bankAccountService';

// BR-4 fix: removed unused navigate - added back for SPA routing
const BankReconciliation = () => {
  const navigate = useNavigate();
  const [reconciliations, setReconciliations] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedBank, setSelectedBank] = useState('All');
  const [statusFilter, setStatusFilter] = useState('PENDING'); // Default to PENDING as per spec
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [pagination, setPagination] = useState({
    total_count: 0,
    total_pages: 1
  });

  // BR-2 fix: bank accounts only need to be fetched once on mount
  useEffect(() => {
    fetchBankAccounts();
  }, []);

  useEffect(() => {
    fetchReconciliations();
  }, [currentPage, itemsPerPage, selectedBank, statusFilter]);

  const fetchBankAccounts = async () => {
    try {
      const response = await bankAccountService.getBankAccounts();
      if (response.success) {
        setBankAccounts(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
    }
  };

  const fetchReconciliations = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        status: statusFilter === 'All' ? undefined : statusFilter,
        bank_account_id: selectedBank === 'All' ? undefined : selectedBank
      };
      
      const response = await bankReconciliationService.getReconciliations(params);
      setReconciliations(response.data || []);
      
      setPagination({
        total_count: response.pagination?.totalItems || response.total || (response.data?.length || 0),
        total_pages: response.pagination?.totalPages || 1
      });
    } catch (error) {
      console.error('Error fetching reconciliations:', error);
      toast.error('Failed to load reconciliations');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'FINALIZED':
        return <span className="badge badge-soft-success">Finalized <i className="isax isax-tick-circle ms-1"></i></span>;
      case 'PENDING':
        return <span className="badge badge-soft-warning">Pending <i className="isax isax-timer ms-1"></i></span>;
      default:
        return <span className="badge badge-soft-secondary">{status}</span>;
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-header d-flex align-items-center justify-content-between mb-4">
        <div className="page-title">
          <h4>Bank Reconciliation</h4>
          <p className="text-muted mb-0">Reconcile your bank statements with ERP records</p>
        </div>
        <div className="page-header-right">
          <Link to="/accounting/bank-reconciliation/add" className="btn btn-primary d-flex align-items-center">
            <i className="isax isax-add-circle5 me-2"></i>New Reconciliation
          </Link>
        </div>
      </div>

      {/* Filters Card */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-lg-4 col-md-6">
              <label className="form-label fw-600">Bank Account</label>
              <select 
                className="form-select"
                value={selectedBank}
                onChange={(e) => { setSelectedBank(e.target.value); setCurrentPage(1); }}
              >
                <option value="All">All Bank Accounts</option>
                {bankAccounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.bank_name} - {acc.account_number}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-600">Status</label>
              <select 
                className="form-select"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              >
                <option value="All">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="FINALIZED">Finalized</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-12 d-flex align-items-end">
              <button 
                className="btn btn-light w-100"
                onClick={() => { setSelectedBank('All'); setStatusFilter('PENDING'); setCurrentPage(1); }}
              >
                <i className="isax isax-refresh me-1"></i>Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List Table */}
      <div className="card table-list-card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light text-nowrap">
                <tr>
                  <th>Bank Account</th>
                  <th>Statement Date</th>
                  <th className="text-end">Statement Balance</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : reconciliations.length > 0 ? (
                  reconciliations.map((rec) => (
                    <tr 
                      key={rec.id}
                      onClick={() => navigate(`/accounting/bank-reconciliation/${rec.id}`)}
                      style={{ cursor: 'pointer' }}
                      className="cursor-pointer"
                    >
                      <td className="fw-600">
                        {rec.bankAccount?.bank_name || rec.bank_account_name || rec.bank_account?.name || 'Unknown Bank'} 
                        <span className="text-muted small ms-1">({rec.bankAccount?.account_number || rec.bankAccount?.accountNo})</span>
                      </td>
                      <td>{rec.statement_date}</td>
                      <td className="text-end fw-500">
                        {parseFloat(rec.statement_balance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, style: 'currency', currency: 'INR' })}
                      </td>
                      <td className="text-center">{getStatusBadge(rec.status)}</td>
                      <td className="text-center">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          {/* BR-3 fix: use correct namespaced route */}
                          <Link 
                            to={`/accounting/bank-reconciliation/${rec.id}`}
                            className="btn btn-sm btn-icon btn-soft-primary"
                            title="Open Matching Screen"
                          >
                            <i className="isax isax-link-21"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">No reconciliation records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.total_pages > 1 && (
            <div className="pagination-wrapper mt-4 px-2">
              <div className="d-flex align-items-center justify-content-between">
                <div className="text-muted fs-13">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, pagination.total_count)} of {pagination.total_count} entries
                </div>
                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                    </li>
                    {[...Array(pagination.total_pages)].map((_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === pagination.total_pages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BankReconciliation;

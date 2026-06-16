import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { bankReconciliationService } from '../services/bankReconciliationService';

const MatchBankReconciliation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [unmatchedBank, setUnmatchedBank] = useState([]);
  const [unmatchedErp, setUnmatchedErp] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [activeTab, setActiveTab] = useState('unmatched'); // 'unmatched' or 'matched'
  
  const [selectedBankEntry, setSelectedBankEntry] = useState(null);
  const [selectedErpVoucher, setSelectedErpVoucher] = useState(null);
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [summaryResp, unmatchedResp, matchedResp] = await Promise.all([
        bankReconciliationService.getReconciliationSummary(id),
        bankReconciliationService.getUnmatchedTransactions(id),
        bankReconciliationService.getMatchedTransactions(id)
      ]);

      setSummary(summaryResp.data);
      
      // The unmatched endpoint may return an array directly or an object { bank_entries: [], erp_vouchers: [] }
      const unmatchedData = unmatchedResp.data || [];
      if (Array.isArray(unmatchedData)) {
        setUnmatchedBank(unmatchedData);
        setUnmatchedErp([]);
      } else {
        setUnmatchedBank(unmatchedData.bank_entries || []);
        setUnmatchedErp(unmatchedData.erp_vouchers || []); 
      }
      
      setMatchedPairs(matchedResp.data || []);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load reconciliation data');
    } finally {
      setLoading(false);
    }
  };

  // Suggest Match Helper
  const handleSuggestMatch = () => {
    let matchCount = 0;
    const updatedEntries = unmatchedBank.map(entry => {
      if (entry.matched) return entry;
      
      // Find exactly matching amount in ERP vouchers
      const potentialVoucher = unmatchedErp.find(v => {
        // If bank entry is Debit (Outbound), look for ERP Payment (Debit)
        // If bank entry is Credit (Inbound), look for ERP Receipt (Credit)
        const amt = entry.debit_amount > 0 ? entry.debit_amount : entry.credit_amount;
        const vAmt = v.debit_amount > 0 ? v.debit_amount : v.credit_amount;
        
        return vAmt === amt && !v.matched;
      });

      if (potentialVoucher) {
        matchCount++;
        return { ...entry, suggest_match_id: potentialVoucher.id, suggest_match_name: potentialVoucher.description || potentialVoucher.voucher_no };
      }
      return entry;
    });

    if (matchCount > 0) {
      setUnmatchedBank(updatedEntries);
      toast.success(`Found ${matchCount} potential matches! Highlighted in blue.`);
    } else {
      toast.info("No exact amount matches found.");
    }
  };

  const handleMatch = async () => {
    if (!selectedBankEntry || !selectedErpVoucher) {
      toast.warning("Please select one entry from both panels to match");
      return;
    }

    setIsMatching(true);
    try {
      await bankReconciliationService.matchTransaction({
        reconciliation_id: id,
        bank_transaction_id: selectedBankEntry.id,
        voucher_id: selectedErpVoucher.id
      });
      
      toast.success("Transaction matched successfully!");
      setSelectedBankEntry(null);
      setSelectedErpVoucher(null);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error matching transaction:', error);
      toast.error("Match failed");
    } finally {
      setIsMatching(false);
    }
  };

  const handleUnmatch = async (bankTransactionId) => {
    try {
      await bankReconciliationService.unmatchTransaction({
        reconciliation_id: id,
        bank_transaction_id: bankTransactionId
      });
      toast.success("Transaction unmatched");
      fetchData();
    } catch (error) {
      console.error('Error unmatching:', error);
      toast.error("Unmatch failed");
    }
  };

  const handleFinalize = async () => {
    const totalUnmatched = unmatchedBank.length + unmatchedErp.length;
    const currentVariance = Math.abs(statementBalance - erpBalance);

    if (totalUnmatched > 0) {
      Swal.fire({
        title: 'Cannot Finalize',
        text: `There are still ${totalUnmatched} unmatched transactions. All entries must be matched before finalizing.`,
        icon: 'warning',
        confirmButtonColor: '#d33'
      });
      return;
    }

    if (currentVariance > 0.01) { // Allowing for tiny rounding differences
      Swal.fire({
        title: 'Variance Detected',
        text: `There is still a variance of ${currentVariance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}. The ERP balance must match the statement balance.`,
        icon: 'warning',
        confirmButtonColor: '#d33'
      });
      return;
    }

    Swal.fire({
      title: 'Finalize Reconciliation?',
      text: "This will lock the reconciliation record. You won't be able to match or unmatch after this.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Finalize',
      confirmButtonColor: '#28a745'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await bankReconciliationService.finalizeReconciliation(id);
          toast.success("Reconciliation finalized!");
          navigate('/accounting/bank-reconciliation');
        } catch (error) {
          const message = error.response?.data?.message || error.message || "Finalization failed";
          toast.error(message);
        }
      }
    });
  };

  if (loading && !summary) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  const erpBalance = summary?.erp_balance || 0;
  const statementBalance = summary?.statement_balance || 0;
  const variance = statementBalance - erpBalance;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
  };

  return (
    <>
      {/* Header with Summary Stats */}
      <div className="page-header mb-4">
        <div className="row align-items-center">
          <div className="col">
            <h4 className="page-title">{summary?.bank_account_name || 'Bank Reconciliation'}</h4>
            <p className="text-muted small mb-0">Statement Date: {formatDate(summary?.statement_date)}</p>
          </div>
          <div className="col-auto d-flex gap-2">
            <button className="btn btn-success" onClick={handleFinalize} disabled={summary?.status === 'FINALIZED'}>
              <i className="isax isax-lock me-2"></i>Finalize
            </button>
            <Link to="/accounting/bank-reconciliation" className="btn btn-outline-secondary">
              <i className="isax isax-arrow-left-2 me-2"></i>Back
            </Link>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-primary text-white">
            <div className="card-body p-3">
              <p className="small mb-1 opacity-75">Statement Balance</p>
              <h5 className="mb-0">{statementBalance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-info text-white">
            <div className="card-body p-3">
              <p className="small mb-1 opacity-75">ERP Balance</p>
              <h5 className="mb-0">{erpBalance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-warning text-white">
            <div className="card-body p-3">
              <p className="small mb-1 opacity-75">Matched Amount</p>
              <h5 className="mb-0">{(summary?.matched_amount || 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-danger text-white">
            <div className="card-body p-3">
              <p className="small mb-1 opacity-75">Variance</p>
              <h5 className="mb-0">{variance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-transparent border-bottom px-0 pb-0">
          <ul className="nav nav-tabs nav-tabs-bottom px-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'unmatched' ? 'active' : ''}`}
                onClick={() => setActiveTab('unmatched')}
              >
                Unmatched Entries <span className="badge rounded-pill bg-light text-dark ms-2">{unmatchedBank.length + unmatchedErp.length}</span>
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'matched' ? 'active' : ''}`}
                onClick={() => setActiveTab('matched')}
              >
                Matched Pairs <span className="badge rounded-pill bg-light text-dark ms-2">{matchedPairs.length}</span>
              </button>
            </li>
          </ul>
        </div>
        
        <div className="card-body p-0">
          {activeTab === 'unmatched' ? (
            <div className="row g-0">
              {/* Left Panel: Bank Entries */}
              <div className="col-md-6 border-end">
                <div className="p-3 bg-light-soft border-bottom fw-600">Bank Statement Entries</div>
                <div className="table-responsive" style={{ maxHeight: '500px' }}>
                  <table className="table table-hover mb-0">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th className="text-end">Amount</th>
                        <th className="text-center">Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unmatchedBank.length > 0 ? (
                        unmatchedBank.map(entry => (
                          <tr 
                            key={entry.id} 
                            className={selectedBankEntry?.id === entry.id ? 'table-primary-soft' : ''}
                            onClick={() => setSelectedBankEntry(entry)}
                            style={{ cursor: 'pointer' }}
                          >
                            <td>{formatDate(entry.transaction_date)}</td>
                            <td className="small">{entry.description}</td>
                            <td className={`text-end fw-500 ${entry.debit_amount > 0 ? 'text-success' : 'text-danger'}`}>
                              {entry.debit_amount > 0 ? entry.debit_amount : -entry.credit_amount}
                            </td>
                            <td className="text-center">
                              <div className="form-check d-inline-block">
                                <input 
                                  className="form-check-input" 
                                  type="radio" 
                                  checked={selectedBankEntry?.id === entry.id}
                                  readOnly
                                />
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="4" className="text-center py-4 text-muted">No unmatched bank entries</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Panel: ERP Vouchers */}
              <div className="col-md-6">
                <div className="p-3 bg-light-soft border-bottom fw-600">ERP Vouchers</div>
                <div className="table-responsive" style={{ maxHeight: '500px' }}>
                  <table className="table table-hover mb-0">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>Date</th>
                        <th>Voucher # / Narration</th>
                        <th className="text-end">Amount</th>
                        <th className="text-center">Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unmatchedErp.length > 0 ? (
                        unmatchedErp.map(v => (
                          <tr 
                            key={v.id}
                            className={selectedErpVoucher?.id === v.id ? 'table-primary-soft' : ''}
                            onClick={() => setSelectedErpVoucher(v)}
                            style={{ cursor: 'pointer' }}
                          >
                            <td>{formatDate(v.voucher_date)}</td>
                            <td className="small">
                              <div className="fw-600">{v.voucher_number || v.v_no}</div>
                              <div className="text-muted text-truncate" style={{ maxWidth: '150px' }}>{v.narration}</div>
                            </td>
                            <td className={`text-end fw-500 ${v.dr_amount > 0 ? 'text-success' : 'text-danger'}`}>
                              {v.dr_amount > 0 ? v.dr_amount : -v.cr_amount}
                            </td>
                            <td className="text-center">
                              <div className="form-check d-inline-block">
                                <input 
                                  className="form-check-input" 
                                  type="radio" 
                                  checked={selectedErpVoucher?.id === v.id}
                                  readOnly
                                />
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="4" className="text-center py-4 text-muted">No unmatched ERP vouchers</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Bank Entry</th>
                    <th className="text-center"><i className="isax isax-arrow-swap"></i></th>
                    <th>ERP Voucher</th>
                    <th className="text-end">Amount</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {matchedPairs.length > 0 ? (
                    matchedPairs.map(pair => (
                      <tr key={pair.id}>
                        <td>
                          <div className="small fw-600">{pair.bank_entry?.description}</div>
                          <div className="text-muted small">{formatDate(pair.bank_entry?.transaction_date)}</div>
                        </td>
                        <td className="text-center"><i className="isax isax-tick-circle text-success"></i></td>
                        <td>
                          <div className="small fw-600">{pair.erp_voucher?.voucher_number}</div>
                          <div className="text-muted small">{formatDate(pair.erp_voucher?.voucher_date)}</div>
                        </td>
                        <td className="text-end fw-600">
                           {parseFloat(pair.amount || 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                        </td>
                        <td className="text-center">
                          <button 
                            className="btn btn-sm btn-soft-danger border-0"
                            onClick={() => handleUnmatch(pair.bank_entry_id)}
                            disabled={summary?.status === 'FINALIZED'}
                            title="Unmatch"
                          >
                            <i className="isax isax-trash fs-16"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="text-center py-5 text-muted">No matched pairs yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {activeTab === 'unmatched' && (
          <div className="card-footer bg-light px-4 py-3 text-center border-top-0">
            <button 
              className="btn btn-primary px-5 py-2 fw-600 rounded-pill"
              onClick={handleMatch}
              disabled={!selectedBankEntry || !selectedErpVoucher || isMatching || summary?.status === 'FINALIZED'}
            >
              {isMatching ? (
                <><span className="spinner-border spinner-border-sm me-2"></span>Matching...</>
              ) : (
                <><i className="isax isax-link me-2"></i>Match Selected</>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MatchBankReconciliation;

import { useState, useEffect, useCallback } from 'react';
import TaxForm from '../components/TaxForm';
import { Link } from 'react-router-dom';
import complianceService from '../services/complianceService';
import { toast } from 'react-toastify';

const TaxMaster = ({ initialType = '' }) => {
  const [taxList, setTaxList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState(initialType);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [historyInfo, setHistoryInfo] = useState({ isOpen: false, id: null, name: null, data: [] });
  const [historyLoading, setHistoryLoading] = useState(false);
  const [newRateForm, setNewRateForm] = useState({ 
    isOpen: false, 
    rate: 0, 
    effectiveDate: new Date().toISOString().split('T')[0],
    notificationRef: '',
    remarks: ''
  });

  const fetchTaxes = useCallback(async () => {
    try {
      setIsFetching(true);
      if (filterType === 'TDS') {
        const response = await complianceService.getTDSRules();
        // Backend might return { data: [...] } or { data: { data: [...] } }
        const data = response.data;
        if (Array.isArray(data)) {
          setTaxList(data);
        } else if (data && Array.isArray(data.data)) {
          setTaxList(data.data);
        } else {
          setTaxList([]);
        }
      } else if (filterType === 'TCS') {
        const response = await complianceService.getTCSRules();
        const data = response.data;
        if (Array.isArray(data)) {
          setTaxList(data);
        } else if (data && Array.isArray(data.data)) {
          setTaxList(data.data);
        } else {
          setTaxList([]);
        }
      } else {
        // Fallback for GST or others if no API yet
        const preSeededTaxes = [
          { id: 1, name: 'GST 0%', tax_type: 'GST', rate: 0, cgst_rate: 0, sgst_rate: 0, igst_rate: 0, createdAt: '2025-02-01' },
          { id: 2, name: 'GST 3%', tax_type: 'GST', rate: 3, cgst_rate: 1.5, sgst_rate: 1.5, igst_rate: 3, createdAt: '2025-02-01' },
          { id: 3, name: 'GST 5%', tax_type: 'GST', rate: 5, cgst_rate: 2.5, sgst_rate: 2.5, igst_rate: 5, createdAt: '2025-02-01' },
          { id: 4, name: 'GST 12%', tax_type: 'GST', rate: 12, cgst_rate: 6, sgst_rate: 6, igst_rate: 12, createdAt: '2025-02-01' },
          { id: 5, name: 'GST 18%', tax_type: 'GST', rate: 18, cgst_rate: 9, sgst_rate: 9, igst_rate: 18, createdAt: '2025-02-01' },
          { id: 6, name: 'GST 28%', tax_type: 'GST', rate: 28, cgst_rate: 14, sgst_rate: 14, igst_rate: 28, createdAt: '2025-02-01' },
        ];
        setTaxList(preSeededTaxes);
      }
    } catch (error) {
      console.error('Error fetching taxes:', error);
      toast.error('Failed to load tax rules');
      setTaxList([]); // Ensure it's an array on error
    } finally {
      setIsFetching(false);
    }
  }, [filterType]);

  useEffect(() => {
    fetchTaxes();
  }, [fetchTaxes]);

  const taxTypes = ['GST', 'TDS', 'TCS', 'CESS', 'OTHER'];

  const filteredList = taxList.filter((item) => {
    const name = item.name || item.nature_of_payment || item.product_category || '';
    const section = item.section || '';
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleAddNew = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setIsLoading(true);
      if (editingId) {
        if (filterType === 'TDS') {
          await complianceService.updateTDSRule(editingId, formData);
        } else if (filterType === 'TCS') {
          await complianceService.updateTCSRule(editingId, formData);
        }
        toast.success(`${filterType} rule updated successfully`);
      } else {
        if (filterType === 'TDS') {
          await complianceService.createTDSRule(formData);
        } else if (filterType === 'TCS') {
          await complianceService.createTCSRule(formData);
        }
        toast.success(`${filterType} rule created successfully`);
      }
      setShowForm(false);
      fetchTaxes();
    } catch (error) {
      console.error('Error saving tax rule:', error);
      toast.error(error.message || 'Failed to save tax rule');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (filterType === 'TDS') {
        await complianceService.deleteTDSRule(id);
      } else if (filterType === 'TCS') {
        await complianceService.deleteTCSRule(id);
      }
      toast.success(`${filterType} rule deleted successfully`);
      fetchTaxes();
    } catch (error) {
      console.error('Error deleting tax rule:', error);
      toast.error('Failed to delete tax rule');
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleViewHistory = async (item) => {
    const name = item.name || item.nature_of_payment || item.product_category;
    setHistoryInfo({ isOpen: true, id: item.id, name, data: [] });
    setHistoryLoading(true);
    try {
      const res = await complianceService.getTaxRateHistory(filterType, item.id);
      setHistoryInfo(prev => ({ ...prev, data: res.data || [] }));
    } catch (err) {
      toast.error('Failed to load history');
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleAddRateHistory = async () => {
    try {
      const rateField = filterType === 'TDS' ? 'tds_rate' : 'tcs_rate';
      await complianceService.createTaxRateHistory(filterType, historyInfo.id, {
        [rateField]: parseFloat(newRateForm.rate),
        effective_from: newRateForm.effectiveDate,
        notification_ref: newRateForm.notificationRef,
        remarks: newRateForm.remarks
      });
      toast.success('Rate history added');
      setNewRateForm({ ...newRateForm, isOpen: false, notificationRef: '', remarks: '' });
      handleViewHistory({ id: historyInfo.id, name: historyInfo.name }); // refresh
      fetchTaxes(); // refresh main list
    } catch (err) {
      toast.error('Failed to add rate');
    }
  };

  const getEditingData = () => {
    if (!editingId) return { tax_type: filterType || 'GST' };
    const item = taxList.find((item) => item.id === editingId);
    if (!item) return null;
    
    // Normalize for TaxForm
    return {
      ...item,
      tax_type: filterType,
      rate: item.tds_rate || item.tcs_rate || item.rate
    };
  };

  const getTaxTypeBadgeClass = (type) => {
    const badgeClasses = {
      GST: 'bg-primary-light text-primary',
      TDS: 'bg-info-light text-info',
      TCS: 'bg-warning-light text-warning',
      CESS: 'bg-danger-light text-danger',
      OTHER: 'bg-secondary-light text-secondary',
    };
    return badgeClasses[type] || 'bg-secondary-light text-secondary';
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-12">
          <div className="row settings-wrapper">
            <div className="col-12">
              <div className="mb-3">
                <div className="pb-3 border-bottom mb-3">
                  <h6 className="mb-0">GST - Tax Rates</h6>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <h6 className="fs-16 fw-semibold mb-0">Tax Master</h6>
                </div>

            {/* Search, Filter and Add Button */}
            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <div className="input-icon-start position-relative">
                    <span className="input-icon-addon">
                      <i className="isax isax-search-normal"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-sm bg-white"
                      placeholder="Search by name or type"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="form-control form-control-sm"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{ maxWidth: '150px' }}
                  >
                    <option value="">All Types</option>
                    {taxTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <button
                    onClick={handleAddNew}
                    className="btn btn-primary d-flex align-items-center"
                  >
                    <i className="isax isax-add-circle5 me-2"></i>New Tax
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive table-nowrap pb-3">
              <table className="table border mb-0">
                <thead className="table-light">
                  <tr>
                    <th>{filterType === 'TDS' ? 'Nature of Payment' : filterType === 'TCS' ? 'Product Category' : 'Tax Name'}</th>
                    <th>Type</th>
                    {filterType === 'GST' || !filterType ? (
                      <>
                        <th>Total Rate</th>
                        <th>CGST</th>
                        <th>SGST</th>
                        <th>IGST</th>
                      </>
                    ) : (
                      <>
                        <th>Section</th>
                        <th>Rate (%)</th>
                        <th>Threshold</th>
                      </>
                    )}
                    <th>Created On</th>
                    <th className="no-sort text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isFetching ? (
                    <tr>
                      <td colSpan="10" className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                    ) : (taxList && Array.isArray(taxList) && filteredList.length > 0) ? (
                    filteredList.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <span className="fw-semibold">
                            {item.name || item.nature_of_payment || item.product_category}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${getTaxTypeBadgeClass(item.tax_type || filterType)}`}>
                            {item.tax_type || filterType}
                          </span>
                        </td>
                        {filterType === 'GST' || !filterType ? (
                          <>
                            <td>{item.rate}%</td>
                            <td>{item.cgst_rate}%</td>
                            <td>{item.sgst_rate}%</td>
                            <td>{item.igst_rate}%</td>
                          </>
                        ) : (
                          <>
                            <td>{item.section}</td>
                            <td>{item.tds_rate || item.tcs_rate || item.rate}%</td>
                            <td>₹{item.threshold_amount || 0}</td>
                          </>
                        )}
                        <td>{new Date(item.createdAt || item.created_at).toLocaleDateString()}</td>                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end align-items-center gap-2">
                            {(filterType === 'TDS' || filterType === 'TCS') && (
                              <button 
                                className="btn btn-sm btn-soft-info border-0" 
                                onClick={() => handleViewHistory(item)} 
                                title="Rate History"
                              >
                                <i className="isax isax-clock fs-16"></i>
                              </button>
                            )}
                            <button 
                              className="btn btn-sm btn-soft-warning border-0" 
                              onClick={() => handleEdit(item.id)}
                              title="Edit Tax"
                            >
                              <i className="isax isax-edit-2 fs-16"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-soft-danger border-0" 
                              onClick={() => setDeleteConfirm(item.id)}
                              title="Delete Tax"
                            >
                              <i className="isax isax-trash fs-16"></i>
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center py-4">
                        <p className="text-muted mb-0">No taxes found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      {/* Add/Edit Modal */}
      <div
        className={`modal fade ${showForm ? 'show' : ''}`}
        style={{ display: showForm ? 'block' : 'none' }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                {editingId ? 'Edit Tax' : 'Add New Tax'}
              </h4>
              <button
                type="button"
                className="btn-close custom-btn-close btn-close-modal"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <TaxForm
                initialData={getEditingData()}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      {showForm && <div className="modal-backdrop fade show"></div>}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Confirm Delete</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteConfirm(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this tax?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal Backdrop */}
      {deleteConfirm && <div className="modal-backdrop fade show"></div>}

      {/* Rate History Modal */}
      {historyInfo.isOpen && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1060 }} onClick={() => setHistoryInfo({ ...historyInfo, isOpen: false })}></div>
          <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1065 }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg rounded-4">
                <div className="modal-header border-bottom py-3">
                  <h6 className="modal-title fw-bold">Rate History: {historyInfo.name}</h6>
                  <button type="button" className="btn-close shadow-none" onClick={() => setHistoryInfo({ ...historyInfo, isOpen: false })}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fs-13 fw-bold text-muted uppercase">Past Tax Rates</span>
                    <button 
                      className="btn btn-sm btn-soft-primary rounded-pill px-3"
                      onClick={() => setNewRateForm({ ...newRateForm, isOpen: true, rate: historyInfo.data[0]?.rate || 0 })}
                    >
                      <i className="isax isax-add me-1"></i>Set New Rate
                    </button>
                  </div>

                  {historyLoading ? (
                    <div className="text-center py-4">Loading history...</div>
                  ) : historyInfo.data.length > 0 ? (
                    <div className="list-group list-group-flush border rounded-3 overflow-hidden">
                      {historyInfo.data.map((h, i) => (
                        <div key={i} className="list-group-item py-3">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <div className="fw-bold text-dark fs-15">{h.tds_rate || h.tcs_rate || h.rate}% {filterType}</div>
                              <div className="fs-12 text-muted mt-1">
                                <i className="isax isax-calendar me-1"></i>Effective From: {new Date(h.effective_from).toLocaleDateString()}
                              </div>
                              {h.notification_ref && (
                                <div className="fs-12 text-primary mt-1">
                                  <i className="isax isax-document-text me-1"></i>Ref: {h.notification_ref}
                                </div>
                              )}
                              {h.remarks && (
                                <div className="fs-12 text-muted mt-1 bg-light p-2 rounded">
                                  <i className="isax isax-info-circle me-1"></i>{h.remarks}
                                </div>
                              )}
                            </div>
                            {i === 0 && <span className="badge bg-soft-success text-success fs-10 uppercase ls-1 px-2">Current</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted border border-dashed rounded-3">
                      No prior history found. The master rate has been consistent.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* New Rate Form Modal */}
      {newRateForm.isOpen && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1070 }} onClick={() => setNewRateForm({ ...newRateForm, isOpen: false })}></div>
          <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1075 }}>
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4">
                <div className="modal-header border-0 pb-0 pt-4 px-4">
                  <h6 className="fw-bold mb-0">Update Rate (Date-Effective)</h6>
                  <button type="button" className="btn-close shadow-none" onClick={() => setNewRateForm({ ...newRateForm, isOpen: false })}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fs-13 fw-600">New {filterType} Rate (%)</label>
                      <input 
                        type="number"
                        step="0.01"
                        className="form-control shadow-none" 
                        value={newRateForm.rate}
                        onChange={(e) => setNewRateForm({...newRateForm, rate: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fs-13 fw-600">Effective Date</label>
                      <input 
                        type="date" 
                        className="form-control shadow-none" 
                        value={newRateForm.effectiveDate}
                        onChange={(e) => setNewRateForm({...newRateForm, effectiveDate: e.target.value})}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fs-13 fw-600">Notification Reference</label>
                      <input 
                        type="text" 
                        className="form-control shadow-none" 
                        placeholder="e.g. Budget 2025 Amendment"
                        value={newRateForm.notificationRef}
                        onChange={(e) => setNewRateForm({...newRateForm, notificationRef: e.target.value})}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fs-13 fw-600">Remarks</label>
                      <textarea 
                        className="form-control shadow-none" 
                        rows="2"
                        placeholder="Reason for change..."
                        value={newRateForm.remarks}
                        onChange={(e) => setNewRateForm({...newRateForm, remarks: e.target.value})}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 p-4 pt-0">
                  <button 
                    className="btn btn-primary w-100 rounded-pill py-2 shadow-sm"
                    onClick={handleAddRateHistory}
                  >
                    Apply New Rate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TaxMaster;

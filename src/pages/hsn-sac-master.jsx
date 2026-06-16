import { useState, useEffect, useCallback } from 'react';
import HSNSACForm from '../components/HSNSACForm';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import { getHsnSacCodes, createHsnSacCode, updateHsnSacCode, deleteHsnSacCode, getRateHistory, createRateHistory } from '../services/hsnSacService';
import { useAuth } from '../components/AuthContext';

const HSNSACMaster = () => {
    const { activeCompany } = useAuth();
    const [hsnSacList, setHsnSacList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('ALL');
    const [page, setPage] = useState(1);
    const [limit] = useState(50);
    const [totalItems, setTotalItems] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });
    const [historyInfo, setHistoryInfo] = useState({ isOpen: false, id: null, code: null, data: [] });
    const [historyLoading, setHistoryLoading] = useState(false);
    const [newRateForm, setNewRateForm] = useState({ 
        isOpen: false, 
        rate: 18, 
        effectiveDate: new Date().toISOString().split('T')[0],
        notificationRef: '',
        remarks: ''
    });

    const loadData = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = {
                page,
                limit,
                search: searchTerm || undefined,
                type: filterType === 'ALL' ? undefined : filterType,
                company_id: activeCompany?.id || undefined,
            };
            const response = await getHsnSacCodes(params);
            setHsnSacList(response.data || []);
            setTotalItems(response.pagination?.total || response.data?.length || 0);
        } catch (error) {
            console.error('Error loading HSN/SAC codes:', error);
            toast.error('Failed to load HSN/SAC codes');
        } finally {
            setIsLoading(false);
        }
    }, [page, limit, searchTerm, filterType, activeCompany?.id]);

    useEffect(() => {
        loadData();
    }, [loadData, activeCompany?.id]);

    const handleAddNew = () => {
        setEditingId(null);
        setShowForm(true);
    };

    const handleEdit = (id) => {
        setEditingId(id);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        setSaving(true);
        try {
            if (editingId) {
                await updateHsnSacCode(editingId, formData);
                toast.success('HSN/SAC code updated successfully!');
            } else {
                await createHsnSacCode(formData);
                toast.success('HSN/SAC code added successfully!');
            }
            setShowForm(false);
            loadData();
        } catch (error) {
            console.error('Error saving HSN/SAC code:', error);
            toast.error(error.message || 'Failed to save HSN/SAC code');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (id) => {
        setDeleteConfirm({ isOpen: true, id });
    };

    const handleViewHistory = async (item) => {
        setHistoryInfo({ isOpen: true, id: item.id, code: item.code, data: [] });
        setHistoryLoading(true);
        try {
            const res = await getRateHistory(item.id);
            setHistoryInfo(prev => ({ ...prev, data: res.data || [] }));
        } catch (err) {
            toast.error('Failed to load history');
        } finally {
            setHistoryLoading(false);
        }
    };

    const handleAddRateHistory = async () => {
        try {
            await createRateHistory(historyInfo.id, {
                gst_rate: parseFloat(newRateForm.rate),
                effective_from: newRateForm.effectiveDate,
                notification_ref: newRateForm.notificationRef,
                remarks: newRateForm.remarks
            });
            toast.success('Rate history added');
            setNewRateForm({ ...newRateForm, isOpen: false, notificationRef: '', remarks: '' });
            handleViewHistory({ id: historyInfo.id, code: historyInfo.code }); // refresh
        } catch (err) {
            toast.error('Failed to add rate');
        }
    };

    const confirmDelete = async () => {
        if (deleteConfirm.id) {
            try {
                await deleteHsnSacCode(deleteConfirm.id);
                toast.success('HSN/SAC code deleted successfully!');
                loadData();
            } catch (error) {
                toast.error(error.message || 'Failed to delete HSN/SAC code');
            }
        }
        setDeleteConfirm({ isOpen: false, id: null });
    };

    const getEditingData = () => {
        if (!editingId) return null;
        return hsnSacList.find((item) => item.id === editingId);
    };

    return (
        <div className="container-fluid py-4">
            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
                onConfirm={confirmDelete}
                title="Delete HSN/SAC Code"
                message="Are you sure you want to delete this HSN/SAC code? This action cannot be undone."
                confirmText="Yes, Delete"
                cancelText="Cancel"
                type="danger"
            />

            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                <div>
                    <h4 className="fw-bold mb-1 text-dark">GST - HSN/SAC Master</h4>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 fs-13">
                            <li className="breadcrumb-item"><Link to="/inventory/stock-summary">Inventory</Link></li>
                            <li className="breadcrumb-item active text-muted">HSN/SAC Codes</li>
                        </ol>
                    </nav>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <button onClick={handleAddNew} className="btn btn-primary d-flex align-items-center rounded-pill px-4 shadow-sm">
                        <i className="isax isax-add-circle5 me-2 fs-18"></i>
                        New HSN/SAC
                    </button>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                <div className="card-header bg-white py-3 border-bottom-light">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div className="d-flex align-items-center flex-wrap gap-3">
                            <div className="position-relative" style={{ width: '250px' }}>
                                <span className="position-absolute ps-3 top-50 translate-middle-y">
                                    <i className="isax isax-search-normal text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control form-control-sm border-0 bg-light ps-5 py-2 shadow-none"
                                    placeholder="Search code or description..."
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="fs-13 text-muted me-2">Type:</span>
                                <select 
                                    className="form-select form-select-sm border-0 bg-light w-auto shadow-none py-1"
                                    value={filterType}
                                    onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
                                >
                                    <option value="ALL">All Types</option>
                                    <option value="HSN">HSN (Goods)</option>
                                    <option value="SAC">SAC (Services)</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-muted fs-13">
                            Total: <span className="fw-bold text-dark">{totalItems}</span> codes
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light fs-12 text-uppercase text-muted">
                                <tr>
                                    <th className="ps-4">Code</th>
                                    <th>Type</th>
                                    <th style={{ width: '30%' }}>Description</th>
                                    <th className="text-center">GST Rate</th>
                                    <th className="text-center">CGST</th>
                                    <th className="text-center">SGST</th>
                                    <th className="text-center">IGST</th>
                                    <th className="text-center">CESS</th>
                                    <th className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr><td colSpan="9" className="text-center py-5">Loading...</td></tr>
                                ) : hsnSacList.length > 0 ? (
                                    hsnSacList.map((item) => (
                                        <tr key={item.id}>
                                            <td className="ps-4 fw-600 text-dark">
                                                {item.code}
                                                {!item.company_id && (
                                                    <span className="badge bg-light text-secondary ms-2 border" style={{ fontSize: '10px' }}>Global</span>
                                                )}
                                            </td>
                                            <td>
                                                <span className={`badge rounded-pill px-2 py-1 fs-11 ${item.type === 'HSN' ? 'bg-light-primary text-primary' : 'bg-light-success text-success'}`}>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="text-muted fs-13">
                                                <span className="text-truncate d-inline-block" style={{ maxWidth: '300px' }} title={item.description}>
                                                    {item.description}
                                                </span>
                                            </td>
                                            <td className="text-center fw-500">{item.gst_rate}%</td>
                                            <td className="text-center text-muted fs-12">{item.cgst_rate}%</td>
                                            <td className="text-center text-muted fs-12">{item.sgst_rate}%</td>
                                            <td className="text-center text-muted fs-13 fw-500">{item.igst_rate}%</td>
                                            <td className="text-center text-muted fs-12">{item.cess_rate}%</td>
                                            <td className="text-end pe-4">
                                                <div className="d-flex justify-content-end align-items-center gap-2">
                                                    <button 
                                                        className="btn btn-sm btn-soft-info border-0" 
                                                        onClick={() => handleViewHistory(item)} 
                                                        title="Rate History"
                                                    >
                                                        <i className="isax isax-clock fs-16"></i>
                                                    </button>
                                                    {item.company_id && (
                                                        <>
                                                            <button 
                                                                className="btn btn-sm btn-soft-warning border-0" 
                                                                onClick={() => handleEdit(item.id)} 
                                                                title="Edit"
                                                            >
                                                                <i className="isax isax-edit-2 fs-16"></i>
                                                            </button>
                                                            <button 
                                                                className="btn btn-sm btn-soft-danger border-0" 
                                                                onClick={() => handleDelete(item.id)} 
                                                                title="Delete"
                                                            >
                                                                <i className="isax isax-trash fs-16"></i>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="9" className="text-center py-5 text-muted">No HSN/SAC codes found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {totalItems > limit && (
                    <div className="card-footer bg-white border-top-light py-3 d-flex justify-content-between align-items-center">
                        <div className="fs-13 text-muted">Showing {hsnSacList.length} of {totalItems}</div>
                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link shadow-none" onClick={() => setPage(p => p - 1)} disabled={page === 1}>Previous</button>
                                </li>
                                <li className="page-item active"><span className="page-link">{page}</span></li>
                                <li className={`page-item ${hsnSacList.length < limit ? 'disabled' : ''}`}>
                                    <button className="page-link shadow-none" onClick={() => setPage(p => p + 1)} disabled={hsnSacList.length < limit}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>

            {/* Rate History Modal */}
            {historyInfo.isOpen && (
                <>
                    <div className="modal-backdrop fade show" style={{ zIndex: 1060 }} onClick={() => setHistoryInfo({ ...historyInfo, isOpen: false })}></div>
                    <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1065 }}>
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content border-0 shadow-lg rounded-4">
                                <div className="modal-header border-bottom-light py-3">
                                    <h6 className="modal-title fw-bold">Rate History: {historyInfo.code}</h6>
                                    <button type="button" className="btn-close shadow-none" onClick={() => setHistoryInfo({ ...historyInfo, isOpen: false })}></button>
                                </div>
                                <div className="modal-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="fs-13 fw-bold text-muted uppercase">Past Tax Rates</span>
                                        <button 
                                            className="btn btn-sm btn-soft-primary rounded-pill px-3"
                                            onClick={() => setNewRateForm({ ...newRateForm, isOpen: true })}
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
                                                            <div className="fw-bold text-dark fs-15">{h.gst_rate}% GST</div>
                                                            <div className="fs-12 text-muted mt-1">
                                                                <i className="isax isax-calendar me-1"></i>Effective From: {h.effective_from}
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
                                            <label className="form-label fs-13 fw-600">New GST Rate (%)</label>
                                            <select 
                                                className="form-select shadow-none" 
                                                value={newRateForm.rate}
                                                onChange={(e) => setNewRateForm({...newRateForm, rate: e.target.value})}
                                            >
                                                {[0, 3, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                                            </select>
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
                                                placeholder="e.g. CBIC Notification 45/2025"
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

            {/* HSN/SAC Form Modal */}
            {showForm && (
                <>
                    <div className="modal-backdrop fade show" style={{ zIndex: 1050 }} onClick={() => setShowForm(false)}></div>
                    <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1055 }}>
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content border-0 shadow-lg rounded-4">
                                <div className="modal-header border-bottom-light py-3 px-4">
                                    <h6 className="modal-title fw-bold text-dark">
                                        {editingId ? 'Edit HSN/SAC Code' : 'Add New HSN/SAC Code'}
                                    </h6>
                                    <button type="button" className="btn-close shadow-none" onClick={() => setShowForm(false)}></button>
                                </div>
                                <div className="modal-body p-0">
                                    <HSNSACForm 
                                        initialData={getEditingData()} 
                                        onSubmit={handleFormSubmit}
                                        isLoading={saving}
                                        onClose={() => setShowForm(false)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default HSNSACMaster;

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import chequeService from '../services/chequeService';
import { getCustomers } from '../services/customerService';
import { getVendors } from '../services/vendorService';
import SearchableSelect from '../components/SearchableSelect';

const Cheques = () => {
    const [loading, setLoading] = useState(false);
    const [cheques, setCheques] = useState([]);
    const [dueSoonCount, setDueSoonCount] = useState(0);
    const [filters, setFilters] = useState({
        status: 'PENDING',
        type: 'RECEIVED', // RECEIVED / ISSUED
        party_id: '',
        start_date: '',
        end_date: ''
    });

    const [parties, setParties] = useState([]);
    const [partyType, setPartyType] = useState('CUSTOMER'); // CUSTOMER / VENDOR

    // Modal States
    const [showAddModal, setShowAddModal] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    const [showBounceModal, setShowBounceModal] = useState(false);
    const [actionCheque, setActionCheque] = useState(null);

    // Form States
    const [newCheque, setNewCheque] = useState({
        type: 'RECEIVED',
        party_type: 'CUSTOMER',
        party_id: '',
        cheque_number: '',
        bank_name: '',
        cheque_date: '',
        amount: '',
        remarks: ''
    });

    const [clearData, setClearData] = useState({
        cleared_date: new Date().toISOString().split('T')[0],
        remarks: ''
    });

    const [bounceData, setBounceData] = useState({
        reason: '',
        charge: 0
    });

    // Fetch Parties based on Party Type
    useEffect(() => {
        const fetchParties = async () => {
            try {
                let list = [];
                if (partyType === 'CUSTOMER') {
                    const res = await getCustomers();
                    list = (res.data || res || []).map(c => ({ value: c.id, label: c.name }));
                } else {
                    const res = await getVendors();
                    list = (res.data || res || []).map(v => ({ value: v.id, label: v.name }));
                }
                setParties(list);
            } catch (err) {
                console.error('Error fetching parties:', err);
            }
        };
        fetchParties();
    }, [partyType]);

    const fetchCheques = useCallback(async () => {
        setLoading(true);
        try {
            const [chequeRes, alertRes] = await Promise.all([
                chequeService.getCheques(filters),
                chequeService.getDueSoon(7)
            ]);
            
            // Handle different response formats safely
            const chequeData = chequeRes.data?.items || chequeRes.data || chequeRes;
            setCheques(Array.isArray(chequeData) ? chequeData : []);
            
            setDueSoonCount(alertRes.data?.count || alertRes.count || alertRes.total || 0);
        } catch (error) {
            console.error('Error fetching cheques:', error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchCheques();
    }, [fetchCheques]);

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await chequeService.createCheque(newCheque);
            toast.success('Cheque recorded successfully');
            setShowAddModal(false);
            fetchCheques();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to record cheque');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = async (e) => {
        e.preventDefault();
        try {
            await chequeService.clearCheque(actionCheque.id, clearData);
            toast.success('Cheque cleared');
            setShowClearModal(false);
            fetchCheques();
        } catch (error) {
            toast.error('Clear failed');
        }
    };

    const handleBounce = async (e) => {
        e.preventDefault();
        try {
            await chequeService.bounceCheque(actionCheque.id, bounceData);
            toast.success('Cheque marked as BOUNCED');
            setShowBounceModal(false);
            fetchCheques();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this cheque?')) return;
        try {
            await chequeService.cancelCheque(id);
            toast.success('Cheque cancelled');
            fetchCheques();
        } catch (error) {
            toast.error('Cancellation failed');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'warning';
            case 'CLEARED': return 'success';
            case 'BOUNCED': return 'danger';
            case 'CANCELLED': return 'secondary';
            default: return 'light';
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h4 className="fw-bold mb-1">Post-Dated Cheques</h4>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 fs-13">
                            <li className="breadcrumb-item">Banking & Payments</li>
                            <li className="breadcrumb-item active">Cheques</li>
                        </ol>
                    </nav>
                </div>
                <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}>
                    <i className="isax isax-add-circle fs-18"></i>
                    Record New Cheque
                </button>
            </div>

            {/* Due Soon Banner */}
            {dueSoonCount > 0 && (
                <div className="alert alert-warning border-0 shadow-sm d-flex align-items-center mb-4 p-3 rounded-3">
                    <i className="isax isax-info-circle fs-24 me-3"></i>
                    <div>
                        <h6 className="alert-heading fw-bold mb-1">Cheques Due Soon!</h6>
                        <p className="mb-0 fs-13">You have <strong>{dueSoonCount}</strong> cheques maturing within the next 7 days. Action required for clearing/depositing.</p>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body p-3">
                    <div className="row g-3">
                        <div className="col-md-2">
                            <label className="form-label small fw-bold text-muted text-uppercase mb-1">Type</label>
                            <select className="form-select form-select-sm" value={filters.type} onChange={e => setFilters(f => ({...f, type: e.target.value}))}>
                                <option value="RECEIVED">Inward (Received)</option>
                                <option value="ISSUED">Outward (Issued)</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label small fw-bold text-muted text-uppercase mb-1">Status</label>
                            <select className="form-select form-select-sm" value={filters.status} onChange={e => setFilters(f => ({...f, status: e.target.value}))}>
                                <option value="">All Status</option>
                                <option value="PENDING">PENDING</option>
                                <option value="CLEARED">CLEARED</option>
                                <option value="BOUNCED">BOUNCED</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label small fw-bold text-muted text-uppercase mb-1">Date Range</label>
                            <div className="input-group input-group-sm">
                                <input type="date" className="form-control" value={filters.start_date} onChange={e => setFilters(f => ({...f, start_date: e.target.value}))} />
                                <span className="input-group-text">to</span>
                                <input type="date" className="form-control" value={filters.end_date} onChange={e => setFilters(f => ({...f, end_date: e.target.value}))} />
                            </div>
                        </div>
                        <div className="col-md-5 text-end d-flex align-items-end justify-content-end gap-2">
                            <button className="btn btn-light btn-sm px-3" onClick={() => setFilters({status: 'PENDING', type: 'RECEIVED', party_id: '', start_date: '', end_date: ''})}>Reset Filters</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cheques Table */}
            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light text-muted fs-11 text-uppercase">
                            <tr>
                                <th className="ps-4">Cheque No & Bank</th>
                                <th>Party</th>
                                <th>Cheque Date</th>
                                <th className="text-end">Amount</th>
                                <th className="text-center">Status</th>
                                <th className="text-center pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="fs-13">
                            {loading && cheques.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary"></div></td></tr>
                            ) : cheques.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-5 text-muted">No cheques found matching filters.</td></tr>
                            ) : (
                                cheques.map(chq => (
                                    <tr key={chq.id}>
                                        <td className="ps-4">
                                            <div className="fw-bold text-dark">{chq.cheque_number}</div>
                                            <div className="fs-12 text-muted italic">{chq.bank_name || 'N/A'}</div>
                                        </td>
                                        <td>
                                            <div className="fw-medium text-dark">{chq.party_name || chq.party?.name}</div>
                                            <span className="badge bg-soft-info text-info fs-10">{chq.party_type}</span>
                                        </td>
                                        <td>
                                            <div className="fw-medium">{chq.cheque_date}</div>
                                            {new Date(chq.cheque_date) > new Date() && <span className="text-warning fs-11">Post-Dated</span>}
                                        </td>
                                        <td className="text-end fw-bold">₹{parseFloat(chq.amount).toLocaleString()}</td>
                                        <td className="text-center">
                                            <span className={`badge bg-soft-${getStatusColor(chq.status)} text-${getStatusColor(chq.status)}`}>
                                                {chq.status}
                                            </span>
                                        </td>
                                        <td className="text-center pe-4">
                                            {chq.status === 'PENDING' && (
                                                <div className="dropdown">
                                                    <button className="btn btn-soft-primary btn-xs dropdown-toggle shadow-none" data-bs-toggle="dropdown">Actions</button>
                                                    <ul className="dropdown-menu dropdown-menu-end shadow border-0 fs-13">
                                                        <li><button className="dropdown-item py-2" onClick={() => { setActionCheque(chq); setShowClearModal(true); }}>
                                                            <i className="isax isax-tick-circle me-2 text-success"></i>Mark Cleared
                                                        </button></li>
                                                        <li><button className="dropdown-item py-2" onClick={() => { setActionCheque(chq); setShowBounceModal(true); }}>
                                                            <i className="isax isax-close-circle me-2 text-danger"></i>Mark Bounced
                                                        </button></li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li><button className="dropdown-item py-2 text-danger" onClick={() => handleCancel(chq.id)}>
                                                            <i className="isax isax-trash me-2"></i>Cancel Cheque
                                                        </button></li>
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Cheque Modal */}
            {showAddModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header border-0 bg-light">
                                <h5 className="modal-title fw-bold">Record New PDC</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <form onSubmit={handleCreate}>
                                <div className="modal-body p-4">
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted">Cheque Type</label>
                                            <div className="d-flex gap-4">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="chq_type" id="type_received" 
                                                        checked={newCheque.type === 'RECEIVED'} onChange={() => setNewCheque({...newCheque, type: 'RECEIVED'})} />
                                                    <label className="form-check-label" htmlFor="type_received">RECEIVED (Customer)</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="chq_type" id="type_issued" 
                                                        checked={newCheque.type === 'ISSUED'} onChange={() => setNewCheque({...newCheque, type: 'ISSUED'})} />
                                                    <label className="form-check-label" htmlFor="type_issued">ISSUED (Vendor)</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 text-end d-flex align-items-center justify-content-end p-2 bg-soft-info rounded">
                                            <span className="fs-12 text-info italic">PDC is tracked separately until cleared in bank.</span>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted">Party Type *</label>
                                            <select className="form-select shadow-none" value={partyType} onChange={e => { setPartyType(e.target.value); setNewCheque({...newCheque, party_type: e.target.value, party_id: ''}); }}>
                                                <option value="CUSTOMER">Customer</option>
                                                <option value="VENDOR">Vendor</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted">Select Party *</label>
                                            <SearchableSelect 
                                                options={parties}
                                                value={newCheque.party_id}
                                                onChange={val => setNewCheque({...newCheque, party_id: val})}
                                                placeholder={`Select ${partyType.toLowerCase()}...`}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted">Cheque Number *</label>
                                            <input type="text" className="form-control shadow-none" value={newCheque.cheque_number} onChange={e => setNewCheque({...newCheque, cheque_number: e.target.value})} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted">Bank Name</label>
                                            <input type="text" className="form-control shadow-none" value={newCheque.bank_name} onChange={e => setNewCheque({...newCheque, bank_name: e.target.value})} />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted">Cheque Date *</label>
                                            <input type="date" className="form-control shadow-none" value={newCheque.cheque_date} onChange={e => setNewCheque({...newCheque, cheque_date: e.target.value})} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted">Amount *</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">₹</span>
                                                <input type="number" className="form-control shadow-none border-start-0" value={newCheque.amount} onChange={e => setNewCheque({...newCheque, amount: e.target.value})} required />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label small fw-bold text-muted">Remarks</label>
                                            <textarea className="form-control shadow-none" rows="2" value={newCheque.remarks} onChange={e => setNewCheque({...newCheque, remarks: e.target.value})}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-0 p-4 pt-0">
                                    <button type="button" className="btn btn-light px-4" onClick={() => setShowAddModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary px-4 shadow" disabled={loading}>
                                        {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="isax isax-save-2 me-2 fs-16"></i>}
                                        Record Cheque
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Clear Modal */}
            {showClearModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-0 bg-success text-white">
                                <h5 className="modal-title fw-bold">Clear Cheque</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowClearModal(false)}></button>
                            </div>
                            <form onSubmit={handleClear}>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-muted">Cleared Date *</label>
                                        <input type="date" className="form-control" value={clearData.cleared_date} onChange={e => setClearData({...clearData, cleared_date: e.target.value})} required />
                                    </div>
                                    <div className="mb-0">
                                        <label className="form-label small fw-bold text-muted">Remarks</label>
                                        <textarea className="form-control" rows="2" value={clearData.remarks} onChange={e => setClearData({...clearData, remarks: e.target.value})}></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button type="button" className="btn btn-light" onClick={() => setShowClearModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-success px-4">Mark as Cleared</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Bounce Modal */}
            {showBounceModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-0 bg-danger text-white">
                                <h5 className="modal-title fw-bold">Record Cheque Bounce</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowBounceModal(false)}></button>
                            </div>
                            <form onSubmit={handleBounce}>
                                <div className="modal-body p-4">
                                    <div className="mb-3 text-danger italic fs-13">
                                        <i className="isax isax-info-circle me-1"></i>
                                        Marking as bounced will invalidate the instrument.
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-muted">Reason *</label>
                                        <input type="text" className="form-control" value={bounceData.reason} onChange={e => setBounceData({...bounceData, reason: e.target.value})} placeholder="e.g. Insufficient funds" required />
                                    </div>
                                    <div className="mb-0">
                                        <label className="form-label small fw-bold text-muted">Bounce Charges (if any)</label>
                                        <div className="input-group">
                                            <span className="input-group-text">₹</span>
                                            <input type="number" className="form-control" value={bounceData.charge} onChange={e => setBounceData({...bounceData, charge: e.target.value})} />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button type="button" className="btn btn-light" onClick={() => setShowBounceModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-danger px-4">Confirm Bounce</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .bg-soft-info { background-color: rgba(13, 202, 240, 0.1); }
                .bg-soft-success { background-color: rgba(25, 135, 84, 0.1); }
                .bg-soft-warning { background-color: rgba(255, 193, 7, 0.1); }
                .bg-soft-danger { background-color: rgba(220, 53, 69, 0.1); }
                .bg-soft-secondary { background-color: rgba(108, 117, 125, 0.1); }
                .btn-xs { padding: 0.25rem 0.5rem; font-size: 0.75rem; }
            `}</style>
        </div>
    );
};

export default Cheques;

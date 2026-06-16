import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { listVerification, createVerification } from '../services/stockVerificationService';
import { getWarehouses } from '../services/settingsService';

const StockVerification = () => {
    const navigate = useNavigate();
    const [verifications, setVerifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [warehouses, setWarehouses] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const modalRef = useState(null);

    const openModal = () => {
        const modalEl = document.getElementById('createVerificationModal');
        if (modalEl) {
            const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        }
    };

    const closeModal = () => {
        const modalEl = document.getElementById('createVerificationModal');
        if (modalEl) {
            const modal = window.bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }
    };

    const [formData, setFormData] = useState({
        warehouse_id: '',
        verification_date: new Date().toISOString().split('T')[0],
        notes: ''
    });

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await listVerification();
            setVerifications(response.data || []);
        } catch (error) {
            console.error('Error loading verifications:', error);
            toast.error('Failed to load stock verifications');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const res = await getWarehouses();
                setWarehouses(res.data || res || []);
            } catch (error) {
                console.error('Error fetching warehouses:', error);
            }
        };
        fetchWarehouses();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await createVerification({
                ...formData,
                warehouse_id: Number(formData.warehouse_id)
            });
            toast.success('Stock verification project created');
            closeModal();
            // Navigate to detail page to enter counts
            navigate(`/inventory/stock-verification/${res.data?.id || res.id}`);
        } catch (error) {
            console.error('Error creating verification:', error);
            toast.error(error.message || 'Failed to create verification');
        } finally {
            setSaving(false);
        }
    };

    const getStatusBadge = (status) => {
        const classes = {
            OPEN: 'bg-light-info text-info',
            SUBMITTED: 'bg-light-warning text-warning',
            POSTED: 'bg-light-success text-success'
        };
        return <span className={`badge ${classes[status] || 'bg-light-secondary text-secondary'}`}>{status}</span>;
    };

    const getWarehouseName = (id) => {
        const w = warehouses.find(wh => wh.id === Number(id));
        return w ? w.name : `Warehouse #${id}`;
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h4 className="fw-bold mb-1 text-dark">Stock Verification (Physical Count)</h4>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 fs-13">
                            <li className="breadcrumb-item"><Link to="/inventory/stock-summary">Inventory</Link></li>
                            <li className="breadcrumb-item active text-muted">Stock Verification</li>
                        </ol>
                    </nav>
                </div>
                <button className="btn btn-primary px-4 rounded-pill" onClick={openModal}>
                    <i className="isax isax-add-circle5 me-2 fs-18"></i>
                    Start New Verification
                </button>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white py-3 border-bottom-light">
                    <h6 className="mb-0 fw-bold text-dark">Verification Projects</h6>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4">ID</th>
                                    <th>Date</th>
                                    <th>Warehouse</th>
                                    <th>Status</th>
                                    <th className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="text-center py-5">Loading...</td></tr>
                                ) : verifications.length > 0 ? (
                                    verifications.map(v => (
                                        <tr key={v.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/inventory/stock-verification/${v.id}`)}>
                                            <td className="ps-4 text-muted">#{v.id}</td>
                                            <td>{new Date(v.verification_date).toLocaleDateString()}</td>
                                            <td className="fw-500">{getWarehouseName(v.warehouse_id)}</td>
                                            <td>{getStatusBadge(v.status)}</td>
                                            <td className="text-end pe-4" onClick={(e) => e.stopPropagation()}>
                                                <Link 
                                                  to={`/inventory/stock-verification/${v.id}`} 
                                                  className="btn btn-sm btn-soft-primary border-0"
                                                  title="View / Enter Counts"
                                                >
                                                  <i className="isax isax-eye fs-16"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="5" className="text-center py-5 text-muted">No verification projects found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Standard Bootstrap Modal */}
            <div className="modal fade" id="createVerificationModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg rounded-4">
                        <form onSubmit={handleCreate}>
                            <div className="modal-header border-bottom-light py-3">
                                <h6 className="modal-title fw-bold">New Physical Count Project</h6>
                                <button type="button" className="btn-close shadow-none" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="mb-3">
                                    <label className="form-label fw-600">Warehouse <span className="text-danger">*</span></label>
                                    <select className="form-select bg-light border-0 py-2 shadow-none" value={formData.warehouse_id} onChange={e => setFormData({ ...formData, warehouse_id: e.target.value })} required>
                                        <option value="">Select Warehouse</option>
                                        {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-600">Verification Date <span className="text-danger">*</span></label>
                                    <input type="date" className="form-control bg-light border-0 py-2 shadow-none" value={formData.verification_date} onChange={e => setFormData({ ...formData, verification_date: e.target.value })} required />
                                </div>
                                <div className="mb-0">
                                    <label className="form-label fw-600">Notes</label>
                                    <textarea className="form-control bg-light border-0 shadow-none" rows="3" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="e.g. Year-end count..."></textarea>
                                </div>
                            </div>
                            <div className="modal-footer border-0 p-4 pt-0">
                                <button type="button" className="btn btn-outline-secondary px-4 rounded-pill" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary px-4 rounded-pill" disabled={saving}>
                                    {saving ? 'Creating...' : 'Start Count'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockVerification;

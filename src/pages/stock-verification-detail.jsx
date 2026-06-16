import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { getVerification, submitCounts, getVariance, postAdjustments } from '../services/stockVerificationService';

const StockVerificationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [verification, setVerification] = useState(null);
    const [counts, setCounts] = useState([]); // Local state for editing counts
    const [varianceData, setVarianceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('counts'); // counts or variance
    const [saving, setSaving] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getVerification(id);
            setVerification(res.data || res);
            
            const items = res.data?.items || res.items || [];
            setCounts(items.map(item => ({
                item_id: item.item_id,
                name: item.item?.name || item.item_name || item.name || 'Unknown Item',
                sku: item.item?.sku || item.sku || '-',
                system_qty: item.system_qty || 0,
                physical_qty: item.physical_qty !== null && item.physical_qty !== undefined ? item.physical_qty : item.system_qty
            })));
        } catch (error) {
            console.error('Error fetching verification:', error);
            toast.error('Failed to load verification details');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const fetchVariance = useCallback(async () => {
        try {
            const res = await getVariance(id);
            setVarianceData(res.data || res || []);
        } catch (error) {
            console.error('Error fetching variance:', error);
            // Don't toast error here if it's just that counts aren't submitted yet
        }
    }, [id]);

    useEffect(() => {
        if (activeTab === 'variance') {
            fetchVariance();
        }
    }, [activeTab, fetchVariance]);

    const handleQtyChange = (itemId, val) => {
        setCounts(prev => prev.map(c => 
            c.item_id === itemId ? { ...c, physical_qty: val === '' ? '' : Number(val) } : c
        ));
    };

    const handleSaveCounts = async () => {
        setSaving(true);
        try {
            const payload = counts.map(c => ({
                item_id: c.item_id,
                physical_qty: Number(c.physical_qty || 0)
            }));
            await submitCounts(id, payload);
            toast.success('Physical counts saved successfully');
            fetchData(); 
        } catch (error) {
            console.error('Error saving counts:', error);
            toast.error(error.message || 'Failed to save counts');
        } finally {
            setSaving(false);
        }
    };

    const handlePost = async () => {
        const result = await Swal.fire({
            title: 'Post Adjustments?',
            text: 'Are you sure you want to post adjustments? This will create Stock Ledger entries to reconcile differences.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, post it!'
        });

        if (!result.isConfirmed) return;
        
        setSaving(true);
        try {
            await postAdjustments(id);
            toast.success('Stock adjustments posted successfully');
            navigate('/inventory/stock-verification');
        } catch (error) {
            console.error('Error posting adjustments:', error);
            toast.error(error.message || 'Failed to post adjustments');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (!verification) return <div className="p-5 text-center text-muted">Verification project not found.</div>;

    const isPosted = verification.status === 'POSTED';

    return (
        <div className="container-fluid py-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h4 className="fw-bold mb-1 text-dark">Stock Verification Detail</h4>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 fs-13">
                            <li className="breadcrumb-item"><Link to="/inventory/stock-verification">Stock Verification</Link></li>
                            <li className="breadcrumb-item active text-muted">Project #{id}</li>
                        </ol>
                    </nav>
                </div>
                <div className="d-flex gap-2">
                    {!isPosted && (
                        <>
                            <button className="btn btn-primary rounded-pill px-4" onClick={handleSaveCounts} disabled={saving}>
                                {saving ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="isax isax-save-2 me-2 fs-18"></i>}
                                Save Draft
                            </button>
                            <button className="btn btn-success rounded-pill px-4" onClick={handlePost} disabled={saving}>
                                <i className="isax isax-tick-circle me-2 fs-18"></i>
                                Post Adjustments
                            </button>
                        </>
                    )}
                    {isPosted && (
                        <div className="d-flex align-items-center bg-light-success text-success px-3 py-2 rounded-pill fw-bold fs-13">
                            <i className="isax isax-tick-circle me-2 fs-18"></i>
                            STATUS: POSTED
                        </div>
                    )}
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body p-3">
                            <p className="text-muted fs-11 mb-1 text-uppercase fw-600">Warehouse</p>
                            <h6 className="mb-0 fw-bold text-dark">{verification.warehouse?.name || verification.warehouse_name || `Warehouse #${verification.warehouse_id}`}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body p-3">
                            <p className="text-muted fs-11 mb-1 text-uppercase fw-600">Verification Date</p>
                            <h6 className="mb-0 fw-bold text-dark">{new Date(verification.verification_date).toLocaleDateString()}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body p-3">
                            <p className="text-muted fs-11 mb-1 text-uppercase fw-600">Current Status</p>
                            <div className="d-flex align-items-center">
                                <span className={`badge rounded-pill px-2 py-1 fs-11 ${
                                    verification.status === 'POSTED' ? 'bg-success' : 
                                    verification.status === 'SUBMITTED' ? 'bg-warning' : 'bg-info'
                                }`}>
                                    {verification.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white p-0 border-bottom-light">
                    <ul className="nav nav-tabs border-0 px-3">
                        <li className="nav-item">
                            <button 
                                className={`nav-link border-0 py-3 px-4 shadow-none ${activeTab === 'counts' ? 'active border-bottom border-primary border-3 fw-bold' : 'text-muted'}`}
                                onClick={() => setActiveTab('counts')}
                            >
                                <i className="isax isax-edit me-2"></i>
                                Enter Physical Counts
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link border-0 py-3 px-4 shadow-none ${activeTab === 'variance' ? 'active border-bottom border-primary border-3 fw-bold' : 'text-muted'}`}
                                onClick={() => setActiveTab('variance')}
                            >
                                <i className="isax isax-graph me-2"></i>
                                Variance Report
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="card-body p-0">
                    {activeTab === 'counts' && (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light fs-12 text-uppercase text-muted">
                                    <tr>
                                        <th className="ps-4 py-3">Item Name</th>
                                        <th>SKU</th>
                                        <th className="text-center">System Qty</th>
                                        <th style={{ width: '180px' }} className="pe-4 text-center">Physical Qty</th>
                                    </tr>
                                </thead>
                                <tbody className="fs-14">
                                    {counts.map(item => (
                                        <tr key={item.item_id}>
                                            <td className="ps-4 py-3 fw-500 text-dark">{item.name}</td>
                                            <td className="text-muted">{item.sku || '-'}</td>
                                            <td className="text-center">
                                                <span className="fw-600 text-dark">{item.system_qty}</span>
                                            </td>
                                            <td className="pe-4">
                                                <input 
                                                    type="number" 
                                                    className="form-control form-control-sm border-0 bg-light shadow-none text-center fw-bold text-primary py-2"
                                                    value={item.physical_qty}
                                                    onChange={(e) => handleQtyChange(item.item_id, e.target.value)}
                                                    disabled={isPosted}
                                                    placeholder="0"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    {counts.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center py-5">
                                                <i className="isax isax-box fs-1 d-block text-muted mb-2"></i>
                                                <span className="text-muted">No items found for this warehouse in the system.</span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'variance' && (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light fs-12 text-uppercase text-muted">
                                    <tr>
                                        <th className="ps-4 py-3">Item Name</th>
                                        <th className="text-center">System Qty</th>
                                        <th className="text-center">Physical Qty</th>
                                        <th className="pe-4 text-end">Variance (+/-)</th>
                                    </tr>
                                </thead>
                                <tbody className="fs-14">
                                    {varianceData.map((item, idx) => {
                                        const variance = (Number(item.physical_qty) || 0) - (Number(item.system_qty) || 0);
                                        return (
                                            <tr key={item.item_id || idx}>
                                                <td className="ps-4 py-3 fw-500 text-dark">{item.item?.name || item.item_name || item.name || 'Unknown Item'}</td>
                                                <td className="text-center">{item.system_qty || 0}</td>
                                                <td className="text-center">{item.physical_qty || 0}</td>
                                                <td className="pe-4 text-end">
                                                    <span className={`badge rounded-pill px-3 py-1 ${
                                                        variance > 0 ? 'bg-light-success text-success' : 
                                                        variance < 0 ? 'bg-light-danger text-danger' : 'bg-light-secondary text-secondary'
                                                    }`}>
                                                        {variance > 0 ? `+${variance}` : variance === 0 ? 'Matching' : variance}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {varianceData.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center py-5">
                                                <i className="isax isax-document-text fs-1 d-block text-muted mb-2"></i>
                                                <span className="text-muted">Submit physical counts first to see the variance report.</span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StockVerificationDetail;

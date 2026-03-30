import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getBOM, explodeBOM } from '../services/bomService';

const BOMDetails = () => {
    const { id } = useParams();
    const [bom, setBom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [explosionQty, setExplosionQty] = useState(1);
    const [explosionResults, setExplosionResults] = useState([]);
    const [exploding, setExploding] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getBOM(id);
            const data = res.data || res;
            setBom(data);
            setExplosionQty(data.qty_produced || 1);
        } catch (error) {
            console.error('Error fetching BOM:', error);
            toast.error('Failed to load BOM details');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleExplosion = async (e) => {
        if (e) e.preventDefault();
        setExploding(true);
        try {
            const res = await explodeBOM(id, explosionQty);
            setExplosionResults(res.data || res || []);
        } catch (error) {
            console.error('Explosion error:', error);
            toast.error('Failed to calculate material requirements');
        } finally {
            setExploding(false);
        }
    };

    if (loading) {
        return (
            <div className="p-5 text-center">
                <div className="spinner-border text-primary"></div>
                <p className="mt-2 text-muted">Loading BOM details...</p>
            </div>
        );
    }

    if (!bom) {
        return (
            <div className="p-5 text-center text-muted">BOM not found.</div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h4 className="fw-bold mb-1">BOM Details</h4>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 fs-13">
                            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item"><Link to="/manufacturing/bom">BOM</Link></li>
                            <li className="breadcrumb-item active">Details</li>
                        </ol>
                    </nav>
                </div>
                <div className="d-flex gap-2">
                    <Link to={`/manufacturing/bom/edit/${id}`} className="btn btn-soft-info border-0 shadow-none">
                        <i className="isax isax-edit me-2"></i>Edit BOM
                    </Link>
                </div>
            </div>

            <div className="row g-4">
                {/* BOM Info Card */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white py-3">
                            <h6 className="fw-bold mb-0">General Information</h6>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="text-muted small text-uppercase fw-bold d-block mb-1">Finished Item</label>
                                <h6 className="fw-bold mb-0">{bom.finished_item?.name || bom.finished_item_name || 'N/A'}</h6>
                                <small className="text-muted">{bom.finished_item?.sku || ''}</small>
                            </div>
                            <div className="row g-3">
                                <div className="col-6">
                                    <label className="text-muted small text-uppercase fw-bold d-block mb-1">Version</label>
                                    <h6 className="fw-bold mb-0">{bom.version}</h6>
                                </div>
                                <div className="col-6">
                                    <label className="text-muted small text-uppercase fw-bold d-block mb-1">Batch Size</label>
                                    <h6 className="fw-bold mb-0">{bom.qty_produced} {bom.finished_item?.unit || 'Units'}</h6>
                                </div>
                                <div className="col-12">
                                    <label className="text-muted small text-uppercase fw-bold d-block mb-1">Status</label>
                                    <span className={`badge badge-soft-${bom.status === 'ACTIVE' ? 'success' : 'secondary'}`}>
                                        {bom.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Raw Materials Table */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white py-3">
                            <h6 className="fw-bold mb-0">Bill of Materials Formula</h6>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="ps-4">Component</th>
                                            <th>Qty/Batch</th>
                                            <th>Wastage %</th>
                                            <th className="pe-4">Sub-BOM</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bom.items && bom.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="ps-4">
                                                    <span className="fw-medium">{item.item?.name || item.name || 'Component ' + (idx + 1)}</span>
                                                    <br />
                                                    <small className="text-muted">{item.item?.sku || ''}</small>
                                                </td>
                                                <td>{item.qty} {item.item?.unit || ''}</td>
                                                <td>{item.wastage_pct || 0}%</td>
                                                <td className="pe-4 text-muted small">
                                                    {item.sub_bom_id ? <Link to={`/manufacturing/bom/${item.sub_bom_id}`}>Yes (v{item.sub_bom?.version || '?'})</Link> : 'No'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOM Explosion Tool Section */}
                <div className="col-12 mt-4">
                    <div className="card border-0 shadow-sm border-top border-4 border-info">
                        <div className="card-header bg-white py-3 d-flex align-items-center justify-content-between">
                            <h6 className="fw-bold mb-0">Material Planning Tool (BOM Explosion)</h6>
                            <div className="d-flex align-items-center gap-3">
                                <form onSubmit={handleExplosion} className="d-flex align-items-center gap-2">
                                    <label className="text-muted fs-13 mb-0">Qty to Produce:</label>
                                    <input 
                                        type="number" 
                                        className="form-control form-control-sm w-auto shadow-none" 
                                        value={explosionQty}
                                        onChange={(e) => setExplosionQty(parseFloat(e.target.value) || 0)}
                                        min="0.0001"
                                        step="any"
                                    />
                                    <button 
                                        type="submit" 
                                        className="btn btn-sm btn-info shadow-none"
                                        disabled={exploding}
                                    >
                                        {exploding ? 'Calculating...' : 'Calculate'}
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                    <thead className="bg-light fs-13">
                                        <tr>
                                            <th className="ps-4">Raw Material</th>
                                            <th>Required Qty (with wastage)</th>
                                            <th>Current Stock</th>
                                            <th className="pe-4">Shortage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {explosionResults.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="text-center py-5 text-muted">
                                                    Enter quantity and click Calculate to see requirements.
                                                </td>
                                            </tr>
                                        ) : (
                                            explosionResults.map((res, idx) => (
                                                <tr key={idx}>
                                                    <td className="ps-4">
                                                        <span className="fw-bold text-dark">{res.item_name || res.item?.name || 'Item'}</span>
                                                        <br />
                                                        <small className="text-muted">{res.sku || res.item?.sku || ''}</small>
                                                    </td>
                                                    <td>
                                                        <span className="fw-medium text-primary">{res.required_qty} {res.unit || ''}</span>
                                                    </td>
                                                    <td className={res.current_stock < res.required_qty ? 'text-danger' : 'text-success'}>
                                                        {res.current_stock || 0} {res.unit || ''}
                                                    </td>
                                                    <td className="pe-4">
                                                        {res.shortage > 0 ? (
                                                            <span className="badge badge-soft-danger px-3 rounded-pill fw-bold">
                                                                - {res.shortage} {res.unit || ''}
                                                            </span>
                                                        ) : (
                                                            <span className="badge badge-soft-success px-3 rounded-pill fw-bold">
                                                                In Stock
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BOMDetails;

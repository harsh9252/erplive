import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getExpiryReport } from '../services/itemService';
import { toast } from 'react-toastify';

const ItemExpiryReport = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getExpiryReport();
            const reportData = Array.isArray(res.data) ? res.data : (res.data?.items || []);
            setData(reportData);
        } catch (error) {
            toast.error('Failed to load expiry report');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = (Array.isArray(data) ? data : []).filter(item => {
        const matchesSearch = (item?.item_name || "").toLowerCase().includes(searchText.toLowerCase()) || 
                             (item?.batch_number || "").toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === "ALL" || item?.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        switch(status) {
            case 'EXPIRED': return <span className="badge bg-soft-danger text-danger px-3 rounded-pill">EXPIRED</span>;
            case 'EXPIRING_SOON': return <span className="badge bg-soft-warning text-warning px-3 rounded-pill">EXPIRING SOON</span>;
            default: return <span className="badge bg-soft-success text-success px-3 rounded-pill">OK</span>;
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                <div>
                    <h4 className="fw-bold mb-1 text-dark">Item Expiry Management</h4>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 fs-13">
                            <li className="breadcrumb-item text-muted">Inventory</li>
                            <li className="breadcrumb-item active">Batch Expiry Report</li>
                        </ol>
                    </nav>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <button onClick={fetchData} className="btn btn-outline-primary rounded-pill px-4 shadow-sm border">
                        <i className="isax isax-refresh me-2"></i>Refresh
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
                                    placeholder="Search item or batch..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>
                            <select 
                                className="form-select form-select-sm border-0 bg-light w-auto shadow-none py-1 pe-5"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="ALL">All Batches</option>
                                <option value="EXPIRED">Expired Only</option>
                                <option value="EXPIRING_SOON">Expiring Soon</option>
                                <option value="OK">Normal (Safe)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light fs-12 text-uppercase text-muted">
                                <tr>
                                    <th className="ps-4">Item Name</th>
                                    <th>Batch / Lot</th>
                                    <th className="text-center">Manufacture Date</th>
                                    <th className="text-center">Expiry Date</th>
                                    <th className="text-center">Days Remain</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-end pe-4">Stock Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="7" className="text-center py-5">Loading expiry data...</td></tr>
                                ) : filteredData.length > 0 ? (
                                    filteredData.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="ps-4">
                                                <div className="fw-600 text-dark">{item.item_name}</div>
                                                <div className="fs-12 text-muted">{item.sku}</div>
                                            </td>
                                            <td><code className="text-primary">{item.batch_number || 'N/A'}</code></td>
                                            <td className="text-center text-muted fs-13">{item.mfg_date || 'N/A'}</td>
                                            <td className="text-center fw-500 text-dark">{item.expiry_date || 'N/A'}</td>
                                            <td className="text-center">
                                                <span className={`fw-bold ${item.days_to_expiry <= 0 ? 'text-danger' : item.days_to_expiry <= 30 ? 'text-warning' : 'text-success'}`}>
                                                    {item.days_to_expiry ?? 'N/A'}
                                                </span>
                                            </td>
                                            <td className="text-center">{getStatusBadge(item.status)}</td>
                                            <td className="text-end pe-4 fw-600">{item.qty}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="7" className="text-center py-5 text-muted">No items found with expiry tracking.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemExpiryReport;

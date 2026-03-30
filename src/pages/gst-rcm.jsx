import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getRcmTransactions, getRcmLiabilitySummary } from '../services/rcmService';
import { getVendors } from '../services/vendorService';
import SearchableSelect from '../components/SearchableSelect';

const GstRcm = () => {
    const today = new Date().toISOString().split('T')[0];
    const firstDayOfYear = `${new Date().getFullYear()}-04-01`;

    const [activeTab, setActiveTab] = useState('transactions');
    const [loading, setLoading] = useState(false);
    const [vendors, setVendors] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [liability, setLiability] = useState({
        total_igst: 0,
        total_cgst: 0,
        total_sgst: 0,
        itc_eligible: true
    });

    const [filters, setFilters] = useState({
        from_date: firstDayOfYear,
        to_date: today,
        vendor_id: ''
    });

    const fetchVendors = async () => {
        try {
            const response = await getVendors();
            const resData = response.data || response;
            const vendorList = Array.isArray(resData) ? resData : (resData.vendors || resData.data || []);
            
            setVendors(vendorList.map(v => ({
                value: v.id || v._id || v.vendor_id,
                label: v.name || v.vendor_name || v.party_name
            })));
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            if (activeTab === 'transactions') {
                const response = await getRcmTransactions(filters);
                const resData = response.data || response;
                // Robust array extraction
                const transactionsList = Array.isArray(resData) ? resData : (resData.transactions || resData.data || []);
                setTransactions(transactionsList);
            } else {
                const response = await getRcmLiabilitySummary(filters);
                const summary = response.data || response;
                // Standardize liability object
                setLiability({
                    total_igst: summary.total_igst || summary.igst || 0,
                    total_cgst: summary.total_cgst || summary.cgst || 0,
                    total_sgst: summary.total_sgst || summary.sgst || 0,
                    itc_eligible: summary.itc_eligible !== undefined ? summary.itc_eligible : true
                });
            }
        } catch (error) {
            console.error(`Error fetching RCM ${activeTab}:`, error);
            // Don't toast error on initialization if it's just empty
            if (error.status !== 404) {
                toast.error(`Failed to load RCM ${activeTab}`);
            }
            if (activeTab === 'transactions') setTransactions([]);
        } finally {
            setLoading(false);
        }
    }, [activeTab, filters]);

    useEffect(() => {
        fetchVendors();
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container-fluid py-4 text-dark">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                <div>
                    <h4 className="fw-bold mb-1">Reverse Charge Mechanism (RCM)</h4>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 fs-13">
                            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item">Reports</li>
                            <li className="breadcrumb-item active">RCM</li>
                        </ol>
                    </nav>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <div className="input-group input-group-sm">
                        <span className="input-group-text bg-white border-end-0 text-muted small">From</span>
                        <input 
                            type="date" 
                            className="form-control border-start-0 ps-0" 
                            name="from_date"
                            value={filters.from_date}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="input-group input-group-sm">
                        <span className="input-group-text bg-white border-end-0 text-muted small">To</span>
                        <input 
                            type="date" 
                            className="form-control border-start-0 ps-0" 
                            name="to_date"
                            value={filters.to_date}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <button className="btn btn-outline-primary btn-sm px-3 shadow-none" onClick={fetchData}>
                        <i className="isax isax-refresh me-1"></i>
                    </button>
                </div>
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-0">
                    <ul className="nav nav-tabs nav-tabs-bottom mb-0">
                        <li className="nav-item">
                            <button 
                                className={`nav-link ${activeTab === 'transactions' ? 'active' : ''} px-4 py-3 border-0`}
                                onClick={() => setActiveTab('transactions')}
                            >
                                RCM Transactions
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link ${activeTab === 'liability' ? 'active' : ''} px-4 py-3 border-0`}
                                onClick={() => setActiveTab('liability')}
                            >
                                RCM Liability Summary
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {activeTab === 'transactions' ? (
                <>
                    <div className="card border-0 shadow-sm mb-3">
                        <div className="card-body py-3">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div className="d-flex align-items-center gap-2">
                                        <label className="mb-0 small fw-bold text-muted">Vendor:</label>
                                        <div className="flex-grow-1">
                                            <SearchableSelect 
                                                options={vendors}
                                                value={filters.vendor_id}
                                                onChange={(id) => setFilters(prev => ({ ...prev, vendor_id: id }))}
                                                placeholder="All Vendors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light fs-12 text-uppercase">
                                        <tr>
                                            <th className="ps-4">Date</th>
                                            <th>Vendor</th>
                                            <th>Invoice No</th>
                                            <th className="text-end">Taxable Amount</th>
                                            <th className="text-end">IGST</th>
                                            <th className="text-end">CGST</th>
                                            <th className="text-end pe-4">SGST</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr><td colSpan="7" className="text-center py-4">Loading transactions...</td></tr>
                                        ) : transactions.length === 0 ? (
                                            <tr><td colSpan="7" className="text-center py-4 text-muted">No RCM transactions found for this selection.</td></tr>
                                        ) : (
                                            transactions.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className="ps-4">{item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}</td>
                                                    <td className="fw-medium text-dark">{item.vendor_name || item.party_name}</td>
                                                    <td>{item.invoice_no}</td>
                                                    <td className="text-end fw-medium">₹{Number(item.taxable_amount).toLocaleString()}</td>
                                                    <td className="text-end">₹{Number(item.igst_payable || 0).toLocaleString()}</td>
                                                    <td className="text-end">₹{Number(item.cgst_payable || 0).toLocaleString()}</td>
                                                    <td className="text-end pe-4">₹{Number(item.sgst_payable || 0).toLocaleString()}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                    {!loading && transactions.length > 0 && (
                                        <tfoot className="bg-light fw-bold border-top">
                                            <tr>
                                                <td colSpan="3" className="ps-4 text-center text-uppercase fs-12">Totals</td>
                                                <td className="text-end text-primary">₹{transactions.reduce((s, i) => s + Number(i.taxable_amount || 0), 0).toLocaleString()}</td>
                                                <td className="text-end">₹{transactions.reduce((s, i) => s + Number(i.igst_payable || 0), 0).toLocaleString()}</td>
                                                <td className="text-end">₹{transactions.reduce((s, i) => s + Number(i.cgst_payable || 0), 0).toLocaleString()}</td>
                                                <td className="text-end pe-4">₹{transactions.reduce((s, i) => s + Number(i.sgst_payable || 0), 0).toLocaleString()}</td>
                                            </tr>
                                        </tfoot>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="row g-4">
                    <div className="col-md-9">
                        <div className="row g-4 mb-4">
                            {[
                                { label: 'IGST Payable (RCM)', value: liability.total_igst, color: 'info', icon: 'receipt-item' },
                                { label: 'CGST Payable (RCM)', value: liability.total_cgst, color: 'warning', icon: 'receipt-2' },
                                { label: 'SGST Payable (RCM)', value: liability.total_sgst, color: 'success', icon: 'receipt-search' }
                            ].map((stat, idx) => (
                                <div className="col-md-4" key={idx}>
                                    <div className="card border-0 shadow-sm">
                                        <div className="card-body p-4 text-center">
                                            <span className={`badge badge-soft-${stat.color} p-3 rounded-circle mb-3`}>
                                                <i className={`isax isax-${stat.icon} fs-24`}></i>
                                            </span>
                                            <h4 className="fw-bold mb-1">₹{Number(stat.value).toLocaleString()}</h4>
                                            <p className="text-muted small mb-0 font-monospace">{stat.label}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h6 className="fw-bold mb-3 d-flex align-items-center">
                                    <i className="isax isax-info-circle me-2 text-primary fs-20"></i>
                                    Important Notice: ITC Eligibility
                                </h6>
                                <div className={`alert ${liability.itc_eligible ? 'alert-soft-success' : 'alert-soft-warning'} border-0 mb-0 ps-4 position-relative`}>
                                    <div className="position-absolute start-0 top-0 bottom-0 bg-primary opacity-25" style={{ width: '4px' }}></div>
                                    <p className="mb-2 fw-medium">{liability.itc_eligible ? 'You are eligible to claim ITC on these RCM payments.' : 'ITC claim might be restricted for these RCM payments.'}</p>
                                    <ul className="small text-muted mb-0 ps-3">
                                        <li>The tax paid under RCM is eligible for ITC if the goods/services are used for business purposes.</li>
                                        <li>ITC can be claimed in the same month in which the RCM liability is paid.</li>
                                        <li>Self-invoicing is mandatory for purchases from unregistered vendors under Section 31(3)(f).</li>
                                        <li>Ensure a payment voucher is issued at the time of making payment to the unregistered supplier.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm bg-primary text-white h-100">
                            <div className="card-body p-4 d-flex flex-column justify-content-center text-center">
                                <i className="isax isax-wallet-money fs-48 mb-3 opacity-50"></i>
                                <h6 className="fw-bold mb-1">Tax Reconciliation</h6>
                                <p className="small opacity-75 mb-0">RCM liabilities must be paid in cash/bank, not through ITC balance adjustment.</p>
                                <hr className="my-4 border-white opacity-25" />
                                <div className="text-start">
                                    <p className="small mb-2 fw-bold">Current Period Totals:</p>
                                    <div className="d-flex justify-content-between small opacity-75 mb-1">
                                        <span>Total RCM Payable:</span>
                                        <span>₹{(Number(liability.total_igst) + Number(liability.total_cgst) + Number(liability.total_sgst)).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GstRcm;

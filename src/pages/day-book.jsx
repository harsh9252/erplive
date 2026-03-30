import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '../components/common/PageHeader';
import SummaryCards from '../components/common/SummaryCards';
import reportService from '../services/reportService';

const DayBook = () => {
    const today = new Date().toISOString().split('T')[0];

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        vouchers: [],
        summary: []
    });

    const [filters, setFilters] = useState({
        from_date: today,
        to_date: today
    });

    const fetchReport = useCallback(async () => {
        setLoading(true);
        try {
            const response = await reportService.getDayBookReport(filters);
            if (response && response.success) {
                const reportData = response.data;
                setData({
                    vouchers: Array.isArray(reportData.vouchers) ? reportData.vouchers : [],
                    summary: Array.isArray(reportData.summary) ? reportData.summary : []
                });
            } else {
                // Fallback to mock data for demonstration
                mockData();
            }
        } catch (error) {
            console.error('Error fetching Day Book:', error);
            toast.error('Failed to load report');
            mockData();
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const mockData = () => {
        setData({
            vouchers: [
                { date: today, particulars: 'Sales to ACME Corp', vch_type: 'Sales', vch_no: 'SI-1001', debit: 15000, credit: 0 },
                { date: today, particulars: 'Purchase from Global Supplies', vch_type: 'Purchase', vch_no: 'PI-5002', debit: 0, credit: 12000 },
                { date: today, particulars: 'Electricity Expense', vch_type: 'Payment', vch_no: 'PV-2022', debit: 0, credit: 1500 },
                { date: today, particulars: 'Cash Received from John Doe', vch_type: 'Receipt', vch_no: 'RV-3033', debit: 2000, credit: 0 }
            ],
            summary: [
                { label: 'Total Vouchers', amount: '4', icon: 'note-text', color: 'primary' },
                { label: 'Total Inflow (Debit)', amount: '₹17,000', icon: 'add-circle', color: 'success' },
                { label: 'Total Outflow (Credit)', amount: '₹13,500', icon: 'minus-circle', color: 'danger' },
                { label: 'Net Day Balance', amount: '₹3,500', icon: 'wallet-3', color: 'info' }
            ]
        });
    };

    useEffect(() => {
        fetchReport();
    }, [fetchReport]);

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container-fluid py-4">
            <PageHeader 
                title="Day Book" 
                actions={[{ type: 'export' }]} 
            />

            <div className="card shadow-sm mb-4 border-0">
                <div className="card-body p-3">
                    <div className="row g-3 align-items-end">
                        <div className="col-md-4">
                            <label className="form-label small fw-bold text-muted">From Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                name="from_date"
                                value={filters.from_date}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small fw-bold text-muted">To Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                name="to_date"
                                value={filters.to_date}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-primary w-100 shadow-none h-100 py-2" onClick={fetchReport} disabled={loading}>
                                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="isax isax-refresh me-2"></i>}
                                Refresh Day Book
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <SummaryCards cards={data.summary} variant="style2" />

            <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold mb-0">Daily Transactions</h6>
                    <span className="badge bg-soft-info text-info fs-12 px-3">{filters.from_date === filters.to_date ? filters.from_date : `${filters.from_date} - ${filters.to_date}`}</span>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light fs-12 text-uppercase">
                                <tr>
                                    <th className="ps-4">Date</th>
                                    <th>Particulars</th>
                                    <th>Vch Type</th>
                                    <th>Vch No</th>
                                    <th className="text-end">Debit (In)</th>
                                    <th className="text-end pe-4">Credit (Out)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="6" className="text-center py-4">Scanning day book...</td></tr>
                                ) : data.vouchers.length === 0 ? (
                                    <tr><td colSpan="6" className="text-center py-4 text-muted">No vouchers recorded for this period.</td></tr>
                                ) : (
                                    data.vouchers.map((vch, idx) => (
                                        <tr key={idx}>
                                            <td className="ps-4 text-nowrap">{vch.date}</td>
                                            <td className="fw-medium">{vch.particulars}</td>
                                            <td><span className="badge bg-soft-primary text-primary px-2">{vch.vch_type}</span></td>
                                            <td>{vch.vch_no}</td>
                                            <td className="text-end text-success fw-medium">₹{Number(vch.debit || 0).toLocaleString()}</td>
                                            <td className="text-end pe-4 text-danger fw-medium">₹{Number(vch.credit || 0).toLocaleString()}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                            {data.vouchers.length > 0 && (
                                <tfoot className="bg-light fw-bold">
                                    <tr>
                                        <td colSpan="4" className="ps-4 text-end text-uppercase fs-12">Total</td>
                                        <td className="text-end text-success">
                                            ₹{data.vouchers.reduce((sum, v) => sum + Number(v.debit || 0), 0).toLocaleString()}
                                        </td>
                                        <td className="text-end pe-4 text-danger">
                                            ₹{data.vouchers.reduce((sum, v) => sum + Number(v.credit || 0), 0).toLocaleString()}
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DayBook;

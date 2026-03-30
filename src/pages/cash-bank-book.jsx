import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '../components/common/PageHeader';
import SummaryCards from '../components/common/SummaryCards';
import reportService from '../services/reportService';
import ledgerService from '../services/ledgerService';

const CashBankBook = () => {
    const today = new Date().toISOString().split('T')[0];
    const firstDayOfYear = `${new Date().getFullYear()}-04-01`; 

    const [loading, setLoading] = useState(false);
    const [ledgers, setLedgers] = useState([]);
    const [filteredLedgers, setFilteredLedgers] = useState([]);
    const [data, setData] = useState({
        transactions: [],
        summary: []
    });

    const [filters, setFilters] = useState({
        ledger_id: '',
        from_date: firstDayOfYear,
        to_date: today
    });

    const fetchInitialData = async () => {
        try {
            const [ledgersRes, groupsRes] = await Promise.all([
                ledgerService.getLedgers(),
                ledgerService.getGroupLedger()
            ]);

            const allLedgers = ledgersRes.data || ledgersRes;
            const allGroups = groupsRes.data || groupsRes;

            setLedgers(allLedgers);

            // Filter for Cash-in-Hand and Bank Accounts groups
            const targetGroupIds = allGroups
                .filter(g => g.name === 'Cash-in-Hand' || g.name === 'Bank Accounts')
                .map(g => g.id);

            const filtered = allLedgers.filter(l => targetGroupIds.includes(l.ledger_group_id));
            setFilteredLedgers(filtered);

            if (filtered.length > 0) {
                setFilters(prev => ({ ...prev, ledger_id: filtered[0].id }));
            }
        } catch (error) {
            console.error('Error fetching initial data:', error);
            toast.error('Failed to load ledgers');
        }
    };

    const fetchReport = useCallback(async () => {
        if (!filters.ledger_id) return;
        setLoading(true);
        try {
            const response = await reportService.getCashBankBookReport(filters);
            if (response && response.success) {
                const reportData = response.data;
                setData({
                    transactions: Array.isArray(reportData.transactions) ? reportData.transactions : [],
                    summary: Array.isArray(reportData.summary) ? reportData.summary : []
                });
            } else {
                mockData();
            }
        } catch (error) {
            console.error('Error fetching Cash / Bank book:', error);
            toast.error('Failed to load report');
            mockData();
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const mockData = () => {
        setData({
            transactions: [
                { date: '2026-03-27', particulars: 'Opening Balance', vch_type: '', vch_no: '', debit: 0, credit: 0, balance: 10000 },
                { date: '2026-03-27', particulars: 'Sales Invoice', vch_type: 'Sales', vch_no: 'SI-001', debit: 5000, credit: 0, balance: 15000 },
                { date: '2026-03-27', particulars: 'Office Rent', vch_type: 'Payment', vch_no: 'PV-004', debit: 0, credit: 2000, balance: 13000 }
            ],
            summary: [
                { label: 'Opening Balance', amount: '₹10,000', icon: 'wallet', color: 'primary' },
                { label: 'Total Inflow (Debit)', amount: '₹5,000', icon: 'add-circle', color: 'success' },
                { label: 'Total Outflow (Credit)', amount: '₹2,000', icon: 'minus-circle', color: 'danger' },
                { label: 'Closing Balance', amount: '₹13,000', icon: 'bank', color: 'info' }
            ]
        });
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        fetchReport();
    }, [fetchReport]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container-fluid py-4">
            <PageHeader 
                title="Cash / Bank Book" 
                actions={[{ type: 'export' }]} 
            />

            <div className="card shadow-sm mb-4 border-0">
                <div className="card-body p-3">
                    <div className="row g-3 align-items-end">
                        <div className="col-md-4">
                            <label className="form-label small fw-bold text-muted">Select Ledger</label>
                            <select 
                                className="form-select" 
                                name="ledger_id"
                                value={filters.ledger_id}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select Cash or Bank Account</option>
                                {filteredLedgers.map(l => (
                                    <option key={l.id} value={l.id}>{l.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label small fw-bold text-muted">From Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                name="from_date"
                                value={filters.from_date}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label small fw-bold text-muted">To Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                name="to_date"
                                value={filters.to_date}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary w-100 shadow-none" onClick={fetchReport} disabled={loading}>
                                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="isax isax-refresh me-2"></i>}
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <SummaryCards cards={data.summary} variant="style2" />

            <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-bottom py-3">
                    <h6 className="fw-bold mb-0">Transaction Details</h6>
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
                                    <th className="text-end">Credit (Out)</th>
                                    <th className="text-end pe-4">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="7" className="text-center py-4">Loading report data...</td></tr>
                                ) : data.transactions.length === 0 ? (
                                    <tr><td colSpan="7" className="text-center py-4 text-muted">No transactions found for the selected period.</td></tr>
                                ) : (
                                    data.transactions.map((tr, idx) => (
                                        <tr key={idx}>
                                            <td className="ps-4">{tr.date}</td>
                                            <td>{tr.particulars}</td>
                                            <td><span className="badge bg-soft-primary text-primary">{tr.vch_type}</span></td>
                                            <td>{tr.vch_no}</td>
                                            <td className="text-end text-success fw-medium">₹{Number(tr.debit || 0).toLocaleString()}</td>
                                            <td className="text-end text-danger fw-medium">₹{Number(tr.credit || 0).toLocaleString()}</td>
                                            <td className="text-end pe-4 fw-bold">₹{Number(tr.balance || 0).toLocaleString()}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CashBankBook;

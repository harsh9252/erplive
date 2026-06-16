import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '../components/common/PageHeader';
import SummaryCards from '../components/common/SummaryCards';
import reportService from '../services/reportService';
import branchService from '../services/branchService';
import { useAuth } from '../components/AuthContext';

const DayBook = () => {
    const { activeCompany } = useAuth();
    const today = new Date().toISOString().split('T')[0];

    const [loading, setLoading] = useState(false);
    const [branches, setBranches] = useState([]);
    const [data, setData] = useState({
        vouchers: [],
        summary: []
    });

    const [filters, setFilters] = useState({
        from_date: today,
        to_date: today,
        branch_id: ''
    });

    const processApiData = (apiVouchers) => {
        let processedVouchers = [];
        (apiVouchers || []).forEach(vch => {
            if (vch.entries && vch.entries.length > 0) {
                vch.entries.forEach(entry => {
                    processedVouchers.push({
                        date: vch.voucher_date || vch.date,
                        particulars: entry.ledger_name || vch.narration || 'Voucher',
                        vch_type: vch.voucher_type || vch.vch_type,
                        vch_no: vch.reference_number || vch.vch_no || `VCH-${vch.id}`,
                        debit: entry.dr_cr === 'DR' ? Number(entry.amount) : 0,
                        credit: entry.dr_cr === 'CR' ? Number(entry.amount) : 0
                    });
                });
            } else {
                processedVouchers.push({
                    date: vch.voucher_date || vch.date,
                    particulars: vch.particulars || vch.narration || 'Voucher',
                    vch_type: vch.voucher_type || vch.vch_type,
                    vch_no: vch.reference_number || vch.vch_no || `VCH-${vch.id}`,
                    debit: Number(vch.debit || 0),
                    credit: Number(vch.credit || 0)
                });
            }
        });

        const totalIn = processedVouchers.reduce((acc, curr) => acc + curr.debit, 0);
        const totalOut = processedVouchers.reduce((acc, curr) => acc + curr.credit, 0);

        return {
            vouchers: processedVouchers,
            summary: [
                { label: 'Total Entries', amount: processedVouchers.length.toString(), icon: 'note-text', color: 'primary' },
                { label: 'Total Debit (In)', amount: '₹' + totalIn.toLocaleString('en-IN'), icon: 'add-circle', color: 'success' },
                { label: 'Total Credit (Out)', amount: '₹' + totalOut.toLocaleString('en-IN'), icon: 'minus-circle', color: 'danger' },
                { label: 'Net Day Balance', amount: '₹' + Math.abs(totalIn - totalOut).toLocaleString('en-IN'), icon: 'wallet-3', color: 'info' }
            ]
        };
    };

    const fetchReport = useCallback(async () => {
        setLoading(true);
        try {
            const apiParams = {
                ...filters,
                branchId: filters.branch_id
            };
            const response = await reportService.getDayBookReport(apiParams);
            const reportData = response.data || response;
            
            if (reportData && reportData.vouchers) {
                setData(processApiData(Array.isArray(reportData.vouchers) ? reportData.vouchers : []));
            } else if (Array.isArray(reportData)) {
                setData(processApiData(reportData));
            } else {
                setData(processApiData([]));
            }
        } catch (error) {
            console.error('Error fetching Day Book:', error);
            toast.error('Failed to load report');
            setData(processApiData([]));
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        const loadBranches = async () => {
            try {
                const res = await branchService.getBranches();
                setBranches(res.data || []);
                setFilters(prev => ({ ...prev, branch_id: '' }));
            } catch (err) {
                console.error("Failed to load branches", err);
            }
        };
        loadBranches();
    }, [activeCompany?.id]);

    useEffect(() => {
        fetchReport();
    }, [fetchReport, activeCompany?.id]);

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleDownloadExcel = async () => {
        try {
            const { utils, writeFile } = await import('xlsx');
            const exportData = data.vouchers.map(vch => ({
                'Date': vch.date,
                'Particulars': vch.particulars,
                'Vch Type': vch.vch_type,
                'Vch No': vch.vch_no,
                'Debit (In)': vch.debit,
                'Credit (Out)': vch.credit
            }));
            const ws = utils.json_to_sheet(exportData);
            const wb = utils.book_new();
            utils.book_append_sheet(wb, ws, "Day Book");
            writeFile(wb, `Day_Book.xlsx`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to export Excel");
        }
    };

    const handleDownloadPDF = async () => {
        try {
            const jspdfModule = await import('jspdf');
            const jsPDF = jspdfModule.default || jspdfModule.jsPDF || jspdfModule;
            const autotableModule = await import('jspdf-autotable');
            const autoTable = autotableModule.default || autotableModule;
            
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text('Day Book', 14, 15);
            doc.setFontSize(10);
            doc.text(`Period: ${filters.from_date} to ${filters.to_date}`, 14, 22);

            const tableColumns = ["Date", "Particulars", "Vch Type", "Vch No", "Debit (In)", "Credit (Out)"];
            const tableRows = data.vouchers.map(vch => [
                vch.date,
                vch.particulars,
                vch.vch_type,
                vch.vch_no,
                `Rs. ${Number(vch.debit || 0).toLocaleString('en-IN')}`,
                `Rs. ${Number(vch.credit || 0).toLocaleString('en-IN')}`
            ]);

            autoTable(doc, {
                startY: 28,
                head: [tableColumns],
                body: tableRows,
                theme: 'grid',
                headStyles: { fillColor: [62, 121, 247] }
            });

            doc.save(`Day_Book.pdf`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to export PDF");
        }
    };

    return (
        <div className="container-fluid py-4">
            <PageHeader 
                title="Day Book" 
                actions={[{ type: 'export', onDownloadPDF: handleDownloadPDF, onDownloadExcel: handleDownloadExcel }]} 
            />

            <div className="card shadow-sm mb-4 border-0">
                <div className="card-body p-3">
                    <div className="row g-3 align-items-end">
                        <div className="col-md-3">
                            <label className="form-label small fw-bold text-muted">Branch</label>
                            <select 
                                className="form-select shadow-none" 
                                name="branch_id"
                                value={filters.branch_id}
                                onChange={handleDateChange}
                            >
                                <option value="">All Branches</option>
                                {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label small fw-bold text-muted">From Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                name="from_date"
                                value={filters.from_date}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label small fw-bold text-muted">To Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                name="to_date"
                                value={filters.to_date}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary w-100 shadow-none h-100 py-2" onClick={fetchReport} disabled={loading}>
                                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="isax isax-refresh me-2"></i>}
                                Refresh
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

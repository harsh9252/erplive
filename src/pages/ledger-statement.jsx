import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageHeader from '../components/common/PageHeader';
import { ledgerService } from '../services/ledgerService';
import reportService from '../services/reportService';
import branchService from '../services/branchService';
import { financialYearService } from '../services/financialYearService';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuth } from '../components/AuthContext';

const LedgerStatement = () => {
    const { activeCompany } = useAuth();
    const { id } = useParams();
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const [loading, setLoading] = useState(true);
    const [ledger, setLedger] = useState(null);
    const [entries, setEntries] = useState([]);
    const [openingBalance, setOpeningBalance] = useState(0);
    const [openingBalanceType, setOpeningBalanceType] = useState('DR');
    const [filters, setFilters] = useState({
        from_date: firstDay.toISOString().split('T')[0],
        to_date: today.toISOString().split('T')[0],
        branch_id: ''
    });
    const [branches, setBranches] = useState([]);

    // Modal state for entry detail
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [showEntryModal, setShowEntryModal] = useState(false);

    const fetchStatement = useCallback(async (forceRefresh = false) => {
        setLoading(true);
        try {
            // First get ledger info if not already loaded or if force refresh requested
            if (!ledger || forceRefresh) {
                const [ledgerResp, branchResp] = await Promise.all([
                    ledgerService.getLedger(id),
                    branchService.getBranches()
                ]);
                setLedger(ledgerResp.data || ledgerResp);
                setBranches(branchResp.data || []);
            }

            const apiParams = {
                ...filters,
                branchId: filters.branch_id
            };
            const response = await reportService.getLedgerReport(id, apiParams);
            console.log('Ledger Report API Response:', response);
            
            const reportData = response.data || response;
            
            if (reportData && (reportData.transactions !== undefined || reportData.entries !== undefined || Array.isArray(reportData))) {
                const rawEntries = reportData.transactions || reportData.entries || (Array.isArray(reportData) ? reportData : []);

                // Map voucher number prefix → readable voucher type label
                const prefixToType = {
                    'JNL': 'Journal', 'JV':  'Journal',
                    'CTR': 'Contra',  'CON': 'Contra',
                    'PV':  'Payment', 'PMT': 'Payment', 'PAY': 'Payment',
                    'RV':  'Receipt', 'RCT': 'Receipt', 'REC': 'Receipt',
                    'SLS': 'Sales',   'INV': 'Sales Invoice', 'SI': 'Sales Invoice',
                    'PUR': 'Purchase','PI':  'Purchase Invoice',
                    'CN':  'Credit Note', 'CRN': 'Credit Note',
                    'DN':  'Debit Note',  'DBN': 'Debit Note',
                    'STK': 'Stock',   'ADJ': 'Adjustment',
                };
                const getTypeFromVchNo = (vchNo) => {
                    if (!vchNo) return '';
                    const prefix = vchNo.split('/')[0].toUpperCase();
                    return prefixToType[prefix] || prefix;
                };

                // Normalize API field names to what the UI expects
                const normalizedEntries = (Array.isArray(rawEntries) ? rawEntries : []).map(entry => {
                    const vch_no = entry.vch_no || entry.voucher_number || entry.voucherNumber || '';
                    const vch_type = entry.vch_type || entry.voucher_type || entry.type || getTypeFromVchNo(vch_no);
                    
                    // Build particulars from every known field name the backend might use
                    const particulars =
                        entry.particulars ||
                        entry.ledger_name ||
                        entry.contra_ledger_name ||
                        entry.against_ledger ||
                        entry.contra_ledger ||
                        entry.account_name ||
                        entry.against_account ||
                        entry.ledger?.name ||
                        entry.contra?.name ||
                        entry.account?.name ||
                        entry.narration ||
                        entry.description ||
                        '';

                    return {
                        ...entry,
                        vch_no,
                        vch_type,
                        particulars,
                        narration: entry.narration || entry.description || '',
                        running_balance: entry.running_balance !== undefined
                            ? entry.running_balance
                            : entry.balance !== undefined
                                ? (entry.balance_type === 'CR' ? -Math.abs(entry.balance) : Math.abs(entry.balance))
                                : 0,
                        debit: Number(entry.debit || 0),
                        credit: Number(entry.credit || 0),
                    };
                });

                // Debug: log first entry keys to help identify the correct field name
                if (normalizedEntries.length > 0) {
                    console.log('First entry keys:', Object.keys(rawEntries[0]));
                    console.log('First entry sample:', rawEntries[0]);
                    console.log('Resolved particulars:', normalizedEntries[0].particulars);
                }

                setEntries(normalizedEntries);
                
                // Use opening balance from report's ledger object, or fallback to root properties or generic ledger state
                const opBal = reportData.ledger?.opening_balance !== undefined ? reportData.ledger.opening_balance : 
                             (reportData.opening_balance !== undefined ? reportData.opening_balance : 
                             (reportData.openingBalance !== undefined ? reportData.openingBalance : 
                             (ledger?.opening_balance || 0)));
                const opBalType = reportData.ledger?.opening_balance_type !== undefined ? reportData.ledger.opening_balance_type : 
                                 (reportData.balance_type !== undefined ? reportData.balance_type : 
                             (ledger?.balance_type || 'DR'));
                setOpeningBalance(Number(opBal));
                setOpeningBalanceType(opBalType ? opBalType.toUpperCase() : 'DR');
            } else {
                setEntries([]);
                if (ledger) {
                    setOpeningBalance(Number(ledger.opening_balance || 0));
                    setOpeningBalanceType(ledger.balance_type ? ledger.balance_type.toUpperCase() : 'DR');
                }
            }
        } catch (error) {
            console.error('Error fetching statement:', error);
            // toast.error('Failed to load ledger transactions');
            setEntries([]);
            if (ledger) {
                setOpeningBalance(Number(ledger.opening_balance || 0));
                setOpeningBalanceType(ledger.balance_type ? ledger.balance_type.toUpperCase() : 'DR');
            }
        } finally {
            setLoading(false);
        }
    }, [id, filters, ledger]);

    const generateMockData = () => {
        setOpeningBalance(5000);
        setOpeningBalanceType('DR');
        setEntries([
            { date: '2026-04-05', vch_type: 'Payment', vch_no: 'PV-001', particulars: 'Office Rent', debit: 0, credit: 2000 },
            { date: '2026-04-10', vch_type: 'Receipt', vch_no: 'RV-005', particulars: 'Cash Received', debit: 3500, credit: 0 },
            { date: '2026-04-15', vch_type: 'Journal', vch_no: 'JV-012', particulars: 'Adjustment Entry', debit: 0, credit: 500 },
        ]);
    };

    useEffect(() => {
        // Reset local cache when company changes
        setLedger(null);
        setBranches([]);
        setFilters(prev => ({ ...prev, branch_id: '' }));
    }, [activeCompany?.id]);

    // Load active financial year dates on mount
    useEffect(() => {
        const loadFYDates = async () => {
            try {
                const res = await financialYearService.getFinancialYears();
                const years = res.data || [];
                const savedId = localStorage.getItem('activeFinancialYearId');
                let activeFY = years.find(fy => fy.is_active);
                if (savedId) activeFY = years.find(fy => String(fy.id) === String(savedId)) || activeFY;
                if (activeFY) {
                    const todayStr = new Date().toISOString().split('T')[0];
                    const toDate = (todayStr >= activeFY.start_date && todayStr <= activeFY.end_date) ? todayStr : activeFY.end_date;
                    setFilters(prev => ({ ...prev, from_date: activeFY.start_date, to_date: toDate }));
                }
            } catch (e) {
                console.error('Could not load financial year:', e);
            }
        };
        loadFYDates();
    }, [activeCompany?.id]);

    useEffect(() => {
        fetchStatement();
    }, [fetchStatement, activeCompany?.id]);

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const calculateRunningBalance = () => {
        // If the backend API already provides running_balance, use it natively
        if (entries.length > 0 && entries[0].running_balance !== undefined) {
            return entries;
        }

        let balance = openingBalanceType === 'CR' ? -Math.abs(openingBalance) : Math.abs(openingBalance);
        return entries.map(entry => {
            balance = balance + Number(entry.debit || 0) - Number(entry.credit || 0);
            return { ...entry, running_balance: balance };
        });
    };

    const dataWithBalance = calculateRunningBalance();
    const finalBalance = dataWithBalance.length > 0 
        ? dataWithBalance[dataWithBalance.length - 1].running_balance 
        : (openingBalanceType === 'CR' ? -Math.abs(openingBalance) : Math.abs(openingBalance));

    const periodDebits = entries.reduce((sum, v) => sum + Number(v.debit || 0), 0);
    const periodCredits = entries.reduce((sum, v) => sum + Number(v.credit || 0), 0);
    const periodDiff = periodDebits - periodCredits;

    const exportToExcel = () => {
        const worksheetData = [
            ['Ledger Statement'],
            [`Ledger: ${ledger?.name || 'N/A'}`],
            [`Period: ${filters.from_date} to ${filters.to_date}`],
            [],
            ['Date', 'Vch Type', 'Vch No', 'Particulars', 'Debit', 'Credit', 'Balance'],
            ['Opening Balance', '', '', '', openingBalanceType === 'DR' ? openingBalance.toFixed(2) : '', openingBalanceType === 'CR' ? openingBalance.toFixed(2) : '', `${Math.abs(openingBalance).toFixed(2)} ${openingBalanceType === 'DR' ? 'Dr' : 'Cr'}`],
            ...dataWithBalance.map(row => [
                row.date, 
                row.vch_type, 
                row.vch_no, 
                row.particulars, 
                row.debit || 0, 
                row.credit || 0, 
                `${Math.abs(row.running_balance).toFixed(2)} ${row.running_balance >= 0 ? 'Dr' : 'Cr'}`
            ]),
            ['Closing Balance', '', '', '', '', '', `${Math.abs(finalBalance).toFixed(2)} ${finalBalance >= 0 ? 'Dr' : 'Cr'}`]
        ];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(wb, ws, 'Ledger Statement');
        XLSX.writeFile(wb, `Ledger_Statement_${ledger?.name || 'Report'}.xlsx`);
        toast.success('Excel exported successfully');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text(`Ledger Statement: ${ledger?.name || 'N/A'}`, 14, 15);
        doc.setFontSize(10);
        doc.text(`Period: ${filters.from_date} to ${filters.to_date}`, 14, 22);

        const tableColumn = ["Date", "Type", "Vch No", "Particulars", "Debit", "Credit", "Balance"];
        const tableRows = [
            ['', '', '', 'Opening Balance', openingBalanceType === 'DR' ? openingBalance.toFixed(2) : '', openingBalanceType === 'CR' ? openingBalance.toFixed(2) : '', `${Math.abs(openingBalance).toFixed(2)} ${openingBalanceType === 'DR' ? 'Dr' : 'Cr'}`],
            ...dataWithBalance.map(row => [
                row.date,
                row.vch_type,
                row.vch_no,
                row.particulars,
                (row.debit || 0).toFixed(2),
                (row.credit || 0).toFixed(2),
                `${Math.abs(row.running_balance).toFixed(2)} ${row.running_balance >= 0 ? 'Dr' : 'Cr'}`
            ]),
            ['', '', '', 'Closing Balance', '', '', `${Math.abs(finalBalance).toFixed(2)} ${finalBalance >= 0 ? 'Dr' : 'Cr'}`]
        ];

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            theme: 'striped',
            headStyles: { fillColor: [63, 81, 181] }
        });

        doc.save(`Ledger_Statement_${ledger?.name || 'Report'}.pdf`);
        toast.success('PDF exported successfully');
    };

    const getTransactionLink = (vch) => {
        const id = vch.vch_id || vch.id || vch.voucher_id || vch.entity_id;
        if (!id) return null;
        
        const type = (vch.vch_type || '').toLowerCase();
        
        if (type.includes('sale') || type.includes('invoice')) {
            return `/invoicing/sales/${id}`;
        }
        if (type.includes('purchase')) {
            return `/invoicing/purchases/${id}`;
        }
        if (type.includes('credit note')) {
            return `/invoicing/credit-notes/${id}`;
        }
        if (type.includes('debit note')) {
            return `/invoicing/debit-notes/${id}`;
        }
        if (type.includes('receipt')) {
            // Check if there is a specific receipt route, otherwise use vouchers
            return `/accounting/vouchers/edit/${id}`;
        }
        
        // Default to standard accounting vouchers
        return `/accounting/vouchers/edit/${id}`;
    };

    return (
        <>
        <div className="container-fluid py-4">
            <PageHeader 
                title={`Ledger Statement: ${ledger?.name || 'Loading...'}`} 
                actions={[
                    { type: 'button', label: 'PDF', icon: 'isax isax-document-download', variant: 'soft-danger', onClick: exportToPDF },
                    { type: 'button', label: 'Excel', icon: 'isax isax-export-1', variant: 'soft-success', onClick: exportToExcel }
                ]} 
            />

            <div className="card shadow-sm mb-4 border-0">
                <div className="card-body p-3">
                    <div className="row g-3 align-items-end">
                        <div className="col-md-3">
                            <label className="form-label small fw-bold text-muted text-uppercase">Branch</label>
                            <select className="form-select shadow-none" name="branch_id" value={filters.branch_id} onChange={handleDateChange}>
                                <option value="">All Branches</option>
                                {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label small fw-bold text-muted text-uppercase">From Date</label>
                            <input type="date" className="form-control shadow-none" name="from_date" value={filters.from_date} onChange={handleDateChange} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label small fw-bold text-muted text-uppercase">To Date</label>
                            <input type="date" className="form-control shadow-none" name="to_date" value={filters.to_date} onChange={handleDateChange} />
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary w-100 shadow-none py-2" onClick={() => fetchStatement(true)} disabled={loading}>
                                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="isax isax-refresh me-2"></i>}
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card bg-soft-primary border-0 shadow-sm">
                        <div className="card-body py-3">
                            <label className="fs-12 text-uppercase text-primary fw-bold mb-1">Opening Balance</label>
                            <h4 className="mb-0 fw-bold">₹{Math.abs(openingBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="fs-14 fw-medium text-muted">{openingBalanceType === 'DR' ? 'Dr' : 'Cr'}</span></h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-soft-info border-0 shadow-sm">
                        <div className="card-body py-3">
                            <label className="fs-12 text-uppercase text-info fw-bold mb-1">Period Transactions</label>
                            <h4 className="mb-0 fw-bold">₹{Math.abs(periodDiff).toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="fs-14 fw-medium text-muted">{periodDiff >= 0 ? 'Dr' : 'Cr'}</span></h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-soft-success border-0 shadow-sm">
                        <div className="card-body py-3">
                            <label className="fs-12 text-uppercase text-success fw-bold mb-1">Closing Balance</label>
                            <h4 className="mb-0 fw-bold">₹{Math.abs(finalBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="fs-14 fw-medium text-muted">{finalBalance >= 0 ? 'Dr' : 'Cr'}</span></h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm border-0 overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light fs-11 text-uppercase fw-bold text-muted">
                            <tr>
                                <th className="ps-4">Date</th>
                                <th>Particulars</th>
                                <th>Vch Type</th>
                                <th>Vch No</th>
                                <th className="text-end">Debit</th>
                                <th className="text-end">Credit</th>
                                <th className="text-end">Balance</th>
                                <th className="text-end pe-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-soft-light">
                                <td colSpan="4" className="ps-4 fw-bold">Opening Balance</td>
                                <td className="text-end fw-bold text-success">{openingBalanceType === 'DR' && openingBalance > 0 ? `₹${Math.abs(openingBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '-'}</td>
                                <td className="text-end fw-bold text-danger">{openingBalanceType === 'CR' && openingBalance > 0 ? `₹${Math.abs(openingBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '-'}</td>
                                <td className="text-end fw-bold text-dark">₹{Math.abs(openingBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-muted fs-12">{openingBalanceType === 'DR' ? 'Dr' : 'Cr'}</span></td>
                                <td></td>
                            </tr>
                            {loading ? (
                                <tr><td colSpan="7" className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary"></div></td></tr>
                            ) : dataWithBalance.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-5 text-muted">No transactions found for the selected period.</td></tr>
                            ) : (
                                dataWithBalance.map((vch, idx) => (
                                    <tr key={idx}>
                                        <td className="ps-4 fs-13">{vch.date}</td>
                                        <td>
                                            <div className="fw-bold text-dark">
                                                {vch.particulars || vch.narration || '-'}
                                            </div>
                                            {vch.narration && vch.narration !== vch.particulars && (
                                                <div className="small text-muted mt-1">{vch.narration}</div>
                                            )}
                                        </td>
                                        <td><span className="badge bg-soft-secondary text-secondary px-2">{vch.vch_type}</span></td>
                                        <td>
                                            <span className="fw-medium fs-13 text-primary">
                                                {vch.vch_no || '-'}
                                            </span>
                                        </td>
                                        <td className="text-end text-success fw-medium">{vch.debit > 0 ? `₹${Number(vch.debit).toLocaleString()}` : '-'}</td>
                                        <td className="text-end text-danger fw-medium">{vch.credit > 0 ? `₹${Number(vch.credit).toLocaleString()}` : '-'}</td>
                                        <td className="text-end fw-bold">₹{Math.abs(vch.running_balance).toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-muted fs-12">{vch.running_balance >= 0 ? 'Dr' : 'Cr'}</span></td>
                                        <td className="text-end pe-4">
                                            <button
                                                className="btn btn-sm btn-soft-primary btn-icon rounded-circle"
                                                title="View Entry Details"
                                                onClick={() => { setSelectedEntry(vch); setShowEntryModal(true); }}
                                            >
                                                <i className="isax isax-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        {!loading && dataWithBalance.length > 0 && (
                            <tfoot className="bg-light fw-bold border-top">
                                <tr>
                                    <td colSpan="4" className="ps-4 text-uppercase fs-11">Total / Closing</td>
                                    <td className="text-end text-success">₹{periodDebits.toLocaleString()}</td>
                                    <td className="text-end text-danger">₹{periodCredits.toLocaleString()}</td>
                                    <td className="text-end text-dark fs-15">₹{Math.abs(finalBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="fs-12 text-muted">{finalBalance >= 0 ? 'Dr' : 'Cr'}</span></td>
                                    <td className="pe-4"></td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>
        </div>

        {/* Entry Detail Modal */}
        {showEntryModal && selectedEntry && (
            <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                        <div className="modal-header border-0 bg-primary text-white py-3">
                            <h5 className="modal-title fw-bold">
                                <i className="isax isax-document-text me-2"></i>
                                Transaction Details
                            </h5>
                            <button type="button" className="btn-close btn-close-white" onClick={() => setShowEntryModal(false)}></button>
                        </div>
                        <div className="modal-body p-4">
                            <div className="row g-3">
                                <div className="col-6">
                                    <label className="text-muted fs-11 fw-bold text-uppercase">Date</label>
                                    <div className="fw-semibold fs-14">{selectedEntry.date || '-'}</div>
                                </div>
                                <div className="col-6">
                                    <label className="text-muted fs-11 fw-bold text-uppercase">Voucher Type</label>
                                    <div><span className="badge bg-soft-primary text-primary px-2 py-1">{selectedEntry.vch_type || '-'}</span></div>
                                </div>
                                <div className="col-6">
                                    <label className="text-muted fs-11 fw-bold text-uppercase">Voucher No</label>
                                    <div className="fw-bold fs-15 text-primary">{selectedEntry.vch_no || '-'}</div>
                                </div>
                                <div className="col-6">
                                    <label className="text-muted fs-11 fw-bold text-uppercase">Reference</label>
                                    <div className="fw-semibold fs-14">{selectedEntry.reference || selectedEntry.ref_no || '-'}</div>
                                </div>
                                <div className="col-12">
                                    <label className="text-muted fs-11 fw-bold text-uppercase">Particulars</label>
                                    <div className="fw-semibold fs-14">{selectedEntry.particulars || '-'}</div>
                                </div>
                                {selectedEntry.narration && (
                                    <div className="col-12">
                                        <label className="text-muted fs-11 fw-bold text-uppercase">Narration</label>
                                        <div className="bg-light rounded-3 p-2 fs-13 text-muted">{selectedEntry.narration}</div>
                                    </div>
                                )}
                                <div className="col-12"><hr className="my-1" /></div>
                                <div className="col-6">
                                    <label className="text-muted fs-11 fw-bold text-uppercase">Debit</label>
                                    <div className="fw-bold fs-16 text-success">{selectedEntry.debit > 0 ? `₹${Number(selectedEntry.debit).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '-'}</div>
                                </div>
                                <div className="col-6">
                                    <label className="text-muted fs-11 fw-bold text-uppercase">Credit</label>
                                    <div className="fw-bold fs-16 text-danger">{selectedEntry.credit > 0 ? `₹${Number(selectedEntry.credit).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '-'}</div>
                                </div>
                                <div className="col-12">
                                    <label className="text-muted fs-11 fw-bold text-uppercase">Running Balance</label>
                                    <div className="fw-bold fs-16">
                                        ₹{Math.abs(selectedEntry.running_balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        <span className={`ms-2 fs-12 ${selectedEntry.running_balance >= 0 ? 'text-success' : 'text-danger'}`}>
                                            {selectedEntry.running_balance >= 0 ? 'Dr' : 'Cr'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top p-3 bg-light d-flex justify-content-between">
                            {getTransactionLink(selectedEntry) ? (
                                <Link
                                    to={getTransactionLink(selectedEntry)}
                                    className="btn btn-primary rounded-pill px-4"
                                    onClick={() => setShowEntryModal(false)}
                                >
                                    <i className="isax isax-export-2 me-2"></i>Open Full Entry
                                </Link>
                            ) : <span></span>}
                            <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowEntryModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default LedgerStatement;

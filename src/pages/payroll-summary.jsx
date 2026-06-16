import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPayrollSummaryReport } from '../services/reportService';

const PayrollSummaryReport = () => {
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7); // YYYY-MM
    
    const [loading, setLoading] = useState(true);
    const [payslips, setPayslips] = useState([]);
    const [totals, setTotals] = useState({ gross_salary: 0, net_salary: 0, total_pf: 0, total_esi: 0, total_tds: 0, headcount: 0 });
    const [month, setMonth] = useState(currentMonth);

    const fetchSummary = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getPayrollSummaryReport({ salary_month: month });
            if (response.success && response.data) {
                setPayslips(response.data.payslips || []);
                const apiTotals = response.data.totals || {};
                setTotals({
                    gross_salary: apiTotals.gross_earnings || 0,
                    net_salary: apiTotals.net_pay || 0,
                    total_pf: apiTotals.pf_employee || 0,
                    total_esi: apiTotals.esi_employee || 0,
                    total_tds: apiTotals.professional_tax || 0,
                    headcount: response.data.employee_count || 0
                });
            } else {
                setPayslips([]);
            }
        } catch (error) {
            console.error('Error fetching payroll summary:', error);
            toast.error('Failed to load payroll summary');
            setPayslips([]);
        } finally {
            setLoading(false);
        }
    }, [month]);

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(amount || 0);
    };

    const downloadExcel = async () => {
        if (!payslips || payslips.length === 0) {
            toast.error("No data to export.");
            return;
        }
        try {
            const { utils, writeFile } = await import('xlsx');
            
            const exportData = payslips.map(slip => ({
                'Employee': slip.employee_name || 'Unknown',
                'Employee Code': slip.employee_code || `#${slip.employee_id}`,
                'Basic Salary': slip.basic_salary || 0,
                'HRA': slip.hra || 0,
                'Other Allowances': slip.other_allowances || 0,
                'Gross Salary': slip.gross_salary || 0,
                'PF': slip.pf_employee || 0,
                'ESI': slip.esi_employee || 0,
                'TDS': slip.tds || 0,
                'Net Payable': slip.net_salary || 0
            }));

            // Add totals row
            exportData.push({
                'Employee': 'TOTAL',
                'Gross Salary': totals.gross_salary || 0,
                'PF': totals.total_pf || 0,
                'ESI': totals.total_esi || 0,
                'TDS': totals.total_tds || 0,
                'Net Payable': totals.net_salary || 0
            });

            const ws = utils.json_to_sheet(exportData);
            const wb = utils.book_new();
            utils.book_append_sheet(wb, ws, "Payroll Summary");
            writeFile(wb, `payroll_summary_${month}.xlsx`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to export Excel");
        }
    };

    const downloadPDF = async () => {
        if (!payslips || payslips.length === 0) {
            toast.error("No data to export.");
            return;
        }
        try {
            const jspdfModule = await import('jspdf');
            const jsPDF = jspdfModule.default || jspdfModule.jsPDF || jspdfModule;
            const autotableModule = await import('jspdf-autotable');
            const autoTable = autotableModule.default || autotableModule;
            
            const doc = new jsPDF('landscape');
            doc.setFontSize(16);
            doc.text('Payroll Summary Report', 14, 15);
            doc.setFontSize(10);
            doc.text(`Month: ${month}`, 14, 22);

            const tableColumns = [
                'Employee', 'Basic Salary', 'HRA', 'Other Allowances', 
                'Gross Salary', 'PF', 'ESI', 'TDS', 'Net Payable'
            ];
            
            const tableRows = payslips.map(slip => [
                `${slip.employee_name || 'Unknown'} (${slip.employee_code || `#${slip.employee_id}`})`,
                formatCurrency(slip.basic_salary).replace('₹', 'Rs. '),
                formatCurrency(slip.hra).replace('₹', 'Rs. '),
                formatCurrency(slip.other_allowances).replace('₹', 'Rs. '),
                formatCurrency(slip.gross_salary).replace('₹', 'Rs. '),
                formatCurrency(slip.pf_employee).replace('₹', 'Rs. '),
                formatCurrency(slip.esi_employee).replace('₹', 'Rs. '),
                formatCurrency(slip.tds).replace('₹', 'Rs. '),
                formatCurrency(slip.net_salary).replace('₹', 'Rs. ')
            ]);

            // Total row
            tableRows.push([
                'TOTAL',
                '', '', '',
                formatCurrency(totals.gross_salary).replace('₹', 'Rs. '),
                formatCurrency(totals.total_pf).replace('₹', 'Rs. '),
                formatCurrency(totals.total_esi).replace('₹', 'Rs. '),
                formatCurrency(totals.total_tds).replace('₹', 'Rs. '),
                formatCurrency(totals.net_salary).replace('₹', 'Rs. ')
            ]);

            autoTable(doc, {
                startY: 28,
                head: [tableColumns],
                body: tableRows,
                theme: 'grid',
                headStyles: { fillColor: [62, 121, 247] }
            });

            doc.save(`payroll_summary_${month}.pdf`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to export PDF");
        }
    };

    return (
        <div className="container-fluid py-4 text-dark">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                <div>
                    <h4 className="fw-bold mb-1">Payroll Summary Report</h4>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 fs-13">
                            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item">Reports</li>
                            <li className="breadcrumb-item active text-primary">Payroll Summary</li>
                        </ol>
                    </nav>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <input 
                        type="month" 
                        className="form-control shadow-none w-auto" 
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    />
                    <button className="btn btn-primary d-flex align-items-center" onClick={fetchSummary}>
                        <i className="isax isax-refresh me-2"></i> Refresh
                    </button>
                    <div className="dropdown">
                        <button 
                            className="btn btn-outline-primary d-flex align-items-center" 
                            data-bs-toggle="dropdown"
                            data-bs-display="static"
                        >
                            <i className="isax isax-document-download me-2"></i> Export
                        </button>
                        <ul className="dropdown-menu border-0 shadow" style={{ position: 'absolute', right: 0, left: 'auto', transform: 'translateX(-30px)', top: '100%', marginTop: '5px', minWidth: '160px' }}>
                            <li><button className="dropdown-item py-2 border-0 bg-transparent" onClick={downloadPDF}>Download PDF</button></li>
                            <li><button className="dropdown-item py-2 border-0 bg-transparent" onClick={downloadExcel}>Download Excel</button></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Gross Salary', value: totals.gross_salary, color: 'primary', icon: 'money-recive' },
                    { label: 'Total Net Payable', value: totals.net_salary, color: 'success', icon: 'wallet-check' },
                    { label: 'Headcount', value: totals.headcount, color: 'info', icon: 'profile-2user', isCurrency: false }
                ].map((stat, idx) => (
                    <div className="col-md-4" key={idx}>
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <span className={`badge bg-soft-${stat.color} text-${stat.color} p-2 rounded-circle`}>
                                        <i className={`isax isax-${stat.icon} fs-24`}></i>
                                    </span>
                                </div>
                                <h4 className="fw-bold mb-1">{stat.isCurrency === false ? stat.value : formatCurrency(stat.value)}</h4>
                                <p className="text-muted small mb-0 fw-semibold text-uppercase">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header bg-white py-3 border-bottom">
                    <h6 className="mb-0 fw-bold">Employee Wise Breakdown - {month}</h6>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light text-nowrap">
                                <tr>
                                    <th className="ps-4">Employee</th>
                                    <th className="text-end">Basic Salary</th>
                                    <th className="text-end">HRA</th>
                                    <th className="text-end">Other Allowances</th>
                                    <th className="text-end fw-bold">Gross Salary</th>
                                    <th className="text-end text-danger">PF</th>
                                    <th className="text-end text-danger">ESI</th>
                                    <th className="text-end text-danger">TDS</th>
                                    <th className="text-end pe-4 fw-bold text-success">Net Payable</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="9" className="text-center py-5"><div className="spinner-border text-primary"></div><p className="text-muted mt-2">Loading...</p></td></tr>
                                ) : payslips.length === 0 ? (
                                    <tr><td colSpan="9" className="text-center py-5 text-muted"><i className="isax isax-document-text fs-1 d-block mb-3"></i>No payslips found for {month}.</td></tr>
                                ) : (
                                    payslips.map((slip) => (
                                        <tr key={slip.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar avatar-sm bg-light-primary text-primary rounded-circle me-2 d-flex align-items-center justify-content-center">
                                                        {slip.employee_name?.charAt(0) || 'E'}
                                                    </div>
                                                    <div>
                                                        <span className="fw-medium d-block">{slip.employee_name || 'Unknown'}</span>
                                                        <span className="small text-muted">{slip.employee_code || `#${slip.employee_id}`}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-end">{formatCurrency(slip.basic_salary)}</td>
                                            <td className="text-end">{formatCurrency(slip.hra)}</td>
                                            <td className="text-end">{formatCurrency(slip.other_allowances)}</td>
                                            <td className="text-end fw-semibold">{formatCurrency(slip.gross_salary)}</td>
                                            <td className="text-end text-danger">{formatCurrency(slip.pf_employee)}</td>
                                            <td className="text-end text-danger">{formatCurrency(slip.esi_employee)}</td>
                                            <td className="text-end text-danger">{formatCurrency(slip.tds)}</td>
                                            <td className="text-end pe-4 fw-bold text-success">{formatCurrency(slip.net_salary)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                            {!loading && payslips.length > 0 && (
                                <tfoot className="table-light fw-bold text-nowrap">
                                    <tr>
                                        <td className="ps-4 text-uppercase">Total</td>
                                        <td colSpan="3"></td>
                                        <td className="text-end">{formatCurrency(totals.gross_salary)}</td>
                                        <td className="text-end text-danger">{formatCurrency(totals.total_pf)}</td>
                                        <td className="text-end text-danger">{formatCurrency(totals.total_esi)}</td>
                                        <td className="text-end text-danger">{formatCurrency(totals.total_tds)}</td>
                                        <td className="text-end pe-4 text-success">{formatCurrency(totals.net_salary)}</td>
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

export default PayrollSummaryReport;

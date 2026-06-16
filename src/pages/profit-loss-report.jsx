import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfitLossReport } from '../services/reportService';
import branchService from '../services/branchService';
import { useAuth } from '../components/AuthContext';
import { toast } from 'react-toastify';

const initialData = [
  { id: 1, type: "header", name: "Income" },
  { id: 2, type: "data", name: "Stripe Sales", jan: "25,750", feb: "25,750", mar: "25,750", apr: "25,750", may: "25,750", total: "25,750" },
  { id: 3, type: "data", name: "Service", jan: "50,125", feb: "50,125", mar: "50,125", apr: "50,125", may: "50,125", total: "50,125" },
  { id: 4, type: "data", name: "Purchase Return", jan: "75,900", feb: "75,900", mar: "75,900", apr: "75,900", may: "75,900", total: "75,900" },
  { id: 5, type: "summary", name: "Gross Profit", jan: "151,775", feb: "151,775", mar: "151,775", apr: "151,775", may: "151,775", total: "151,775" },
  { id: 6, type: "header", name: "Expense" },
  { id: 7, type: "data", name: "Exchange Gain or Losse", jan: "25,750", feb: "25,750", mar: "25,750", apr: "25,750", may: "25,750", total: "25,750" },
  { id: 8, type: "data", name: "Stripe Fees", jan: "50,125", feb: "50,125", mar: "50,125", apr: "50,125", may: "50,125", total: "50,125" },
  { id: 9, type: "data", name: "Purchase Return", jan: "75,900", feb: "75,900", mar: "75,900", apr: "75,900", may: "75,900", total: "75,900" },
  { id: 10, type: "summary", name: "Total Expense", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", total: "99,999" },
  { id: 11, type: "summary", name: "Net Income", jan: "2,69,276", feb: "2,75,638", mar: "2,51,629", apr: "7,96,543", may: "2,69,276", total: "2,75,638" },
];

const ProfitLossReport = () => {
  const { activeCompany } = useAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [reportSummary, setReportSummary] = useState({ revenue: 0, expenses: 0, netProfit: 0, label: 'NET PROFIT' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const todayStr = new Date().toISOString().split('T')[0];
  const currentYear = new Date().getFullYear();
  const defaultFromDate = `${new Date().getMonth() < 3 ? currentYear - 1 : currentYear}-04-01`;
  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(todayStr);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branches, setBranches] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const branchRes = await branchService.getBranches();
        setBranches(branchRes.data || []);
        // Reset branch when company changes
        setSelectedBranch('');
      } catch (err) {
        console.error("Failed to load branches", err);
      }
    };
    init();
  }, [activeCompany?.id]);

  useEffect(() => {
    fetchReportData({ from_date: fromDate, to_date: toDate, branch_id: selectedBranch, branchId: selectedBranch });
  }, [fromDate, toDate, selectedBranch, activeCompany?.id]);

  const fetchReportData = async (params = {}) => {
    try {
      const finalParams = {
        from_date: fromDate,
        to_date: toDate,
        ...params
      };
      const response = await getProfitLossReport(finalParams);
      const reportData = response.data || response;
      
      const groupItems = (items, prefix) => {
        const groups = {};
        items.forEach(item => {
          const gn = item.group_name || 'Others';
          if (!groups[gn]) groups[gn] = [];
          groups[gn].push(item);
        });

        let rows = [];
        Object.keys(groups).forEach((gn, gidx) => {
          rows.push({ id: `h-${prefix}-${gidx}`, type: 'sub-header', name: gn });
          groups[gn].forEach((item, idx) => {
            rows.push({
              id: `${prefix}-${gidx}-${idx}`,
              type: 'data',
              name: item.ledger_name || 'Unnamed Ledger',
              total: item.net_amount,
              ...item
            });
          });
        });
        return rows;
      };

      if (reportData.income) {
        setIncomeData(groupItems(reportData.income.items || [], 'inc'));
      } else {
        setIncomeData([]);
      }

      if (reportData.expense) {
        setExpenseData(groupItems(reportData.expense.items || [], 'exp'));
      } else {
        setExpenseData([]);
      }

      setReportSummary({
        revenue: reportData.income?.total || 0,
        expenses: reportData.expense?.total || 0,
        netProfit: reportData.net_profit || 0,
        label: reportData.net_profit_label || 'NET PROFIT'
      });
      
      // Extract dynamic month keys from any first data row found
      const firstDataRow = (reportData.income?.items?.[0]) || (reportData.expense?.items?.[0]);
      if (firstDataRow) {
        const keys = Object.keys(firstDataRow).filter(k => 
          !['id', 'name', 'type', 'total', '_id', 'createdAt', 'updatedAt', 'nature', 'group_name', 'ledger_name', 'net_amount'].includes(k)
        );
        setMonths(keys);
      }
      
      setError(null);
    } catch (err) {
      console.error("Error fetching profit & loss:", err);
      setError("Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val) => {
    if (val === undefined || val === null || val === '-') return '-';
    const num = Number(String(val).replace(/,/g, ''));
    if (isNaN(num)) return '-';
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const filterRows = (rows) => {
    if (!searchText) return rows;
    return rows.filter(item => 
      item.type !== 'sub-header' && 
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredIncome = filterRows(incomeData);
  const filteredExpense = filterRows(expenseData);

  const revenue = reportSummary.revenue;
  const expenses = reportSummary.expenses;
  const netProfit = reportSummary.netProfit;
  const netProfitLabel = reportSummary.label;

  const downloadExcel = async () => {
    try {
      const { utils, writeFile } = await import('xlsx');
      
      const exportData = [];
      
      exportData.push({ Particulars: 'INCOME' });
      filteredIncome.forEach(item => {
        if (item.type === 'sub-header') {
           exportData.push({ Particulars: `  ${item.name}` });
        } else {
           const row = { Particulars: `    ${item.name}` };
           months.forEach(m => row[m] = item[m] || 0);
           row['Total'] = item.total || 0;
           exportData.push(row);
        }
      });
      exportData.push({ Particulars: 'TOTAL INCOME', Total: revenue });
      if (netProfit < 0) exportData.push({ Particulars: 'NET LOSS', Total: Math.abs(netProfit) });

      exportData.push({});

      exportData.push({ Particulars: 'EXPENSES' });
      filteredExpense.forEach(item => {
        if (item.type === 'sub-header') {
           exportData.push({ Particulars: `  ${item.name}` });
        } else {
           const row = { Particulars: `    ${item.name}` };
           months.forEach(m => row[m] = item[m] || 0);
           row['Total'] = item.total || 0;
           exportData.push(row);
        }
      });
      exportData.push({ Particulars: 'TOTAL EXPENSE', Total: expenses });
      if (netProfit > 0) exportData.push({ Particulars: netProfitLabel, Total: netProfit });

      const ws = utils.json_to_sheet(exportData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Profit & Loss");
      writeFile(wb, `profit_loss_${fromDate}_to_${toDate}.xlsx`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to export Excel");
    }
  };

  const downloadPDF = async () => {
    try {
      const jspdfModule = await import('jspdf');
      const jsPDF = jspdfModule.default || jspdfModule.jsPDF || jspdfModule;
      const autotableModule = await import('jspdf-autotable');
      const autoTable = autotableModule.default || autotableModule;
      
      const doc = new jsPDF('landscape');
      doc.setFontSize(16);
      doc.text('Profit & Loss Report', 14, 15);
      doc.setFontSize(10);
      doc.text(`From: ${fromDate} To: ${toDate}`, 14, 22);

      const tableColumns = ['Particulars', ...months.map(m => m.charAt(0).toUpperCase() + m.slice(1)), 'Total'];
      const tableRows = [];
      
      tableRows.push(['INCOME', ...months.map(() => ''), '']);
      filteredIncome.forEach(item => {
        if (item.type === 'sub-header') {
          tableRows.push([`  ${item.name}`, ...months.map(() => ''), '']);
        } else {
          tableRows.push([`    ${item.name}`, ...months.map(m => formatCurrency(item[m]).replace('₹', 'Rs. ')), formatCurrency(item.total).replace('₹', 'Rs. ')]);
        }
      });
      tableRows.push(['TOTAL INCOME', ...months.map(() => ''), formatCurrency(revenue).replace('₹', 'Rs. ')]);
      if (netProfit < 0) tableRows.push(['NET LOSS', ...months.map(() => ''), formatCurrency(Math.abs(netProfit)).replace('₹', 'Rs. ')]);
      
      tableRows.push(['', ...months.map(() => ''), '']);

      tableRows.push(['EXPENSES', ...months.map(() => ''), '']);
      filteredExpense.forEach(item => {
        if (item.type === 'sub-header') {
          tableRows.push([`  ${item.name}`, ...months.map(() => ''), '']);
        } else {
          tableRows.push([`    ${item.name}`, ...months.map(m => formatCurrency(item[m]).replace('₹', 'Rs. ')), formatCurrency(item.total).replace('₹', 'Rs. ')]);
        }
      });
      tableRows.push(['TOTAL EXPENSE', ...months.map(() => ''), formatCurrency(expenses).replace('₹', 'Rs. ')]);
      if (netProfit > 0) tableRows.push([netProfitLabel, ...months.map(() => ''), formatCurrency(netProfit).replace('₹', 'Rs. ')]);

      autoTable(doc, {
        startY: 28,
        head: [tableColumns],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [62, 121, 247] }
      });

      doc.save(`profit_loss_${fromDate}_to_${toDate}.pdf`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to export PDF");
    }
  };

  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0 fw-bold">Profit & Loss Report</h6>
        </div>
        <div className="my-xl-auto">
          <div className="dropdown">
            <button
              className="btn btn-outline-white d-inline-flex align-items-center shadow-none border"
              data-bs-toggle="dropdown"
              data-bs-display="static"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </button>
            <ul className="dropdown-menu border-0 shadow" style={{ position: 'absolute', right: 0, left: 'auto', transform: 'translateX(-100px)', top: '100%', marginTop: '5px', minWidth: '160px' }}>
              <li><button className="dropdown-item py-2 border-0 bg-transparent" onClick={downloadPDF}>Download PDF</button></li>
              <li><button className="dropdown-item py-2 border-0 bg-transparent" onClick={downloadExcel}>Download Excel</button></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-bottom mb-3">
        <div className="row g-3">
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <div className="d-flex bg-soft-primary p-2 rounded-2 align-items-center justify-content-between mb-2">
                  <div>
                    <p className="mb-0 text-muted fs-12">Total Revenue</p>
                    <h5 className="fw-bold mb-0">{formatCurrency(revenue)}</h5>
                  </div>
                  <div className="bg-primary text-white p-2 rounded-circle">
                    <i className="isax isax-receipt-item fs-20"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <div className="d-flex bg-soft-danger p-2 rounded-2 align-items-center justify-content-between mb-2">
                  <div>
                    <p className="mb-0 text-muted fs-12">Total Expenses</p>
                    <h5 className="fw-bold mb-0">{formatCurrency(expenses)}</h5>
                  </div>
                  <div className="bg-danger text-white p-2 rounded-circle">
                    <i className="isax isax-card-send fs-20"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <div className="d-flex bg-soft-success p-2 rounded-2 align-items-center justify-content-between mb-2">
                  <div>
                    <p className="mb-0 text-muted fs-12">Net Profit</p>
                    <h5 className="fw-bold mb-0">{formatCurrency(netProfit)}</h5>
                  </div>
                  <div className="bg-success text-white p-2 rounded-circle">
                    <i className="isax isax-wallet-check fs-20"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <div className="d-flex bg-soft-info p-2 rounded-2 align-items-center justify-content-between mb-2">
                  <div>
                    <p className="mb-0 text-muted fs-12">Profit Margin</p>
                    <h5 className="fw-bold mb-0">
                       {revenue > 0 ? ((netProfit / revenue) * 100).toFixed(2) : '0.00'}%
                    </h5>
                  </div>
                  <div className="bg-info text-white p-2 rounded-circle">
                    <i className="isax isax-graph fs-20"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <div className="input-group" style={{ maxWidth: '250px' }}>
            <span className="input-group-text bg-white border-end-0">
              <i className="isax isax-search-normal fs-14 text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control form-control-sm border-start-0 shadow-none ps-0"
              placeholder="Search by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center gap-2">
            <label className="fs-12 text-muted mb-0">Branch:</label>
            <select 
              className="form-select form-select-sm" 
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              style={{ width: '150px' }}
            >
              <option value="">All Branches</option>
              {branches.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            <label className="fs-12 text-muted mb-0 ms-2">From:</label>
            <input 
              type="date" 
              className="form-control form-control-sm" 
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{ width: '130px' }}
            />
            <label className="fs-12 text-muted mb-0">To:</label>
            <input 
              type="date" 
              className="form-control form-control-sm" 
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{ width: '130px' }}
            />
          </div>
        </div>
      </div>

      <div className="row g-3 overflow-hidden">
        {/* Expenses Side */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100 rounded-3">
            <div className="card-header bg-soft-danger border-0 py-3">
              <h6 className="mb-0 fw-bold text-danger d-flex align-items-center">
                <i className="isax isax-card-send me-2 fs-18"></i>EXPENSES
              </h6>
            </div>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="bg-light fs-11 text-uppercase text-muted border-top">
                  <tr>
                    <th className="ps-3 py-2">Particulars</th>
                    {months.map(m => (
                      <th key={m} className="text-end text-capitalize">{m}</th>
                    ))}
                    <th className="pe-3 text-end">Amount</th>
                  </tr>
                </thead>
                <tbody className="fs-13">
                  {loading ? (
                    <tr><td colSpan={months.length + 2} className="text-center py-5"><div className="spinner-border text-primary spinner-border-sm"></div></td></tr>
                  ) : error ? (
                    <tr><td colSpan={months.length + 2} className="text-center py-5 text-danger">{error}</td></tr>
                  ) : filteredExpense.length === 0 ? (
                    <tr><td colSpan={months.length + 2} className="text-center py-5 text-muted">No expenses found.</td></tr>
                  ) : (
                    filteredExpense.map((item, index) => {
                      if (item.type === "sub-header") {
                        return (
                          <tr key={item.id || index} className="bg-light bg-opacity-50 border-top border-bottom">
                            <td colSpan={months.length + 2} style={{ paddingLeft: '1.5rem' }} className="py-2">
                              <span className="text-dark fw-bold fs-11">{item.name}</span>
                            </td>
                          </tr>
                        );
                      }
                      return (
                        <tr key={item.id || index}>
                          <td className="ps-4 py-2" style={{ paddingLeft: '2.5rem' }}>{item.name}</td>
                          {months.map(m => (
                            <td key={m} className="text-end text-muted">{formatCurrency(item[m])}</td>
                          ))}
                          <td className="pe-3 text-end fw-medium text-dark">{formatCurrency(item.total)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                <tfoot className="bg-soft-danger bg-opacity-10">
                  <tr className="border-top-0">
                    <td className="ps-3 py-2 fw-bold text-danger">TOTAL EXPENSE</td>
                    {months.map(m => <td key={m}></td>)}
                    <td className="pe-3 text-end fw-bold text-danger">{formatCurrency(expenses)}</td>
                  </tr>
                  {/* Balancing figure if it's a Profit */}
                  {netProfit > 0 && (
                    <tr className="border-top">
                      <td className="ps-3 py-2 fw-bold text-success">{netProfitLabel}</td>
                      {months.map(m => <td key={m}></td>)}
                      <td className="pe-3 text-end fw-bold text-success">{formatCurrency(netProfit)}</td>
                    </tr>
                  )}
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Income Side */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100 rounded-3">
            <div className="card-header bg-soft-success border-0 py-3">
              <h6 className="mb-0 fw-bold text-success d-flex align-items-center">
                <i className="isax isax-receipt-item me-2 fs-18"></i>INCOME
              </h6>
            </div>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="bg-light fs-11 text-uppercase text-muted border-top">
                  <tr>
                    <th className="ps-3 py-2">Particulars</th>
                    {months.map(m => (
                      <th key={m} className="text-end text-capitalize">{m}</th>
                    ))}
                    <th className="pe-3 text-end">Amount</th>
                  </tr>
                </thead>
                <tbody className="fs-13">
                  {loading ? (
                    <tr><td colSpan={months.length + 2} className="text-center py-5"><div className="spinner-border text-primary spinner-border-sm"></div></td></tr>
                  ) : error ? (
                    <tr><td colSpan={months.length + 2} className="text-center py-5 text-danger">{error}</td></tr>
                  ) : filteredIncome.length === 0 ? (
                    <tr><td colSpan={months.length + 2} className="text-center py-5 text-muted">No income found.</td></tr>
                  ) : (
                    filteredIncome.map((item, index) => {
                      if (item.type === "sub-header") {
                        return (
                          <tr key={item.id || index} className="bg-light bg-opacity-50 border-top border-bottom">
                            <td colSpan={months.length + 2} style={{ paddingLeft: '1.5rem' }} className="py-2">
                              <span className="text-dark fw-bold fs-11">{item.name}</span>
                            </td>
                          </tr>
                        );
                      }
                      return (
                        <tr key={item.id || index}>
                          <td className="ps-4 py-2" style={{ paddingLeft: '2.5rem' }}>{item.name}</td>
                          {months.map(m => (
                            <td key={m} className="text-end text-muted">{formatCurrency(item[m])}</td>
                          ))}
                          <td className="pe-3 text-end fw-medium text-dark">{formatCurrency(item.total)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                <tfoot className="bg-soft-success bg-opacity-10">
                  <tr className="border-top-0">
                    <td className="ps-3 py-2 fw-bold text-success">TOTAL INCOME</td>
                    {months.map(m => <td key={m}></td>)}
                    <td className="pe-3 text-end fw-bold text-success">{formatCurrency(revenue)}</td>
                  </tr>
                  {/* Balancing figure if it's a Loss */}
                  {netProfit < 0 && (
                    <tr className="border-top">
                      <td className="ps-3 py-2 fw-bold text-danger">NET LOSS</td>
                      {months.map(m => <td key={m}></td>)}
                      <td className="pe-3 text-end fw-bold text-danger">{formatCurrency(Math.abs(netProfit))}</td>
                    </tr>
                  )}
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfitLossReport;

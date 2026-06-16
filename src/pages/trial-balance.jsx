import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrialBalanceReport } from '../services/reportService';
import branchService from '../services/branchService';
import { useAuth } from '../components/AuthContext';
import { toast } from 'react-toastify';

const initialData = [
  { id: 1, accountName: 'PNB - 5475878970090', credit: 22500, debit: 7500 },
  { id: 2, accountName: 'SFB - 3255465758698', credit: 30000, debit: 10000 },
  { id: 3, accountName: 'HSB - 4353689870544', credit: 12000, debit: 3000 },
  { id: 4, accountName: 'ETB - 4324356677889', credit: 18000, debit: 6000 },
  { id: 5, accountName: 'NPB - 2343547586900', credit: 25000, debit: 8000 },
  { id: 6, accountName: 'SDB - 3354456565687', credit: 35000, debit: 12000 },
  { id: 7, accountName: 'FEB - 3453647664889', credit: 40000, debit: 15000 },
  { id: 8, accountName: 'CCB - 9876543210123', credit: 27500, debit: 9500 },
  { id: 9, accountName: 'CCB - 9876543210123', credit: 20000, debit: 7000 },
  { id: 10, accountName: 'ICB - 6543217896543', credit: 45000, debit: 18000 }
];

const TrialBalance = () => {
  const { activeCompany } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  
  // Filter States
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [appliedAccounts, setAppliedAccounts] = useState([]);
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [appliedAmountRange, setAppliedAmountRange] = useState({ min: '', max: '' });
  const [filterSearch, setFilterSearch] = useState('');
  const [asOnDate, setAsOnDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branches, setBranches] = useState([]);
  const [apiTotals, setApiTotals] = useState({ total_dr: 0, total_cr: 0 });

  useEffect(() => {
    const init = async () => {
      try {
        const branchRes = await branchService.getBranches();
        setBranches(branchRes.data || []);
        setSelectedBranch('');
      } catch (err) {
        console.error("Failed to load branches", err);
      }
    };
    init();
  }, [activeCompany?.id]);
  
  useEffect(() => {
    fetchReportData({ as_on_date: asOnDate, branch_id: selectedBranch, branchId: selectedBranch });
  }, [asOnDate, selectedBranch, activeCompany?.id]);

  const fetchReportData = async (params = {}) => {
    try {
      setLoading(true);
      // Ensure as_on_date is provided as it's mandatory
      const finalParams = {
        as_on_date: asOnDate,
        ...params
      };
      const response = await getTrialBalanceReport(finalParams);
      const reportData = response.data || response;
      const items = reportData.ledgers || (Array.isArray(reportData) ? reportData : (reportData?.rows || reportData?.items || []));
      
      const mappedItems = items.map(item => {
        let debit = Number(item.debit || 0);
        let credit = Number(item.credit || 0);
        
        if (item.closing_balance !== undefined && item.balance_type) {
          debit = item.balance_type === 'DR' ? Number(item.closing_balance) : 0;
          credit = item.balance_type === 'CR' ? Number(item.closing_balance) : 0;
        } else {
          debit = Number(item.total_dr || debit);
          credit = Number(item.total_cr || credit);
        }

        return {
          ...item,
          accountName: item.ledger_name || item.account_name || item.accountName,
          debit,
          credit
        };
      });
      
      setData(mappedItems);
      // Store totals if available
      if (reportData.totals) {
        setApiTotals(reportData.totals);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching trial balance:", err);
      setError("Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };
  const [columns, setColumns] = useState({
    accountName: true,
    credit: true,
    debit: true,
  });

  const handleColumnToggle = (col) => {
    setColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const totalDebits = apiTotals.total_dr || data.reduce((sum, i) => sum + (Number(i.debit) || 0), 0);
  const totalCredits = apiTotals.total_cr || data.reduce((sum, i) => sum + (Number(i.credit) || 0), 0);
  const netDifference = Math.abs(totalDebits - totalCredits);
  const totalAccounts = data.length;

  const handleApplyFilter = () => {
    setAppliedAccounts(selectedAccounts);
    setAppliedAmountRange(amountRange);
  };

  const handleResetFilter = () => {
    setSelectedAccounts([]);
    setAppliedAccounts([]);
    setAmountRange({ min: '', max: '' });
    setAppliedAmountRange({ min: '', max: '' });
    setFilterSearch('');
  };

  const filteredData = data.filter(item => {
    // text search
    if (searchText && !item.accountName.toLowerCase().includes(searchText.toLowerCase())) return false;
    
    // account selection filter
    if (appliedAccounts.length > 0 && !appliedAccounts.includes(item.accountName)) return false;

    // amount filter (check if either debit or credit is within range, or the balance)
    const maxVal = Math.max(Number(item.debit) || 0, Number(item.credit) || 0);
    if (appliedAmountRange.min && maxVal < parseFloat(appliedAmountRange.min)) return false;
    if (appliedAmountRange.max && maxVal > parseFloat(appliedAmountRange.max)) return false;

    return true;
  });

  const uniqueAccounts = [...new Set(data.map(item => item.accountName))].filter(Boolean).sort();

  const downloadExcel = async () => {
    try {
      const { utils, writeFile } = await import('xlsx');
      
      const exportData = filteredData.map(item => {
        const row = {};
        if (columns.accountName) row['Account Name'] = item.account_name || item.accountName;
        if (columns.credit) row['Credit'] = item.credit || 0;
        if (columns.debit) row['Debit'] = item.debit || 0;
        return row;
      });

      // Add totals row
      const totalsRow = {};
      if (columns.accountName) totalsRow['Account Name'] = 'Total';
      if (columns.credit) totalsRow['Credit'] = filteredData.reduce((sum, item) => sum + (Number(item.credit) || 0), 0);
      if (columns.debit) totalsRow['Debit'] = filteredData.reduce((sum, item) => sum + (Number(item.debit) || 0), 0);
      exportData.push(totalsRow);

      const ws = utils.json_to_sheet(exportData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Trial Balance");
      writeFile(wb, `trial_balance_${asOnDate}.xlsx`);
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

      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text('Trial Balance Report', 14, 15);
      doc.setFontSize(10);
      doc.text(`As On Date: ${asOnDate}`, 14, 22);

      const tableColumns = [];
      if (columns.accountName) tableColumns.push('Account Name');
      if (columns.credit) tableColumns.push('Credit');
      if (columns.debit) tableColumns.push('Debit');

      const tableRows = filteredData.map(item => {
        const row = [];
        if (columns.accountName) row.push(item.account_name || item.accountName);
        if (columns.credit) row.push(`Rs. ${(item.credit || 0).toLocaleString('en-IN')}`);
        if (columns.debit) row.push(`Rs. ${(item.debit || 0).toLocaleString('en-IN')}`);
        return row;
      });

      // Add totals row
      const totalsRow = [];
      if (columns.accountName) totalsRow.push('Total');
      if (columns.credit) totalsRow.push(`Rs. ${filteredData.reduce((sum, item) => sum + (Number(item.credit) || 0), 0).toLocaleString('en-IN')}`);
      if (columns.debit) totalsRow.push(`Rs. ${filteredData.reduce((sum, item) => sum + (Number(item.debit) || 0), 0).toLocaleString('en-IN')}`);
      tableRows.push(totalsRow);

      autoTable(doc, {
        startY: 28,
        head: [tableColumns],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [62, 121, 247] }
      });

      doc.save(`trial_balance_${asOnDate}.pdf`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to export PDF");
    }
  };

  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Trial Balance Report</h6>
        </div>
        <div className="my-xl-auto">
          <div className="dropdown">
            <Link
              href="#"
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
              data-bs-display="static"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </Link>
            <ul className="dropdown-menu dropdown-menu-end" style={{ right: 0, left: 'auto', transform: 'none', top: '100%', marginTop: '5px' }}>
              <li>
                <button className="dropdown-item border-0 bg-transparent" onClick={downloadPDF}>
                  Download as PDF
                </button>
              </li>
              <li>
                <button className="dropdown-item border-0 bg-transparent" onClick={downloadExcel}>
                  Download as Excel
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-bottom mb-3">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="mb-1">
                  <span className="p-2 badge badge-soft-primary d-inline-flex align-items-center justify-content-center rounded border border-primary">
                    <i className="isax isax-dollar-circle fs-16"></i>
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="mb-0">
                      <p className="mb-1 text-truncate">Total Debits</p>
                      <div>
                        <h6 className="fs-16 fw-semibold me-2 mb-1">₹{totalDebits.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="chart-set" id="radial-chart3"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="mb-1">
                  <span className="p-2 badge badge-soft-success d-inline-flex align-items-center justify-content-center rounded border border-success">
                    <i className="isax isax-money-2 fs-16"></i>
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="mb-0">
                      <p className="mb-1 text-truncate">Total Credits</p>
                      <div>
                        <h6 className="fs-16 fw-semibold me-2 mb-1">₹{totalCredits.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="chart-set" id="radial-chart4"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="mb-1">
                  <span className="p-2 badge badge-soft-warning d-inline-flex align-items-center justify-content-center rounded border border-warning">
                    <i className="isax isax-wallet-3 fs-16"></i>
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="mb-0">
                      <p className="mb-1 text-truncate">Net Difference</p>
                      <div>
                        <h6 className="fs-16 fw-semibold me-2 mb-1">₹{netDifference.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="chart-set" id="radial-chart5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="mb-1">
                  <span className="p-2 badge badge-soft-danger d-inline-flex align-items-center justify-content-center rounded border border-danger">
                    <i className="isax isax-dollar-circle fs-16"></i>
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="mb-0">
                      <p className="mb-1 text-truncate">Total Accounts</p>
                      <div>
                        <h6 className="fs-16 fw-semibold me-2 mb-1">{totalAccounts}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="chart-set" id="radial-chart6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ background: 'transparent', outline: 'auto' }}
                />
                <Link href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link>
              </div>
            </div>
            <div className="d-flex align-items-center bg-white border px-2 py-1 rounded">
              <i className="isax isax-buildings-2 text-gray-5 fs-14 me-1"></i>
              <select 
                className="form-select form-select-sm border-0 shadow-none ps-0 fs-13" 
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                style={{ width: '150px', textOverflow: 'ellipsis' }}
              >
                <option value="">All Branches</option>
                {branches.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
            <div className="d-flex align-items-center bg-white border px-2 py-1 rounded">
              <i className="isax isax-calendar text-gray-5 fs-14 me-1"></i>
              <input 
                type="date" 
                className="form-control form-control-sm border-0 shadow-none p-0 fs-13" 
                value={asOnDate}
                onChange={(e) => setAsOnDate(e.target.value)}
                style={{ width: '120px' }}
              />
            </div>
            <button className="btn btn-outline-primary d-inline-flex align-items-center" onClick={() => fetchReportData()} disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="isax isax-refresh me-1"></i>}
              Refresh
            </button>
            <Link
              className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#customcanvas"
            >
              <i className="isax isax-filter me-1"></i>Filter
            </Link>
          </div>

        </div>
        {(appliedAccounts.length > 0 || appliedAmountRange.min || appliedAmountRange.max) && (
          <div className="align-items-center gap-2 flex-wrap filter-info mt-3 d-flex">
            <h6 className="fs-13 fw-semibold mb-0">Filters</h6>
            {appliedAccounts.length > 0 && (
              <span className="tag bg-light border rounded-1 fs-12 text-dark badge d-inline-flex align-items-center">
                <span className="num-count d-inline-flex align-items-center justify-content-center bg-success text-white fs-10 me-1 px-1 rounded">
                  {appliedAccounts.length}
                </span>
                Account Holders Selected
                <span className="ms-2 tag-close" style={{ cursor: 'pointer' }} onClick={() => { setAppliedAccounts([]); setSelectedAccounts([]); }}>
                  <i className="fa-solid fa-x fs-10"></i>
                </span>
              </span>
            )}
            {(appliedAmountRange.min || appliedAmountRange.max) && (
              <span className="tag bg-light border rounded-1 fs-12 text-dark badge d-inline-flex align-items-center">
                Amount: ₹{appliedAmountRange.min || '0'} - {appliedAmountRange.max ? `₹${appliedAmountRange.max}` : 'Any'}
                <span className="ms-2 tag-close" style={{ cursor: 'pointer' }} onClick={() => { setAppliedAmountRange({min:'',max:''}); setAmountRange({min:'',max:''}); }}>
                  <i className="fa-solid fa-x fs-10"></i>
                </span>
              </span>
            )}
            <button className="btn btn-link link-danger fw-medium text-decoration-underline ms-md-1 p-0" onClick={handleResetFilter}>
              Clear All
            </button>
          </div>
        )}
      </div>
      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead className="thead-light">
            <tr>

              {columns.accountName && <th>Account Name</th>}
              {columns.credit && <th>Credit</th>}
              {columns.debit && <th>Debit</th>}
              <th className="no-sort"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="text-center py-5 text-danger">{error}</td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-3">No records found matching your search.</td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id || index}>

                  {columns.accountName && (
                    <td>
                      <Link to={`/reports/ledger-statement/${item.id}`} className="text-primary fw-medium">
                        {item.account_name || item.accountName}
                      </Link>
                    </td>
                  )}
                  {columns.credit && <td>₹{(item.credit || 0).toLocaleString('en-IN')}</td>}
                  {columns.debit && <td>₹{(item.debit || 0).toLocaleString('en-IN')}</td>}
                  <td></td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="bg-light border-top">

              {columns.accountName && <td className="fw-semibold">Total</td>}
              {columns.credit && <td className="fw-semibold">₹{filteredData.reduce((sum, item) => sum + (Number(item.credit) || 0), 0).toLocaleString('en-IN')}</td>}
              {columns.debit && <td className="fw-semibold">₹{filteredData.reduce((sum, item) => sum + (Number(item.debit) || 0), 0).toLocaleString('en-IN')}</td>}
              <td className="fw-semibold text-end">₹{(filteredData.reduce((sum, item) => sum + (Number(item.debit) || 0), 0) - filteredData.reduce((sum, item) => sum + (Number(item.credit) || 0), 0)).toLocaleString('en-IN')}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id="customcanvas">
        <div className="offcanvas-header d-block pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between pb-3">
            <h6 className="offcanvas-title">Filter</h6>
            <button
              type="button"
              className="btn-close btn-close-modal custom-btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
        <div className="offcanvas-body pt-3">
          <form action="#">
            <div className="mb-3">
              <label className="form-label">Account Holder</label>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-lg bg-light d-flex align-items-center justify-content-between fs-13 fw-normal border w-100"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  {selectedAccounts.length > 0 ? `${selectedAccounts.length} Selected` : 'Select Accounts'}
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info p-3" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                  <div className="mb-3">
                    <div className="input-icon-start position-relative">
                      <span className="input-icon-addon fs-12">
                        <i className="isax isax-search-normal"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search accounts..."
                        value={filterSearch}
                        onChange={(e) => setFilterSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <ul className="mb-0 list-unstyled">
                    <li className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                      <label className="d-inline-flex align-items-center text-gray-9 fw-medium mb-0" style={{ cursor: 'pointer' }}>
                        <input 
                          className="form-check-input m-0 me-2" 
                          type="checkbox" 
                          checked={selectedAccounts.length === uniqueAccounts.length && uniqueAccounts.length > 0}
                          onChange={(e) => setSelectedAccounts(e.target.checked ? uniqueAccounts : [])}
                        />{' '}
                        Select All
                      </label>
                      <button 
                        type="button"
                        className="btn btn-link text-danger p-0 text-decoration-none fw-medium fs-13"
                        onClick={() => setSelectedAccounts([])}
                      >
                        Clear
                      </button>
                    </li>
                    {uniqueAccounts.filter(acc => acc.toLowerCase().includes(filterSearch.toLowerCase())).map((acc, i) => (
                      <li key={i} className="mb-2">
                        <label className="d-flex align-items-center text-dark mb-0" style={{ cursor: 'pointer' }}>
                          <input 
                            className="form-check-input m-0 me-2" 
                            type="checkbox" 
                            checked={selectedAccounts.includes(acc)}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedAccounts([...selectedAccounts, acc]);
                              else setSelectedAccounts(selectedAccounts.filter(a => a !== acc));
                            }}
                          /> 
                          <span className="text-truncate" style={{ maxWidth: '200px' }}>{acc}</span>
                        </label>
                      </li>
                    ))}
                    {uniqueAccounts.filter(acc => acc.toLowerCase().includes(filterSearch.toLowerCase())).length === 0 && (
                      <li className="text-muted text-center py-2 fs-12">No accounts found</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Amount Range (₹)</label>
              <div className="row g-2">
                <div className="col-6">
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Min" 
                    value={amountRange.min}
                    onChange={(e) => setAmountRange({...amountRange, min: e.target.value})}
                  />
                </div>
                <div className="col-6">
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Max" 
                    value={amountRange.max}
                    onChange={(e) => setAmountRange({...amountRange, max: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="offcanvas-footer">
              <div className="row g-2">
                <div className="col-6">
                  <button type="button" className="btn btn-outline-white w-100" onClick={handleResetFilter}>
                    Reset
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    data-bs-dismiss="offcanvas"
                    className="btn btn-primary w-100"
                    onClick={handleApplyFilter}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TrialBalance;

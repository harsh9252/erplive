import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBalanceSheetReport } from '../services/reportService';
import investmentService from '../services/investmentService';
import branchService from '../services/branchService';
import { useAuth } from '../components/AuthContext';

const initialData = [
  { id: 1, accountName: 'Emily Clark', avatar: 'avatar-28.jpg', bankNo: 'GTB - 3298784309485', credit: 15000, debit: 5000, balance: 10000 },
  { id: 2, accountName: 'John Carter', avatar: 'avatar-29.jpg', bankNo: 'PNB - 5475878970090', credit: 22500, debit: 7500, balance: 15000 },
  { id: 3, accountName: 'Sophia White', avatar: 'avatar-12.jpg', bankNo: 'SFB - 3255465758698', credit: 30000, debit: 10000, balance: 20000 },
  { id: 4, accountName: 'Michael Johnson', avatar: 'avatar-06.jpg', bankNo: 'HSB - 4353689870544', credit: 12000, debit: 3000, balance: 9000 },
  { id: 5, accountName: 'Olivia Harris', avatar: 'avatar-30.jpg', bankNo: 'ETB - 4324356677889', credit: 18000, debit: 6000, balance: 12000 },
  { id: 6, accountName: 'David Anderson', avatar: 'avatar-16.jpg', bankNo: 'NPB - 2343547586900', credit: 25000, debit: 8000, balance: 17000 },
  { id: 7, accountName: 'Emma Lewis', avatar: 'avatar-17.jpg', bankNo: 'SDB - 3354456565687', credit: 35000, debit: 12000, balance: 23000 },
  { id: 8, accountName: 'Robert Thomas', avatar: 'avatar-23.jpg', bankNo: 'FEB - 3453647664889', credit: 40000, debit: 15000, balance: 25000 },
  { id: 9, accountName: 'Isabella Scott', avatar: 'avatar-23.jpg', bankNo: 'CCB - 9876543210123', credit: 27500, debit: 9500, balance: 18000 },
  { id: 10, accountName: 'Daniel Martinez', avatar: 'avatar-07.jpg', bankNo: 'CCB - 9876543210123', credit: 20000, debit: 7000, balance: 13000 },
  { id: 11, accountName: 'Charlotte Brown', avatar: 'avatar-41.jpg', bankNo: 'ICB - 6543217896543', credit: 45000, debit: 18000, balance: 27000 },
  { id: 12, accountName: 'William Parker', avatar: 'avatar-42.jpg', bankNo: 'ECB - 3692581473692', credit: 37500, debit: 14000, balance: 23500 },
  { id: 13, accountName: 'Mia Thompson', avatar: 'avatar-43.jpg', bankNo: 'RFB - 3214569873214', credit: 38000, debit: 14000, balance: 24000 },
  { id: 14, accountName: 'Amelia Robinson', avatar: 'avatar-44.jpg', bankNo: 'MFB - 1597534682597', credit: 60000, debit: 25000, balance: 35000 }
];

const BalanceSheet = () => {
  const { activeCompany } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [asOnDate, setAsOnDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branches, setBranches] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [investSummary, setInvestSummary] = useState({ total_invested: 0 });

  const [filterAccounts, setFilterAccounts] = useState([]);
  const [amountMin, setAmountMin] = useState('');
  const [amountMax, setAmountMax] = useState('');

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
      const finalParams = {
        as_on_date: asOnDate,
        ...params
      };
      
      const [response, investRes] = await Promise.all([
        getBalanceSheetReport(finalParams),
        investmentService.getHoldingsSummary()
      ]);

      const reportData = response.data || response;
      
      if (investRes && investRes.success) {
        const iData = investRes.data || investRes;
        setInvestSummary({ total_invested: iData.total_invested || iData.total_cost || 0 });
      }
      
      let flattened = [];
      if (reportData.assets?.items) {
        flattened = [...flattened, ...reportData.assets.items.map(item => ({
          ...item,
          accountName: item.ledger_name,
          bankNo: item.group_name,
          type: 'Asset',
          id: `asset-${item.ledger_id}`
        }))];
      }
      if (reportData.liabilities?.items) {
        flattened = [...flattened, ...reportData.liabilities.items.map(item => ({
          ...item,
          accountName: item.ledger_name,
          bankNo: item.group_name,
          type: 'Liability',
          id: `liability-${item.ledger_id}`
        }))];
      }
      
      setData(flattened.length > 0 ? flattened : (Array.isArray(reportData) ? reportData : []));
      setError(null);
    } catch (err) {
      console.error("Error fetching balance sheet:", err);
      setError("Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };
  const [columns, setColumns] = useState({
    accountName: true,
    bankNo: true,
    credit: true,
    debit: true,
    balance: true
  });

  const handleColumnToggle = (col) => {
    setColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  let filteredData = data.filter(item => {
    const searchMatch = (item.accountName || '').toLowerCase().includes(searchText.toLowerCase()) ||
                        (item.bankNo || '').toLowerCase().includes(searchText.toLowerCase());
    
    const accountMatch = filterAccounts.length === 0 || filterAccounts.includes(item.accountName || item.account_name);
    
    const bal = Number(item.balance) || 0;
    const minMatch = amountMin === '' || bal >= Number(amountMin);
    const maxMatch = amountMax === '' || bal <= Number(amountMax);

    return searchMatch && accountMatch && minMatch && maxMatch;
  });

  filteredData.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  const downloadExcel = async () => {
    try {
      const { utils, writeFile } = await import('xlsx');
      const exportData = filteredData.map(item => ({
        'Account Holder Name': item.accountName || item.account_name || '',
        'Bank & Account No': item.bankNo || item.bank_no || '',
        'Type': item.type,
        'Credit': item.credit || 0,
        'Debit': item.debit || 0,
        'Balance': item.balance || 0
      }));
      const ws = utils.json_to_sheet(exportData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Balance Sheet");
      writeFile(wb, `balance_sheet_${asOnDate}.xlsx`);
    } catch (error) {
      console.error(error);
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
      doc.text('Balance Sheet Report', 14, 15);
      doc.setFontSize(10);
      doc.text(`As On: ${asOnDate}`, 14, 22);

      const tableColumns = ["Account Holder", "Bank & Account No", "Type", "Credit", "Debit", "Balance"];
      const tableRows = filteredData.map(item => [
        item.accountName || item.account_name || '',
        item.bankNo || item.bank_no || '',
        item.type,
        `Rs. ${(item.credit || 0).toLocaleString('en-IN')}`,
        `Rs. ${(item.debit || 0).toLocaleString('en-IN')}`,
        `Rs. ${(item.balance || 0).toLocaleString('en-IN')}`
      ]);

      autoTable(doc, {
        startY: 28,
        head: [tableColumns],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [62, 121, 247] }
      });

      doc.save(`balance_sheet_${asOnDate}.pdf`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to export PDF");
    }
  };

  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0 fw-bold">Balance Sheet Report</h6>
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
            <ul className="dropdown-menu border-0 shadow" style={{ position: 'absolute', right: 0, left: 'auto', transform: 'translateX(-30px)', top: '100%', marginTop: '5px', minWidth: '160px' }}>
              <li><button className="dropdown-item py-2 border-0 bg-transparent" onClick={downloadPDF}>Download PDF</button></li>
              <li><button className="dropdown-item py-2 border-0 bg-transparent" onClick={downloadExcel}>Download Excel</button></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-bottom mb-3">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2 pb-1 border-bottom">
                  <div>
                    <h6 className="fs-16 fw-semibold mb-1">₹{filteredData.filter(i => i.type === 'Asset').reduce((sum, i) => sum + (Number(i.balance) || 0), 0).toLocaleString('en-IN')}</h6>
                    <p className="mb-1">Total Assets</p>
                  </div>
                  <div>
                    <span className="badge badge-soft-primary p-2 rounded-circle">
                      <i className="isax isax-dollar-circle fs-16"></i>
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="fs-11 mb-0 text-muted">Incl. Investments</p>
                  <p className="fs-11 mb-0 fw-bold">₹{investSummary.total_invested.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg border-0">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2 pb-1 border-bottom">
                  <div>
                    <h6 className="fs-16 fw-semibold mb-1">₹{Math.abs(filteredData.filter(i => i.type === 'Liability').reduce((sum, i) => sum + (Number(i.balance) || 0), 0)).toLocaleString('en-IN')}</h6>
                    <p className="mb-1">Total Liabilities</p>
                  </div>
                  <div>
                    <span className="badge badge-soft-success p-2 rounded-circle">
                      <i className="isax isax-tick-circle fs-16"></i>
                    </span>
                  </div>
                </div>
                <p className="fs-11 mb-0 text-muted">Current Obligations</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg border-0">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2 pb-1 border-bottom">
                  <div>
                    <h6 className="fs-16 fw-semibold mb-1">
                      ₹{(filteredData.filter(i => i.type === 'Asset').reduce((sum, i) => sum + (Number(i.balance) || 0), 0) - 
                        Math.abs(filteredData.filter(i => i.type === 'Liability').reduce((sum, i) => sum + (Number(i.balance) || 0), 0))).toLocaleString('en-IN')}
                    </h6>
                    <p className="mb-1">Net Worth (Equity)</p>
                  </div>
                  <div>
                    <span className="badge badge-soft-warning p-2 rounded-circle">
                      <i className="isax isax-wallet-3 fs-16"></i>
                    </span>
                  </div>
                </div>
                <p className="fs-11 mb-0 text-muted">Assets - Liabilities</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg border-0">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2 pb-1 border-bottom">
                  <div>
                    <h6 className="fs-16 fw-semibold mb-1">
                      {(() => {
                        const assets = filteredData.filter(i => i.type === 'Asset').reduce((sum, i) => sum + (Number(i.balance) || 0), 0);
                        const liab = Math.abs(filteredData.filter(i => i.type === 'Liability').reduce((sum, i) => sum + (Number(i.balance) || 0), 0));
                        const netWorth = assets - liab;
                        return assets > 0 ? ((netWorth / assets) * 100).toFixed(1) : '0';
                      })()}%
                    </h6>
                    <p className="mb-1">Equity Ratio</p>
                  </div>
                  <div>
                    <span className="badge badge-soft-danger p-2 rounded-circle">
                      <i className="isax isax-wallet-money fs-16"></i>
                    </span>
                  </div>
                </div>
                <p className="fs-11 mb-0 text-muted">Net Worth / Total Assets</p>
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
      </div>
      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead className="thead-light">
            <tr>
                <th onClick={() => requestSort('accountName')} style={{ cursor: 'pointer' }}>
                  Account Holder Name {sortConfig.key === 'accountName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              {columns.bankNo && (
                <th onClick={() => requestSort('bankNo')} style={{ cursor: 'pointer' }}>
                  Bank & Account No {sortConfig.key === 'bankNo' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              )}
              {columns.credit && (
                <th onClick={() => requestSort('credit')} style={{ cursor: 'pointer' }}>
                  Credit {sortConfig.key === 'credit' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              )}
              {columns.debit && (
                <th onClick={() => requestSort('debit')} style={{ cursor: 'pointer' }}>
                  Debit {sortConfig.key === 'debit' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              )}
              {columns.balance && (
                <th onClick={() => requestSort('balance')} style={{ cursor: 'pointer' }}>
                  Balance {sortConfig.key === 'balance' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="text-center py-5 text-danger">{error}</td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">No records found matching your search.</td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id || index}>
                  {columns.accountName && (
                    <td>
                      <div className="d-flex align-items-center">
                        <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                          <img
                            src={`/assets/img/profiles/${item.avatar || 'avatar-01.jpg'}`}
                            className="rounded-circle"
                            alt="img"
                          />
                        </Link>
                        <div>
                          <h6 className="fs-14 fw-medium mb-0">
                            <Link to={`/reports/ledger-statement/${item.ledger_id || item.id}`}>
                                {item.account_name || item.accountName}
                                {(item.group_name?.toLowerCase().includes('investment') || item.bankNo?.toLowerCase().includes('investment')) && 
                                    <span className="badge bg-soft-info text-info fs-10 ms-2">Investment</span>
                                }
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </td>
                  )}
                  {columns.bankNo && <td>{item.bank_no || item.bankNo}</td>}
                  {columns.credit && <td>₹{(item.credit || 0).toLocaleString('en-IN')}</td>}
                  {columns.debit && <td>₹{(item.debit || 0).toLocaleString('en-IN')}</td>}
                  {columns.balance && <td>₹{(item.balance || 0).toLocaleString('en-IN')}</td>}
                </tr>
              ))
            )}
          </tbody>
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
          <div>
            <div className="mb-3">
              <label className="form-label">Account Holder</label>
              <div className="dropdown">
                <button
                  className="dropdown-toggle btn btn-lg bg-light d-flex align-items-center justify-content-start fs-13 fw-normal border w-100"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  Select ({filterAccounts.length})
                </button>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info p-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <ul className="mb-3 list-unstyled">
                    <li className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                      <label className="d-inline-flex align-items-center text-gray-9 mb-0">
                        <input 
                          className="form-check-input m-0 me-2" 
                          type="checkbox" 
                          checked={filterAccounts.length === [...new Set(data.map(d => d.accountName || d.account_name).filter(Boolean))].length && filterAccounts.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilterAccounts([...new Set(data.map(d => d.accountName || d.account_name).filter(Boolean))]);
                            } else {
                              setFilterAccounts([]);
                            }
                          }}
                        />{' '}
                        Select All
                      </label>
                      <button type="button" className="btn btn-link text-danger p-0" onClick={() => setFilterAccounts([])}>
                        Reset
                      </button>
                    </li>
                    {[...new Set(data.map(d => d.accountName || d.account_name).filter(Boolean))].sort().map(acc => (
                      <li key={acc} className="mb-2">
                        <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                          <input 
                            className="form-check-input m-0 me-2" 
                            type="checkbox" 
                            checked={filterAccounts.includes(acc)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilterAccounts([...filterAccounts, acc]);
                              } else {
                                setFilterAccounts(filterAccounts.filter(a => a !== acc));
                              }
                            }}
                          />
                          {acc}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Amount Range</label>
              <div className="d-flex align-items-center gap-2">
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="Min (₹)" 
                  value={amountMin}
                  onChange={(e) => setAmountMin(e.target.value)}
                />
                <span className="text-muted">-</span>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="Max (₹)" 
                  value={amountMax}
                  onChange={(e) => setAmountMax(e.target.value)}
                />
              </div>
            </div>
            <div className="offcanvas-footer mt-4">
              <div className="row g-2">
                <div className="col-6">
                  <button type="button" className="btn btn-outline-white w-100 shadow-sm" onClick={() => { setFilterAccounts([]); setAmountMin(''); setAmountMax(''); }}>
                    Reset Filters
                  </button>
                </div>
                <div className="col-6">
                  <button
                    data-bs-dismiss="offcanvas"
                    className="btn btn-primary w-100"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BalanceSheet;

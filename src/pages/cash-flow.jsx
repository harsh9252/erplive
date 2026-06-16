import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import reportService from '../services/reportService';
import PageHeader from '../components/common/PageHeader';
import SummaryCards from '../components/common/SummaryCards';

const CashFlow = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  
  const [filters, setFilters] = useState({
    from_date: '2025-04-01',
    to_date: '2026-03-31'
  });

  const [columns, setColumns] = useState({
    date: true,
    bankNo: true,
    description: true,
    credit: true,
    debit: true,
    accountBalance: true,
    totalBalance: true,
    paymentMode: true
  });

  const handleDownloadExcel = async () => {
    try {
      const { utils, writeFile } = await import('xlsx');
      const exportData = filteredData.map(item => ({
        'Date': item.date,
        'Bank & Account No': item.bankNo,
        'Description': item.description,
        'Credit': item.credit,
        'Debit': item.debit,
        'Balance': item.accountBalance,
        'Mode': item.paymentMode
      }));
      const ws = utils.json_to_sheet(exportData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Cash Flow Report");
      writeFile(wb, `Cash_Flow_Report.xlsx`);
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
      doc.text('Cash Flow Report', 14, 15);
      doc.setFontSize(10);
      doc.text(`Period: ${filters.from_date} to ${filters.to_date}`, 14, 22);

      const tableColumns = ["Date", "Bank & Account No", "Description", "Credit", "Debit", "Balance", "Mode"];
      const tableRows = filteredData.map(item => [
        item.date,
        item.bankNo,
        item.description,
        `Rs. ${Number(item.credit || 0).toLocaleString('en-IN')}`,
        `Rs. ${Number(item.debit || 0).toLocaleString('en-IN')}`,
        `Rs. ${Number(item.accountBalance || 0).toLocaleString('en-IN')}`,
        item.paymentMode
      ]);

      autoTable(doc, {
        startY: 28,
        head: [tableColumns],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [62, 121, 247] }
      });

      doc.save(`Cash_Flow_Report.pdf`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to export PDF");
    }
  };

  const fetchReport = useCallback(async () => {
    setLoading(true);
    try {
      const response = await reportService.getCashFlowReport(filters);
      if (response && response.success) {
        const result = response.data;
        setData(Array.isArray(result.table) ? result.table : []);
        setSummary(Array.isArray(result.summary) ? result.summary : []);
      } else {
        // Fallback to mock data for demonstration
        mockData();
      }
    } catch (error) {
      console.error("Failed to fetch cash flow:", error);
      toast.error("Failed to load cash flow data");
      mockData();
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const mockData = () => {
    const mockTable = [
      { id: 1, date: '2025-02-22', bankNo: 'GTB - 3298784309485', description: 'Sale of laptops', credit: 15000, debit: 5000, accountBalance: 10000, totalBalance: 10000, paymentMode: 'Cash' },
      { id: 2, date: '2025-02-07', bankNo: 'PNB - 5475878970090', description: 'Customer Refund', credit: 22500, debit: 7500, accountBalance: 15000, totalBalance: 25750, paymentMode: 'Cheque' },
      { id: 3, date: '2025-01-30', bankNo: 'SFB - 3255465758698', description: 'Office Supplies Bought', credit: 30000, debit: 10000, accountBalance: 20000, totalBalance: 50125, paymentMode: 'Cash' },
    ];
    setData(mockTable);
    setSummary([
      { label: 'Opening Cash Balance', amount: '₹50,00,000', change: '+5.62%', icon: 'dollar-circle', color: 'primary' },
      { label: 'Closing Cash Balance', amount: '₹75,00,000', change: '+11.42%', icon: 'money-2', color: 'success' },
      { label: 'Net Cash Flow', amount: '+₹25,00,000', change: '+8.12%', icon: 'wallet-3', color: 'warning' },
      { label: 'Cash Inflows', amount: '60%', change: '+7.45%', icon: 'wallet-money', color: 'danger' }
    ]);
  };

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

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

  const filteredData = data.filter(item =>
    item.description?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.bankNo?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.paymentMode?.toLowerCase().includes(searchText.toLowerCase())
  );

  filteredData.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <PageHeader 
        title="Cash Flow Report" 
        actions={[{ type: 'export', onDownloadPDF: handleDownloadPDF, onDownloadExcel: handleDownloadExcel }]} 
      />

      <SummaryCards cards={summary} variant="style2" />

      <div className="card shadow-sm mb-3">
        <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
                <input 
                    type="date" 
                    className="form-control form-control-sm"
                    value={filters.from_date}
                    onChange={(e) => setFilters({...filters, from_date: e.target.value})}
                />
                <span className="text-muted small">to</span>
                <input 
                    type="date" 
                    className="form-control form-control-sm"
                    value={filters.to_date}
                    onChange={(e) => setFilters({...filters, to_date: e.target.value})}
                />
            </div>
          </div>
        </div>
        
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  {columns.date && <th onClick={() => requestSort('date')} style={{ cursor: 'pointer' }}>Date {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>}
                  {columns.bankNo && <th onClick={() => requestSort('bankNo')} style={{ cursor: 'pointer' }}>Bank & Account No {sortConfig.key === 'bankNo' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>}
                  {columns.description && <th onClick={() => requestSort('description')} style={{ cursor: 'pointer' }}>Description {sortConfig.key === 'description' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>}
                  {columns.credit && <th className="text-end" onClick={() => requestSort('credit')} style={{ cursor: 'pointer' }}>Credit {sortConfig.key === 'credit' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>}
                  {columns.debit && <th className="text-end" onClick={() => requestSort('debit')} style={{ cursor: 'pointer' }}>Debit {sortConfig.key === 'debit' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>}
                  {columns.accountBalance && <th className="text-end" onClick={() => requestSort('accountBalance')} style={{ cursor: 'pointer' }}>Balance {sortConfig.key === 'accountBalance' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>}
                  {columns.paymentMode && <th>Mode</th>}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                    <tr><td colSpan="7" className="text-center py-4">Loading...</td></tr>
                ) : filteredData.length === 0 ? (
                    <tr><td colSpan="7" className="text-center py-4 text-muted">No records found.</td></tr>
                ) : (
                  filteredData.map((item, idx) => (
                    <tr key={idx}>
                      {columns.date && <td>{item.date}</td>}
                      {columns.bankNo && <td>{item.bankNo}</td>}
                      {columns.description && <td>{item.description}</td>}
                      {columns.credit && <td className="text-end text-success fw-medium">₹{Number(item.credit || 0).toLocaleString()}</td>}
                      {columns.debit && <td className="text-end text-danger fw-medium">₹{Number(item.debit || 0).toLocaleString()}</td>}
                      {columns.accountBalance && <td className="text-end fw-bold">₹{Number(item.accountBalance || 0).toLocaleString()}</td>}
                      {columns.paymentMode && <td><span className="badge bg-soft-info text-info">{item.paymentMode}</span></td>}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashFlow;

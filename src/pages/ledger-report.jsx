import React, { useState, useEffect } from "react";
import PageHeader from "../components/common/PageHeader";
import { Link } from "react-router-dom";
import DataTable from "../components/common/DataTable";
import { ledgerService } from "../services/ledgerService";
import * as companyService from "../services/companyService";
import branchService from "../services/branchService";
import { toast } from "react-toastify";
import { useAuth } from "../components/AuthContext";

const LedgerReport = () => {
  const { activeCompany } = useAuth();
  const [ledgers, setLedgers] = useState([]);
  const [ledgersGrp, setLedgersGrp] = useState([]);
  const [company, setCompany] = useState([]);
  const [searchText, setSearchText] = useState("");
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
  const todayStr = today.toISOString().split('T')[0];
  const [fromDate, setFromDate] = useState(firstDayOfMonth);
  const [toDate, setToDate] = useState(todayStr);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ledger_group_id: "",
    opening_balance: "",
    balance_type: "DR",
  });
  const [errors, setErrors] = useState({});
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    opening_balance: true,
    balance_type: true,
    debit: true,
    credit: true,
    closing_balance: true,
  });

  const fetchLedgers = async (params = {}) => {
    try {
      setLoading(true);
      const finalParams = {
        from_date: fromDate,
        to_date: toDate,
        branch_id: selectedBranch,
        branchId: selectedBranch,
        ...params
      };
      const response = await ledgerService.getLedgers(finalParams);
      setLedgers(response.data || response);
    } catch (error) {
      console.error("Error fetching ledgers:", error);
      toast.error("Failed to load ledgers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const [branchRes, compRes, groupsRes] = await Promise.all([
          branchService.getBranches(),
          companyService.getCurrentCompany(),
          ledgerService.getGroupLedger()
        ]);
        setBranches(branchRes.data || []);
        setCompany(compRes.data || compRes);
        setLedgersGrp(groupsRes.data || groupsRes);
        setSelectedBranch('');
      } catch (err) {
        console.error("Init failed", err);
      }
    };
    init();
  }, [activeCompany?.id]);
  
  useEffect(() => {
    fetchLedgers();
  }, [fromDate, toDate, selectedBranch, activeCompany?.id]);

  // Simple search filter logic
  const filteredData = ledgers.filter((item) => {
    const searchLower = searchText.toLowerCase();

    return (
      !searchText ||
      item.name?.toLowerCase().includes(searchLower) ||
      item.tin?.toLowerCase().includes(searchLower) ||
      item.balance_type?.toLowerCase().includes(searchLower)
    );
  });

  const exportToExcel = async () => {
    try {
      const { utils, writeFile } = await import('xlsx');
      const dataToExport = filteredData.map(item => ({
        'Ledger Name': item.name,
        'Opening Balance': item.opening_balance,
        'Type': item.balance_type,
        'Debit': item.debit || 0,
        'Credit': item.credit || 0,
        'Closing Balance': item.closing_balance || (Number(item.opening_balance) + Number(item.debit || 0) - Number(item.credit || 0))
      }));

      const ws = utils.json_to_sheet(dataToExport);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Ledgers");
      writeFile(wb, "Ledger_Report.xlsx");
      toast.success("Excel exported successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export Excel");
    }
  };

  const exportToPDF = async () => {
    try {
      const jspdfModule = await import('jspdf');
      const jsPDF = jspdfModule.default || jspdfModule.jsPDF || jspdfModule;
      const autotableModule = await import('jspdf-autotable');
      const autoTable = autotableModule.default || autotableModule;

      const doc = new jsPDF();
      doc.text("Ledger Report", 14, 15);
      doc.setFontSize(10);
      doc.text(`Period: ${fromDate} to ${toDate}`, 14, 22);

      const tableColumn = ["Ledger Name", "Opening", "Type", "Debit", "Credit", "Closing"];
      const tableRows = filteredData.map(item => [
        item.name,
        `Rs. ${Number(item.opening_balance).toLocaleString('en-IN')}`,
        item.balance_type,
        `Rs. ${Number(item.debit || 0).toLocaleString('en-IN')}`,
        `Rs. ${Number(item.credit || 0).toLocaleString('en-IN')}`,
        `Rs. ${Number(item.closing_balance || (Number(item.opening_balance) + Number(item.debit || 0) - Number(item.credit || 0))).toLocaleString('en-IN')}`
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        theme: 'grid'
      });

      doc.save("Ledger_Report.pdf");
      toast.success("PDF exported successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export PDF");
    }
  };

  const handleCloseForm = () => {
    setFormData({
      name: "",
      ledger_group_id: "",
      opening_balance: "",
      balance_type: "DR",
    });
    setErrors({});
    setShowForm(false);
  };

  const columns = [
    { id: "name", label: "Ledger Name" },
    { id: "opening_balance", label: "Opening" },
    { id: "balance_type", label: "Type" },
    { id: "debit", label: "Debit", render: (v, row) => <span className="text-success">₹{(v || row.total_dr || 0).toLocaleString()}</span> },
    { id: "credit", label: "Credit", render: (v, row) => <span className="text-danger">₹{(v || row.total_cr || 0).toLocaleString()}</span> },
    { 
      id: "closing_balance", 
      label: "Closing", 
      render: (v, row) => {
        const opening = Number(row.opening_balance || 0);
        const debit = Number(row.total_dr || row.debit || 0);
        const credit = Number(row.total_cr || row.credit || 0);
        const type = row.balance_type || 'DR';
        
        // If v is provided by API, use it (even if it's 0)
        if (v !== undefined && v !== null) {
          return <strong>₹{Number(v).toLocaleString()}</strong>;
        }
        
        // Fallback calculation: (DR balance is positive, CR is negative)
        const signedOpening = type === 'DR' ? opening : -opening;
        const signedClosing = signedOpening + debit - credit;
        const absClosing = Math.abs(signedClosing);
        const closingType = signedClosing >= 0 ? 'DR' : 'CR';
        
        return (
          <strong>
            ₹{absClosing.toLocaleString()} 
            <span className={closingType === 'DR' ? 'text-primary ms-1 fs-11' : 'text-danger ms-1 fs-11'}>
              {closingType}
            </span>
          </strong>
        );
      }
    },
    { 
      id: "action", 
      label: "Action",
      render: (value, row) => (
        <Link 
          to={`/reports/ledger-statement/${row.id}`} 
          className="btn btn-sm btn-soft-primary"
          title="View Statement"
        >
          <i className="isax isax-document-text me-1"></i>View Statement
        </Link>
      )
    },
  ];

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">Ledger Summary Report</h4>
          <p className="text-muted small mb-0">Overview of all ledger account balances and movements.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-soft-danger d-flex align-items-center" onClick={exportToPDF}>
            <i className="isax isax-document-download me-1"></i>PDF
          </button>
          <button className="btn btn-soft-success d-flex align-items-center" onClick={exportToExcel}>
            <i className="isax isax-export-1 me-1"></i>Excel
          </button>
          <button className="btn btn-primary d-flex align-items-center" onClick={() => fetchLedgers()} disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="isax isax-refresh me-2"></i>}
            Refresh
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">BRANCH</label>
              <select 
                className="form-select text-truncate pe-4" 
                value={selectedBranch} 
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="">All Branches</option>
                {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">FROM DATE</label>
              <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">TO DATE</label>
              <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="isax isax-search-normal fs-14"></i></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search ledgers..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <DataTable
            showSelection={false}
            columns={columns}
            data={filteredData}
            visibleColumns={visibleColumns}
            loading={loading}
          />
        </div>
      </div>

    </>
  );
};

export default LedgerReport;

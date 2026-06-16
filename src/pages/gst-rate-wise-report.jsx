import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import reportService from '../services/reportService';
import PageHeader from '../components/common/PageHeader';

const GstRateWiseReport = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [txnType, setTxnType] = useState('SALES');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Default dates: current month
  useEffect(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Format to YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    setFromDate(formatDate(firstDay));
    setToDate(formatDate(today));
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      fetchReportData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txnType, fromDate, toDate]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const params = {
        type: txnType,
        from_date: fromDate,
        to_date: toDate,
      };
      
      const response = await reportService.getGstRateWiseReport(params);
      if (response && response.data) {
        setReportData(response.data);
      } else {
        setReportData(null);
      }
    } catch (error) {
      console.error('Error fetching GST rate-wise report:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch report data');
      setReportData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!slabs.length) { toast.warning('No data to export. Generate the report first.'); return; }
    try {
      const { jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');
      const doc = new jsPDF();

      const title = `GST Rate-Wise Report — ${txnType === 'SALES' ? 'Outward Supplies (Sales)' : 'Inward Supplies (Purchase)'}`;
      doc.setFontSize(13);
      doc.text(title, 14, 15);
      doc.setFontSize(9);
      doc.text(`Period: ${fromDate} to ${toDate}`, 14, 22);

      autoTable(doc, {
        head: [['GST Rate', 'Invoice Count', 'Taxable Amount', 'CGST', 'SGST', 'IGST', 'Total Tax']],
        body: [
          ...slabs.map(s => [
            `${s.gst_rate}%`,
            s.invoice_count,
            formatCurrency(s.taxable_amount),
            formatCurrency(s.cgst_amount),
            formatCurrency(s.sgst_amount),
            formatCurrency(s.igst_amount),
            formatCurrency(s.total_tax),
          ]),
          ['TOTAL', slabs.reduce((a, c) => a + (c.invoice_count || 0), 0),
            formatCurrency(totals.taxable_amount), formatCurrency(totals.cgst_amount),
            formatCurrency(totals.sgst_amount), formatCurrency(totals.igst_amount),
            formatCurrency(totals.total_tax)],
        ],
        startY: 27,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [88, 58, 205] },
        footStyles: { fontStyle: 'bold' },
      });

      doc.save(`GST_Rate_Wise_${txnType}_${fromDate}_${toDate}.pdf`);
      toast.success('PDF exported successfully');
    } catch (err) {
      console.error('PDF Export error:', err);
      toast.error('Failed to export PDF');
    }
  };

  const handleExportExcel = async () => {
    if (!slabs.length) { toast.warning('No data to export. Generate the report first.'); return; }
    try {
      const XLSX = await import('xlsx');
      const rows = [
        ...slabs.map(s => ({
          'GST Rate': `${s.gst_rate}%`,
          'Invoice Count': s.invoice_count,
          'Taxable Amount': s.taxable_amount,
          'CGST Amount': s.cgst_amount,
          'SGST Amount': s.sgst_amount,
          'IGST Amount': s.igst_amount,
          'Total Tax': s.total_tax,
        })),
        {
          'GST Rate': 'TOTAL',
          'Invoice Count': slabs.reduce((a, c) => a + (c.invoice_count || 0), 0),
          'Taxable Amount': totals.taxable_amount,
          'CGST Amount': totals.cgst_amount,
          'SGST Amount': totals.sgst_amount,
          'IGST Amount': totals.igst_amount,
          'Total Tax': totals.total_tax,
        },
      ];
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'GST Rate-Wise');
      XLSX.writeFile(wb, `GST_Rate_Wise_${txnType}_${fromDate}_${toDate}.xlsx`);
      toast.success('Excel exported successfully');
    } catch (err) {
      console.error('Excel Export error:', err);
      toast.error('Failed to export Excel');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  const slabs = reportData?.slabs || [];
  const totals = reportData?.totals || {};

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">GST Rate-Wise Report</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">Reports</li>
              <li className="breadcrumb-item active text-primary">GST Rate-Wise</li>
            </ol>
          </nav>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-outline-primary d-flex align-items-center dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="isax isax-document-download me-2"></i>
            Export Report
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" onClick={handleExportPDF}>
                <i className="isax isax-document-text me-2"></i>Download as PDF
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleExportExcel}>
                <i className="isax isax-document-download me-2"></i>Download as Excel
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Filter Card */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Transaction Type</label>
              <div className="d-flex">
                <button
                  className={`btn flex-fill me-2 ${
                    txnType === 'SALES' ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                  onClick={() => setTxnType('SALES')}
                >
                  <i className="isax isax-trend-up me-2"></i>Sales
                </button>
                <button
                  className={`btn flex-fill ${
                    txnType === 'PURCHASE' ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                  onClick={() => setTxnType('PURCHASE')}
                >
                  <i className="isax isax-trend-down me-2"></i>Purchase
                </button>
              </div>
            </div>
            
            <div className="col-md-3">
              <label className="form-label fw-semibold">From Date</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="isax isax-calendar-1"></i>
                </span>
                <input
                  type="date"
                  className="form-control border-start-0 ps-0"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">To Date</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="isax isax-calendar-1"></i>
                </span>
                <input
                  type="date"
                  className="form-control border-start-0 ps-0"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-primary w-100"
                onClick={fetchReportData}
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : (
                  <i className="isax isax-search-normal me-2"></i>
                )}
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Summary Details Card */}
      {reportData && !loading && (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-primary bg-opacity-10">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="d-flex align-items-center">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px' }}>
                    <i className="isax isax-chart-21 fs-24"></i>
                  </div>
                  <div>
                    <h5 className="mb-1 fw-bold text-primary">
                      {txnType === 'SALES' ? 'Outward Supplies (Sales)' : 'Inward Supplies (Purchase)'}
                    </h5>
                    <p className="mb-0 text-muted">
                      Period: <span className="fw-medium text-dark">{new Date(fromDate).toLocaleDateString()}</span> to <span className="fw-medium text-dark">{new Date(toDate).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                 <p className="mb-1 text-muted">Total Tax Amount</p>
                 <h3 className="mb-0 fw-bold text-primary">{formatCurrency(totals.total_tax)}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Table Card */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-header bg-white py-3 border-bottom">
          <h6 className="mb-0 fw-bold">Tax Slab Details</h6>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-2 mb-0">Fetching report data...</p>
            </div>
          ) : slabs.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover table-bordered mb-0 align-middle">
                <thead className="table-light text-nowrap">
                  <tr>
                    <th className="ps-4">GST Rate</th>
                    <th className="text-end">Invoice Count</th>
                    <th className="text-end">Taxable Amount</th>
                    <th className="text-end text-primary">CGST Amount</th>
                    <th className="text-end text-primary">SGST Amount</th>
                    <th className="text-end text-success">IGST Amount</th>
                    <th className="text-end pe-4">Total Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {slabs.map((slab, index) => (
                    <tr key={index}>
                      <td className="ps-4 fw-semibold">{slab.gst_rate}%</td>
                      <td className="text-end">{slab.invoice_count}</td>
                      <td className="text-end">{formatCurrency(slab.taxable_amount)}</td>
                      <td className="text-end text-primary">{formatCurrency(slab.cgst_amount)}</td>
                      <td className="text-end text-primary">{formatCurrency(slab.sgst_amount)}</td>
                      <td className="text-end text-success">{formatCurrency(slab.igst_amount)}</td>
                      <td className="text-end pe-4 fw-semibold">{formatCurrency(slab.total_tax)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light fw-bold text-nowrap">
                  <tr>
                    <td className="ps-4 text-uppercase">Total</td>
                    <td className="text-end">
                      {slabs.reduce((acc, curr) => acc + (curr.invoice_count || 0), 0)}
                    </td>
                    <td className="text-end">{formatCurrency(totals.taxable_amount)}</td>
                    <td className="text-end text-primary">{formatCurrency(totals.cgst_amount)}</td>
                    <td className="text-end text-primary">{formatCurrency(totals.sgst_amount)}</td>
                    <td className="text-end text-success">{formatCurrency(totals.igst_amount)}</td>
                    <td className="text-end pe-4">{formatCurrency(totals.total_tax)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="isax isax-document-text fs-1 text-muted mb-3 d-block"></i>
              <h6 className="mb-2">No Data Available</h6>
              <p className="text-muted mb-0">No GST rate-wise data found for the selected period.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GstRateWiseReport;

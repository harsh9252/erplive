import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getGstSummaryReport } from '../services/reportService';

const GstSummaryReport = () => {
  const today = new Date().toISOString().split('T')[0];
  const firstDayOfYear = `${new Date().getFullYear()}-04-01`; // Standard Indian Financial Year Start
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    gstr1: [],
    gstr2: [],
    totals: {
      sales: 0,
      purchases: 0,
      igst: 0,
      cgst: 0,
      sgst: 0
    }
  });

  const [filters, setFilters] = useState({
    from_date: firstDayOfYear,
    to_date: today
  });

  const fetchReport = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getGstSummaryReport(filters);
      const reportData = response.data || response;
      
      // Standardizing response structure
      setData({
        gstr1: reportData.breakdown || reportData.gstr1 || reportData.sales_hsn || [],
        gstr2: reportData.gstr2 || reportData.purchases || [],
        totals: {
          sales: reportData.totals?.taxable_amount || reportData.total_sales || 0,
          purchases: reportData.totals?.purchases_amount || reportData.total_purchases || 0,
          igst: reportData.totals?.igst || reportData.total_igst || 0,
          cgst: reportData.totals?.cgst || reportData.total_cgst || 0,
          sgst: reportData.totals?.sgst || reportData.total_sgst || 0
        }
      });
    } catch (error) {
      console.error('Error fetching GST summary:', error);
      toast.error('Failed to load GST summary report');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">GST Summary Report</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item">Reports</li>
              <li className="breadcrumb-item active">GST Summary</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-2">
            <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0 text-muted small">From</span>
                <input 
                    type="date" 
                    className="form-control border-start-0 ps-0" 
                    name="from_date"
                    value={filters.from_date}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0 text-muted small">To</span>
                <input 
                    type="date" 
                    className="form-control border-start-0 ps-0" 
                    name="to_date"
                    value={filters.to_date}
                    onChange={handleFilterChange}
                />
            </div>
            <button className="btn btn-outline-primary btn-sm px-3 shadow-none" onClick={fetchReport}>
                <i className="isax isax-refresh me-1"></i>
            </button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {[
          { label: 'Total Sales', value: data.totals.sales, color: 'primary', icon: 'export-2' },
          { label: 'Total IGST', value: data.totals.igst, color: 'info', icon: 'receipt-item' },
          { label: 'Total CGST', value: data.totals.cgst, color: 'warning', icon: 'receipt-2' },
          { label: 'Total SGST', value: data.totals.sgst, color: 'success', icon: 'receipt-search' }
        ].map((stat, idx) => (
          <div className="col-md-3" key={idx}>
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className={`badge badge-soft-${stat.color} p-2 rounded`}>
                    <i className={`isax isax-${stat.icon} fs-18`}></i>
                  </span>
                  <span className="text-muted small fw-bold uppercase">Reported</span>
                </div>
                <h5 className="fw-bold mb-1">₹{Number(stat.value).toLocaleString()}</h5>
                <p className="text-muted small mb-0">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GSTR-1 Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white border-0 py-3">
          <h6 className="fw-bold mb-0">GSTR-1 Outward Supplies (Overview)</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light fs-12 text-uppercase">
                <tr>
                  <th className="ps-4">Invoice Type</th>
                  <th>Place of Supply</th>
                  <th className="text-center">Invoice Count</th>
                  <th className="text-end">Taxable Value</th>
                  <th className="text-end">IGST</th>
                  <th className="text-end">CGST</th>
                  <th className="text-end pe-4">SGST</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                    <tr><td colSpan="7" className="text-center py-4">Loading GSTR-1 data...</td></tr>
                ) : data.gstr1.length === 0 ? (
                    <tr><td colSpan="7" className="text-center py-4 text-muted">No outward supplies found for this period.</td></tr>
                ) : (
                  data.gstr1.map((item, idx) => (
                    <tr key={idx}>
                      <td className="ps-4 fw-medium"><span className="badge bg-soft-primary text-primary px-2">{item.invoice_type || item.hsn_code}</span></td>
                      <td>{item.place_of_supply || item.description}</td>
                      <td className="text-center"><span className="badge bg-light text-dark fw-normal">{item.invoice_count || item.qty || 1}</span></td>
                      <td className="text-end fw-medium">₹{Number(item.taxable_amount || item.taxable_value || 0).toLocaleString()}</td>
                      <td className="text-end">₹{Number(item.igst || item.igst_amount || 0).toLocaleString()}</td>
                      <td className="text-end">₹{Number(item.cgst || item.cgst_amount || 0).toLocaleString()}</td>
                      <td className="text-end pe-4">₹{Number(item.sgst || item.sgst_amount || 0).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
              {!loading && data.gstr1.length > 0 && (
                <tfoot className="bg-light fw-bold border-top">
                  <tr>
                    <td colSpan="3" className="ps-4 text-center text-uppercase">Totals</td>
                    <td className="text-end text-primary">₹{data.gstr1.reduce((s, i) => s + Number(i.taxable_amount || i.taxable_value || 0), 0).toLocaleString()}</td>
                    <td className="text-end">₹{data.gstr1.reduce((s, i) => s + Number(i.igst || i.igst_amount || 0), 0).toLocaleString()}</td>
                    <td className="text-end">₹{data.gstr1.reduce((s, i) => s + Number(i.cgst || i.cgst_amount || 0), 0).toLocaleString()}</td>
                    <td className="text-end pe-4">₹{data.gstr1.reduce((s, i) => s + Number(i.sgst || i.sgst_amount || 0), 0).toLocaleString()}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>

      {/* GSTR-2 Section */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 py-3">
          <h6 className="fw-bold mb-0">GSTR-2 Inward Supplies (Purchases)</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light fs-12 text-uppercase">
                <tr>
                  <th className="ps-4">Party Name</th>
                  <th>GSTIN</th>
                  <th>Invoice No</th>
                  <th>Date</th>
                  <th className="text-end">Taxable Value</th>
                  <th className="text-end">IGST</th>
                  <th className="text-end">CGST</th>
                  <th className="text-end pe-4">SGST</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                    <tr><td colSpan="8" className="text-center py-4">Loading GSTR-2 data...</td></tr>
                ) : data.gstr2.length === 0 ? (
                    <tr><td colSpan="8" className="text-center py-4 text-muted">No inward supplies found for this period.</td></tr>
                ) : (
                  data.gstr2.map((item, idx) => (
                    <tr key={idx}>
                      <td className="ps-4 fw-medium text-primary">{item.vendor_name || item.party_name}</td>
                      <td><span className="fs-12 text-muted">{item.gstin || 'N/A'}</span></td>
                      <td>{item.invoice_no}</td>
                      <td>{item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}</td>
                      <td className="text-end fw-medium">₹{Number(item.taxable_value).toLocaleString()}</td>
                      <td className="text-end">₹{Number(item.igst_amount || 0).toLocaleString()}</td>
                      <td className="text-end">₹{Number(item.cgst_amount || 0).toLocaleString()}</td>
                      <td className="text-end pe-4">₹{Number(item.sgst_amount || 0).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
              {!loading && data.gstr2.length > 0 && (
                <tfoot className="bg-light fw-bold border-top">
                  <tr>
                    <td colSpan="4" className="ps-4 text-center text-uppercase">Totals</td>
                    <td className="text-end text-primary">₹{data.gstr2.reduce((s, i) => s + Number(i.taxable_value || 0), 0).toLocaleString()}</td>
                    <td className="text-end">₹{data.gstr2.reduce((s, i) => s + Number(i.igst_amount || 0), 0).toLocaleString()}</td>
                    <td className="text-end">₹{data.gstr2.reduce((s, i) => s + Number(i.cgst_amount || 0), 0).toLocaleString()}</td>
                    <td className="text-end pe-4">₹{data.gstr2.reduce((s, i) => s + Number(i.sgst_amount || 0), 0).toLocaleString()}</td>
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

export default GstSummaryReport;

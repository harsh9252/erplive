import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getStockSummaryReport } from '../services/reportService';
import { getWarehouses } from '../services/settingsService';

const StockSummary = () => {
  const [data, setData] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    warehouse_id: '',
    category: '',
    item: '',
    search: ''
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [reportRes, warehouseRes] = await Promise.all([
        getStockSummaryReport(filters),
        getWarehouses()
      ]);
      
      const reportData = reportRes.data || reportRes;
      setData(Array.isArray(reportData) ? reportData : (reportData?.rows || reportData?.items || []));
      setWarehouses(warehouseRes.data || []);
    } catch (error) {
      console.error('Error fetching stock summary:', error);
      toast.error('Failed to load stock summary data');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const totals = data.reduce((acc, curr) => ({
    opening: acc.opening + (Number(curr.opening_stock || curr.opening) || 0),
    in: acc.in + (Number(curr.in_qty || curr.qty_in) || 0),
    out: acc.out + (Number(curr.out_qty || curr.qty_out) || 0),
    closing: acc.closing + (Number(curr.closing_stock || curr.closing) || 0),
    value: acc.value + (Number(curr.stock_value || curr.value) || 0)
  }), { opening: 0, in: 0, out: 0, closing: 0, value: 0 });

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Stock Summary</h4>
          <p className="text-muted mb-0 fs-13">Detailed report of inventory movements and values.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-white border rounded-pill px-4 shadow-sm" onClick={() => window.print()}>
            <i className="isax isax-printer me-2"></i>Print Report
          </button>
          <div className="dropdown">
            <button className="btn btn-primary rounded-pill px-4 shadow-sm dropdown-toggle" data-bs-toggle="dropdown">
              <i className="isax isax-export-1 me-2"></i>Export
            </button>
            <ul className="dropdown-menu border-0 shadow rounded-12">
              <li><button className="dropdown-item py-2"><i className="far fa-file-pdf me-2 text-danger"></i>Export PDF</button></li>
              <li><button className="dropdown-item py-2"><i className="far fa-file-excel me-2 text-success"></i>Export Excel</button></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-primary text-white">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="opacity-75 fs-12 uppercase fw-bold">Opening Stock</span>
                <i className="isax isax-box-1 opacity-25 fs-20"></i>
              </div>
              <h4 className="fw-bold mb-0">{totals.opening.toLocaleString()}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-success text-white">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="opacity-75 fs-12 uppercase fw-bold">Stock Inward (Qty)</span>
                <i className="isax isax-import opacity-25 fs-20"></i>
              </div>
              <h4 className="fw-bold mb-0">+{totals.in.toLocaleString()}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-danger text-white">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="opacity-75 fs-12 uppercase fw-bold">Stock Outward (Qty)</span>
                <i className="isax isax-export opacity-25 fs-20"></i>
              </div>
              <h4 className="fw-bold mb-0">-{totals.out.toLocaleString()}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-dark text-white">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="opacity-75 fs-12 uppercase fw-bold">Total Stock Value</span>
                <i className="isax isax-money opacity-25 fs-20"></i>
              </div>
              <h4 className="fw-bold mb-0">₹{totals.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white py-3 border-0">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><i className="isax isax-search-normal-1"></i></span>
                <input 
                  type="text" 
                  className="form-control bg-light border-0 shadow-none" 
                  placeholder="Search item or SKU..." 
                  name="search"
                  value={filters.search}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select className="form-select bg-light border-0 shadow-none" name="warehouse_id" value={filters.warehouse_id} onChange={handleFilterChange}>
                <option value="">All Warehouses</option>
                {warehouses.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3 text-end ms-auto">
              <button className="btn btn-outline-primary rounded-pill px-3" data-bs-toggle="offcanvas" data-bs-target="#stockFilterCanvas">
                <i className="isax isax-filter me-2"></i>Advanced Filter
              </button>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light text-dark fw-bold uppercase fs-11 tracking-wider">
                <tr>
                  <th className="ps-4">Item & SKU</th>
                  <th className="text-center">Unit</th>
                  <th className="text-end">Opening</th>
                  <th className="text-end text-success">IN Qty</th>
                  <th className="text-end text-danger">OUT Qty</th>
                  <th className="text-end fw-bold">Closing</th>
                  <th className="text-end pe-4">Stock Value (₹)</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border text-primary"></div>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">No stock data found for the selected filters.</td>
                  </tr>
                ) : (
                  data.map((item, idx) => (
                    <tr key={idx}>
                      <td className="ps-4">
                        <div className="fw-bold text-dark">{item.name || item.item_name || 'Stock Item'}</div>
                        <small className="text-muted">{item.sku || 'No SKU'}</small>
                      </td>
                      <td className="text-center"><span className="badge bg-soft-info text-info border-info px-2">{item.unit || 'PCS'}</span></td>
                      <td className="text-end">{Number(item.opening_stock || item.opening || 0).toLocaleString()}</td>
                      <td className="text-end text-success">+{Number(item.in_qty || item.qty_in || 0).toLocaleString()}</td>
                      <td className="text-end text-danger">-{Number(item.out_qty || item.qty_out || 0).toLocaleString()}</td>
                      <td className="text-end fw-bold">{Number(item.closing_stock || item.closing || 0).toLocaleString()}</td>
                      <td className="text-end pe-4 fw-bold text-dark">₹{Number(item.stock_value || item.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="stockFilterCanvas">
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold">Stock Summary Filter</h5>
          <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-4">
            <label className="form-label fw-bold">Category</label>
            <select className="form-select shadow-none" name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              {Array.from(new Set(data.map(i => i.category).filter(Boolean))).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Minimum Stock</label>
            <input type="number" className="form-control shadow-none" placeholder="Show items below..." />
          </div>
          <div className="d-grid mt-auto">
            <button className="btn btn-primary rounded-pill py-2" data-bs-dismiss="offcanvas">Apply Filters</button>
            <button className="btn btn-link text-muted mt-2 fs-13" onClick={() => setFilters({ warehouse_id: '', category: '', item: '', search: '' })}>Clear All Filters</button>
          </div>
        </div>
      </div>
    </div>
  );

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  }
};

export default StockSummary;

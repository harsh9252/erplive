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
    search: '',
    stock_type: ''
  });
  const [units, setUnits] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Dynamically import getItems to avoid circular/missing imports if it wasn't imported
      const { getItems } = await import('../services/itemService');
      const [reportRes, warehouseRes, itemsRes] = await Promise.all([
        getStockSummaryReport(filters),
        getWarehouses(),
        getItems(1, 5000)
      ]);

      let reportData = reportRes.data || reportRes;
      let dataArray = Array.isArray(reportData) ? reportData : (reportData?.rows || reportData?.items || []);

      const itemsList = Array.isArray(itemsRes?.data) ? itemsRes.data : (itemsRes?.data?.rows || []);

      // Augment report data with missing fields from item master fallback
      const augmentedData = dataArray.map(row => {
        const itemMaster = itemsList.find(i => String(i.id) === String(row.item_id || row.id));
        return {
          ...row,
          opening_stock: (row.opening_stock != null && Number(row.opening_stock) !== 0) ? row.opening_stock : (itemMaster?.opening_stock || 0),
          unit: row.uom || row.unit || itemMaster?.unit || itemMaster?.uom || 'PCS',
          avg_cost: row.avg_rate || row.avg_cost || itemMaster?.avg_cost || itemMaster?.purchase_price || 0,
          stock_type: row.stock_type || itemMaster?.stock_type || 'Raw Material',
        };
      });

      setData(augmentedData);
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
    // Load units from central registry
    const storedUnits = localStorage.getItem('units');
    if (storedUnits) {
      setUnits(JSON.parse(storedUnits));
    }
  }, [fetchData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const getVal = (obj, keys) => {
    for (let k of keys) {
      if (obj[k] != null && obj[k] !== '') return Number(obj[k]) || 0;
    }
    return 0;
  };

  const getOpening = (item) => getVal(item, ['opening_stock', 'opening', 'opening_quantity', 'opening_qty', 'opening_balance']);
  const getIn = (item) => getVal(item, ['in_qty', 'qty_in', 'inward_quantity', 'inward_qty', 'inward', 'purchase_qty']);
  const getOut = (item) => getVal(item, ['out_qty', 'qty_out', 'outward_quantity', 'outward_qty', 'outward', 'sale_qty']);
  const getClosing = (item) => getVal(item, ['closing_stock', 'closing', 'closing_quantity', 'closing_qty', 'current_stock', 'balance']);
  const getValue = (item) => getVal(item, ['stock_value', 'value', 'total_value']);

  const filteredData = React.useMemo(() => {
    return data.filter(item => {
      let match = true;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const itemName = (item.name || item.item_name || '').toLowerCase();
        const itemSku = (item.sku || '').toLowerCase();
        match = match && (itemName.includes(q) || itemSku.includes(q));
      }
      if (filters.category) {
        match = match && (item.category === filters.category);
      }
      if (filters.warehouse_id && item.warehouse_id) {
        match = match && (String(item.warehouse_id) === String(filters.warehouse_id));
      }
      if (filters.stock_type) {
        match = match && ((item.stock_type || 'Raw Material') === filters.stock_type);
      }
      return match;
    });
  }, [data, filters]);

  const totals = filteredData.reduce((acc, curr) => ({
    opening: acc.opening + getOpening(curr),
    in: acc.in + getIn(curr),
    out: acc.out + getOut(curr),
    closing: acc.closing + getClosing(curr),
    value: acc.value + getValue(curr)
  }), { opening: 0, in: 0, out: 0, closing: 0, value: 0 });

  const handleExportPDF = async () => {
    if (filteredData.length === 0) {
      toast.warning('No data available to export.');
      return;
    }
    const toastId = toast.loading('Generating PDF...');
    try {
      const jspdfModule = await import('jspdf');
      const jsPDF = jspdfModule.default || jspdfModule.jsPDF || jspdfModule;
      const autotableModule = await import('jspdf-autotable');
      const autoTable = autotableModule.default || autotableModule;

      const doc = new jsPDF();

      doc.text('Stock Summary Report', 14, 15);
      doc.setFontSize(10);

      const tableData = filteredData.map(item => [
        item.name || item.item_name || 'Stock Item',
        item.sku || 'No SKU',
        item.unit || 'PCS',
        getOpening(item).toLocaleString(),
        getIn(item) > 0 ? `+${getIn(item).toLocaleString()}` : '0',
        getOut(item) > 0 ? `-${getOut(item).toLocaleString()}` : '0',
        getClosing(item).toLocaleString(),
        `Rs ${getValue(item).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
      ]);

      autoTable(doc, {
        startY: 25,
        head: [['Item Name', 'SKU', 'Unit', 'Opening', 'IN Qty', 'OUT Qty', 'Closing', 'Stock Value']],
        body: tableData,
      });

      doc.save('Stock_Summary_Report.pdf');
      toast.update(toastId, { render: 'PDF generated successfully!', type: 'success', isLoading: false, autoClose: 3000 });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.update(toastId, { render: 'Failed to generate PDF.', type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  const handleExportExcel = async () => {
    if (filteredData.length === 0) {
      toast.warning('No data available to export.');
      return;
    }
    const toastId = toast.loading('Generating Excel...');
    try {
      const XLSX = await import('xlsx');

      const exportData = filteredData.map(item => ({
        'Item Name': item.name || item.item_name || 'Stock Item',
        'SKU': item.sku || 'No SKU',
        'Unit': item.unit || 'PCS',
        'Opening Stock': getOpening(item),
        'Inward Qty': getIn(item),
        'Outward Qty': getOut(item),
        'Closing Stock': getClosing(item),
        'Stock Value': getValue(item)
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Stock Summary');
      XLSX.writeFile(wb, 'Stock_Summary_Report.xlsx');

      toast.update(toastId, { render: 'Excel generated successfully!', type: 'success', isLoading: false, autoClose: 3000 });
    } catch (error) {
      console.error('Error generating Excel:', error);
      toast.update(toastId, { render: 'Failed to generate Excel.', type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Stock Summary</h4>
          <p className="text-muted mb-0 fs-13">Detailed report of inventory movements and values.</p>
        </div>
        <div className="d-flex gap-2">
          <div className="dropdown">
            <button className="btn btn-primary rounded-pill px-4 shadow-sm dropdown-toggle" data-bs-toggle="dropdown">
              <i className="isax isax-export-1 me-2"></i>Export
            </button>
            <ul className="dropdown-menu border-0 shadow rounded-12">
              <li><button className="dropdown-item py-2" onClick={handleExportPDF}><i className="isax isax-document-text me-2 text-danger"></i>Export PDF</button></li>
              <li><button className="dropdown-item py-2" onClick={handleExportExcel}><i className="isax isax-document-1 me-2 text-success"></i>Export Excel</button></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col">
          <div className="card border-0 shadow-sm bg-primary text-white h-100">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="opacity-75 fs-12 uppercase fw-bold">Opening</span>
                <i className="isax isax-box-1 opacity-25 fs-20"></i>
              </div>
              <h4 className="fw-bold mb-0">{totals.opening.toLocaleString()}</h4>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card border-0 shadow-sm bg-success text-white h-100">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="opacity-75 fs-12 uppercase fw-bold">Inward</span>
                <i className="isax isax-import opacity-25 fs-20"></i>
              </div>
              <h4 className="fw-bold mb-0">{totals.in > 0 ? `+${totals.in.toLocaleString()}` : '0'}</h4>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card border-0 shadow-sm bg-danger text-white h-100">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="opacity-75 fs-12 uppercase fw-bold">Outward</span>
                <i className="isax isax-export opacity-25 fs-20"></i>
              </div>
              <h4 className="fw-bold mb-0">{totals.out > 0 ? `-${totals.out.toLocaleString()}` : '0'}</h4>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card border-0 shadow-sm bg-info text-white h-100">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="opacity-75 fs-12 uppercase fw-bold">Closing</span>
                <i className="isax isax-box opacity-25 fs-20"></i>
              </div>
              <h4 className="fw-bold mb-0">{totals.closing.toLocaleString()}</h4>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card border-0 shadow-sm bg-dark text-white h-100">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="opacity-75 fs-12 uppercase fw-bold">Value</span>
                <i className="isax isax-money opacity-25 fs-20"></i>
              </div>
              <h4 className="fw-bold mb-0 text-white">₹{totals.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 flex-wrap mb-4">
        {['', 'Raw Material', 'Finished Good', 'Semi-Finished / WIP', 'Trading Good'].map(type => (
          <button
            key={type || 'all'}
            className={`btn btn-sm rounded-pill px-3 ${filters.stock_type === type
                ? (type === '' ? 'btn-dark' : type === 'Raw Material' ? 'btn-warning' : type === 'Finished Good' ? 'btn-success' : type === 'Semi-Finished / WIP' ? 'btn-info' : 'btn-primary')
                : 'btn-outline-secondary'
              }`}
            onClick={() => setFilters(prev => ({ ...prev, stock_type: type }))}
          >
            {type === '' ? '🗂 All Stock' : type === 'Raw Material' ? ' Raw Material' : type === 'Finished Good' ? 'Finished Good' : type === 'Semi-Finished / WIP' ? 'WIP' : 'Trading Good'}
          </button>
        ))}
      </div>

      {/* Bifurcation summary */}
      {!loading && data.length > 0 && (
        <div className="row g-3 mb-4">
          {['Raw Material', 'Finished Good', 'Semi-Finished / WIP', 'Trading Good'].map(type => {
            const typeItems = data.filter(i => (i.stock_type || 'Raw Material') === type);
            const typeValue = typeItems.reduce((s, i) => s + getValue(i), 0);
            const typeQty = typeItems.reduce((s, i) => s + getClosing(i), 0);
            if (typeItems.length === 0) return null;
            const colors = {
              'Raw Material': { bg: 'bg-warning', text: 'text-dark', icon: 'isax-box-1' },
              'Finished Good': { bg: 'bg-success', text: 'text-white', icon: 'isax-box-tick' },
              'Semi-Finished / WIP': { bg: 'bg-info', text: 'text-white', icon: 'isax-arrange-circle' },
              'Trading Good': { bg: 'bg-primary', text: 'text-white', icon: 'isax-shop' },
            }[type];
            return (
              <div key={type} className="col-md-3 col-6">
                <div className={`card border-0 shadow-sm ${colors.bg}`}>
                  <div className={`card-body py-3 ${colors.text}`}>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span className="fs-11 fw-bold opacity-80 text-uppercase">{type}</span>
                      <i className={`isax ${colors.icon} opacity-50 fs-18`}></i>
                    </div>
                    <div className="fw-bold fs-15">₹{typeValue.toLocaleString('en-IN', { minimumFractionDigits: 0 })}</div>
                    <div className="fs-11 opacity-75">{typeItems.length} items · {typeQty.toLocaleString()} units</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
                  <th className="text-end text-primary">Avg Price (₹)</th>
                  <th className="text-end pe-4">Stock Value (₹)</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <div className="spinner-border text-primary"></div>
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5 text-muted">No stock data found for the selected filters.</td>
                  </tr>
                ) : (
                  filteredData.map((item, idx) => (
                    <tr key={idx}>
                      <td className="ps-4">
                        <div className="fw-bold text-dark">{item.name || item.item_name || 'Stock Item'}</div>
                        <small className="text-muted">{item.sku || 'No SKU'}</small>
                        {item.stock_type && (
                          <span className={`badge ms-2 fs-10 px-2 ${item.stock_type === 'Raw Material' ? 'bg-warning text-dark' :
                              item.stock_type === 'Finished Good' ? 'bg-success text-white' :
                                item.stock_type === 'Semi-Finished / WIP' ? 'bg-info text-white' :
                                  item.stock_type === 'Trading Good' ? 'bg-primary text-white' : 'bg-secondary text-white'
                            }`}>{item.stock_type}</span>
                        )}
                      </td>
                      <td className="text-center">
                        <span className="badge bg-soft-info text-info border-info px-2">{item.unit || 'PCS'}</span>
                        {(() => {
                          const unitDetails = units.find(u => u.shortName === item.unit);
                          if (unitDetails && unitDetails.isDerived && unitDetails.baseUnitId) {
                            const baseUnit = units.find(u => u.id == unitDetails.baseUnitId);
                            return (
                              <div className="fs-10 text-muted mt-1 italic">
                                1 {item.unit} = {unitDetails.conversionFactor} {baseUnit?.shortName}
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </td>
                      <td className="text-end">{getOpening(item).toLocaleString()}</td>
                      <td className="text-end text-success">{getIn(item) > 0 ? `+${getIn(item).toLocaleString()}` : '0'}</td>
                      <td className="text-end text-danger">{getOut(item) > 0 ? `-${getOut(item).toLocaleString()}` : '0'}</td>
                      <td className="text-end fw-bold">
                        {getClosing(item).toLocaleString()}
                        {(() => {
                          const unitDetails = units.find(u => u.shortName === item.unit);
                          if (unitDetails && unitDetails.isDerived && unitDetails.baseUnitId) {
                            const totalBase = getClosing(item) * Number(unitDetails.conversionFactor);
                            const baseUnit = units.find(u => u.id == unitDetails.baseUnitId);
                            return (
                              <div className="fs-11 text-success fw-normal mt-1">
                                (= {totalBase.toLocaleString()} {baseUnit?.shortName})
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </td>
                      <td className="text-end text-primary fw-semibold">
                        {(() => {
                          const closing = getClosing(item);
                          const value = getValue(item);
                          if (closing > 0 && value > 0) {
                            const avgP = value / closing;
                            return `₹${avgP.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
                          }
                          const directAvg = item.avg_cost || item.average_cost || item.purchase_price || item.cost_price;
                          if (directAvg) return `₹${Number(directAvg).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
                          return <span className="text-muted fs-11">—</span>;
                        })()}
                      </td>
                      <td className="text-end pe-4 fw-bold text-dark">₹{getValue(item).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
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

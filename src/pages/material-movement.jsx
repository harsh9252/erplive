import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import materialMovementService from '../services/materialMovementService';
import productionOrderService from '../services/productionOrderService';

const MaterialMovement = () => {
  const [loading, setLoading] = useState(true);
  const [movements, setMovements] = useState([]);
  const [summary, setSummary] = useState([]);
  const [productionOrders, setProductionOrders] = useState([]);

  // Filters
  const [movementType, setMovementType] = useState('ALL');
  const [productionOrderId, setProductionOrderId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Default dates: current month
  useEffect(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    setFromDate(formatDate(firstDay));
    setToDate(formatDate(today));
  }, []);

  const loadProductionOrders = useCallback(async () => {
    try {
      const resp = await productionOrderService.getProductionOrders({ limit: 500 });
      let list = resp?.data ?? resp ?? [];
      if (!Array.isArray(list)) list = list?.data ?? list?.items ?? [];
      setProductionOrders(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error('Failed to load production orders', error);
    }
  }, []);

  const fetchMovementData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        movement_type: movementType,
        ...(productionOrderId && { production_order_id: productionOrderId }),
        ...(fromDate && { from_date: fromDate }),
        ...(toDate && { to_date: toDate }),
      };
      
      const response = await materialMovementService.getMaterialMovement(params);
      if (response && response.data) {
        setMovements(response.data.movements || []);
        setSummary(response.data.summary || []);
      } else {
        setMovements([]);
        setSummary([]);
      }
    } catch (error) {
      console.error('Error fetching material movement data:', error);
      toast.error(error?.response?.data?.message || 'Failed to load material movements');
      setMovements([]);
      setSummary([]);
    } finally {
      setLoading(false);
    }
  }, [movementType, productionOrderId, fromDate, toDate]);

  useEffect(() => {
    loadProductionOrders();
  }, [loadProductionOrders]);

  useEffect(() => {
    if (fromDate && toDate) {
      fetchMovementData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movementType, productionOrderId, fromDate, toDate]);

  const handleExportPDF = async () => {
    if (movements.length === 0) {
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
      
      doc.text('Material Movement Report', 14, 15);
      doc.setFontSize(10);
      doc.text(`Date Range: ${fromDate} to ${toDate}`, 14, 22);

      const tableData = movements.map(mov => {
        const type = mov.movement_type || (mov.reference_type === 'PRODUCTION' ? (mov.txn_type === 'OUT' ? 'RAW_MATERIAL' : 'FINISHED_GOODS') : mov.reference_type);
        const po = mov.productionOrder || mov.production_order;
        return [
          mov.created_at ? new Date(mov.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—',
          mov.item?.name || mov.item_name || '—',
          mov.warehouse?.name || mov.warehouse_name || '—',
          type === 'RAW_MATERIAL' ? 'Consumed' : type === 'FINISHED_GOODS' ? 'Produced' : type || '—',
          mov.txn_type === 'OUT' ? `-${mov.qty}` : `+${mov.qty}`,
          po ? (po.order_number || `Order #${po.id}`) : '—'
        ];
      });

      autoTable(doc, {
        startY: 30,
        head: [['Date', 'Item', 'Warehouse', 'Type', 'Qty', 'Reference']],
        body: tableData,
      });

      doc.save('Material_Movement_Report.pdf');
      toast.update(toastId, { render: 'PDF generated successfully!', type: 'success', isLoading: false, autoClose: 3000 });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.update(toastId, { render: 'Failed to generate PDF.', type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  const handleExportExcel = async () => {
    if (movements.length === 0) {
      toast.warning('No data available to export.');
      return;
    }
    const toastId = toast.loading('Generating Excel...');
    try {
      const XLSX = await import('xlsx');
      
      const exportData = movements.map(mov => {
        const type = mov.movement_type || (mov.reference_type === 'PRODUCTION' ? (mov.txn_type === 'OUT' ? 'RAW_MATERIAL' : 'FINISHED_GOODS') : mov.reference_type);
        const po = mov.productionOrder || mov.production_order;
        return {
          Date: mov.created_at ? new Date(mov.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—',
          Item: mov.item?.name || mov.item_name || '—',
          Warehouse: mov.warehouse?.name || mov.warehouse_name || '—',
          Type: type === 'RAW_MATERIAL' ? 'Consumed' : type === 'FINISHED_GOODS' ? 'Produced' : type || '—',
          Qty: mov.txn_type === 'OUT' ? -mov.qty : mov.qty,
          Reference: po ? (po.order_number || `Order #${po.id}`) : '—'
        };
      });

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Movements');
      XLSX.writeFile(wb, 'Material_Movement_Report.xlsx');
      
      toast.update(toastId, { render: 'Excel generated successfully!', type: 'success', isLoading: false, autoClose: 3000 });
    } catch (error) {
      console.error('Error generating Excel:', error);
      toast.update(toastId, { render: 'Failed to generate Excel.', type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  const getStatusBadge = (mov) => {
    const type = mov.movement_type || (mov.reference_type === 'PRODUCTION' ? (mov.txn_type === 'OUT' ? 'RAW_MATERIAL' : 'FINISHED_GOODS') : mov.reference_type);
    switch (type) {
      case 'RAW_MATERIAL':
        return <span className="badge bg-soft-danger text-danger">Raw Material (Consumed)</span>;
      case 'FINISHED_GOODS':
        return <span className="badge bg-soft-success text-success">Finished Goods (Produced)</span>;
      default:
        return <span className="badge bg-light text-dark">{type || '—'}</span>;
    }
  };

  return (
    <div className="container-fluid py-4 text-dark">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">Material Movement</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/"><i className="isax isax-home-2 me-1"></i>Home</Link>
              </li>
              <li className="breadcrumb-item">Manufacturing</li>
              <li className="breadcrumb-item active text-primary">Material Movement</li>
            </ol>
          </nav>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-outline-primary d-flex align-items-center rounded-pill px-4"
            type="button"
            id="exportDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="isax isax-document-download me-2"></i>
            Export
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0" aria-labelledby="exportDropdown">
            <li>
              <button className="dropdown-item d-flex align-items-center" onClick={handleExportPDF}>
                <i className="isax isax-document-text me-2 text-danger"></i> Export as PDF
              </button>
            </li>
            <li>
              <button className="dropdown-item d-flex align-items-center" onClick={handleExportExcel}>
                <i className="isax isax-document-1 me-2 text-success"></i> Export as Excel
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Filter Card */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label fw-semibold">Movement Type</label>
              <select 
                className="form-select" 
                value={movementType} 
                onChange={(e) => setMovementType(e.target.value)}
              >
                <option value="ALL">All Movements</option>
                <option value="RAW_MATERIAL">Raw Material (Consumed)</option>
                <option value="FINISHED_GOODS">Finished Goods (Produced)</option>
              </select>
            </div>
            
            <div className="col-md-3">
              <label className="form-label fw-semibold">Production Order</label>
              <select 
                className="form-select" 
                value={productionOrderId} 
                onChange={(e) => setProductionOrderId(e.target.value)}
              >
                <option value="">All Orders</option>
                {productionOrders.map((po) => (
                  <option key={po.id} value={po.id}>
                    {po.order_number || `Order #${po.id}`}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-2">
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

            <div className="col-md-2">
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
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                onClick={fetchMovementData}
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : (
                  <i className="isax isax-refresh me-2"></i>
                )}
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Item-wise Summary Table */}
        <div className="col-12 col-xl-4 mb-4">
          <div className="card shadow-sm border-0 rounded-4 h-100">
            <div className="card-header bg-white py-3 border-bottom d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                <i className="isax isax-box-tick fs-18"></i>
              </div>
              <h6 className="mb-0 fw-bold">Item-Wise Summary</h6>
            </div>
            <div className="card-body p-0">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border spinner-border-sm text-primary mb-2"></div>
                  <p className="text-muted small mb-0">Loading summary...</p>
                </div>
              ) : summary.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover mb-0 align-middle">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">Item Name</th>
                        <th className="text-center text-danger">Consumed</th>
                        <th className="text-center text-success pe-4">Produced</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summary.map((row, index) => (
                        <tr key={index}>
                          <td className="ps-4 fw-medium text-dark">{row.item_name}</td>
                          <td className="text-center text-danger fw-semibold">{row.total_consumed > 0 ? row.total_consumed : '—'}</td>
                          <td className="text-center text-success fw-semibold pe-4">{row.total_produced > 0 ? row.total_produced : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  <i className="isax isax-empty-wallet fs-2 d-block mb-2 text-black-50"></i>
                  <p className="mb-0 small">No summary data found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Logs Table */}
        <div className="col-12 col-xl-8 mb-4">
          <div className="card shadow-sm border-0 rounded-4 h-100">
            <div className="card-header bg-white py-3 border-bottom d-flex align-items-center">
              <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                <i className="isax isax-task-square fs-18"></i>
              </div>
              <h6 className="mb-0 fw-bold">Detailed Movement Logs</h6>
            </div>
            <div className="card-body p-0">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary"></div>
                  <p className="text-muted mt-2 mb-0">Fetching movement logs...</p>
                </div>
              ) : movements.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover mb-0 align-middle text-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">Date</th>
                        <th>Item</th>
                        <th>Warehouse</th>
                        <th className="text-center">Movement Type</th>
                        <th className="text-end">Qty</th>
                        <th className="ps-4 pe-4">Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movements.map((mov) => {
                        const po = mov.productionOrder || mov.production_order;
                        return (
                        <tr key={mov.id}>
                          <td className="ps-4 text-muted small">
                            {mov.created_at ? new Date(mov.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'}
                          </td>
                          <td className="fw-medium text-dark">{mov.item?.name || mov.item_name || '—'}</td>
                          <td>
                            <span className="badge bg-light text-dark border"><i className="isax isax-building-3 me-1"></i>{mov.warehouse?.name || mov.warehouse_name || '—'}</span>
                          </td>
                          <td className="text-center">
                            {getStatusBadge(mov)}
                          </td>
                          <td className="text-end fw-bold">
                            {mov.txn_type === 'OUT' ? (
                              <span className="text-danger">-{mov.qty}</span>
                            ) : (
                              <span className="text-success">+{mov.qty}</span>
                            )}
                          </td>
                          <td className="ps-4 pe-4">
                            {po ? (
                              <Link to={`/manufacturing/production-order/view/${po.id}`} className="text-decoration-none fw-semibold">
                                {po.order_number || `Order #${po.id}`}
                              </Link>
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="isax isax-document-text fs-1 text-muted mb-3 d-block"></i>
                  <h6 className="mb-2">No Movement Logs</h6>
                  <p className="text-muted mb-0 small">No material movement data found for the selected criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialMovement;

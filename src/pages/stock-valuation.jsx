import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getStockValuationReport } from '../services/reportService';

/* ─── Constants ─────────────────────────────────────────────────── */
const STOCK_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'RAW_MATERIAL', label: 'Raw Material' },
  { value: 'FINISHED_GOOD', label: 'Finished Good' },
  { value: 'SEMI_FINISHED', label: 'WIP / Semi-Finished' },
  { value: 'TRADING', label: 'Trading Good' },
  { value: 'CONSUMABLE', label: 'Consumable' },
];

const STOCK_TYPE_LABEL = {
  RAW_MATERIAL: 'Raw Material',
  FINISHED_GOOD: 'Finished Good',
  SEMI_FINISHED: 'WIP',
  TRADING: 'Trading Good',
  CONSUMABLE: 'Consumable',
};

const TYPE_COLORS = {
  'Raw Material':   { pill: 'warning',  icon: 'isax-box' },
  'Finished Good':  { pill: 'success',  icon: 'isax-box-tick' },
  'WIP':            { pill: 'info',     icon: 'isax-setting-2' },
  'Trading Good':   { pill: 'primary',  icon: 'isax-shop' },
  'Consumable':     { pill: 'danger',   icon: 'isax-trash' },
};
const getTypeColor = (t = '') => TYPE_COLORS[t] || { pill: 'secondary', icon: 'isax-box' };

const fmt  = (n) => Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
const fmtR = (n) => `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ─── Component ─────────────────────────────────────────────────── */
const StockValuation = () => {
  const [rows,       setRows]       = useState([]);
  const [summary,    setSummary]    = useState({ total_value: 0, total_qty: 0, item_count: 0, bifurcation: {} });
  const [loading,    setLoading]    = useState(true);
  const [stockType,  setStockType]  = useState('');
  const [search,     setSearch]     = useState('');

  /* fetch --------------------------------------------------------- */
  const fetchData = useCallback(async (type = stockType) => {
    setLoading(true);
    try {
      const res = await getStockValuationReport(type ? { stock_type: type } : {});
      // API response: { success, data: { items: [], bifurcation: [], total_stock_value } }
      const payload = res?.data || res || {};

      // Normalise rows — API returns data.items array
      const rawRows = Array.isArray(payload.items)
        ? payload.items
        : Array.isArray(payload)
          ? payload
          : Array.isArray(payload.rows)
            ? payload.rows
            : Array.isArray(payload.data?.items)
              ? payload.data.items
              : [];

      // Normalise each row to consistent field names
      // API fields: id, name, sku, uom, stock_type, opening_qty, opening_rate,
      //             opening_value, purchased_qty, purchased_value,
      //             avg_rate, current_qty, current_value
      const normalised = rawRows.map((r) => ({
        id:          r.item_id || r.id,
        name:        r.item_name || r.name || '—',
        sku:         r.sku || '',
        unit:        r.unit || r.uom || 'PCS',
        stock_type:  STOCK_TYPE_LABEL[r.stock_type] || r.stock_type || '—',
        warehouse:   r.warehouse_name || r.warehouse || '',
        qty:         Number(r.current_qty ?? r.closing_qty ?? r.qty ?? r.quantity ?? 0),
        avg_cost:    Number(r.avg_rate ?? r.avg_cost ?? r.average_cost ?? r.rate ?? 0),
        total_value: Number(r.current_value ?? r.total_value ?? r.closing_value ?? r.valuation ?? 0),
        opening_qty:   Number(r.opening_qty   ?? 0),
        opening_rate:  Number(r.opening_rate  ?? 0),
        opening_value: Number(r.opening_value ?? 0),
        purchased_qty:   Number(r.purchased_qty   ?? 0),
        purchased_value: Number(r.purchased_value ?? 0),
        hsn_code:    r.hsn_code || '',
        category:    r.category_name || r.category || '',
      }));

      setRows(normalised);

      // Build summary — API provides total_stock_value and bifurcation array at top level of data
      const totalValue = Number(payload.total_stock_value)
        || normalised.reduce((s, r) => s + r.total_value, 0);
      const totalQty   = normalised.reduce((s, r) => s + r.qty, 0);
      const itemCount  = normalised.length;

      // Build bifurcation map from API array or compute from rows
      const bifurcation = {};
      if (Array.isArray(payload.bifurcation) && payload.bifurcation.length) {
        payload.bifurcation.forEach((b) => {
          const label = STOCK_TYPE_LABEL[b.stock_type] || b.stock_type || '—';
          bifurcation[label] = Number(b.current_value ?? b.total_value ?? 0);
        });
      } else {
        normalised.forEach((r) => {
          if (!bifurcation[r.stock_type]) bifurcation[r.stock_type] = 0;
          bifurcation[r.stock_type] += r.total_value;
        });
      }

      setSummary({ total_value: totalValue, total_qty: totalQty, item_count: itemCount, bifurcation });
    } catch (err) {
      console.error('Stock valuation fetch error:', err);
      toast.error('Failed to load stock valuation report');
    } finally {
      setLoading(false);
    }
  }, [stockType]);

  useEffect(() => { fetchData(); }, [fetchData]);

  /* filter -------------------------------------------------------- */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return rows.filter((r) => {
      if (q && !r.name.toLowerCase().includes(q) && !r.sku.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, search]);

  const filteredTotals = useMemo(() => ({
    qty:   filtered.reduce((s, r) => s + r.qty, 0),
    value: filtered.reduce((s, r) => s + r.total_value, 0),
  }), [filtered]);

  /* handle type change -------------------------------------------- */
  const handleTypeChange = (val) => {
    setStockType(val);
    fetchData(val);
  };

  /* exports ------------------------------------------------------- */
  const handleExportExcel = async () => {
    if (!filtered.length) { toast.warning('No data to export'); return; }
    const tid = toast.loading('Generating Excel…');
    try {
      const XLSX = await import('xlsx');
      const ws = XLSX.utils.json_to_sheet(filtered.map((r) => ({
        'Item Name':         r.name,
        'SKU':               r.sku,
        'Stock Type':        r.stock_type,
        'Unit':              r.unit,
        'Opening Qty':       r.opening_qty,
        'Opening Rate (₹)':  r.opening_rate,
        'Opening Value (₹)': r.opening_value,
        'Purchased Qty':     r.purchased_qty,
        'Purchased Value (₹)': r.purchased_value,
        'Avg Rate (₹)':      r.avg_cost,
        'Current Qty':       r.qty,
        'Current Value (₹)': r.total_value,
      })));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Stock Valuation');
      XLSX.writeFile(wb, `stock_valuation_${new Date().toISOString().slice(0,10)}.xlsx`);
      toast.update(tid, { render: 'Excel ready!', type: 'success', isLoading: false, autoClose: 3000 });
    } catch {
      toast.update(tid, { render: 'Export failed', type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  const handleExportPDF = async () => {
    if (!filtered.length) { toast.warning('No data to export'); return; }
    const tid = toast.loading('Generating PDF…');
    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');
      const doc = new jsPDF({ orientation: 'landscape' });
      doc.setFontSize(14);
      doc.text('Stock Valuation Report', 14, 15);
      doc.setFontSize(9);
      doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}  |  Total Value: ${fmtR(filteredTotals.value)}`, 14, 22);
      autoTable(doc, {
        startY: 27,
        head: [['Item', 'SKU', 'Type', 'Unit', 'Op.Qty', 'Op.Value', 'Pur.Qty', 'Pur.Value', 'Avg Rate', 'Curr.Qty', 'Curr.Value']],
        body: filtered.map((r) => [
          r.name, r.sku || '—', r.stock_type, r.unit,
          fmt(r.opening_qty), fmtR(r.opening_value),
          fmt(r.purchased_qty), fmtR(r.purchased_value),
          fmtR(r.avg_cost), fmt(r.qty), fmtR(r.total_value),
        ]),
        styles:     { fontSize: 7.5 },
        headStyles: { fillColor: [30, 41, 59] },
        foot: [[
          'Grand Total', '', '', '',
          fmt(filtered.reduce((s, r) => s + r.opening_qty, 0)),
          fmtR(filtered.reduce((s, r) => s + r.opening_value, 0)),
          fmt(filtered.reduce((s, r) => s + r.purchased_qty, 0)),
          fmtR(filtered.reduce((s, r) => s + r.purchased_value, 0)),
          '',
          fmt(filteredTotals.qty),
          fmtR(filteredTotals.value),
        ]],
        footStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold' },
      });
      doc.save(`stock_valuation_${new Date().toISOString().slice(0,10)}.pdf`);
      toast.update(tid, { render: 'PDF ready!', type: 'success', isLoading: false, autoClose: 3000 });
    } catch {
      toast.update(tid, { render: 'Export failed', type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  /* ─── Render ─── */
  return (
    <div className="container-fluid py-4 text-dark">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">Stock Valuation Report</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item"><Link to="/inventory/stock-summary">Inventory</Link></li>
              <li className="breadcrumb-item active">Stock Valuation</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2 align-items-center flex-wrap">
          {/* Stock type filter */}
          <select
            className="form-select form-select-sm shadow-none w-auto"
            value={stockType}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            {STOCK_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          {/* Search */}
          <input
            type="text"
            className="form-control form-control-sm shadow-none"
            placeholder="Search item or SKU…"
            style={{ width: 180 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-sm btn-outline-secondary d-flex align-items-center"
            onClick={() => fetchData()}
            disabled={loading}
          >
            {loading
              ? <span className="spinner-border spinner-border-sm me-1" role="status" />
              : <i className="isax isax-refresh me-1" />}
            Refresh
          </button>
          {/* Export */}
          <div className="dropdown">
            <button className="btn btn-sm btn-primary d-flex align-items-center" data-bs-toggle="dropdown">
              <i className="isax isax-export-1 me-1" />Export
            </button>
            <ul className="dropdown-menu border-0 shadow rounded-3">
              <li>
                <button className="dropdown-item py-2" onClick={handleExportPDF}>
                  <i className="isax isax-document-text me-2 text-danger" />Export PDF
                </button>
              </li>
              <li>
                <button className="dropdown-item py-2" onClick={handleExportExcel}>
                  <i className="isax isax-document-1 me-2 text-success" />Export Excel
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Summary stat cards */}
      <div className="row g-3 mb-4">
        {[
          {
            label:  'Total Stock Value',
            value:  fmtR(summary.total_value),
            color:  'primary',
            icon:   'isax-dollar-circle',
          },
          {
            label:  'Total Items',
            value:  summary.item_count.toLocaleString('en-IN'),
            color:  'success',
            icon:   'isax-box',
          },
          {
            label:  'Total Qty',
            value:  fmt(summary.total_qty),
            color:  'warning',
            icon:   'isax-weight',
          },
          {
            label:  'Avg Cost / Item',
            value:  summary.item_count
              ? fmtR(summary.total_value / summary.item_count)
              : '₹0.00',
            color:  'info',
            icon:   'isax-calculator',
          },
        ].map((card, i) => (
          <div className="col-md-3 col-sm-6" key={i}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className={`badge badge-soft-${card.color} p-2 rounded`}>
                    <i className={`isax ${card.icon} fs-18`} />
                  </span>
                </div>
                <h5 className="fw-bold mb-1">{card.value}</h5>
                <p className="text-muted small mb-0">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      /* Type bifurcation cards (only when "All Types" selected) */
      {!stockType && Object.keys(summary.bifurcation).length > 1 && (
        <div className="row g-3 mb-4">
          {Object.entries(summary.bifurcation).map(([type, val]) => {
            const tc = getTypeColor(type);
            const absTotal = Object.values(summary.bifurcation).reduce((s, v) => s + Math.abs(v), 0);
            return (
              <div className="col" key={type}>
                <div className="card border-0 shadow-sm">
                  <div className="card-body py-3 px-3">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className={`badge badge-soft-${tc.pill} rounded-pill`}>
                        <i className={`isax ${tc.icon} me-1`} />{type}
                      </span>
                    </div>
                    <h6 className="fw-bold mb-0">{fmtR(val)}</h6>
                    <p className="text-muted fs-12 mb-0">
                      {absTotal ? ((Math.abs(val) / absTotal) * 100).toFixed(1) : 0}% of total
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading…</span>
              </div>
              <p className="text-muted mt-3 mb-0">Loading stock valuation data…</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 fs-13">
                <thead className="bg-light text-uppercase fw-semibold fs-12">
                  <tr>
                    <th className="ps-4" style={{ minWidth: 200 }}>Item</th>
                    <th>Type</th>
                    <th className="text-end">Op. Qty</th>
                    <th className="text-end">Op. Rate</th>
                    <th className="text-end">Op. Value</th>
                    <th className="text-end">Pur. Qty</th>
                    <th className="text-end">Pur. Value</th>
                    <th className="text-end">Avg Rate</th>
                    <th className="text-end">Curr. Qty</th>
                    <th>Unit</th>
                    <th className="text-end pe-4">Curr. Value</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="text-center py-5 text-muted">
                        <i className="isax isax-box fs-30 d-block mb-2 opacity-25" />
                        No stock valuation data found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((row, idx) => {
                      const tc = getTypeColor(row.stock_type);
                      return (
                        <tr key={row.id || idx}>
                          <td className="ps-4">
                            <div className="fw-medium text-dark">{row.name}</div>
                            {row.sku && <div className="text-muted fs-11">{row.sku}</div>}
                          </td>
                          <td>
                            <span className={`badge badge-soft-${tc.pill} rounded-pill px-2`}>
                              <i className={`isax ${tc.icon} me-1`} />{row.stock_type}
                            </span>
                          </td>
                          <td className="text-end text-muted">{fmt(row.opening_qty)}</td>
                          <td className="text-end text-muted">{fmtR(row.opening_rate)}</td>
                          <td className="text-end">{fmtR(row.opening_value)}</td>
                          <td className="text-end text-success">{fmt(row.purchased_qty)}</td>
                          <td className="text-end text-success">{fmtR(row.purchased_value)}</td>
                          <td className="text-end text-muted">{fmtR(row.avg_cost)}</td>
                          <td className={`text-end fw-medium ${row.qty < 0 ? 'text-danger' : ''}`}>
                            {fmt(row.qty)}
                          </td>
                          <td className="text-muted">{row.unit || '—'}</td>
                          <td className={`text-end pe-4 fw-semibold ${row.total_value < 0 ? 'text-danger' : 'text-primary'}`}>
                            {fmtR(row.total_value)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                {!loading && filtered.length > 0 && (
                  <tfoot className="bg-light fw-bold fs-13 border-top">
                    <tr>
                      <td colSpan="2" className="ps-4 text-uppercase text-muted">Grand Total</td>
                      <td className="text-end">{fmt(filtered.reduce((s, r) => s + r.opening_qty, 0))}</td>
                      <td />
                      <td className="text-end">{fmtR(filtered.reduce((s, r) => s + r.opening_value, 0))}</td>
                      <td className="text-end">{fmt(filtered.reduce((s, r) => s + r.purchased_qty, 0))}</td>
                      <td className="text-end">{fmtR(filtered.reduce((s, r) => s + r.purchased_value, 0))}</td>
                      <td />
                      <td className="text-end">{fmt(filteredTotals.qty)}</td>
                      <td />
                      <td className={`text-end pe-4 ${filteredTotals.value < 0 ? 'text-danger' : 'text-primary'}`}>
                        {fmtR(filteredTotals.value)}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockValuation;

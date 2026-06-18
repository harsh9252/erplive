import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { getStockSummaryReport } from '../services/reportService';
import { getWarehouses } from '../services/settingsService';

/* ─── WAC: applied after fetch normalises the row ─────────────────── */
const applyWAC = (row) => {
  const openingQty   = Number(row._raw_openingQty   || 0);
  const openingRate  = Number(row._raw_openingRate  || 0);
  const openingValue = openingQty * openingRate;

  const inQty   = Number(row._raw_inQty   || 0);
  const inValue = Number(row._raw_inValue || 0) || inQty * openingRate;

  const outQty = Number(row._raw_outQty || 0);

  const totalQtyForAvg   = openingQty + inQty;
  const totalValueForAvg = openingValue + inValue;
  const wac = totalQtyForAvg > 0 ? totalValueForAvg / totalQtyForAvg : openingRate;

  const closingQty   = Math.max(0, openingQty + inQty - outQty);
  const outValue     = outQty * wac;
  const closingValue = closingQty * wac;

  return {
    ...row,
    _openingQty:   openingQty,
    _openingRate:  openingRate,
    _openingValue: openingValue,
    _inQty:        inQty,
    _inValue:      inValue,
    _outQty:       outQty,
    _outValue:     outValue,
    _wac:          wac,
    _closingQty:   closingQty,
    _closingValue: closingValue,
  };
};

/* stock_type: API returns enum (RAW_MATERIAL) or string (Raw Material) */
const STOCK_TYPE_MAP = {
  RAW_MATERIAL:      'Raw Material',
  FINISHED_GOOD:     'Finished Good',
  SEMI_FINISHED:     'WIP',
  TRADING:           'Trading Good',
  CONSUMABLE:        'Consumable',
  'Raw Material':    'Raw Material',
  'Finished Good':   'Finished Good',
  'Semi-Finished / WIP': 'WIP',
  'Trading Good':    'Trading Good',
  'Consumable':      'Consumable',
};

const fmt  = (n) => Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
const fmtR = (n) => `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const stockColors = {
  'Raw Material': { pill: '#f59e0b', bg: '#fffbeb', label: 'Raw Material' },
  'Finished Good':{ pill: '#10b981', bg: '#f0fdf4', label: 'Finished Good' },
  'WIP':          { pill: '#06b6d4', bg: '#ecfeff', label: 'WIP' },
  'Trading Good': { pill: '#6366f1', bg: '#eef2ff', label: 'Trading Good' },
  'Consumable':   { pill: '#ef4444', bg: '#fef2f2', label: 'Consumable' },
};
const getColor = (t = '') => stockColors[STOCK_TYPE_MAP[t] || t] || { pill: '#64748b', bg: '#f8fafc', label: STOCK_TYPE_MAP[t] || t || '—' };

/* ─── Component ───────────────────────────────────────────────────── */
const StockSummary = () => {
  const [raw,        setRaw]        = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState('');
  const [whFilter,   setWhFilter]   = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [expanded,   setExpanded]   = useState({});   // item-level drill-down rows

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { getItems } = await import('../services/itemService');
      const { getStockLedger } = await import('../services/inventoryService');

      const [reportRes, warehouseRes, itemsRes] = await Promise.all([
        getStockSummaryReport({}),
        getWarehouses(),
        getItems(1, 5000),
      ]);

      const warehouseList = warehouseRes?.data || [];
      const itemsList = Array.isArray(itemsRes?.data)
        ? itemsRes.data
        : (itemsRes?.data?.rows || itemsRes?.rows || []);

      const rd  = reportRes?.data || reportRes || [];
      const arr = Array.isArray(rd) ? rd : (rd?.rows || rd?.items || []);

      // Fetch stock ledger per item for real IN/OUT movements
      const ledgerResults = await Promise.allSettled(
        arr.map((row) => {
          const id = row.item_id || row.id;
          return id
            ? getStockLedger({ item_id: id, limit: 5000 })
            : Promise.resolve({ data: [] });
        })
      );

      const normalised = arr.map((row, idx) => {
        const rowId      = String(row.item_id || row.id || '');
        const master     = itemsList.find((i) => String(i.id) === rowId) || {};

        // Opening stock
        const openingQty = Number(
          row.opening_stock ?? row.opening_qty ?? master.opening_stock ?? 0
        );
        const openingRate = Number(
          row.opening_stock_rate ?? row.avg_rate ?? row.avg_cost ??
          master.opening_stock_rate ?? master.purchase_price ?? master.cost_price ?? 0
        );

        // Ledger IN/OUT
        const ledgerRes  = ledgerResults[idx];
        const entries    = ledgerRes.status === 'fulfilled'
          ? (Array.isArray(ledgerRes.value?.data)
              ? ledgerRes.value.data
              : (ledgerRes.value?.data?.rows || ledgerRes.value?.rows || ledgerRes.value || []))
          : [];

        let ledgerInQty = 0, ledgerInValue = 0, ledgerOutQty = 0;
        entries.forEach((e) => {
          const type = (e.txn_type || e.type || e.transaction_type || '').toUpperCase();
          const qty  = Number(e.quantity || e.qty || 0);
          const rate = Number(e.rate || e.unit_price || e.cost_price || e.purchase_price || 0);
          if (type === 'IN'  || type === 'PURCHASE' || type === 'INWARD')  { ledgerInQty += qty; ledgerInValue += qty * rate; }
          if (type === 'OUT' || type === 'SALE'     || type === 'OUTWARD') { ledgerOutQty += qty; }
        });

        // Prefer API fields when non-zero, fall back to ledger
        const apiInQty  = Number(row.in_qty  || row.qty_in  || row.inward_qty  || row.purchase_qty || 0);
        const apiOutQty = Number(row.out_qty || row.qty_out || row.outward_qty || row.sale_qty    || 0);
        const apiInVal  = Number(row.in_value || row.purchase_value || row.inward_value || 0);

        const inQty   = apiInQty  > 0 ? apiInQty  : ledgerInQty;
        const outQty  = apiOutQty > 0 ? apiOutQty : ledgerOutQty;
        const inValue = apiInVal  > 0 ? apiInVal  : ledgerInValue;

        // Stock type label normalisation
        const rawType    = row.stock_type || master.stock_type || '';
        const stockType  = STOCK_TYPE_MAP[rawType] || rawType || 'Raw Material';

        return {
          ...row,
          name:       row.name || row.item_name || master.name || '—',
          sku:        row.sku  || master.sku || '',
          unit:       row.unit || row.uom   || master.unit || master.uom || 'PCS',
          stock_type: stockType,
          warehouse_id: row.warehouse_id || master.warehouse_id,
          _raw_openingQty:  openingQty,
          _raw_openingRate: openingRate,
          _raw_inQty:       inQty,
          _raw_inValue:     inValue,
          _raw_outQty:      outQty,
        };
      });

      setRaw(normalised.map(applyWAC));
      setWarehouses(warehouseList);
    } catch (e) {
      console.error('Stock summary fetch error:', e);
      toast.error('Failed to load stock summary');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // raw already has WAC applied from fetchData
  const computed = raw;

  const filtered = React.useMemo(() => {
    return computed.filter((r) => {
      const name = (r.name || r.item_name || '').toLowerCase();
      const sku  = (r.sku || '').toLowerCase();
      const q    = search.toLowerCase();
      if (search && !name.includes(q) && !sku.includes(q)) return false;
      if (whFilter && r.warehouse_id && String(r.warehouse_id) !== whFilter) return false;
      if (typeFilter && r.stock_type !== typeFilter) return false;
      return true;
    });
  }, [computed, search, whFilter, typeFilter]);

  const totals = filtered.reduce((a, r) => ({
    openingQty:   a.openingQty   + r._openingQty,
    openingValue: a.openingValue + r._openingValue,
    inQty:        a.inQty        + r._inQty,
    inValue:      a.inValue      + r._inValue,
    outQty:       a.outQty       + r._outQty,
    outValue:     a.outValue     + r._outValue,
    closingQty:   a.closingQty   + r._closingQty,
    closingValue: a.closingValue + r._closingValue,
  }), { openingQty:0,openingValue:0,inQty:0,inValue:0,outQty:0,outValue:0,closingQty:0,closingValue:0 });

  const handleExportExcel = async () => {
    if (!filtered.length) { toast.warning('No data to export'); return; }
    const tid = toast.loading('Generating Excel…');
    try {
      const XLSX = await import('xlsx');
      const ws = XLSX.utils.json_to_sheet(filtered.map((r) => ({
        'Item Name':      r.name || r.item_name,
        'SKU':            r.sku || '',
        'Unit':           r.unit || 'PCS',
        'Opening Qty':    r._openingQty,
        'Opening Rate':   r._openingRate,
        'Opening Value':  r._openingValue,
        'IN Qty':         r._inQty,
        'IN Value':       r._inValue,
        'OUT Qty':        r._outQty,
        'OUT Value (WAC)':r._outValue,
        'WAC Rate':       r._wac,
        'Closing Qty':    r._closingQty,
        'Closing Value':  r._closingValue,
      })));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Stock Summary');
      XLSX.writeFile(wb, 'Stock_Summary_WAC.xlsx');
      toast.update(tid, { render:'Excel ready!', type:'success', isLoading:false, autoClose:3000 });
    } catch (e) {
      toast.update(tid, { render:'Export failed', type:'error', isLoading:false, autoClose:3000 });
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
      doc.text('Stock Summary — Weighted Average Cost (WAC)', 14, 15);
      autoTable(doc, {
        startY: 22,
        head: [['Item','SKU','Unit','Op.Qty','Op.Value','IN Qty','IN Value','OUT Qty','OUT Value','WAC Rate','Cl.Qty','Cl.Value']],
        body: filtered.map((r) => [
          r.name||r.item_name, r.sku||'', r.unit||'PCS',
          fmt(r._openingQty), fmtR(r._openingValue),
          fmt(r._inQty), fmtR(r._inValue),
          fmt(r._outQty), fmtR(r._outValue),
          fmtR(r._wac),
          fmt(r._closingQty), fmtR(r._closingValue),
        ]),
        styles: { fontSize: 7.5 },
        headStyles: { fillColor: [30,41,59] },
      });
      doc.save('Stock_Summary_WAC.pdf');
      toast.update(tid, { render:'PDF ready!', type:'success', isLoading:false, autoClose:3000 });
    } catch (e) {
      toast.update(tid, { render:'Export failed', type:'error', isLoading:false, autoClose:3000 });
    }
  };

  const typeOptions = [...new Set(raw.map((r) => r.stock_type).filter(Boolean))];

  const toggleExpand = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const formatQty = (qty, unit) => {
    if (!qty) return '';
    const absQty = Math.abs(qty);
    const prefix = qty < 0 ? '(-)' : '';
    return `${prefix}${absQty.toLocaleString('en-IN')} ${unit || ''}`.trim();
  };

  const formatRate = (rate) => {
    if (!rate) return '';
    return Number(rate).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatValue = (val) => {
    if (!val) return '';
    return Number(val).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  /* ─── Render ─── */
  return (
    <div className="container-fluid py-4">
      {/* Top Header / Filter */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Stock Group Summary</h4>
          <p className="text-muted mb-0 fs-13">Detailed report of inventory movements and values</p>
        </div>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control form-control-sm shadow-none w-auto"
            placeholder="Search item or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="form-select form-select-sm shadow-none w-auto" value={whFilter} onChange={(e) => setWhFilter(e.target.value)}>
            <option value="">All Warehouses</option>
            {warehouses.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
          <button onClick={fetchData} className="btn btn-sm btn-outline-secondary d-flex align-items-center">
            <i className="isax isax-refresh me-1"></i>Refresh
          </button>
          <div className="dropdown">
            <button className="btn btn-sm btn-primary d-flex align-items-center" data-bs-toggle="dropdown">
              <i className="isax isax-export-1 me-1"></i>Export
            </button>
            <ul className="dropdown-menu border-0 shadow rounded-12">
              <li><button className="dropdown-item py-2" onClick={handleExportPDF}><i className="isax isax-document-text me-2 text-danger"></i>Export PDF</button></li>
              <li><button className="dropdown-item py-2" onClick={handleExportExcel}><i className="isax isax-document-1 me-2 text-success"></i>Export Excel</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {loading ? (
             <div className="text-center py-5">
               <div className="spinner-border text-primary" role="status">
                 <span className="visually-hidden">Loading...</span>
               </div>
             </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle mb-0 text-nowrap fs-13">
                <thead className="bg-light text-dark text-center fw-bold align-middle">
                  <tr>
                    <th rowSpan={2} className="text-start ps-4 align-middle bg-light" style={{ minWidth: '250px' }}>Particulars</th>
                    <th colSpan={3} className="bg-light">Opening Balance</th>
                    <th colSpan={3} className="bg-light">Inwards</th>
                    <th colSpan={3} className="bg-light">Outwards</th>
                    <th colSpan={3} className="bg-light">Closing Balance</th>
                  </tr>
                  <tr>
                    {['Opening Balance', 'Inwards', 'Outwards', 'Closing Balance'].map((group, i) => (
                      <React.Fragment key={group}>
                        <th className="text-end fw-semibold bg-light text-muted fs-12">Quantity</th>
                        <th className="text-end fw-semibold bg-light text-muted fs-12">Rate</th>
                        <th className="text-end fw-semibold bg-light text-muted fs-12">Value</th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="13" className="text-center py-5 text-muted">No stock records found</td>
                    </tr>
                  ) : (
                    filtered.map((item, idx) => (
                      <tr key={idx} style={{ cursor: 'pointer' }}>
                        <td className="ps-4 fw-medium text-dark">
                          {item.name || item.item_name || '—'}
                          {item.sku && <div className="text-muted fs-11 fw-normal">{item.sku}</div>}
                        </td>
                        
                        {/* Opening */}
                        <td className="text-end">{formatQty(item._openingQty, item.unit)}</td>
                        <td className="text-end text-muted">{formatRate(item._openingRate)}</td>
                        <td className="text-end fw-medium">{formatValue(item._openingValue)}</td>
                        
                        {/* Inwards */}
                        <td className="text-end text-success">{formatQty(item._inQty, item.unit)}</td>
                        <td className="text-end text-muted">
                           {item._inQty > 0 ? formatRate(item._inValue / item._inQty) : ''}
                        </td>
                        <td className="text-end text-success fw-medium">{formatValue(item._inValue)}</td>
                        
                        {/* Outwards */}
                        <td className="text-end text-danger">{formatQty(item._outQty, item.unit)}</td>
                        <td className="text-end text-muted">
                           {item._outQty > 0 ? formatRate(item._outValue / item._outQty) : ''}
                        </td>
                        <td className="text-end text-danger fw-medium">{formatValue(item._outValue)}</td>
                        
                        {/* Closing */}
                        <td className="text-end fw-bold">{formatQty(item._closingQty, item.unit)}</td>
                        <td className="text-end text-primary">{formatRate(item._wac)}</td>
                        <td className="text-end fw-bold text-primary pe-4">{formatValue(item._closingValue)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot className="bg-light fw-bold fs-14">
                  <tr>
                    <td className="ps-4 text-dark text-uppercase">Grand Total</td>
                    
                    <td className="text-end"></td>
                    <td className="text-end"></td>
                    <td className="text-end text-dark">{formatValue(totals.openingValue)}</td>
                    
                    <td className="text-end"></td>
                    <td className="text-end"></td>
                    <td className="text-end text-success">{formatValue(totals.inValue)}</td>
                    
                    <td className="text-end"></td>
                    <td className="text-end"></td>
                    <td className="text-end text-danger">{formatValue(totals.outValue)}</td>
                    
                    <td className="text-end"></td>
                    <td className="text-end"></td>
                    <td className="text-end text-primary pe-4">{formatValue(totals.closingValue)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockSummary;

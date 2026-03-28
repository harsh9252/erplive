import { useState, useMemo } from 'react';
import SearchableSelect from './SearchableSelect';

const VoucherEntryLines = ({
  entries,
  setEntries,
  ledgers,
  costCenters,
  balanceError,
  validateBalance,
  entryError,
  isReadOnly = false,
}) => {
  const [nextId, setNextId] = useState(Date.now() + Math.random());

  const ledgerOptions = useMemo(() => 
    ledgers.map(l => ({ value: l.id, label: l.name })),
  [ledgers]);

  const costCenterOptions = useMemo(() => 
    costCenters.map(cc => ({ value: cc.id, label: cc.name })),
  [costCenters]);

  const handleEntryChange = (id, field, value) => {
    if (isReadOnly) return;
    
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
    // Validate balance on amount change or dr_cr
    if (field === 'amount' || field === 'dr_cr') {
      setTimeout(() => validateBalance(), 0);
    }
  };

  const handleAddEntry = () => {
    if (isReadOnly) return;
    
    const lastEntry = entries[entries.length - 1];
    const newEntry = {
      id: Date.now() + Math.random(),
      ledger_id: '',
      dr_cr: lastEntry?.dr_cr === 'DR' ? 'CR' : 'DR', // Auto-toggle DR/CR
      amount: '',
      narration: '',
      cost_center_id: '',
    };
    setEntries((prev) => [...prev, newEntry]);
    setNextId(Date.now() + Math.random());
  };

  const handleRemoveEntry = (id) => {
    if (isReadOnly) return;
    
    if (entries.length > 2) {
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
      setTimeout(() => validateBalance(), 0);
    } else {
      // Toast/Alert handled by parent if necessary
    }
  };

  // Calculate totals for real-time display
  const totalDR = entries
    .filter((e) => e.dr_cr === 'DR')
    .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const totalCR = entries
    .filter((e) => e.dr_cr === 'CR')
    .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const isBalanced = Math.abs(totalDR - totalCR) < 0.01;

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-transparent border-bottom d-flex align-items-center justify-content-between">
        <h5 className="card-title mb-0">Double Entry Lines</h5>
        <button
          type="button"
          className="btn btn-sm btn-soft-primary"
          onClick={handleAddEntry}
          disabled={isReadOnly}
        >
          <i className="isax isax-plus me-1"></i>Add Entry Line
        </button>
      </div>
      <div className="card-body">
        {entryError && (
          <div className="alert alert-danger mb-3" role="alert">
            <i className="isax isax-info-circle me-2"></i>{entryError}
          </div>
        )}

        {balanceError && (
          <div className="alert alert-warning mb-3 py-2 fs-13" role="alert">
            <i className="isax isax-warning-2 me-2"></i>{balanceError}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-bordered table-compact mb-0">
            <thead className="table-light fs-13">
              <tr>
                <th style={{ minWidth: '250px' }}>Ledger Account <span className="text-danger">*</span></th>
                <th className="text-center" style={{ minWidth: '80px', width: '80px' }}>Dr/Cr</th>
                <th className="text-end" style={{ minWidth: '130px', width: '130px' }}>Amount <span className="text-danger">*</span></th>
                <th style={{ minWidth: '180px' }}>Cost Centre</th>
                <th style={{ minWidth: '200px' }}>Remark/Line Narration</th>
                <th className="text-center" style={{ width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <SearchableSelect
                      options={ledgerOptions}
                      value={entry.ledger_id}
                      onChange={(val) => handleEntryChange(entry.id, 'ledger_id', val)}
                      placeholder="Search Ledger Name..."
                      disabled={isReadOnly}
                    />
                  </td>
                  <td className="text-center">
                    <select
                      className="form-select form-select-sm"
                      value={entry.dr_cr}
                      onChange={(e) => handleEntryChange(entry.id, 'dr_cr', e.target.value)}
                      disabled={isReadOnly}
                    >
                      <option value="DR">DR</option>
                      <option value="CR">CR</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm text-end fw-600"
                      placeholder="0.00"
                      value={entry.amount}
                      onChange={(e) => handleEntryChange(entry.id, 'amount', e.target.value)}
                      step="0.01"
                      min="0"
                      disabled={isReadOnly}
                    />
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={entry.cost_center_id}
                      onChange={(e) => handleEntryChange(entry.id, 'cost_center_id', e.target.value)}
                      disabled={isReadOnly}
                    >
                      <option value="">No Cost Centre</option>
                      {costCenterOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Line remark..."
                      value={entry.narration}
                      onChange={(e) => handleEntryChange(entry.id, 'narration', e.target.value)}
                      disabled={isReadOnly}
                    />
                  </td>
                  <td className="text-center align-middle">
                    <button
                      type="button"
                      className="btn btn-sm text-danger h-auto p-0 border-0"
                      onClick={() => handleRemoveEntry(entry.id)}
                      disabled={entries.length <= 2 || isReadOnly}
                    >
                      <i className="isax isax-trash fs-18"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="table-light fw-600">
              <tr>
                <td className="text-end">Total DR Accounted:</td>
                <td colSpan="2" className="text-end text-primary">₹{totalDR.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td className="text-end">Total CR Accounted:</td>
                <td colSpan="2" className="text-end text-success">₹{totalCR.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
              </tr>
              {!isBalanced && (
                <tr className="table-warning text-danger">
                  <td colSpan="4" className="text-end fs-13">Unbalanced Difference:</td>
                  <td colSpan="2" className="text-end">₹{Math.abs(totalDR - totalCR).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
              )}
            </tfoot>
          </table>
        </div>

        <div className="mt-3 fs-12 text-muted fst-italic">
          * Ensure Debit (DR) and Credit (CR) totals match before saving.
        </div>
      </div>
    </div>
  );
};

export default VoucherEntryLines;

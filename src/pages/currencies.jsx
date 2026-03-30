import { useState, useEffect, useCallback } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { toast } from 'react-toastify';
import currencyService from '../services/currencyService';

const Currencies = () => {
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Converter State
  const [convertData, setConvertData] = useState({
    from: 'USD',
    to: 'INR',
    amount: ''
  });
  const [convertResult, setConvertResult] = useState(null);
  const [convertLoading, setConvertLoading] = useState(false);

  // Add Form State
  const [newCurrency, setNewCurrency] = useState({
    code: '',
    name: '',
    symbol: '',
    exchange_rate: ''
  });

  const fetchCurrencies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await currencyService.getCurrencies();
      setCurrencies(res.data || res || []);
    } catch (error) {
      console.error('Error fetching currencies:', error);
      toast.error('Failed to load currencies');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  const handleConvert = async (e) => {
    e.preventDefault();
    if (!convertData.amount) return;
    setConvertLoading(true);
    try {
      const res = await currencyService.convertCurrency(
        convertData.from,
        convertData.to,
        convertData.amount
      );
      
      // Robust extraction logic to handle various backend response patterns
      const extractValue = (obj) => {
        if (obj === null || obj === undefined) return null;
        if (typeof obj !== 'object') return obj;
        
        // Priority keys for conversion results
        const priorityKeys = ['result', 'total', 'converted_amount', 'amount', 'value', 'converted', 'rate'];
        for (const key of priorityKeys) {
          if (obj[key] !== undefined && typeof obj[key] !== 'object') return obj[key];
        }
        
        // Check for nested data property (common in axios/standard API wrappers)
        if (obj.data && typeof obj.data !== 'object') return obj.data;
        if (obj.data && typeof obj.data === 'object') {
          for (const key of priorityKeys) {
            if (obj.data[key] !== undefined && typeof obj.data[key] !== 'object') return obj.data[key];
          }
        }
        
        return null;
      };

      const result = extractValue(res);
      setConvertResult(result);
      
      if (result === null) {
        console.warn('Backend response could not be parsed for conversion result:', res);
      }
    } catch (error) {
      toast.error('Conversion failed');
    } finally {
      setConvertLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await currencyService.createCurrency(newCurrency);
      toast.success('Currency added successfully');
      setShowAddModal(false);
      setNewCurrency({ code: '', name: '', symbol: '', exchange_rate: '' });
      fetchCurrencies();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add currency');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRate = async (id, currentRate) => {
    const newRate = window.prompt(`Enter new exchange rate for ID ${id}:`, currentRate);
    if (newRate === null || newRate === currentRate) return;
    
    try {
      await currencyService.updateExchangeRate(id, parseFloat(newRate));
      toast.success('Rate updated');
      fetchCurrencies();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/currencies" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-4">
              <div className="pb-3 border-bottom mb-4 d-flex justify-content-between align-items-center">
                <h4 className="fw-bold mb-0">Multi-Currency Management</h4>
                <button 
                  className="btn btn-primary d-flex align-items-center gap-2"
                  onClick={() => setShowAddModal(true)}
                >
                  <i className="isax isax-add-circle fs-18"></i>
                  Add Currency
                </button>
              </div>

              {/* Converter Widget */}
              <div className="card shadow-sm border-0 mb-4 bg-light">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-3 d-flex align-items-center">
                    <i className="isax isax-convert me-2 text-primary fs-20"></i>
                    Currency Converter Widget
                  </h6>
                  <form onSubmit={handleConvert} className="row g-3 align-items-end">
                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-muted">From</label>
                      <select className="form-select" value={convertData.from} onChange={e => setConvertData({...convertData, from: e.target.value})}>
                        {currencies.map(c => <option key={c.id} value={c.code}>{c.code} - {c.name}</option>)}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-muted">To</label>
                      <select className="form-select" value={convertData.to} onChange={e => setConvertData({...convertData, to: e.target.value})}>
                        <option value="INR">INR - Indian Rupee</option>
                        {currencies.filter(c => c.code !== 'INR').map(c => <option key={c.id} value={c.code}>{c.code} - {c.name}</option>)}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-muted">Amount</label>
                      <input type="number" className="form-control" placeholder="1000" value={convertData.amount} onChange={e => setConvertData({...convertData, amount: e.target.value})} />
                    </div>
                    <div className="col-md-3 d-grid">
                      <button type="submit" className="btn btn-primary" disabled={convertLoading}>
                        {convertLoading ? '...' : 'Convert Now'}
                      </button>
                    </div>
                  </form>
                  {convertResult !== null && (
                    <div className="mt-3 p-3 bg-white rounded border border-primary-subtle d-flex align-items-center justify-content-between">
                      <div className="fs-14 fw-medium">Calculation Result:</div>
                      <div className="fs-18 fw-bold text-primary">
                        {Number(convertData.amount).toLocaleString()} {convertData.from} = {Number(convertResult).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {convertData.to}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Currency List */}
              <div className="card shadow-sm border-0">
                <div className="table-responsive">
                  <table className="table fs-14 align-middle mb-0">
                    <thead className="bg-light text-muted small text-uppercase fw-bold">
                      <tr>
                        <th className="ps-4">Code</th>
                        <th>Currency Name</th>
                        <th>Symbol</th>
                        <th className="text-end">Exchange Rate (vs INR)</th>
                        <th>Last Updated</th>
                        <th className="text-center pe-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading && currencies.length === 0 ? (
                        <tr><td colSpan="6" className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary"></div></td></tr>
                      ) : (
                        currencies.map(currency => (
                          <tr key={currency.id}>
                            <td className="ps-4 fw-bold text-primary">{currency.code}</td>
                            <td>{currency.name}</td>
                            <td><span className="badge bg-soft-info text-info fs-14">{currency.symbol}</span></td>
                            <td className="text-end fw-semibold">₹{currency.exchange_rate}</td>
                            <td className="text-muted fs-12">{currency.updated_at || currency.last_updated || 'N/A'}</td>
                            <td className="text-center pe-4">
                              <button 
                                className="btn btn-soft-primary btn-sm px-3"
                                onClick={() => handleUpdateRate(currency.id, currency.exchange_rate)}
                              >
                                Update Rate
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Currency Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white border-0 py-3">
                <h5 className="modal-title fw-bold">Register New Global Currency</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleCreate}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6 text-start">
                      <label className="form-label small fw-bold text-muted">Currency Code *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="USD" 
                        value={newCurrency.code} 
                        onChange={e => setNewCurrency({...newCurrency, code: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="col-md-6 text-start">
                      <label className="form-label small fw-bold text-muted">Symbol *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="$" 
                        value={newCurrency.symbol} 
                        onChange={e => setNewCurrency({...newCurrency, symbol: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="col-12 text-start">
                      <label className="form-label small fw-bold text-muted">Full Name *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="US Dollar" 
                        value={newCurrency.name} 
                        onChange={e => setNewCurrency({...newCurrency, name: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="col-12 text-start">
                      <label className="form-label small fw-bold text-muted">Current Exchange Rate (vs 1 INR) *</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">₹</span>
                        <input 
                          type="number" 
                          step="0.0001" 
                          className="form-control border-start-0 ps-0" 
                          placeholder="83.50" 
                          value={newCurrency.exchange_rate} 
                          onChange={e => setNewCurrency({...newCurrency, exchange_rate: e.target.value})} 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 p-4 pt-0">
                  <button type="button" className="btn btn-light px-4" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary px-4 shadow" disabled={loading}>
                    {loading ? 'Processing...' : 'Add Currency'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .bg-soft-info { background-color: rgba(13, 202, 240, 0.1); }
        .btn-soft-primary {
          background-color: rgba(62, 121, 247, 0.1);
          color: #3e79f7;
          border: none;
        }
        .btn-soft-primary:hover {
          background-color: #3e79f7;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Currencies;

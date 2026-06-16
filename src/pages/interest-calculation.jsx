import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { interestService } from '../services/interestService';
import { ledgerService } from '../services/ledgerService';
import { ledgerGroupService } from '../services/ledgerGroupService';
import customerService from '../services/customerService';
import vendorService from '../services/vendorService';

const InterestCalculation = () => {
  const [activeTab, setActiveTab] = useState('receivables'); // 'receivables' or 'payables'
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({
    total_outstanding: 0,
    total_interest: 0,
    total_due: 0
  });

  // Filters
  const [filters, setFilters] = useState({
    rate: 18,
    as_of_date: new Date().toISOString().split('T')[0],
    from_date: '',
    to_date: '',
    entity_id: 'All'
  });

  // Lists for dropdowns
  const [entities, setEntities] = useState([]);

  const fetchedEntitiesRef = React.useRef(null);

  useEffect(() => {
    if (fetchedEntitiesRef.current !== activeTab) {
      fetchEntities();
      fetchedEntitiesRef.current = activeTab;
    }
  }, [activeTab]);

  // Debounce all filter changes to prevent multiple calls on mount or rapid typing
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInterestData();
    }, 600);
    return () => clearTimeout(timer);
  }, [activeTab, filters.as_of_date, filters.entity_id, filters.from_date, filters.to_date, filters.rate]);

  const fetchEntities = async () => {
    try {
      let activeEntities = [];
      if (activeTab === 'receivables') {
        const resp = await customerService.getCustomers(1, 1000);
        activeEntities = resp.data || resp.items || [];
      } else {
        const resp = await vendorService.getVendors({ limit: 1000 });
        activeEntities = resp.data || resp.items || [];
      }
      setEntities(activeEntities);
    } catch (error) {
      console.error('Error fetching entities:', error);
    }
  };

  const fetchInterestData = async () => {
    setLoading(true);
    try {
      const params = {
        rate: filters.rate,
        as_of_date: filters.as_of_date,
        from_date: filters.from_date || undefined,
        to_date: filters.to_date || undefined,
        [activeTab === 'receivables' ? 'customer_id' : 'vendor_id']: filters.entity_id === 'All' ? undefined : filters.entity_id
      };

      const response = activeTab === 'receivables' 
        ? await interestService.getReceivablesInterest(params)
        : await interestService.getPayablesInterest(params);

      // Extract details array from response data
      const items = response.data?.details || [];
      setData(items);
      
      // Use summary from backend if available, otherwise calculate
      if (response.data?.summary) {
        setSummary({
          total_outstanding: response.data.summary.total_outstanding || 0,
          total_interest: response.data.summary.total_interest || 0,
          total_due: response.data.summary.total_due || 0
        });
      } else {
        const total_outstanding = items.reduce((sum, item) => sum + parseFloat(item.outstanding || item.outstanding_amount || 0), 0);
        const total_interest = items.reduce((sum, item) => sum + parseFloat(item.interest_amount || 0), 0);
        
        setSummary({
          total_outstanding,
          total_interest,
          total_due: total_outstanding + total_interest
        });
      }
    } catch (error) {
      console.error('Error fetching interest data:', error);
      toast.error('Failed to load interest report');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (val) => {
    return parseFloat(val || 0).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    });
  };

  return (
    <>
      <div className="page-header d-flex align-items-center justify-content-between mb-4">
        <div className="page-title">
          <h4>Interest Calculation</h4>
          <p className="text-muted mb-0">Track interest accrued on outstanding balances</p>
        </div>

      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 border-start border-primary border-4">
            <div className="card-body">
              <p className="text-muted small mb-1 fw-600">Total Outstanding</p>
              <h4 className="mb-0">{formatCurrency(summary.total_outstanding)}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 border-start border-warning border-4">
            <div className="card-body">
              <p className="text-muted small mb-1 fw-600">Total Interest Accrued</p>
              <h4 className="mb-0 text-warning">{formatCurrency(summary.total_interest)}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 border-start border-success border-4">
            <div className="card-body">
              <p className="text-muted small mb-1 fw-600">Total Amount Due</p>
              <h4 className="mb-0 text-success">{formatCurrency(summary.total_due)}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Filters Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-transparent border-bottom-0 pt-0 px-0">
          <ul className="nav nav-tabs nav-tabs-bottom px-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'receivables' ? 'active' : ''}`}
                onClick={() => { setActiveTab('receivables'); setFilters(prev => ({ ...prev, entity_id: 'All' })); }}
              >
                On Receivables (Customers)
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'payables' ? 'active' : ''}`}
                onClick={() => { setActiveTab('payables'); setFilters(prev => ({ ...prev, entity_id: 'All' })); }}
              >
                On Payables (Vendors)
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body border-top p-4">
          <div className="row g-3 align-items-end">
            <div className="col-lg-2 col-md-4">
              <label className="form-label fw-600">Annual Rate %</label>
              <input 
                type="number" 
                name="rate" 
                className="form-control" 
                value={filters.rate} 
                onChange={handleFilterChange} 
                step="0.01"
              />
            </div>
            <div className="col-lg-2 col-md-4">
              <label className="form-label fw-600">As of Date</label>
              <input 
                type="date" 
                name="as_of_date" 
                className="form-control" 
                value={filters.as_of_date} 
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-lg-4 col-md-4">
              <label className="form-label fw-600">{activeTab === 'receivables' ? 'Customer' : 'Vendor'}</label>
              <select 
                className="form-select" 
                name="entity_id" 
                value={filters.entity_id} 
                onChange={handleFilterChange}
              >
                <option value="All">All {activeTab === 'receivables' ? 'Customers' : 'Vendors'}</option>
                {entities.map(e => (
                   <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="row g-2">
                <div className="col-6">
                  <label className="form-label fw-600">From Date</label>
                  <input 
                    type="date" 
                    name="from_date" 
                    className="form-control" 
                    value={filters.from_date} 
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-600">To Date</label>
                  <input 
                    type="date" 
                    name="to_date" 
                    className="form-control" 
                    value={filters.to_date} 
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-center mb-0">
              <thead className="table-light">
                <tr>
                  <th>Invoice No</th>
                  <th>{activeTab === 'receivables' ? 'Customer' : 'Vendor'}</th>
                  <th>Invoice Date</th>
                  <th className="text-center">Days</th>
                  <th className="text-end">Outstanding</th>
                  <th className="text-end font-600 text-warning">Interest</th>
                  <th className="text-end font-600">Total Due</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status"></div>
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td className="fw-600">{item.invoice_number || item.invoice_no || item.id}</td>
                      <td>{item.customer?.name || item.vendor?.name || item.customer_name || item.vendor_name || 'N/A'}</td>
                      <td>{item.invoice_date}</td>
                      <td className="text-center">
                        <span className="badge badge-soft-secondary">{item.days_outstanding || 0} Days</span>
                      </td>
                      <td className="text-end">{formatCurrency(item.outstanding || item.outstanding_amount)}</td>
                      <td className="text-end text-warning fw-500">{formatCurrency(item.interest_amount)}</td>
                      <td className="text-end fw-600">{formatCurrency(item.total_due || ((item.outstanding || item.outstanding_amount) + item.interest_amount))}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">No records found for the selected filters</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterestCalculation;

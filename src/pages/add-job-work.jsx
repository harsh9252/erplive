import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createJobWorkEntry } from '../services/jobWorkService';
import { getVendors } from '../services/vendorService';
import { getItems } from '../services/itemService';
import SearchableSelect from '../components/SearchableSelect';

const AddJobWork = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  
  const [formData, setFormData] = useState({
    type: 'OUT',
    vendor_id: '',
    item_id: '',
    qty: 0,
    sent_date: new Date().toISOString().split('T')[0],
    expected_return: '',
    job_charges: 0,
    notes: ''
  });

  const fetchData = useCallback(async () => {
    try {
      const [vendorsRes, itemsRes] = await Promise.all([
        getVendors(),
        getItems(1, 1000)
      ]);
      setVendors(vendorsRes.data || vendorsRes || []);
      setItems(itemsRes.data || itemsRes || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load required data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vendor_id) {
      toast.error('Please select a vendor');
      return;
    }
    if (!formData.item_id) {
      toast.error('Please select an item');
      return;
    }
    if (formData.qty <= 0) {
      toast.error('Quantity must be greater than 0');
      return;
    }
    if (!formData.sent_date) {
      toast.error('Sent date is required');
      return;
    }

    setSaving(true);
    try {
      await createJobWorkEntry(formData);
      toast.success('Job Work record created successfully');
      navigate('/manufacturing/job-work');
    } catch (error) {
      console.error('Error creating job work:', error);
      toast.error(error.message || 'Failed to create job work record');
    } finally {
      setSaving(false);
    }
  };

  const vendorOptions = vendors.map(v => ({
    value: v.id,
    label: v.name
  }));

  const itemOptions = items.map(i => ({
    value: i.id,
    label: `${i.name} (${i.sku || 'No SKU'})`
  }));

  if (loading) {
    return (
      <div className="p-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2 text-muted">Loading required data...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Create Job Work</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item"><Link to="/manufacturing/job-work">Job Work</Link></li>
              <li className="breadcrumb-item active">New Record</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="form-label fw-bold small text-uppercase d-block">Type <span className="text-danger">*</span></label>
                <div className="d-flex gap-4 mt-2">
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="type" 
                            id="typeOut" 
                            value="OUT" 
                            checked={formData.type === 'OUT'} 
                            onChange={handleInputChange} 
                        />
                        <label className="form-check-label" htmlFor="typeOut">
                            OUT (Sent to Vendor)
                        </label>
                    </div>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="type" 
                            id="typeIn" 
                            value="IN" 
                            checked={formData.type === 'IN'} 
                            onChange={handleInputChange} 
                        />
                        <label className="form-check-label" htmlFor="typeIn">
                            IN (Received from Vendor)
                        </label>
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold small text-uppercase">Vendor <span className="text-danger">*</span></label>
                <SearchableSelect
                  options={vendorOptions}
                  value={formData.vendor_id}
                  onChange={(val) => handleSelectChange('vendor_id', val)}
                  placeholder="Search and select vendor"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold small text-uppercase">Item <span className="text-danger">*</span></label>
                <SearchableSelect
                  options={itemOptions}
                  value={formData.item_id}
                  onChange={(val) => handleSelectChange('item_id', val)}
                  placeholder="Search and select item"
                />
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <label className="form-label fw-bold small text-uppercase">Qty <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control"
                  name="qty"
                  value={formData.qty}
                  onChange={handleInputChange}
                  min="0.0001"
                  step="any"
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold small text-uppercase">Sent Date <span className="text-danger">*</span></label>
                <input
                  type="date"
                  className="form-control"
                  name="sent_date"
                  value={formData.sent_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold small text-uppercase">Expected Return</label>
                <input
                  type="date"
                  className="form-control"
                  name="expected_return"
                  value={formData.expected_return}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold small text-uppercase">Job Charges</label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">₹</span>
                  <input
                    type="number"
                    className="form-control"
                    name="job_charges"
                    value={formData.job_charges}
                    onChange={handleInputChange}
                    min="0"
                    step="any"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small text-uppercase">Notes</label>
              <textarea
                className="form-control"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="4"
                placeholder="Additional instructions or job work details..."
              ></textarea>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-5">
              <Link to="/manufacturing/job-work" className="btn btn-light px-4 shadow-none">Cancel</Link>
              <button type="submit" className="btn btn-primary px-5 shadow-none" disabled={saving}>
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  <>Create Job Work Record</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobWork;

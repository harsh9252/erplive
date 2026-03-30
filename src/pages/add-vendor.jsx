import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createVendor, updateVendor, getVendor } from '../services/vendorService';
import { ledgerService } from '../services/ledgerService';
import { toast } from 'react-toastify';

export const AddVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    gstin: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    state_code: '',
    opening_balance: '',
    balance_type: 'CR', // Default for Vendors
    credit_limit: '',
    payment_terms: '',
  });

  const [ledgerId, setLedgerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      fetchVendorData();
    }
  }, [id]);

  const fetchVendorData = async () => {
    setLoading(true);
    try {
      const response = await getVendor(id);
      if (response.success && response.data) {
        const data = response.data;
        setLedgerId(data.ledger_id);
        setFormData({
          name: data.name || '',
          gstin: data.gstin || '',
          phone: data.phone || '',
          email: data.email || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          state_code: data.state_code || '',
          opening_balance: data.ledger?.opening_balance || data.opening_balance || '',
          balance_type: data.ledger?.balance_type || data.opening_balance_type || 'CR',
          credit_limit: data.credit_limit || '',
          payment_terms: data.credit_days || '',
        });
      }
    } catch (error) {
      console.error('Error fetching vendor:', error);
      toast.error('Failed to load vendor data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        opening_balance: parseFloat(formData.opening_balance) || 0,
        credit_limit: parseFloat(formData.credit_limit) || 0,
        credit_days: parseInt(formData.payment_terms) || 0,
      };

      let response;
      if (isEditMode) {
        // Filter forbidden fields for customer update
        const { opening_balance, balance_type, payment_terms, credit_days, ...updateData } = payload;
        response = await updateVendor(id, updateData);

        // Update ledger for balance
        if (response.success && ledgerId) {
          try {
            await ledgerService.updateLedger(ledgerId, {
              name: formData.name + ' (Vendor)',
              opening_balance: parseFloat(formData.opening_balance) || 0,
              opening_balance_type: formData.balance_type,
            });
          } catch (err) {
            console.error('Ledger sync failed:', err);
          }
        }
      } else {
        // Filter forbidden fields for customer create
        const { balance_type, payment_terms, credit_days, ...createData } = payload;
        response = await createVendor(createData);
      }

      if (response.success) {
        toast.success(`Vendor ${isEditMode ? 'updated' : 'created'} successfully`);
        navigate('/master/vendors');
      }
    } catch (error) {
      console.error('Error saving vendor:', error);
      toast.error(error.message || 'Validation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h5 className="fw-bold mb-0">{isEditMode ? 'Edit' : 'Add'} Vendor</h5>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 fs-13">
            <li className="breadcrumb-item">
              <Link to="/master/vendors">Vendors</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {isEditMode ? 'Edit' : 'Add'}
            </li>
          </ol>
        </nav>
      </div>

      <div className="card border-0 shadow-sm rounded-16 overflow-hidden">
        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* Basic Information */}
              <div className="col-12 border-bottom pb-2">
                <h6 className="fw-bold text-primary mb-0">General Information</h6>
              </div>

              <div className="col-md-6">
                <label className="form-label fs-13 fw-bold">Vendor Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter vendor's full name"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label fs-13 fw-bold">GSTIN</label>
                <input
                  type="text"
                  className="form-control"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleInputChange}
                  placeholder="15-digit GSTIN (Optional)"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fs-13 fw-bold">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fs-13 fw-bold">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="vendor@company.com"
                />
              </div>

              <div className="col-12">
                <label className="form-label fs-13 fw-bold">Business Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Street, area, and building details"
                ></textarea>
              </div>

              <div className="col-md-4">
                <label className="form-label fs-13 fw-bold">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fs-13 fw-bold">State</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fs-13 fw-bold">State Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="state_code"
                  value={formData.state_code}
                  onChange={handleInputChange}
                  placeholder="e.g. 08"
                />
              </div>

              {/* Financial Information */}
              <div className="col-12 border-bottom pb-2 mt-5">
                <h6 className="fw-bold text-primary mb-0">Financial Settings</h6>
              </div>

              <div className="col-md-4">
                <label className="form-label fs-13 fw-bold">Opening Balance (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  name="opening_balance"
                  value={formData.opening_balance}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fs-13 fw-bold">Balance Type</label>
                <div className="d-flex gap-3 pt-1">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="balance_type"
                      id="cr"
                      value="CR"
                      checked={formData.balance_type === 'CR'}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label fs-13" htmlFor="cr">CR (Payable)</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="balance_type"
                      id="dr"
                      value="DR"
                      checked={formData.balance_type === 'DR'}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label fs-13" htmlFor="dr">DR (Receivable)</label>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label fs-13 fw-bold">Credit Limit (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  name="credit_limit"
                  value={formData.credit_limit}
                  onChange={handleInputChange}
                  placeholder="0 = Unlimited"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fs-13 fw-bold">Payment Terms (Days)</label>
                <input
                  type="number"
                  className="form-control"
                  name="payment_terms"
                  value={formData.payment_terms}
                  onChange={handleInputChange}
                  placeholder="e.g. 30"
                />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-5">
              <button
                type="button"
                className="btn btn-outline-secondary px-4 py-2"
                onClick={() => navigate('/master/vendors')}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary px-5 py-2"
                disabled={loading}
              >
                {loading ? 'Saving...' : (isEditMode ? 'Update Vendor' : 'Create Vendor')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddVendor;

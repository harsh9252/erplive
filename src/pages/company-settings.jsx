import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { settingsService } from '../services/settingsService';
import companyService, { getCurrentCompany } from '../services/companyService';
import { toast } from 'react-toastify';

const CompanySettings = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    legal_name: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    state_code: '',
    gstin: '',
    pan: '',
    tan: '',
    cin: '',
  });

  useEffect(() => {
    fetchCompanySettings();
  }, []);

  const fetchCompanySettings = async () => {
    setLoading(true);
    try {
      // Use the getCurrentCompany API to get the active company's full details
      const response = await getCurrentCompany();
      
      if (response.success && response.data) {
        const data = response.data;
        setFormData({
          id: data.id || null,
          name: data.name || '',
          legal_name: data.legal_name || '',
          email: data.email || '',
          phone: data.phone || '',
          website: data.website || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          pincode: data.pincode || '',
          state_code: data.state_code || '',
          gstin: data.gstin || '',
          pan: data.pan || '',
          tan: data.tan || '',
          cin: data.cin || '',
        });
      } else {
        // Fallback to settingsService if getCurrentCompany is not successful
        const settingsResponse = await settingsService.getCompanySettings();
        if (settingsResponse.success && settingsResponse.data) {
          const data = settingsResponse.data;
          setFormData({
            id: data.id || null,
            name: data.name || '',
            legal_name: data.legal_name || '',
            email: data.email || '',
            phone: data.phone || '',
            website: data.website || '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            pincode: data.pincode || '',
            state_code: data.state_code || '',
            gstin: data.gstin || '',
            pan: data.pan || '',
            tan: data.tan || '',
            cin: data.cin || '',
          });
        }
      }
    } catch (error) {
      console.error('Error fetching company settings:', error);
      toast.error('Failed to load company settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id) {
      toast.error('Unable to update company: ID missing');
      return;
    }
    setSubmitting(true);
    try {
      // Use companyService.updateCompanyProfile for updating company information
      const response = await companyService.updateCompanyProfile(formData.id, formData);
      if (response.success || response.id) {
        toast.success('Company settings updated successfully');
        fetchCompanySettings(); // Refresh data
      } else {
        toast.error(response.message || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating company settings:', error);
      toast.error(error.message || 'Failed to update company settings');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    fetchCompanySettings();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          {/* Settings Sidebar */}
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="company-settings" />
          </div>

          {/* Main Content */}
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-0">Company Settings</h6>
                <p className="fs-13 text-muted mt-1">Update your company information and details</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <div className="row g-3">
                    {/* Company Name */}
                    <div className="col-md-6">
                      <label className="form-label text-dark">Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Company Name"
                        required
                      />
                    </div>

                    {/* Legal Name */}
                    <div className="col-md-6">
                      <label className="form-label text-dark">Legal Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="legal_name"
                        value={formData.legal_name}
                        onChange={handleInputChange}
                        placeholder="Legal Business Name"
                      />
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label className="form-label text-dark">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                      />
                    </div>

                    {/* Phone */}
                    <div className="col-md-6">
                      <label className="form-label text-dark">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                      />
                    </div>

                    {/* GSTIN */}
                    <div className="col-md-6">
                      <label className="form-label text-dark">GSTIN</label>
                      <input
                        type="text"
                        className="form-control"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleInputChange}
                        placeholder="e.g., 27AAPFU0939F1ZV"
                      />
                    </div>

                    {/* PAN */}
                    <div className="col-md-6">
                      <label className="form-label text-dark">PAN</label>
                      <input
                        type="text"
                        className="form-control"
                        name="pan"
                        value={formData.pan}
                        onChange={handleInputChange}
                        placeholder="e.g., AAPFU0939F"
                      />
                    </div>

                    {/* TAN */}
                    <div className="col-md-6">
                      <label className="form-label text-dark">TAN <span className="text-muted fw-normal">(Tax Deduction Account Number)</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="tan"
                        value={formData.tan}
                        onChange={handleInputChange}
                        placeholder="e.g., BLRA12345B"
                        maxLength={10}
                        style={{ textTransform: 'uppercase' }}
                      />
                    </div>

                    {/* CIN */}
                    <div className="col-md-6">
                      <label className="form-label text-dark">CIN <span className="text-muted fw-normal">(Company Identification Number)</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="cin"
                        value={formData.cin}
                        onChange={handleInputChange}
                        placeholder="e.g., U72200KA2020PTC123456"
                        maxLength={21}
                        style={{ textTransform: 'uppercase' }}
                      />
                    </div>

                    {/* Website */}
                    <div className="col-md-12">
                      <label className="form-label text-dark">Website</label>
                      <input
                        type="url"
                        className="form-control"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://example.com"
                      />
                    </div>

                    {/* Address */}
                    <div className="col-md-12">
                      <label className="form-label text-dark">Address</label>
                      <textarea
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Company Address"
                        rows="3"
                        required
                      />
                    </div>

                    {/* City */}
                    <div className="col-md-4">
                      <label className="form-label text-dark">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                      />
                    </div>

                    {/* State */}
                    <div className="col-md-3">
                      <label className="form-label text-dark">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                      />
                    </div>

                    {/* State Code */}
                    <div className="col-md-2">
                      <label className="form-label text-dark">State Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state_code"
                        value={formData.state_code}
                        onChange={handleInputChange}
                        placeholder="e.g., 27"
                      />
                    </div>

                    {/* Zip Code */}
                    <div className="col-md-3">
                      <label className="form-label text-dark">Pincode</label>
                      <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="d-flex justify-content-end gap-3 mb-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCancel}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;

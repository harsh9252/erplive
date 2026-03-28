import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { vendorService } from '../services/vendorService';

const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        setLoading(true);
        const response = await vendorService.getVendor(id);
        
        // Robust data extraction
        let foundVendor = null;
        if (response.data && !Array.isArray(response.data)) {
          foundVendor = response.data;
        } else if (response.data && Array.isArray(response.data.items) && response.data.items.length > 0) {
          foundVendor = response.data.items[0];
        } else if (Array.isArray(response.data) && response.data.length > 0) {
          foundVendor = response.data[0];
        } else if (response && !response.data && response.id) {
          foundVendor = response;
        }

        if (foundVendor) {
          setVendor(foundVendor);
        } else {
          toast.error('Vendor not found');
          navigate('/vendors');
        }
      } catch (err) {
        console.error('Error fetching vendor:', err);
        toast.error('Failed to load vendor details');
        navigate('/vendors');
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id, navigate]);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (!vendor) {
    return null;
  }

  const getTypeLabel = (type) => {
    const labels = {
      MANUFACTURER: 'Manufacturer',
      DISTRIBUTOR: 'Distributor',
      TRADER: 'Trader',
      SERVICE_PROVIDER: 'Service Provider',
    };
    return labels[type] || type;
  };

  const getStateLabel = (code) => {
    const states = {
      MH: 'Maharashtra',
      GJ: 'Gujarat',
      KA: 'Karnataka',
      TN: 'Tamil Nadu',
      UP: 'Uttar Pradesh',
      DL: 'Delhi',
      WB: 'West Bengal',
      RJ: 'Rajasthan',
    };
    return states[code] || code;
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Vendor Details</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/vendors">Vendors</Link>
              </li>
              <li className="breadcrumb-item active">Details</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          <Link to={`/edit-vendor/${vendor.id}`} className="btn btn-primary">
            <i className="isax isax-edit me-1"></i>Edit
          </Link>
          <Link to="/vendors" className="btn btn-outline-secondary">
            Back
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {/* Basic Information */}
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="mb-0">Basic Information</h6>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="text-muted mb-1">Vendor Name</p>
                  <h6 className="fw-semibold">{vendor.name}</h6>
                </div>
                <div className="col-md-6">
                  <p className="text-muted mb-1">Company / Firm</p>
                  <h6 className="fw-semibold">{vendor.company_name || '-'}</h6>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="text-muted mb-1">Vendor Type</p>
                  <span className="badge badge-sm bg-light text-dark">
                    {getTypeLabel(vendor.vendor_type)}
                  </span>
                </div>
                <div className="col-md-6">
                  <p className="text-muted mb-1">Status</p>
                  <span
                    className={`badge badge-sm ${
                      vendor.status === 'ACTIVE' ? 'badge-soft-success' : 'badge-soft-secondary'
                    }`}
                  >
                    {vendor.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tax & Compliance */}
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="mb-0">Tax & Compliance</h6>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="text-muted mb-1">GSTIN</p>
                  <h6 className="fw-semibold">{vendor.gstin || '-'}</h6>
                </div>
                <div className="col-md-6">
                  <p className="text-muted mb-1">PAN</p>
                  <h6 className="fw-semibold">{vendor.pan || '-'}</h6>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="mb-0">Contact Information</h6>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="text-muted mb-1">Email</p>
                  <h6 className="fw-semibold">
                    {vendor.email ? (
                      <Link href={`mailto:${vendor.email}`}>{vendor.email}</Link>
                    ) : (
                      '-'
                    )}
                  </h6>
                </div>
                <div className="col-md-6">
                  <p className="text-muted mb-1">Phone</p>
                  <h6 className="fw-semibold">
                    {vendor.phone ? (
                      <Link href={`tel:${vendor.phone}`}>{vendor.phone}</Link>
                    ) : (
                      '-'
                    )}
                  </h6>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="text-muted mb-1">City</p>
                  <h6 className="fw-semibold">{vendor.city || '-'}</h6>
                </div>
                <div className="col-md-6">
                  <p className="text-muted mb-1">State</p>
                  <h6 className="fw-semibold">
                    {vendor.state ? getStateLabel(vendor.state) : '-'}
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p className="text-muted mb-1">Address</p>
                  <h6 className="fw-semibold">{vendor.address || '-'}</h6>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Banking */}
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="mb-0">Payment & Banking</h6>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="text-muted mb-1">Payment Terms</p>
                  <h6 className="fw-semibold">{vendor.payment_terms || '-'}</h6>
                </div>
                <div className="col-md-6">
                  <p className="text-muted mb-1">Bank Account No.</p>
                  <h6 className="fw-semibold">{vendor.bank_account || '-'}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p className="text-muted mb-1">IFSC Code</p>
                  <h6 className="fw-semibold">{vendor.ifsc_code || '-'}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* Summary Card */}
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">Summary</h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <p className="text-muted mb-1">Vendor ID</p>
                <h6 className="fw-semibold">{vendor.id}</h6>
              </div>
              <div className="mb-3">
                <p className="text-muted mb-1">Created Date</p>
                <h6 className="fw-semibold">
                  {new Date(vendor.createdDate).toLocaleDateString()}
                </h6>
              </div>
              <div className="mb-3">
                <p className="text-muted mb-1">Vendor Type</p>
                <h6 className="fw-semibold">{getTypeLabel(vendor.vendor_type)}</h6>
              </div>
              <div className="mb-3">
                <p className="text-muted mb-1">Status</p>
                <span
                  className={`badge badge-sm ${
                    vendor.status === 'ACTIVE' ? 'badge-soft-success' : 'badge-soft-secondary'
                  }`}
                >
                  {vendor.status}
                </span>
              </div>
              <hr />
              <div className="d-grid gap-2">
                <Link to={`/edit-vendor/${vendor.id}`} className="btn btn-primary btn-sm">
                  <i className="isax isax-edit me-1"></i>Edit Vendor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDetails;

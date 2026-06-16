import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { settingsService } from '../services/settingsService';
import { toast } from 'react-toastify';

const VoucherTypes = () => {
  const [loading, setLoading] = useState(true);
  const [voucherTypes, setVoucherTypes] = useState([]);

  useEffect(() => {
    fetchVoucherTypes();
  }, []);

  const fetchVoucherTypes = async () => {
    setLoading(true);
    try {
      const response = await settingsService.getVoucherTypes();
      if (response.success) {
        setVoucherTypes(response.data || []);
      } else {
        toast.error(response.message || 'Failed to fetch voucher types');
      }
    } catch (error) {
      console.error('Error fetching voucher types:', error);
      toast.error('Failed to load voucher types');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          {/* Settings Sidebar Removed for full-width layout */}
          {/* Main Content */}
          <div className="col-12">
            <div className="mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-0">Voucher Types</h6>
                <p className="fs-13 text-muted mt-1">System defined voucher types for accounting transactions</p>
              </div>
            </div>

            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-nowrap mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th className="px-4 py-3">#</th>
                        <th className="py-3">Code</th>
                        <th className="py-3">Voucher Type Name</th>
                        <th className="py-3 text-center">Affects Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </td>
                        </tr>
                      ) : voucherTypes.length > 0 ? (
                        voucherTypes.map((type, index) => (
                          <tr key={type.id || index}>
                            <td className="px-4 py-3 text-muted">{index + 1}</td>
                            <td className="py-3 fw-bold text-primary">{type.code}</td>
                            <td className="py-3 fw-medium text-dark">{type.name}</td>
                            <td className="py-3 text-center">
                              {type.affects_stock ? (
                                <span className="badge badge-soft-info">Yes</span>
                              ) : (
                                <span className="badge badge-soft-secondary">No</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-5">
                            <i className="isax isax-folder-open text-muted fs-3"></i>
                            <p className="mt-2 text-muted">No voucher types found</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 border rounded-3 bg-light">
              <div className="d-flex gap-2">
                <i className="isax isax-info-circle text-primary fs-18"></i>
                <div>
                  <h6 className="fs-14 fw-bold mb-1">Information</h6>
                  <p className="fs-13 text-muted mb-0">Voucher types are system-defined and cannot be modified or deleted to ensure accounting integrity. These types are used to categorize all financial transactions across the platform.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherTypes;

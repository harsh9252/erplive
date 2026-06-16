import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createVendor, updateVendor, getVendor } from '../services/vendorService';
import { ledgerService } from '../services/ledgerService';
import { toast } from 'react-toastify';
import VendorForm from '../components/VendorForm';

export const AddVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [initialData, setInitialData] = useState(null);
  const [ledgerId, setLedgerId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchVendorData();
    }
  }, [id, isEditMode]);

  const fetchVendorData = async () => {
    setLoading(true);
    try {
      const response = await getVendor(id);
      if (response.success && response.data) {
        setLedgerId(response.data.ledger_id);
        setInitialData(response.data);
      }
    } catch (error) {
      console.error('Error fetching vendor:', error);
      toast.error('Failed to load vendor data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    if (loading) return;
    setLoading(true);
    try {
      const payload = {
        ...formData,
        opening_balance: parseFloat(formData.opening_balance) || 0,
        credit_limit: parseFloat(formData.credit_limit) || 0,
        credit_days: parseInt(formData.payment_terms) || 0,
        liable_to_tds: formData.liable_to_tds ? 1 : 0,
      };

      let response;
      if (isEditMode) {
        // Filter forbidden fields for vendor update
        const { opening_balance, balance_type, ...updateData } = payload;
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
        // Filter forbidden fields for vendor create
        const createData = { ...payload };
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
          {(isEditMode && !initialData) ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <VendorForm 
              initialData={initialData}
              onSubmit={handleSubmit}
              isLoading={loading}
              onClose={() => navigate('/master/vendors')}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddVendor;

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import customerService from '../services/customerService';
import ledgerService from '../services/ledgerService';
import { toast } from 'react-toastify';
import CustomerForm from '../components/CustomerForm';

const AddCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ledgerId, setLedgerId] = useState(null);

  const fetchCustomerData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await customerService.getCustomerById(id);
      if (response && response.data) {
        setLedgerId(response.data.ledger_id);
        setInitialData(response.data);
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      toast.error('Failed to load customer profile');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditMode) {
      fetchCustomerData();
    }
  }, [isEditMode, fetchCustomerData]);

  const handleSubmit = async (formData) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const payload = { ...formData };
      let response;

      if (isEditMode) {
        // Exclude fields not allowed on update
        const { opening_balance, balance_type, opening_balance_type, pan_no, ...updateData } = payload;
        response = await customerService.updateCustomer(id, updateData);

        // Update the linked ledger separately for balance-related fields
        if (response.success && ledgerId) {
          try {
            await ledgerService.updateLedger(ledgerId, {
              name: formData.name + ' (Customer)',
              opening_balance: parseFloat(formData.opening_balance) || 0,
              opening_balance_type: formData.balance_type
            });
          } catch (ledgerErr) {
            console.error('Error updating linked ledger:', ledgerErr);
          }
        }
      } else {
        // Exclude fields not allowed on create
        const { opening_balance_type, pan_no, ...createData } = payload;
        response = await customerService.createCustomer(createData);
      }

      if (response && response.success) {
        toast.success(isEditMode ? 'Customer updated successfully' : 'Customer created successfully');
        navigate('/master/customers');
      } else {
        const errorMsg = response?.message || 'Action failed';
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Error saving customer:', error);
      toast.error(error.message || 'Operation failed. Please check inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">{isEditMode ? 'Edit Customer' : 'Register New Customer'}</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-muted"><i className="isax isax-home-2 me-1"></i>Home</Link>
              </li>
              <li className="breadcrumb-item text-muted">Master Data</li>
              <li className="breadcrumb-item">
                <Link to="/master/customers" className="text-muted">Customers</Link>
              </li>
              <li className="breadcrumb-item active text-primary">{isEditMode ? 'Update' : 'New Registration'}</li>
            </ol>
          </nav>
        </div>
        <button onClick={() => navigate('/master/customers')} className="btn btn-outline-secondary rounded-pill px-4">
          <i className="isax isax-arrow-left ps-0 me-2"></i>Back to Customers
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-xl-9 col-lg-10">
          {(isEditMode && !initialData) ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <CustomerForm
              initialData={initialData}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              onClose={() => navigate('/master/customers')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;

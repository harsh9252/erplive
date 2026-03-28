import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CustomerForm from '../components/CustomerForm';
import { getCustomerById, updateCustomer } from '../services/customerService';
import { toast } from 'react-toastify';

const EditCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
      try {
        const response = await getCustomerById(id);
        if (response.success && response.data) {
          setCustomerData(response.data);
        } else {
          toast.error('Customer not found');
          navigate('/customers');
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
        toast.error('Failed to load customer details');
        navigate('/customers');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomer();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await updateCustomer(id, formData);
      toast.success('Customer updated successfully!');
      navigate('/customers');
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error(error.message || 'Failed to update customer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Edit Customer</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/customers">Customers</Link>
              </li>
              <li className="breadcrumb-item active">Edit Customer</li>
            </ol>
          </nav>
        </div>
      </div>

      {customerData && <CustomerForm initialData={customerData} onSubmit={handleSubmit} isLoading={isLoading} />}
    </>
  );
};

export default EditCustomer;

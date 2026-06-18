import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createEcommerceOperator, updateEcommerceOperator, getEcommerceOperator } from '../services/ecommerceOperatorService';
import { toast } from 'react-toastify';
import EcommerceOperatorForm from '../components/EcommerceOperatorForm';

export const AddEcommerceOperator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchOperatorData();
    }
  }, [id, isEditMode]);

  const fetchOperatorData = async () => {
    setLoading(true);
    try {
      const response = await getEcommerceOperator(id);
      if (response.success && response.data) {
        setInitialData(response.data);
      }
    } catch (error) {
      console.error('Error fetching e-commerce operator:', error);
      toast.error('Failed to load e-commerce operator data');
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
        is_active: formData.is_active ? 1 : 0,
      };

      let response;
      if (isEditMode) {
        response = await updateEcommerceOperator(id, payload);
      } else {
        response = await createEcommerceOperator(payload);
      }

      if (response.success) {
        toast.success(`E-Commerce Operator ${isEditMode ? 'updated' : 'created'} successfully`);
        navigate('/master/ecommerce-operators');
      }
    } catch (error) {
      console.error('Error saving e-commerce operator:', error);
      toast.error(error.message || 'Validation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h5 className="fw-bold mb-0">{isEditMode ? 'Edit' : 'Add'} E-Commerce Operator</h5>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 fs-13">
            <li className="breadcrumb-item">
              <Link to="/master/ecommerce-operators">E-Commerce Operators</Link>
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
            <EcommerceOperatorForm 
              initialData={initialData}
              onSubmit={handleSubmit}
              isLoading={loading}
              onClose={() => navigate('/master/ecommerce-operators')}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddEcommerceOperator;

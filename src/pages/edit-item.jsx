import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    barcode: '',
    category_id: '',
    uom_id: '',
    item_type: 'PRODUCT',
    hsn_code: '',
    description: '',
    purchase_rate: '',
    sale_rate: '',
    mrp: '',
    gst_rate: '0',
    cess_rate: '0',
    track_batch: false,
    track_serial: false,
    reorder_level: '',
    reorder_qty: '',
    min_stock: '',
    max_stock: '',
    is_active: true,
  });

  useEffect(() => {
    // TODO: Fetch item data from backend API
    console.log('Fetching item with ID:', id);
    // setFormData(fetchedData);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Item updated:', formData);
    // TODO: Send to backend API
    navigate('/inventory');
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Edit Item</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/inventory">Inventory</Link>
              </li>
              <li className="breadcrumb-item active">Edit Item</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
        

import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditInvoice = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const invoice = savedInvoices.find(inv => inv.id === id);
    if (invoice && invoice.fullData) {
      setFormData(invoice.fullData);
    } else {
      toast.error('Invoice details not found!', { position: 'top-right' });
      navigate('/invoices');
    }
    setLoading(false);
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const items = [...formData.items];
    items[index][field] = value;
    if (field === 'quantity' || field === 'rate') {
      items[index].amount = items[index].quantity * items[index].rate;
    }
    setFormData((prev) => ({ ...prev, items }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0, amount: 0 }],
    }));
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customer) {
      toast.error('Please select a customer.', { position: 'top-right' });
      return;
    }

    const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const index = savedInvoices.findIndex(inv => inv.id === id);

    if (index !== -1) {
      const customers = {
        '1': 'Emily Clark',
        '2': 'John Carter',
        '3': 'Sophia White',
      };
      const avatars = {
        '1': '/assets/img/users/user-25.jpg',
        '2': '/assets/img/users/user-19.jpg',
        '3': '/assets/img/users/user-16.jpg',
      };

      savedInvoices[index] = {
        ...savedInvoices[index],
        customer: customers[formData.customer] || 'Guest Customer',
        customerAvatar: avatars[formData.customer] || '/assets/img/users/user-01.jpg',
        amount: `$${(formData.items.reduce((sum, item) => sum + item.amount, 0) * 1.1).toFixed(2)}`,
        dueDate: formData.dueDate,
        createdDate: formData.invoiceDate,
        fullData: formData
      };
      localStorage.setItem('invoices', JSON.stringify(savedInvoices));
      toast.success('Invoice updated successfully!', { position: 'top-right', autoClose: 3000 });
      navigate('/invoices');
    } else {
      toast.error('Error updating invoice.');
      navigate('/invoices');
    }
  };

  if (loading || !formData) return <div className="text-center p-5">Loading...</div>;

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Edit Invoice {id}</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/invoices">Invoices</Link>
              </li>
              <li className="breadcrumb-item active">Edit Invoice</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Customer</label>
                <select
                  className="form-control"
                  name="customer"
                  value={formData.customer}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Customer</option>
                  <option value="1">Emily Clark</option>
                  <option value="2">John Carter</option>
                  <option value="3">Sophia White</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Invoice Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6>Items</h6>
                <button type="button" className="btn btn-sm btn-primary" onClick={addItem}>
                  <i className="isax isax-add me-1"></i>Add Item
                </button>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th width="100">Quantity</th>
                      <th width="120">Rate</th>
                      <th width="120">Amount</th>
                      <th width="50">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            placeholder="Item description"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)
                            }
                            min="1"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={item.rate}
                            onChange={(e) =>
                              handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)
                            }
                            step="0.01"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={`$${item.amount.toFixed(2)}`}
                            readOnly
                          />
                        </td>
                        <td>
                          {formData.items.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeItem(index)}
                            >
                              <i className="isax isax-trash"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Notes</label>
                  <textarea
                    className="form-control"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Additional notes..."
                  ></textarea>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>
                      ${formData.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax (10%):</span>
                    <span>
                      $
                      {(formData.items.reduce((sum, item) => sum + item.amount, 0) * 0.1).toFixed(
                        2
                      )}
                    </span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>
                      $
                      {(formData.items.reduce((sum, item) => sum + item.amount, 0) * 1.1).toFixed(
                        2
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Link to="/invoices" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary">
                Update Invoice
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditInvoice;

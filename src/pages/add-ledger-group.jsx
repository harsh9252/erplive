import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddLedgerGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    parent_id: '',
    nature: '',
    description: '',
  });

  const [parentGroups, setParentGroups] = useState([]);
  const [errors, setErrors] = useState({});

  // Sample parent groups for dropdown
  useEffect(() => {
    const sampleParentGroups = [
      { id: 'ASSETS', name: 'ASSETS' },
      { id: 'LIABILITIES', name: 'LIABILITIES' },
      { id: 'INCOME', name: 'INCOME' },
      { id: 'EXPENSES', name: 'EXPENSES' },
      { id: 1, name: 'Fixed Assets' },
      { id: 2, name: 'Current Assets' },
      { id: 3, name: 'Loans & Advances' },
      { id: 4, name: 'Capital Account' },
      { id: 5, name: 'Current Liabilities' },
      { id: 6, name: 'Direct Income' },
      { id: 7, name: 'Indirect Income' },
      { id: 8, name: 'Direct Expenses' },
    ];
    setParentGroups(sampleParentGroups);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Group Name is required';
    }

    if (!formData.nature) {
      newErrors.nature = 'Nature is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare data for API
    const submitData = {
      name: formData.name.trim(),
      parent_id: formData.parent_id || null,
      nature: formData.nature,
      description: formData.description.trim(),
    };

    console.log('Ledger Group created:', submitData);
    // TODO: Call API when backend is ready
    // ledgerGroupService.createGroup(submitData)
    //   .then(() => navigate('/ledger-groups'))
    //   .catch(err => console.error('Error:', err));

    navigate('/ledger-groups');
  };

  const handleCancel = () => {
    navigate('/ledger-groups');
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Add Ledger Group</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/accounting">Accounting</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/accounting">Chart of Accounts</Link>
              </li>
              <li className="breadcrumb-item active">Add Group</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">
                  Group Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Fixed Assets"
                />
                {errors.name && (
                  <div className="invalid-feedback d-block">{errors.name}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Nature <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-control ${errors.nature ? 'is-invalid' : ''}`}
                  name="nature"
                  value={formData.nature}
                  onChange={handleInputChange}
                >
                  <option value="">Select Nature</option>
                  <option value="ASSET">Asset</option>
                  <option value="LIABILITY">Liability</option>
                  <option value="INCOME">Income</option>
                  <option value="EXPENSE">Expense</option>
                </select>
                {errors.nature && (
                  <div className="invalid-feedback d-block">{errors.nature}</div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Under Group</label>
                <select
                  className="form-control"
                  name="parent_id"
                  value={formData.parent_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Parent Group (Optional)</option>
                  {parentGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
                <small className="text-muted">
                  Leave empty for top-level group
                </small>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description (optional)"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="isax isax-save-2 me-2"></i>Save Group
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddLedgerGroup;

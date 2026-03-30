import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddCostCategory = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log('Form Submitted:', formData);
        // TODO: API Call
        navigate('/cost-categories');
    };

    return (
        <>
            <div className="mb-4">
                <h4>Add Cost Category</h4>
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
                            <Link to="/cost-categories">Cost Categories</Link>
                        </li>
                        <li className="breadcrumb-item active">Add Category</li>
                    </ol>
                </nav>
            </div>

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Projects"
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                            <div className="col-12 mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter category description..."
                                ></textarea>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary">
                                Save Category
                            </button>
                            <Link to="/cost-categories" className="btn btn-outline-secondary">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddCostCategory;

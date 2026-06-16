import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { costCenterService } from '../services/costCenterService';
import { costCategoryService } from '../services/costCategoryService';
import { toast } from 'react-toastify';

const AddCostCenter = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category_id: '',
        description: '',
        budget: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Load categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await costCategoryService.getCategories();
                if (response && response.data) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

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
        if (!formData.category_id) {
            newErrors.category_id = 'Category is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const submitData = {
                ...formData,
                budget: formData.budget ? parseFloat(formData.budget) : null,
                category_id: parseInt(formData.category_id)
            };
            await costCenterService.createCostCenter(submitData);
            toast.success('Cost Center created successfully!');
            navigate('/cost-centers');
        } catch (error) {
            console.error('Error creating cost center:', error);
            toast.error(error.message || 'Failed to create cost center');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="mb-4">
                <h4>Add Cost Center</h4>
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
                            <Link to="/cost-centers">Cost Centers</Link>
                        </li>
                        <li className="breadcrumb-item active">Add Cost Center</li>
                    </ol>
                </nav>
            </div>

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
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
                                    placeholder="e.g., Sales Department"
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Category <span className="text-danger">*</span>
                                </label>
                                <select
                                    className={`form-select ${errors.category_id ? 'is-invalid' : ''}`}
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && <div className="invalid-feedback">{errors.category_id}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Budget Amount</label>
                                <div className="input-group">
                                    <span className="input-group-text">₹</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            <div className="col-12 mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter cost center description..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="d-flex gap-2 mt-4">
                            <button type="submit" className="btn btn-primary px-4">
                                Save Cost Center
                            </button>
                            <Link to="/cost-centers" className="btn btn-outline-secondary px-4">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddCostCenter;

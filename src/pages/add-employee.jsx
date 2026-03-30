import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createEmployee, updateEmployee, getEmployee } from '../services/employeeService';

const AddEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        employee_code: '',
        name: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        date_of_joining: '',
        basic_salary: '',
        pan: '',
        aadhaar: '',
        pf_account: '',
        esi_number: '',
        bank_account: '',
        bank_ifsc: '',
        bank_name: '',
        status: 'ACTIVE'
    });

    useEffect(() => {
        if (isEdit) {
            fetchEmployeeDetails();
        }
    }, [isEdit, id]);

    const fetchEmployeeDetails = async () => {
        setLoading(true);
        try {
            const response = await getEmployee(id);
            const data = response.data || response;
            setFormData({
                employee_code: data.employee_code || '',
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                department: data.department || '',
                designation: data.designation || '',
                date_of_joining: data.date_of_joining ? data.date_of_joining.split('T')[0] : '',
                basic_salary: data.basic_salary || '',
                pan: data.pan || '',
                aadhaar: data.aadhaar || '',
                pf_account: data.pf_account || '',
                esi_number: data.esi_number || '',
                bank_account: data.bank_account || '',
                bank_ifsc: data.bank_ifsc || '',
                bank_name: data.bank_name || '',
                status: data.status || 'ACTIVE'
            });
        } catch (error) {
            toast.error('Failed to load employee details');
            navigate('/payroll/employees');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (isEdit) {
                await updateEmployee(id, formData);
                toast.success('Employee updated successfully');
            } else {
                await createEmployee(formData);
                toast.success('Employee created successfully');
            }
            navigate('/payroll/employees');
        } catch (error) {
            toast.error(error.message || `Failed to ${isEdit ? 'update' : 'create'} employee`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="container-fluid py-5 text-center">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                <div>
                    <h4 className="fw-bold mb-1">{isEdit ? 'Edit Employee' : 'Create New Employee'}</h4>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 fs-13">
                            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item"><Link to="/payroll/employees">Employees</Link></li>
                            <li className="breadcrumb-item active">{isEdit ? 'Edit' : 'Add'}</li>
                        </ol>
                    </nav>
                </div>
                <button 
                  type="button" 
                  onClick={() => navigate('/payroll/employees')} 
                  className="btn btn-outline-secondary btn-sm shadow-none"
                >
                    <i className="isax isax-arrow-left-2 me-2 fs-16"></i>
                    Back to Directory
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    {/* General Information */}
                    <div className="col-md-12">
                        <div className="card border-0 shadow-sm overflow-hidden">
                            <div className="card-header bg-white py-3 border-0">
                                <h6 className="fw-bold mb-0 text-primary">General Information</h6>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-2">
                                        <label className="form-label small fw-bold text-muted">Employee Code <span className="text-danger">*</span></label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="employee_code"
                                            value={formData.employee_code}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold text-muted">Full Name <span className="text-danger">*</span></label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold text-muted">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold text-muted">Phone Number</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold text-muted">Department</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold text-muted">Designation</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold text-muted">Date of Joining <span className="text-danger">*</span></label>
                                        <input 
                                            type="date" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="date_of_joining"
                                            value={formData.date_of_joining}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold text-muted">Basic Salary (Monthly) <span className="text-danger">*</span></label>
                                        <div className="input-group input-group-sm">
                                            <span className="input-group-text bg-light pe-2">₹</span>
                                            <input 
                                                type="number" 
                                                className="form-control shadow-none" 
                                                name="basic_salary"
                                                value={formData.basic_salary}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statutory Information */}
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm overflow-hidden h-100">
                            <div className="card-header bg-white py-3 border-0">
                                <h6 className="fw-bold mb-0 text-primary">Statutory Details</h6>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted">PAN Card</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="pan"
                                            value={formData.pan}
                                            onChange={handleChange}
                                            maxLength="10"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted">Aadhaar Number</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="aadhaar"
                                            value={formData.aadhaar}
                                            onChange={handleChange}
                                            maxLength="12"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted">PF Account No</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="pf_account"
                                            value={formData.pf_account}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted">ESI Number</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="esi_number"
                                            value={formData.esi_number}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Banking Information */}
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm overflow-hidden h-100">
                            <div className="card-header bg-white py-3 border-0">
                                <h6 className="fw-bold mb-0 text-primary">Bank Details</h6>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <label className="form-label small fw-bold text-muted">Bank Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="bank_name"
                                            value={formData.bank_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted">Account Number</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="bank_account"
                                            value={formData.bank_account}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted">IFSC Code</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="bank_ifsc"
                                            value={formData.bank_ifsc}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label small fw-bold text-muted">Status</label>
                                        <select 
                                            className="form-select form-select-sm shadow-none text-dark" 
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >
                                            <option value="ACTIVE">Active</option>
                                            <option value="INACTIVE">Inactive</option>
                                            <option value="TERMINATED">Terminated</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Submission */}
                    <div className="col-md-12 text-end mb-5">
                        <hr className="mb-4 opacity-10" />
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary me-3 shadow-none px-4"
                            onClick={() => navigate('/payroll/employees')}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary shadow-none px-4 d-inline-flex align-items-center"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <><span className="spinner-border spinner-border-sm me-2"></span> Saving...</>
                            ) : (
                                <><i className="isax isax-tick-circle me-2 fs-18"></i> {isEdit ? 'Update Employee' : 'Create Employee'}</>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;

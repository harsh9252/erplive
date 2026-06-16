import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createEmployee, updateEmployee, getEmployee, getEmployees } from '../services/employeeService';

const AddEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        employee_code: '',
        name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        date_of_joining: '',
        date_of_leaving: '',
        department: '',
        designation: '',
        employment_type: 'PERMANENT',
        gender: '',
        pan_number: '',
        aadhar_number: '',
        pf_number: '',
        esi_number: '',
        uan_number: '',
        pran_number: '',
        bank_account: '',
        bank_ifsc: '',
        bank_name: '',
        basic_salary: '',
        status: 'ACTIVE'
    });

    useEffect(() => {
        if (isEdit) {
            fetchEmployeeDetails();
        } else {
            generateNextCode();
        }
    }, [isEdit, id]);

    const generateNextCode = async () => {
        try {
            // Fetch a larger list to find the maximum employee code manually because backend sorting is ignored
            const response = await getEmployees({ limit: 1000 });
            const resData = response.data || response;
            const items = resData.items || resData.rows || (Array.isArray(resData) ? resData : []);
            
            if (items && items.length > 0) {
                let maxNum = 0;
                let maxPrefix = '';
                let maxPadding = 1;
                let foundNumeric = false;
                let lastFallback = items[0].employee_code;

                // Loop through all fetched employees to find the maximum numeric code
                for (const item of items) {
                    if (item.employee_code) {
                        const codeStr = String(item.employee_code);
                        const match = codeStr.match(/^(\D*)(\d+)$/);
                        if (match) {
                            foundNumeric = true;
                            const currentNum = parseInt(match[2], 10);
                            if (currentNum >= maxNum) {
                                maxNum = currentNum;
                                maxPrefix = match[1];
                                maxPadding = match[2].length;
                            }
                        }
                        lastFallback = codeStr;
                    }
                }

                if (foundNumeric) {
                    const nextNumber = maxNum + 1;
                    const paddedNumber = nextNumber.toString().padStart(maxPadding, '0');
                    setFormData(prev => ({ ...prev, employee_code: maxPrefix + paddedNumber }));
                } else {
                    // Fallback if no numeric ending is found in any code
                    setFormData(prev => ({ ...prev, employee_code: lastFallback + '2' }));
                }
            } else {
                // Default first code
                setFormData(prev => ({ ...prev, employee_code: '1' }));
            }
        } catch (error) {
            console.error('Failed to generate next code:', error);
            setFormData(prev => ({ ...prev, employee_code: '1' }));
        }
    };

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
                date_of_birth: data.date_of_birth ? data.date_of_birth.split('T')[0] : '',
                date_of_joining: data.date_of_joining ? data.date_of_joining.split('T')[0] : '',
                date_of_leaving: data.date_of_leaving ? data.date_of_leaving.split('T')[0] : '',
                department: data.department || '',
                designation: data.designation || '',
                employment_type: data.employment_type || 'PERMANENT',
                gender: data.gender || '',
                pan_number: data.pan_number || '',
                aadhar_number: data.aadhar_number || '',
                pf_number: data.pf_number || '',
                esi_number: data.esi_number || '',
                uan_number: data.uan_number || '',
                pran_number: data.pran_number || '',
                bank_account: data.bank_account || '',
                bank_ifsc: data.bank_ifsc || '',
                bank_name: data.bank_name || '',
                basic_salary: data.basic_salary || '',
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
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.employee_code?.trim()) newErrors.employee_code = 'Employee code is required.';
        if (!formData.name?.trim()) newErrors.name = 'Full name is required.';
        if (!formData.date_of_joining) newErrors.date_of_joining = 'Date of joining is required.';
        if (!formData.basic_salary || Number(formData.basic_salary) <= 0) newErrors.basic_salary = 'Valid basic salary is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
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

            <form onSubmit={handleSubmit} noValidate>
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
                                            className={`form-control form-control-sm shadow-none ${errors.employee_code ? 'is-invalid' : ''}`}
                                            name="employee_code"
                                            value={formData.employee_code}
                                            onChange={handleChange}
                                            placeholder="Generating..."
                                        />
                                        {errors.employee_code && <div className="invalid-feedback">{errors.employee_code}</div>}
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold text-muted">Full Name <span className="text-danger">*</span></label>
                                        <input 
                                            type="text" 
                                            className={`form-control form-control-sm shadow-none ${errors.name ? 'is-invalid' : ''}`}
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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
                                        <label className="form-label small fw-bold text-muted">Gender</label>
                                        <select 
                                            className="form-select form-select-sm shadow-none text-dark" 
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold text-muted">Date of Birth</label>
                                        <input 
                                            type="date" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="date_of_birth"
                                            value={formData.date_of_birth}
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
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Employment Information */}
                    <div className="col-md-12">
                        <div className="card border-0 shadow-sm overflow-hidden">
                            <div className="card-header bg-white py-3 border-0">
                                <h6 className="fw-bold mb-0 text-primary">Employment Information</h6>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold text-muted">Date of Joining <span className="text-danger">*</span></label>
                                        <input 
                                            type="date" 
                                            className={`form-control form-control-sm shadow-none ${errors.date_of_joining ? 'is-invalid' : ''}`}
                                            name="date_of_joining"
                                            value={formData.date_of_joining}
                                            onChange={handleChange}
                                        />
                                        {errors.date_of_joining && <div className="invalid-feedback">{errors.date_of_joining}</div>}
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold text-muted">Date of Leaving</label>
                                        <input 
                                            type="date" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="date_of_leaving"
                                            value={formData.date_of_leaving}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold text-muted">Employment Type</label>
                                        <select 
                                            className="form-select form-select-sm shadow-none text-dark" 
                                            name="employment_type"
                                            value={formData.employment_type}
                                            onChange={handleChange}
                                        >
                                            <option value="PERMANENT">Permanent</option>
                                            <option value="CONTRACT">Contract</option>
                                            <option value="INTERN">Intern</option>
                                            <option value="PROBATION">Probation</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold text-muted">Basic Salary (Monthly) <span className="text-danger">*</span></label>
                                        <div className="input-group input-group-sm">
                                            <span className="input-group-text bg-light pe-2">₹</span>
                                            <input 
                                                type="number" 
                                                className={`form-control shadow-none ${errors.basic_salary ? 'is-invalid' : ''}`}
                                                name="basic_salary"
                                                value={formData.basic_salary}
                                                onChange={handleChange}
                                            />
                                            {errors.basic_salary && <div className="invalid-feedback">{errors.basic_salary}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-3">
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

                    {/* Statutory Information */}
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm overflow-hidden h-100">
                            <div className="card-header bg-white py-3 border-0">
                                <h6 className="fw-bold mb-0 text-primary">Statutory Details</h6>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted">PAN Number</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="pan_number"
                                            value={formData.pan_number}
                                            onChange={handleChange}
                                            maxLength="10"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted">Aadhar Number</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="aadhar_number"
                                            value={formData.aadhar_number}
                                            onChange={handleChange}
                                            maxLength="12"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted">PF Number</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="pf_number"
                                            value={formData.pf_number}
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
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted">UAN Number</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="uan_number"
                                            value={formData.uan_number}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted">PRAN Number</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="pran_number"
                                            value={formData.pran_number}
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
                                    <div className="col-md-12">
                                        <label className="form-label small fw-bold text-muted">Account Number</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="bank_account"
                                            value={formData.bank_account}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label small fw-bold text-muted">IFSC Code</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm shadow-none" 
                                            name="bank_ifsc"
                                            value={formData.bank_ifsc}
                                            onChange={handleChange}
                                        />
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

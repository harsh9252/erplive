import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCompanyById, getBusinessNatures, getCompanies } from '../services/companyService';
import { toast } from 'react-toastify';

const CompanyDetails = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCompanyActive, setIsCompanyActive] = useState(false);
    const [businessTypes, setBusinessTypes] = useState([
        { id: 1, name: 'Sole Proprietorship' },
        { id: 2, name: 'Partnership' },
        { id: 3, name: 'Private Limited' },
        { id: 4, name: 'Public Limited' },
        { id: 5, name: 'LLP' },
        { id: 6, name: 'HUF' },
        { id: 7, name: 'Trust' },
        { id: 8, name: 'NGO' },
    ]);

    useEffect(() => {
        if (id) {
            fetchCompanyDetails();
        }
    }, [id]);

    useEffect(() => {
        const fetchNatures = async () => {
            try {
                const response = await getBusinessNatures();
                if (response && response.success && Array.isArray(response.data)) {
                    setBusinessTypes(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchNatures();
    }, []);

    const fetchCompanyDetails = async () => {
        try {
            setLoading(true);
            const response = await getCompanyById(id);
            if (response && response.data) {
                setCompany(response.data);

                // Fetch accessible companies list to get the real is_active status
                try {
                    const listResponse = await getCompanies();
                    if (listResponse && Array.isArray(listResponse.data)) {
                        const matched = listResponse.data.find(c => String(c.id) === String(id));
                        if (matched) {
                            setIsCompanyActive(matched.is_active === true || matched.is_active === 1 || String(matched.is_active).toLowerCase() === 'true');
                        } else {
                            // Fallback to response status if not found in list
                            const statusActive = response.data.status === 'ACTIVE' || response.data.status === 'Active';
                            setIsCompanyActive(statusActive);
                        }
                    } else {
                        const statusActive = response.data.status === 'ACTIVE' || response.data.status === 'Active';
                        setIsCompanyActive(statusActive);
                    }
                } catch (listErr) {
                    console.error('Error fetching companies list:', listErr);
                    const statusActive = response.data.status === 'ACTIVE' || response.data.status === 'Active';
                    setIsCompanyActive(statusActive);
                }
            } else {
                toast.error('Company not found');
            }
        } catch (error) {
            console.error('Error fetching company details:', error);
            toast.error(error.message || 'Failed to fetch company details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!company) {
        return (
            <div className="text-center py-5">
                <h4>Company not found</h4>
                <Link to="/companies" className="btn btn-primary mt-3">Back to Companies</Link>
            </div>
        );
    }

    const isActive = isCompanyActive;

    return (
        <>
            <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
                <div>
                    <h6>
                        <Link to="/companies">
                            <i className="isax isax-arrow-left fs-16 me-2"></i>Companies
                        </Link>
                    </h6>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <Link to="/companies?edit=true" className="btn btn-primary d-inline-flex align-items-center">
                        <i className="isax isax-edit-2 me-1"></i>Edit Company
                    </Link>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12">
                    <div className="card bg-light customer-details-info position-relative overflow-hidden">
                        <div className="card-body position-relative z-1">
                            <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-3">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <div className="avatar avatar-xxl rounded-circle flex-shrink-0">
                                        <img
                                            src={company.logo || "/assets/img/icons/company-01.svg"}
                                            alt="company"
                                            className="img-fluid rounded-circle border border-white border-2"
                                            style={{ backgroundColor: '#fff', padding: '5px' }}
                                        />
                                    </div>
                                    <div className="" style={{ minWidth: '150px', maxWidth: '100%', whiteSpace: 'normal', wordBreak: 'break-all' }}>
                                        <h6 className="mb-2" style={{ whiteSpace: 'normal', wordBreak: 'break-all' }}>
                                            {company.name}
                                            {isActive && (
                                                <img src="/assets/img/icons/confirme.svg" alt="confirmed" className="ms-1" />
                                            )}
                                        </h6>
                                        <p className="fs-14 fw-regular">
                                            <i className="isax isax-location fs-14 me-1 text-gray-9"></i>
                                            {company.address ? `${company.address}, ${company.city}, ${company.state} - ${company.pincode}` : 'No address provided'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card border-0 shadow shadow-none mb-0 bg-white">
                                <div className="card-body border-0 shadow shadow-none">
                                    <ul className="d-flex justify-content-between align-items-center flex-wrap gap-2 p-0 m-0 list-unstyled">
                                        <li>
                                            <h6 className="mb-1 fs-14 fw-semibold">
                                                <i className="isax isax-sms fs-14 me-2"></i>Email Address
                                            </h6>
                                            <p style={{ wordBreak: 'break-all', whiteSpace: 'normal' }}>{company.email || 'N/A'}</p>
                                        </li>
                                        <li>
                                            <h6 className="mb-1 fs-14 fw-semibold">
                                                <i className="isax isax-call fs-14 me-2"></i>Phone
                                            </h6>
                                            <p>{company.phone || 'N/A'}</p>
                                        </li>
                                        <li>
                                            <h6 className="mb-1 fs-14 fw-semibold">
                                                <i className="isax isax-status fs-14 me-2"></i>Status
                                            </h6>
                                            <p>
                                                <span className={`badge ${isActive ? 'badge-soft-success' : 'badge-soft-danger'}`}>
                                                    {isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <img
                            src="/assets/img/icons/elements-01.svg"
                            alt="elements-01"
                            className="img-fluid customer-details-bg"
                        />
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Business Information</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <h6 className="fs-14 fw-semibold mb-1">Legal Name</h6>
                                    <p>{company.legal_name || 'N/A'}</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h6 className="fs-14 fw-semibold mb-1">GSTIN</h6>
                                    <p>{company.gstin || 'N/A'}</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h6 className="fs-14 fw-semibold mb-1">PAN</h6>
                                    <p>{company.pan || 'N/A'}</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h6 className="fs-14 fw-semibold mb-1">Business Nature</h6>
                                    <p>{businessTypes.find(t => t.id === Number(company.business_nature_id))?.name || company.business_nature || 'N/A'}</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h6 className="fs-14 fw-semibold mb-1">TAN</h6>
                                    <p>{company.tan || 'N/A'}</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h6 className="fs-14 fw-semibold mb-1">CIN</h6>
                                    <p>{company.cin || 'N/A'}</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h6 className="fs-14 fw-semibold mb-1">Currency</h6>
                                    <p>{company.currency || 'INR'}</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h6 className="fs-14 fw-semibold mb-1">Financial Year Start</h6>
                                    <p>{company.financial_year_start ? `Month ${company.financial_year_start}` : 'April'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyDetails;

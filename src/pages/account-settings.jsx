import { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SettingsSidebar from '../components/SettingsSidebar';


const AccountSettings = () => {
  const currentUser = getCurrentUser();
  
  // Debug log
  useEffect(() => {
    console.log('AccountSettings component mounted');
    return () => console.log('AccountSettings component unmounted');
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    country: '',
    state: '',
    city: '',
    postalCode: ''
  });

  useEffect(() => {
    // Load user data when component mounts
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        mobile: currentUser.mobile || '',
        gender: currentUser.gender || '',
        dateOfBirth: currentUser.dateOfBirth || '',
        address: currentUser.address || '',
        country: currentUser.country || 'India',
        state: currentUser.state || '',
        city: currentUser.city || '',
        postalCode: currentUser.postalCode || ''
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - run only once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to update user profile
    toast.success('Profile updated successfully!');
    console.log('Updated profile:', formData);
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-12">
          <div className="row settings-wrapper d-flex">
            <div className="col-xl-3 col-lg-4">
              <SettingsSidebar activeItem="/account-settings" />
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="mb-3">
                <div className="pb-3 border-bottom mb-3">
                  <h6 className="mb-0">Account Settings</h6>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                    <i className="isax isax-info-circle fs-14"></i>
                  </span>
                  <h6 className="fs-16 fw-semibold mb-0">General Information</h6>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                  <div className="mb-3">
                    <span className="text-gray-9 fw-bold mb-2 d-flex">
                      Profile Image<span className="text-danger ms-1">*</span>
                    </span>
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xxl border border-dashed bg-light me-3 flex-shrink-0">
                        <div className="position-relative d-flex align-items-center">
                          <img
                            src="/assets/img/users/user-01.jpg"
                            className="avatar avatar-xl "
                            alt="User Img"
                          />
                          <Link href="#"
                            className="rounded-trash trash-top d-flex align-items-center justify-content-center"
                          >
                            <i className="isax isax-trash"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="d-inline-flex flex-column align-items-start">
                        <div className="drag-upload-btn btn btn-sm btn-primary position-relative mb-2">
                          <i className="isax isax-image me-1"></i>Upload Image
                          <input type="file" className="form-control image-sign" multiple="" />
                        </div>
                        <span className="text-gray-9 fs-12">
                          JPG or PNG format, not exceeding 5MB.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom mb-3 pb-2">
                    <div className="row gx-3">
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Name <span className="text-danger">*</span>
                          </label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <input 
                            type="email" 
                            className="form-control" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Mobile Number <span className="text-danger">*</span>
                          </label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            placeholder="Enter mobile number"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Gender</label>
                          <select 
                            className="form-select"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option>Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">DOB</label>
                          <div className="input-group position-relative mb-3">
                            <input
                              type="text"
                              className="form-control datetimepicker rounded-end"
                              placeholder="25 Mar 2025"
                            />
                            <span className="input-icon-addon fs-16 text-gray-9">
                              <i className="isax isax-calendar-2"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom mb-3">
                    <div className="d-flex align-items-center mb-3">
                      <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                        <i className="isax isax-info-circle fs-14"></i>
                      </span>
                      <h6 className="fs-16 fw-semibold mb-0">Address Information</h6>
                    </div>
                    <div className="row gx-3">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter your address"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Country</label>
                          <select 
                            className="form-select"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                          >
                            <option value="">Select</option>
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="UK">UK</option>
                            <option value="Germany">Germany</option>
                            <option>France</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">State</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="Enter state"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            City<span className="text-danger ms-1">*</span>
                          </label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Enter city"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Postal Code<span className="text-danger ms-1">*</span>
                          </label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="Enter postal code"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <button type="button" className="btn btn-outline-white">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;

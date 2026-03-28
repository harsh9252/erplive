import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { Link } from 'react-router-dom';

const PlansBillings = () => {
  // Debug log
  useEffect(() => {
    console.log('PlansBillings component mounted');
    return () => console.log('PlansBillings component unmounted');
  }, []);

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-12">
          <div className="row settings-wrapper d-flex">
            <div className="col-xl-3 col-lg-4">
              <SettingsSidebar activeItem="/plans-billings" />
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="mb-3">
                <div className="pb-3 border-bottom mb-3">
                  <h6 className="mb-0">Plans & Billings</h6>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                    <i className="isax isax-info-circle fs-14"></i>
                  </span>
                  <h6 className="fs-16 fw-semibold mb-0">Current Plan Information</h6>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                  <div className="mb-3 border-bottom">
                    <div className="card shadow-none bg-light">
                      <div className="card-body">
                        <div className="mb-0">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="">
                              <h6 className="fw-bold mb-2 fs-14">Basic Plan</h6>
                              <div className="progress-container">
                                <span className="fs-14">20 Days Left</span>
                              </div>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="btn btn-primary btn-md d-inline-flex align-items-center"
                              >
                                <i className="isax isax-crown me-1"></i>Upgrade
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-0">
                    <div className="d-flex align-items-center mb-3">
                      <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                        <i className="isax isax-card fs-14"></i>
                      </span>
                      <h6 className="fs-16 fw-semibold mb-0">Saved Cards</h6>
                    </div>
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="card shadow-none">
                          <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                              <div>
                                <p className="mb-1">James Peterson</p>
                                <h6 className="fs-14 fw-medium mb-1">Visa •••• 1568</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="badge badge-success bg-success">Default</span>
                              <div className="d-flex align-items-center">
                                <Link to="#" className="avatar text-dark avatar-md border rounded-circle me-2 bg-light">
                                  <i className="isax isax-edit text-gray"></i>
                                </Link>
                                <Link to="#" className="avatar text-dark avatar-md border rounded-circle bg-light">
                                  <i className="isax isax-trash text-gray"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default PlansBillings;

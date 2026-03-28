import React from 'react';

const Pricing = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="mb-3 border-bottom pb-3">
            <h6 className="mb-0">Pricing</h6>
          </div>
          <div className="card mb-0">
            <div className="card-body pb-0">
              <div>
                <div className="text-center">
                  <div className="d-inline-flex py-2 px-3 rounded-pill bg-light justify-content-center align-items-center mb-3">
                    <p className="mb-0 me-2">Monthly</p>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked />
                    </div>
                    <p>Yearly</p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-xl-3 col-lg-6 col-sm-12">
                    <div className="card border rounded mb-3">
                      <div className="card-body">
                        <div className="pricing-content mb-3">
                          <div className="mb-3">
                            <h6 className="fs-14 mb-0">Basic</h6>
                          </div>
                          <div className="d-flex align-items-center mb-2 flex-wrap gap-2">
                            <h3 className="d-flex align-items-center mb-0">
                              $99<span className="fs-14 fw-normal text-gray-9 me-2">/month</span>
                            </h3>
                            <span className="badge badge-sm bg-info text-white border px-1 rounded text-truncate">
                              10 Users
                            </span>
                          </div>
                          <p className="mb-3 text-truncate line-clamb-2">
                            Best for Freelancers & small businesses needs simple invoicing.
                          </p>
                          <Link
                            href="#"
                            className="d-flex align-items-center justify-content-center btn border taxt-gray-100 rounded w-100 mb-3"
                          >
                            <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                          </Link>
                          <div className="price-hdr">
                            <h6 className="fs-10 fw-semibold text-gray-9 me-2 ms-2 mb-0">
                              FEATURES
                            </h6>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>1 Business
                              Account + 1 User
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              14+ Invoice templates
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Collect Online Payments
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              40+ Reports & Insights
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Variants
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Add custom fields
                            </span>
                            <span className="text-dark d-flex align-items-center">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Convert documents
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-sm-12">
                    <div className="card border rounded mb-3">
                      <div className="card-body">
                        <div className="pricing-content mb-3">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h6 className="fs-14 mb-0">Standard</h6>
                            <span className="badge badge-sm bg-pink text-white">Most Popular</span>
                          </div>
                          <div className="d-flex align-items-center mb-2 flex-wrap gap-2">
                            <h3 className="d-inline-flex align-items-center mb-0">
                              $199<span className="fs-14 fw-normal text-gray-9 me-2">/month</span>
                            </h3>
                            <span className="badge badge-sm bg-info px-1 text-white border rounded text-truncate">
                              50 Users
                            </span>
                          </div>
                          <p className="mb-3 text-truncate line-clamb-2">
                            Growing businesses managing recurring invoices & reports.
                          </p>
                          <Link
                            href="#"
                            className="d-flex align-items-center justify-content-center btn bg-primary border text-white rounded w-100 mb-3"
                          >
                            <i className="isax isax-bill me-1"></i> Current Plan
                          </Link>
                          <div className="price-hdr">
                            <h6 className="fs-10 fw-semibold text-gray-9 me-2 ms-2 mb-0">
                              FEATURES
                            </h6>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>1 Business
                              Account + 1 User
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Bulk downloads
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Multiple Price lists
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              User Activity
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Bulk edits
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Multiple Warehouses
                            </span>
                            <span className="text-dark d-flex align-items-center">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Online Store
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-sm-12">
                    <div className="card border rounded mb-3">
                      <div className="card-body">
                        <div className="pricing-content mb-3">
                          <div className="mb-3">
                            <h6 className="fs-14 mb-0">Business</h6>
                          </div>
                          <div className="d-flex align-items-center mb-2 flex-wrap gap-2">
                            <h3 className="d-inline-flex align-items-center text-nowrap mb-0">
                              $299<span className="fs-14 fw-normal text-gray-9 me-2">/month</span>
                            </h3>
                            <span className="badge badge-sm px-1 bg-info text-white border rounded">
                              75 Users
                            </span>
                          </div>
                          <p className="mb-3 text-truncate line-clamb-2">
                            Best for Large sales teams requiring automation & integrations.
                          </p>
                          <Link
                            href="#"
                            className="d-flex align-items-center justify-content-center btn border taxt-gray-100 rounded w-100 mb-3"
                          >
                            <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                          </Link>
                          <div className="price-hdr">
                            <h6 className="fs-10 fw-semibold text-gray-9 me-2 ms-2 mb-0">
                              FEATURES
                            </h6>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              POS Billing
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Batch & Expiry
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Serial No/ IMEI Tracking
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Subscription/ Recurring
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Product Grouping
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Additional CESS
                            </span>
                            <span className="text-dark d-flex align-items-center">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Bank Reconciliation
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-sm-12">
                    <div className="card border rounded mb-3">
                      <div className="card-body">
                        <div className="pricing-content mb-3">
                          <div className="mb-3">
                            <h6 className="fs-14 mb-0">Enterprice</h6>
                          </div>
                          <div className="d-flex align-items-center mb-2 flex-wrap gap-2">
                            <h3 className="d-inline-flex align-items-center mb-0">
                              $399<span className="fs-14 fw-normal text-gray-9 me-2">/month</span>
                            </h3>
                            <span className="badge badge-sm px-1 bg-info text-white border rounded">
                              Unlimited
                            </span>
                          </div>
                          <p className="mb-3 text-truncate line-clamb-2">
                            Enterprises with AI insights & advanced workflows.
                          </p>
                          <Link
                            href="#"
                            className="d-flex align-items-center justify-content-center btn border taxt-gray-100 rounded w-100 mb-3"
                          >
                            <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                          </Link>
                          <div className="price-hdr">
                            <h6 className="fs-10 fw-semibold text-gray-9 me-2 ms-2 mb-0">
                              FEATURES
                            </h6>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Add Custom Features
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Custom Column Linking
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Multi Businesses / Branches
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Online Store
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Shiprocket Integration
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Multiple Users
                            </span>
                            <span className="text-dark d-flex align-items-center">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Multiple Warehouses
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;

import React from 'react';

const CustomerTransactions = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Transactions</h6>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <Link href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link>
              </div>
            </div>
            <Link
              className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#customcanvas"
            >
              <i className="isax isax-filter me-1"></i>Filter
            </Link>
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown">
              <Link
                href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="isax isax-sort me-1"></i>Sort By :{' '}
                <span className="fw-normal ms-1">Latest</span>
              </Link>
              <ul className="dropdown-menu  dropdown-menu-end">
                <li>
                  <Link href="#" className="dropdown-item">
                    Latest
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-item">
                    Oldest
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="align-items-center gap-2 flex-wrap filter-info mt-3">
          <h6 className="fs-13 fw-semibold">Filters</h6>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              1
            </span>
            Type Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              1
            </span>
            Status Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <Link href="#" className="link-danger fw-medium text-decoration-underline ms-md-1">
            Clear All
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead className="thead-light">
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment Mode</th>
              <th className="no-sort">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-dark">Wallet Topup</td>
              <td className="text-dark">$300</td>
              <td>22 Feb 2025</td>
              <td>Cash</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Completed
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-dark">Purchase</td>
              <td className="text-dark">$150</td>
              <td>07 Feb 2025</td>
              <td>Cheque</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled
                  <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-dark">Refund</td>
              <td className="text-dark">$350</td>
              <td>30 Jan 2025</td>
              <td>Bank Transfer</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Completed
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-dark">Wallet Topup</td>
              <td className="text-dark">$500</td>
              <td>17 Jan 2025</td>
              <td>Paypal</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled
                  <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-dark">Purchase</td>
              <td className="text-dark">$2000</td>
              <td>04 Jan 2025</td>
              <td>Stripe</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Completed
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-dark">Refund</td>
              <td className="text-dark">$100</td>
              <td>09 Dec 2024</td>
              <td>Cash</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled
                  <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-dark">Wallet Topup</td>
              <td className="text-dark">$550</td>
              <td>02 Dec 2024</td>
              <td>Cheque</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Completed
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-dark">Purchase</td>
              <td className="text-dark">$700</td>
              <td>15 Nov 2024</td>
              <td>Bank Transfer</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled
                  <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-dark">Refund</td>
              <td className="text-dark">$2500</td>
              <td>30 Nov 2024</td>
              <td>Paypal</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Completed
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-dark">Wallet Topup</td>
              <td className="text-dark">$1000</td>
              <td>12 Oct 2024</td>
              <td>Stripe</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled
                  <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-dark">Purchase</td>
              <td className="text-dark">$200</td>
              <td>05 Oct 2024</td>
              <td>Cash</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Completed
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-dark">Refund</td>
              <td className="text-dark">$350</td>
              <td>09 Sep 2024</td>
              <td>Cheque</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled
                  <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-dark">Wallet Topup</td>
              <td className="text-dark">$500</td>
              <td>02 Sep 2024</td>
              <td>Bank Transfer</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Completed
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-dark">Purchase</td>
              <td className="text-dark">$800</td>
              <td>07 Aug 2024</td>
              <td>Paypal</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled
                  <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id="customcanvas">
        <div className="offcanvas-header d-block pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between pb-3">
            <h6 className="offcanvas-title">Filter</h6>
            <button
              type="button"
              className="btn-close btn-close-modal custom-btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
        <div className="offcanvas-body pt-3">
          <form action="#">
            <div className="mb-3">
              <label className="form-label">Type</label>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <div className="mb-3">
                    <div className="input-icon-start position-relative">
                      <span className="input-icon-addon fs-12">
                        <i className="isax isax-search-normal"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <ul className="mb-3">
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Wallet Topup
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Purchase
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Refund
                      </label>
                    </li>
                  </ul>
                  <div className="row g-2">
                    <div className="col-6">
                      <Link href="#" className="btn btn-outline-white w-100" id="close-filter">
                        Cancel
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link href="#" className="btn btn-primary w-100">
                        Select
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="dateRangePicker" className="form-label">
                Date Range
              </label>
              <div className="input-group position-relative">
                <input type="text" className="form-control date-range bookingrange rounded-end" />
                <span className="input-icon-addon fs-16 text-gray-9">
                  <i className="isax isax-calendar-2"></i>
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <div className="filter-range">
                    <input type="text" id="range_03" />
                    <p>
                      Range : <span className="text-gray-9">Range : $200 - $5695</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Payment Mode</label>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <ul className="mb-3">
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Cash
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Cheque
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Bank
                        Transfer
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Paypal
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Stripe
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <ul className="mb-3">
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-success me-1"></i>Completed
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-danger me-1"></i>Canceled
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="offcanvas-footer">
              <div className="row g-2">
                <div className="col-6">
                  <Link href="#" className="btn btn-outline-white w-100">
                    Reset
                  </Link>
                </div>
                <div className="col-6">
                  <button
                    data-bs-dismiss="offcanvas"
                    className="btn btn-primary w-100"
                    id="filter-submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerTransactions;

import React from 'react';

const AccountStatement = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Account Statement Report</h6>
        </div>
        <div className="my-xl-auto">
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>
        </div>
      </div>
      <div className="border-bottom mb-3">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <span className="p-2 bg-primary d-flex align-items-center justify-content-center rounded text-white me-2">
                    <i className="isax isax-dollar-circle fs-24"></i>
                  </span>
                  <div className="mb-0">
                    <p className="mb-1">Total Credits</p>
                    <div className="d-flex align-items-center flex-wrap gap-2">
                      <h6 className="fs-16 fw-semibold mb-0">$2,000,000</h6>
                      <span className="badge badge-soft-success">
                        +5.62%<i className="isax isax-arrow-up-15"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <span className="p-2 bg-success d-flex align-items-center justify-content-center rounded text-white me-2">
                    <i className="isax isax-bank fs-24"></i>
                  </span>
                  <div className="mb-0">
                    <p className="mb-1">Total Debits</p>
                    <div className="d-flex align-items-center flex-wrap gap-2">
                      <h6 className="fs-16 fw-semibold mb-0">$1,200,000</h6>
                      <span className="badge badge-soft-success">
                        +11.4%<i className="isax isax-arrow-up-15"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <span className="p-2 bg-warning d-flex align-items-center justify-content-center rounded text-white me-2">
                    <i className="isax isax-wallet-3 fs-24"></i>
                  </span>
                  <div className="mb-0">
                    <p className="mb-1"> Net Cash Flow</p>
                    <div className="d-flex align-items-center flex-wrap gap-2">
                      <h6 className="fs-16 fw-semibold mb-0">$500,000</h6>
                      <span className="badge badge-soft-success">
                        +8.12%<i className="isax isax-arrow-up-15"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <span className="p-2 bg-danger d-flex align-items-center justify-content-center rounded text-white me-2">
                    <i className="isax isax-money-3 fs-24"></i>
                  </span>
                  <div className="mb-0">
                    <p className="mb-1">Balance</p>
                    <div className="d-flex align-items-center flex-wrap gap-2">
                      <h6 className="fs-16 fw-semibold mb-0">$300,000</h6>
                      <span className="badge badge-soft-success">
                        +7.45%<i className="isax isax-arrow-up-15"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <Link href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link>
              </div>
            </div>
            <div id="reportrange" className="reportrange-picker d-flex align-items-center">
              <i className="isax isax-calendar text-gray-5 fs-14 me-1"></i>
              <span className="reportrange-picker-field">16 Apr 25 - 16 Apr 25</span>
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
                data-bs-auto-close="outside"
              >
                <i className="isax isax-grid-3 me-1"></i>Column
              </Link>
              <ul className="dropdown-menu  dropdown-menu-lg">
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" defaultChecked />
                    <span>Reference Number</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" defaultChecked />
                    <span>Category</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" defaultChecked />
                    <span>Amount</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" />
                    <span>Transaction Type</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" defaultChecked />
                    <span>Balance</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="align-items-center gap-2 flex-wrap filter-info mt-3">
          <h6 className="fs-13 fw-semibold">Filters</h6>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              6
            </span>
            Account Holders Selected
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
              <th className="no-sort">
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" id="select-all" />
                </div>
              </th>
              <th>Reference Number</th>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Transaction Type</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">REF0013</Link>
              </td>
              <td>22 Feb 2025</td>
              <td>Sale</td>
              <td>Sale of laptops</td>
              <td>$15,000</td>
              <td>
                <span className="badge badge-soft-success">
                  <span className="badge-dot bg-success"></span>Credit
                </span>
              </td>
              <td>$10,000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">REF0012</Link>
              </td>
              <td>07 Feb 2025</td>
              <td>Refund</td>
              <td>Customer Refund</td>
              <td>$22,500</td>
              <td>
                <span className="badge badge-soft-danger">
                  <span className="badge-dot bg-danger"></span>Debit
                </span>
              </td>
              <td>$15,000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">REF0011</Link>
              </td>
              <td>30 Jan 2025</td>
              <td>Purchase</td>
              <td>Office Supplies Bought</td>
              <td>$30,000</td>
              <td>
                <span className="badge badge-soft-success">
                  <span className="badge-dot bg-success"></span>Credit
                </span>
              </td>
              <td>$20,000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">REF0010</Link>
              </td>
              <td>17 Jan 2025</td>
              <td>Income</td>
              <td>Salary Received</td>
              <td>$12,000</td>
              <td>
                <span className="badge badge-soft-danger">
                  <span className="badge-dot bg-danger"></span>Debit
                </span>
              </td>
              <td>$9,000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">REF0009</Link>
              </td>
              <td>04 Jan 2025</td>
              <td>Expense</td>
              <td>Electricity Bill Paid</td>
              <td>$18,000</td>
              <td>
                <span className="badge badge-soft-success">
                  <span className="badge-dot bg-success"></span>Credit
                </span>
              </td>
              <td>$12,000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">REF0008</Link>
              </td>
              <td>09 Dec 2024</td>
              <td>Sale</td>
              <td>Service Fee Collected</td>
              <td>$25,000</td>
              <td>
                <span className="badge badge-soft-danger">
                  <span className="badge-dot bg-danger"></span>Debit
                </span>
              </td>
              <td>$17,000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">REF0007</Link>
              </td>
              <td>02 Dec 2024</td>
              <td>Refund</td>
              <td>Customer Refund</td>
              <td>$35,000</td>
              <td>
                <span className="badge badge-soft-success">
                  <span className="badge-dot bg-success"></span>Credit
                </span>
              </td>
              <td>$23,000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">REF0006</Link>
              </td>
              <td>15 Nov 2024</td>
              <td>Purchase</td>
              <td>Equipment Purchase</td>
              <td>$40,000</td>
              <td>
                <span className="badge badge-soft-danger">
                  <span className="badge-dot bg-danger"></span>Debit
                </span>
              </td>
              <td>$25,000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">REF0005</Link>
              </td>
              <td>30 Nov 2024</td>
              <td>Income</td>
              <td>Freelance Payment</td>
              <td>$27,500</td>
              <td>
                <span className="badge badge-soft-success">
                  <span className="badge-dot bg-success"></span>Credit
                </span>
              </td>
              <td>$18,000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">REF0004</Link>
              </td>
              <td>12 Oct 2024</td>
              <td>Expense</td>
              <td>Office Rent Paid</td>
              <td>$20,000</td>
              <td>
                <span className="badge badge-soft-danger">
                  <span className="badge-dot bg-danger"></span>Debit
                </span>
              </td>
              <td>$13,000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">REF0003</Link>
              </td>
              <td>05 Oct 2024</td>
              <td>Sale</td>
              <td>Subscription Sale</td>
              <td>$45,000</td>
              <td>
                <span className="badge badge-soft-success">
                  <span className="badge-dot bg-success"></span>Credit
                </span>
              </td>
              <td>$27,000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">REF0002</Link>
              </td>
              <td>09 Sep 2024</td>
              <td>Refund</td>
              <td>Refund Issued</td>
              <td>$37,500</td>
              <td>
                <span className="badge badge-soft-danger">
                  <span className="badge-dot bg-danger"></span>Debit
                </span>
              </td>
              <td>$23,500</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">REF0001</Link>
              </td>
              <td>02 Sep 2024</td>
              <td>Purchase</td>
              <td>Inventory Restock</td>
              <td>$38,000</td>
              <td>
                <span className="badge badge-soft-success">
                  <span className="badge-dot bg-success"></span>Credit
                </span>
              </td>
              <td>$24,000</td>
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
              <label className="form-label">Reference Number</label>
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
                  <ul>
                    <li className="d-flex align-items-center justify-content-between mb-3">
                      <label className="d-inline-flex align-items-center text-gray-9">
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" />{' '}
                        Select All
                      </label>
                      <Link href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> REF0001
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> REF0002
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> REF0003
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> REF0004
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> REF0005
                      </label>
                    </li>
                  </ul>
                </div>
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

export default AccountStatement;

import React from 'react';
import { Link } from 'react-router-dom';

const MoneyTransfer = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Money Transfer</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>
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
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown">
              <Link
                href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center fw-medium"
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
            <div className="dropdown">
              <Link
                href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                <i className="isax isax-grid-3 me-1"></i>Column
              </Link>
              <ul className="dropdown-menu  dropdown-menu">
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Date</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Reference Number</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>From Account No</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>To Account No</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Amount</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" />
                    <span>Status</span>
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
              5
            </span>
            Account Holders Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
            </span>
            $10,000 - $25,500
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
              <th className="">Date</th>
              <th className="no-sort">Reference Number</th>
              <th className="no-sort">From Account No</th>
              <th className="no-sort">To Account No</th>
              <th>Amount</th>
              <th className="no-sort">Status</th>
              <th className="no-sort"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td></td>
              22 Feb 2025
              <td></td>
              MT17420
              <td></td>
              3298784309485
              <td>1597534682597</td>
              <td className="text-dark">$200</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-soft-success badge-sm d-inline-flex align-items-center"></span>
                  Active <i className="isax isax-tick-circle4 ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td></td>
              07 Feb 2025
              <td></td>
              MT16512
              <td></td>
              5475878970090
              <td>3214569873214</td>
              <td className="text-dark">$50</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-soft-danger badge-sm d-inline-flex align-items-center"></span>
                  Inactive <i className="isax isax-close-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td></td>
              30 Jan 2025
              <td></td>
              MT16418
              <td></td>
              3255465758698
              <td>3692581473692</td>
              <td className="text-dark">$800</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-soft-success badge-sm d-inline-flex align-items-center"></span>
                  Active <i className="isax isax-tick-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td></td>
              25 Jan 2025
              <td></td>
              MT16410
              <td></td>
              4255465758697
              <td>5692581473696</td>
              <td className="text-dark">$100</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-soft-danger badge-sm d-inline-flex align-items-center"></span>
                  Inactive <i className="isax isax-close-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td></td>
              17 Jan 2025
              <td></td>
              MT16317
              <td></td>
              4353689870544
              <td>6543217896543</td>
              <td className="text-dark">$100</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-soft-success badge-sm d-inline-flex align-items-center"></span>
                  Active <i className="isax isax-tick-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td></td>
              04 Jan 2025
              <td></td>
              MT15294
              <td></td>
              4324356677889
              <td>3298784309485</td>
              <td className="text-dark">$1000</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-soft-danger badge-sm d-inline-flex align-items-center"></span>
                  Inactive <i className="isax isax-close-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td></td>
              09 Dec 2024
              <td></td>
              MT15420
              <td></td>
              2343547586900
              <td>4567891234567</td>
              <td className="text-dark">$1200</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-success d-inline-flex align-items-center"></span>
                  Active <i className="isax isax-tick-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td></td>
              02 Dec 2024
              <td></td>
              MT15275
              <td></td>
              3354456565687
              <td>9876543210123</td>
              <td className="text-dark">$500</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-soft-danger badge-sm d-inline-flex align-items-center"></span>
                  Inactive <i className="isax isax-close-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td></td>
              15 Nov 2024
              <td></td>
              MT14405
              <td></td>
              3453647664889
              <td>3453647664935</td>
              <td className="text-dark">$600</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-success d-inline-flex align-items-center"></span>
                  Active <i className="isax isax-tick-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td></td>
              30 Nov 2024
              <td></td>
              MT14754
              <td></td>
              9876543210123
              <td>3354456565687</td>
              <td className="text-dark">$450</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-soft-danger badge-sm d-inline-flex align-items-center"></span>
                  Inactive <i className="isax isax-close-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-09.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Charlotte Brown</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              6543217896543
              <td></td>
              Savings account
              <td>Account that allows individuals to save money</td>
              <td className="text-dark">$300</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-success d-inline-flex align-items-center"></span>
                  Active <i className="isax isax-tick-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Money Transfer</h6>
              <p className="mb-3">Are you sure, you want to delete Money Transfer?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/money-transfer" className="btn btn-primary">
                  Yes, Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoneyTransfer;

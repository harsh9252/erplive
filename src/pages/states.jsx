import React from 'react';
import { Link } from 'react-router-dom';

const States = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>State</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>
          <div>
            <Link href="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_modal"
            >
              <i className="isax isax-add-circle5 me-1"></i>New State
            </Link>
          </div>
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
            <div className="dropdown me-2">
              <Link href="#"
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
              <th className="no-sort">Country Code</th>
              <th className="no-sort">Country</th>
              <th className="no-sort">State </th>
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
              <td>US</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/us.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">USA</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>California</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <td>CA</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/ca.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Canada</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Ontario</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <td>UK</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/sh.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">UK</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>England</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <td>DE</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/de.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Germany</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Bavaria</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <td>FR</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/fr.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">France</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Le-de-France</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <td>AR</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/ar.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Argentina</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Buenos Aires</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <td>IN</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/in.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">India</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Maharashtra</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <td>IT</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/it.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Italy</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Lombardy</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <td>NZ</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/nz.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">New Zealand</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Wellington</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <td>AU</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/au.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Australia</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>New South Wales</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <td>CN</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/cn.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">China</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Guangdong</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <td>BR</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/br.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Brazil</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Sao Paulo</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <td>TR</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/tr.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Turkey</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Istanbul</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <td>RU</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/ru.png" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Russia</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Moscow Oblast</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/states"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
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
              <label className="form-label">Country Code</label>
              <div className="dropdown">
                <Link href="#"
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
                    <li className="d-flex align-items-center justify-content-between mb-3">
                      <label className="d-inline-flex align-items-center text-gray-9">
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" />
                        Select All
                      </label>
                      <Link href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        US
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        DE
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        IN
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        AU
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        BR
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        CN
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        AR
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        RU
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        CA
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        IT
                      </label>
                    </li>
                  </ul>
                  <div className="row g-2">
                    <div className="col-6">
                      <Link href="#" className="btn btn-outline-white w-100 close-filter">
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
              <label className="form-label">Country</label>
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
                    <li className="d-flex align-items-center justify-content-between mb-3">
                      <label className="d-inline-flex align-items-center text-gray-9">
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" />
                        Select All
                      </label>
                      <Link href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-xs me-2">
                          <img src="/assets/img/flags/us.png" className="flex-shrink-0" alt="img" />
                        </span>
                        United States
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-xs me-2">
                          <img src="/assets/img/flags/ca.png" className="flex-shrink-0" alt="img" />
                        </span>
                        Canada
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-xs me-2">
                          <img src="/assets/img/flags/de.png" className="flex-shrink-0" alt="img" />
                        </span>
                        Germany
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-xs me-2">
                          <img src="/assets/img/flags/fr.png" className="flex-shrink-0" alt="img" />
                        </span>
                        France
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-xs me-2">
                          <img src="/assets/img/flags/ar.png" className="flex-shrink-0" alt="img" />
                        </span>
                        Argentina
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-xs me-2">
                          <img src="/assets/img/flags/in.png" className="flex-shrink-0" alt="img" />
                        </span>
                        India
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-xs me-2">
                          <img src="/assets/img/flags/it.png" className="flex-shrink-0" alt="img" />
                        </span>
                        Italy
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-xs me-2">
                          <img src="/assets/img/flags/au.png" className="flex-shrink-0" alt="img" />
                        </span>
                        Australia
                      </label>
                    </li>
                  </ul>
                  <div className="row g-2">
                    <div className="col-6">
                      <Link href="#" className="btn btn-outline-white w-100 close-filter">
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
              <label className="form-label">State</label>
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
                    <li className="d-flex align-items-center justify-content-between mb-3">
                      <label className="d-inline-flex align-items-center text-gray-9">
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" />
                        Select All
                      </label>
                      <Link href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        California
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Ontario
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        England
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Bavaria
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Le-de-France
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Buenos Aires
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Maharashtra
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Lombardy
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Wellington
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        New South Wales
                      </label>
                    </li>
                  </ul>
                  <div className="row g-2">
                    <div className="col-6">
                      <Link href="#" className="btn btn-outline-white w-100 close-filter">
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
      <div id="add_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New State</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Country Code <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>US</option>
                        <option>DE</option>
                        <option>IN</option>
                        <option>AU</option>
                        <option>BR</option>
                        <option>CN</option>
                        <option>AR</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Country Name <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>Australia</option>
                        <option>California</option>
                        <option>England</option>
                        <option>Argentina</option>
                        <option>India</option>
                        <option>Italy</option>
                        <option>New Zealand</option>
                        <option>UK</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-0">
                      <label className="form-label">
                        State Name <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>New South Wales</option>
                        <option>California</option>
                        <option>Ontario</option>
                        <option>England</option>
                        <option>Bavaria</option>
                        <option>Le-de-France</option>
                        <option>Buenos Aires</option>
                        <option>Maharashtra</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="edit_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit State</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Country Code <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>US</option>
                        <option>DE</option>
                        <option>IN</option>
                        <option>AU</option>
                        <option>BR</option>
                        <option>CN</option>
                        <option>AR</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Country Name <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Australia</option>
                        <option>California</option>
                        <option>England</option>
                        <option>Argentina</option>
                        <option>India</option>
                        <option>Italy</option>
                        <option>New Zealand</option>
                        <option>UK</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-0">
                      <label className="form-label">
                        State Name <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>New South Wales</option>
                        <option>California</option>
                        <option>Ontario</option>
                        <option>England</option>
                        <option>Bavaria</option>
                        <option>Le-de-France</option>
                        <option>Buenos Aires</option>
                        <option>Maharashtra</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete State</h6>
              <p className="mb-3">Are you sure, you want to delete State?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/states" className="btn btn-primary">
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

export default States;

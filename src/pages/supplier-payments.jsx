import React from 'react';
import { Link } from 'react-router-dom';

const SupplierPayments = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Supplier Payments</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="dropdown">
            <Link href="#"
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="#">
                  Download as PDF
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  Download as Excel
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link href="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_payment"
            >
              <i className="isax isax-add-circle5 me-1"></i>New payment
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
            <div className="dropdown">
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
                    <span>Suppliers</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Payment ID</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Paid Date</span>
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
                    <span>Payment Mode</span>
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
            Suppliers Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              1
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
              <th>Supplier</th>
              <th className="no-sort">Payment ID</th>
              <th>Paid Date</th>
              <th>Amount</th>
              <th className="no-sort">Payment method</th>
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-17.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Emma Rose</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00025
                </Link>
              </td>
              <td>22 Feb 2025</td>
              <td className="text-dark">$10,000</td>
              <td className="text-dark">Cash</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-05.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Ethan James</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00024
                </Link>
              </td>
              <td>07 Feb 2025</td>
              <td className="text-dark">$25,750</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-12.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Olivia Grace</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00023
                </Link>
              </td>
              <td>30 Jan 2025</td>
              <td className="text-dark">$50,125</td>
              <td className="text-dark">Cash</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-29.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Liam Michael</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00022
                </Link>
              </td>
              <td>24 Jan 2025</td>
              <td className="text-dark">$75,900</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-32.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Sophia Marie</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00021
                </Link>
              </td>
              <td>04 Jan 2025</td>
              <td className="text-dark">$99,999</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-33.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Noah Daniel</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00020
                </Link>
              </td>
              <td>09 Dec 2024</td>
              <td className="text-dark">$1,20,500</td>
              <td className="text-dark">Cash</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-34.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Isabella Faith</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00019
                </Link>
              </td>
              <td>02 Dec 2024</td>
              <td className="text-dark">$2,50,000</td>
              <td className="text-dark">Cash</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-23.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Oliver Scott</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00018
                </Link>
              </td>
              <td>15 Nov 2024</td>
              <td className="text-dark">$5,00,750</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-35.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Ava Louise</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00017
                </Link>
              </td>
              <td>30 Nov 2024</td>
              <td className="text-dark">$7,50,300</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-36.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">James Robert</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00016
                </Link>
              </td>
              <td>12 Oct 2024</td>
              <td className="text-dark">$9,99,999</td>
              <td className="text-dark">Cash</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-37.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Charlotte Anne</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00015
                </Link>
              </td>
              <td>05 Oct 2024</td>
              <td className="text-dark">$87,650</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-38.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Benjamin Thomas</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00014
                </Link>
              </td>
              <td>09 Sep 2024</td>
              <td className="text-dark">$69,420</td>
              <td className="text-dark">Cash</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-39.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Amelia Jane</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00013
                </Link>
              </td>
              <td>02 Sep 2024</td>
              <td className="text-dark">$33,210</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-40.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Mia Elizabeth</h6>
                  </div>
                </div>
              </td>
              <td>
                <Link href="#" className="link-default">
                  PAY00012
                </Link>
              </td>
              <td>07 Aug 2024</td>
              <td className="text-dark">$2,10,000</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_payment"
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
              <label className="form-label">Suppliers</label>
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
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" />{' '}
                        Select All
                      </label>
                      <Link href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-17.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Emma Rose
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-05.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Ethan James
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-12.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Olivia Grace
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-29.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Liam Michael
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
                      Range : <span className="text-gray-9">$200 - $5695</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Payment Mode</label>
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
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" />{' '}
                        Select All
                      </label>
                      <Link href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link>
                    </li>
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
              <label className="form-label">Date Range</label>
              <div className="input-group position-relative">
                <input type="text" className="form-control date-range bookingrange rounded-end" />
                <span className="input-icon-addon fs-16 text-gray-9">
                  <i className="isax isax-calendar-2"></i>
                </span>
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
      <div id="add_payment" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Payment</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="">
                <form onSubmit={(e) => { e.preventDefault(); }}>
                  <div className="row gx-3">
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Payment ID<span className="text-danger ms-1">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Supplier<span className="text-danger ms-1">*</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option>Emma Rose</option>
                          <option>Ethan James</option>
                          <option>Olivia Grace</option>
                          <option>Liam Michael</option>
                          <option>Sophia Marie</option>
                          <option>Noah Daniel</option>
                          <option>Isabella Faith</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Invoice<span className="text-danger ms-1">*</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option>INC00025</option>
                          <option>INC00024</option>
                          <option>INC00023</option>
                          <option>INC00022</option>
                          <option>INC00021</option>
                          <option>INC00020</option>
                          <option>INC00019</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Reference Number<span className="text-danger ms1">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Payment Date<span className="text-danger ms-1">*</span>
                        </label>
                        <div className="input-group position-relative">
                          <input
                            type="text"
                            className="form-control datetimepicker rounded-end"
                            placeholder="dd/mm/yyyy"
                          />
                          <span className="input-icon-addon fs-16 text-gray-9">
                            <i className="isax isax-calendar-2"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Payment Mode<span className="text-danger ms-1">*</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option>Cash</option>
                          <option>Cheque</option>
                          <option>Bank Transfer</option>
                          <option>Paypal</option>
                          <option>Stripe</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Amount<span className="text-danger ms-1">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Paid Amount<span className="text-danger ms-1">*</span>
                        </label>
                        <input type="text" className="form-control" value="$5200" readonly />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Due Amount<span className="text-danger ms-1">*</span>
                        </label>
                        <input type="text" className="form-control" value="$10000" readonly />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">Notes</label>
                        <textarea className="form-control" rows="3"></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3 pb-3 border-bottom">
                        <label className="form-label">Attachment</label>
                        <div className="file-upload drag-file w-100 d-flex align-items-center justify-content-center flex-column">
                          <span className="upload-img d-block mb-2">
                            <i className="isax isax-folder-open text-primary"></i>
                          </span>
                          <p className="mb-0 text-gray-9">
                            Drop your files here or{' '}
                            <Link href="#" className="text-primary text-decoration-underline">
                              Browse
                            </Link>
                          </p>
                          <input type="file" accept="video/image" />
                          <p>Maximum size : 50 MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <button type="button" className="btn btn-outline-white">
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
        </div>
      </div>
      <div id="edit_payment" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Payment</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="">
                <form onSubmit={(e) => { e.preventDefault(); }}>
                  <div className="row gx-3">
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Payment ID<span className="text-danger ms-1">*</span>
                        </label>
                        <input type="text" className="form-control" value="PAY00025" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Supplier<span className="text-danger ms-1">*</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option selected>Emma Rose</option>
                          <option>Ethan James</option>
                          <option>Olivia Grace</option>
                          <option>Liam Michael</option>
                          <option>Sophia Marie</option>
                          <option>Noah Daniel</option>
                          <option>Isabella Faith</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Invoice<span className="text-danger ms-1">*</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option selected>INC00025</option>
                          <option>INC00024</option>
                          <option>INC00023</option>
                          <option>INC00022</option>
                          <option>INC00021</option>
                          <option>INC00020</option>
                          <option>INC00019</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Reference Number<span className="text-danger ms-1">*</span>
                        </label>
                        <input type="text" className="form-control" value="REF17420" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Payment Date<span className="text-danger ms-1">*</span>
                        </label>
                        <div className="input-group position-relative">
                          <input
                            type="text"
                            className="form-control datetimepicker rounded-end"
                            placeholder="22 Feb 2025"
                          />
                          <span className="input-icon-addon fs-16 text-gray-9">
                            <i className="isax isax-calendar-2"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Payment Mode<span className="text-danger ms-1">*</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option selected>Cash</option>
                          <option>Cheque</option>
                          <option>Bank Transfer</option>
                          <option>Paypal</option>
                          <option>Stripe</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Amount<span className="text-danger ms-1">*</span>
                        </label>
                        <input type="text" className="form-control" value="$4800" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Paid Amount<span className="text-danger ms-1">*</span>
                        </label>
                        <input type="text" className="form-control" value="$5200" readonly />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Due Amount<span className="text-danger ms-1">*</span>
                        </label>
                        <input type="text" className="form-control" value="$10000" readonly />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">Notes</label>
                        <textarea className="form-control" rows="3">
                          Payment for raw materials
                        </textarea>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3 pb-3">
                        <label className="form-label">Attachment</label>
                        <div className="file-upload drag-file w-100 d-flex align-items-center justify-content-center flex-column">
                          <span className="upload-img d-block mb-2">
                            <i className="isax isax-folder-open text-primary"></i>
                          </span>
                          <p className="mb-0 text-gray-9">
                            Drop your files here or{' '}
                            <Link href="#" className="text-primary text-decoration-underline">
                              Browse
                            </Link>
                          </p>
                          <input type="file" accept="video/image" />
                          <p>Maximum size : 50 MB</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-3 mb-3 border rounded-2">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <img src="/assets/img/icons/document-icon.svg" alt="document-icon" />
                            <div className="ms-2">
                              <p className="text-dark fw-medium mb-0">Attachment</p>
                              <p>15.45 KB</p>
                            </div>
                          </div>
                          <Link className="btn btn-sm bg-light text-dark rounded-circle">
                            <i className="isax isax-trash"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-top pt-3">
                    <button type="button" className="btn btn-outline-white">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
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
              <h6 className="mb-1">Delete Payment</h6>
              <p className="mb-3">Are you sure, you want to delete Payment?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/supplier-payments" className="btn btn-primary">
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

export default SupplierPayments;

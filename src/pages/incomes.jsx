import React from 'react';
import { Link } from 'react-router-dom';

const Incomes = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Income</h6>
        </div>
        <div className="my-xl-auto d-flex align-items-center gap-2">
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
          <Link href="#"
            className="btn btn-primary d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#add_income"
          >
            <i className="isax isax-add-circle5 me-1"></i>New Income
          </Link>
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
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center fw-medium"
                data-bs-toggle="dropdown"
              >
                <i className="isax isax-sort me-1"></i> Sort By :{' '}
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
                    <span>ID</span>
                  </label>
                </li>
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
                    <span>Description</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" />
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
              1
            </span>
            Payment Mode Selected
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
          <thead>
            <tr>
              <th className="no-sort">
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" id="select-all" />
                </div>
              </th>
              <th className="no-sort">ID</th>
              <th>Date</th>
              <th className="no-sort">Reference Number</th>
              <th className="no-sort">Description</th>
              <th className="no-sort">Amount</th>
              <th>Payment Mode</th>
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00025
                </Link>
              </td>
              <td>22 Feb 2025</td>
              <td>REF17420</td>
              <td>Sale of laptops</td>
              <td>
                <p className="text-dark">$10,000</p>
              </td>
              <td>
                <p className="text-dark">Cash</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00024
                </Link>
              </td>
              <td>07 Feb 2025</td>
              <td>REF16512</td>
              <td>Website development</td>
              <td>
                <p className="text-dark">$25,750</p>
              </td>
              <td>
                <p className="text-dark">Cheque</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00023
                </Link>
              </td>
              <td>30 Jan 2025</td>
              <td>REF16418</td>
              <td>Cloud migration service</td>
              <td>
                <p className="text-dark">$50,125</p>
              </td>
              <td>
                <p className="text-dark">Paypal</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00022
                </Link>
              </td>
              <td>17 Jan 2025</td>
              <td>REF16317</td>
              <td>Sale of smartphones</td>
              <td>
                <p className="text-dark">$75,900</p>
              </td>
              <td>
                <p className="text-dark">Bank Transfer</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00021
                </Link>
              </td>
              <td>04 Jan 2025</td>
              <td>REF15294</td>
              <td>Monthly premium plan</td>
              <td>
                <p className="text-dark">$99,999</p>
              </td>
              <td>
                <p className="text-dark">Stripe</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00020
                </Link>
              </td>
              <td>09 Dec 2024</td>
              <td>REF15420</td>
              <td>IT consulting services</td>
              <td>
                <p className="text-dark">$1,20,500</p>
              </td>
              <td>
                <p className="text-dark">Cash</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00019
                </Link>
              </td>
              <td>02 Dec 2024</td>
              <td>REF15275</td>
              <td>Sale of office equipment</td>
              <td>
                <p className="text-dark">$2,50,000</p>
              </td>
              <td>
                <p className="text-dark">Cheque</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00018
                </Link>
              </td>
              <td>15 Nov 2024</td>
              <td>REF14405</td>
              <td>Online training session</td>
              <td>
                <p className="text-dark">$5,00,750</p>
              </td>
              <td>
                <p className="text-dark">Paypal</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00017
                </Link>
              </td>
              <td>30 Nov 2024</td>
              <td>REF14754</td>
              <td>Purchase of manufacturing tools</td>
              <td>
                <p className="text-dark">$7,50,300</p>
              </td>
              <td>
                <p className="text-dark">Bank Transfer</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00016
                </Link>
              </td>
              <td>12 Oct 2024</td>
              <td>REF14947</td>
              <td>Software maintenance</td>
              <td>
                <p className="text-dark">$9,99,999</p>
              </td>
              <td>
                <p className="text-dark">Stripe</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00015
                </Link>
              </td>
              <td>05 Oct 2024</td>
              <td>REF13302</td>
              <td>Cloud storage solutions</td>
              <td>
                <p className="text-dark">$87,650</p>
              </td>
              <td>
                <p className="text-dark">Cheque</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00014
                </Link>
              </td>
              <td>09 Sep 2024</td>
              <td>REF13035</td>
              <td>Sale of smart devices</td>
              <td>
                <p className="text-dark">$69,420</p>
              </td>
              <td>
                <p className="text-dark">Paypal</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00013
                </Link>
              </td>
              <td>02 Sep 2024</td>
              <td>REF12710</td>
              <td>Software maintenance</td>
              <td>
                <p className="text-dark">$33,210</p>
              </td>
              <td>
                <p className="text-dark">Bank Transfer</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#" data-bs-toggle="modal" data-bs-target="#details_income">
                  INC00012
                </Link>
              </td>
              <td>07 Aug 2024</td>
              <td>REF12831</td>
              <td>Server maintenance</td>
              <td>
                <p className="text-dark">$2,10,000</p>
              </td>
              <td>
                <p className="text-dark">Cash</p>
              </td>
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
                      data-bs-target="#details_income"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_income"
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
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download4 me-2"></i>Download
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
                <Link href="#"
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
                        <input className="form-check-input m-0 me-2" type="checkbox" checked />
                        Cash
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Cheque
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Paypal
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Bank Transfer
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Stripe
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label id="dateRangePicker" className="form-label">
                Date Range
              </label>
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
      <div id="add_income" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Income</h4>
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
                        Income ID <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Reference Number</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Amount <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Income Date <span className="text-danger">*</span>
                      </label>
                      <div className="input-group position-relative mb-3">
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
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Payment Mode <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Cash</option>
                        <option>Cheque</option>
                        <option>Stripe</option>
                        <option>Bank Transfer</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div>
                      <label className="form-label">Description</label>
                      <textarea className="form-control"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create{' '}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="edit_income" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Income</h4>
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
                        Income ID <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" value="INC00025" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Reference Number</label>
                      <input type="text" className="form-control" value="REF17420" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Amount <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" value="$10,000" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Income Date <span className="text-danger">*</span>
                      </label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          value="22 Feb 2025"
                          placeholder="dd/mm/yyyy"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Payment Mode <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option selected>Cash</option>
                        <option>Cheque</option>
                        <option>Stripe</option>
                        <option>Bank Transfer</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div>
                      <label className="form-label">Description</label>
                      <textarea className="form-control">Sale of laptops</textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes{' '}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="details_income" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Income Details</h4>
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
                  <div className="col-md-6">
                    <div className="mb-3">
                      <p className="fw-semibold text-dark mb-0">Income ID</p>
                      <p>INC00025</p>
                    </div>
                    <div className="mb-3">
                      <p className="fw-semibold text-dark mb-0">Amount</p>
                      <p>$10,000</p>
                    </div>
                    <div>
                      <p className="fw-semibold text-dark mb-0">Payment Mode</p>
                      <p>Cash</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <p className="fw-semibold text-dark mb-0">Reference Number</p>
                      <p>PO-202402-012</p>
                    </div>
                    <div className="mb-3">
                      <p className="fw-semibold text-dark mb-0">Expense Date</p>
                      <p>22 Feb 2025</p>
                    </div>
                    <div>
                      <p className="fw-semibold text-dark mb-0">Description</p>
                      <p>Payment for raw materials</p>
                    </div>
                  </div>
                </div>
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
              <h6 className="mb-1">Delete Income</h6>
              <p className="mb-3">Are you sure, you want to delete income?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/incomes" className="btn btn-primary">
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

export default Incomes;

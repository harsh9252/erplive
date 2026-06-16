import React from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Category</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div>
            <Link href="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_modal"
            >
              <i className="isax isax-add-circle5 me-1"></i>New Category
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
              <th>Category</th>
              <th className="no-sort text-center">No of Products</th>
              <th className="no-sort text-center">Status</th>
              <th className="no-sort text-end pe-4">Action</th>
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
                      src="/assets/img/products/product-01.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Smartphones</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>2</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
              </td>
              <td className="text-end pe-4">
                <div className="dropdown">
                  <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                    <i className="isax isax-more fs-18"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                    <li>
                      <Link
                        href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_modal"
                      >
                        <i className="isax isax-edit-2 me-2 text-warning"></i>Edit
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="isax isax-trash me-2 text-danger"></i>Delete
                      </Link>
                    </li>
                  </ul>
                </div>
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
                      src="/assets/img/products/product-02.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Laptops</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>12</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
              </td>
              <td className="text-end pe-4">
                <div className="dropdown">
                  <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                    <i className="isax isax-more fs-18"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                    <li>
                      <Link
                        href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_modal"
                      >
                        <i className="isax isax-edit-2 me-2 text-warning"></i>Edit
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="isax isax-trash me-2 text-danger"></i>Delete
                      </Link>
                    </li>
                  </ul>
                </div>
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
                      src="/assets/img/products/product-03.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Headphones</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>34</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
              </td>
              <td className="text-end pe-4">
                <div className="dropdown">
                  <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                    <i className="isax isax-more fs-18"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                    <li>
                      <Link
                        href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_modal"
                      >
                        <i className="isax isax-edit-2 me-2 text-warning"></i>Edit
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="isax isax-trash me-2 text-danger"></i>Delete
                      </Link>
                    </li>
                  </ul>
                </div>
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
                      src="/assets/img/products/product-04.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Men's Apparel</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>24</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
              </td>
              <td className="text-end pe-4">
                <div className="dropdown">
                  <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                    <i className="isax isax-more fs-18"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                    <li>
                      <Link
                        href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_modal"
                      >
                        <i className="isax isax-edit-2 me-2 text-warning"></i>Edit
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="isax isax-trash me-2 text-danger"></i>Delete
                      </Link>
                    </li>
                  </ul>
                </div>
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
                      src="/assets/img/products/product-05.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Footwear</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>13</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
              </td>
              <td className="text-end pe-4">
                <div className="dropdown">
                  <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                    <i className="isax isax-more fs-18"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                    <li>
                      <Link
                        href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_modal"
                      >
                        <i className="isax isax-edit-2 me-2 text-warning"></i>Edit
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="isax isax-trash me-2 text-danger"></i>Delete
                      </Link>
                    </li>
                  </ul>
                </div>
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
                      src="/assets/img/products/product-06.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Kitchen</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>67</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
              </td>
              <td className="text-end pe-4">
                <div className="dropdown">
                  <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                    <i className="isax isax-more fs-18"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                    <li>
                      <Link
                        href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_modal"
                      >
                        <i className="isax isax-edit-2 me-2 text-warning"></i>Edit
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="isax isax-trash me-2 text-danger"></i>Delete
                      </Link>
                    </li>
                  </ul>
                </div>
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
                      src="/assets/img/products/product-07.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Cleaning</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>13</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
              </td>
              <td className="text-end pe-4">
                <div className="dropdown">
                  <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                    <i className="isax isax-more fs-18"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                    <li>
                      <Link
                        href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_modal"
                      >
                        <i className="isax isax-edit-2 me-2 text-warning"></i>Edit
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="isax isax-trash me-2 text-danger"></i>Delete
                      </Link>
                    </li>
                  </ul>
                </div>
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
                      src="/assets/img/products/product-08.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Haircare</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>25</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
              </td>
              <td className="text-end pe-4">
                <div className="dropdown">
                  <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                    <i className="isax isax-more fs-18"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                    <li>
                      <Link
                        href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_modal"
                      >
                        <i className="isax isax-edit-2 me-2 text-warning"></i>Edit
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="isax isax-trash me-2 text-danger"></i>Delete
                      </Link>
                    </li>
                  </ul>
                </div>
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
                      src="/assets/img/products/product-09.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Men’s Apparel</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>24</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
              </td>
              <td className="text-end pe-4">
                <div className="dropdown">
                  <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                    <i className="isax isax-more fs-18"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                    <li>
                      <Link
                        href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_modal"
                      >
                        <i className="isax isax-edit-2 me-2 text-warning"></i>Edit
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="isax isax-trash me-2 text-danger"></i>Delete
                      </Link>
                    </li>
                  </ul>
                </div>
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
                      src="/assets/img/products/product-10.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Skincare</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>65</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
              </td>
              <td className="text-end pe-4">
                <div className="dropdown">
                  <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                    <i className="isax isax-more fs-18"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                    <li>
                      <Link
                        href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_modal"
                      >
                        <i className="isax isax-edit-2 me-2 text-warning"></i>Edit
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="dropdown-item py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="isax isax-trash me-2 text-danger"></i>Delete
                      </Link>
                    </li>
                  </ul>
                </div>
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
                      src="/assets/img/products/product-11.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Bikes & Accessories</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>23</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-12.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Televisions</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>12</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-13.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Luxury Handbags</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>43</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
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
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-14.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Dairy Alternatives</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>23</td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" checked />
                </div>
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
      <div id="add_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Category</h4>
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
                <div className="mb-3">
                  <span className="text-gray-9 fw-bold mb-2 d-flex">Image</span>
                  <div className="d-flex align-items-center">
                    <div className="avatar avatar-xxl border border-dashed bg-light me-3 flex-shrink-0">
                      <i className="isax isax-image text-primary fs-24"></i>
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
                <div className="mb-3">
                  <label className="form-label">
                    Name<span className="text-danger ms-1">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div>
                  <label className="form-label">Slug</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add New
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
              <h4 className="modal-title">Edit Category</h4>
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
                <div className="mb-3">
                  <span className="text-gray-9 fw-bold mb-2 d-flex">Image</span>
                  <div className="d-flex align-items-center">
                    <div className="avatar avatar-xxl border border-dashed bg-light me-3 flex-shrink-0">
                      <div className="position-relative d-flex align-items-center">
                        <img
                          src="/assets/img/products/product-05.jpg"
                          className="avatar avatar-xl"
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
                <div className="mb-3">
                  <label className="form-label">
                    Name<span className="text-danger ms-1">*</span>
                  </label>
                  <input type="text" className="form-control" value="Shoes" />
                </div>
                <div>
                  <label className="form-label">Slug</label>
                  <input type="text" className="form-control" placeholder="Shoes" />
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
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
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Category</h6>
              <p className="mb-3">Are you sure, you want to delete category?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/category" className="btn btn-primary">
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

export default Category;

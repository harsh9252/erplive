import React from 'react';
import { Link } from 'react-router-dom';

const InventoryReport = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Inventory Report</h6>
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
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-1">
                <div>
                  <p className="mb-1">Total Inventory</p>
                  <h6 className="fs-16 fw-semibold mb-0">?8,500,000</h6>
                </div>
                <div>
                  <span className="avatar bg-primary rounded">
                    <i className="isax isax-dollar-circle fs-16"></i>
                  </span>
                </div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>5.62%
                </span>{' '}
                from last month
              </p>
              <span className="position-absolute start-0 top-0">
                <img src="/assets/img/bg/card-overlay-12.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-1">
                <div>
                  <p className="mb-1">Low Stock Items</p>
                  <h6 className="fs-16 fw-semibold mb-0">25 Products</h6>
                </div>
                <div>
                  <span className="avatar bg-success rounded">
                    <i className="isax isax-bag-2 fs-16"></i>
                  </span>
                </div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>11.4%
                </span>{' '}
                from last month
              </p>
              <span className="position-absolute start-0 top-0">
                <img src="/assets/img/bg/card-overlay-11.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-1">
                <div>
                  <p className="mb-1">Out-of-Stock Items</p>
                  <h6 className="fs-16 fw-semibold mb-0">10 Products</h6>
                </div>
                <div>
                  <span className="avatar bg-warning rounded">
                    <i className="isax isax-bag-timer fs-16"></i>
                  </span>
                </div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>8.52%
                </span>{' '}
                from last month
              </p>
              <span className="position-absolute start-0 top-0">
                <img src="/assets/img/bg/card-overlay-10.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-1">
                <div>
                  <p className="mb-1">Pending Reorders</p>
                  <h6 className="fs-16 fw-semibold mb-0">?750,000</h6>
                </div>
                <div>
                  <span className="avatar bg-info rounded">
                    <i className="isax isax-timer fs-16"></i>
                  </span>
                </div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-danger">
                  <i className="isax isax-received text-danger me-1"></i>7.45%
                </span>{' '}
                from last month
              </p>
              <span className="position-absolute start-0 top-0">
                <img src="/assets/img/bg/card-overlay-09.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <Link to="#" className="btn-searchset">
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
              <ul className="dropdown-menu  dropdown-menu">
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Code</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Product</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Category</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Unit</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Quantity</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Selling Price</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Purchase Price</span>
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
            Product Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <Link to="#" className="link-danger fw-medium text-decoration-underline ms-md-1">
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
              <th>Code</th>
              <th>Product</th>
              <th>Category</th>
              <th>Unit</th>
              <th className="no-sort">Quantity</th>
              <th className="no-sort">Selling Price</th>
              <th className="no-sort">Purchase Price</th>
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
                <Link to="#" className="text-default">
                  PR00025
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-01.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">Apple iPhone 15</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Smartphones
              <td className="text-dark">Piece</td>
              <td>2</td>
              <td className="text-dark">?100</td>
              <td className="text-dark">?98</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link to="#" className="text-default">
                  PR00014
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-02.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">Dell XPS 13 9310</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Laptops
              <td className="text-dark">Piece</td>
              <td>12</td>
              <td className="text-dark">?25</td>
              <td className="text-dark">?24</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link to="#" className="text-default">
                  PR00012
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-03.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">Bose QuietComfort 45</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Headphones
              <td className="text-dark">Piece</td>
              <td>2</td>
              <td className="text-dark">?34</td>
              <td className="text-dark">?58</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link to="#" className="text-default">
                  PR00016
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-04.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">Nike Dri-FIT T-shirt</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Computer Service
              <td className="text-dark">Piece</td>
              <td>24</td>
              <td className="text-dark">?75</td>
              <td className="text-dark">?72</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link to="#" className="text-default">
                  PR00022
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-05.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">Adidas Ultraboost 22 Running Shoe</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Footwear
              <td className="text-dark">Piece</td>
              <td>13</td>
              <td className="text-dark">?9</td>
              <td className="text-dark">?89</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link to="#" className="text-default">
                  PR00047
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-06.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">Samsung French Door Refrigerator</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Kitchen
              <td className="text-dark">Pack</td>
              <td>67</td>
              <td className="text-dark">?120</td>
              <td className="text-dark">?115</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link to="#" className="text-default">
                  PR00014
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-07.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">Dyson V15 Detect Vacuum Cleaner</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Cleaning
              <td className="text-dark">Pack</td>
              <td>13</td>
              <td className="text-dark">?250</td>
              <td className="text-dark">?240</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link to="#" className="text-default">
                  PR00031
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-08.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">HP Spectre x360 14</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Laptops
              <td className="text-dark">Piece</td>
              <td>25</td>
              <td className="text-dark">?541</td>
              <td className="text-dark">?525</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link to="#" className="text-default">
                  PR00077
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-09.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">Dyson Supersonic Hair Dryer</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Haircare
              <td className="text-dark">Litre</td>
              <td>24</td>
              <td className="text-dark">?741</td>
              <td className="text-dark">?750</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link to="#" className="text-default">
                  PR00045
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-10.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">Apple AirPods Pro</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Headphones
              <td className="text-dark">Piece</td>
              <td>65</td>
              <td className="text-dark">?89</td>
              <td className="text-dark">?49</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link to="#" className="text-default">
                  PR00021
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-11.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">Levi’s 501 Original Fit Jeans</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Men’s Apparel
              <td className="text-dark">Piece</td>
              <td>23</td>
              <td className="text-dark">?34</td>
              <td className="text-dark">?36</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link to="#" className="text-default">
                  PR00074
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-12.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">CeraVe Hydrating Facial Cleanser</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Skincare
              <td className="text-dark">Liter</td>
              <td>12</td>
              <td className="text-dark">?45</td>
              <td className="text-dark">?47</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link to="#" className="text-default">
                  PR00048
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-13.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">Giro Synthe MIPS Helmet</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Bikes & Accessories
              <td className="text-dark">Piece</td>
              <td>43</td>
              <td className="text-dark">?74</td>
              <td className="text-dark">?70</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link to="#" className="text-default">
                  PR00022
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/products/product-14.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="#">OnePlus 11 5G</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              Smartphones
              <td className="text-dark">Piece</td>
              <td>20</td>
              <td className="text-dark">?80</td>
              <td className="text-dark">?74</td>
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
              <label className="form-label">Product</label>
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
                      <Link to="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/products/product-01.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Apple iPhone 15
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/products/product-02.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Dell XPS 13 9310
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/products/product-03.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Bose QuietComfort 45
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/products/product-04.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Nike Dri-FIT T-shirt
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/products/product-05.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Adidas Ultraboost 22 Running Shoe
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/products/product-06.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Samsung French Door Refrigerator
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
              <label className="form-label">Category</label>
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
                        Smartphones
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Headphones
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Men's Apparel
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Footwear
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Kitchen
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Cleaning
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Skincare
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Bike & Accessories
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
              <label className="form-label">Units</label>
              <select className="select">
                <option>Select</option>
                <option>Piece</option>
                <option>Pack</option>
                <option>Liter</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
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
                      Range : <span className="text-gray-9">Range : ?200 - ?5695</span>
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

export default InventoryReport;

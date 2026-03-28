import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const stockData = [
  { id: 1, name: 'Apple iPhone 15', unit: 'Piece', price: 49, quantity: 2, totalPrice: 98, img: '/assets/img/products/product-01.jpg' },
  { id: 2, name: 'Dell XPS 13 9310', unit: 'Piece', price: 25, quantity: 12, totalPrice: 24, img: '/assets/img/products/product-02.jpg' },
  { id: 3, name: 'Bose QuietComfort 45', unit: 'Piece', price: 34, quantity: 2, totalPrice: 58, img: '/assets/img/products/product-03.jpg' },
  { id: 4, name: 'Nike Dri-FIT T-shirt', unit: 'Piece', price: 75, quantity: 24, totalPrice: 72, img: '/assets/img/products/product-04.jpg' },
  { id: 5, name: 'Adidas Ultraboost 22 Running Shoe', unit: 'Piece', price: 9, quantity: 13, totalPrice: 89, img: '/assets/img/products/product-05.jpg' },
  { id: 6, name: 'Samsung French Door Refrigerator', unit: 'Pack', price: 120, quantity: 67, totalPrice: 115, img: '/assets/img/products/product-06.jpg' },
  { id: 7, name: 'Dyson V15 Detect Vacuum Cleaner', unit: 'Pack', price: 250, quantity: 13, totalPrice: 240, img: '/assets/img/products/product-07.jpg' },
  { id: 8, name: 'HP Spectre x360 14', unit: 'Piece', price: 541, quantity: 25, totalPrice: 525, img: '/assets/img/products/product-08.jpg' },
  { id: 9, name: 'Dyson Supersonic Hair Dryer', unit: 'Litre', price: 741, quantity: 24, totalPrice: 750, img: '/assets/img/products/product-09.jpg' },
  { id: 10, name: 'Apple AirPods Pro', unit: 'Piece', price: 89, quantity: 65, totalPrice: 49, img: '/assets/img/products/product-10.jpg' },
  { id: 11, name: 'Levi’s 501 Original Fit Jeans', unit: 'Piece', price: 34, quantity: 23, totalPrice: 36, img: '/assets/img/products/product-11.jpg' },
  { id: 12, name: 'CeraVe Hydrating Facial Cleanser', unit: 'Liter', price: 45, quantity: 12, totalPrice: 47, img: '/assets/img/products/product-12.jpg' },
  { id: 13, name: 'Giro Synthe MIPS Helmet', unit: 'Piece', price: 74, quantity: 43, totalPrice: 70, img: '/assets/img/products/product-13.jpg' },
  { id: 14, name: 'OnePlus 11 5G', unit: 'Piece', price: 80, quantity: 20, totalPrice: 74, img: '/assets/img/products/product-14.jpg' },
];

const StockAgeing = () => {
  const [searchText, setSearchText] = useState("");
  const [columns, setColumns] = useState({
    product: true,
    unit: true,
    price: true,
    quantity: true,
    totalPrice: true
  });

  const handleColumnToggle = (column) => {
    setColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const filteredData = stockData.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Stock Ageing Report</h6>
        </div>
        <div className="my-xl-auto">
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
        </div>
      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <p className="mb-1">Total Stock Value</p>
                  <h6 className="fs-16 fw-semibold mb-0">$8,500,000</h6>
                </div>
                <div>
                  <span className="avatar bg-primary rounded-circle">
                    <i className="isax isax-dollar-circle fs-16"></i>
                  </span>
                </div>
              </div>
              <div className="bg-dark py-2 px-3 rounded">
                <p className="fs-13 mb-0 text-white text-truncate">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>5.62%
                  </span>{' '}
                  from last month
                </p>
              </div>
              <span className="position-absolute start-0 top-0">
                <img src="/assets/img/bg/card-overlay-05.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <p className="mb-1">Low Stock Items</p>
                  <h6 className="fs-16 fw-semibold mb-0">25 Products</h6>
                </div>
                <div>
                  <span className="avatar bg-success rounded-circle">
                    <i className="isax isax-bag-2 fs-16"></i>
                  </span>
                </div>
              </div>
              <div className="bg-dark py-2 px-3 rounded">
                <p className="fs-13 mb-0 text-white text-truncate">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>11.4%
                  </span>{' '}
                  from last month
                </p>
              </div>
              <span className="position-absolute start-0 top-0">
                <img src="/assets/img/bg/card-overlay-06.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <p className="mb-1">Pending Reorders</p>
                  <h6 className="fs-16 fw-semibold mb-0">$750,000</h6>
                </div>
                <div>
                  <span className="avatar bg-danger rounded-circle">
                    <i className="isax isax-timer fs-16"></i>
                  </span>
                </div>
              </div>
              <div className="bg-dark py-2 px-3 rounded">
                <p className="fs-13 mb-0 text-white text-truncate">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>8.52%
                  </span>{' '}
                  from last month
                </p>
              </div>
              <span className="position-absolute start-0 top-0">
                <img src="/assets/img/bg/card-overlay-07.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <p className="mb-1">Out of Stock Items</p>
                  <h6 className="fs-16 fw-semibold mb-0">10 Products</h6>
                </div>
                <div>
                  <span className="avatar bg-info rounded-circle">
                    <i className="isax isax-bag-timer fs-16"></i>
                  </span>
                </div>
              </div>
              <div className="bg-dark py-2 px-3 rounded">
                <p className="fs-13 mb-0 text-white text-truncate">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>8.52%
                  </span>{' '}
                  from last month
                </p>
              </div>
              <span className="position-absolute start-0 top-0">
                <img src="/assets/img/bg/card-overlay-08.svg" alt="User Img" />
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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ background: 'transparent', outline: 'auto' }}
                />
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
                data-bs-auto-close="outside"
              >
                <i className="isax isax-grid-3 me-1"></i>Column
              </Link>
              <ul className="dropdown-menu  dropdown-menu">
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.product} onChange={() => handleColumnToggle('product')} />
                    <span>Product</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.unit} onChange={() => handleColumnToggle('unit')} />
                    <span>Unit</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.price} onChange={() => handleColumnToggle('price')} />
                    <span>Price</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.quantity} onChange={() => handleColumnToggle('quantity')} />
                    <span>Quantity</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.totalPrice} onChange={() => handleColumnToggle('totalPrice')} />
                    <span>Total Price</span>
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
            Customers Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
            </span>
            Status Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
            </span>
            Units Selected
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
              {columns.product && <th className="no-sort">Product</th>}
              {columns.unit && <th className="no-sort">Unit</th>}
              {columns.price && <th>Price</th>}
              {columns.quantity && <th>Quantity</th>}
              {columns.totalPrice && <th>Total Price</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="form-check form-check-md">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </td>
                {columns.product && (
                  <td>
                    <div className="d-flex align-items-center">
                      <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                        <img
                          src={item.img}
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div>
                        <h6 className="fs-14 fw-medium mb-0">
                          <Link href="#">{item.name}</Link>
                        </h6>
                      </div>
                    </div>
                  </td>
                )}
                {columns.unit && <td className="text-dark">{item.unit}</td>}
                {columns.price && <td className="text-dark">${item.price}</td>}
                {columns.quantity && <td>{item.quantity}</td>}
                {columns.totalPrice && <td className="text-dark">${item.totalPrice}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id="customcanvas">
        <div className="offcanvas-header d-block pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between pb-3">
            <h6 className="offcanvas-title">Filter</h6>
            <button
              type="button"
              className="btn-close custom-btn-close"
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
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Product</h6>
              <p className="mb-3">Are you sure, you want to delete product?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/products" className="btn btn-primary">
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

export default StockAgeing;

import React from 'react';
import { Link } from 'react-router-dom';

const Permission = () => {
  return (
    <>
      {/* Page Header */}
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>
            <Link to="/roles-permissions">
              <i className="isax isax-arrow-left me-1"></i>
              Roles
            </Link>
          </h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="dropdown me-2">
            <Link href="#"
              className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              Role : <span className="fw-normal ms-1">Admin</span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link href="#" className="dropdown-item">
                  Admin
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  Customer
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  Shop Owner
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  Receptionist
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Accordion with Permission Tables */}
      <div className="">
        <div className="accordion" id="accordionExample">
          {/* Inventory Accordion */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button text-dark"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <span className="fs-18 fw-bold">Inventory</span>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="table-responsive table-nowrap">
                  <table className="table border mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="w-50">Module</th>
                        <th>Create</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View</th>
                        <th>Allow All</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Product / Services</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Inventory</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Accordion */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed text-dark bg-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <span className="fs-18 fw-bold">Sales</span>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="table-responsive table-nowrap">
                  <table className="table border mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="w-50">Module</th>
                        <th>Create</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View</th>
                        <th>Allow All</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Invoices</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Credit Notes</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Quotations</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Delivery Challans</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Customers</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Purchases Accordion */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed text-dark bg-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <span className="fs-18 fw-bold">Purchases</span>
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="table-responsive table-nowrap">
                  <table className="table border mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="w-50">Module</th>
                        <th>Create</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View</th>
                        <th>Allow All</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Purchases</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Purchase Orders</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Purchase Invoices</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Purchase Refunds</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Debit Notes (Purchase Return)</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Suppliers</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Supplier Payments</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Finance & Accounts Accordion */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed text-dark bg-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                <span className="fs-18 fw-bold">Finance & Accounts</span>
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="table-responsive table-nowrap">
                  <table className="table border mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="w-50">Module</th>
                        <th>Create</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View</th>
                        <th>Allow All</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Expenses</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Incomes</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Payments</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Transactions</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Bank Accounts</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Money Transfer</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Balance Sheet</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Trial Balance</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Cash Flow</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Account Statement</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Accordion */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button collapsed text-dark bg-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                <span className="fs-18 fw-bold">Reports</span>
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="table-responsive table-nowrap">
                  <table className="table border mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="w-50">Module</th>
                        <th>Create</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View</th>
                        <th>Allow All</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Reports</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="add_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Role</h4>
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
                  <label className="form-label">Role Name</label>
                  <input type="text" className="form-control" />
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
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Role</h4>
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
                  <label className="form-label">Role Name</label>
                  <input type="text" className="form-control" defaultValue="Admin" />
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
    </>
  );
};

export default Permission;

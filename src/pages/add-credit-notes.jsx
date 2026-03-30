import React from 'react';
import { Link } from 'react-router-dom';

const AddCreditNotes = () => {
  return (
    <>
      <div className="row">
        <div className="col-xxl-10 col-lg-11 mx-auto">
          <div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6>
                <Link to="/credit-notes">
                  <i className="isax isax-arrow-left me-2"></i>Credit Notes
                </Link>
              </h6>
              <Link href="#"
                className="btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#view_notes"
              >
                <i className="isax isax-eye me-1"></i>Preview
              </Link>
            </div>
            <div className="card">
              <div className="card-body">
                <h6 className="mb-3">Credit Note Details</h6>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                  <div className="border-bottom mb-3 pb-1">
                    <div className="row justify-content-between">
                      <div className="col-xl-5 col-lg-7">
                        <div className="row gx-3">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Credit Note Id</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="9876543"
                                readonly=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Reference Number</label>
                              <input type="text" className="form-control" value="1254569" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <label className="form-label">Customer Name</label>
                                <Link href="#" className="d-inline-flex align-items-center">
                                  <i className="isax isax-add-circle5 text-primary me-1"></i>Add New
                                </Link>
                              </div>
                              <select className="select">
                                <option>Timesquare Tech</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Related To</label>
                              <select className="select">
                                <option>Select Invoice</option>
                                <option>INV00025</option>
                                <option>INV00024</option>
                                <option>INV00023</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <label className="form-label">Credit Note Date</label>
                            <div className="input-group position-relative mb-3">
                              <input
                                type="text"
                                className="form-control datetimepicker rounded-end"
                                value="25-03-2025"
                              />
                              <span className="input-icon-addon fs-16 text-gray-9">
                                <i className="isax isax-calendar-2"></i>
                              </span>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <Link href="#" className="d-inline-flex align-items-center">
                                <i className="isax isax-add-circle5 text-primary me-1"></i>Add Due
                                Date
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-5 col-lg-5">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="border border-dashed bg-light rounded text-center p-3 mb-3">
                              <img
                                src="/assets/img/invoice-logo.svg"
                                className="invoice-logo-dark"
                                alt="img"
                              />
                              <img
                                src="/assets/img/invoice-logo-white-2.svg"
                                className="invoice-logo-white"
                                alt="img"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="row gx-3">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <select className="select">
                                    <option>Select Status</option>
                                    <option>Paid</option>
                                    <option>Pending</option>
                                    <option>Cancelled</option>
                                    <option>Partially Paid</option>
                                    <option>Uncollectable</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <select className="select">
                                    <option>Currency</option>
                                    <option>$</option>
                                    <option>€</option>
                                    <option>£</option>
                                    <option>₹</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between border rounded p-2 mb-3">
                              <div className="form-check form-switch me-4">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="enabe_tax"
                                  checked
                                />
                                <label className="form-check-label" htmlFor="enabe_tax">
                                  Enable Tax
                                </label>
                              </div>
                              <div>
                                <Link href="#" className="btn btn-icon btn-sm btn-soft-primary">
                                  <i className="isax isax-setting-2 fs-16"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom mb-3">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="card shadow-none">
                          <div className="card-body">
                            <h6 className="mb-3">Bill From</h6>
                            <div className="mb-3">
                              <label className="form-label">Billed By</label>
                              <input type="text" className="form-control" value="Kanakku" />
                            </div>
                            <div className="p-3 bg-light rounded border">
                              <div className="d-flex">
                                <div className="me-3">
                                  <span className="p-2 rounded border">
                                    <img
                                      src="/assets/img/logo-small.svg"
                                      alt="image"
                                      className="img-fluid"
                                    />
                                  </span>
                                </div>
                                <div>
                                  <h6 className="fs-14 mb-1 fw-semibold">
                                    Kanakku Invoice Management
                                  </h6>
                                  <p className="mb-1 fs-13">
                                    15 Hodges Mews, HP12 3JL, United Kingdom
                                  </p>
                                  <p className="mb-1 fs-13">Phone : +1 54664 75945</p>
                                  <p className="mb-1 fs-13">Email : </p>
                                  <p className="text-dark mb-0 fs-13">GST : 243E45767889</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="card shadow-none">
                          <div className="card-body">
                            <h6 className="mb-3">Bill To</h6>
                            <div className="mb-3">
                              <label className="form-label">Customer Name</label>
                              <input type="text" className="form-control" value="Timesquare Tech" />
                            </div>
                            <div className="p-3 bg-light rounded border">
                              <div className="d-flex">
                                <div className="me-3">
                                  <span>
                                    <img
                                      src="/assets/img/icons/timesquare-icon.svg"
                                      alt="image"
                                      className="img-fluid rounded"
                                    />
                                  </span>
                                </div>
                                <div>
                                  <h6 className="fs-14 mb-1 fw-semibold">Timesquare Tech</h6>
                                  <p className="mb-1 fs-13">
                                    299 Star Trek Drive, Florida, 32405, USA
                                  </p>
                                  <p className="mb-1 fs-13">Phone : +1 54664 75945</p>
                                  <p className="mb-1 fs-13">Email : </p>
                                  <p className="text-dark mb-0 fs-13">GST : 243E45767889</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom mb-3 pb-3">
                    <div className="row">
                      <div className="col-xl-4 col-md-6">
                        <h6 className="mb-3">Items & Details</h6>
                        <div>
                          <label className="form-label">Item Type</label>
                          <div className="d-flex align-items-center mb-3">
                            <div className="form-check me-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="Radio"
                                id="Radio-sm-1"
                                checked=""
                              />
                              <label className="form-check-label" htmlFor="Radio-sm-1">
                                Product
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="Radio"
                                id="Radio-sm-2"
                              />
                              <label className="form-check-label" htmlFor="Radio-sm-2">
                                Service
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Products/Services</label>
                          <select className="select">
                            <option>Select</option>
                            <option>Apple iPhone 15</option>
                            <option>Dell XPS 13 9310</option>
                            <option>Bose QuietComfort 45</option>
                            <option>Nike Dri-FIT T-shirt</option>
                            <option>Adidas Ultraboost </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive rounded table-nowrap border-bottom-0 border mb-3">
                      <table className="table mb-0 add-table">
                        <thead className="table-dark">
                          <tr>
                            <th>Product/Service</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Rate</th>
                            <th>Discount</th>
                            <th>Tax (%)</th>
                            <th>Amount</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody className="add-tbody">
                          <tr>
                            <td>
                              <input type="text" className="form-control" value="Nike Jordon" />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value="1"
                                style={{ minWidth: '66px' }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value="Pcs"
                                style={{ minWidth: '66px' }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value="$1360.00"
                                style={{ minWidth: '66px' }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value="0%"
                                style={{ minWidth: '66px' }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value="18"
                                style={{ minWidth: '66px' }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value="$1358.00"
                                style={{ minWidth: '66px' }}
                              />
                            </td>
                            <td>
                              <div>
                                <Link href="#" className="text-danger remove-table">
                                  <i className="isax isax-close-circle"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value="Enter Product Name"
                              />
                            </td>
                            <td>
                              <input type="text" className="form-control" value="0" />
                            </td>
                            <td>
                              <input type="text" className="form-control" value="Unit" />
                            </td>
                            <td>
                              <input type="text" className="form-control" value="0" />
                            </td>
                            <td>
                              <input type="text" className="form-control" value="0%" />
                            </td>
                            <td>
                              <input type="text" className="form-control" value="0" />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value="0"
                                style={{ minWidth: '66px' }}
                              />
                            </td>
                            <td>
                              <div>
                                <Link href="#" className="text-danger remove-table">
                                  <i className="isax isax-close-circle"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <Link href="#" className="d-inline-flex align-items-center add-invoice-data">
                        <i className="isax isax-add-circle5 text-primary me-1"></i>Add New
                      </Link>
                    </div>
                  </div>
                  <div className="border-bottom mb-3">
                    <div className="row">
                      <div className="col-lg-7">
                        <div className="mb-3">
                          <h6 className="mb-3">Extra Information</h6>
                          <div>
                            <ul
                              className="nav nav-tabs nav-solid-primary tab-style-1 border-0 p-0 d-flex flex-wrap gap-3 mb-3"
                              role="tablist"
                            >
                              <li className="nav-item" role="presentation">
                                <Link
                                  className="nav-link active d-inline-flex align-items-center border fs-12 fw-semibold rounded-2"
                                  data-bs-toggle="tab"
                                  data-bs-target="#notes"
                                  aria-current="page"
                                  href="#"
                                >
                                  <i className="isax isax-document-text me-1"></i>Add Notes
                                </Link>
                              </li>
                              <li className="nav-item" role="presentation">
                                <Link
                                  className="nav-link d-inline-flex align-items-center border fs-12 fw-semibold rounded-2"
                                  data-bs-toggle="tab"
                                  data-bs-target="#terms"
                                  href="#"
                                >
                                  <i className="isax isax-document me-1"></i>Add Terms & Conditions
                                </Link>
                              </li>
                              <li className="nav-item" role="presentation">
                                <Link
                                  className="nav-link d-inline-flex align-items-center border fs-12 fw-semibold rounded-2"
                                  data-bs-toggle="tab"
                                  data-bs-target="#bank"
                                  href="#"
                                >
                                  <i className="isax isax-bank me-1"></i>Bank Details
                                </Link>
                              </li>
                            </ul>
                            <div className="tab-content">
                              <div className="tab-pane active show" id="notes" role="tabpanel">
                                <label className="form-label">Additional Notes</label>
                                <textarea className="form-control"></textarea>
                              </div>
                              <div className="tab-pane fade" id="terms" role="tabpanel">
                                <label className="form-label">Terms & Conditions</label>
                                <textarea className="form-control"></textarea>
                              </div>
                              <div className="tab-pane fade" id="bank" role="tabpanel">
                                <label className="form-label">Account</label>
                                <select className="select">
                                  <option>Select</option>
                                  <option>Andrew - 5225655545555454 (Swiss Bank)</option>
                                  <option>Mark Salween - 4654145644566 (International Bank)</option>
                                  <option>
                                    Sophia Martinez - 7890123456789012 (Global Finance)
                                  </option>
                                  <option>David Chen - 2345678901234567 (National Bank)</option>
                                  <option>
                                    Emily Johnson - 3456789012345678 (Community Credit Union)
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="mb-3">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h6 className="fs-14 fw-semibold">Amount</h6>
                            <h6 className="fs-14 fw-semibold">$565</h6>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h6 className="fs-14 fw-semibold">CGST (9%)</h6>
                            <h6 className="fs-14 fw-semibold">$18</h6>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h6 className="fs-14 fw-semibold">SGST (9%)</h6>
                            <h6 className="fs-14 fw-semibold">$18</h6>
                          </div>
                          <div className="mb-3">
                            <Link href="#" className="d-inline-flex align-items-center">
                              <i className="isax isax-add-circle5 text-primary me-1"></i>Add
                              Additional Charges
                            </Link>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h6 className="fs-14 fw-semibold">Discount</h6>
                            <input
                              type="text"
                              className="form-control"
                              value="0%"
                              style={{ width: '106px' }}
                            />
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                            <div className="form-check form-switch me-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="require_check_2"
                                checked=""
                              />
                              <label className="form-check-label" htmlFor="require_check_2">
                                Round Off Total
                              </label>
                            </div>
                            <h6 className="fs-14 fw-semibold">$596</h6>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                            <h6>Total (USD)</h6>
                            <h6>$596</h6>
                          </div>
                          <div className="border-bottom mb-3 pb-3">
                            <h6 className="fs-14 fw-semibold mb-1">Total In Words</h6>
                            <p>Five Hundred &amp; Ninety Six Dollars</p>
                          </div>
                          <div className="mb-3">
                            <div className="mb-3">
                              <select className="select">
                                <option>Select Signature</option>
                                <option>Adrian</option>
                                <option>Emily Clark</option>
                                <option>John Carter</option>
                                <option>Michael Johnson</option>
                                <option>Olivia Harris</option>
                              </select>
                            </div>
                            <p className="mb-0 text-center">OR</p>
                          </div>
                          <div className="mb-2">
                            <label className="form-label">Signature Name</label>
                            <input type="text" className="form-control" value="Adrian" />
                          </div>
                          <div className="file-upload drag-file w-100 h-auto py-3 d-flex align-items-center justify-content-center flex-column">
                            <span className="upload-img d-block">
                              <i className="isax isax-image text-primary me-1"></i>Upload Signature
                            </span>
                            <input type="file" accept="video/image" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <button type="button" className="btn btn-outline-white border">
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
        </div>
      </div>
      <div className="modal fade" id="view_notes">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-body">
              <div className="d-flex mb-3 pb-3 align-items-center justify-content-between border-bottom">
                <h5 className="mb-0">Preview</h5>
                <button
                  type="button"
                  className="text-danger bg-transparent border-0 outline-0 p-0 lh-sm"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="isax isax-close-circle5 fs-16"></i>
                </button>
              </div>
              <div>
                <div className="d-flex align-items-center justify-content-end flex-wrap row-gap-3 mb-3">
                  <div className="d-flex align-items-center flex-wrap row-gap-3">
                    <Link
                      href="#"
                      className="btn btn-outline-white d-inline-flex align-items-center me-3"
                    >
                      <i className="isax isax-document-like me-1"></i>Download PDF
                    </Link>
                    <Link href="#"
                      className="btn btn-outline-white d-inline-flex align-items-center me-3"
                    >
                      <i className="isax isax-message-notif me-1"></i>Send Email
                    </Link>
                    <Link href="#"
                      className="btn btn-outline-white d-inline-flex align-items-center me-3"
                    >
                      <i className="isax isax-printer me-1"></i>Print
                    </Link>
                  </div>
                </div>
                <div className="bg-light p-4 rounded position-relative mb-3">
                  <div className="position-absolute top-0 end-0">
                    <img src="/assets/img/bg/card-bg.png" alt="User Img" />
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap mb-3 pb-2 position-relative z-1">
                    <div className="mb-3">
                      <h4 className="mb-1">Credit Notes</h4>
                      <div className="d-flex align-items-center flex-wrap row-gap-3">
                        <div className="me-4">
                          <h6 className="fs-14 fw-semibold mb-1">Dreams Technologies Pvt Ltd.,</h6>
                          <p>15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom</p>
                        </div>
                        <span>
                          <img
                            src="/assets/img/icons/not-paid.png"
                            alt="User Img"
                            width="48"
                            height="48"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <img
                        src="/assets/img/invoice-logo.svg"
                        className="invoice-logo-dark"
                        alt="img"
                      />
                      <img
                        src="/assets/img/invoice-logo-white-2.svg"
                        className="invoice-logo-white"
                        alt="img"
                      />
                    </div>
                  </div>
                  <div className="row gy-3 position-relative z-1">
                    <div className="col-lg-4">
                      <div>
                        <h6 className="mb-2 fs-16 fw-semibold">Credit Notes Details</h6>
                        <div>
                          <p className="mb-1">
                            Credit Note Id : <span className="text-dark">9876543</span>
                          </p>
                          <p className="mb-1">
                            Credit Note Date : <span className="text-dark">25 Jan 2025</span>
                          </p>
                          <p className="mb-1">
                            Due Date : <span className="text-dark">31 Jan 2025</span>
                          </p>
                          <p className="mb-1">
                            Related Invoice : <span className="text-primary">#INV00025</span>
                          </p>
                          <span className="badge bg-danger">Due in 8 days</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <h6 className="mb-2 fs-16 fw-semibold">Billing From</h6>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">Kanakku Invoice Management</h6>
                          <p className="mb-1">15 Hodges Mews, HP12 3JL, United Kingdom</p>
                          <p className="mb-1">Phone : +1 54664 75945</p>
                          <p className="mb-1">Email : </p>
                          <p className="mb-1">GST : 243E45767889</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <h6 className="mb-2 fs-16 fw-semibold">Billing To</h6>
                        <div className="bg-white rounded p-3">
                          <div className="d-flex align-items-center mb-1">
                            <div className="me-2">
                              <span>
                                <img
                                  src="/assets/img/icons/timesquare-icon.svg"
                                  alt="image"
                                  className="img-fluid rounded"
                                />
                              </span>
                            </div>
                            <h6 className="fs-14 fw-semibold">Timesquare Tech</h6>
                          </div>
                          <p className="mb-1">299 Star Trek Drive, Florida, 3240, USA</p>
                          <p className="mb-1">Phone : +1 54664 75945</p>
                          <p className="mb-1">Email : </p>
                          <p className="mb-0">GST : 243E45767889</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <h6 className="mb-3">Product / Service Items</h6>
                  <div className="table-responsive rounded border-bottom-0 border">
                    <table className="table mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th>#</th>
                          <th>Product/Service</th>
                          <th>Quantity</th>
                          <th>Unit</th>
                          <th>Rate</th>
                          <th>Discount</th>
                          <th>Tax (%)</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td className="text-dark">T-Shirt</td>
                          <td>2</td>
                          <td>Pcs</td>
                          <td>$200.00</td>
                          <td>10%</td>
                          <td>$36.00</td>
                          <td>$396.00</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td className="text-dark">Office Chair</td>
                          <td>1</td>
                          <td>Pcs</td>
                          <td>$350.00</td>
                          <td>5%</td>
                          <td>$33.25</td>
                          <td>$365.75</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td className="text-dark">LED Monitor</td>
                          <td>1</td>
                          <td>Pcs</td>
                          <td>$399.00</td>
                          <td>2%</td>
                          <td>$39.10</td>
                          <td>$398.90</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td className="text-dark">Smartphone</td>
                          <td>4</td>
                          <td>Pcs</td>
                          <td>$100.00</td>
                          <td>10%</td>
                          <td>$36.00</td>
                          <td>$396.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="border-bottom mb-3">
                  <div className="row">
                    <div className="col-xl-8 col-lg-6">
                      <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                        <div className="me-3">
                          <p className="mb-2">Scan to the pay</p>
                          <span>
                            <img src="/assets/img/icons/qr.png" alt="User Img" />
                          </span>
                        </div>
                        <div>
                          <h6 className="mb-2">Bank Details</h6>
                          <div>
                            <p className="mb-1">
                              Bank Name : <span className="text-dark">ABC Bank</span>
                            </p>
                            <p className="mb-1">
                              Account Number : <span className="text-dark">782459739212</span>
                            </p>
                            <p className="mb-1">
                              IFSC Code : <span className="text-dark">ABC0001345</span>
                            </p>
                            <p className="mb-0">
                              Payment Reference :{' '}
                              <span className="text-dark">INV-20250220-001</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-14 fw-semibold">Amount</h6>
                          <h6 className="fs-14 fw-semibold">$1,793.12</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-14 fw-semibold">CGST (9%)</h6>
                          <h6 className="fs-14 fw-semibold">$18</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-14 fw-semibold">SGST (9%)</h6>
                          <h6 className="fs-14 fw-semibold">$18</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                          <h6 className="fs-14 fw-semibold">Discount</h6>
                          <h6 className="fs-14 fw-semibold text-danger">$18</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                          <h6>Total (USD)</h6>
                          <h6>$596</h6>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">Total In Words</h6>
                          <p>Five Hundred &amp; Ninety Six Dollars</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="mb-3">
                      <div className="mb-3">
                        <h6 className="fs-14 fw-semibold mb-1">Terms and Conditions</h6>
                        <p>The Payment must be returned in the same condition.</p>
                      </div>
                      <div>
                        <h6 className="fs-14 fw-semibold mb-1">Notes</h6>
                        <p>
                          All charges are final and include applicable taxes, fees, and additional
                          costs
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="text-lg-end mb-3">
                      <span>
                        <img src="/assets/img/icons/sign.png" className="sign-dark" alt="img" />
                      </span>
                      <h6 className="fs-14 fw-semibold mb-1">Ted M. Davis</h6>
                      <p>Manager</p>
                    </div>
                  </div>
                </div>
                <div className="bg-light d-flex align-items-center justify-content-between p-4 rounded card-bg flex-wrap gap-2">
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">Dreams Technologies Pvt Ltd.,</h6>
                    <p>15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom</p>
                  </div>
                  <div>
                    <img
                      src="/assets/img/invoice-logo.svg"
                      className="invoice-logo-dark"
                      alt="img"
                    />
                    <img
                      src="/assets/img/invoice-logo-white-2.svg"
                      className="invoice-logo-white"
                      alt="img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCreditNotes;

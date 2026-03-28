import React from 'react';
import { Link } from 'react-router-dom';

const ApiKeys = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="mb-3 border-bottom pb-3 d-flex align-items-center justify-content-between">
            <h6 className="mb-0">API Key</h6>
            <div className="d-flex align-items-center flex-wrap gap-2">
              <Link href="#"
                data-bs-toggle="modal"
                data-bs-target="#add_key"
                className="btn btn-primary d-flex align-items-center"
              >
                <i className="isax isax-add-circle5 me-2"></i>New Key
              </Link>
            </div>
          </div>
          <div className="table-responsive table-nowrap no-filter no-pagination">
            <table className="table datatable">
              <thead className="table-light">
                <tr>
                  <th className="no-sort">
                    <div className="form-check form-check-md">
                      <input className="form-check-input" type="checkbox" id="select-all" />
                    </div>
                  </th>
                  <th>Service Name</th>
                  <th>API Key</th>
                  <th>Created On</th>
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
                  <td className="text-dark">Google Calendar Sync</td>
                  <td>GOOGLE-SYNC-3456-CALENDAR</td>
                  <td>22 Feb 2025</td>
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
                          data-bs-target="#edit_key"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link>
                      </li>
                      <li>
                        <Link href="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_key"
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
                  <td className="text-dark">Client Billing</td>
                  <td>CLIENT-BILLING-4321-INVOICE</td>
                  <td>07 Feb 2025</td>
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
                          data-bs-target="#edit_key"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link>
                      </li>
                      <li>
                        <Link href="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_key"
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
                  <td className="text-dark">Idle Time Detection</td>
                  <td>IDLE-TIME-6543-DETECT</td>
                  <td>30 Jan 2025</td>
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
                          data-bs-target="#edit_key"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link>
                      </li>
                      <li>
                        <Link href="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_key"
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
                  <td className="text-dark">Notifications</td>
                  <td>NOTIFY-8765-4321-REMINDER</td>
                  <td>17 Jan 2025</td>
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
                          data-bs-target="#edit_key"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link>
                      </li>
                      <li>
                        <Link href="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_key"
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
                  <td className="text-dark">Integration</td>
                  <td>INTEGRATE-API-9087-6543-TOOL</td>
                  <td>04 Jan 2025</td>
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
                          data-bs-target="#edit_key"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link>
                      </li>
                      <li>
                        <Link href="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_key"
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
                  <td className="text-dark">Payroll & Billings</td>
                  <td>PAYROLL-API-1234-5678-BILLING</td>
                  <td>09 Dec 2024</td>
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
                          data-bs-target="#edit_key"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link>
                      </li>
                      <li>
                        <Link href="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_key"
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
                  <td className="text-dark">Project & Task Management</td>
                  <td>TASK-API-8765-4321-PROJECT</td>
                  <td>02 Dec 2024</td>
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
                          data-bs-target="#edit_key"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link>
                      </li>
                      <li>
                        <Link href="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_key"
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
                  <td className="text-dark">Authentication</td>
                  <td>AUTH-API-9876-5432-USER-LOGIN</td>
                  <td>15 Nov 2024</td>
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
                          data-bs-target="#edit_key"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link>
                      </li>
                      <li>
                        <Link href="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_key"
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
        </div>
      </div>
      <div id="add_key" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add API Key</h4>
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
                  <label className="form-label">
                    Service Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-0">
                  <label className="form-label">
                    Key <span className="text-danger">*</span>
                  </label>
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
      <div id="edit_key" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit API Key</h4>
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
                  <label className="form-label">
                    Service Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" value="Google Calendar Sync" />
                </div>
                <div className="mb-0">
                  <label className="form-label">
                    Key <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" value="GOOGLE-SYNC-3456-CALENDAR" />
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
      <div className="modal fade" id="delete_key">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Page</h6>
              <p className="mb-3">Are you sure, you want to delete api key?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/custom-fields" className="btn btn-primary">
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

export default ApiKeys;

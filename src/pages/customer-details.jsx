import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getCustomerById } from '../services/customerService';
import { toast } from 'react-toastify';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        setIsLoading(true);
        try {
          const response = await getCustomerById(id);
          if (response.success && response.data) {
            setCustomer(response.data);
          } else {
            toast.error('Customer not found');
            navigate('/customers');
          }
        } catch (error) {
          console.error('Error fetching customer:', error);
          toast.error('Failed to load customer details');
          navigate('/customers');
        } finally {
          setIsLoading(false);
        }
      };
      fetchCustomer();
    }
  }, [id, navigate]);

  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>
            <Link to="/customers">
              <i className="isax isax-arrow-left fs-16 me-2"></i>Customers
            </Link>
          </h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="dropdown">
            <Link href="#"
              className="dropdown-toggle btn btn-primary d-flex align-items-center fs-14 fw-semibold"
              data-bs-toggle="dropdown"
            >
              Add New
            </Link>
            <ul className="dropdown-menu  dropdown-menu-end">
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="isax isax-document-text fs-14 me-2"></i>Invoice{' '}
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="isax isax-money-send fs-14 me-2"></i> Expense
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="isax isax-money-add fs-14 me-2"></i> Credit Notes
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="isax isax-money-recive fs-14 me-2"></i> Debit Notes
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="isax isax-document fs-14 me-2"></i> Purchase Order
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="isax isax-document-download fs-14 me-2"></i> Quotation
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="isax isax-document-forward fs-14 me-2"></i> Delivery Challan
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-8">
          <div className="card bg-light customer-details-info position-relative overflow-hidden">
            <div className="card-body position-relative z-1">
              <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-3">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div className="avatar avatar-xxl rounded-circle flex-shrink-0">
                    <img
                      src={customer?.avatar || "/assets/img/users/user-08.jpg"}
                      alt="user"
                      className="img-fluid rounded-circle border border-white border-2"
                    />
                  </div>
                  <div className="">
                    <p className="text-primary fs-14 fw-medium mb-1">Cl-{customer ? customer.id : '12345'}</p>
                    <h6 className="mb-2">
                      {' '}
                      {customer ? customer.name : 'Robert George'}{' '}
                      <img src="/assets/img/icons/confirme.svg" alt="confirme" className="ms-1" />
                    </h6>
                    <p className="fs-14 fw-regular">
                      <i className="isax isax-location fs-14 me-1 text-gray-9"></i> {customer?.address || '4712 Cherry Ridge Drive Rochester, NY 14620.'}
                    </p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="btn btn-outline-white border border-1 border-grey border-sm bg-white"
                >
                  <i className="isax isax-edit-2 fs-13 fw-semibold text-dark me-1"></i> Edit
                  Profile{' '}
                </Link>
              </div>
              <div className="card border-0 shadow shadow-none mb-0 bg-white">
                <div className="card-body border-0 shadow shadow-none">
                  <ul className="d-flex justify-content-between align-items-center flex-wrap gap-2 p-0 m-0 list-unstyled">
                    <li>
                      <h6 className="mb-1 fs-14 fw-semibold">
                        <i className="isax isax-sms fs-14 me-2"></i>Email Address
                      </h6>
                      <p>{customer?.email || ''}</p>
                    </li>
                    <li>
                      <h6 className="mb-1 fs-14 fw-semibold">
                        <i className="isax isax-call fs-14 me-2"></i>Phone
                      </h6>
                      <p> {customer?.phone || '+158578 54840'} </p>
                    </li>
                    <li>
                      <h6 className="mb-1 fs-14 fw-semibold">
                        <i className="isax isax-building fs-14 me-2"></i>Company{' '}
                      </h6>
                      <p> {typeof customer?.company === 'object' ? customer.company.name : (customer?.company || 'TrueAI Technologies')}</p>
                    </li>
                    <li>
                      <h6 className="mb-1 fs-14 fw-semibold">
                        <i className="isax isax-global fs-14 me-2"></i>Website
                      </h6>
                      <p className="d-flex align-items-center">
                        {' '}
                        www.example.com <i className="isax isax-link fs-14 ms-1 text-primary"></i>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <img
              src="/assets/img/icons/elements-01.svg"
              alt="elements-01"
              className="img-fluid customer-details-bg"
            />
          </div>
          <div className="card">
            <div className="card-body">
              <h6 className="pb-3 mb-3 border-1 border-bottom border-gray"> Invoice Statistics </h6>
              <ul className="d-flex align-items-center justify-content-between flex-wrap gap-2 p-0 m-0 list-unstyled">
                <li>
                  <p className="mb-2">
                    <i className="fa-solid fa-circle fs-10 text-primary me-2"></i> Total
                    Invoice{' '}
                  </p>
                  <h6 className="fs-16 fw-600"> $56900.54</h6>
                </li>
                <li>
                  <p className="mb-2">
                    <i className="fa-solid fa-circle fs-10 text-info me-2"></i> Outstanding{' '}
                  </p>
                  <h6 className="fs-16 fw-600"> $56900.54</h6>
                </li>
                <li>
                  <p className="mb-2">
                    <i className="fa-solid fa-circle fs-10 text-danger me-2"></i> Overdue{' '}
                  </p>
                  <h6 className="fs-16 fw-600"> $56900.54</h6>
                </li>
                <li>
                  <p className="mb-2">
                    <i className="fa-solid fa-circle fs-10 text-purple me-2"></i> Draft{' '}
                  </p>
                  <h6 className="fs-16 fw-600"> $56900.54</h6>
                </li>
                <li>
                  <p className="mb-2">
                    <i className="fa-solid fa-circle fs-10 text-error me-2"></i> Cancelled{' '}
                  </p>
                  <h6 className="fs-16 fw-600"> $56900.54</h6>
                </li>
              </ul>
            </div>
          </div>
          <div className="card table-info">
            <div className="card-body">
              <h6 className="pb-3 mb-3 border-1 border-bottom border-gray"> Invoice </h6>
              <div className="table-responsive table-nowrap">
                <table className="table border  m-0">
                  <thead className="table-light">
                    <tr>
                      <th className="no-sort">ID</th>
                      <th>Created On</th>
                      <th>Amount</th>
                      <th>Paid</th>
                      <th className="no-sort">Status</th>
                      <th>Due Date</th>
                      <th className="no-sort"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link to="/invoice-details" className="link-default">
                          INV00025
                        </Link>
                      </td>
                      <td>22 Feb 2025</td>
                      <td className="text-dark">$10,000</td>
                      <td className="">$5,000</td>
                      <td>
                        <span className="badge badge-soft-success badge-sm d-inline-flex align-items-center">
                          Paid<i className="isax isax-tick-circle ms-1"></i>
                        </span>
                      </td>
                      <td>04 Mar 2025</td>
                      <td className="action-item">
                        <Link href="#" data-bs-toggle="dropdown">
                          <i className="fa-solid fa-ellipsis"></i>
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/invoice-details"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-eye me-2"></i>View
                            </Link>
                          </li>
                          <li>
                            <Link to="/edit-invoice"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item d-flex align-items-center">
                              <i className="isax isax-archive-2 me-2"></i>Archive
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
                        <Link to="/invoice-details" className="link-default">
                          INV00024
                        </Link>
                      </td>
                      <td>07 Feb 2025</td>
                      <td className="text-dark">$25,750</td>
                      <td className="">$10,750</td>
                      <td>
                        <span className="badge badge-soft-warning badge-sm d-inline-flex align-items-center">
                          Unpaid<i className="isax isax-slash ms-1"></i>
                        </span>
                      </td>
                      <td>04 Mar 2025</td>
                      <td className="action-item">
                        <Link href="#" data-bs-toggle="dropdown">
                          <i className="fa-solid fa-ellipsis"></i>
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/invoice-details"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-eye me-2"></i>View
                            </Link>
                          </li>
                          <li>
                            <Link to="/edit-invoice"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item d-flex align-items-center">
                              <i className="isax isax-archive-2 me-2"></i>Archive
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
                        <Link to="/invoice-details" className="link-default">
                          INV00023
                        </Link>
                      </td>
                      <td>30 Jan 2025</td>
                      <td className="text-dark">$50,125</td>
                      <td className="">$20,000</td>
                      <td>
                        <span className="badge badge-soft-danger badge-sm d-inline-flex align-items-center">
                          Cancelled<i className="isax isax-close-circle ms-1"></i>
                        </span>
                      </td>
                      <td>13 Feb 2025</td>
                      <td className="action-item">
                        <Link href="#" data-bs-toggle="dropdown">
                          <i className="fa-solid fa-ellipsis"></i>
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/invoice-details"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-eye me-2"></i>View
                            </Link>
                          </li>
                          <li>
                            <Link to="/edit-invoice"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item d-flex align-items-center">
                              <i className="isax isax-archive-2 me-2"></i>Archive
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
                        <Link to="/invoice-details" className="link-default">
                          INV00022
                        </Link>
                      </td>
                      <td>17 Jan 2025</td>
                      <td className="text-dark">$75,900</td>
                      <td className="">$50,000</td>
                      <td>
                        <span className="badge badge-soft-primary badge-sm d-inline-flex align-items-center">
                          Partially Paid<i className="isax isax-timer ms-1"></i>
                        </span>
                      </td>
                      <td>30 Jan 2025</td>
                      <td className="action-item">
                        <Link href="#" data-bs-toggle="dropdown">
                          <i className="fa-solid fa-ellipsis"></i>
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/invoice-details"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-eye me-2"></i>View
                            </Link>
                          </li>
                          <li>
                            <Link to="/edit-invoice"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item d-flex align-items-center">
                              <i className="isax isax-archive-2 me-2"></i>Archive
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
                        <Link to="/invoice-details" className="link-default">
                          INV00019
                        </Link>
                      </td>
                      <td>02 Dec 2024</td>
                      <td className="text-dark">$2,50,000</td>
                      <td className="">$1,25,000</td>
                      <td>
                        <span className="badge badge-soft-warning badge-sm d-inline-flex align-items-center">
                          Unpaid<i className="isax isax-slash ms-1"></i>
                        </span>
                      </td>
                      <td>15 Dec 2024</td>
                      <td className="action-item">
                        <Link href="#" data-bs-toggle="dropdown">
                          <i className="fa-solid fa-ellipsis"></i>
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/invoice-details"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-eye me-2"></i>View
                            </Link>
                          </li>
                          <li>
                            <Link to="/edit-invoice"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item d-flex align-items-center">
                              <i className="isax isax-archive-2 me-2"></i>Archive
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
                        <Link to="/invoice-details" className="link-default">
                          INV00017
                        </Link>
                      </td>
                      <td>30 Nov 2024</td>
                      <td className="text-dark">$7,50,300</td>
                      <td className="">$2,50,500</td>
                      <td>
                        <span className="badge badge-soft-primary badge-sm d-inline-flex align-items-center">
                          Partially Paid<i className="isax isax-timer ms-1"></i>
                        </span>
                      </td>
                      <td>12 Nov 2024</td>
                      <td className="action-item">
                        <Link href="#" data-bs-toggle="dropdown">
                          <i className="fa-solid fa-ellipsis"></i>
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/invoice-details"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-eye me-2"></i>View
                            </Link>
                          </li>
                          <li>
                            <Link to="/edit-invoice"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item d-flex align-items-center">
                              <i className="isax isax-archive-2 me-2"></i>Archive
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
                        <Link to="/invoice-details" className="link-default">
                          INV00016
                        </Link>
                      </td>
                      <td>12 Oct 2024</td>
                      <td className="text-dark">$9,99,999</td>
                      <td className="">$4,00,000</td>
                      <td>
                        <span className="badge badge-soft-danger badge-sm d-inline-flex align-items-center">
                          Uncollectable<i className="isax isax-danger ms-1"></i>
                        </span>
                      </td>
                      <td>25 Oct 2024</td>
                      <td className="action-item">
                        <Link href="#" data-bs-toggle="dropdown">
                          <i className="fa-solid fa-ellipsis"></i>
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/invoice-details"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-eye me-2"></i>View
                            </Link>
                          </li>
                          <li>
                            <Link to="/edit-invoice"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item d-flex align-items-center">
                              <i className="isax isax-archive-2 me-2"></i>Archive
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
                        <Link to="/invoice-details" className="link-default">
                          INV00014
                        </Link>
                      </td>
                      <td>09 Sep 2024</td>
                      <td className="text-dark">$10,000</td>
                      <td className="">$5,000</td>
                      <td>
                        <span className="badge badge-soft-success badge-sm d-inline-flex align-items-center">
                          Paid<i className="isax isax-tick-circle ms-1"></i>
                        </span>
                      </td>
                      <td>04 Mar 2025</td>
                      <td className="action-item">
                        <Link href="#" data-bs-toggle="dropdown">
                          <i className="fa-solid fa-ellipsis"></i>
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/invoice-details"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-eye me-2"></i>View
                            </Link>
                          </li>
                          <li>
                            <Link to="/edit-invoice"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item d-flex align-items-center">
                              <i className="isax isax-archive-2 me-2"></i>Archive
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
                        <Link to="/invoice-details" className="link-default">
                          INV00013
                        </Link>
                      </td>
                      <td>13 Sep 2025</td>
                      <td className="text-dark">$10,000</td>
                      <td className="">$5,000</td>
                      <td>
                        <span className="badge badge-soft-success badge-sm d-inline-flex align-items-center">
                          Paid<i className="isax isax-tick-circle ms-1"></i>
                        </span>
                      </td>
                      <td>04 Mar 2025</td>
                      <td className="action-item">
                        <Link href="#" data-bs-toggle="dropdown">
                          <i className="fa-solid fa-ellipsis"></i>
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/invoice-details"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-eye me-2"></i>View
                            </Link>
                          </li>
                          <li>
                            <Link to="/edit-invoice"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item d-flex align-items-center">
                              <i className="isax isax-archive-2 me-2"></i>Archive
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
                        <Link to="/invoice-details" className="link-default">
                          INV00012
                        </Link>
                      </td>
                      <td>12 Sep 2025</td>
                      <td className="text-dark">$10,000</td>
                      <td className="">$5,000</td>
                      <td>
                        <span className="badge badge-soft-success badge-sm d-inline-flex align-items-center">
                          Paid<i className="isax isax-tick-circle ms-1"></i>
                        </span>
                      </td>
                      <td>04 Mar 2025</td>
                      <td className="action-item">
                        <Link href="#" data-bs-toggle="dropdown">
                          <i className="fa-solid fa-ellipsis"></i>
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/invoice-details"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-eye me-2"></i>View
                            </Link>
                          </li>
                          <li>
                            <Link to="/edit-invoice"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item d-flex align-items-center">
                              <i className="isax isax-archive-2 me-2"></i>Archive
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
                        <Link to="/invoice-details" className="link-default">
                          INV00011
                        </Link>
                      </td>
                      <td>10 Aug 2025</td>
                      <td className="text-dark">$10,000</td>
                      <td className="">$5,000</td>
                      <td>
                        <span className="badge badge-soft-primary badge-sm d-inline-flex align-items-center">
                          Partially Paid<i className="isax isax-timer ms-1"></i>
                        </span>
                      </td>
                      <td>04 Mar 2025</td>
                      <td className="action-item">
                        <Link href="#" data-bs-toggle="dropdown">
                          <i className="fa-solid fa-ellipsis"></i>
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/invoice-details"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-eye me-2"></i>View
                            </Link>
                          </li>
                          <li>
                            <Link to="/edit-invoice"
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="isax isax-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item d-flex align-items-center">
                              <i className="isax isax-archive-2 me-2"></i>Archive
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
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <div className="card-body">
              <h6 className="pb-3 mb-3 border-1 border-bottom border-gray"> Notes </h6>
              <p className="text-truncate line-clamb-3">
                {' '}
                Keep in mind that in order to be deductible, your employees’ pay must be reasonable
                and necessary for conducting business to qualify for{' '}
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h6 className="pb-3 mb-3 border-1 border-bottom border-gray"> Payments History </h6>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-md flex-shrink-0 me-2">
                    <img
                      src="/assets/img/icons/transaction-01.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link href="#">Andrew James</Link>
                    </h6>
                    <p className="fs-13">
                      <Link to="/invoice-details" className="link-default">
                        #INV45478
                      </Link>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-0 fs-13"> Amount </p>
                  <p className="mb-0 fs-14 fw-semibold text-gray-9"> $417 </p>
                </div>
                <div className="text-end">
                  <span className="badge badge-sm badge-soft-success">
                    {' '}
                    Paid <i className="isax isax-tick-circle fs-10 fw-semibold ms-1"></i>
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-md flex-shrink-0 me-2">
                    <img
                      src="/assets/img/icons/transaction-02.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link href="#">Andrew James</Link>
                    </h6>
                    <p className="fs-13">
                      <Link to="/invoice-details" className="link-default">
                        #INV45478
                      </Link>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-0 fs-13"> Amount </p>
                  <p className="mb-0 fs-14 fw-semibold text-gray-9"> $417 </p>
                </div>
                <div className="text-end">
                  <span className="badge badge-sm badge-soft-success">
                    {' '}
                    Paid <i className="isax isax-tick-circle fs-10 fw-semibold ms-1"></i>
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-md flex-shrink-0 me-2">
                    <img
                      src="/assets/img/icons/transaction-01.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link href="#">Andrew James</Link>
                    </h6>
                    <p className="fs-13">
                      <Link to="/invoice-details" className="link-default">
                        #INV45478
                      </Link>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-0 fs-13"> Amount </p>
                  <p className="mb-0 fs-14 fw-semibold text-gray-9"> $417 </p>
                </div>
                <div className="text-end">
                  <span className="badge badge-sm badge-soft-success">
                    {' '}
                    Paid <i className="isax isax-tick-circle fs-10 fw-semibold ms-1"></i>
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-md flex-shrink-0 me-2">
                    <img
                      src="/assets/img/icons/transaction-02.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link href="#">Andrew James</Link>
                    </h6>
                    <p className="fs-13">
                      <Link to="/invoice-details" className="link-default">
                        #INV45478
                      </Link>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-0 fs-13"> Amount </p>
                  <p className="mb-0 fs-14 fw-semibold text-gray-9"> $417 </p>
                </div>
                <div className="text-end">
                  <span className="badge badge-sm badge-soft-success">
                    {' '}
                    Paid <i className="isax isax-tick-circle fs-10 fw-semibold ms-1"></i>
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-0">
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-md flex-shrink-0 me-2">
                    <img
                      src="/assets/img/icons/transaction-01.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link href="#">Andrew James</Link>
                    </h6>
                    <p className="fs-13">
                      <Link to="/invoice-details" className="link-default">
                        #INV45478
                      </Link>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-0 fs-13"> Amount </p>
                  <p className="mb-0 fs-14 fw-semibold text-gray-9"> $417 </p>
                </div>
                <div className="text-end">
                  <span className="badge badge-sm badge-soft-success">
                    {' '}
                    Paid <i className="isax isax-tick-circle fs-10 fw-semibold ms-1"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card flex-fill overflow-hidden">
            <div className="card-body pb-0">
              <div className="mb-0">
                <h6 className="mb-1 pb-3 mb-3 border-bottom">Recent Activities</h6>
                <div className="recent-activities recent-activities-two">
                  <div className="d-flex align-items-center pb-3">
                    <span className="border z-1 border-primary rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-white p-1">
                      <i className="fa fa-circle fs-8 text-primary"></i>
                    </span>
                    <div className="recent-activities-flow">
                      <p className="mb-1">
                        Status Changed to{' '}
                        <span className="text-gray-9 fw-semibold">Partially Paid</span>
                      </p>
                      <p className="mb-0 d-inline-flex align-items-center fs-13">
                        <i className="isax isax-calendar-25 me-1"></i>19 Jan 2025
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center pb-3">
                    <span className="border z-1 border-primary rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-white p-1">
                      <i className="fa fa-circle fs-8 text-primary"></i>
                    </span>
                    <div className="recent-activities-flow">
                      <p className="mb-1">
                        <span className="text-gray-9 fw-semibold">$300</span> Partial Amount Paid on{' '}
                        <span className="text-gray-9 fw-semibold">Paypal</span>
                      </p>
                      <p className="mb-0 d-inline-flex align-items-center fs-13">
                        <i className="isax isax-calendar-25 me-1"></i>18 Jan 2025
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center pb-3">
                    <span className="border z-1 border-primary rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-white p-1">
                      <i className="fa fa-circle fs-8 text-primary"></i>
                    </span>
                    <div className="recent-activities-flow">
                      <p className="mb-1">
                        New Expenses added{' '}
                        <span className="text-gray-9 fw-semibold">#TR018756</span>
                      </p>
                      <p className="mb-0 d-inline-flex align-items-center fs-13">
                        <i className="isax isax-calendar-25 me-1"></i>18 Jan 2025
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center pb-3">
                    <span className="border z-1 border-primary rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-white p-1">
                      <i className="fa fa-circle fs-8 text-primary"></i>
                    </span>
                    <div className="recent-activities-flow">
                      <p className="mb-1">
                        Estimate Created <span className="text-gray-9 fw-semibold">#ES458789</span>
                      </p>
                      <p className="mb-0 d-inline-flex align-items-center fs-13">
                        <i className="isax isax-calendar-25 me-1"></i>17 Jan 2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link href="#" className="btn w-100 fs-14 py-2 shadow-lg fw-medium">
              View All
            </Link>
          </div>
        </div>
      </div>
      <div className="footer d-sm-flex align-items-center justify-content-between bg-white py-2 px-4 border-top">
        <p className="text-dark mb-0">
          &copy; 2025{' '}
          <Link href="#" className="link-primary">
            kanakku
          </Link>
          , All Rights Reserved
        </p>
        <p className="text-dark">Version : 1.3.8</p>
      </div>
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Customer</h6>
              <p className="mb-3">Are you sure, you want to delete Customer?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/customer-details" className="btn btn-primary">
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

export default CustomerDetails;

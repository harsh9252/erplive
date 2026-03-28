import React from 'react';
import { Link } from 'react-router-dom';

const StudentBillingInvoice = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="mb-3">
            <h6>
              <Link to="/invoice-templates">
                <i className="isax isax-arrow-left me-1"></i>Back
              </Link>
            </h6>
          </div>
          <div className="pb-3 mb-3 border-bottom border-3 border-light">
            <div className="d-flex align-items-center justify-content-between bg-light flex-wrap p-3 rounded">
              <div>
                <img src="/assets/img/invoice-logo.svg" className="mb-2" alt="User Img" />
              </div>
              <div className="text-end">
                <h6 className="text-primary fw-bold mb-2">UNIVERSITY NAME</h6>
                <span className="text-gray mb-2">Original For Recipient</span>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-3">
            <div>
              <h6 className="mb-1 fs-16">Tax Invoice</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="mb-3 border-light">
                <div className="d-flex align-items-center justify-content-between bg-light flex-wrap p-2 rounded">
                  <div className="text-gray fw-normal">Student Name :</div>
                  <span className="text-dark fw-medium">Walter Roberson</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mb-3 border-light">
                <div className="d-flex align-items-center justify-content-between bg-light flex-wrap p-2 rounded">
                  <div className="text-gray fw-normal">Student ID :</div>
                  <span className="text-dark fw-medium">DD465123</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mb-3 border-light">
                <div className="d-flex align-items-center justify-content-between bg-light flex-wrap p-2 rounded">
                  <div className="text-gray fw-normal">Term :</div>
                  <span className="text-dark fw-medium">Winter</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mb-3 border-light">
                <div className="d-flex align-items-center justify-content-between bg-light flex-wrap p-2 rounded">
                  <div className="text-gray fw-normal">Balance Due :</div>
                  <span className="text-dark fw-medium">$1815</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mb-3 border-light">
                <div className="d-flex align-items-center justify-content-between bg-light flex-wrap p-2 rounded">
                  <div className="text-gray fw-normal">Due Date :</div>
                  <span className="text-dark fw-medium">05/01/2023</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mb-3 border-light">
                <div className="d-flex align-items-center justify-content-between bg-light flex-wrap p-2 rounded">
                  <div className="text-gray fw-normal">Statement For :</div>
                  <span className="text-dark fw-medium">2023 Spring</span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <p className="mb-1 fw-bold d-block">Bill To :</p>
              <span className="mb-1 fw-noraml text-dark d-block">Walter Roberson</span>
              <span className="mb-1 fw-noraml text-dark d-block">
                299 Star Trek Drive, Panama City, Florida, 32405, USA.
              </span>
              <span className="mb-1 fw-noraml text-dark d-block"></span>
              <span className="mb-1 fw-noraml text-dark d-block">+45 5421 4523</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <table className="table">
                <thead className="thead-light border border-gray border-start-0 border-end-0">
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Due Date</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-gray">
                    <td className="text-dark">1</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">Semester Fee</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">01Jan 2024</span>
                    </td>
                    <td className="text-end">
                      <span className="text-dark">$350</span>
                    </td>
                  </tr>
                  <tr className="border-gray">
                    <td className="text-dark">2</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">Exam Fee</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">01Jan 2024</span>
                    </td>
                    <td className="text-end">
                      <span className="text-dark">$600</span>
                    </td>
                  </tr>
                  <tr className="border-gray">
                    <td className="text-dark">3</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">Tansport Fee</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">01Jan 2024</span>
                    </td>
                    <td className="text-end">
                      <span className="text-dark">$400</span>
                    </td>
                  </tr>
                  <tr className="border-gray">
                    <td className="text-dark">4</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">Hostel Fee</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">01Jan 2024</span>
                    </td>
                    <td className="text-end">
                      <span className="text-dark">$300</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9">
              <p className="mb-1 fw-normal">Important Note :</p>
              <span className="mb-1 fw-noraml text-dark">
                Delivery dates are not guaranteed and Seller has no liability for damages that may
                be incurred due to any delay.
              </span>
            </div>
            <div className="col-md-3">
              <div className="">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="fs-14 fw-medium mb-0 text-dark">Taxable Amount</p>
                  <p className="fs-14 fw-medium mb-0 text-dark">$1650.00</p>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="fs-14 fw-medium mb-0 text-dark">Discount 0%</p>
                  <p className="fs-14 fw-medium mb-0 text-dark">+ $0.00</p>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="fs-14 fw-medium mb-0 text-dark">IGST 18.0%</p>
                  <p className="fs-14 fw-medium mb-0 text-dark">$165.00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-2 border-top border-bottom border-3 border-light">
            <div className="col-md-9 pb-3">
              <p className="mb-1 fw-normal pt-3">Total amount ( in words):</p>
              <span className="mb-1 fw-noraml text-dark">
                One Thousand, Eight Hundred and Fifteen Dollars Only.
              </span>
            </div>
            <div className="col-md-3">
              <div className="mb-3 pt-4 align-items-center">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h6 className="fs-18 fw-bold">Amount Payable</h6>
                  <h6 className="fs-18 fw-bold">$1,815.00</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex align-items-center justify-content-between flex-wrap border-bottom mb-3">
            <div className="col-md-9">
              <div className="mb-3">
                <h6 className="mb-2">Payment Info :</h6>
                <div>
                  <p className="mb-1">
                    Debit Card : <span className="text-dark">465 *************645</span>
                  </p>
                  <p className="mb-1">
                    Amount : <span className="text-dark">$1,815</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-end mb-3">
                <p className="mb-1">For Dreamstechnologies</p>
                <span>
                  <img src="/assets/img/icons/sign-01.png" alt="User Img" />
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div>
                <h6 className="mb-2 fs-16 text-center">Terms & Conditions : </h6>
                <p className="mb-0 fs-13">
                  1. We are not the manufactures, company will stand for warrenty as per their terms
                  and conditions.{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="row border-bottom pb-3 text-center">
            <div className="col-md-12">
              <p className="text-gray">Thanks for your Business</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentBillingInvoice;

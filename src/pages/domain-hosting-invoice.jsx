import React from 'react';

export default function DomainHostingInvoice() {
  return (
    <>
      <div className="main-wrapper">
        <div className="invoice-wrapper">
          <div className="mb-3 border-bottom">
            <div className="d-flex align-items-center justify-content-between bg-light flex-wrap p-3  mb-3 rounded">
              <div>
                <h6 className="mb-2 text-dark">Dreams Domain</h6>
                <p className="mb-2">Original For Recipient</p>
              </div>
              <div className="invoice-logo">
                <img src="/assets/img/logo.svg" alt="User Img" />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <h5 className="text-center text-primary mb-3">Tax Invoice</h5>
            <div className="mb-3">
              <div className="row row-gap-3">
                <div className="col-md-4 col-lg-4">
                  <div className="d-flex justify-content-between align-items-center bg-light p-2">
                    <p className="mb-0">Customer ID:</p>
                    <p className="text-dark fw-medium">#326725</p>
                  </div>
                </div>
                <div className="col-md-4 col-lg-4">
                  <div className="d-flex justify-content-between align-items-center bg-light p-2">
                    <p className="mb-0">Customer ID:</p>
                    <p className="text-dark fw-medium">#326725</p>
                  </div>
                </div>
                <div className="col-md-4 col-lg-4">
                  <div className="d-flex justify-content-between align-items-center bg-light p-2">
                    <p className="mb-0">Customer ID:</p>
                    <p className="text-dark fw-medium">#326725</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <p className="fs-16 fw-semibold mb-1">Bill To :</p>
              <p className="text-dark">
                Walter Roberson
                <br /> 299 Star Trek Drive, Panama City, Florida, 32405, USA.
                <br />
                <br /> +45 5421 4523
              </p>
            </div>
            <div className="mb-3">
              <h6 className="mb-3">Domain Details:</h6>
              <div className="table-responsive px-0">
                <table className="table table-nowrap invoice-table2">
                  <thead className="thead-3">
                    <tr>
                      <th className="bg-light text-center ">Description</th>
                      <th className="bg-light text-center">Price</th>
                      <th className="bg-light text-center">Discount</th>
                      <th className="bg-light text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody className="tbody-3">
                    <tr>
                      <td>
                        <div className="bg-light p-2">
                          <p className="text-dark">
                            1 Domain - (.com Domain Registration with SSL) 2 Yearsdomainname.com
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center bg-light p-2">
                          <p className="mb-0 text-dark">₹</p>
                          <p className="text-dark">200.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center bg-light p-2">
                          <p className="mb-0 text-dark">₹</p>
                          <p className="text-dark">50.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center bg-light p-2">
                          <p className="mb-0 text-dark">₹</p>
                          <p className="text-dark">150.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <p className="text-dark fw-medium text-center">Disount 25%</p>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center bg-light p-2">
                          <p className="mb-0 text-dark fw-medium">₹</p>
                          <p className="text-dark fw-medium">150.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <p className="text-dark fw-semibold text-center">Total Amount</p>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center bg-dark p-2">
                          <p className="mb-0 text-white fw-semibold">₹</p>
                          <p className="text-white fw-semibold">600.00</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-3">
              <h6 className="mb-3">Hosting Details:</h6>
              <div className="table-responsive px-0">
                <table className="table table-nowrap invoice-table2">
                  <thead className="thead-3">
                    <tr>
                      <th className="bg-light text-center ">Description</th>
                      <th className="bg-light text-center">Price</th>
                      <th className="bg-light text-center">Discount</th>
                      <th className="bg-light text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody className="tbody-3">
                    <tr>
                      <td>
                        <div className="bg-light p-2">
                          <p className="text-dark">
                            25 GB Hosting - (Business Package #SHP2564874) 2 Years
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center bg-light p-2">
                          <p className="mb-0 text-dark">₹</p>
                          <p className="text-dark">200.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center bg-light p-2">
                          <p className="mb-0 text-dark">₹</p>
                          <p className="text-dark">50.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center bg-light p-2">
                          <p className="mb-0 text-dark">₹</p>
                          <p className="text-dark">150.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <p className="text-dark fw-medium text-center">Disount 25%</p>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center bg-light p-2">
                          <p className="mb-0 text-dark fw-medium">₹</p>
                          <p className="text-dark fw-medium">150.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <p className="text-dark fw-semibold text-center">Total Amount</p>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center bg-dark p-2">
                          <p className="mb-0 text-white fw-semibold">₹</p>
                          <p className="text-white fw-semibold">600.00</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-3 bg-light p-2">
              <div className="row row-gap-3">
                <div className="col-sm-6 col-md-6">
                  <div className="row align-items-center justify-content-between row-gap-3">
                    <div className="col-sm-6 col-md-6">
                      <p className="text-dark">SALES TAX 10%</p>
                    </div>
                    <div className="col-sm-6 col-md-6">
                      <div className="d-flex justify-content-between align-items-center bg-white p-2">
                        <p className="mb-0 text-dark">₹</p>
                        <p className="text-dark">90</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6">
                  <div className="row align-items-center justify-content-between row-gap-3">
                    <div className="col-sm-6 col-md-6">
                      <p className="text-dark">TOTAL AMOUNT</p>
                    </div>
                    <div className="col-sm-6 col-md-6">
                      <div className="d-flex justify-content-between align-items-center bg-dark p-2">
                        <p className="mb-0 text-white fw-semibold">₹</p>
                        <p className="text-white fw-semibold">690.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="py-2 px-3 d-flex justify-content-between align-items-center">
                <div>
                  <p className="fs-13 mb-0">Total amount ( in words):</p>
                  <p className="text-dark">USD Six Hundred Ninety Dollars Only.</p>
                </div>
                <div className="text-md-end">
                  <p className="text-dark fw-semibold">
                    Amount Payable <span className="ms-4">$690.00</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between flex-wrap mb-3 p-3">
              <div className="mb-3">
                <h6 className="mb-2">Payment Info:</h6>
                <div>
                  <p className="mb-1">
                    Debit Card : <span className="text-dark">465 *************645</span>
                  </p>
                  <p className="mb-1">
                    Amount : <span className="text-dark">$1,815</span>
                  </p>
                </div>
              </div>
              <div className="text-center mb-3">
                <p className="mb-1">For Dreamguys</p>
                <span>
                  <img src="/assets/img/icons/sign-01.png" alt="User Img" />
                </span>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <h6 className="mb-2">Terms & Conditions : </h6>
            <p className="mb-0">1. Goods Once sold cannot be taken back or exchanged.</p>
            <p>
              2. We are not the manufactures, company will stand for warrenty as per their terms and
              conditions.
            </p>
          </div>
          <div className=" border border-gray-100 p-3 text-center border-end-0 border-start-0">
            <p>Thanks for your Business</p>
          </div>
        </div>
      </div>
    </>
  );
}

import React from 'react';

const InternetBillingInvoice = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap row-gap-3 mb-3 pb-3">
            <div className="">
              <p className="mb-1">Original For Recipient</p>
              <h6 className="text-primary mb-2">TAX INVOICE</h6>
              <div>
                <h6 className="mb-1">Dreamguys Internet Pvt Ltd.,</h6>
                <div>
                  <p className="mb-1">
                    Address : <span>15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="mb-1 text-end">
                <img src="/assets/img/invoice-logo.svg" alt="User Img" />
              </div>
              <p className="mb-1 text-end">
                Date: <span className="text-dark">05/12/2024</span>
              </p>
              <div className="inv-details">
                <div className="inv-date-rest">
                  <p className="text-start text-white">
                    Invoice No: <span>INV 000500</span>
                  </p>
                </div>
                <div className="triangle-right"></div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <p className="mb-1">Customer Info :</p>
              <h6 className="mb-1 fs-16">John Williams</h6>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-6 md-12 d-flex align-items-center justify-content-between">
              <p className="mb-1">Client ID :</p>
              <span className="mb-1 fs-13 fw-noraml text-dark">AS2534568</span>
            </div>
            <div className="col-6 md-12 d-flex align-items-center justify-content-between">
              <p className="mb-1">Outstanding Balance :</p>
              <span className="mb-1 fs-13 fw-noraml text-dark">$3600</span>
            </div>
            <div className="col-6 md-12 d-flex align-items-center justify-content-between">
              <p className="mb-1">Invoice Date : </p>
              <span className="mb-1 fs-13 fw-noraml text-dark">Johan Smith</span>
            </div>
            <div className="col-6 md-12 d-flex align-items-center justify-content-between">
              <p className="mb-1">Due Date :</p>
              <span className="mb-1 fs-13 fw-noraml text-dark">Winter</span>
            </div>
            <div className="col-6 md-12 d-flex align-items-center justify-content-between">
              <p className="mb-1">Total Curent Charges :</p>
              <span className="mb-1 fs-13 fw-noraml text-dark">SI2534687</span>
            </div>
            <div className="col-6 md-12 d-flex align-items-center justify-content-between">
              <p className="mb-1">Total Balance Due :</p>
              <span className="mb-1 fs-13 fw-noraml text-dark">2024 Spring</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <table className="table">
                <thead className="thead-light border-top border-start-0 border-end-0 border-bottom border-3 border-dark p-2">
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Due Date</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-dark">
                    <td className="text-dark">1</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">Additional monthly usages - 125 GB</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">01Jan 2024 To 31 Jan 2024</span>
                    </td>
                    <td className="text-end">
                      <span className="text-dark">$350</span>
                    </td>
                  </tr>
                  <tr className="border-dark">
                    <td className="text-dark">2</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">Equpment rental</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">01Jan 2024 To 31 Jan 2024</span>
                    </td>
                    <td className="text-end">
                      <span className="text-dark">$600</span>
                    </td>
                  </tr>
                  <tr className="border-dark">
                    <td className="text-dark">3</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">Xtreme5</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">01Jan 2024 To 31 Jan 2024</span>
                    </td>
                    <td className="text-end">
                      <span className="text-dark">$400</span>
                    </td>
                  </tr>
                  <tr className="border-dark">
                    <td className="text-dark">4</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">Govement fee & taxes</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">01Jan 2024 To 31 Jan 2024</span>
                    </td>
                    <td className="text-end">
                      <span className="text-dark">$300</span>
                    </td>
                  </tr>
                  <tr className="border-dark">
                    <td className="text-dark">4</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">Monthly services</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">01Jan 2024 To 31 Jan 2024</span>
                    </td>
                    <td className="text-end">
                      <span className="text-dark">$300</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <div className="d-flex align-items-center justify-content-between ">
                <div className="d-flex flex-column">
                  <span className="text-dark text-end fw-semibold mb-1">Taxable Amount</span>
                  <span className="text-dark text-end fw-semibold">IGST 18.0%</span>
                </div>
                <div className="d-flex flex-column text-end">
                  <span className="text-dark fw-semibold mb-1">$1650.00</span>
                  <span className="text-dark fw-semibold">$165.00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row border-top border-bottom border-3 border-dark p-3 align-items-center">
            <div className="col-md-8">
              <span className="text-dark">Total Items / Qty : 5 / 5.00</span>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className=" text-end">
                  <span className="fw-bold fs-18 text-end text-dark">Total</span>
                </div>
                <div className="text-end">
                  <span className="fw-bold fs-18 text-dark">$1,815.00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row py-3 border-bottom  border-bottom border-3 border-dark mb-3 d-flex align-items-center">
            <div className="col-md-12">
              <div className="d-flex align-items-center justify-content-center">
                <p className="text-gary">
                  Total amount ( in words):
                  <span className="text-dark">
                    {' '}
                    One Thousand Eight Hundred Fifteen Dollars Only.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center flex-wrap border-bottom mb-3">
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
          </div>
          <div className="row border border-start-0 border-end-0 border-dark text-center text-white bg-light p-2">
            <div className="col-md-12">
              <p className="text-gray">Thanks for your Business</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternetBillingInvoice;

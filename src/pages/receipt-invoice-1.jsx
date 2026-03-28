import React from 'react';
import { Link } from 'react-router-dom';

export default function ReceiptInvoice1() {
  return (
    <div className="main-wrapper">
      <div className="invoice-wrapper receipt-page">
        <div className="mb-3">
          <h6>
            <Link to="/invoice-templates">
              <i className="isax isax-arrow-left me-1"></i>
              Back
            </Link>
          </h6>
        </div>
        <div className="card m-auto shadow-none">
          <div className="card-body">
            <div className="bg-light p-2 text-center mb-2">
              <img src="/assets/img/receipt-logo.svg" alt="User Img" />
            </div>
            <h6 className="fs-16 fw-semibold text-center mb-2">Dreams Technologies Pvt Ltd.,</h6>
            <p className="text-center mb-2">
              15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom. Email:
              info@dreamstechnologies.com
            </p>
            <span className="retail-receipt fs-12 text-dark text-center fw-semibold mb-2">
              RETAIL RECEIPT
            </span>
            <div className="mb-2">
              <div className="row mb-2 row-gap-3">
                <div className="col-sm-6 col-md-6">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Name:</p>
                    <p className="text-dark">John Doe</p>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Invoice No:</p>
                    <p className="text-dark">CS132453</p>
                  </div>
                </div>
              </div>
              <div className="row row-gap-3">
                <div className="col-sm-6 col-md-6">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Customer Id:</p>
                    <p className="text-dark">#LL93784</p>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Date :</p>
                    <p className="text-dark">01.07.2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="receipt-header">
              <table className="table table-nowrap border-dashed mb-2">
                <thead>
                  <tr className="mb-2">
                    <th className="fs-10 border-0 pe-0">SL</th>
                    <th className="fs-10 border-0 ps-0">Item</th>
                    <th className="fs-10 border-0 pe-0 text-end">Price</th>
                    <th className="fs-10 border-0 pe-0 text-end">Qty</th>
                    <th className="fs-10 border-0 pe-0 text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fs-10 border-0 p-1 pe-0">1.</td>
                    <td className="fs-10 border-0 p-1 ps-0">Sugarfree</td>
                    <td className="fs-10 border-0 p-1 text-end">$50</td>
                    <td className="fs-10 border-0 p-1 text-end">3</td>
                    <td className="fs-10 border-0 p-1 text-end">$150</td>
                  </tr>
                  <tr>
                    <td className="fs-10 border-0 p-1 pe-0">2.</td>
                    <td className="fs-10 border-0 p-1 ps-0">Onion (Loose) (5kg)</td>
                    <td className="fs-10 border-0 p-1 text-end">$50</td>
                    <td className="fs-10 border-0 p-1 text-end">2</td>
                    <td className="fs-10 border-0 p-1 text-end">$100</td>
                  </tr>
                  <tr>
                    <td className="fs-10 border-0 p-1 pe-0">3.</td>
                    <td className="fs-10 border-0 p-1 ps-0">Mushrooms - Button 1 pack</td>
                    <td className="fs-10 border-0 p-1 text-end">$50</td>
                    <td className="fs-10 border-0 p-1 text-end">3</td>
                    <td className="fs-10 border-0 p-1 text-end">$150</td>
                  </tr>
                  <tr>
                    <td className="fs-10 border-0 p-1 pe-0">4.</td>
                    <td className="fs-10 border-0 p-1 ps-0">Tea 1kg</td>
                    <td className="fs-10 border-0 p-1 text-end">$50</td>
                    <td className="fs-10 border-0 p-1 text-end">3</td>
                    <td className="fs-10 border-0 p-1 text-end">$150</td>
                  </tr>
                  <tr>
                    <td className="fs-10 border-0 p-1 pe-0">5.</td>
                    <td className="fs-10 border-0 p-1 ps-0">Diet Coke Soft Drink 300ml</td>
                    <td className="fs-10 border-0 p-1 text-end">$50</td>
                    <td className="fs-10 border-0 p-1 text-end">3</td>
                    <td className="fs-10 border-0 p-1 text-end">$150</td>
                  </tr>
                </tbody>
              </table>

              <div className="border-dashed mb-2">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="mb-0">Sub Total :</p>
                  <p>$700.00</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="mb-0">Discount :</p>
                  <p>-$50.00</p>
                </div>
              </div>

              <div className="border-dashed mb-2">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="mb-0">Service charge :</p>
                  <p>0.00</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="mb-0">Tax(5%)</p>
                  <p>$5.00</p>
                </div>
              </div>

              <div className="border-dashed mb-2">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="mb-0">Total Bill :</p>
                  <p>$655.00</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="mb-0">Due :</p>
                  <p>$0.00</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="mb-0 fw-semibold text-dark">Total Payable :</p>
                  <p className="fw-semibold text-dark">$655.00</p>
                </div>
              </div>

              <p className="text-center border-dashed pb-2 mb-2">
                **VAT against this challan is payable through central registration. Thank you for
                your business!
              </p>
              <p className="text-center">Powered by Dreams Technologies Pvt Ltd.,</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

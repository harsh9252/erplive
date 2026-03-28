import React from 'react';

const MovieTicketBookingInvoice = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div>
            <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap row-gap-3 mb-3 pb-3">
              <div>
                <h5 className="mb-2">TAX INVOICE</h5>
                <span className="mb-2">
                  <img src="/assets/img/icons/cineplex.svg" alt="icon" />
                </span>
                <div>
                  <h6 className="mb-1">Dreamstechnologies Cineplex</h6>
                  <div>
                    <p className="mb-1">
                      Address :{' '}
                      <span className="text-dark">
                        15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <img src="/assets/img/invoice-logo.svg" alt="User Img" />
                </div>
                <p className="mb-1 text-end">Original For Recipient</p>
                <p className="mb-1 text-end">
                  Invoice No: <span className="text-dark">INV 00001</span>
                </p>
                <p className="mb-1 text-end">
                  Date: <span className="text-dark">05/12/2024</span>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <h6 className="fs-16 text-gray mb-2">Purcheser Info:</h6>
                      <div>
                        <p className="mb-0 fs-13 text-dark">
                          Walter Roberson <br />
                          299 Star Trek Drive, Panama City, Florida, 32405, USA{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead className="thead-primary">
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Rate/Item</th>
                    <th>Qty</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-dark">1</td>
                    <td>
                      <div>
                        <p className="text-dark mb-0">Top Gun: Maverick</p>
                        <span className="d-block">22 July 2024 at 2.30pm - General Seat</span>
                      </div>
                    </td>
                    <td className="text-dark">$350</td>
                    <td>1</td>
                    <td className="text-dark">$350</td>
                  </tr>
                  <tr>
                    <td className="text-dark">2</td>
                    <td>
                      <div>
                        <p className="text-dark mb-0">The Gray Man</p>
                        <span className="d-block">22 July 2024 at 2.30pm - General Seat</span>
                      </div>
                    </td>
                    <td className="text-dark">$600</td>
                    <td>1</td>
                    <td className="text-dark">$600</td>
                  </tr>
                  <tr>
                    <td className="text-dark">2</td>
                    <td>
                      <div>
                        <p className="text-dark mb-0">Bullet Train</p>
                        <span className="d-block">22 July 2024 at 2.30pm - General Seat</span>
                      </div>
                    </td>
                    <td className="text-dark">$200</td>
                    <td>2</td>
                    <td className="text-dark">$400</td>
                  </tr>
                  <tr>
                    <td colspan="3" className="border-0"></td>
                    <td className="text-dark fw-medium border-0">Taxable Amount</td>
                    <td className="text-dark text-end fw-medium border-0">$1650.00</td>
                  </tr>
                  <tr>
                    <td colspan="3" className="border-0"></td>
                    <td className="text-dark fw-medium border-0">IGST 18.0%</td>
                    <td className="text-dark text-end fw-medium border-0">$165.00</td>
                  </tr>
                  <tr>
                    <td colspan="3" className="text-dark border-0">
                      Total Items / Qty : 3 / 3.00
                    </td>
                    <td className="text-dark fw-medium border-0">
                      <h6>Total</h6>
                    </td>
                    <td className="text-dark text-end fw-medium border-0">
                      <h6>$1,815.00</h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="py-3 border-top border-bottom mb-3 d-flex align-items-center justify-content-center">
              <p className="text-dark">
                Total amount ( in words): One Thousand Eight Hundred Fifteen Dollars Only.
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-between flex-wrap border-bottom mb-3">
              <div className="mb-3">
                <h6 className="mb-2">Bank Details</h6>
                <div>
                  <p className="mb-1">
                    Bank Name : <span className="text-dark">YES Bank</span>
                  </p>
                  <p className="mb-1">
                    Account # : <span className="text-dark">6677889944551</span>
                  </p>
                  <p className="mb-1">
                    IFSC : <span className="text-dark">YESBBIN4567</span>
                  </p>
                  <p className="mb-0">
                    BRANCH : <span className="text-dark">RS Puram</span>
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <h6 className="mb-2">Terms & Conditions : </h6>
                <p className="mb-1">1. Goods Once sold cannot be taken back or exchanged.</p>
                <p>
                  2. We are not the manufactures, company will stand for warrenty as per their terms
                  and conditions.
                </p>
              </div>
            </div>
            <div className="border-bottom text-center text-white bg-primary p-2">
              <p>Thanks for your Business</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieTicketBookingInvoice;

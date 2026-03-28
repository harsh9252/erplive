import React from 'react';

const MoneyExchangeInvoice = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="pb-3 mb-3">
            <div className="d-flex align-items-center justify-content-between bg-light flex-wrap p-3 rounded">
              <div>
                <img src="/assets/img/invoice-logo.svg" className="mb-2" alt="User Img" />
                <p className="mb-1">Original For Recipient</p>
                <p className="mb-1">
                  Invoice No: <span className="text-dark">INV 00001</span>
                </p>
                <p className="mb-1">
                  Date: <span className="text-dark">05/12/2024</span>
                </p>
              </div>
              <div className="text-end">
                <h6 className="mb-1">TAX INVOICE</h6>
                <img src="/assets/img/icons/money-exchange.svg" className="mb-1" alt="User Img" />
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
            </div>
          </div>
          <div className="mb-3">
            <h6 className="mb-2 fs-16 bg-light p-2 text-dark">Exchange Confirmation</h6>
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div className="d-flex align-items-center justify-content-between flex-fill border rounded p-2">
                <span className="text-dark me-2">Funded</span>
                <p>Apr 25, 2024</p>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-fill border rounded p-2">
                <span className="text-dark me-2">Paid Out</span>
                <p>Apr 25, 2024</p>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-fill border rounded p-2">
                <span className="text-dark me-2">Transfer ID</span>
                <p>#12345</p>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-fill border rounded p-2">
                <span className="text-dark me-2">Membership</span>
                <p>VH456512BB</p>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <h6 className="mb-2 fs-16 bg-light p-2 text-dark">Transfer Overview</h6>
            <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
              <div className="d-flex align-items-center justify-content-between flex-fill border rounded p-2">
                <span className="text-dark me-2">Ammount paid by Johan Smith</span>
                <p>$8000 USD</p>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-fill border rounded p-2">
                <span className="text-dark me-2">Abbount converted</span>
                <p>$22771.17 CAD</p>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-fill border rounded p-2">
                <span className="text-dark me-2">Converted and send to</span>
                <p>$22,753.46 CAD</p>
              </div>
            </div>
            <div className="">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center justify-content-between flex-fill border rounded p-2">
                  <span className="text-dark me-2">Fee</span>
                  <p>$18.71 USD</p>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-fill border rounded p-2">
                  <span className="text-dark me-2">Exchange Rate</span>
                  <p>$1 USD = $ 1.27 CAD</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <h6 className="mb-2 fs-16 bg-light p-2 text-dark">Send To</h6>
            <div className="row">
              <div className="col-lg-6 d-flex">
                <div className="flex-fill border rounded p-2">
                  <p className="mb-1 d-flex align-items-center justify-content-between">
                    Name : <span className="text-dark">Vector john</span>
                  </p>
                  <p className="mb-1 d-flex align-items-center justify-content-between">
                    Bank Name & Branch : <span className="text-dark">Toronto Bank</span>
                  </p>
                  <p className="mb-1 d-flex align-items-center justify-content-between">
                    SWIFT / BIC Code : <span className="text-dark">MSV24678665RT</span>
                  </p>
                  <p className="mb-0 d-flex align-items-center justify-content-between">
                    Account Number : <span className="text-dark">2465789456324</span>
                  </p>
                </div>
              </div>
              <div className="col-lg-6 d-flex">
                <div className="flex-fill border rounded p-2">
                  <p className="mb-1 d-flex align-items-center justify-content-between">
                    Address : <span className="text-dark">2 Roanoke Road Ontario Canada</span>
                  </p>
                  <p className="mb-1 d-flex align-items-center justify-content-between">
                    Account Name : <span className="text-dark">Johan Smith</span>
                  </p>
                  <p className="mb-1 d-flex align-items-center justify-content-between">
                    Reference : <span className="text-dark">2465789456324</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <h6 className="mb-2 fs-16 bg-light p-2 text-dark">Paid Out From</h6>
            <div className="row">
              <div className="col-lg-6 d-flex">
                <div className="flex-fill border rounded p-2">
                  <p className="mb-1 d-flex align-items-center justify-content-between">
                    Name : <span className="text-dark">Canadian Bank</span>
                  </p>
                  <p className="mb-1 d-flex align-items-center justify-content-between">
                    Reference : <span className="text-dark">SM2455452114545</span>
                  </p>
                </div>
              </div>
              <div className="col-lg-6 d-flex">
                <div className="flex-fill border rounded p-2">
                  <p className="mb-1 d-flex align-items-center justify-content-between">
                    Delivered : <span className="text-dark">Bank Transfer</span>
                  </p>
                  <p className="mb-1 d-flex align-items-center justify-content-between">
                    Account Name : <span className="text-dark">Johan Smith</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <h6 className="mb-2 fs-16 bg-light p-2 text-dark">Note</h6>
            <div className="row">
              <p>
                Your use of the Website shall be deemed to constitute your understanding and
                approval of, and agreement to be bound by, the Privacy Policy and you consent to the
                collection.
              </p>
            </div>
          </div>
          <div className="border-top border-bottom text-center p-2">
            <p>Thanks for your Business</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoneyExchangeInvoice;

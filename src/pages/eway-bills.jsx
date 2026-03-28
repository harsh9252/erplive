import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function EWayBills() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('eWayBills') || '[]');
    setBills(data);
  }, []);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>E-Way Bills</h6>
        </div>
        <div>
          <Link to="/add-eway-bill" className="btn btn-primary btn-sm">
            <i className="fa fa-plus me-2"></i>Create
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>From GSTIN</th>
                <th>To GSTIN</th>
                <th>Distance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bills.length > 0 ? (
                bills.map(bill => (
                  <tr key={bill.id}>
                    <td>{bill.id}</td>
                    <td>{bill.from_gstin}</td>
                    <td>{bill.to_gstin}</td>
                    <td>{bill.distance_km} KM</td>
                    <td><span className="badge bg-success">{bill.status}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No e-way bills found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

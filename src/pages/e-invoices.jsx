import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function EInvoices() {
  const [eInvoices, setEInvoices] = useState([]);
  const [salesInvoices, setSalesInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState('generated');

  useEffect(() => {
    const eInvData = JSON.parse(localStorage.getItem('eInvoices') || '[]');
    const salesInvData = JSON.parse(localStorage.getItem('salesInvoices') || '[]');
    setEInvoices(eInvData);
    setSalesInvoices(salesInvData);
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      'GENERATED': 'bg-success',
      'PENDING': 'bg-warning',
      'CANCELLED': 'bg-danger',
    };
    return statusMap[status] || 'bg-secondary';
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>E-Invoices</h6>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-3">
        <div className="card-body">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === 'generated' ? 'active' : ''}`}
                onClick={() => setActiveTab('generated')}
                href="#"
                role="tab"
              >
                Generated E-Invoices ({eInvoices.length})
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
                href="#"
                role="tab"
              >
                Generate New ({salesInvoices.filter(inv => !inv.eInvoice).length})
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Generated E-Invoices Tab */}
      {activeTab === 'generated' && (
        <div className="card">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>IRN</th>
                  <th>Ack No</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {eInvoices.length > 0 ? (
                  eInvoices.map(inv => (
                    <tr key={inv.id}>
                      <td>{inv.invoiceNumber}</td>
                      <td>{inv.customer}</td>
                      <td>₹{inv.netTotal}</td>
                      <td>
                        <span className="font-monospace small">{inv.irn.substring(0, 16)}...</span>
                      </td>
                      <td>
                        <span className="font-monospace">{inv.ack_no}</span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadge(inv.status)}`}>{inv.status}</span>
                      </td>
                      <td>
                        <Link
                          to={`/e-invoice-details/${inv.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No e-invoices generated yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Generate New E-Invoices Tab */}
      {activeTab === 'pending' && (
        <div className="card">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {salesInvoices.filter(inv => !inv.eInvoice).length > 0 ? (
                  salesInvoices
                    .filter(inv => !inv.eInvoice)
                    .map(inv => (
                      <tr key={inv.id}>
                        <td>{inv.invoiceNumber}</td>
                        <td>{inv.customer}</td>
                        <td>{inv.invoiceDate}</td>
                        <td>₹{inv.netTotal}</td>
                        <td>
                          <span className="badge bg-warning">{inv.status}</span>
                        </td>
                        <td>
                          <Link
                            to={`/e-invoice-generate/${inv.id}`}
                            className="btn btn-sm btn-primary"
                          >
                            Generate
                          </Link>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">All invoices have e-invoices generated</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

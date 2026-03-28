import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getDebitNoteById, postDebitNote, cancelDebitNote } from '../services/debitNoteService';
import { getCompanySettings } from '../services/settingsService';
import { toast } from 'react-toastify';

const DebitNoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dn, setDN] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companySettings, setCompanySettings] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dnRes, settingsRes] = await Promise.all([
          getDebitNoteById(id),
          getCompanySettings()
        ]);
        setDN(dnRes.data || dnRes);
        setCompanySettings(settingsRes.data || settingsRes);
      } catch (error) {
        console.error('Error fetching details:', error);
        toast.error('Failed to load debit note details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handlePost = async () => {
    if (window.confirm('Post this debit note? This will reduce stock (OUT) from the warehouse.')) {
      setProcessing(true);
      try {
        await postDebitNote(id);
        toast.success('Debit note posted. Stock reduced.');
        const updated = await getDebitNoteById(id);
        setDN(updated.data || updated);
      } catch (error) {
        toast.error(error.message || 'Failed to post debit note');
      } finally {
        setProcessing(false);
      }
    }
  };

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel this debit note?')) {
      setProcessing(true);
      try {
        await cancelDebitNote(id);
        toast.success('Debit note cancelled.');
        const updated = await getDebitNoteById(id);
        setDN(updated.data || updated);
      } catch (error) {
        toast.error(error.message || 'Failed to cancel debit note');
      } finally {
        setProcessing(false);
      }
    }
  };

  if (loading) return (
    <div className="d-flex align-items-center justify-content-center min-vh-50">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  if (!dn) return <div className="p-4 text-center">Debit Note not found</div>;

  const isInterState = dn.place_of_supply !== companySettings?.state_code;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Debit Note: {dn.debit_number || dn.invoice_number || dn.id}</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/invoicing/debit-notes">Debit Notes</Link></li>
              <li className="breadcrumb-item active">{dn.debit_number || dn.invoice_number}</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          {dn.status === 'DRAFT' && (
            <>
              <Link to={`/invoicing/debit-notes/edit/${id}`} className="btn btn-outline-warning rounded-pill px-3">
                <i className="isax isax-edit me-1"></i>Edit
              </Link>
              <button className="btn btn-primary rounded-pill px-4" onClick={handlePost} disabled={processing}>
                {processing ? 'Posting...' : 'Post Return'}
              </button>
            </>
          )}
          
          {(dn.status === 'DRAFT' || dn.status === 'POSTED') && (
            <button className="btn btn-outline-danger rounded-pill px-3" onClick={handleCancel} disabled={processing}>
              <i className="isax isax-trash me-1"></i>Cancel
            </button>
          )}
          
          <button className="btn btn-outline-dark rounded-pill px-3" onClick={() => window.print()}>
            <i className="isax isax-printer me-1"></i>Print
          </button>
        </div>
      </div>

      <div className="row g-4 print-content">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between flex-wrap gap-4 mb-5">
                <div className="text-start">
                  <h6 className="text-uppercase text-muted fs-12 fw-bold mb-3">From</h6>
                  <h5 className="fw-bold mb-1">{companySettings?.company_name || 'Your Company'}</h5>
                  <p className="text-muted mb-0 fs-13" style={{ maxWidth: '250px' }}>
                    {companySettings?.address}<br />
                    GSTIN: {companySettings?.gstin}
                  </p>
                </div>
                <div className="text-end">
                  <h6 className="text-uppercase text-muted fs-12 fw-bold mb-3">To (Vendor)</h6>
                  <h5 className="fw-bold mb-1">{dn.vendor?.name}</h5>
                  <p className="text-muted mb-0 fs-13" style={{ maxWidth: '250px' }}>
                    {dn.vendor?.address}<br />
                    GSTIN: {dn.vendor?.gstin}
                  </p>
                </div>
              </div>

              <div className="row g-3 mb-5 py-3 bg-light rounded-12">
                <div className="col-sm-3 col-6 border-end">
                  <span className="text-muted fs-12 d-block mb-1">Return Date</span>
                  <span className="fw-bold text-dark">{dn.debit_date || dn.date}</span>
                </div>
                <div className="col-sm-3 col-6 border-end">
                  <span className="text-muted fs-12 d-block mb-1">Linked Purchase</span>
                  <span className="fw-bold text-primary">{dn.original_invoice_number || 'Direct'}</span>
                </div>
                <div className="col-sm-3 col-6 border-end text-center">
                  <span className="text-muted fs-12 d-block mb-1">Status</span>
                  <span className={`badge badge-sm rounded-pill ${dn.status === 'POSTED' ? 'bg-success' : 'bg-primary'}`}>
                    {dn.status}
                  </span>
                </div>
                <div className="col-sm-3 col-6 text-end px-3">
                  <span className="text-muted fs-12 d-block mb-1">Total Debit</span>
                  <span className="fw-bold text-primary h5 mb-0">₹{dn.net_amount?.toLocaleString()}</span>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table border-top">
                  <thead>
                    <tr className="bg-light bg-opacity-50">
                      <th className="ps-0" style={{ width: '50%' }}>Item Description</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>Tax %</th>
                      <th className="text-end pe-0">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(dn.items || []).map((item, idx) => (
                      <tr key={idx}>
                        <td className="ps-0">
                          <span className="fw-bold text-dark">{item.item?.name || item.description}</span>
                          <span className="d-block fs-12 text-muted mt-1">HSN: {item.hsn_code || item.item?.hsn_code || '-'}</span>
                        </td>
                        <td>{item.qty}</td>
                        <td>₹{item.rate?.toLocaleString()}</td>
                        <td>{item.gst_rate}%</td>
                        <td className="text-end pe-0 fw-bold text-dark">₹{item.net_amount?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <h6 className="mb-0 fw-bold underline">Summary Breakdown</h6>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2 fs-14">
                <span className="text-muted">Taxable Amount</span>
                <span className="fw-bold">₹{dn.taxable_amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              {isInterState ? (
                <div className="d-flex justify-content-between mb-2 fs-14">
                  <span className="text-muted">IGST Total</span>
                  <span className="fw-bold">₹{dn.tax_amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              ) : (
                <>
                  <div className="d-flex justify-content-between mb-2 fs-14">
                    <span className="text-muted">CGST Total</span>
                    <span className="fw-bold">₹{(dn.tax_amount / 2)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 fs-14">
                    <span className="text-muted">SGST Total</span>
                    <span className="fw-bold">₹{(dn.tax_amount / 2)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </>
              )}
              <hr className="my-3 opacity-10" />
              <div className="d-flex justify-content-between align-items-center">
                <span className="h5 fw-bold mb-0">Total Return</span>
                <span className="h4 fw-bold text-primary mb-0">₹{dn.net_amount?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h6 className="mb-0 fw-bold">Notes / Remarks</h6>
            </div>
            <div className="card-body">
              <p className="text-muted fs-13 mb-0 italic">
                {dn.remarks || 'No additional internal notes provided for this return.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebitNoteDetails;

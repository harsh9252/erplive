import React from 'react';
import { INDIAN_STATES } from '../../utils/constants';

const ServiceLayout = ({ invoice, company, activeCompany }) => {
  const seller = activeCompany || company || {};
  const sellerGstin = seller.gstin || seller.gst_number || company?.gstin || company?.gst_number || 'N/A';
  const sellerPan = seller.pan || seller.pan_number || company?.pan || company?.pan_number || 'N/A';
  const sellerEmail = seller.email || company?.email || '';
  const sellerPhone = seller.phone || company?.phone || '';
  const sellerTan = seller.tan || company?.tan || '';
  const sellerCin = seller.cin || company?.cin || '';

  const getStateName = (code) => {
    if (!code) return 'N/A';
    const state = INDIAN_STATES.find(s => s.code === String(code));
    return state ? `${code} - ${state.name}` : code;
  };
  
  const formatAddress = (address, city, state) => {
    const parts = [address, city, state].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };
  
  return (
    <div className="invoice-service-layout p-5 bg-white border">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-uppercase tracking-wider mb-2">Service Invoice</h2>
        <div className="h-1 bg-primary w-25 mx-auto"></div>
      </div>

      <div className="row mb-5">
        <div className="col-6">
          <h5 className="fw-bold text-primary mb-2">{seller?.name}</h5>
          <p className="fs-14 mb-1">{seller?.address}</p>
          <p className="fs-14 mb-1">GSTIN: {sellerGstin}</p>
          <p className="fs-14 mb-1">PAN: {sellerPan}</p>
          {sellerTan && <p className="fs-14 mb-1">TAN: {sellerTan}</p>}
          {sellerCin && <p className="fs-14 mb-1">CIN: {sellerCin}</p>}
          {sellerEmail && <p className="fs-14 mb-1">Email: {sellerEmail}</p>}
          {sellerPhone && <p className="fs-14 mb-0">Phone: {sellerPhone}</p>}
        </div>
        <div className="col-6 text-end">
          <p className="mb-1 text-muted uppercase fs-11 fw-bold">Bill To</p>
          <h5 className="fw-bold mb-1">{invoice.customer?.name}</h5>
          <p className="fs-14 mb-1">{formatAddress(invoice.customer?.address, invoice.customer?.city, invoice.customer?.state)}</p>
          {invoice.customer?.pincode && <p className="fs-14 mb-1">Pincode: {invoice.customer.pincode}</p>}
          <p className="fs-14 mb-1">GSTIN: {invoice.customer?.gstin || 'N/A'}</p>
          {invoice.customer?.pan && <p className="fs-14 mb-1">PAN: {invoice.customer.pan}</p>}
          {invoice.customer?.email && <p className="fs-14 mb-1">Email: {invoice.customer.email}</p>}
          {invoice.customer?.phone && <p className="fs-14 mb-1">Phone: {invoice.customer.phone}</p>}
          <p className="fs-14 mb-0 mt-1">Place of Supply: {getStateName(invoice.place_of_supply)}</p>
        </div>
      </div>

      <div className="row py-3 bg-light rounded-3 mb-5 border">
        <div className="col-4 border-end">
          <span className="d-block fs-11 text-muted uppercase fw-bold mb-1">Invoice #</span>
          <span className="fw-bold">{invoice.invoice_number}</span>
        </div>
        <div className={(invoice.due_date || invoice.dueDate) || (invoice.sales_order_number || invoice.sales_order_id) ? "col-3 border-end" : "col-4 border-end"}>
          <span className="d-block fs-11 text-muted uppercase fw-bold mb-1">Date of Issue</span>
          <span className="fw-bold">{invoice.invoice_date}</span>
        </div>
        {(invoice.due_date || invoice.dueDate) && (
          <div className={(invoice.sales_order_number || invoice.sales_order_id) ? "col-3 border-end" : "col-5 border-end"}>
            <span className="d-block fs-11 text-muted uppercase fw-bold mb-1">Due Date</span>
            <span className="fw-bold">{invoice.due_date || invoice.dueDate}</span>
          </div>
        )}
        {(invoice.sales_order_number || invoice.sales_order_id) && (
          <div className={(invoice.due_date || invoice.dueDate) ? "col-3 border-end" : "col-5 border-end"}>
            <span className="d-block fs-11 text-muted uppercase fw-bold mb-1">Sales Order</span>
            <span className="fw-bold">{invoice.sales_order_number || invoice.sales_order_id}</span>
          </div>
        )}
        <div className={(invoice.due_date || invoice.dueDate) && (invoice.sales_order_number || invoice.sales_order_id) ? "col-3" : (invoice.due_date || invoice.dueDate) || (invoice.sales_order_number || invoice.sales_order_id) ? "col-4" : "col-4"}>
          <span className="d-block fs-11 text-muted uppercase fw-bold mb-1">Amount Due</span>
          <span className="fw-bold text-primary">₹{Number(invoice.net_total).toLocaleString()}</span>
        </div>
      </div>

      <div className="mb-5">
        <table className="table table-borderless align-middle">
          <thead className="border-bottom border-2 border-dark">
            <tr className="fs-12 fw-bold text-uppercase">
              <th>Description of Services</th>
              <th width="120" className="text-center">SAC Code</th>
              {invoice.show_discount && <th width="100" className="text-end">Disc%</th>}
              <th width="150" className="text-end">Amount</th>
            </tr>
          </thead>
          <tbody>
            {(invoice.items || []).map((item, idx) => (
              <tr key={idx} className="border-bottom">
                <td className="py-3">
                  <p className="fw-bold mb-1">{item.item?.name || item.name}</p>
                  <p className="fs-13 text-muted mb-0">{item.description}</p>
                </td>
                <td className="text-center text-muted fs-13">{item.hsn_code || '-'}</td>
                {invoice.show_discount && <td className="text-end fs-13">{Number(item.discount_pct || 0).toFixed(2)}%</td>}
                <td className="text-end fw-bold">₹{Number(item.taxable_amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row justify-content-end">
        <div className="col-md-5">
           <div className="p-4 bg-light rounded-4 border">
              <div className="d-flex justify-content-between mb-2 fs-14">
                <span className="text-muted">Subtotal</span>
                <span>₹{Number(invoice.taxable_amount).toFixed(2)}</span>
              </div>
              {Number(invoice.igst) > 0 && (
                <div className="d-flex justify-content-between mb-2 fs-14">
                  <span className="text-muted">IGST</span>
                  <span>₹{Number(invoice.igst).toFixed(2)}</span>
                </div>
              )}
              {Number(invoice.cgst) > 0 && (
                <>
                  <div className="d-flex justify-content-between mb-2 fs-14">
                    <span className="text-muted">CGST</span>
                    <span>₹{Number(invoice.cgst).toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 fs-14">
                    <span className="text-muted">SGST</span>
                    <span>₹{Number(invoice.sgst).toFixed(2)}</span>
                  </div>
                </>
              )}
              {(() => {
                try {
                  const charges = typeof invoice.additional_charges === 'string' 
                    ? JSON.parse(invoice.additional_charges || '[]') 
                    : (invoice.additional_charges || []);
                  return charges.map((charge, idx) => (
                    <div key={`charge-${idx}`} className="d-flex justify-content-between mb-2 fs-14">
                      <span className="text-muted">{charge.name || 'Additional Charge'}</span>
                      <span>₹{Number(charge.amount || 0).toFixed(2)}</span>
                    </div>
                  ));
                } catch (e) {
                  return null;
                }
              })()}
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold uppercase">Total</span>
                <span className="h4 fw-bold mb-0 text-primary">₹{Number(invoice.net_total).toLocaleString()}</span>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-5 pt-5">
         <div className="row">
           <div className="col-8">
             <h6 className="fw-bold fs-13 mb-2 text-decoration-underline">Payment Instructions</h6>
             <p className="fs-12 text-muted mb-1">Please make payment via Bank Transfer or Cheque.</p>
             <p className="fs-12 text-muted mb-0">For any queries, please contact us at {seller?.email}.</p>
           </div>
           <div className="col-4 text-center">
             <div className="mb-4" style={{height: '60px', opacity: 0.1, borderBottom: '1px solid black'}}></div>
             <p className="fw-bold fs-12 mb-0 uppercase">Manager Signature</p>
           </div>
         </div>
      </div>
    </div>
  );
};

export default ServiceLayout;

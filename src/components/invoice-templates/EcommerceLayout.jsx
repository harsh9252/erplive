import React from 'react';
import { INDIAN_STATES } from '../../utils/constants';

const EcommerceLayout = ({ invoice, company, activeCompany }) => {
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
    <div className="invoice-ecommerce-layout p-4 bg-white shadow-sm border rounded-16">
      <div className="d-flex justify-content-between align-items-start mb-5 pb-4 border-bottom">
        <div>
          <h3 className="fw-bold text-primary mb-1">{seller?.name}</h3>
          <p className="fs-13 text-muted mb-0">{seller?.address}</p>
          <p className="fs-13 text-muted mb-0">GSTIN: <span className="text-dark fw-bold">{sellerGstin}</span></p>
          <p className="fs-13 text-muted mb-0">PAN: <span className="text-dark fw-bold">{sellerPan}</span></p>
          {sellerTan && <p className="fs-13 text-muted mb-0">TAN: <span className="text-dark fw-bold">{sellerTan}</span></p>}
          {sellerCin && <p className="fs-13 text-muted mb-0">CIN: <span className="text-dark fw-bold">{sellerCin}</span></p>}
          {sellerEmail && <p className="fs-13 text-muted mb-0">Email: <span className="text-dark fw-bold">{sellerEmail}</span></p>}
          {sellerPhone && <p className="fs-13 text-muted">Phone: <span className="text-dark fw-bold">{sellerPhone}</span></p>}
        </div>
        <div className="text-end">
          <h4 className="fw-bold text-muted uppercase fs-14 mb-3 tracking-tighter">Tax Invoice (E-Commerce)</h4>
          <div className="bg-light p-3 rounded-12 border">
            <p className="mb-1 fs-12 text-muted">Invoice Ref #</p>
            <p className="fw-bold mb-0 text-primary">{invoice.invoice_number}</p>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-4">
          <h6 className="fs-11 text-muted uppercase fw-bold mb-2">Customer Details</h6>
          <h6 className="fw-bold mb-1">{invoice.customer?.name}</h6>
          <p className="fs-13 text-muted mb-1">{formatAddress(invoice.customer?.address, invoice.customer?.city, invoice.customer?.state)}</p>
          {invoice.customer?.pincode && <p className="fs-13 text-muted mb-1">Pincode: <span className="text-dark fw-bold">{invoice.customer.pincode}</span></p>}
          <p className="fs-13 text-muted mb-1">GSTIN: <span className="text-dark fw-bold">{invoice.customer?.gstin || 'Unregistered'}</span></p>
          {invoice.customer?.pan && <p className="fs-13 text-muted mb-1">PAN: <span className="text-dark fw-bold">{invoice.customer.pan}</span></p>}
          {invoice.customer?.email && <p className="fs-13 text-muted mb-1">Email: <span className="text-dark fw-bold">{invoice.customer.email}</span></p>}
          {invoice.customer?.phone && <p className="fs-13 text-muted">Phone: <span className="text-dark fw-bold">{invoice.customer.phone}</span></p>}
        </div>
        <div className="col-4 border-start border-end px-4">
          <h6 className="fs-11 text-muted uppercase fw-bold mb-2">Platform Details</h6>
          <p className="fs-13 mb-1">E-Commerce Op: <span className="fw-bold">Marketplace Platform</span></p>
          <p className="fs-13 mb-0">Operator GSTIN: <span className="fw-bold text-primary">{invoice.ecommerce_operator_gstin || 'N/A'}</span></p>
        </div>
        <div className="col-4 text-end">
          <h6 className="fs-11 text-muted uppercase fw-bold mb-2">Order Details</h6>
          <p className="fs-13 mb-1">Date: <span className="fw-bold">{invoice.invoice_date}</span></p>
          <p className="fs-13 mb-1">Order #: <span className="fw-bold">{invoice.sales_order_number || invoice.sales_order_id || '-'}</span></p>
          {(invoice.due_date || invoice.dueDate) && <p className="fs-13 mb-1">Due Date: <span className="fw-bold">{invoice.due_date || invoice.dueDate}</span></p>}
          <p className="fs-13 mb-0">Place of Supply: <span className="fw-bold">{getStateName(invoice.place_of_supply)}</span></p>
        </div>
      </div>

      <div className="table-responsive mb-5">
        <table className="table table-hover align-middle">
          <thead className="bg-primary bg-opacity-10">
            <tr className="fs-12 fw-bold text-primary text-uppercase">
              <th>Item / SKU</th>
              <th width="100">HSN</th>
              <th width="80" className="text-center">Qty</th>
              <th width="100" className="text-end">Unit Price</th>
              {invoice.show_discount && <th width="80" className="text-end">Disc%</th>}
              <th width="100" className="text-end">Taxable</th>
              <th width="100" className="text-end">Tax</th>
              <th width="100" className="text-end">Total</th>
            </tr>
          </thead>
          <tbody className="border-top-0">
            {(invoice.items || []).map((item, idx) => {
               const tax = (item.igst_amount || 0) + (item.cgst_amount || 0) + (item.sgst_amount || 0);
               return (
                <tr key={idx} className="fs-13">
                  <td>
                    <p className="fw-bold mb-0">{item.item?.name || item.name}</p>
                    <small className="text-muted">{item.description}</small>
                  </td>
                  <td className="text-muted">{item.hsn_code}</td>
                  <td className="text-center">{item.qty}</td>
                  <td className="text-end">₹{Number(item.rate).toFixed(2)}</td>
                  {invoice.show_discount && <td className="text-end">{Number(item.discount_pct || 0).toFixed(2)}%</td>}
                  <td className="text-end">₹{Number(item.taxable_amount).toFixed(2)}</td>
                  <td className="text-end text-muted">₹{Number(tax).toFixed(2)}</td>
                  <td className="text-end fw-bold">₹{Number(item.total_amount).toFixed(2)}</td>
                </tr>
               );
            })}
          </tbody>
        </table>
      </div>

      <div className="row align-items-center">
        <div className="col-md-7">
           <div className="p-3 bg-light rounded-12 border-dashed border">
             <p className="fs-11 text-muted uppercase fw-bold mb-2">Declaration</p>
             <p className="fs-11 text-muted mb-0 lh-sm">
               We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct. 
               This is a computer generated invoice and does not require signature.
             </p>
           </div>
        </div>
        <div className="col-md-5">
           <div className="summary-list px-3">
              <div className="d-flex justify-content-between mb-2 fs-14 text-muted">
                <span>Taxable Value</span>
                <span>₹{Number(invoice.taxable_amount).toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 fs-14 text-muted">
                <span>GST Total</span>
                <span>₹{Number((invoice.igst || 0) + (invoice.cgst || 0) + (invoice.sgst || 0)).toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 fs-14 text-muted">
                <span>TCS (if applicable)</span>
                <span>-</span>
              </div>
              {(() => {
                try {
                  const charges = typeof invoice.additional_charges === 'string' 
                    ? JSON.parse(invoice.additional_charges || '[]') 
                    : (invoice.additional_charges || []);
                  return charges.map((charge, idx) => (
                    <div key={`charge-${idx}`} className="d-flex justify-content-between mb-2 fs-14 text-muted">
                      <span>{charge.name || 'Additional Charge'}</span>
                      <span>₹{Number(charge.amount || 0).toLocaleString()}</span>
                    </div>
                  ));
                } catch (e) {
                  return null;
                }
              })()}
              <hr className="my-3" />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold h6 mb-0 uppercase">Net Payable</span>
                <span className="h4 fw-bold mb-0 text-primary">₹{Number(invoice.net_total).toLocaleString()}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceLayout;

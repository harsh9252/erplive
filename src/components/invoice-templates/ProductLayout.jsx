import React from 'react';
import { INDIAN_STATES } from '../../utils/constants';

const ProductLayout = ({ invoice, company, activeCompany, uoms = [] }) => {
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
  
  const getUomSymbol = (uom_id) => {
    if (!uom_id) return '';
    if (uom_id.symbol) return uom_id.symbol;
    const found = uoms.find(u => String(u.id) === String(uom_id));
    return found ? found.symbol : String(uom_id);
  };
  
  return (
    <div className="invoice-product-layout p-4 bg-white">
      <div className="row mb-4">
        <div className="col-8">
          <h4 className="fw-bold text-uppercase mb-3">Tax Invoice</h4>
          <h5 className="fw-bold mb-1">{seller?.name || 'Your Company'}</h5>
          <p className="fs-13 mb-1">{seller?.address}</p>
          <p className="fs-13 mb-1">GSTIN: <strong>{sellerGstin}</strong></p>
          <p className="fs-13 mb-1">PAN: <strong>{sellerPan}</strong></p>
          {sellerTan && <p className="fs-13 mb-1">TAN: <strong>{sellerTan}</strong></p>}
          {sellerCin && <p className="fs-13 mb-1">CIN: <strong>{sellerCin}</strong></p>}
          {sellerEmail && <p className="fs-13 mb-1">Email: <strong>{sellerEmail}</strong></p>}
          {sellerPhone && <p className="fs-13 mb-0">Phone: <strong>{sellerPhone}</strong></p>}
        </div>
        <div className="col-4 text-end">
          <div className="mb-3">
             <h6 className="text-muted fs-11 uppercase mb-1">Invoice Number</h6>
             <h5 className="fw-bold text-primary">{invoice.invoice_number}</h5>
          </div>
          <div className={(invoice.due_date || invoice.dueDate) || (invoice.sales_order_number || invoice.sales_order_id) ? "mb-3" : ""}>
             <h6 className="text-muted fs-11 uppercase mb-1">Invoice Date</h6>
             <p className="fw-bold mb-0">{invoice.invoice_date}</p>
          </div>
          {(invoice.due_date || invoice.dueDate) && (
            <div className={(invoice.sales_order_number || invoice.sales_order_id) ? "mb-3" : ""}>
               <h6 className="text-muted fs-11 uppercase mb-1">Due Date</h6>
               <p className="fw-bold mb-0">{invoice.due_date || invoice.dueDate}</p>
            </div>
          )}
          {(invoice.sales_order_number || invoice.sales_order_id) && (
            <div>
               <h6 className="text-muted fs-11 uppercase mb-1">Sales Order No</h6>
               <p className="fw-bold mb-0">{invoice.sales_order_number || invoice.sales_order_id}</p>
            </div>
          )}
        </div>
      </div>

      <hr className="my-4 opacity-10" />

      <div className="row mb-5">
        <div className="col-6">
          <h6 className="text-muted fs-11 uppercase fw-bold mb-3 text-decoration-underline">Billing Details</h6>
          <h6 className="fw-bold mb-1">{invoice.customer?.name || invoice.customer_name}</h6>
          <p className="fs-13 mb-1">{formatAddress(invoice.customer?.address, invoice.customer?.city, invoice.customer?.state)}</p>
          {invoice.customer?.pincode && <p className="fs-13 mb-1">Pincode: <strong>{invoice.customer.pincode}</strong></p>}
          <p className="fs-13 mb-1">GSTIN: <strong>{invoice.customer?.gstin || 'N/A'}</strong></p>
          {invoice.customer?.pan && <p className="fs-13 mb-1">PAN: <strong>{invoice.customer.pan}</strong></p>}
          {invoice.customer?.email && <p className="fs-13 mb-1">Email: <strong>{invoice.customer.email}</strong></p>}
          {invoice.customer?.phone && <p className="fs-13 mb-1">Phone: <strong>{invoice.customer.phone}</strong></p>}
          <p className="fs-13 mb-0">Place of Supply: <strong>{getStateName(invoice.place_of_supply)}</strong></p>
        </div>
        <div className="col-6 text-end">
          <h6 className="text-muted fs-11 uppercase fw-bold mb-3 text-decoration-underline">Shipping Details</h6>
          <h6 className="fw-bold mb-1">{invoice.customer?.name || invoice.customer_name}</h6>
          <p className="fs-13 mb-1">{invoice.shipping_address || formatAddress(invoice.customer?.address, invoice.customer?.city, invoice.customer?.state)}</p>
        </div>
      </div>

      <div className="table-responsive mb-4">
        <table className="table table-bordered border-dark align-middle">
          <thead className="bg-light border-dark">
            <tr className="fs-11 fw-bold text-uppercase">
              <th width="40">#</th>
              <th>Item Description</th>
              <th width="100">HSN</th>
              <th width="80" className="text-center">Qty</th>
              <th width="60">UOM</th>
              <th width="100" className="text-end">Rate</th>
              {invoice.show_discount && <th width="80" className="text-end">Disc%</th>}
              <th width="100" className="text-end">Amount</th>
            </tr>
          </thead>
          <tbody>
            {(invoice.items || []).map((item, idx) => (
              <tr key={idx} className="fs-12">
                <td>{idx + 1}</td>
                <td>
                  <p className="fw-bold mb-0">{item.item?.name || item.name}</p>
                  <small className="text-muted">{item.description}</small>
                </td>
                <td>{item.hsn_code}</td>
                <td className="text-center">{item.qty}</td>
                <td>{getUomSymbol(item.uom_id)}</td>
                <td className="text-end">{Number(item.rate).toFixed(2)}</td>
                {invoice.show_discount && <td className="text-end">{Number(item.discount_pct || 0).toFixed(2)}%</td>}
                <td className="text-end fw-bold">{Number(item.taxable_amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="fw-bold fs-12">
            <tr>
              <td colSpan={invoice.show_discount ? 5 : 4}></td>
              <td colSpan="2" className="text-end text-nowrap">Taxable Amount</td>
              <td className="text-end">₹{Number(invoice.taxable_amount).toFixed(2)}</td>
            </tr>
            {Number(invoice.igst) > 0 && (
              <tr>
                <td colSpan={invoice.show_discount ? 5 : 4}></td>
                <td colSpan="2" className="text-end text-nowrap">IGST Total</td>
                <td className="text-end">₹{Number(invoice.igst).toFixed(2)}</td>
              </tr>
            )}
            {Number(invoice.cgst) > 0 && (
              <>
                <tr>
                  <td colSpan={invoice.show_discount ? 5 : 4}></td>
                  <td colSpan="2" className="text-end text-nowrap">CGST Total</td>
                  <td className="text-end">₹{Number(invoice.cgst).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={invoice.show_discount ? 5 : 4}></td>
                  <td colSpan="2" className="text-end text-nowrap">SGST Total</td>
                  <td className="text-end">₹{Number(invoice.sgst).toFixed(2)}</td>
                </tr>
              </>
            )}
            {(() => {
              try {
                const charges = typeof invoice.additional_charges === 'string' 
                  ? JSON.parse(invoice.additional_charges || '[]') 
                  : (invoice.additional_charges || []);
                return charges.map((charge, idx) => (
                  <tr key={`charge-${idx}`}>
                    <td colSpan={invoice.show_discount ? 5 : 4}></td>
                    <td colSpan="2" className="text-end text-nowrap">{charge.name || 'Additional Charge'}</td>
                    <td className="text-end">₹{Number(charge.amount || 0).toFixed(2)}</td>
                  </tr>
                ));
              } catch (e) {
                return null;
              }
            })()}
            {Number(invoice.round_off) !== 0 && (
              <tr>
                <td colSpan={invoice.show_discount ? 5 : 4}></td>
                <td colSpan="2" className="text-end text-nowrap">Round Off</td>
                <td className="text-end">{Number(invoice.round_off) > 0 ? '+' : ''}{Number(invoice.round_off).toFixed(2)}</td>
              </tr>
            )}
            <tr className="bg-light fs-14">
              <td colSpan={invoice.show_discount ? 5 : 4}></td>
              <td colSpan="2" className="text-end text-uppercase fw-bold text-nowrap">Grand Total</td>
              <td className="text-end fw-bold text-primary">₹{Number(invoice.net_total).toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="row mt-5 pt-3">
        <div className="col-7 fs-12">
          {invoice.remarks && (
            <div className="mb-3">
              <p className="mb-1"><strong>Remarks:</strong></p>
              <p className="text-muted lh-sm">{invoice.remarks}</p>
            </div>
          )}
          <p className="mb-2"><strong>Terms & Conditions:</strong></p>
          <p className="text-muted lh-sm">{invoice.terms_and_conditions || 'Goods once sold will not be taken back.'}</p>
        </div>
        <div className="col-5 text-center">
          <div className="border-bottom border-dark mb-2" style={{height: '60px'}}></div>
          <p className="fs-12 fw-bold mb-0 text-uppercase">Authorized Signatory</p>
          <p className="fs-11 text-muted">For {seller?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;

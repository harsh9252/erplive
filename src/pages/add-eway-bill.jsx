import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddEWayBill() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    sales_invoice_id: '',
    ewb_date: '',
    valid_upto: '',
    supply_type: 'OUTWARD',
    sub_supply_type: 'SUPPLY',
    document_type: 'INV',
    from_gstin: '',
    from_address: '',
    from_state: '',
    to_gstin: '',
    to_address: '',
    to_state: '',
    transport_mode: 'ROAD',
    vehicle_number: '',
    transporter_id: '',
    transporter_name: '',
    lr_number: '',
    lr_date: '',
    distance_km: '',
  });

  const [message, setMessage] = useState('');

  const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bill = {
      id: 'EWB-' + Date.now(),
      ...form,
      status: 'DRAFT',
      created_at: new Date().toISOString(),
    };
    const bills = JSON.parse(localStorage.getItem('eWayBills') || '[]');
    bills.push(bill);
    localStorage.setItem('eWayBills', JSON.stringify(bills));
    setMessage('E-Way Bill created successfully!');
    setTimeout(() => {
      navigate('/eway-bills');
    }, 1500);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Create E-Way Bill</h6>
        </div>
      </div>

      {message && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Invoice & Date Section */}
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Sales Invoice <span className="text-danger">*</span></label>
                  <input type="text" name="sales_invoice_id" value={form.sales_invoice_id} onChange={handleChange} className="form-control" placeholder="INV-001" required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">E-Way Bill Date <span className="text-danger">*</span></label>
                  <input type="date" name="ewb_date" value={form.ewb_date} onChange={handleChange} className="form-control" required />
                </div>
              </div>
            </div>

            {/* Supply Type Section */}
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Supply Type <span className="text-danger">*</span></label>
                  <select name="supply_type" value={form.supply_type} onChange={handleChange} className="form-control" required>
                    <option value="OUTWARD">OUTWARD</option>
                    <option value="INWARD">INWARD</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Sub Type <span className="text-danger">*</span></label>
                  <select name="sub_supply_type" value={form.sub_supply_type} onChange={handleChange} className="form-control" required>
                    <option value="SUPPLY">SUPPLY</option>
                    <option value="IMPORT">IMPORT</option>
                    <option value="EXPORT">EXPORT</option>
                    <option value="JOB_WORK">JOB_WORK</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Document Type <span className="text-danger">*</span></label>
                  <select name="document_type" value={form.document_type} onChange={handleChange} className="form-control" required>
                    <option value="INV">INV</option>
                    <option value="CHL">CHL</option>
                    <option value="BIL">BIL</option>
                  </select>
                </div>
              </div>
            </div>

            {/* From Section */}
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">From GSTIN <span className="text-danger">*</span></label>
                  <input type="text" name="from_gstin" value={form.from_gstin} onChange={handleChange} className="form-control" placeholder="15AABCT1234H1Z0" required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">From State <span className="text-danger">*</span></label>
                  <select name="from_state" value={form.from_state} onChange={handleChange} className="form-control" required>
                    <option value="">Select State</option>
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">From Address <span className="text-danger">*</span></label>
                  <textarea name="from_address" value={form.from_address} onChange={handleChange} className="form-control" rows="3" placeholder="Enter complete address" required></textarea>
                </div>
              </div>
            </div>

            {/* To Section */}
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">To GSTIN <span className="text-danger">*</span></label>
                  <input type="text" name="to_gstin" value={form.to_gstin} onChange={handleChange} className="form-control" placeholder="15AABCT1234H1Z0" required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">To State <span className="text-danger">*</span></label>
                  <select name="to_state" value={form.to_state} onChange={handleChange} className="form-control" required>
                    <option value="">Select State</option>
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">To Address <span className="text-danger">*</span></label>
                  <textarea name="to_address" value={form.to_address} onChange={handleChange} className="form-control" rows="3" placeholder="Enter complete address" required></textarea>
                </div>
              </div>
            </div>

            {/* Transport Section */}
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Transport Mode <span className="text-danger">*</span></label>
                  <select name="transport_mode" value={form.transport_mode} onChange={handleChange} className="form-control" required>
                    <option value="ROAD">ROAD</option>
                    <option value="RAIL">RAIL</option>
                    <option value="AIR">AIR</option>
                    <option value="SHIP">SHIP</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Distance (KM) <span className="text-danger">*</span></label>
                  <input type="number" name="distance_km" value={form.distance_km} onChange={handleChange} className="form-control" placeholder="0" required />
                </div>
              </div>
            </div>

            {/* Vehicle & Transporter Section */}
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Vehicle Number</label>
                  <input type="text" name="vehicle_number" value={form.vehicle_number} onChange={handleChange} className="form-control" placeholder="MH01AB1234" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Transporter ID (GSTIN)</label>
                  <input type="text" name="transporter_id" value={form.transporter_id} onChange={handleChange} className="form-control" placeholder="15AABCT1234H1Z0" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Transporter Name</label>
                  <input type="text" name="transporter_name" value={form.transporter_name} onChange={handleChange} className="form-control" placeholder="Transporter Name" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">LR/RR Number</label>
                  <input type="text" name="lr_number" value={form.lr_number} onChange={handleChange} className="form-control" placeholder="LR-001" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">LR Date</label>
                  <input type="date" name="lr_date" value={form.lr_date} onChange={handleChange} className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Valid Upto</label>
                  <input type="date" name="valid_upto" value={form.valid_upto} onChange={handleChange} className="form-control" placeholder="Auto-calculated" disabled />
                </div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">Create E-Way Bill</button>
              <button type="button" onClick={() => navigate('/eway-bills')} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

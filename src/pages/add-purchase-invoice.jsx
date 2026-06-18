import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import vendorService, { searchVendors } from '../services/vendorService';
import { getItems, searchItems } from '../services/itemService';
import { getWarehouses, getCompanySettings, getVoucherSeries, getVoucherTypes } from '../services/settingsService';
// Wait, getUoms is in uomService. Let's import it from there.
import { getUoms } from '../services/uomService';
import { createPurchaseInvoice } from '../services/purchaseInvoiceService';
import purchaseOrderService from '../services/purchaseOrderService';
import branchService from '../services/branchService';
import hsnSacService from '../services/hsnSacService';
import financialYearService from '../services/financialYearService';
import ProductFormModal from '../components/ProductFormModal';
import { INDIAN_STATES } from '../utils/constants';
import AsyncSearchableSelect from '../components/AsyncSearchableSelect';
import VendorFormModal from '../components/VendorFormModal';

const AddPurchaseInvoice = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [uoms, setUoms] = useState([]);
  const [productModal, setProductModal] = useState({ isOpen: false, index: null });
  const [vendorModalOpen, setVendorModalOpen] = useState(false);
  const [vendorFormLoading, setVendorFormLoading] = useState(false);
  const [companySettings, setCompanySettings] = useState(null);
  const [availableSeries, setAvailableSeries] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [financialYears, setFinancialYears] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    vendor_id: '',
    branch_id: '',
    voucher_series_id: '',
    invoice_number: '',
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: '',
    place_of_supply: '',
    purchase_order_id: '',
    remarks: '',
    terms_and_conditions: '',
    items: [
      {
        item_id: '',
        description: '',
        qty: 1,
        rate: 0,
        discount_pct: 0,
        gst_rate: 18,
        tax_type: 'TAXABLE',
        uom_id: '',
        warehouse_id: '',
        itc_eligibility: 'ELIGIBLE'
      }
    ],
    invoice_layout: 'PRODUCTS',
    show_discount: true,
    ecommerce_operator_gstin: '',
    additional_charges: [
      { name: '', amount: 0, gstRate: 18 }
    ]
  });

  const fetchData = useCallback(async () => {
    try {
      const [vendorsRes, itemsRes, warehousesRes, settingsRes, uomsRes, branchRes, seriesRes, typesRes, fyRes, poRes] = await Promise.all([
        vendorService.getVendors(1, 1000),
        getItems(1, 1000),
        getWarehouses(),
        getCompanySettings(),
        getUoms(1, 1000),
        branchService.getBranches(),
        getVoucherSeries(),
        getVoucherTypes(),
        financialYearService.getFinancialYears(),
        purchaseOrderService.getPurchaseOrders(1, 1000)
      ]);

      setVendors(Array.isArray(vendorsRes.data) ? vendorsRes.data : (vendorsRes.data?.rows || []));
      setPurchaseOrders(Array.isArray(poRes.data) ? poRes.data : (poRes.data?.rows || []));
      setItems(Array.isArray(itemsRes.data) ? itemsRes.data : (itemsRes.data?.rows || []));
      setWarehouses(warehousesRes.data || warehousesRes || []);
      setCompanySettings(settingsRes.data || settingsRes);
      setUoms(Array.isArray(uomsRes.data) ? uomsRes.data : (uomsRes.data?.rows || []));
      const branchList = Array.isArray(branchRes.data) ? branchRes.data : [];
      setBranches(branchList);

      const fYearList = Array.isArray(fyRes.data) ? fyRes.data : (fyRes.data?.rows || fyRes || []);
      setFinancialYears(fYearList);
      const activeFY = fYearList.find(fy => fy.is_active) || fYearList[0];
      const fyStr = activeFY?.name ? `${activeFY.name}/` : '';

      const savedBranchId = localStorage.getItem('selectedBranchId');
      if (savedBranchId) {
        setFormData(prev => ({ ...prev, branch_id: savedBranchId }));
      } else if (branchList.length > 0) {
        setFormData(prev => ({ ...prev, branch_id: branchList[0].id }));
      }

      // Handle Voucher Series
      if (seriesRes?.data && typesRes?.data) {
        const purType = typesRes.data.find(t => t.code === 'PURCHASE_INVOICE' || t.name.toUpperCase() === 'PURCHASE INVOICE' || t.code === 'PURCHASE');
        if (purType) {
          const relatedSeries = seriesRes.data.filter(s => String(s.voucher_type_id) === String(purType.id));
          setAvailableSeries(relatedSeries);
          if (relatedSeries.length > 0) {
            const def = relatedSeries.find(s => s.is_default) || relatedSeries[0];
            setFormData(prev => ({
              ...prev,
              voucher_series_id: def.id.toString(),
              invoice_number: `${def.prefix || ''}${String(def.starting_number || '').padStart(def.padding || 0, '0')}${def.suffix || ''}`
            }));
          }
        }
      }

      if (settingsRes.data?.state_code || settingsRes.state_code) {
        setFormData(prev => ({
          ...prev,
          place_of_supply: settingsRes.data?.state_code || settingsRes.state_code
        }));
      }
    } catch (error) {
      console.error('Error fetching master data:', error);
      toast.error('Failed to load required data');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Listen for global branch updates
  useEffect(() => {
    const handleBranchUpdate = () => {
      const savedBranchId = localStorage.getItem('selectedBranchId');
      if (savedBranchId) {
        setFormData(prev => ({ ...prev, branch_id: savedBranchId }));
      }
    };
    window.addEventListener('BRANCH_UPDATED', handleBranchUpdate);
    return () => window.removeEventListener('BRANCH_UPDATED', handleBranchUpdate);
  }, []);

  const handleQuickVendorAdd = async (vendorData) => {
    try {
      setVendorFormLoading(true);
      const res = await vendorService.createVendor(vendorData);
      const newVendor = res.data?.data || res.data || res;
      toast.success('Vendor added successfully');
      setVendors(prev => [...prev, newVendor]);
      handleVendorSelect(newVendor);
      setVendorModalOpen(false);
    } catch (err) {
      console.error("Failed to add vendor", err);
      toast.error(err.message || "Failed to add vendor");
    } finally {
      setVendorFormLoading(false);
    }
  };

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'voucher_series_id' && value) {
        const selectedSeries = availableSeries.find(s => String(s.id) === String(value));
        if (selectedSeries) {
          updated.invoice_number = `${selectedSeries.prefix || ''}${String(selectedSeries.starting_number || '').padStart(selectedSeries.padding || 0, '0')}${selectedSeries.suffix || ''}`;
        }
      }
      return updated;
    });
  };

  const handleVendorSelect = (vendor) => {
    if (errors.vendor_id) setErrors(prev => ({ ...prev, vendor_id: null }));
    if (!vendor) return;
    setFormData(prev => ({
      ...prev,
      vendor_id: vendor.id,
      place_of_supply: vendor.state_code || companySettings?.state_code || companySettings?.data?.state_code || ''
    }));
  };

  const searchItemsFiltered = useCallback(async (query, limit) => {
    const response = await searchItems(query, limit);
    if (formData.invoice_layout === 'SERVICES') {
      if (response && response.data) {
        const rows = response.data?.items || response.data || [];
        const filtered = rows.filter(i => String(i.inventory_type).toLowerCase() === 'service');
        if (response.data?.items) {
          return { ...response, data: { ...response.data, items: filtered } };
        } else {
          return { ...response, data: filtered };
        }
      }
    }
    return response;
  }, [formData.invoice_layout]);

  const handleItemChange = async (index, field, value) => {
    const newItems = [...formData.items];

    if (field === 'item_id') {
      const selectedItem = value; // This is the full item object from AsyncSearchableSelect
      if (selectedItem) {
        // Fetch date-effective rate
        let gst = 18;
        try {
          const rateRes = await hsnSacService.getRateAtDate(selectedItem.id, formData.invoice_date);
          if (rateRes && rateRes.data) {
            gst = parseFloat(rateRes.data.gst_rate);
          } else {
            gst = parseFloat(selectedItem.gst_rate || selectedItem.tax_rate || selectedItem.taxRate || selectedItem.gstRate || 18);
          }
        } catch (err) {
          gst = parseFloat(selectedItem.gst_rate || selectedItem.tax_rate || selectedItem.taxRate || selectedItem.gstRate || 18);
        }

        // Resolve UOM ID
        let resolvedUomId = '';
        const potentialUomValues = [
          selectedItem.uom_id,
          selectedItem.unit_id,
          selectedItem.uom,
          selectedItem.unit,
          selectedItem.uom_symbol,
          selectedItem.unit_name
        ];

        for (const val of potentialUomValues) {
          if (!val) continue;
          const match = uoms.find(u =>
            String(u.id) === String(val) ||
            String(u.name).toLowerCase() === String(val).toLowerCase() ||
            String(u.symbol).toLowerCase() === String(val).toLowerCase()
          );
          if (match) {
            resolvedUomId = String(match.id);
            break;
          }
        }

        const today = new Date().toISOString().split('T')[0];
        const itemMfgDate = selectedItem.manufacture_date ? selectedItem.manufacture_date.split('T')[0] : null;
        const defaultMfgDate = itemMfgDate || (index > 0 && newItems[index - 1].mfg_date ? newItems[index - 1].mfg_date : today);
        const defaultExpiryDate = index > 0 && newItems[index - 1].expiry_date ? newItems[index - 1].expiry_date : today;
        const defaultWarehouse = index > 0 && newItems[index - 1].warehouse_id ? newItems[index - 1].warehouse_id : (newItems[index].warehouse_id || warehouses[0]?.id || '');

        newItems[index] = {
          ...newItems[index],
          item_id: selectedItem.id,
          description: selectedItem.name,
          hsn_code: selectedItem.hsn_code || selectedItem.hsnCode || selectedItem.hsn || '',
          rate: selectedItem.purchase_price || selectedItem.price || 0,
          gst_rate: gst,
          uom_id: resolvedUomId || selectedItem.uom_id || '',
          track_batch: selectedItem.track_batch || false,
          track_expiry: selectedItem.track_expiry || false,
          mfg_date: defaultMfgDate,
          expiry_date: defaultExpiryDate,
          warehouse_id: defaultWarehouse
        };
      }
    } else {
      newItems[index][field] = value;
    }

    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleProductCreated = (newProduct) => {
    if (productModal.index !== null) {
      handleItemChange(productModal.index, 'item_id', newProduct);
    }
  };

  // Add Effect to recalculate all tax rates when invoice date changes
  useEffect(() => {
    if (!formData.invoice_date || formData.items.every(i => !i.item_id)) return;

    const refreshRates = async () => {
      const updatedItems = await Promise.all(formData.items.map(async (item) => {
        if (!item.item_id) return item;
        try {
          const rateRes = await hsnSacService.getRateAtDate(item.item_id, formData.invoice_date);
          if (rateRes && rateRes.data) {
            return { ...item, gst_rate: parseFloat(rateRes.data.gst_rate) };
          }
        } catch (e) {
          console.warn("Failed to refresh rate for date", e);
        }
        return item;
      }));

      setFormData(prev => ({ ...prev, items: updatedItems }));
    };

    const timer = setTimeout(refreshRates, 500);
    return () => clearTimeout(timer);
  }, [formData.invoice_date]);

  const addItemRow = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          item_id: '',
          description: '',
          qty: 1,
          rate: 0,
          discount_pct: 0,
          gst_rate: 18,
          tax_type: 'TAXABLE',
          warehouse_id: prev.items[0]?.warehouse_id || '',
          itc_eligibility: 'ELIGIBLE'
        }
      ]
    }));
  };

  const removeItemRow = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, items: newItems }));
    }
  };

  const summary = useMemo(() => {
    let subtotal = 0;
    let totalTax = 0;
    const taxBreakdown = {};

    const isInterState = String(formData.place_of_supply).trim() !== String(companySettings?.state_code || companySettings?.data?.state_code || '27').trim();

    formData.items.forEach(item => {
      const amount = (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0);
      const discount = amount * (parseFloat(item.discount_pct) || 0) / 100;
      const taxable = amount - discount;
      const taxRes = taxable * (parseFloat(item.gst_rate) || 0) / 100;

      subtotal += taxable;
      totalTax += taxRes;

      if (isInterState) {
        const rate = item.gst_rate;
        taxBreakdown[`IGST ${rate}%`] = (taxBreakdown[`IGST ${rate}%`] || 0) + taxRes;
      } else {
        const rate = item.gst_rate / 2;
        taxBreakdown[`CGST ${rate}%`] = (taxBreakdown[`CGST ${rate}%`] || 0) + (taxRes / 2);
        taxBreakdown[`SGST ${rate}%`] = (taxBreakdown[`SGST ${rate}%`] || 0) + (taxRes / 2);
      }
    });

    const chargesTotal = formData.additional_charges.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);
    const chargesTax = formData.additional_charges.reduce((sum, c) => sum + ((parseFloat(c.amount) || 0) * (parseFloat(c.gstRate) || 0)) / 100, 0);

    const netTotal = subtotal + totalTax + chargesTotal + chargesTax;
    const roundOff = Math.round(netTotal) - netTotal;

    return {
      subtotal,
      totalTax,
      taxBreakdown,
      additionalCharges: chargesTotal,
      additionalChargesTax: chargesTax,
      roundOff,
      netTotal: Math.round(netTotal)
    };
  }, [formData.items, formData.place_of_supply, formData.additional_charges, companySettings]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.vendor_id) newErrors.vendor_id = 'Please select a vendor';
    if (!formData.invoice_date) newErrors.invoice_date = 'Invoice Date is required';
    if (!formData.place_of_supply) newErrors.place_of_supply = 'Place of Supply is required';
    if (!formData.branch_id) newErrors.branch_id = 'Branch is required';
    if (availableSeries.length > 0 && !formData.voucher_series_id) newErrors.voucher_series_id = 'Please select a purchase series';
    if (!formData.invoice_number || !formData.invoice_number.trim()) newErrors.invoice_number = 'Invoice Number is required';

    if (formData.invoice_date && formData.due_date) {
      if (new Date(formData.due_date) < new Date(formData.invoice_date)) {
        newErrors.due_date = 'Due Date cannot be earlier than Invoice Date';
      }
    }

    if (formData.invoice_layout === 'ECOMMERCE') {
      if (!formData.ecommerce_operator_gstin || formData.ecommerce_operator_gstin.trim() === '') {
        newErrors.ecommerce_operator_gstin = 'GSTIN is required for E-Commerce layout';
      } else {
        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!gstinRegex.test(formData.ecommerce_operator_gstin.toUpperCase().trim())) {
          newErrors.ecommerce_operator_gstin = 'Invalid GSTIN format';
        }
      }
    }

    let hasItemErrors = false;
    formData.items.forEach((item, index) => {
      if (item.item_id && !item.warehouse_id) {
        newErrors[`items_${index}_warehouse_id`] = 'Warehouse is required';
        hasItemErrors = true;
      }
      
      if (item.mfg_date && item.expiry_date) {
        if (new Date(item.expiry_date) < new Date(item.mfg_date)) {
          newErrors[`items_${index}_expiry_date`] = 'Expiry cannot be earlier than Mfg Date';
          hasItemErrors = true;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (hasItemErrors) {
        toast.error('Please fix the errors in line items');
      }
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        items: formData.items.map(item => {
          const itemPayload = {
            ...item,
            warehouse_id: item.warehouse_id ? parseInt(item.warehouse_id, 10) : null,
            discount: parseFloat(item.discount_pct || 0),
            discount_percent: parseFloat(item.discount_pct || 0),
            discount_pct: parseFloat(item.discount_pct || 0)
          };

          if (!itemPayload.batch_number) delete itemPayload.batch_number;
          if (!itemPayload.mfg_date) delete itemPayload.mfg_date;
          if (!itemPayload.expiry_date) delete itemPayload.expiry_date;

          return itemPayload;
        }),
        additional_charges: formData.additional_charges
          .filter(c => c.name && c.amount > 0)
          .map(c => ({
            name: c.name,
            amount: parseFloat(c.amount),
            gst_rate: parseFloat(c.gstRate)
          }))
      };


      console.log('Sending Purchase Invoice Payload:', payload);
      await createPurchaseInvoice(payload);
      toast.success('Purchase invoice created successfully');
      navigate('/invoicing/purchases');
    } catch (error) {
      console.error('Error creating purchase invoice:', error);

      const humanizeError = (msg) => {
        if (typeof msg !== 'string') return msg;
        return msg
          .replace(/items\[(\d+)\]/g, (_, index) => `Item ${parseInt(index) + 1}`)
          .replace(/vendor_id/g, 'Vendor')
          .replace(/invoice_date/g, 'Invoice Date')
          .replace(/place_of_supply/g, 'Place of Supply')
          .replace(/\./g, ' ')
          .replace(/"/g, '')
          .replace(/_/g, ' ');
      };

      if (error.details && Array.isArray(error.details)) {
        const detailMsgs = error.details.map((d, i) => <li key={i}>{humanizeError(d.message || d)}</li>);
        toast.error(
          <div className="text-start">
            <b>Validation Failed:</b>
            <ul className="mt-2 mb-0 ps-3">{detailMsgs}</ul>
          </div>,
          { autoClose: 5000 }
        );
      } else {
        toast.error(humanizeError(error.message) || 'Failed to create purchase invoice');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="page-header d-flex align-items-center justify-content-between mb-4">
        <div className="page-title">
          <h4 className="fw-bold mb-1">Create Purchase Invoice</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/"><i className="isax isax-home-2 me-1"></i>Home</Link></li>
              <li className="breadcrumb-item"><Link to="/invoicing/purchases">Purchases</Link></li>
              <li className="breadcrumb-item active">New Invoice</li>
            </ol>
          </nav>
        </div>
        <div className="page-header-right">
          <Link to="/invoicing/purchases" className="btn btn-outline-secondary d-flex align-items-center">
            <i className="isax isax-arrow-left-2 me-2"></i>Back to List
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <h6 className="mb-0 fw-bold"><i className="isax isax-info-circle me-2 text-primary"></i>Invoice Header</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <div className="d-flex justify-content-between align-items-end mb-2">
                  <label className="form-label fw-600 mb-0">Vendor <span className="text-danger">*</span></label>
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-0 text-decoration-none fw-bold"
                    onClick={() => setVendorModalOpen(true)}
                  >
                    + Add New
                  </button>
                </div>
                <div className={errors.vendor_id ? 'is-invalid border border-danger rounded' : ''}>
                  <AsyncSearchableSelect
                    searchFn={searchVendors}
                    onSelect={handleVendorSelect}
                    placeholder="Type to search vendor..."
                    defaultValue={vendors.find(v => String(v.id) === String(formData.vendor_id))}
                    displayKey="name"
                  />
                </div>
                {errors.vendor_id && <div className="invalid-feedback d-block">{errors.vendor_id}</div>}
              </div>
              {availableSeries.length > 0 && (
                <div className="col-md-3">
                  <label className="form-label fw-600">Purchase Series <span className="text-danger">*</span></label>
                  <select className={`form-select shadow-none ${errors.voucher_series_id ? 'is-invalid' : ''}`} name="voucher_series_id" value={formData.voucher_series_id} onChange={handleHeaderChange}>
                    <option value="">-- Select Series --</option>
                    {availableSeries.map(s => (
                      <option key={s.id} value={String(s.id)}>{s.name}</option>
                    ))}
                  </select>
                  {errors.voucher_series_id && <div className="invalid-feedback d-block">{errors.voucher_series_id}</div>}
                </div>
              )}

              <div className="col-md-3">
                <label className="form-label fw-600">Invoice No. <span className="text-danger">*</span></label>
                {availableSeries.length > 0 ? (
                  <input
                    type="text"
                    className="form-control shadow-none bg-light"
                    value={formData.invoice_number}
                    readOnly
                    placeholder="Auto-generated from series"
                  />
                ) : (
                  <input
                    type="text"
                    className={`form-control shadow-none ${errors.invoice_number ? 'is-invalid' : ''}`}
                    name="invoice_number"
                    value={formData.invoice_number}
                    onChange={handleHeaderChange}
                    placeholder="Enter Invoice No"
                  />
                )}
                {errors.invoice_number && <div className="invalid-feedback d-block">{errors.invoice_number}</div>}
              </div>
              <div className="col-md-2">
                <label className="form-label fw-600">Invoice Date <span className="text-danger">*</span></label>
                <input type="date" className={`form-control shadow-none ${errors.invoice_date ? 'is-invalid' : ''}`} name="invoice_date" value={formData.invoice_date} onChange={handleHeaderChange} />
                {errors.invoice_date && <div className="invalid-feedback">{errors.invoice_date}</div>}
              </div>
              <div className="col-md-2">
                <label className="form-label fw-600">Due Date</label>
                <input type="date" className={`form-control shadow-none ${errors.due_date ? 'is-invalid' : ''}`} name="due_date" value={formData.due_date} onChange={handleHeaderChange} />
                {errors.due_date && <div className="invalid-feedback">{errors.due_date}</div>}
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label fw-600 mb-0">Place of Supply <span className="text-danger">*</span></label>
                  <span className={`badge ${String(formData.place_of_supply).trim() !== String(companySettings?.state_code || companySettings?.data?.state_code || '27').trim() ? 'bg-info' : 'bg-success'} px-2 py-1`}>
                    {String(formData.place_of_supply).trim() !== String(companySettings?.state_code || companySettings?.data?.state_code || '27').trim() ? 'INTER-STATE (IGST)' : 'INTRA-STATE (CGST+SGST)'}
                  </span>
                </div>
                <select className={`form-select shadow-none ${errors.place_of_supply ? 'is-invalid' : ''}`} name="place_of_supply" value={formData.place_of_supply} onChange={handleHeaderChange}>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state.code} value={state.code}>{state.name} ({state.code})</option>
                  ))}
                </select>
                {errors.place_of_supply && <div className="invalid-feedback">{errors.place_of_supply}</div>}
              </div>

              <div className="col-md-4">
                <label className="form-label fw-600">Branch / Location <span className="text-danger">*</span></label>
                <select
                  className={`form-select shadow-none bg-light ${errors.branch_id ? 'is-invalid' : ''}`}
                  name="branch_id"
                  value={formData.branch_id}
                  onChange={handleHeaderChange}
                  disabled={true}
                >
                  <option value="">Select Branch</option>
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.branch_code})</option>
                  ))}
                </select>
                {errors.branch_id && <div className="invalid-feedback">{errors.branch_id}</div>}
              </div>

              <div className="col-md-3">
                <label className="form-label fw-600">Against Purchase Order</label>
                <select className="form-select shadow-none" name="purchase_order_id" value={formData.purchase_order_id || ''} onChange={handleHeaderChange}>
                  <option value="">None</option>
                  {purchaseOrders.map(po => (
                    <option key={po.id} value={po.id}>{po.order_number}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-600">Invoice Layout</label>
                <select className="form-select shadow-none" name="invoice_layout" value={formData.invoice_layout} onChange={handleHeaderChange}>
                  <option value="PRODUCTS">Products</option>
                  <option value="SERVICES">Services</option>
                  <option value="ECOMMERCE">E-Commerce</option>
                </select>
              </div>

              {formData.invoice_layout === 'ECOMMERCE' && (
                <div className="col-md-3">
                  <label className="form-label fw-600">E-Commerce Operator GSTIN <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control ${errors.ecommerce_operator_gstin ? 'is-invalid' : ''}`}
                    name="ecommerce_operator_gstin"
                    value={formData.ecommerce_operator_gstin}
                    onChange={(e) => {
                      handleHeaderChange({
                        target: {
                          name: e.target.name,
                          value: e.target.value.toUpperCase()
                        }
                      });
                    }}
                    placeholder="Enter Operator's GSTIN"
                  />
                  {errors.ecommerce_operator_gstin && <div className="invalid-feedback">{errors.ecommerce_operator_gstin}</div>}
                </div>
              )}

              <div className="col-md-3 d-flex align-items-end mb-1">
                <div className="form-check form-switch p-2 bg-light rounded-2 w-100 ps-5">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="show_discount"
                    name="show_discount"
                    checked={formData.show_discount}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormData(p => ({
                        ...p,
                        show_discount: checked,
                        items: checked ? p.items : p.items.map(item => ({ ...item, discount_pct: 0, discount_percent: 0, discount: 0 }))
                      }));
                    }}
                  />
                  <label className="form-check-label fw-600" htmlFor="show_discount">Item Discount</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold"><i className="isax isax-box me-2 text-primary"></i>Line Items</h6>
            <button type="button" className="btn btn-primary btn-sm rounded-pill px-3" onClick={addItemRow}>
              <i className="isax isax-add me-1"></i>Add Row
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive-none">
              <table className="table table-borderless align-top mb-0" style={{ minWidth: '1000px' }}>
                <thead className="bg-light border-bottom">
                  <tr className="fs-12 fw-bold text-muted text-uppercase">
                    <th style={{ width: '30%' }} className="ps-3">Item Details</th>
                    <th style={{ width: '12%' }}>Warehouse</th>
                    <th style={{ width: '8%' }} className="text-center">Qty</th>
                    <th style={{ width: '10%' }} className="text-end">Rate</th>
                    <th style={{ width: '9%', minWidth: '95px' }} className="text-center">Tax Type</th>
                    {formData.show_discount && <th style={{ width: '7%' }} className="text-end">Disc%</th>}
                    <th style={{ width: '10%' }} className="text-end">Taxable</th>
                    <th style={{ width: '10%' }}>Tax Rate</th>
                    <th style={{ width: '12%' }} className="text-end pe-3">Total</th>
                    <th style={{ width: '3%' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => (
                    <tr key={index} className="border-bottom align-top">
                      <td className="ps-3 py-3">
                        <div className="d-flex align-items-center gap-1 mb-2">
                          <div className="flex-grow-1">
                            <AsyncSearchableSelect
                              key={`item-${index}-${formData.invoice_layout}`}
                              searchFn={searchItemsFiltered}
                              onSelect={(selectedItem) => handleItemChange(index, 'item_id', selectedItem)}
                              placeholder="Search item..."
                              defaultValue={item.item_id ? { id: item.item_id, name: items.find(i => String(i.id) === String(item.item_id))?.name || item.description || 'Selected Item' } : null}
                              displayKey="name"
                              className="border-0 shadow-none"
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-light p-2 d-flex align-items-center justify-content-center border"
                            style={{ height: '38px', width: '38px' }}
                            onClick={() => setProductModal({ isOpen: true, index })}
                          >
                            <i className="isax isax-add fs-18"></i>
                          </button>
                        </div>
                        <div className="row g-2">
                          <div className="col-4">
                            <label className="fs-10 text-muted text-uppercase fw-bold mb-0">HSN</label>
                            <input type="text" className="form-control form-control-xs border-0 bg-light shadow-none fs-11" placeholder="HSN" value={item.hsn_code} onChange={(e) => handleItemChange(index, 'hsn_code', e.target.value)} />
                          </div>
                          <div className="col-8">
                            <label className="fs-10 text-muted text-uppercase fw-bold mb-0">Description / UOM</label>
                            <div className="input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control form-control-xs border-0 bg-light shadow-none fs-11"
                                value={item.description}
                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                placeholder="Add description..."
                              />
                              <select
                                className="form-select form-select-xs border-0 bg-light shadow-none fs-11 flex-grow-0 w-auto"
                                value={item.uom_id}
                                onChange={(e) => handleItemChange(index, 'uom_id', e.target.value)}
                                required
                              >
                                <option value="">UOM</option>
                                {uoms.map((u) => (
                                  <option key={u.id} value={String(u.id)}>{u.symbol}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        {(item.track_batch || item.track_expiry) && (
                          <div className="mt-2 d-flex flex-column gap-2 bg-light p-2 rounded">
                            <div className="d-flex align-items-center gap-2">
                              <div className="flex-grow-1">
                                <label className="fs-10 text-muted text-uppercase fw-bold mb-0">Batch No</label>
                                <input type="text" className="form-control form-control-xs border-0 bg-white shadow-none fs-11" placeholder="Batch No" value={item.batch_number || ''} onChange={(e) => handleItemChange(index, 'batch_number', e.target.value)} />
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <div className="w-50">
                                <label className="fs-10 text-muted text-uppercase fw-bold mb-0">Mfg Date</label>
                                <input type="date" className="form-control form-control-xs border-0 bg-white shadow-none fs-11 text-muted" value={item.mfg_date || ''} onChange={(e) => handleItemChange(index, 'mfg_date', e.target.value)} title="Mfg Date" />
                              </div>
                              <div className="w-50">
                                <label className="fs-10 text-muted text-uppercase fw-bold mb-0">Expiry Date</label>
                                <input type="date" className={`form-control form-control-xs ${errors[`items_${index}_expiry_date`] ? 'is-invalid border border-danger' : 'border-0'} bg-white shadow-none fs-11 text-muted`} value={item.expiry_date || ''} onChange={(e) => handleItemChange(index, 'expiry_date', e.target.value)} title="Expiry Date" />
                                {errors[`items_${index}_expiry_date`] && <div className="invalid-feedback d-block fs-10 mt-1">{errors[`items_${index}_expiry_date`]}</div>}
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="py-3">
                        <select className={`form-select form-select-sm shadow-none border bg-white fs-12 ${errors[`items_${index}_warehouse_id`] ? 'is-invalid' : ''}`} value={item.warehouse_id} onChange={(e) => handleItemChange(index, 'warehouse_id', e.target.value)} required>
                          <option value="">Select</option>
                          {warehouses.map(w => (
                            <option key={w.id} value={String(w.id)}>{w.name}</option>
                          ))}
                        </select>
                        {errors[`items_${index}_warehouse_id`] && <div className="invalid-feedback">{errors[`items_${index}_warehouse_id`]}</div>}
                      </td>
                      <td className="py-3">
                        <input type="number" className="form-control form-control-sm shadow-none text-center fs-12 border bg-white" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} min="0.001" step="any" required />
                      </td>
                      <td className="py-3">
                        <input type="number" className="form-control form-control-sm shadow-none text-end fs-12 border bg-white" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} step="any" required />
                      </td>
                      <td className="py-3">
                        <select className="form-select form-select-sm shadow-none text-center fs-12 border bg-white" value={item.tax_type || 'TAXABLE'} onChange={(e) => handleItemChange(index, 'tax_type', e.target.value)}>
                          <option value="TAXABLE">Taxable</option>
                          <option value="EXEMPT">Exempt</option>
                          <option value="NIL_RATED">Nil Rated</option>
                          <option value="NON_GST">Non GST</option>
                        </select>
                      </td>
                      {formData.show_discount && (
                        <td className="py-3">
                          <input
                            type="number"
                            className="form-control form-control-sm shadow-none text-end fs-12 border bg-white"
                            value={item.discount_pct === 0 ? '' : item.discount_pct}
                            onChange={(e) => {
                              let val = parseFloat(e.target.value) || 0;
                              if (val > 100) val = 100;
                              if (val < 0) val = 0;
                              handleItemChange(index, 'discount_pct', val);
                            }}
                            min="0"
                            max="100"
                            step="any"
                          />
                        </td>
                      )}
                      <td className="text-end py-3">
                        <div className="fw-bold text-dark fs-13">
                          ₹{((parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0) * (1 - (parseFloat(item.discount_pct) || 0) / 100)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td className="py-3">
                        <select className="form-select form-select-sm shadow-none fs-12 border bg-white" value={item.gst_rate} onChange={(e) => handleItemChange(index, 'gst_rate', e.target.value)}>
                          {[0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 14, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                        </select>
                        <div className="fs-10 text-muted mt-1">
                          {String(formData.place_of_supply).trim() !== String(companySettings?.state_code || companySettings?.data?.state_code || '27').trim() ? (
                            <span>IGST: ₹{(((parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0) * (1 - (parseFloat(item.discount_pct) || 0) / 100)) * (parseFloat(item.gst_rate) || 0) / 100).toFixed(2)}</span>
                          ) : (
                            <span>CGST/SGST: ₹{(((parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0) * (1 - (parseFloat(item.discount_pct) || 0) / 100)) * (parseFloat(item.gst_rate) || 0) / 200).toFixed(2)}</span>
                          )}
                        </div>
                      </td>
                      <td className="text-end py-3 pe-3">
                        <div className="fw-bold text-primary fs-14">
                          ₹{((parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0) * (1 - (parseFloat(item.discount_pct) || 0) / 100) * (1 + (parseFloat(item.gst_rate) || 0) / 100)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td className="text-center py-3">
                        {formData.items.length > 1 && (
                          <button type="button" className="btn btn-link link-danger p-0 shadow-none border-0" onClick={() => removeItemRow(index)}>
                            <i className="isax isax-trash fs-18"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fw-600">Note / Remarks</label>
                  <textarea className="form-control shadow-none" name="remarks" value={formData.remarks} onChange={handleHeaderChange} rows="3" placeholder="Additional details for this purchase..."></textarea>
                </div>


                <div className="mt-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h6 className="fw-bold fs-14 mb-0">Additional Charges</h6>
                    <button
                      type="button"
                      className="btn btn-sm btn-soft-primary px-3 rounded-pill"
                      onClick={() => setFormData(p => ({ ...p, additional_charges: [...p.additional_charges, { name: '', amount: 0, gstRate: 18 }] }))}
                    >
                      + Add Item
                    </button>
                  </div>
                  <div className="bg-light p-3 rounded-3">
                    {formData.additional_charges.map((charge, cidx) => (
                      <div className="row g-2 mb-2 align-items-center" key={cidx}>
                        <div className="col-md-5">
                          <input type="text" className="form-control form-control-sm border-0" placeholder="e.g. Freight" value={charge.name} onChange={(e) => {
                            const newC = [...formData.additional_charges];
                            newC[cidx].name = e.target.value;
                            setFormData(p => ({ ...p, additional_charges: newC }));
                          }} />
                        </div>
                        <div className="col-md-3">
                          <input type="number" className="form-control form-control-sm border-0" placeholder="Amount" value={charge.amount} onChange={(e) => {
                            const newC = [...formData.additional_charges];
                            newC[cidx].amount = parseFloat(e.target.value) || 0;
                            setFormData(p => ({ ...p, additional_charges: newC }));
                          }} />
                        </div>
                        <div className="col-md-3">
                          <select className="form-select form-select-sm border-0" value={charge.gstRate} onChange={(e) => {
                            const newC = [...formData.additional_charges];
                            newC[cidx].gstRate = parseFloat(e.target.value);
                            setFormData(p => ({ ...p, additional_charges: newC }));
                          }}>
                            {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                          </select>
                        </div>
                        <div className="col-md-1 text-end">
                          <button type="button" className="btn btn-sm text-danger border-0 p-0" onClick={() => setFormData(p => ({ ...p, additional_charges: p.additional_charges.filter((_, i) => i !== cidx) }))}>
                            <i className="isax isax-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm bg-primary bg-opacity-10 h-100">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Invoice Summary</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-bold">₹{summary.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                {Object.entries(summary.taxBreakdown).map(([taxName, taxValue]) => (
                  <div key={taxName} className="d-flex justify-content-between mb-2 small text-muted">
                    <span>{taxName}</span>
                    <span>₹{taxValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                ))}
                {summary.additionalCharges > 0 && (
                  <div className="d-flex justify-content-between mb-2 small text-muted">
                    <span>Addl. Charges Header</span>
                    <span>₹{summary.additionalCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-2 small text-muted">
                  <span>Round Off</span>
                  <span>₹{summary.roundOff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <hr className="my-3 border-primary opacity-20" />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h5 fw-bold mb-0">Net Total</span>
                  <span className="h4 fw-bold mb-0 text-primary">₹{summary.netTotal.toLocaleString()}</span>
                </div>
              </div>
              <div className="card-footer bg-transparent border-0 pt-0 pb-4 px-4">
                <div className="row g-2">
                  <div className="col-6">
                    <button type="button" className="btn btn-outline-white w-100 rounded-pill shadow-none border" onClick={() => navigate('/invoicing/purchases')}>Cancel</button>
                  </div>
                  <div className="col-6">
                    <button type="submit" className="btn btn-primary w-100 rounded-pill shadow-none" disabled={loading}>
                      {loading ? 'Saving...' : 'Save Invoice'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ProductFormModal
        isOpen={productModal.isOpen}
        onClose={() => setProductModal({ isOpen: false, index: null })}
        onSuccess={handleProductCreated}
      />
      <VendorFormModal
        show={vendorModalOpen}
        onClose={() => setVendorModalOpen(false)}
        onSubmit={handleQuickVendorAdd}
        isLoading={vendorFormLoading}
      />
    </div>
  );
};

export default AddPurchaseInvoice;

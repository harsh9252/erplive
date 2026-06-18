import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import customerService, { getCustomers, searchCustomers } from '../services/customerService';
import { getItems, searchItems, getItemById } from '../services/itemService';
import { getSalesOrders } from '../services/salesOrderService';
import { createSalesInvoice } from '../services/salesInvoiceService';
import { getWarehouses, getCompanySettings, getVoucherSeries, getVoucherTypes } from '../services/settingsService';
import { getUoms } from '../services/uomService';
import branchService from '../services/branchService';
import hsnSacService from '../services/hsnSacService';
import financialYearService from '../services/financialYearService';
import ProductFormModal from '../components/ProductFormModal';
import { toast } from 'react-toastify';
import { INDIAN_STATES } from '../utils/constants';
import AsyncSearchableSelect from '../components/AsyncSearchableSelect';
import Swal from 'sweetalert2';
import CustomerFormModal from '../components/CustomerFormModal';

const AddSalesInvoice = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productModal, setProductModal] = useState({ isOpen: false, index: null });
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [customerFormLoading, setCustomerFormLoading] = useState(false);
  const [company, setCompany] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [uoms, setUoms] = useState([]);
  const [availableSeries, setAvailableSeries] = useState([]);
  const [gstRates] = useState([0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 14, 18, 28]);
  const [financialYears, setFinancialYears] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch master data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, itemRes, orderRes, warehouseRes, companyRes, uomRes, branchRes, seriesRes, typesRes, fyRes] = await Promise.all([
          customerService.getCustomers(1, 1000),
          getItems(1, 1000),
          getSalesOrders(1, 1000),
          getWarehouses(),
          getCompanySettings(),
          getUoms(1, 1000),
          branchService.getBranches(),
          getVoucherSeries(),
          getVoucherTypes(),
          financialYearService.getFinancialYears()
        ]);

        setCustomers(Array.isArray(custRes.data) ? custRes.data : (custRes.data?.rows || []));
        setItems(Array.isArray(itemRes.data) ? itemRes.data : (itemRes.data?.rows || []));
        setSalesOrders(Array.isArray(orderRes.data) ? orderRes.data : (orderRes.data?.rows || []));
        setWarehouses(warehouseRes.data || []);
        setCompany(companyRes.data);
        setUoms(Array.isArray(uomRes.data) ? uomRes.data : (uomRes.data?.rows || []));
        const branchList = Array.isArray(branchRes.data) ? branchRes.data : [];
        setBranches(branchList);

        const savedBranchId = localStorage.getItem('selectedBranchId');
        if (savedBranchId) {
          setFormData(prev => ({ ...prev, branchId: savedBranchId }));
        } else if (branchList.length > 0) {
          setFormData(prev => ({ ...prev, branchId: branchList[0].id.toString() }));
        }

        const fYearList = Array.isArray(fyRes.data) ? fyRes.data : (fyRes.data?.rows || fyRes || []);
        setFinancialYears(fYearList);
        const activeFY = fYearList.find(fy => fy.is_active) || fYearList[0];
        const fyStr = activeFY?.name ? `${activeFY.name}/` : '';

        // Handle Voucher Series
        if (seriesRes?.data && typesRes?.data) {
          const salesType = typesRes.data.find(t => t.code === 'SALES_INVOICE' || t.name.toUpperCase() === 'SALES INVOICE');
          if (salesType) {
            const relatedSeries = seriesRes.data.filter(s => String(s.voucher_type_id) === String(salesType.id));
            setAvailableSeries(relatedSeries);
            if (relatedSeries.length > 0) {
              const def = relatedSeries.find(s => s.is_default) || relatedSeries[0];
              setFormData(prev => ({
                ...prev,
                voucher_series_id: def.id.toString(),
                invoiceNumber: `${def.prefix || ''}${String(def.starting_number || '').padStart(def.padding || 0, '0')}${def.suffix || ''}`
              }));
            }
          }
        }

        // Auto-select first branch if available
        if (branchList.length > 0) {
          setFormData(prev => ({ ...prev, branchId: branchList[0].id }));
        }
      } catch (error) {
        console.error('Error fetching master data:', error);
        toast.error('Failed to load master data');
      }
    };
    fetchData();
  }, []);

  // Listen for global branch updates
  useEffect(() => {
    const handleBranchUpdate = () => {
      const savedBranchId = localStorage.getItem('selectedBranchId');
      if (savedBranchId) {
        setFormData(prev => ({ ...prev, branchId: savedBranchId }));
      }
    };
    window.addEventListener('BRANCH_UPDATED', handleBranchUpdate);
    return () => window.removeEventListener('BRANCH_UPDATED', handleBranchUpdate);
  }, []);

  const [formData, setFormData] = useState({
    customerId: '',
    branchId: '',
    voucher_series_id: '',
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    financialYearId: '',
    salesOrderId: '',
    invoiceType: 'B2B',
    placeOfSupply: '',
    reverseCharge: false,
    remarks: '',
    termsAndConditions: '',
    invoice_layout: 'PRODUCTS',
    show_discount: true,
    ecommerce_operator_gstin: '',
    additional_charges: [
      { name: '', amount: 0, gstRate: 18 }
    ],
    items: [
      {
        itemId: '',
        description: '',
        hsnCode: '',
        qty: 1,
        uomId: '',
        rate: 0,
        discountPct: 0,
        discountAmount: 0,
        taxableAmount: 0,
        gstRate: 18,
        taxType: 'TAXABLE',
        igstAmount: 0,
        cgstAmount: 0,
        sgstAmount: 0,
        cessAmount: 0,
        totalAmount: 0,
        warehouseId: '',
      },
    ],
    summary: {
      subtotal: 0,
      totalDiscount: 0,
      taxableAmount: 0,
      igst: 0,
      cgst: 0,
      sgst: 0,
      cess: 0,
      roundOff: 0,
      netTotal: 0,
    },
  });

  // Update default place of supply when company is loaded
  useEffect(() => {
    if (company?.state_code) {
      setFormData(prev => ({ ...prev, placeOfSupply: company.state_code }));
    }
  }, [company]);

  const calculateLineGST = (item, placeOfSupply) => {
    const taxable = item.taxableAmount || 0;
    // Convert to string to avoid type mismatch (e.g. number 27 vs string '27')
    const companyState = String(company?.state_code || '27').trim();
    const isInterState = companyState !== String(placeOfSupply).trim();
    let igst = 0, cgst = 0, sgst = 0, cess = 0;
    if (isInterState) {
      // Different state → IGST
      igst = (taxable * item.gstRate) / 100;
    } else {
      // Same state → CGST + SGST
      cgst = (taxable * item.gstRate) / 2 / 100;
      sgst = (taxable * item.gstRate) / 2 / 100;
    }
    return { igst, cgst, sgst, cess };
  };

  useEffect(() => {
    if (!formData.invoiceDate || formData.items.some(i => !i.itemId)) return;
    const refreshRates = async () => {
      const updatedItems = await Promise.all(formData.items.map(async (item) => {
        if (!item.itemId) return item;
        try {
          const rateRes = await hsnSacService.getRateAtDate(item.itemId, formData.invoiceDate);
          if (rateRes && rateRes.data) {
            return { ...item, gstRate: parseFloat(rateRes.data.gst_rate) };
          }
        } catch (e) {
          console.warn("Failed to refresh rate for date", e);
        }
        return item;
      }));
      let recalculated = [...updatedItems];
      recalculated.forEach((_, idx) => {
        updateLineCalculations(recalculated, idx, formData.placeOfSupply);
      });
    };
    const timer = setTimeout(refreshRates, 500);
    return () => clearTimeout(timer);
  }, [formData.invoiceDate]);

  const handleCustomerSelect = (selectedCustomer) => {
    if (errors.customerId) setErrors(prev => ({ ...prev, customerId: null }));
    if (!selectedCustomer) {
      setSelectedCustomer(null);
      return;
    }
    setSelectedCustomer(selectedCustomer);
    const customerId = selectedCustomer.id;
    setFormData((prev) => {
      const updated = { ...prev, customerId };
      if (prev.invoiceDate) {
        const creditDays = parseInt(selectedCustomer.credit_limit_days || selectedCustomer.credit_days) || 0;
        const dueDate = new Date(prev.invoiceDate);
        dueDate.setDate(dueDate.getDate() + creditDays);
        updated.dueDate = dueDate.toISOString().split('T')[0];
      }
      const newPlaceOfSupply = selectedCustomer.state_code || company?.state_code || '';
      updated.placeOfSupply = newPlaceOfSupply;
      if (prev.items && prev.items.length > 0) {
        updated.items = prev.items.map((item) => {
          const gst = calculateLineGST(item, newPlaceOfSupply);
          return {
            ...item,
            igstAmount: gst.igst,
            cgstAmount: gst.cgst,
            sgstAmount: gst.sgst,
            totalAmount: (item.taxableAmount || 0) + gst.igst + gst.cgst + gst.sgst + (gst.cess || 0),
          };
        });
      }
      return updated;
    });
    setFormData(prev => {
      calculateSummary(prev.items);
      return prev;
    });
  };

  const handleQuickCustomerAdd = async (customerData) => {
    try {
      setCustomerFormLoading(true);
      const res = await customerService.createCustomer(customerData);
      toast.success('Customer added successfully');
      // Auto select the new customer
      handleCustomerSelect(res.data);
      setCustomerModalOpen(false);
    } catch (err) {
      console.error("Failed to add customer", err);
      toast.error(err.message || "Failed to add customer");
    } finally {
      setCustomerFormLoading(false);
    }
  };

  const handleProductCreated = (newProduct) => {
    if (productModal.index !== null) {
      handleItemSelect(productModal.index, newProduct);
    }
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: newItems }));
    calculateSummary(newItems);
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

  const handleItemSelect = async (index, selectedItem) => {
    if (selectedItem) {
      try {
        const itemRes = await getItemById(selectedItem.id);
        if (itemRes && itemRes.data) {
          selectedItem = { ...selectedItem, ...itemRes.data };
        }
      } catch (err) {
        console.warn("Failed to fetch full item details", err);
      }
      const newItems = [...formData.items];
      let gst = 18;
      try {
        const rateRes = await hsnSacService.getRateAtDate(selectedItem.id, formData.invoiceDate);
        if (rateRes && rateRes.data && rateRes.data.gst_rate !== undefined) {
          gst = parseFloat(rateRes.data.gst_rate);
        } else {
          gst = parseFloat(selectedItem.gst_rate || selectedItem.tax_rate || selectedItem.taxRate || selectedItem.gstRate || 18);
        }
      } catch (err) {
        console.warn("Failed to fetch effective rate", err);
        gst = parseFloat(selectedItem.gst_rate || selectedItem.tax_rate || selectedItem.taxRate || selectedItem.gstRate || 18);
      }

      let taxType = 'TAXABLE';
      if (selectedItem.taxability_type) {
        if (selectedItem.taxability_type === 'Exempt') taxType = 'EXEMPT';
        else if (selectedItem.taxability_type === 'Nil Rated') taxType = 'NIL_RATED';
        else if (selectedItem.taxability_type === 'Non-GST') taxType = 'NON_GST';
        else taxType = 'TAXABLE';
      } else if (gst === 0) {
        taxType = 'EXEMPT';
      }

      if (taxType !== 'TAXABLE') {
        gst = 0;
      }

      const hsn = String(selectedItem.hsn_code || selectedItem.hsnCode || selectedItem.hsn || '');
      let uom = selectedItem.uom_id || selectedItem.uomId || selectedItem.unit_id || selectedItem.unitId || '';
      uom = String(uom || '');
      const price = parseFloat(selectedItem.sale_price || selectedItem.selling_price || selectedItem.base_price || 0);
      newItems[index] = {
        ...newItems[index],
        itemId: selectedItem.id,
        description: selectedItem.name || '',
        hsnCode: hsn,
        uomId: uom,
        rate: price,
        gstRate: gst,
        taxType: taxType,
        warehouseId: String(warehouses[0]?.id || '')
      };
      updateLineCalculations(newItems, index, formData.placeOfSupply);
    }
  };

  const updateLineCalculations = (itemsList, index, placeOfSupply) => {
    const item = itemsList[index];
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const gstRate = parseFloat(item.gstRate) || 0;
    const discountPct = parseFloat(item.discountPct) || 0;
    let taxableAmount = 0;
    let lineTotal = qty * rate;
    if (item.taxType === 'INCLUSIVE') {
      const totalNet = lineTotal * (1 - discountPct / 100);
      taxableAmount = totalNet / (1 + gstRate / 100);
      item.discountAmount = lineTotal * (discountPct / 100);
    } else {
      const discountAmount = (lineTotal * discountPct) / 100;
      item.discountAmount = discountAmount;
      taxableAmount = lineTotal - discountAmount;
    }
    item.taxableAmount = taxableAmount;
    const gst = calculateLineGST({ ...item, taxableAmount }, placeOfSupply);
    item.igstAmount = gst.igst;
    item.cgstAmount = gst.cgst;
    item.sgstAmount = gst.sgst;
    item.cessAmount = gst.cess;
    if (item.taxType === 'INCLUSIVE') {
      item.totalAmount = lineTotal * (1 - discountPct / 100);
    } else {
      item.totalAmount = item.taxableAmount + gst.igst + gst.cgst + gst.sgst + gst.cess;
    }
    setFormData((prev) => ({ ...prev, items: itemsList }));
    calculateSummary(itemsList);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    // Auto-sync tax rate based on tax type
    if (field === 'taxType' && value !== 'TAXABLE') {
      newItems[index].gstRate = 0;
    }

    updateLineCalculations(newItems, index, formData.placeOfSupply);
  };

  const calculateSummary = (itemsList, chargesList = formData.additional_charges) => {
    const subtotal = itemsList.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const totalDiscount = itemsList.reduce((sum, item) => sum + (item.discountAmount || 0), 0);
    const taxableAmount = itemsList.reduce((sum, item) => sum + (item.taxableAmount || 0), 0);
    const igst = itemsList.reduce((sum, item) => sum + (item.igstAmount || 0), 0);
    const cgst = itemsList.reduce((sum, item) => sum + (item.cgstAmount || 0), 0);
    const sgst = itemsList.reduce((sum, item) => sum + (item.sgstAmount || 0), 0);
    const cess = itemsList.reduce((sum, item) => sum + (item.cessAmount || 0), 0);
    const chargesTotal = chargesList.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);
    const chargesTax = chargesList.reduce((sum, c) => sum + ((parseFloat(c.amount) || 0) * (parseFloat(c.gstRate) || 0)) / 100, 0);
    const beforeRoundOff = taxableAmount + igst + cgst + sgst + cess + chargesTotal + chargesTax;
    const netTotal = Math.round(beforeRoundOff);
    const roundOff = netTotal - beforeRoundOff;
    setFormData((prev) => ({
      ...prev,
      summary: { subtotal, totalDiscount, taxableAmount, igst, cgst, sgst, cess, additionalCharges: chargesTotal, additionalChargesTax: chargesTax, roundOff, netTotal },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };
      if (name === 'invoiceDate' && prev.customerId) {
        const selectedCustomer = customers.find((c) => String(c.id) === String(prev.customerId));
        if (selectedCustomer) {
          const creditDays = parseInt(selectedCustomer.credit_limit_days || selectedCustomer.credit_days) || 0;
          const dueDate = new Date(newValue);
          if (!isNaN(dueDate.getTime())) {
            dueDate.setDate(dueDate.getDate() + creditDays);
            updated.dueDate = dueDate.toISOString().split('T')[0];
          }
        }
      }
      if (name === 'placeOfSupply') {
        const newItems = prev.items.map((item) => {
          const gst = calculateLineGST(item, newValue);
          return { ...item, igstAmount: gst.igst, cgstAmount: gst.cgst, sgstAmount: gst.sgst, totalAmount: item.taxableAmount + gst.igst + gst.cgst + gst.sgst + gst.cess };
        });
        updated.items = newItems;
        calculateSummary(newItems);
      }
      if (name === 'voucher_series_id' && value) {
        const selectedSeries = availableSeries.find(s => String(s.id) === String(value));
        if (selectedSeries) {
          updated.invoiceNumber = `${selectedSeries.prefix || ''}${String(selectedSeries.starting_number || '').padStart(selectedSeries.padding || 0, '0')}${selectedSeries.suffix || ''}`;
        }
      }
      return updated;
    });
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { itemId: '', description: '', hsnCode: '', qty: 1, uomId: '', rate: 0, discountPct: 0, discountAmount: 0, taxableAmount: 0, gstRate: 18, taxType: 'TAXABLE', igstAmount: 0, cgstAmount: 0, sgstAmount: 0, cessAmount: 0, totalAmount: 0, warehouseId: warehouses[0]?.id || '' },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.customerId) newErrors.customerId = 'Please select a customer';
    if (!formData.branchId) newErrors.branchId = 'Branch is required';
    if (!formData.invoiceDate) newErrors.invoiceDate = 'Invoice Date is required';
    if (!formData.placeOfSupply) newErrors.placeOfSupply = 'Place of Supply is required';

    if (formData.invoiceDate && formData.dueDate) {
      if (new Date(formData.dueDate) < new Date(formData.invoiceDate)) {
        newErrors.dueDate = 'Due Date cannot be earlier than Invoice Date';
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.items.some((item) => !item.itemId)) return toast.error('Please select an item for all lines');
    if (formData.items.some((item) => !item.uomId)) return toast.error('Please select a Unit of Measure (UOM) for all items');
    setLoading(true);
    try {
      const payload = {
        branch_id: formData.branchId,
        customer_id: formData.customerId,
        voucher_series_id: formData.voucher_series_id || null,
        invoice_number: formData.invoiceNumber,
        invoice_date: formData.invoiceDate,
        due_date: formData.dueDate,
        financial_year_id: formData.financialYearId || undefined,
        sales_order_id: formData.salesOrderId || null,
        invoice_type: formData.invoiceType,
        place_of_supply: formData.placeOfSupply,
        reverse_charge: formData.reverseCharge,
        remarks: formData.remarks,
        terms_and_conditions: formData.termsAndConditions,
        invoice_layout: formData.invoice_layout,
        show_discount: formData.show_discount,
        ecommerce_operator_gstin: formData.ecommerce_operator_gstin || null,
        additional_charges: formData.additional_charges.filter(c => c.name && c.amount > 0).map(c => ({ name: c.name, amount: parseFloat(c.amount), gst_rate: parseFloat(c.gstRate) })),
        items: formData.items.map(item => ({
          item_id: item.itemId,
          description: item.description,
          hsn_code: item.hsnCode,
          qty: parseFloat(item.qty),
          uom_id: item.uomId ? parseInt(item.uomId) : null,
          rate: parseFloat(item.rate),
          discount_pct: parseFloat(item.discountPct || 0),
          gst_rate: parseFloat(item.gstRate),
          tax_type: item.taxType || 'EXCLUSIVE',
          conversion_factor: parseFloat(uoms.find(u => String(u.id) === String(item.uomId))?.conversion_factor || 1),
          warehouse_id: item.warehouseId ? parseInt(item.warehouseId) : null,
        }))
      };
      await createSalesInvoice(payload);
      toast.success('Invoice created successfully!');
      navigate('/invoicing/sales');
    } catch (error) {
      toast.error('Failed to create invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="page-header d-flex align-items-center justify-content-between mb-4">
        <div className="page-title">
          <h4 className="fw-bold mb-1">Create Sales Invoice</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/"><i className="isax isax-home-2 me-1"></i>Home</Link></li>
              <li className="breadcrumb-item"><Link to="/invoicing/sales">Sales Invoices</Link></li>
              <li className="breadcrumb-item active">New Invoice</li>
            </ol>
          </nav>
        </div>
        <div className="page-header-right">
          <Link to="/invoicing/sales" className="btn btn-outline-secondary d-flex align-items-center">
            <i className="isax isax-arrow-left-2 me-2"></i>Back to List
          </Link>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <div className="d-flex justify-content-between align-items-end mb-2">
                  <label className="form-label fw-600 mb-0">Customer <span className="text-danger">*</span></label>
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-0 text-decoration-none fw-bold"
                    onClick={() => setCustomerModalOpen(true)}
                  >
                    + Add New
                  </button>
                </div>
                <div className={errors.customerId ? 'is-invalid border border-danger rounded' : ''}>
                  <AsyncSearchableSelect
                    searchFn={searchCustomers}
                    onSelect={handleCustomerSelect}
                    placeholder="Type to search customer..."
                    defaultValue={selectedCustomer ? { id: selectedCustomer.id, name: selectedCustomer.name } : null}
                    displayKey="name"
                  />
                </div>
                {errors.customerId && <div className="invalid-feedback d-block">{errors.customerId}</div>}
              </div>

              <div className="col-md-3">
                <label className="form-label fw-600">Branch / Location <span className="text-danger">*</span></label>
                <select
                  className={`form-select shadow-none bg-light ${errors.branchId ? 'is-invalid' : ''}`}
                  name="branchId"
                  value={formData.branchId}
                  onChange={handleInputChange}
                  disabled={true}
                >
                  <option value="">Select Branch</option>
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.branch_code})</option>
                  ))}
                </select>
                {errors.branchId && <div className="invalid-feedback">{errors.branchId}</div>}
              </div>

              {availableSeries.length > 1 && (
                <div className="col-md-3">
                  <label className="form-label fw-600">Invoice Series</label>
                  <select className="form-select shadow-none" name="voucher_series_id" value={formData.voucher_series_id} onChange={handleInputChange}>
                    {availableSeries.map(s => (
                      <option key={s.id} value={String(s.id)}>{s.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* <div className="col-md-3">
                <label className="form-label fw-600">Invoice No.</label>
                <input
                  type="text"
                  className="form-control shadow-none"
                  placeholder="Enter Invoice No"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) => { handleInputChange(e); setFormData(prev => ({ ...prev, voucher_series_id: '' })); }}
                />
              </div> */}

              <div className="col-md-3">
                <label className="form-label fw-600">Invoice Date <span className="text-danger">*</span></label>
                <input
                  type="date"
                  className={`form-control shadow-none ${errors.invoiceDate ? 'is-invalid' : ''}`}
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleInputChange}
                />
                {errors.invoiceDate && <div className="invalid-feedback">{errors.invoiceDate}</div>}
              </div>

              <div className="col-md-3">
                <label className="form-label fw-600">Due Date</label>
                <input
                  type="date"
                  className={`form-control shadow-none ${errors.dueDate ? 'is-invalid' : ''}`}
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                />
                {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
              </div>
            </div>

            <div className="row g-3 mb-4 p-3 bg-light rounded-12">
              <div className="col-md-3">
                <label className="form-label fw-600">Invoice Type</label>
                <select
                  className="form-select shadow-none"
                  name="invoiceType"
                  value={formData.invoiceType}
                  onChange={handleInputChange}
                >
                  <option value="B2B">B2B (Registered)</option>
                  <option value="B2C">B2C (Unregistered)</option>
                  <option value="EXPORT">EXPORT</option>
                  <option value="SEZ">SEZ</option>
                </select>
              </div>
              <div className="col-md-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label fw-600 mb-0">Place of Supply <span className="text-danger">*</span></label>
                  <span className={`badge ${String(formData.placeOfSupply).trim() !== String(company?.state_code || '27').trim() ? 'bg-info' : 'bg-success'} px-2 py-1`}>
                    {String(formData.placeOfSupply).trim() !== String(company?.state_code || '27').trim() ? 'INTER-STATE (IGST)' : 'INTRA-STATE (CGST+SGST)'}
                  </span>
                </div>
                <select
                  className={`form-select shadow-none ${errors.placeOfSupply ? 'is-invalid' : ''}`}
                  name="placeOfSupply"
                  value={formData.placeOfSupply}
                  onChange={handleInputChange}
                >
                  <option value="">Select Place of Supply</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.code} - {state.name}
                    </option>
                  ))}
                </select>
                {errors.placeOfSupply && <div className="invalid-feedback">{errors.placeOfSupply}</div>}
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Against Sales Order</label>
                <select
                  className="form-select shadow-none"
                  name="salesOrderId"
                  value={formData.salesOrderId}
                  onChange={handleInputChange}
                >
                  <option value="">None</option>
                  {salesOrders.map((so) => (
                    <option key={so.id} value={so.id}>{so.order_number}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Invoice Layout</label>
                <select
                  className="form-select shadow-none"
                  name="invoice_layout"
                  value={formData.invoice_layout}
                  onChange={handleInputChange}
                >
                  <option value="PRODUCTS">Products</option>
                  <option value="SERVICES">Services </option>
                  <option value="ECOMMERCE">E-Commerce</option>
                </select>
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <div className="form-check form-switch mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="show_discount"
                    name="show_discount"
                    checked={formData.show_discount}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label fw-600" htmlFor="show_discount">Enable Item Discount</label>
                </div>
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
                      handleInputChange({
                        target: {
                          name: e.target.name,
                          value: e.target.value.toUpperCase()
                        }
                      });
                    }}
                    placeholder="Enter TCS operator GSTIN"
                  />
                  {errors.ecommerce_operator_gstin && <div className="invalid-feedback">{errors.ecommerce_operator_gstin}</div>}
                </div>
              )}
            </div>

            {/* Line Items Section */}
            <div className="mb-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="fw-bold mb-0">Invoice Items</h6>
                <button type="button" className="btn btn-sm btn-soft-primary px-3 rounded-pill" onClick={addItem}>
                  <i className="isax isax-add-circle me-1"></i>Add Row
                </button>
              </div>

              <div className="table-responsive-none">
                <table className="table table-borderless align-top mb-0" style={{ minWidth: '1000px' }}>
                  <thead className="bg-light border-bottom">
                    <tr className="fs-12 fw-bold text-muted text-uppercase">
                      <th style={{ width: '30%' }} className="ps-3">Item Details</th>
                      <th style={{ width: '12%' }}>Warehouse</th>
                      <th style={{ width: '8%' }} className="text-center">Qty</th>
                      <th style={{ width: '10%' }} className="text-end">Rate</th>
                      <th style={{ width: '8%', minWidth: '95px' }} className="text-center">Tax Type</th>
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
                                onSelect={(selected) => handleItemSelect(index, selected)}
                                placeholder="Search item..."
                                defaultValue={item.itemId ? { id: item.itemId, name: items.find(i => String(i.id) === String(item.itemId))?.name || item.description || 'Selected Item' } : null}
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
                              <input type="text" className="form-control form-control-xs border-0 bg-light shadow-none fs-11" placeholder="HSN" value={item.hsnCode} onChange={(e) => handleItemChange(index, 'hsnCode', e.target.value)} />
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
                                  value={item.uomId}
                                  onChange={(e) => handleItemChange(index, 'uomId', e.target.value)}
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
                        </td>
                        <td className="py-3">
                          <select
                            className="form-select form-select-sm shadow-none border bg-white fs-12"
                            value={item.warehouseId}
                            onChange={(e) => handleItemChange(index, 'warehouseId', e.target.value)}
                            required
                          >
                            <option value="">Select</option>
                            {warehouses.map((w) => (
                              <option key={w.id} value={w.id}>{w.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3">
                          <input
                            type="number"
                            className="form-control form-control-sm shadow-none text-center fs-12 border bg-white"
                            value={item.qty}
                            onChange={(e) => handleItemChange(index, 'qty', parseFloat(e.target.value) || 0)}
                            min="0.001"
                            step="any"
                            required
                          />
                        </td>
                        <td className="py-3">
                          <input
                            type="number"
                            className="form-control form-control-sm shadow-none text-end fs-12 border bg-white"
                            value={item.rate}
                            onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.01"
                            required
                          />
                        </td>
                        <td className="py-3">
                          <select
                            className="form-select form-select-sm shadow-none text-center fs-12 border bg-white"
                            value={item.taxType}
                            onChange={(e) => handleItemChange(index, 'taxType', e.target.value)}
                          >
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
                              value={item.discountPct}
                              onChange={(e) => {
                                let val = parseFloat(e.target.value) || 0;
                                if (val > 100) val = 100;
                                if (val < 0) val = 0;
                                handleItemChange(index, 'discountPct', val);
                              }}
                              min="0"
                              max="100"
                            />
                          </td>
                        )}
                        <td className="text-end py-3">
                          <div className="fw-bold text-dark fs-13">
                            ₹{(item.taxableAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                        </td>
                        <td className="py-3">
                          <select
                            className="form-select form-select-sm shadow-none fs-12 border bg-white"
                            value={item.gstRate}
                            onChange={(e) => handleItemChange(index, 'gstRate', parseFloat(e.target.value) || 0)}
                            disabled={item.taxType !== 'TAXABLE'}
                          >
                            {gstRates.map((rate) => (
                              <option key={rate} value={rate}>{rate}%</option>
                            ))}
                          </select>
                          <div className="fs-10 text-muted mt-1">
                            {String(formData.placeOfSupply).trim() !== String(company?.state_code || '27').trim() ? (
                              <span>IGST: ₹{(item.igstAmount || 0).toFixed(2)}</span>
                            ) : (
                              <span>CGST/SGST: ₹{(item.cgstAmount || 0).toFixed(2)}</span>
                            )}
                          </div>
                        </td>
                        <td className="text-end py-3 pe-3">
                          <div className="fw-bold text-primary fs-14">
                            ₹{(item.totalAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                        </td>
                        <td className="text-center py-3">
                          {formData.items.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-link link-danger p-0 shadow-none border-0"
                              onClick={() => removeItem(index)}
                            >
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

            <div className="row g-4">
              <div className="col-md-7">
                <div className="mb-3">
                  <label className="form-label fw-600 text-muted fs-12 uppercase">Remarks</label>
                  <textarea
                    className="form-control shadow-none border border-dashed p-3"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Brief description or internal notes..."
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-600 text-muted fs-12 uppercase">Terms & Conditions</label>
                  <textarea
                    className="form-control shadow-none border border-dashed p-3"
                    name="termsAndConditions"
                    value={formData.termsAndConditions}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Standard payment terms, warranty info, etc."
                  ></textarea>
                </div>

                <div className="card bg-soft-light border-0">
                  <div className="card-header bg-transparent border-0 py-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="mb-0 fw-bold fs-14">Additional Charges (Freight/Others)</h6>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary rounded-pill border-0 px-3"
                        onClick={() => {
                          const newCharges = [...formData.additional_charges, { name: '', amount: 0, gstRate: 18 }];
                          setFormData(prev => ({ ...prev, additional_charges: newCharges }));
                        }}
                      >
                        <i className="isax isax-add me-1"></i>Add Charge
                      </button>
                    </div>
                  </div>
                  <div className="card-body pt-0 pb-3">
                    {formData.additional_charges.map((charge, cidx) => (
                      <div className="row g-2 mb-2 align-items-center" key={cidx}>
                        <div className="col-md-5">
                          <input
                            type="text"
                            className="form-control form-control-sm border-0 bg-white"
                            placeholder="Charge Name (e.g. Packing)"
                            value={charge.name}
                            onChange={(e) => {
                              const newCharges = [...formData.additional_charges];
                              newCharges[cidx].name = e.target.value;
                              setFormData(prev => ({ ...prev, additional_charges: newCharges }));
                            }}
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="number"
                            className="form-control form-control-sm border-0 bg-white"
                            placeholder="Amount"
                            value={charge.amount}
                            onChange={(e) => {
                              const newCharges = [...formData.additional_charges];
                              newCharges[cidx].amount = parseFloat(e.target.value) || 0;
                              setFormData(prev => ({ ...prev, additional_charges: newCharges }));
                              calculateSummary(formData.items, newCharges);
                            }}
                          />
                        </div>
                        <div className="col-md-3">
                          <select
                            className="form-select form-select-sm border-0 bg-white"
                            value={charge.gstRate}
                            onChange={(e) => {
                              const newCharges = [...formData.additional_charges];
                              newCharges[cidx].gstRate = parseFloat(e.target.value) || 0;
                              setFormData(prev => ({ ...prev, additional_charges: newCharges }));
                              calculateSummary(formData.items, newCharges);
                            }}
                          >
                            <option value="0">0%</option>
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                            <option value="28">28%</option>
                          </select>
                        </div>
                        <div className="col-md-1">
                          <button
                            type="button"
                            className="btn btn-link link-danger p-0 border-0 shadow-none"
                            onClick={() => {
                              const newCharges = formData.additional_charges.filter((_, i) => i !== cidx);
                              setFormData(prev => ({ ...prev, additional_charges: newCharges }));
                              calculateSummary(formData.items, newCharges);
                            }}
                          >
                            <i className="isax isax-trash fs-16"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="card bg-light border-0 rounded-16 p-2">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Sub Total</span>
                      <span className="fw-semibold text-dark">₹{formData.summary.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Line Discount</span>
                      <span className="fw-semibold text-danger">- ₹{formData.summary.totalDiscount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Taxable Amount</span>
                      <span className="fw-semibold text-dark">₹{formData.summary.taxableAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>

                    {formData.summary.igst > 0 && (
                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">IGST Total</span>
                        <span className="fw-semibold text-dark">₹{formData.summary.igst.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}

                    {formData.summary.cgst > 0 && (
                      <>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="text-muted">CGST Total</span>
                          <span className="fw-semibold text-dark">₹{formData.summary.cgst.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="text-muted">SGST Total</span>
                          <span className="fw-semibold text-dark">₹{formData.summary.sgst.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                      </>
                    )}

                    {formData.summary.additionalCharges > 0 && (
                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">Addl. Charges</span>
                        <span className="fw-semibold text-dark">₹{formData.summary.additionalCharges.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}
                    {formData.summary.additionalChargesTax > 0 && (
                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">Addl. Charges GST</span>
                        <span className="fw-semibold text-dark">₹{formData.summary.additionalChargesTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}

                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Round Off</span>
                      <span className="fw-semibold text-dark">{formData.summary.roundOff >= 0 ? '+' : ''}₹{formData.summary.roundOff.toFixed(2)}</span>
                    </div>

                    <div className="bg-primary bg-opacity-10 p-3 rounded-12 mt-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold fs-16 text-primary">Net Total</span>
                        <span className="h4 fw-bold text-primary mb-0">₹{formData.summary.netTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>

                      {selectedCustomer?.credit_limit > 0 && formData.summary.netTotal > selectedCustomer.credit_limit && (
                        <div className="alert alert-soft-danger d-flex align-items-center mt-3 mb-0 p-2 border-0 rounded-8">
                          <i className="isax isax-warning-2 me-2 fs-18"></i>
                          <div className="fs-12 fw-medium">
                            Invoice exceeds credit limit of ₹{parseFloat(selectedCustomer.credit_limit).toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3 mt-5">
              <Link to="/invoicing/sales" className="btn btn-outline-secondary px-5 rounded-pill shadow-none border">
                Discard Changes
              </Link>
              <button type="submit" className="btn btn-primary px-5 rounded-pill shadow-none border-0" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Processing...
                  </>
                ) : (
                  'Generate Invoice'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ProductFormModal
        isOpen={productModal.isOpen}
        onClose={() => setProductModal({ isOpen: false, index: null })}
        onSuccess={handleProductCreated}
      />

      <CustomerFormModal
        show={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        onSubmit={handleQuickCustomerAdd}
        isLoading={customerFormLoading}
      />
    </div>
  );
};

export default AddSalesInvoice;

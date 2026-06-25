import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCustomers } from '../services/customerService';
import { getItems, getItemById } from '../services/itemService';
import { getSalesOrders } from '../services/salesOrderService';
import { getSalesInvoiceById, updateSalesInvoice } from '../services/salesInvoiceService';
import { getWarehouses, getCompanySettings } from '../services/settingsService';
import { getUoms } from '../services/uomService';
import branchService from '../services/branchService';
import { getEcommerceOperators } from '../services/ecommerceOperatorService';
import { toast } from 'react-toastify';
import { INDIAN_STATES } from '../utils/constants';
import Swal from 'sweetalert2';
import { useAuth } from '../components/AuthContext';

const EditSalesInvoice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { activeCompany } = useAuth();

  // Master data
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [ecommerceOperators, setEcommerceOperators] = useState([]);
  const [errors, setErrors] = useState({});

  const states = INDIAN_STATES;

  const [uoms, setUoms] = useState([]);
  const [gstRates] = useState([0, 5, 12, 18, 28]);

  const [formData, setFormData] = useState({
    branchId: '',
    customerId: '',
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    financialYearId: '',
    salesOrderId: '',
    invoiceType: 'B2B',
    placeOfSupply: '',
    reverseCharge: false,
    remarks: '',
    invoice_layout: 'PRODUCTS',
    ecommerce_operator_id: '',
    ecommerce_operator_gstin: '',
    ref_customer_name: '',
    ref_customer_address: '',
    ref_customer_type: 'CONSUMER',
    ref_customer_place_of_supply: '',
    ref_customer_invoice_no: '',
    ref_customer_invoice_date: '',
    termsAndConditions: '',
    items: [
      {
        itemId: '',
        description: '',
        hsnCode: '',
        qty: 1,
        uomId: 'PCS',
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
    additional_charges: [],
    summary: {
      subtotal: 0,
      totalDiscount: 0,
      taxableAmount: 0,
      igst: 0,
      cgst: 0,
      sgst: 0,
      cess: 0,
      additionalCharges: 0,
      additionalChargesTax: 0,
      roundOff: 0,
      netTotal: 0,
    },
  });

  // Load data on mount
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const [custRes, itemRes, orderRes, whRes, companyRes, uomRes, branchRes, invoiceRes] = await Promise.all([
          getCustomers(1, 1000),
          getItems(1, 1000),
          getSalesOrders(1, 1000),
          getWarehouses(),
          getCompanySettings(),
          getUoms(1, 1000),
          branchService.getBranches(),
          getSalesInvoiceById(id)
        ]);

        const customerList = custRes.data?.rows || custRes.data || [];
        const itemList = itemRes.data?.rows || itemRes.data || [];
        const orderList = orderRes.data?.rows || orderRes.data || [];
        const warehouseList = whRes.data || [];
        const companyData = companyRes.data;
        const branchList = Array.isArray(branchRes.data) ? branchRes.data : [];
        const inv = invoiceRes.data;

        setWarehouses(warehouseList);
        setCompany(companyData);
        setBranches(branchList);
        setSalesOrders(orderList);
        setUoms(Array.isArray(uomRes.data) ? uomRes.data : uomRes.data?.rows || []);

        let operatorsList = [];
        try {
          const opRes = await getEcommerceOperators({ page: 1, limit: 1000 });
          operatorsList = Array.isArray(opRes.data) ? opRes.data : (opRes.data?.rows || []);
        } catch (err) {
          console.warn("Failed to load ecommerce operators", err);
        }
        setEcommerceOperators(operatorsList);

        if (inv) {
          // Virtual Injection
          const augmentedCustomers = [...customerList];
          const invCustId = String(inv.customer_id || inv.customerId || '').trim();
          if (inv.customer && !augmentedCustomers.some(c => String(c.id).trim() === invCustId)) {
            augmentedCustomers.push(inv.customer);
          }
          setCustomers(augmentedCustomers);

          // Set selected customer for credit limit check
          const currentCust = augmentedCustomers.find(c => String(c.id).trim() === invCustId);
          if (currentCust) setSelectedCustomer(currentCust);

          const augmentedItems = [...itemList];
          (inv.items || []).forEach(oi => {
            const oiId = String(oi.item_id || oi.itemId || '').trim();
            if (oi.item && !augmentedItems.some(i => String(i.id).trim() === oiId)) {
              augmentedItems.push(oi.item);
            }
          });
          setItems(augmentedItems);

          const parsedCharges = (() => {
            try {
              return typeof inv.additional_charges === 'string' ? JSON.parse(inv.additional_charges) : (inv.additional_charges || []);
            } catch (e) { return []; }
          })();

          let chargesTotal = 0;
          let chargesTax = 0;
          parsedCharges.forEach(c => {
            chargesTotal += parseFloat(c.amount) || 0;
            chargesTax += ((parseFloat(c.amount) || 0) * (parseFloat(c.gstRate || c.gst_rate) || 0)) / 100;
          });

          let baseSubtotal = parseFloat(inv.taxable_amount) || 0;
          let baseTax = (parseFloat(inv.igst) || 0) + (parseFloat(inv.cgst) || 0) + (parseFloat(inv.sgst) || 0) + (parseFloat(inv.cess) || 0);
          const currentNetTotal = parseFloat(inv.net_total) || 0;
          const netWithoutCharges = Math.round(baseSubtotal + baseTax);

          let finalNetTotal = currentNetTotal;
          let finalRoundOff = parseFloat(inv.round_off) || 0;

          if (Math.abs(currentNetTotal - netWithoutCharges) <= 1 && chargesTotal > 0) {
            const beforeRoundOff = baseSubtotal + baseTax + chargesTotal + chargesTax;
            finalNetTotal = Math.round(beforeRoundOff);
            finalRoundOff = finalNetTotal - beforeRoundOff;
          }

          let parsedRemarksText = inv.remarks || '';
          let isEcommerce = false;
          let ecommerceOperatorId = inv.ecommerce_operator_id || '';
          let ecommerceOperatorGstin = inv.ecommerce_operator_gstin || '';
          let refCustomerName = inv.ref_customer_name || '';
          let refCustomerAddress = inv.ref_customer_address || '';
          let refCustomerType = inv.ref_customer_type || 'CONSUMER';
          let refCustomerPlaceOfSupply = inv.ref_customer_place_of_supply || '';
          let refCustomerInvoiceNo = inv.ref_customer_invoice_no || '';
          let refCustomerInvoiceDate = inv.ref_customer_invoice_date || '';

          try {
            if (inv.remarks && inv.remarks.trim().startsWith('{')) {
              const parsed = JSON.parse(inv.remarks);
              if (parsed && (parsed.is_ecommerce || parsed.ecommerce_operator_id)) {
                parsedRemarksText = parsed.text || '';
                isEcommerce = true;
                if (parsed.ecommerce_operator_id) ecommerceOperatorId = String(parsed.ecommerce_operator_id);
                if (parsed.ref_customer_name) refCustomerName = parsed.ref_customer_name;
                if (parsed.ref_customer_address) refCustomerAddress = parsed.ref_customer_address;
                if (parsed.ref_customer_type) refCustomerType = parsed.ref_customer_type;
                if (parsed.ref_customer_place_of_supply) refCustomerPlaceOfSupply = parsed.ref_customer_place_of_supply;
                if (parsed.ref_customer_invoice_no) refCustomerInvoiceNo = parsed.ref_customer_invoice_no;
                if (parsed.ref_customer_invoice_date) refCustomerInvoiceDate = parsed.ref_customer_invoice_date;
              }
            }
          } catch (e) {
            console.warn("Failed to parse remarks JSON:", e);
          }

          setFormData({
            branchId: String(inv.branch_id || '').trim(),
            customerId: invCustId,
            invoiceNumber: inv.invoice_number || '',
            invoiceDate: (inv.invoice_date || '').split('T')[0],
            dueDate: (inv.due_date || '').split('T')[0],
            financialYearId: String(inv.financial_year_id || '').trim(),
            salesOrderId: String(inv.sales_order_id || '').trim(),
            invoiceType: inv.invoice_type || 'B2B',
            placeOfSupply: String(inv.place_of_supply || inv.customer?.state_code || '27').trim(),
            reverseCharge: inv.reverse_charge || false,
            remarks: parsedRemarksText,
            termsAndConditions: inv.terms_and_conditions || '',
            invoice_layout: isEcommerce || inv.invoice_layout === 'ECOMMERCE' || inv.ecommerce_operator_gstin ? 'ECOMMERCE' : (inv.invoice_layout || 'PRODUCTS'),
            ecommerce_operator_id: ecommerceOperatorId,
            ecommerce_operator_gstin: ecommerceOperatorGstin,
            ref_customer_name: refCustomerName,
            ref_customer_address: refCustomerAddress,
            ref_customer_type: refCustomerType,
            ref_customer_place_of_supply: refCustomerPlaceOfSupply,
            ref_customer_invoice_no: refCustomerInvoiceNo,
            ref_customer_invoice_date: refCustomerInvoiceDate ? refCustomerInvoiceDate.split('T')[0] : '',
            additional_charges: parsedCharges,
            items: (inv.items || []).map(item => ({
              itemId: String(item.item_id || item.itemId || '').trim(),
              description: item.description || item.item?.name || '',
              hsnCode: item.hsn_code || '',
              qty: !isNaN(parseFloat(item.qty)) ? parseFloat(item.qty) : 1,
              uomId: item.uom_id || '',
              rate: parseFloat(item.rate) || 0,
              discountPct: parseFloat(item.discount_percent || item.discount_pct) || 0,
              discountAmount: parseFloat(item.discount_amount) || 0,
              taxableAmount: parseFloat(item.taxable_amount) || 0,
              gstRate: !isNaN(parseInt(item.gst_rate)) ? parseInt(item.gst_rate) : 18,
              igstAmount: parseFloat(item.igst_amount) || 0,
              cgstAmount: parseFloat(item.cgst_amount) || 0,
              sgstAmount: parseFloat(item.sgst_amount) || 0,
              cessAmount: parseFloat(item.cess_amount) || 0,
              totalAmount: parseFloat(item.total_amount) || 0,
              taxType: item.tax_type || item.taxType || 'TAXABLE',
              warehouseId: String(item.warehouse_id || '').trim(),
            })),
            summary: {
              subtotal: baseSubtotal,
              totalDiscount: parseFloat(inv.discount) || 0,
              taxableAmount: baseSubtotal,
              igst: parseFloat(inv.igst) || 0,
              cgst: parseFloat(inv.cgst) || 0,
              sgst: parseFloat(inv.sgst) || 0,
              cess: parseFloat(inv.cess) || 0,
              additionalCharges: chargesTotal,
              additionalChargesTax: chargesTax,
              roundOff: finalRoundOff,
              netTotal: finalNetTotal,
            }
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load invoice data');
        navigate('/invoicing/sales');
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const calculateLineGST = (item, companyState, placeOfSupply) => {
    const taxable = item.taxableAmount || 0;
    // Convert to string to avoid type mismatch (e.g. number 27 vs string '27')
    const isInterState = String(companyState).trim() !== String(placeOfSupply).trim();

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

  const calculateSummary = (items, placeOfSupply, chargesList) => {
    const companyState = String(company?.state_code || '27').trim();
    const currentCharges = chargesList || formData.additional_charges || [];
    const subtotal = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const totalDiscount = items.reduce((sum, item) => sum + item.discountAmount, 0);
    const taxableAmount = items.reduce((sum, item) => sum + item.taxableAmount, 0);

    let totalIgst = 0, totalCgst = 0, totalSgst = 0, totalCess = 0;

    items.forEach(item => {
      const gst = calculateLineGST(item, companyState, placeOfSupply);
      totalIgst += gst.igst;
      totalCgst += gst.cgst;
      totalSgst += gst.sgst;
      totalCess += gst.cess;
    });

    const chargesTotal = currentCharges.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);
    const chargesTax = currentCharges.reduce((sum, c) => sum + ((parseFloat(c.amount) || 0) * (parseFloat(c.gstRate || c.gst_rate) || 0)) / 100, 0);

    const beforeRoundOff = taxableAmount + totalIgst + totalCgst + totalSgst + totalCess + chargesTotal + chargesTax;
    const netTotal = Math.round(beforeRoundOff);
    const roundOff = netTotal - beforeRoundOff;

    setFormData(prev => ({
      ...prev,
      summary: {
        subtotal,
        totalDiscount,
        taxableAmount,
        igst: totalIgst,
        cgst: totalCgst,
        sgst: totalSgst,
        cess: totalCess,
        additionalCharges: chargesTotal,
        additionalChargesTax: chargesTax,
        roundOff,
        netTotal
      }
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));

    setFormData(prev => {
      const updated = { ...prev, [name]: newValue };
      if (name === 'invoiceDate') {
        const selectedCustomer = customers.find((c) => String(c.id) === String(prev.customerId));
        if (selectedCustomer) {
          let creditDays = 0;
          if (selectedCustomer.payment_terms === 'net30') {
            creditDays = 30;
          } else if (selectedCustomer.payment_terms === 'net45') {
            creditDays = 45;
          } else if (selectedCustomer.payment_terms === 'net60') {
            creditDays = 60;
          } else if (selectedCustomer.payment_terms === 'custom') {
            creditDays = parseInt(selectedCustomer.payment_terms_days) || 0;
          } else {
            creditDays = parseInt(selectedCustomer.credit_limit_days || selectedCustomer.credit_days) || 0;
          }
          if (creditDays > 0) creditDays -= 1; // Include invoice date as day 1
          const dueDate = new Date(newValue);
          if (!isNaN(dueDate.getTime())) {
            dueDate.setDate(dueDate.getDate() + creditDays);
            updated.dueDate = dueDate.toISOString().split('T')[0];
          }
        }
      }
      if (name === 'placeOfSupply') {
        calculateSummary(prev.items, newValue);
      }
      return updated;
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === 'qty' || field === 'rate' || field === 'discountPct' || field === 'gstRate' || field === 'taxType') {
      if (field === 'taxType' && value !== 'TAXABLE') {
        newItems[index].gstRate = 0;
      }
      const qty = parseFloat(newItems[index].qty) || 0;
      const rate = parseFloat(newItems[index].rate) || 0;
      const gstRate = parseFloat(newItems[index].gstRate) || 0;
      const discountPct = parseFloat(newItems[index].discountPct) || 0;
      let taxableAmount = 0;
      let lineTotal = qty * rate;

      if (newItems[index].taxType === 'INCLUSIVE') {
        const totalNet = lineTotal * (1 - discountPct / 100);
        taxableAmount = totalNet / (1 + gstRate / 100);
        newItems[index].discountAmount = lineTotal * (discountPct / 100);
      } else {
        const discountAmount = (lineTotal * discountPct) / 100;
        newItems[index].discountAmount = discountAmount;
        taxableAmount = lineTotal - discountAmount;
      }

      newItems[index].taxableAmount = taxableAmount;

      const gst = calculateLineGST(newItems[index], company?.state_code || '27', formData.placeOfSupply);
      newItems[index].igstAmount = gst.igst;
      newItems[index].cgstAmount = gst.cgst;
      newItems[index].sgstAmount = gst.sgst;
      newItems[index].cessAmount = gst.cess;

      if (newItems[index].taxType === 'INCLUSIVE') {
        newItems[index].totalAmount = lineTotal * (1 - discountPct / 100);
      } else {
        newItems[index].totalAmount = newItems[index].taxableAmount + gst.igst + gst.cgst + gst.sgst + gst.cess;
      }
    }

    setFormData(prev => ({ ...prev, items: newItems }));
    calculateSummary(newItems, formData.placeOfSupply);
  };

  const handleItemSelect = async (index, itemId) => {
    let selectedItem = items.find(i => String(i.id) === String(itemId));
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
      newItems[index] = {
        ...newItems[index],
        itemId,
        description: selectedItem.name,
        hsnCode: selectedItem.hsn_code || '',
        uomId: selectedItem.uom_id || 'PCS',
        rate: selectedItem.sales_price || selectedItem.base_price || 0,
        gstRate: selectedItem.tax_rate || 18,
      };

      const qty = parseFloat(newItems[index].qty) || 0;
      const rate = parseFloat(newItems[index].rate) || 0;
      const gstRate = parseFloat(newItems[index].gstRate) || 0;
      const discountPct = parseFloat(newItems[index].discountPct) || 0;
      let taxableAmount = 0;
      let lineTotal = qty * rate;

      if (newItems[index].taxType === 'INCLUSIVE') {
        const totalNet = lineTotal * (1 - discountPct / 100);
        taxableAmount = totalNet / (1 + gstRate / 100);
        newItems[index].discountAmount = lineTotal * (discountPct / 100);
      } else {
        const discountAmount = (lineTotal * discountPct) / 100;
        newItems[index].discountAmount = discountAmount;
        taxableAmount = lineTotal - discountAmount;
      }

      newItems[index].taxableAmount = taxableAmount;

      const gst = calculateLineGST(newItems[index], company?.state_code || '27', formData.placeOfSupply);
      newItems[index].igstAmount = gst.igst;
      newItems[index].cgstAmount = gst.cgst;
      newItems[index].sgstAmount = gst.sgst;
      newItems[index].cessAmount = gst.cess || 0;

      if (newItems[index].taxType === 'INCLUSIVE') {
        newItems[index].totalAmount = lineTotal * (1 - discountPct / 100);
      } else {
        newItems[index].totalAmount = newItems[index].taxableAmount + gst.igst + gst.cgst + gst.sgst + (gst.cess || 0);
      }

      setFormData(prev => ({ ...prev, items: newItems }));
      calculateSummary(newItems, formData.placeOfSupply);
    }
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        itemId: '',
        description: '',
        hsnCode: '',
        qty: 1,
        uomId: 'PCS',
        rate: 0,
        discountPct: 0,
        discountAmount: 0,
        taxableAmount: 0,
        gstRate: 18,
        igstAmount: 0,
        cgstAmount: 0,
        sgstAmount: 0,
        cessAmount: 0,
        totalAmount: 0,
        warehouseId: warehouses[0]?.id || '',
      }]
    }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: newItems }));
    calculateSummary(newItems, formData.placeOfSupply);
  };

  const isServiceOnly = useMemo(() => {
    return localStorage.getItem('businessNature') === 'SERVICES' ||
      company?.business_nature?.toUpperCase() === 'SERVICES' ||
      activeCompany?.business_nature?.toUpperCase() === 'SERVICES';
  }, [company, activeCompany]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.invoiceDate && formData.dueDate) {
      if (new Date(formData.dueDate) < new Date(formData.invoiceDate)) {
        return toast.error('Due Date cannot be earlier than Invoice Date');
      }
    }

    if (!formData.customerId) return toast.error('Please select a customer');
    if (formData.items.some(item => !item.itemId)) return toast.error('Please select items');

    if (formData.invoice_layout === 'ECOMMERCE') {
      if (!formData.ecommerce_operator_id) {
        return toast.error('Please select an E-Commerce operator');
      }
      if (!formData.ecommerce_operator_gstin || formData.ecommerce_operator_gstin.trim() === '') {
        return toast.error('E-Commerce Operator GSTIN is required');
      }
      const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstinRegex.test(formData.ecommerce_operator_gstin.toUpperCase().trim())) {
        return toast.error('Invalid E-Commerce Operator GSTIN format');
      }
      if (!formData.ref_customer_name || formData.ref_customer_name.trim() === '') {
        return toast.error('Reference Customer Name is required');
      }
      if (!formData.ref_customer_address || formData.ref_customer_address.trim() === '') {
        return toast.error('Reference Customer Address is required');
      }
      if (!formData.ref_customer_place_of_supply || formData.ref_customer_place_of_supply.trim() === '') {
        return toast.error('Reference Customer Place of Supply is required');
      }
      if (!formData.ref_customer_invoice_no || formData.ref_customer_invoice_no.trim() === '') {
        return toast.error('Reference Customer Invoice Number is required');
      }
      if (!formData.ref_customer_invoice_date || formData.ref_customer_invoice_date.trim() === '') {
        return toast.error('Reference Customer Invoice Date is required');
      }
    }

    // Credit Limit Check
    const creditLimit = parseFloat(selectedCustomer?.credit_limit || 0);
    if (creditLimit > 0 && formData.summary.netTotal > creditLimit) {
      const result = await Swal.fire({
        title: 'Credit Limit Exceeded',
        text: `The invoice amount (₹${formData.summary.netTotal.toLocaleString()}) exceeds the customer's credit limit (₹${creditLimit.toLocaleString()}). Do you want to proceed?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Proceed',
        cancelButtonText: 'No, Cancel'
      });

      if (!result.isConfirmed) return;
    }

    if (formData.items.some((item) => !item.uomId)) return toast.error('Please select a Unit of Measure (UOM) for all items');

    setLoading(true);
    try {
      let finalRemarks = formData.remarks;
      if (formData.invoice_layout === 'ECOMMERCE') {
        const opName = ecommerceOperators.find(o => String(o.id) === String(formData.ecommerce_operator_id))?.name || '';
        finalRemarks = JSON.stringify({
          text: formData.remarks,
          is_ecommerce: true,
          ecommerce_operator_id: formData.ecommerce_operator_id,
          ecommerce_operator_name: opName,
          ref_customer_name: formData.ref_customer_name,
          ref_customer_address: formData.ref_customer_address,
          ref_customer_type: formData.ref_customer_type,
          ref_customer_place_of_supply: formData.ref_customer_place_of_supply,
          ref_customer_invoice_no: formData.ref_customer_invoice_no,
          ref_customer_invoice_date: formData.ref_customer_invoice_date
        });
      }

      const payload = {
        ...formData,
        remarks: finalRemarks,
        ecommerce_operator_id: formData.invoice_layout === 'ECOMMERCE' ? (formData.ecommerce_operator_id || null) : null,
        ecommerce_operator_gstin: formData.invoice_layout === 'ECOMMERCE' ? (formData.ecommerce_operator_gstin || null) : null,
        ref_customer_name: formData.invoice_layout === 'ECOMMERCE' ? (formData.ref_customer_name || null) : null,
        ref_customer_address: formData.invoice_layout === 'ECOMMERCE' ? (formData.ref_customer_address || null) : null,
        ref_customer_type: formData.invoice_layout === 'ECOMMERCE' ? (formData.ref_customer_type || null) : null,
        ref_customer_place_of_supply: formData.invoice_layout === 'ECOMMERCE' ? (formData.ref_customer_place_of_supply || null) : null,
        ref_customer_invoice_no: formData.invoice_layout === 'ECOMMERCE' ? (formData.ref_customer_invoice_no || null) : null,
        ref_customer_invoice_date: formData.invoice_layout === 'ECOMMERCE' ? (formData.ref_customer_invoice_date || null) : null,
        additional_charges: formData.additional_charges
          .filter(c => c.name && parseFloat(c.amount) > 0)
          .map(c => ({
            name: c.name,
            amount: parseFloat(c.amount),
            gst_rate: parseFloat(c.gstRate || c.gst_rate || 0)
          }))
      };
      await updateSalesInvoice(id, payload);
      toast.success('Invoice updated successfully!');
      navigate('/invoicing/sales');
    } catch (error) {
      toast.error(error.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="fw-bold mb-1">Edit Sales Invoice</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/invoicing/sales">Sales Invoices</Link></li>
              <li className="breadcrumb-item active">Edit #{formData.invoiceNumber}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-16">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {(() => {
              if (isServiceOnly) return null;
              return (
                <div className="card border-0 bg-light p-3 mb-4 rounded-3 text-center">
                  <h6 className="fw-bold mb-2">Select Invoice Layout</h6>
                  <div className="d-flex justify-content-center gap-3">
                    <button
                      type="button"
                      className={`btn px-4 py-2 ${formData.invoice_layout === 'PRODUCTS' ? 'btn-primary' : 'btn-outline-primary bg-white'}`}
                      onClick={() => setFormData(prev => ({ ...prev, invoice_layout: 'PRODUCTS' }))}
                    >
                      <i className="isax isax-box me-2"></i>Product-Based
                    </button>
                    <button
                      type="button"
                      className={`btn px-4 py-2 ${formData.invoice_layout === 'SERVICES' ? 'btn-primary' : 'btn-outline-primary bg-white'}`}
                      onClick={() => setFormData(prev => ({ ...prev, invoice_layout: 'SERVICES' }))}
                    >
                      <i className="isax isax-activity me-2"></i>Service-Based
                    </button>
                    <button
                      type="button"
                      className={`btn px-4 py-2 ${formData.invoice_layout === 'ECOMMERCE' ? 'btn-primary' : 'btn-outline-primary bg-white'}`}
                      onClick={() => setFormData(prev => ({ ...prev, invoice_layout: 'ECOMMERCE' }))}
                    >
                      <i className="isax isax-shopping-bag me-2"></i>E-Commerce Operator
                    </button>
                  </div>
                </div>
              );
            })()}

            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <label className="form-label fs-13 text-muted">Branch / Location *</label>
                <select className="form-select fs-14" name="branchId" value={String(formData.branchId)} onChange={handleInputChange} required>
                  <option value="">Select Branch</option>
                  {branches.map(b => <option key={b.id} value={String(b.id)}>{b.name} ({b.branch_code})</option>)}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fs-13 text-muted">Invoice No. *</label>
                <input
                  type="text"
                  className="form-control fs-14 bg-light"
                  value={formData.invoiceNumber}
                  readOnly
                  title="Invoice number cannot be changed after creation"
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fs-13 text-muted">Customer *</label>
                <select key={`cust-${customers.length}`} className="form-select fs-14" value={String(formData.customerId)} onChange={(e) => {
                  const customerId = e.target.value;
                  const cust = customers.find(c => String(c.id) === customerId);
                  setSelectedCustomer(cust || null);
                  const newPlaceOfSupply = cust?.state_code || company?.state_code || '';

                  setFormData(prev => {
                    const updated = {
                      ...prev,
                      customerId: customerId,
                      placeOfSupply: newPlaceOfSupply
                    };

                    if (prev.invoiceDate && cust) {
                      let creditDays = 0;
                      if (cust.payment_terms === 'net30') {
                        creditDays = 30;
                      } else if (cust.payment_terms === 'net45') {
                        creditDays = 45;
                      } else if (cust.payment_terms === 'net60') {
                        creditDays = 60;
                      } else if (cust.payment_terms === 'custom') {
                        creditDays = parseInt(cust.payment_terms_days) || 0;
                      } else {
                        creditDays = parseInt(cust.credit_limit_days || cust.credit_days) || 0;
                      }
                      if (creditDays > 0) creditDays -= 1; // Include invoice date as day 1
                      const dueDate = new Date(prev.invoiceDate);
                      dueDate.setDate(dueDate.getDate() + creditDays);
                      updated.dueDate = dueDate.toISOString().split('T')[0];
                    }

                    // Re-calculate all items GST based on new place of supply
                    updated.items = prev.items.map(item => {
                      const gst = calculateLineGST(item, company?.state_code || '27', newPlaceOfSupply);
                      return {
                        ...item,
                        igstAmount: gst.igst,
                        cgstAmount: gst.cgst,
                        sgstAmount: gst.sgst,
                        totalAmount: item.taxableAmount + gst.igst + gst.cgst + gst.sgst + (gst.cess || 0),
                      };
                    });

                    return updated;
                  });

                  // Trigger summary calculation
                  setFormData(prev => {
                    calculateSummary(prev.items, newPlaceOfSupply);
                    return prev;
                  });
                }} required>
                  <option value="">Select Customer</option>
                  {customers.map(c => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fs-13 text-muted">Invoice Date *</label>
                <input type="date" className="form-control fs-14" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label fs-13 text-muted">Place of Supply *</label>
                <select className="form-select fs-14" name="placeOfSupply" value={String(formData.placeOfSupply)} onChange={handleInputChange} required>
                  <option value="">Select Place of Supply</option>
                  {states.map(s => <option key={s.code} value={String(s.code)}>{s.name} ({s.code})</option>)}
                </select>
              </div>
              <div className="col-md-3 d-none">
                <label className="form-label fs-13 text-muted">Invoice Type</label>
                <select className="form-select fs-14" name="invoiceType" value={formData.invoiceType} onChange={handleInputChange}>
                  <option value="B2B">B2B</option>
                  <option value="B2C">B2C</option>
                  <option value="EXPORT">EXPORT</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fs-13 text-muted">Invoice Layout</label>
                <select className="form-select fs-14" name="invoice_layout" value={formData.invoice_layout || 'PRODUCTS'} onChange={handleInputChange}>
                  <option value="PRODUCTS">Products</option>
                  <option value="SERVICES">Services</option>
                  <option value="ECOMMERCE">E-Commerce</option>
                </select>
              </div>
            </div>

            {formData.invoice_layout === 'ECOMMERCE' && (
              <div className="card border-0 bg-light p-3 mb-4 rounded-3 border-start border-primary border-3">
                <h6 className="fw-bold mb-3 text-primary fs-14">
                  <i className="isax isax-shopping-cart me-2"></i>E-Commerce Platform & Buyer Reference Details
                </h6>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label fs-13 text-muted">E-Commerce Operator <span className="text-danger">*</span></label>
                    <select
                      className={`form-select fs-14 bg-white ${errors.ecommerce_operator_id ? 'is-invalid' : ''}`}
                      name="ecommerce_operator_id"
                      value={formData.ecommerce_operator_id || ''}
                      onChange={(e) => {
                        const opId = e.target.value;
                        const operator = ecommerceOperators.find(o => String(o.id) === String(opId));
                        setFormData(prev => ({
                          ...prev,
                          ecommerce_operator_id: opId,
                          ecommerce_operator_gstin: operator ? operator.gstin : ''
                        }));
                        if (errors.ecommerce_operator_id) setErrors(prev => ({ ...prev, ecommerce_operator_id: null }));
                        if (errors.ecommerce_operator_gstin) setErrors(prev => ({ ...prev, ecommerce_operator_gstin: null }));
                      }}
                    >
                      <option value="">Select Platform Operator</option>
                      {ecommerceOperators.map(o => (
                        <option key={o.id} value={o.id}>{o.name}</option>
                      ))}
                    </select>
                    {errors.ecommerce_operator_id && <div className="invalid-feedback">{errors.ecommerce_operator_id}</div>}
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fs-13 text-muted">Operator GSTIN</label>
                    <input
                      type="text"
                      className={`form-control fs-14 bg-light ${errors.ecommerce_operator_gstin ? 'is-invalid' : ''}`}
                      value={formData.ecommerce_operator_gstin || ''}
                      readOnly
                      placeholder="Operator GSTIN"
                    />
                    {errors.ecommerce_operator_gstin && <div className="invalid-feedback">{errors.ecommerce_operator_gstin}</div>}
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fs-13 text-muted">Ref. Buyer Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className={`form-control fs-14 bg-white ${errors.ref_customer_name ? 'is-invalid' : ''}`}
                      name="ref_customer_name"
                      value={formData.ref_customer_name || ''}
                      onChange={handleInputChange}
                      placeholder="Enter buyer name"
                    />
                    {errors.ref_customer_name && <div className="invalid-feedback">{errors.ref_customer_name}</div>}
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fs-13 text-muted">Ref. Buyer Registration Type <span className="text-danger">*</span></label>
                    <select
                      className="form-select fs-14 bg-white"
                      name="ref_customer_type"
                      value={formData.ref_customer_type || 'CONSUMER'}
                      onChange={handleInputChange}
                    >
                      <option value="CONSUMER">Consumer / Unregistered</option>
                      <option value="REGISTERED">Registered Business (B2B)</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fs-13 text-muted">Ref. Buyer Place of Supply <span className="text-danger">*</span></label>
                    <select
                      className={`form-select fs-14 bg-white ${errors.ref_customer_place_of_supply ? 'is-invalid' : ''}`}
                      name="ref_customer_place_of_supply"
                      value={formData.ref_customer_place_of_supply || ''}
                      onChange={handleInputChange}
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(s => (
                        <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
                      ))}
                    </select>
                    {errors.ref_customer_place_of_supply && <div className="invalid-feedback">{errors.ref_customer_place_of_supply}</div>}
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fs-13 text-muted">Ref. Platform Invoice Number <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className={`form-control fs-14 bg-white ${errors.ref_customer_invoice_no ? 'is-invalid' : ''}`}
                      name="ref_customer_invoice_no"
                      value={formData.ref_customer_invoice_no || ''}
                      onChange={handleInputChange}
                      placeholder="e.g. AZ-12345"
                    />
                    {errors.ref_customer_invoice_no && <div className="invalid-feedback">{errors.ref_customer_invoice_no}</div>}
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fs-13 text-muted">Ref. Platform Invoice Date <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className={`form-control fs-14 bg-white ${errors.ref_customer_invoice_date ? 'is-invalid' : ''}`}
                      name="ref_customer_invoice_date"
                      value={formData.ref_customer_invoice_date || ''}
                      onChange={handleInputChange}
                    />
                    {errors.ref_customer_invoice_date && <div className="invalid-feedback">{errors.ref_customer_invoice_date}</div>}
                  </div>

                  <div className="col-md-12">
                    <label className="form-label fs-13 text-muted">Ref. Buyer Address <span className="text-danger">*</span></label>
                    <textarea
                      className={`form-control fs-14 bg-white ${errors.ref_customer_address ? 'is-invalid' : ''}`}
                      name="ref_customer_address"
                      value={formData.ref_customer_address || ''}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="Enter buyer complete billing address"
                    />
                    {errors.ref_customer_address && <div className="invalid-feedback">{errors.ref_customer_address}</div>}
                  </div>
                </div>
              </div>
            )}

            <div className="table-responsive border rounded-12 mb-4">
              <table className="table align-middle table-nowrap mb-0">
                <thead className="bg-light fs-12 text-muted fw-bold uppercase">
                  <tr>
                    <th width={formData.invoice_layout === 'SERVICES' ? '40%' : '25%'}>
                      {formData.invoice_layout === 'SERVICES' ? 'Service Details' : 'Item'}
                    </th>
                    {formData.invoice_layout !== 'SERVICES' && <th width="15%">Warehouse</th>}
                    {formData.invoice_layout !== 'SERVICES' && <th width="12%">UOM</th>}
                    {formData.invoice_layout !== 'SERVICES' && <th width="10%">Qty</th>}
                    <th width="12%">Rate</th>
                    <th width="10%">Tax Type</th>
                    <th width="8%">GST %</th>
                    <th width="12%" className="text-end">Total</th>
                    <th width="50"></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <select key={`item-${index}-${items.length}`} className="form-select form-select-sm" value={String(item.itemId)} onChange={(e) => handleItemSelect(index, e.target.value)} required>
                          <option value="">{formData.invoice_layout === 'SERVICES' ? 'Select Service' : 'Select Item'}</option>
                          {(formData.invoice_layout === 'SERVICES'
                            ? items.filter(i => String(i.inventory_type).toLowerCase() === 'service')
                            : items
                          ).map(i => <option key={i.id} value={String(i.id)}>{i.name}</option>)}
                        </select>
                        <small className="text-muted fs-11 mt-1 d-block">
                          {formData.invoice_layout === 'SERVICES' ? 'SAC' : 'HSN'}: {item.hsnCode || 'N/A'}
                        </small>
                      </td>
                      {formData.invoice_layout !== 'SERVICES' && (
                        <td>
                          <select key={`wh-${index}-${warehouses.length}`} className="form-select form-select-sm" value={String(item.warehouseId)} onChange={(e) => handleItemChange(index, 'warehouseId', e.target.value)}>
                            {warehouses.map(w => <option key={w.id} value={String(w.id)}>{w.name}</option>)}
                          </select>
                        </td>
                      )}
                      {formData.invoice_layout !== 'SERVICES' && (
                        <td>
                          <select className="form-select form-select-sm" value={item.uomId} onChange={(e) => handleItemChange(index, 'uomId', e.target.value)} required>
                            <option value="">Select UOM</option>
                            {uoms.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                          </select>
                        </td>
                      )}
                      {formData.invoice_layout !== 'SERVICES' && (
                        <td>
                          <input type="number" className="form-control form-control-sm" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', parseFloat(e.target.value) || 0)} min="0" step="any" />
                        </td>
                      )}
                      <td>
                        <input type="number" className="form-control form-control-sm" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)} min="0" />
                      </td>
                      <td>
                        <select className="form-select form-select-sm" value={item.taxType} onChange={(e) => handleItemChange(index, 'taxType', e.target.value)}>
                          <option value="TAXABLE">Taxable</option>
                          <option value="INCLUSIVE">Inclusive / MRP</option>
                          <option value="EXEMPT">Exempt</option>
                          <option value="NIL_RATED">Nil Rated</option>
                          <option value="NON_GST">Non GST</option>
                        </select>
                      </td>
                      <td>
                        <select className="form-select form-select-sm" value={item.gstRate} onChange={(e) => handleItemChange(index, 'gstRate', parseInt(e.target.value))}>
                          {gstRates.map(r => <option key={r} value={r}>{r}%</option>)}
                        </select>
                      </td>
                      <td className="text-end fw-bold">₹{Number(item.totalAmount || 0).toFixed(2)}</td>
                      <td>
                        <button type="button" className="btn btn-link link-danger p-0" onClick={() => removeItem(index)} disabled={formData.items.length === 1}>
                          <i className="isax isax-trash fs-16"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-3 border-top">
                <button type="button" className="btn btn-soft-primary btn-sm" onClick={addItem}>
                  <i className="isax isax-add me-1"></i>Add Row
                </button>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-md-7">
                <div className="mb-3">
                  <label className="form-label fs-13 text-muted">Remarks</label>
                  <textarea className="form-control fs-14" rows="2" name="remarks" value={formData.remarks} onChange={handleInputChange} placeholder="Internal notes..."></textarea>
                </div>
                <div>
                  <label className="form-label fs-13 text-muted">Terms and Conditions</label>
                  <textarea className="form-control fs-14" rows="3" name="termsAndConditions" value={formData.termsAndConditions} onChange={handleInputChange} placeholder="Terms..."></textarea>
                </div>

                <div className="card bg-light border-0 mt-4">
                  <div className="card-header bg-transparent border-0 py-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="mb-0 fw-bold fs-14">Additional Charges (Freight/Others)</h6>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary rounded-pill border-0 px-3"
                        onClick={() => {
                          const newCharges = [...formData.additional_charges, { name: '', amount: 0, gstRate: 18 }];
                          setFormData(prev => {
                            const updated = { ...prev, additional_charges: newCharges };
                            calculateSummary(updated.items, updated.placeOfSupply, newCharges);
                            return updated;
                          });
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
                              setFormData(prev => {
                                const updated = { ...prev, additional_charges: newCharges };
                                calculateSummary(updated.items, updated.placeOfSupply, newCharges);
                                return updated;
                              });
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
                              setFormData(prev => {
                                const updated = { ...prev, additional_charges: newCharges };
                                calculateSummary(updated.items, updated.placeOfSupply, newCharges);
                                return updated;
                              });
                            }}
                          />
                        </div>
                        <div className="col-md-3">
                          <select
                            className="form-select form-select-sm border-0 bg-white"
                            value={charge.gstRate || charge.gst_rate || 0}
                            onChange={(e) => {
                              const newCharges = [...formData.additional_charges];
                              newCharges[cidx].gstRate = parseFloat(e.target.value);
                              setFormData(prev => {
                                const updated = { ...prev, additional_charges: newCharges };
                                calculateSummary(updated.items, updated.placeOfSupply, newCharges);
                                return updated;
                              });
                            }}
                          >
                            {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                          </select>
                        </div>
                        <div className="col-md-1 text-end">
                          <button
                            type="button"
                            className="btn btn-sm text-danger border-0 p-0 shadow-none"
                            onClick={() => {
                              const newCharges = formData.additional_charges.filter((_, i) => i !== cidx);
                              setFormData(prev => {
                                const updated = { ...prev, additional_charges: newCharges };
                                calculateSummary(updated.items, updated.placeOfSupply, newCharges);
                                return updated;
                              });
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
                <div className="bg-light p-4 rounded-16">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted fs-13">Subtotal</span>
                    <span className="fw-semibold">₹{Number(formData.summary.subtotal).toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted fs-13">Taxable Amount</span>
                    <span className="fw-semibold">₹{Number(formData.summary.taxableAmount).toLocaleString()}</span>
                  </div>
                  {formData.summary.igst > 0 && (
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted fs-13">IGST Total</span>
                      <span className="fw-semibold">₹{Number(formData.summary.igst).toLocaleString()}</span>
                    </div>
                  )}
                  {formData.summary.cgst > 0 && (
                    <>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted fs-13">CGST Total</span>
                        <span className="fw-semibold">₹{Number(formData.summary.cgst).toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted fs-13">SGST Total</span>
                        <span className="fw-semibold">₹{Number(formData.summary.sgst).toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  {formData.summary.additionalCharges > 0 && (
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted fs-13">Addl. Charges Total</span>
                      <span className="fw-semibold">₹{Number(formData.summary.additionalCharges).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted fs-13">Round Off</span>
                    <span className="fw-semibold">{formData.summary.roundOff >= 0 ? '+' : ''}₹{Number(formData.summary.roundOff).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold fs-14">Net Total</span>
                    <span className="h5 fw-bold text-primary mb-0">₹{Number(formData.summary.netTotal).toLocaleString()}</span>
                  </div>

                  {selectedCustomer?.credit_limit > 0 && formData.summary.netTotal > selectedCustomer.credit_limit && (
                    <div className="alert alert-soft-danger d-flex align-items-center mt-3 mb-0 p-2 border-0 rounded-8">
                      <i className="isax isax-warning-2 me-2 fs-18"></i>
                      <div className="fs-12 fw-medium text-danger">
                        Invoice exceeds credit limit of ₹{parseFloat(selectedCustomer.credit_limit).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4 pt-4 border-top">
              <Link to="/invoicing/sales" className="btn btn-soft-secondary px-4">Cancel</Link>
              <button type="submit" className="btn btn-primary px-5" disabled={loading}>
                {loading ? 'Updating...' : 'Update Invoice'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSalesInvoice;

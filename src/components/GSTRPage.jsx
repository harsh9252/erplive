import React, { useState, useEffect } from 'react';
import gstrConfig from '../data/gstrConfig.json';
import { 
  getGSTRReturns, 
  saveAsDraft, 
  validateGSTRReturn, 
  fileGSTRReturn,
  getInvoicesForGSTR,
  getSectionData,
  updateSectionData
} from '../services/gstrService';
import { toast } from 'react-toastify';

const GSTRPage = ({ gstrId }) => {
  const gstrData = gstrConfig.gstrReturns.find(item => item.id === gstrId);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [financialYear, setFinancialYear] = useState('2024-25');
  const [loading, setLoading] = useState(false);
  const [returnData, setReturnData] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [sectionDataMap, setSectionDataMap] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);

  // Generate periods based on financial year
  const generatePeriods = () => {
    const periods = [];
    const months = [
      'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December', 'January', 'February', 'March'
    ];
    const [startYear] = financialYear.split('-');
    
    months.forEach((month, index) => {
      const year = index < 9 ? startYear : parseInt(startYear) + 1;
      const monthNum = (index + 4) % 12 || 12;
      const value = `${month.toLowerCase()}-${year}`;
      periods.push({ label: `${month} ${year}`, value, monthNum, year });
    });
    
    return periods;
  };

  const periods = generatePeriods();

  // Load data when period is selected
  const handleLoadData = async () => {
    if (!selectedPeriod) {
      toast.error('Please select a period');
      return;
    }

    setLoading(true);
    try {
      // Fetch return data
      const returns = await getGSTRReturns(gstrId, selectedPeriod, financialYear);
      setReturnData(returns);

      // Fetch invoices for the period
      const invoiceData = await getInvoicesForGSTR(gstrId, selectedPeriod);
      setInvoices(invoiceData);

      toast.success('Data loaded successfully');
    } catch (error) {
      toast.error('Failed to load data: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // View section data
  const handleViewSection = async (section) => {
    setLoading(true);
    try {
      const data = await getSectionData(returnData?._id, section.code);
      setSectionDataMap(prev => ({ ...prev, [section.code]: data }));
      toast.info(`Viewing ${section.name}`);
    } catch (error) {
      toast.error('Failed to load section data');
    } finally {
      setLoading(false);
    }
  };

  // Edit section data
  const handleEditSection = async (section) => {
    // Open modal or navigate to edit page
    toast.info(`Edit functionality for ${section.name} - Coming soon`);
  };

  // Save as draft
  const handleSaveAsDraft = async () => {
    if (!returnData && !selectedPeriod) {
      toast.error('Please load data first');
      return;
    }

    setLoading(true);
    try {
      const draftData = {
        type: gstrId,
        period: selectedPeriod,
        financialYear,
        sections: sectionDataMap,
        status: 'draft'
      };

      await saveAsDraft(draftData);
      toast.success('Saved as draft successfully');
    } catch (error) {
      toast.error('Failed to save draft: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Download JSON
  const handleDownloadJSON = () => {
    if (!returnData && !selectedPeriod) {
      toast.error('Please load data first');
      return;
    }

    const jsonData = {
      gstrType: gstrId,
      period: selectedPeriod,
      financialYear,
      sections: sectionDataMap,
      invoices,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${gstrId}-${selectedPeriod}-${financialYear}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('JSON downloaded successfully');
  };

  // Validate return
  const handleValidate = async () => {
    if (!returnData && !selectedPeriod) {
      toast.error('Please load data first');
      return;
    }

    setLoading(true);
    try {
      const validationData = {
        type: gstrId,
        period: selectedPeriod,
        financialYear,
        sections: sectionDataMap
      };

      const result = await validateGSTRReturn(validationData);
      
      if (result.valid) {
        setValidationErrors([]);
        toast.success('Validation successful! Return is ready to file.');
      } else {
        setValidationErrors(result.errors || []);
        toast.warning(`Validation failed with ${result.errors?.length || 0} errors`);
      }
    } catch (error) {
      toast.error('Validation failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // File return
  const handleFileReturn = async () => {
    if (!returnData && !selectedPeriod) {
      toast.error('Please load data first');
      return;
    }

    if (validationErrors.length > 0) {
      toast.error('Please fix validation errors before filing');
      return;
    }

    if (!window.confirm('Are you sure you want to file this return? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    try {
      const fileData = {
        type: gstrId,
        period: selectedPeriod,
        financialYear,
        sections: sectionDataMap
      };

      const result = await fileGSTRReturn(fileData);
      toast.success('Return filed successfully! ARN: ' + (result.arn || 'N/A'));
      
      // Refresh data
      handleLoadData();
    } catch (error) {
      toast.error('Failed to file return: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (!gstrData) {
    return <div>GSTR data not found</div>;
  }

  return (
    <div className="">
    {/* <div className="page-wrapper"> */}
      <div className="content">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-title">
            <h4>{gstrData.title}</h4>
            <h6>{gstrData.subtitle}</h6>
          </div>
          <div className="page-btn">
            <button className="btn btn-added">
              <i className="fa fa-plus me-2"></i>File New Return
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <p className="mb-0">{gstrData.description}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label fw-bold">Frequency</label>
                  <p className="mb-0">{gstrData.frequency}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label fw-bold">Due Date</label>
                  <p className="mb-0">{gstrData.dueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Period Selection */}
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">Select Period</label>
                <select 
                  className="form-select"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Choose Period</option>
                  {periods.map((period) => (
                    <option key={period.value} value={period.value}>
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Financial Year</label>
                <select 
                  className="form-select"
                  value={financialYear}
                  onChange={(e) => setFinancialYear(e.target.value)}
                  disabled={loading}
                >
                  <option value="2024-25">2024-25</option>
                  <option value="2023-24">2023-24</option>
                  <option value="2022-23">2022-23</option>
                </select>
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button 
                  className="btn btn-primary"
                  onClick={handleLoadData}
                  disabled={loading || !selectedPeriod}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Loading...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-refresh me-2"></i>
                      Load Data
                    </>
                  )}
                </button>
              </div>
              {returnData && (
                <div className="col-md-3 d-flex align-items-end">
                  <span className="badge bg-success p-2">
                    Status: {returnData.status || 'Not Filed'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <h5 className="alert-heading">Validation Errors</h5>
            <ul className="mb-0">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <button type="button" className="btn-close" onClick={() => setValidationErrors([])}></button>
          </div>
        )}

        {/* Invoice Summary */}
        {invoices.length > 0 && (
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title mb-3">Invoice Summary</h5>
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="border rounded p-3">
                    <h6 className="text-muted">Total Invoices</h6>
                    <h3 className="mb-0">{invoices.length}</h3>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border rounded p-3">
                    <h6 className="text-muted">Total Taxable Value</h6>
                    <h3 className="mb-0">₹{invoices.reduce((sum, inv) => sum + (inv.taxableValue || 0), 0).toFixed(2)}</h3>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border rounded p-3">
                    <h6 className="text-muted">Total Tax</h6>
                    <h3 className="mb-0">₹{invoices.reduce((sum, inv) => sum + (inv.totalTax || 0), 0).toFixed(2)}</h3>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border rounded p-3">
                    <h6 className="text-muted">Total Amount</h6>
                    <h3 className="mb-0">₹{invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0).toFixed(2)}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sections */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-4">Return Sections</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {gstrData.sections.map((section, index) => (
                    <tr key={index}>
                      <td className="fw-bold">{section.name}</td>
                      <td><span className="badge bg-info">{section.code}</span></td>
                      <td>{section.description}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleViewSection(section)}
                          disabled={loading || !selectedPeriod}
                        >
                          <i className="fa fa-eye"></i> View
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-success"
                          onClick={() => handleEditSection(section)}
                          disabled={loading || !selectedPeriod}
                        >
                          <i className="fa fa-edit"></i> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card mt-3">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <button 
                  className="btn btn-secondary me-2"
                  onClick={handleSaveAsDraft}
                  disabled={loading || !selectedPeriod}
                >
                  <i className="fa fa-save"></i> Save as Draft
                </button>
                <button 
                  className="btn btn-info me-2"
                  onClick={handleDownloadJSON}
                  disabled={loading || !selectedPeriod}
                >
                  <i className="fa fa-download"></i> Download JSON
                </button>
              </div>
              <div>
                <button 
                  className="btn btn-success me-2"
                  onClick={handleValidate}
                  disabled={loading || !selectedPeriod}
                >
                  <i className="fa fa-check"></i> Validate
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleFileReturn}
                  disabled={loading || !selectedPeriod || validationErrors.length > 0}
                >
                  <i className="fa fa-paper-plane"></i> File Return
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GSTRPage;

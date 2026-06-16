import React, { useState  ,useEffect} from 'react'; 
import PageHeader from '../components/common/PageHeader'; 
import { Link } from 'react-router-dom';
import DataTable from '../components/common/DataTable'; 
import { ledgerService } from '../services/ledgerService';
import { toast } from 'react-toastify';
 

import { useAuth } from '../components/AuthContext';
 

const GroupLedgerReport = () => { 
  const { activeCompany } = useAuth();
  const [ledgers, setLedgersGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    nature: "",
    parent_group_id: ""
  });

    const fetchLedgers = async () => {
      try {
        setLoading(true);
        const response = await ledgerService.getGroupLedger();

        console.log('List of ledgers:', response);
        setLedgersGroups(response.data || response);
      } catch (error) {
        console.error('Error fetching ledgers:', error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchLedgers();
    }, [activeCompany?.id]);

  // Simple search filter logic
  const filteredData = ledgers.filter(item => {
    const searchLower = searchText.toLowerCase();
    
    return !searchText || (
      item.name?.toLowerCase().includes(searchLower) ||
      item.tin?.toLowerCase().includes(searchLower) ||
      item.balance_type?.toLowerCase().includes(searchLower)
    );
  });

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'parent_group_id' ? (value === "" ? "" : parseInt(value)) : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Group name is required";
    }
    if (!formData.nature) {
      newErrors.nature = "Nature is required";
    }

    // If there are errors, display them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields correctly");
      return;
    }

    try {
      const newGroup = {
        name: formData.name,
        nature: formData.nature,
        parent_group_id: formData.parent_group_id || null
      };
      
      // Call API to create new group
      const response = await ledgerService.createGroupLedger(newGroup);
      console.log('Group created:', response);
      
      // Add to list
      setLedgersGroups([...ledgers, response.data || newGroup]);
      
      // Reset form and errors
      setFormData({
        name: "",
        nature: "",
        parent_group_id: ""
      });
      setErrors({});
      setShowForm(false);
      
      toast.success('✓ Group created successfully!');
    } catch (error) {
      console.error('Error creating group:', error);
      toast.error('✗ Error creating group: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCloseForm = () => {
    setFormData({
      name: "",
      nature: "",
      parent_group_id: ""
    });
    setErrors({});
    setShowForm(false);
  };

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'nature', label: 'Nature' }, 
  ];
 
  return (
    <>
      <PageHeader title="Ledger Report" actions={[{ type: 'export' }]} />
      
      {/* Simple Search Box */}
    <div className="table-search d-flex align-items-center mb-3 gap-3" >
        <div className="search-input flex-grow-1 d-flex align-items-center gap-2">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="isax isax-search-normal-1 fs-14"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search by name, nature..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <button className="btn btn-outline-secondary" onClick={() => fetchLedgers()} disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="isax isax-refresh me-1"></i>}
            Refresh
          </button>
           <div onClick={() => setShowForm(true)}>
            <Link
              to="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_companies"
            >
              <i className="isax isax-add-circle5 me-1"></i>New Group
            </Link>
          </div>
        </div>
      </div>

      <DataTable
        showSelection={false}
        columns={columns}
        data={filteredData}
        loading={loading}
      /> 

      {/* Add Group Form Modal */}
      {showForm && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Group</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleCloseForm}
                ></button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  {/* Error Alert */}
                  {Object.keys(errors).length > 0 && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      <i className="fa-solid fa-exclamation-triangle me-2"></i>
                      <strong>Please fix the following errors:</strong>
                      <ul className="mb-0 mt-2">
                        {Object.values(errors).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Group Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g., Travel Expenses"
                    />
                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Nature *</label>
                    <select
                      className={`form-select ${errors.nature ? 'is-invalid' : ''}`}
                      name="nature"
                      value={formData.nature}
                      onChange={handleFormChange}
                    >
                      <option value="">Select Nature</option>
                      <option value="ASSET">ASSET</option>
                      <option value="LIABILITY">LIABILITY</option>
                      <option value="INCOME">INCOME</option>
                      <option value="EXPENSE">EXPENSE</option>
                      <option value="EQUITY">EQUITY</option>
                    </select>
                    {errors.nature && <div className="invalid-feedback d-block">{errors.nature}</div>}
                  </div>

                  
                </div>

                <div className="modal-footer">
         
                  <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={handleCloseForm}>
                    <span className="d-inline-flex align-items-center justify-content-center bg-danger text-white rounded-circle me-2" style={{ width: '20px', height: '20px', fontSize: '12px' }}>
                      ✕
                    </span>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary"> 
                    <i className="isax isax-save me-2"></i>Create Group 
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupLedgerReport;

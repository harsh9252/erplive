import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import approvalService from '../services/approvalService';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    const sampleExpenses = [
      {
        id: 1,
        date: '2025-02-20',
        category: 'Office Supplies',
        description: 'Stationery and office materials',
        amount: '$250',
        status: 'Paid',
        receipt: 'EXP-001.pdf',
      },
      {
        id: 2,
        date: '2025-02-18',
        category: 'Travel',
        description: 'Business trip to New York',
        amount: '$1,200',
        status: 'Pending',
        receipt: 'EXP-002.pdf',
      },
      {
        id: 3,
        date: '2025-02-15',
        category: 'Software',
        description: 'Monthly software subscriptions',
        amount: '$450',
        status: 'Paid',
        receipt: 'EXP-003.pdf',
      },
      {
        id: 4,
        date: '2025-02-12',
        category: 'Marketing',
        description: 'Google Ads campaign',
        amount: '$800',
        status: 'Paid',
        receipt: 'EXP-004.pdf',
      },
    ];
    setExpenses(sampleExpenses);
  }, []);

  const categories = ['All', 'Office Supplies', 'Travel', 'Software', 'Marketing', 'Utilities'];
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = filteredExpenses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter((expense) => expense.id !== id));
    }
  };

  const handleSubmitForApproval = async (expense) => {
    const remarks = window.prompt('Enter any remarks for approval (optional):');
    if (remarks === null) return;

    try {
      await approvalService.submitForApproval({
        entity_type: 'EXPENSE',
        entity_id: expense.id,
        remarks: remarks,
      });
      toast.success('Submitted for approval successfully!');
      // Update local state if necessary or re-fetch
      setExpenses(expenses.map(exp => 
        exp.id === expense.id ? { ...exp, status: 'Pending Approval' } : exp
      ));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit for approval');
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Expenses</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item active">Expenses</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Link to="/add-expense" className="btn btn-primary">
            <i className="isax isax-add me-1"></i>Add Expense
          </Link>
          <div className="dropdown">
            <Link href="#" className="btn btn-outline-white" data-bs-toggle="dropdown">
              <i className="isax isax-export-1 me-1"></i>Export
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="#">
                  Download as PDF
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  Download as Excel
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Total Expenses</p>
                  <h6 className="fs-16 fw-semibold">$2,700</h6>
                </div>
                <span className="avatar avatar-lg bg-danger text-white">
                  <i className="isax isax-money-send fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">This Month</p>
                  <h6 className="fs-16 fw-semibold">$1,450</h6>
                </div>
                <span className="avatar avatar-lg bg-warning text-white">
                  <i className="isax isax-calendar fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Pending</p>
                  <h6 className="fs-16 fw-semibold">$1,200</h6>
                </div>
                <span className="avatar avatar-lg bg-info text-white">
                  <i className="isax isax-timer fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Categories</p>
                  <h6 className="fs-16 fw-semibold">{categories.length - 1}</h6>
                </div>
                <span className="avatar avatar-lg bg-success text-white">
                  <i className="isax isax-category fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
            <h6 className="mb-1">All Expenses</h6>
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="input-icon-end position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="input-icon-addon">
                  <i className="isax isax-search-normal"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Receipt</th>
                  <th className="text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.date}</td>
                    <td>
                      <span className="badge badge-soft-primary">{expense.category}</span>
                    </td>
                    <td>{expense.description}</td>
                    <td className="text-dark fw-medium">{expense.amount}</td>
                    <td>
                      <span
                        className={`badge badge-sm ${expense.status === 'Paid' ? 'badge-soft-success' : 'badge-soft-warning'}`}
                      >
                        {expense.status}
                      </span>
                    </td>
                    <td>
                      <Link href="#" className="text-primary">
                        <i className="isax isax-document-download me-1"></i>
                        {expense.receipt}
                      </Link>
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end align-items-center gap-2">
                        {expense.status?.toLowerCase() === 'pending' && (
                          <button 
                            className="btn btn-sm btn-soft-info border-0" 
                            onClick={() => handleSubmitForApproval(expense)}
                            title="Submit for Approval"
                          >
                            <i className="isax isax-send-1 fs-16"></i>
                          </button>
                        )}
                        <button 
                          className="btn btn-sm btn-soft-primary border-0"
                          title="View Details"
                        >
                          <i className="isax isax-eye fs-16"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-soft-warning border-0"
                          title="Edit Expense"
                        >
                          <i className="isax isax-edit-2 fs-16"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-soft-danger border-0" 
                          onClick={() => handleDelete(expense.id)}
                          title="Delete Expense"
                        >
                          <i className="isax isax-trash fs-16"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="d-flex align-items-center justify-content-between mt-3">
              <div>
                <p className="mb-0 fs-13">
                  Showing {indexOfFirstItem + 1} to{' '}
                  {Math.min(indexOfLastItem, filteredExpenses.length)} of {filteredExpenses.length}{' '}
                  entries
                </p>
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Expenses;

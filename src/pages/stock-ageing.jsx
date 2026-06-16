import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStockAgeingReport } from '../services/itemService';
import { toast } from 'react-toastify';

const StockAgeing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [summary, setSummary] = useState({
    totalValue: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    pendingReorderValue: 0
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productSearchText, setProductSearchText] = useState("");

  const handleProductToggle = (id) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };
  
  const handleSelectAllProducts = (e) => {
    if (e.target.checked) {
      setSelectedProducts(data.map(item => item.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getStockAgeingReport();
      const rawRows = Array.isArray(res.data) ? res.data : (res.data?.rows || []);
      
      const aggregated = {};
      rawRows.forEach(row => {
        const id = row.item_id;
        if (!aggregated[id]) {
          aggregated[id] = {
            id,
            item_name: row.item_name,
            sku: row.sku,
            category_name: row.warehouse_name || '',
            total_qty: 0,
            valuation: 0,
            ageing_buckets: {
              '0-30': 0,
              '31-60': 0,
              '61-90': 0,
              '91-180': 0,
              '>180': 0
            }
          };
        }
        
        const qty = Number(row.received_qty) || 0;
        aggregated[id].total_qty += qty;
        
        let bucketKey = '>180';
        if (row.age_days <= 30) bucketKey = '0-30';
        else if (row.age_days <= 60) bucketKey = '31-60';
        else if (row.age_days <= 90) bucketKey = '61-90';
        else if (row.age_days <= 180) bucketKey = '91-180';
        
        aggregated[id].ageing_buckets[bucketKey] += qty;
      });

      const reportData = Object.values(aggregated);
      setData(reportData);

      const total = reportData.reduce((sum, item) => sum + (Number(item.valuation) || 0), 0);
      const lowStock = reportData.filter(item => Number(item.total_qty) > 0 && Number(item.total_qty) <= (item.min_stock || 10)).length;
      const outOfStock = reportData.filter(item => Number(item.total_qty) <= 0).length;

      setSummary({
        totalValue: total,
        lowStockCount: lowStock,
        outOfStockCount: outOfStock,
        pendingReorderValue: 0
      });
    } catch (error) {
      toast.error('Failed to load ageing report');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [columns, setColumns] = useState({
    product: true,
    qty: true,
    valuation: true,
    bucket1: true,
    bucket2: true,
    bucket3: true,
    bucket4: true,
    bucket5: true
  });

  const handleColumnToggle = (column) => {
    setColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const filteredData = (Array.isArray(data) ? data : []).filter(item => {
    const matchesSearch = (item.item_name || "").toLowerCase().includes(searchText.toLowerCase());
    const matchesProduct = selectedProducts.length === 0 || selectedProducts.includes(item.id);
    return matchesSearch && matchesProduct;
  });

  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Stock Ageing Report</h6>
        </div>

      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <p className="mb-1">Total Stock Value</p>
                  <h6 className="fs-16 fw-semibold mb-0">₹{summary.totalValue.toLocaleString()}</h6>
                </div>
                <div>
                  <span className="avatar bg-primary rounded-circle">
                    <i className="isax isax-dollar-circle fs-16"></i>
                  </span>
                </div>
              </div>
              <div className="bg-dark py-2 px-3 rounded">
                <p className="fs-13 mb-0 text-white text-truncate">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>5.62%
                  </span>{' '}
                  from last month
                </p>
              </div>
              <span className="position-absolute start-0 top-0">
                <img src="/assets/img/bg/card-overlay-05.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <p className="mb-1">Low Stock Items</p>
                  <h6 className="fs-16 fw-semibold mb-0">{summary.lowStockCount} Products</h6>
                </div>
                <div>
                  <span className="avatar bg-success rounded-circle">
                    <i className="isax isax-bag-2 fs-16"></i>
                  </span>
                </div>
              </div>
              <div className="bg-dark py-2 px-3 rounded">
                <p className="fs-13 mb-0 text-white text-truncate">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>Dynamic
                  </span>{' '}
                  live data
                </p>
              </div>
              <span className="position-absolute start-0 top-0">
                <img src="/assets/img/bg/card-overlay-06.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <p className="mb-1">Pending Reorders</p>
                  <h6 className="fs-16 fw-semibold mb-0">₹{summary.pendingReorderValue.toLocaleString()}</h6>
                </div>
                <div>
                  <span className="avatar bg-danger rounded-circle">
                    <i className="isax isax-timer fs-16"></i>
                  </span>
                </div>
              </div>
              <div className="bg-dark py-2 px-3 rounded">
                <p className="fs-13 mb-0 text-white text-truncate">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>0%
                  </span>{' '}
                  pending
                </p>
              </div>
              <span className="position-absolute start-0 top-0">
                <img src="/assets/img/bg/card-overlay-07.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <p className="mb-1">Out of Stock Items</p>
                  <h6 className="fs-16 fw-semibold mb-0">{summary.outOfStockCount} Products</h6>
                </div>
                <div>
                  <span className="avatar bg-info rounded-circle">
                    <i className="isax isax-bag-timer fs-16"></i>
                  </span>
                </div>
              </div>
              <div className="bg-dark py-2 px-3 rounded">
                <p className="fs-13 mb-0 text-white text-truncate">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>Active
                  </span>{' '}
                  stock tracking
                </p>
              </div>
              <span className="position-absolute start-0 top-0">
                <img src="/assets/img/bg/card-overlay-08.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ background: 'transparent', outline: 'auto' }}
                />
                <Link href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link>
              </div>
            </div>
            <Link
              className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#customcanvas"
            >
              <i className="isax isax-filter me-1"></i>Filter
            </Link>
          </div>

        </div>
        <div className="align-items-center gap-2 flex-wrap filter-info mt-3">
          <h6 className="fs-13 fw-semibold">Filters</h6>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
            </span>
            Customers Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
            </span>
            Status Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
            </span>
            Units Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <Link href="#" className="link-danger fw-medium text-decoration-underline ms-md-1">
            Clear All
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead>
            <tr>

              {columns.product && <th className="no-sort">Product / Item</th>}
              {columns.qty && <th className="text-center">Total Qty</th>}
              {columns.valuation && <th className="text-end">Valuation</th>}
              {columns.bucket1 && <th className="text-center">0-30</th>}
              {columns.bucket2 && <th className="text-center">31-60</th>}
              {columns.bucket3 && <th className="text-center">61-90</th>}
              {columns.bucket4 && <th className="text-center">91-180</th>}
              {columns.bucket5 && <th className="text-center">180 Day</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id}>

                {columns.product && (
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-sm rounded-circle me-2 flex-shrink-0 bg-soft-primary text-primary d-flex align-items-center justify-content-center">
                        <i className="isax isax-box fs-14"></i>
                      </div>
                      <div>
                        <h6 className="fs-14 fw-medium mb-0">{item.item_name}</h6>
                        <span className="fs-12 text-muted truncate-1" style={{ maxWidth: '180px' }}>{item.category_name}</span>
                      </div>
                    </div>
                  </td>
                )}
                {columns.qty && <td className="text-center fw-600">{item.total_qty} {item.uom_id}</td>}
                {columns.valuation && <td className="text-end fw-bold text-dark">₹{item.valuation?.toLocaleString()}</td>}
                {columns.bucket1 && <td className="text-center text-muted">{item.ageing_buckets?.['0-30'] || 0}</td>}
                {columns.bucket2 && <td className="text-center text-muted">{item.ageing_buckets?.['31-60'] || 0}</td>}
                {columns.bucket3 && <td className="text-center text-muted">{item.ageing_buckets?.['61-90'] || 0}</td>}
                {columns.bucket4 && <td className="text-center text-muted">{item.ageing_buckets?.['91-180'] || 0}</td>}
                {columns.bucket5 && <td className="text-center text-muted">{item.ageing_buckets?.['>180'] || 0}</td>}
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan="10" className="text-center py-5">
                  <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                  <span className="ms-2">Loading ageing data...</span>
                </td>
              </tr>
            )}
            {!loading && filteredData.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-5 text-muted">No stock data found matching your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id="customcanvas">
        <div className="offcanvas-header d-block pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between pb-3">
            <h6 className="offcanvas-title">Filter</h6>
            <button
              type="button"
              className="btn-close custom-btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
        <div className="offcanvas-body pt-3">
          <form action="#" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label className="form-label">Product</label>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <div className="mb-3">
                    <div className="input-icon-start position-relative">
                      <span className="input-icon-addon fs-12">
                        <i className="isax isax-search-normal"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search"
                        value={productSearchText}
                        onChange={(e) => setProductSearchText(e.target.value)}
                      />
                    </div>
                  </div>
                  <ul className="mb-3">
                    <li className="d-flex align-items-center justify-content-between mb-3">
                      <label className="d-inline-flex align-items-center text-gray-9">
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" onChange={handleSelectAllProducts} checked={data.length > 0 && selectedProducts.length === data.length} />{' '}
                        Select All
                      </label>
                      <Link href="#" className="link-danger fw-medium text-decoration-underline" onClick={(e) => { e.preventDefault(); setSelectedProducts([]); }}>
                        Reset
                      </Link>
                    </li>
                    {data.filter(item => (item.item_name || "").toLowerCase().includes(productSearchText.toLowerCase())).map(item => (
                      <li key={item.id}>
                        <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                          <input className="form-check-input m-0 me-2" type="checkbox" checked={selectedProducts.includes(item.id)} onChange={() => handleProductToggle(item.id)} />
                          <span className="avatar avatar-sm rounded-circle me-2 bg-soft-primary text-primary d-flex align-items-center justify-content-center">
                            <i className="isax isax-box fs-14"></i>
                          </span>
                          {item.item_name}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <div className="row g-2">
                    <div className="col-6">
                      <button className="btn btn-outline-white w-100 close-filter" onClick={(e) => { e.preventDefault(); document.body.click(); }}>
                        Cancel
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-primary w-100" onClick={(e) => { e.preventDefault(); document.body.click(); }}>
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="offcanvas-footer">
              <div className="row g-2">
                <div className="col-6">
                  <Link href="#" className="btn btn-outline-white w-100" onClick={(e) => { e.preventDefault(); setSelectedProducts([]); }}>
                    Reset
                  </Link>
                </div>
                <div className="col-6">
                  <button
                    data-bs-dismiss="offcanvas"
                    className="btn btn-primary w-100"
                    id="filter-submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Product</h6>
              <p className="mb-3">Are you sure, you want to delete product?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/products" className="btn btn-primary">
                  Yes, Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockAgeing;

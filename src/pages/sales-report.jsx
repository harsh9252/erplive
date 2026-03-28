import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import SummaryCards from '../components/common/SummaryCards';
import FilterControls from '../components/common/FilterControls';
import DataTable from '../components/common/DataTable';

const initialSalesData = [
  { id: 1, sku: 'PR00025', product: 'Apple iPhone 15', category: 'Smartphones', avatar: '/assets/img/products/product-01.jpg', soldAmount: 120000, soldQty: 15, inStock: 25, dueDate: '22 Feb 2025' },
  { id: 2, sku: 'PR00014', product: 'Dell XPS 13 9310', category: 'Laptops', avatar: '/assets/img/products/product-02.jpg', soldAmount: 85000, soldQty: 8, inStock: 35, dueDate: '07 Feb 2025' },
  { id: 3, sku: 'PR00012', product: 'Bose QuietComfort 45', category: 'Headphones', avatar: '/assets/img/products/product-03.jpg', soldAmount: 12500, soldQty: 22, inStock: 56, dueDate: '30 Jan 2025' },
  { id: 4, sku: 'PR00016', product: 'Nike Dri-FIT T-shirt', category: 'Apparel', avatar: '/assets/img/products/product-04.jpg', soldAmount: 3200, soldQty: 64, inStock: 120, dueDate: '17 Jan 2025' },
  { id: 5, sku: 'PR00022', product: 'Adidas Ultraboost 22', category: 'Footwear', avatar: '/assets/img/products/product-05.jpg', soldAmount: 15000, soldQty: 30, inStock: 45, dueDate: '04 Jan 2025' },
  { id: 6, sku: 'PR00047', product: 'Samsung Refrigerator', category: 'Kitchen', avatar: '/assets/img/products/product-06.jpg', soldAmount: 250000, soldQty: 10, inStock: 12, dueDate: '09 Dec 2024' },
  { id: 7, sku: 'PR00014', product: 'Dyson V15 Vacuum', category: 'Cleaning', avatar: '/assets/img/products/product-07.jpg', soldAmount: 45000, soldQty: 15, inStock: 20, dueDate: '15 Nov 2024' },
  { id: 8, sku: 'PR00031', product: 'HP Spectre x360', category: 'Laptops', avatar: '/assets/img/products/product-08.jpg', soldAmount: 95000, soldQty: 5, inStock: 18, dueDate: '02 Dec 2024' },
  { id: 9, sku: 'PR00077', product: 'Dyson Hair Dryer', category: 'Haircare', avatar: '/assets/img/products/product-09.jpg', soldAmount: 35000, soldQty: 25, inStock: 40, dueDate: '30 Nov 2024' },
  { id: 10, sku: 'PR00045', product: 'Apple AirPods Pro', category: 'Headphones', avatar: '/assets/img/products/product-10.jpg', soldAmount: 18000, soldQty: 40, inStock: 95, dueDate: '12 Oct 2024' }
];

const SalesReport = () => {
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [visibleColumns, setVisibleColumns] = useState({
    sku: true,
    product: true,
    category: true,
    soldAmount: true,
    soldQty: true,
    inStock: true,
    dueDate: true
  });

  const toggleColumn = (column) => {
    setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  let filteredData = initialSalesData.filter(item =>
    item.product.toLowerCase().includes(searchText.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category.toLowerCase().includes(searchText.toLowerCase())
  );

  if (sortConfig.key) {
    filteredData.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const columns = [
    { id: 'sku', label: 'SKU', sortable: true, render: (val) => <Link to="#" className="link-default">{val}</Link> },
    {
      id: 'product',
      label: 'Product',
      sortable: true,
      render: (val, row) => (
        <div className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
            <img src={row.avatar} className="rounded-circle" alt="img" />
          </Link>
          <div>
            <h6 className="fs-14 fw-medium mb-0">
              <Link to="#">{val}</Link>
            </h6>
          </div>
        </div>
      )
    },
    { id: 'category', label: 'Category', sortable: true },
    { id: 'soldAmount', label: 'Sold Amount', sortable: true, render: (val) => <span className="text-dark">${val.toLocaleString()}</span> },
    { id: 'soldQty', label: 'Sold Qty', sortable: true, render: (val) => <span className="text-dark">{val}</span> },
    {
      id: 'inStock',
      label: 'Stock',
      sortable: true,
      render: (val) => (
        <span className={`badge badge-soft-${val < 20 ? 'danger' : 'success'} d-inline-flex align-items-center`}>
          {val}
        </span>
      )
    },
    { id: 'dueDate', label: 'Due Date', sortable: true }
  ];

  const summaryCards = [
    { label: 'Total Revenue', amount: '$1,200,000', change: '+5.62%', icon: 'dollar-circle', color: 'primary' },
    { label: 'Active Invoices', amount: '950', change: '+11.4%', icon: 'tick-circle', color: 'success' },
    { label: 'Top Client', amount: 'XYZ Pvt.Ltd.', change: '+8.52%', icon: 'user', color: 'warning' },
    { label: 'Best-Selling', amount: 'iPhone 15', change: '-5.62%', icon: 'chart', color: 'danger' }
  ];

  return (
    <>
      <PageHeader
        title="Sales Report"
        actions={[{ type: 'export' }]}
      />

      <SummaryCards cards={summaryCards} variant="style2" />

      <FilterControls
        searchTerm={searchText}
        setSearchTerm={setSearchText}
        searchPlaceholder="Search Product, SKU..."
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
        columnLabelMapping={{ sku: "SKU" }}
      />

      <DataTable
        columns={columns}
        data={filteredData}
        visibleColumns={visibleColumns}
        onSort={requestSort}
        sortConfig={sortConfig}
        emptyMessage="No matching records found"
      />
    </>
  );
};

export default SalesReport;

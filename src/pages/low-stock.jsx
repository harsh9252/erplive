import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import SummaryCards from '../components/common/SummaryCards';
import FilterControls from '../components/common/FilterControls';
import DataTable from '../components/common/DataTable';

const initialLowStockData = [
  { id: 1, sku: 'PR00025', product: 'Apple iPhone 15', category: 'Smartphones', avatar: '/assets/img/products/product-01.jpg', openingQty: 28, closingQty: 24 },
  { id: 2, sku: 'PR00014', product: 'Dell XPS 13 9310', category: 'Laptops', avatar: '/assets/img/products/product-02.jpg', openingQty: 12, closingQty: 25 },
  { id: 3, sku: 'PR00012', product: 'Bose QuietComfort 45', category: 'Headphones', avatar: '/assets/img/products/product-03.jpg', openingQty: 34, closingQty: 2 },
  { id: 4, sku: 'PR00016', product: 'Nike Dri-FIT T-shirt', category: 'Apparel', avatar: '/assets/img/products/product-04.jpg', openingQty: 24, closingQty: 67 },
  { id: 5, sku: 'PR00022', product: 'Adidas Ultraboost 22', category: 'Footwear', avatar: '/assets/img/products/product-05.jpg', openingQty: 13, closingQty: 26 },
  { id: 6, sku: 'PR00047', product: 'Samsung Refrigerator', category: 'Kitchen', avatar: '/assets/img/products/product-06.jpg', openingQty: 67, closingQty: 13 },
  { id: 7, sku: 'PR00014', product: 'Dyson V15 Detect', category: 'Cleaning', avatar: '/assets/img/products/product-07.jpg', openingQty: 13, closingQty: 24 },
  { id: 8, sku: 'PR00031', product: 'HP Spectre x360 14', category: 'Laptops', avatar: '/assets/img/products/product-08.jpg', openingQty: 25, closingQty: 65 },
  { id: 9, sku: 'PR00077', product: 'Dyson Hair Dryer', category: 'Haircare', avatar: '/assets/img/products/product-09.jpg', openingQty: 24, closingQty: 23 },
  { id: 10, sku: 'PR00045', product: 'Apple AirPods Pro', category: 'Headphones', avatar: '/assets/img/products/product-10.jpg', openingQty: 65, closingQty: 12 }
];

const LowStock = () => {
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [visibleColumns, setVisibleColumns] = useState({
    sku: true,
    product: true,
    category: true,
    openingQty: true,
    closingQty: true
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

  let filteredData = initialLowStockData.filter(item =>
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
    { id: 'openingQty', label: 'Opening Qty', sortable: true, render: (val) => <span className="text-dark">{val}</span> },
    {
      id: 'closingQty',
      label: 'Closing Qty',
      sortable: true,
      render: (val) => (
        <span className={`badge badge-soft-${val < 15 ? 'danger' : 'warning'} d-inline-flex align-items-center`}>
          {val}
        </span>
      )
    }
  ];

  const summaryCards = [
    { label: 'Total Low Stock Items', amount: '385', change: '+5.62%', icon: 'report-icon-01.svg', color: 'success' },
    { label: 'Out-of-Stock Items', amount: '148', change: '+11.4%', icon: 'report-icon-02.svg', color: 'success' },
    { label: 'Restock Required', amount: '250 Units', change: '+8.52%', icon: 'report-icon-03.svg', color: 'success' },
    { label: 'Pending Orders', amount: '45', change: '+7.45%', icon: 'report-icon-04.svg', color: 'success' }
  ];

  return (
    <>
      <PageHeader
        title="Low Stock Report"
        actions={[{ type: 'export' }]}
      />

      <SummaryCards cards={summaryCards} />

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
        emptyMessage="No low stock items found"
      />
    </>
  );
};

export default LowStock;

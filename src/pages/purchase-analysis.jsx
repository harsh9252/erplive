import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import SummaryCards from '../components/common/SummaryCards';
import DataTable from '../components/common/DataTable';
import reportService from '../services/reportService';
import { toast } from 'react-toastify';

const PurchaseAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    summary: [
      { label: 'Total Purchases', amount: '₹0', change: '0%', icon: 'shopping-cart', color: 'primary' },
      { label: 'Total Bills', amount: '0', change: '0%', icon: 'receipt-item', color: 'success' },
      { label: 'Avg Bill Value', amount: '₹0', change: '0%', icon: 'chart', color: 'warning' },
      { label: 'Vendors', amount: '0', change: '0%', icon: 'user', color: 'danger' }
    ],
    chartData: {
      categories: [],
      series: [{ name: 'Purchases', data: [] }]
    },
    tableData: []
  });

  const [filters, setFilters] = useState({
    from_date: '2025-04-01',
    to_date: '2026-03-31',
    group_by: 'month'
  });

  const [visibleColumns, setVisibleColumns] = useState({
    group: true,
    amount: true,
    count: true,
    avgValue: true
  });

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await reportService.getPurchaseAnalysisReport(filters);
      if (response && response.success) {
        const result = response.data;
        
        setData(prev => ({
          summary: Array.isArray(result.summary) ? result.summary : prev.summary,
          chartData: {
            categories: Array.isArray(result.chart?.categories) ? result.chart.categories : prev.chartData.categories,
            series: [{ name: 'Purchase Amount', data: Array.isArray(result.chart?.data) ? result.chart.data : prev.chartData.series[0].data }]
          },
          tableData: Array.isArray(result.table) ? result.table : prev.tableData
        }));
      }
    } catch (error) {
      console.error("Failed to fetch purchase analysis:", error);
      toast.error("Failed to load purchase analysis data");
      mockData();
    } finally {
      setLoading(false);
    }
  };

  const mockData = () => {
    const isMonth = filters.group_by === 'month';
    const categories = isMonth 
      ? ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
      : ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E'];
    
    const chartValues = isMonth 
      ? [8000, 11000, 15000, 12000, 19000, 22000, 18000, 25000, 30000, 24000, 28000, 35000]
      : [38000, 32000, 28000, 25000, 20000];

    const table = categories.map((cat, i) => ({
      id: i,
      group: cat,
      amount: chartValues[i],
      count: Math.floor(chartValues[i] / 400),
      avgValue: 400
    }));

    setData({
      summary: [
        { label: 'Total Purchases', amount: '₹2,58,000', change: '+10.2%', icon: 'shopping-cart', color: 'primary' },
        { label: 'Total Bills', amount: '645', change: '+5.4%', icon: 'receipt-item', color: 'success' },
        { label: 'Avg Bill Value', amount: '₹400', change: '+1.5%', icon: 'chart', color: 'warning' },
        { label: 'Top Vendor', amount: 'Vendor A', change: '₹38,000', icon: 'user', color: 'danger' }
      ],
      chartData: {
        categories,
        series: [{ name: 'Purchase Amount', data: chartValues }]
      },
      tableData: table
    });
  };

  useEffect(() => {
    fetchReport();
  }, [filters]);

  useEffect(() => {
    if (window.ApexCharts && data.chartData.categories.length > 0) {
      const options = {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: { show: false },
          zoom: { enabled: false }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        series: data.chartData.series,
        xaxis: {
          categories: data.chartData.categories,
          axisBorder: { show: false },
          axisTicks: { show: false }
        },
        yaxis: {
          title: { text: 'Amount (₹)' },
          labels: {
            formatter: (val) => `₹${val.toLocaleString()}`
          }
        },
        fill: { opacity: 1, colors: ['#ffc107'] },
        tooltip: {
          y: {
            formatter: (val) => `₹${val.toLocaleString()}`
          }
        },
        grid: {
          borderColor: '#f1f1f1',
        }
      };

      const chart = new window.ApexCharts(document.querySelector("#purchase-analysis-chart"), options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [data.chartData]);

  const columns = [
    { id: 'group', label: filters.group_by === 'month' ? 'Month' : 'Vendor', sortable: true },
    { id: 'amount', label: 'Purchase Amount', sortable: true, render: (val) => `₹${val.toLocaleString()}` },
    { id: 'count', label: 'Bill Count', sortable: true },
    { id: 'avgValue', label: 'Avg Value', sortable: true, render: (val) => `₹${val.toLocaleString()}` }
  ];

  return (
    <>
      <PageHeader
        title="Purchase Analysis"
        actions={[{ type: 'export' }]}
      />

      <SummaryCards cards={data.summary} variant="style2" />

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Purchase Trend</h5>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filters.group_by}
              onChange={(e) => setFilters({...filters, group_by: e.target.value})}
              style={{ width: '150px' }}
            >
              <option value="month">Group by Month</option>
              <option value="vendor">Group by Vendor</option>
            </select>
            <input 
              type="date" 
              className="form-control form-select-sm"
              value={filters.from_date}
              onChange={(e) => setFilters({...filters, from_date: e.target.value})}
            />
            <input 
              type="date" 
              className="form-control form-select-sm"
              value={filters.to_date}
              onChange={(e) => setFilters({...filters, to_date: e.target.value})}
            />
          </div>
        </div>
        <div className="card-body">
          <div id="purchase-analysis-chart" style={{ minHeight: '350px' }}>
            {loading && (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '350px' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Analysis Summary</h5>
        </div>
        <div className="card-body p-0">
          <DataTable
            columns={columns}
            data={data.tableData}
            visibleColumns={visibleColumns}
            emptyMessage="No matching records found"
          />
        </div>
      </div>
    </>
  );
};

export default PurchaseAnalysis;

import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import SummaryCards from '../components/common/SummaryCards';
import FilterControls from '../components/common/FilterControls';
import DataTable from '../components/common/DataTable';
import reportService from '../services/reportService';
import { toast } from 'react-toastify';

const SalesAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    summary: [
      { label: 'Total Sales', amount: '0', change: '0%', icon: 'dollar-circle', color: 'primary' },
      { label: 'Total Invoices', amount: '0', change: '0%', icon: 'tick-circle', color: 'success' },
      { label: 'Avg Order Value', amount: '0', change: '0%', icon: 'chart', color: 'warning' },
      { label: 'Customers', amount: '0', change: '0%', icon: 'user', color: 'danger' }
    ],
    chartData: {
      categories: [],
      series: [{ name: 'Sales', data: [] }]
    },
    tableData: []
  });

  const [filters, setFilters] = useState({
    from_date: '2025-04-01',
    to_date: '2026-03-31',
    group_by: 'month'
  });

  const [searchText, setSearchText] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    group: true,
    amount: true,
    count: true,
    avgValue: true
  });

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await reportService.getSalesAnalysisReport(filters);
      if (response && response.success) {
        // Transform API response to UI state
        // Assuming API returns { summary, chart, table }
        const result = response.data;
        
        setData(prev => ({
          summary: Array.isArray(result.summary) ? result.summary : prev.summary,
          chartData: {
            categories: Array.isArray(result.chart?.categories) ? result.chart.categories : prev.chartData.categories,
            series: [{ name: 'Sales Amount', data: Array.isArray(result.chart?.data) ? result.chart.data : prev.chartData.series[0].data }]
          },
          tableData: Array.isArray(result.table) ? result.table : prev.tableData
        }));
      }
    } catch (error) {
      console.error("Failed to fetch sales analysis:", error);
      toast.error("Failed to load sales analysis data");
      
      // MOCK DATA for demonstration if API fails or is not yet implemented on backend
      mockData();
    } finally {
      setLoading(false);
    }
  };

  const mockData = () => {
    const isMonth = filters.group_by === 'month';
    const categories = isMonth 
      ? ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
      : ['Customer A', 'Customer B', 'Customer C', 'Customer D', 'Customer E'];
    
    const chartValues = isMonth 
      ? [12000, 15000, 18000, 14000, 21000, 25000, 22000, 30000, 35000, 28000, 32000, 40000]
      : [45000, 38000, 32000, 28000, 25000];

    const table = categories.map((cat, i) => ({
      id: i,
      group: cat,
      amount: chartValues[i],
      count: Math.floor(chartValues[i] / 500),
      avgValue: 500
    }));

    setData({
      summary: [
        { label: 'Total Sales', amount: '₹3,12,000', change: '+12.5%', icon: 'dollar-circle', color: 'primary' },
        { label: 'Total Invoices', amount: '624', change: '+8.2%', icon: 'tick-circle', color: 'success' },
        { label: 'Avg Order Value', amount: '₹500', change: '+2.1%', icon: 'chart', color: 'warning' },
        { label: 'Top Customer', amount: 'Customer A', change: '₹45,000', icon: 'user', color: 'danger' }
      ],
      chartData: {
        categories,
        series: [{ name: 'Sales Amount', data: chartValues }]
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
            endingShape: 'rounded'
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
        fill: { opacity: 1, colors: ['#4e73df'] },
        tooltip: {
          y: {
            formatter: (val) => `₹${val.toLocaleString()}`
          }
        },
        grid: {
          borderColor: '#f1f1f1',
        }
      };

      const chart = new window.ApexCharts(document.querySelector("#sales-analysis-chart"), options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [data.chartData]);

  const columns = [
    { id: 'group', label: filters.group_by === 'month' ? 'Month' : 'Customer', sortable: true },
    { id: 'amount', label: 'Sales Amount', sortable: true, render: (val) => `₹${val.toLocaleString()}` },
    { id: 'count', label: 'Invoice Count', sortable: true },
    { id: 'avgValue', label: 'Avg Value', sortable: true, render: (val) => `₹${val.toLocaleString()}` }
  ];

  const handleDownloadExcel = async () => {
    try {
      const { utils, writeFile } = await import('xlsx');
      const exportData = data.tableData.map(item => ({
        [columns[0].label]: item.group,
        'Sales Amount': item.amount,
        'Invoice Count': item.count,
        'Avg Value': item.avgValue
      }));
      const ws = utils.json_to_sheet(exportData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Sales Analysis");
      writeFile(wb, `Sales_Analysis.xlsx`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to export Excel");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const jspdfModule = await import('jspdf');
      const jsPDF = jspdfModule.default || jspdfModule.jsPDF || jspdfModule;
      const autotableModule = await import('jspdf-autotable');
      const autoTable = autotableModule.default || autotableModule;
      
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Sales Analysis', 14, 15);
      doc.setFontSize(10);
      doc.text(`Period: ${filters.from_date} to ${filters.to_date}`, 14, 22);

      const tableColumns = [columns[0].label, "Sales Amount", "Invoice Count", "Avg Value"];
      const tableRows = data.tableData.map(item => [
        item.group,
        `Rs. ${(item.amount || 0).toLocaleString('en-IN')}`,
        item.count,
        `Rs. ${(item.avgValue || 0).toLocaleString('en-IN')}`
      ]);

      autoTable(doc, {
        startY: 28,
        head: [tableColumns],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [62, 121, 247] }
      });

      doc.save(`Sales_Analysis.pdf`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to export PDF");
    }
  };

  return (
    <>
      <PageHeader
        title="Sales Analysis"
        actions={[{ type: 'export', onDownloadPDF: handleDownloadPDF, onDownloadExcel: handleDownloadExcel }]}
      />

      <SummaryCards cards={data.summary} variant="style2" />

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Sales Trend</h5>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filters.group_by}
              onChange={(e) => setFilters({...filters, group_by: e.target.value})}
              style={{ width: '150px' }}
            >
              <option value="month">Group by Month</option>
              <option value="customer">Group by Customer</option>
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
          <div id="sales-analysis-chart" style={{ minHeight: '350px' }}>
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

export default SalesAnalysis;

const EInvoiceStatusBadge = ({ status }) => {
  if (!status) {
    return (
      <span className="badge bg-secondary" title="E-Invoice not generated">
        <i className="fa fa-file-o me-1"></i>Not Generated
      </span>
    );
  }

  const statusConfig = {
    PENDING: {
      bg: 'bg-warning',
      icon: 'fa-clock',
      text: 'Pending',
      title: 'E-Invoice generation pending',
    },
    GENERATED: {
      bg: 'bg-success',
      icon: 'fa-check-circle',
      text: 'Generated',
      title: 'E-Invoice generated successfully',
    },
    CANCELLED: {
      bg: 'bg-danger',
      icon: 'fa-times-circle',
      text: 'Cancelled',
      title: 'E-Invoice cancelled',
    },
  };

  const config = statusConfig[status] || statusConfig.PENDING;

  return (
    <span className={`badge ${config.bg}`} title={config.title}>
      <i className={`fa ${config.icon} me-1`}></i>
      {config.text}
    </span>
  );
};

export default EInvoiceStatusBadge;

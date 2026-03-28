import { useState, useEffect } from 'react';

const FileAttachments = ({ entity, entityId }) => {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
  const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.xlsx', '.csv'];
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  // Fetch attachments on component mount
  useEffect(() => {
    fetchAttachments();
  }, [entity, entityId]);

  const fetchAttachments = () => {
    try {
      const allAttachments = JSON.parse(localStorage.getItem('attachments') || '[]');
      const filtered = allAttachments.filter(
        (att) => att.entity === entity && att.entity_id === entityId
      );
      setAttachments(filtered);
    } catch (error) {
      console.error('Error fetching attachments:', error);
    }
  };

  const getFileExtension = (filename) => {
    return '.' + filename.split('.').pop().toLowerCase();
  };

  const isValidFile = (file) => {
    const ext = getFileExtension(file.name);
    
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setMessageType('error');
      setMessage(`Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`);
      setTimeout(() => setMessage(''), 3000);
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setMessageType('error');
      setMessage('File size exceeds 10MB limit');
      setTimeout(() => setMessage(''), 3000);
      return false;
    }

    return true;
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    files.forEach((file) => {
      if (!isValidFile(file)) {
        setLoading(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const allAttachments = JSON.parse(localStorage.getItem('attachments') || '[]');
          
          const newAttachment = {
            id: Date.now() + Math.random(),
            entity,
            entity_id: entityId,
            filename: file.name,
            filesize: file.size,
            filetype: file.type,
            filedata: event.target.result, // Base64 encoded file
            uploaded_at: new Date().toISOString(),
          };

          allAttachments.push(newAttachment);
          localStorage.setItem('attachments', JSON.stringify(allAttachments));
          
          fetchAttachments();
          setMessageType('success');
          setMessage(`${file.name} uploaded successfully`);
          setTimeout(() => setMessage(''), 3000);
        } catch (error) {
          console.error('Error uploading file:', error);
          setMessageType('error');
          setMessage('Error uploading file');
          setTimeout(() => setMessage(''), 3000);
        }
      };

      reader.readAsDataURL(file);
    });

    setLoading(false);
    e.target.value = ''; // Reset input
  };

  const handleDeleteAttachment = (id) => {
    if (window.confirm('Are you sure you want to delete this attachment?')) {
      try {
        const allAttachments = JSON.parse(localStorage.getItem('attachments') || '[]');
        const filtered = allAttachments.filter((att) => att.id !== id);
        localStorage.setItem('attachments', JSON.stringify(filtered));
        
        fetchAttachments();
        setMessageType('success');
        setMessage('Attachment deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting attachment:', error);
        setMessageType('error');
        setMessage('Error deleting attachment');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const handleDownloadAttachment = (attachment) => {
    try {
      const link = document.createElement('a');
      link.href = attachment.filedata;
      link.download = attachment.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      setMessageType('error');
      setMessage('Error downloading file');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (filename) => {
    const ext = getFileExtension(filename).toLowerCase();
    switch (ext) {
      case '.pdf':
        return 'isax-document-pdf';
      case '.xlsx':
        return 'isax-document-excel';
      case '.csv':
        return 'isax-document-text';
      case '.jpg':
      case '.jpeg':
      case '.png':
        return 'isax-image';
      default:
        return 'isax-document';
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="mb-0">Attachments</h6>
          <span className="badge bg-light text-dark">{attachments.length}</span>
        </div>

        {message && (
          <div className={`alert alert-${messageType === 'success' ? 'success' : 'danger'} alert-dismissible fade show mb-3`} role="alert">
            {message}
            <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
          </div>
        )}

        {/* Upload Area */}
        <div className="mb-3">
          <label className="form-label">Upload Files</label>
          <div className="upload-area border-2 border-dashed rounded p-4 text-center" style={{ borderColor: '#e9ecef', cursor: 'pointer' }}>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              disabled={loading}
              accept=".pdf,.jpg,.jpeg,.png,.xlsx,.csv"
              style={{ display: 'none' }}
              id="fileInput"
            />
            <label htmlFor="fileInput" style={{ cursor: 'pointer', display: 'block' }}>
              <i className="isax isax-cloud-add fs-32 text-primary mb-2"></i>
              <p className="mb-1 fw-medium">Click to upload or drag and drop</p>
              <p className="fs-13 text-muted mb-0">PDF, JPG, PNG, XLSX, CSV (Max 10MB)</p>
            </label>
          </div>
        </div>

        {/* Attachments List */}
        {attachments.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-sm table-hover">
              <thead className="table-light">
                <tr>
                  <th>File Name</th>
                  <th>Size</th>
                  <th>Uploaded</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attachments.map((attachment) => (
                  <tr key={attachment.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <i className={`isax ${getFileIcon(attachment.filename)} me-2 text-primary`}></i>
                        <span className="fs-13">{attachment.filename}</span>
                      </div>
                    </td>
                    <td className="fs-13">{formatFileSize(attachment.filesize)}</td>
                    <td className="fs-13">
                      {new Date(attachment.uploaded_at).toLocaleDateString()}
                    </td>
                    <td className="text-end">
                      <div className="d-flex gap-2 justify-content-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleDownloadAttachment(attachment)}
                          title="Download"
                        >
                          <i className="isax isax-download-2"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteAttachment(attachment.id)}
                          title="Delete"
                        >
                          <i className="isax isax-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4">
            <i className="isax isax-document-text fs-32 text-muted mb-2"></i>
            <p className="text-muted fs-13">No attachments yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileAttachments;

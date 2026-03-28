import { useState, useCallback } from 'react';

const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.xlsx', '.csv'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const useAttachments = (entity, entityId) => {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch attachments from localStorage
  const fetchAttachments = useCallback(() => {
    try {
      const allAttachments = JSON.parse(localStorage.getItem('attachments') || '[]');
      const filtered = allAttachments.filter(
        (att) => att.entity === entity && att.entity_id === entityId
      );
      setAttachments(filtered);
      setError(null);
    } catch (err) {
      setError('Error fetching attachments');
      console.error(err);
    }
  }, [entity, entityId]);

  // Upload file
  const uploadFile = useCallback((file) => {
    return new Promise((resolve, reject) => {
      setLoading(true);

      // Validate file
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        setError(`Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`);
        setLoading(false);
        reject(new Error('Invalid file type'));
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('File size exceeds 10MB limit');
        setLoading(false);
        reject(new Error('File too large'));
        return;
      }

      // Read file
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
            filedata: event.target.result,
            uploaded_at: new Date().toISOString(),
          };

          allAttachments.push(newAttachment);
          localStorage.setItem('attachments', JSON.stringify(allAttachments));

          setAttachments((prev) => [...prev, newAttachment]);
          setError(null);
          setLoading(false);
          resolve(newAttachment);
        } catch (err) {
          setError('Error uploading file');
          setLoading(false);
          reject(err);
        }
      };

      reader.onerror = () => {
        setError('Error reading file');
        setLoading(false);
        reject(new Error('Error reading file'));
      };

      reader.readAsDataURL(file);
    });
  }, [entity, entityId]);

  // Delete attachment
  const deleteAttachment = useCallback((id) => {
    try {
      const allAttachments = JSON.parse(localStorage.getItem('attachments') || '[]');
      const filtered = allAttachments.filter((att) => att.id !== id);
      localStorage.setItem('attachments', JSON.stringify(filtered));

      setAttachments((prev) => prev.filter((att) => att.id !== id));
      setError(null);
    } catch (err) {
      setError('Error deleting attachment');
      console.error(err);
    }
  }, []);

  // Download attachment
  const downloadAttachment = useCallback((attachment) => {
    try {
      const link = document.createElement('a');
      link.href = attachment.filedata;
      link.download = attachment.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('Error downloading file');
      console.error(err);
    }
  }, []);

  // Get attachment by ID
  const getAttachment = useCallback((id) => {
    return attachments.find((att) => att.id === id);
  }, [attachments]);

  // Clear all attachments for this entity
  const clearAttachments = useCallback(() => {
    try {
      const allAttachments = JSON.parse(localStorage.getItem('attachments') || '[]');
      const filtered = allAttachments.filter(
        (att) => !(att.entity === entity && att.entity_id === entityId)
      );
      localStorage.setItem('attachments', JSON.stringify(filtered));
      setAttachments([]);
      setError(null);
    } catch (err) {
      setError('Error clearing attachments');
      console.error(err);
    }
  }, [entity, entityId]);

  return {
    attachments,
    loading,
    error,
    fetchAttachments,
    uploadFile,
    deleteAttachment,
    downloadAttachment,
    getAttachment,
    clearAttachments,
  };
};

export default useAttachments;

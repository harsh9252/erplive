import React, { useState, useEffect, useRef, useCallback } from 'react';

const AsyncSearchableSelect = ({
  searchFn, // Function that takes (query, limit) and returns an API response
  onSelect,
  placeholder = "Search and select...",
  defaultValue = null,
  displayKey = 'name',
  valueKey = 'id',
  disabled = false,
  className = "",
  limit = 20
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultValue);
  const containerRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    setSelectedItem(defaultValue);
  }, [defaultValue]);

  const performSearch = useCallback(async (query) => {
    // Allow empty query to show default results
    setLoading(true);
    try {
      const response = await searchFn(query, limit);
      // Backend usually returns { data: [] } or { data: { items: [] } }
      const items = response.data?.items || response.data || [];
      setResults(items);
    } catch (error) {
      console.error('AsyncSelect Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchFn, limit]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    
    debounceTimer.current = setTimeout(() => {
      performSearch(value);
    }, 500);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
    setSearchTerm("");
    setResults([]);
  };

  return (
    <div className={`position-relative w-100 ${className}`} ref={containerRef}>
      <div
        className={`form-control form-control-sm d-flex align-items-center justify-content-between cursor-pointer ${disabled ? 'bg-light' : 'bg-white'} ${className}`}
        onClick={() => {
          if (!disabled) {
            const newOpen = !isOpen;
            setIsOpen(newOpen);
            if (newOpen && results.length === 0) {
              performSearch(searchTerm);
            }
          }
        }}
        style={{ minHeight: '38px', cursor: disabled ? 'not-allowed' : 'pointer', ...(!className.includes('border-0') ? { border: '1px solid #dcdcdc' } : { border: 'none' }) }}
      >
        <span className="text-truncate flex-grow-1">
          {selectedItem ? (selectedItem[displayKey] || selectedItem.label || "Selected") : <span className="text-muted">{placeholder}</span>}
        </span>
        <i className={`isax isax-arrow-down-1 fs-14 ms-2 transition-all ${isOpen ? 'rotate-180' : ''}`}></i>
      </div>

      {isOpen && (
        <div 
          className="position-absolute w-100 bg-white border rounded shadow-lg z-3 mt-1" 
          style={{ zIndex: 1050, minWidth: '250px' }}
        >
          <div className="p-2 border-bottom bg-light">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white border-end-0">
                <i className="isax isax-search-normal fs-14 text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0 shadow-none fs-13"
                placeholder="Search..."
                autoFocus
                value={searchTerm}
                onChange={handleInputChange}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="overflow-auto" style={{ maxHeight: '250px' }}>
            {loading ? (
              <div className="p-3 text-center">
                <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
              </div>
            ) : results.length > 0 ? (
              results.map((item) => (
                <div
                  key={item[valueKey] || Math.random()}
                  className="px-3 py-2 cursor-pointer border-bottom hover-bg-light small d-flex flex-column"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSelect(item)}
                >
                  <span className="fw-bold">{item[displayKey]}</span>
                  {item.sku && <span className="text-muted fs-11">SKU: {item.sku}</span>}
                  {item.gstin && <span className="text-muted fs-11">GSTIN: {item.gstin}</span>}
                </div>
              ))
            ) : (
                <div className="px-3 py-3 text-muted text-center small">No items available.</div>
            )}
          </div>
        </div>
      )}
      
      <style>{`
        .hover-bg-light:hover { background-color: #f1f5f9; }
        .rotate-180 { transform: rotate(180deg); }
        .transition-all { transition: all 0.2s ease; }
        .cursor-pointer { cursor: pointer; }
        .fs-13 { font-size: 13px !important; }
        .fs-11 { font-size: 11px !important; }
      `}</style>
    </div>
  );
};

export default AsyncSearchableSelect;

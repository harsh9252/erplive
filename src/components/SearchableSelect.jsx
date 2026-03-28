import React, { useState, useEffect, useRef } from 'react';

const SearchableSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  const selectedOption = options.find(opt => opt.value?.toString() === value?.toString());

  const filteredOptions = options.filter(opt =>
    opt.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className={`position-relative w-100 ${className}`} ref={containerRef}>
      <div
        className={`form-select form-select-sm d-flex align-items-center justify-content-between cursor-pointer ${disabled ? 'bg-light' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{ minHeight: '31px', cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        <span className="text-truncate mr-2">
          {selectedOption ? selectedOption.label : <span className="text-muted">{placeholder}</span>}
        </span>
      </div>

      {isOpen && (
        <div 
          className="position-absolute w-100 bg-white border rounded shadow-sm z-3 mt-1" 
          style={{ zIndex: 1050, minWidth: '200px' }}
        >
          <div className="p-2 border-bottom bg-light">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white border-end-0">
                <i className="isax isax-search-normal fs-14"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0 shadow-none"
                placeholder="Search..."
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="overflow-auto" style={{ maxHeight: '200px' }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  className={`px-3 py-2 cursor-pointer border-bottom-0 hover-bg-light ${value === opt.value ? 'bg-primary text-white' : ''}`}
                  style={{ cursor: 'pointer', fontSize: '13px' }}
                  onClick={() => handleSelect(opt)}
                >
                  {opt.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-muted text-center small">No results found</div>
            )}
          </div>
        </div>
      )}
      
      <style>{`
        .hover-bg-light:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default SearchableSelect;

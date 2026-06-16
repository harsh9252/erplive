import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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
  const dropdownRef = useRef(null);
  const [dropdownProps, setDropdownProps] = useState(null);

  const selectedOption = options.find(opt => opt.value?.toString() === value?.toString());

  const filteredOptions = options.filter(opt =>
    opt.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current && !containerRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const updatePosition = () => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setDropdownProps({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width
        });
      };
      
      updatePosition();
      
      // Use true for capture phase so we catch scroll events on any scrollable parent
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const dropdownMenu = isOpen && dropdownProps ? (
    <div 
      ref={dropdownRef}
      className="bg-white border rounded shadow-sm mt-1" 
      style={{ 
        position: 'absolute',
        top: `${dropdownProps.top}px`,
        left: `${dropdownProps.left}px`,
        width: `${dropdownProps.width}px`,
        zIndex: 9999,
        minWidth: '200px'
      }}
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
  ) : null;

  return (
    <div className="position-relative w-100" ref={containerRef}>
      <div
        className={`form-select form-select-sm d-flex align-items-center justify-content-between cursor-pointer ${disabled ? 'bg-light' : ''} ${className}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{ minHeight: '31px', cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        <span className="text-truncate mr-2">
          {selectedOption ? selectedOption.label : <span className="text-muted">{placeholder}</span>}
        </span>
      </div>

      {isOpen && dropdownMenu && createPortal(dropdownMenu, document.body)}
      
      <style>{`
        .hover-bg-light:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default SearchableSelect;

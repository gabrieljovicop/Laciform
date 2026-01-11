import { useState, useRef, useEffect } from "react";

function CustomSelect({ value, options, onChange, className = "" }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close when click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel = options.find(o => o.value === value)?.label;

  return (
    <div className={`custom-select ${className}`} ref={wrapperRef}>
      <button type="button" className="custom-select-trigger" onClick={() => setOpen(v => !v)}>
        <span>{currentLabel}</span>
        <span className={`arrow ${open ? "open" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="custom-select-menu">
          {options.map(opt => (
            <div key={opt.value} className={`custom-select-item ${value === opt.value ? "active" : ""}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
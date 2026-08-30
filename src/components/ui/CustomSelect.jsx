import { useState, useRef, useEffect } from "react";

// Generic custom-styled dropdown (thin border, uppercase tracked options,
// small chevron that rotates when open) used anywhere on the site that
// needs a <select> without the browser's native chrome — see
// ContactForm.jsx's CountryCodeSelect for the pattern this was extracted
// from. `options` is an array of { value, label } — `label` can be plain
// text or already-translated/picked text, this component doesn't know
// about i18n itself.
const CustomSelect = ({ value, onChange, options, className = "" }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const current = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between border-b border-black/20 hover:border-black focus:border-black outline-none px-1 py-3 text-[13px] leading-[1.2] font-normal bg-transparent transition-colors"
      >
        <span className="truncate">{current?.label}</span>
        <svg
          width="9"
          height="6"
          viewBox="0 0 9 6"
          className={`ml-1.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full mt-1 w-full min-w-[9rem] bg-white border border-black/10 z-20"
        >
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 text-[12px] uppercase tracking-widest2 transition-colors ${
                  o.value === value
                    ? "text-black bg-black/[0.04]"
                    : "text-black/50 hover:text-black hover:bg-black/[0.04]"
                }`}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;

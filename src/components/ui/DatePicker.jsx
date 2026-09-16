import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage.js";
import { toLocalDateKey } from "../../utils/localDateKey.js";

// Site's own minimal calendar dropdown — replaces the browser's native
// <input type="date"> (which looks completely out of place next to the
// rest of the site's plain-border/uppercase-tracked UI) with something
// that matches CustomSelect.jsx's pattern: a bordered trigger button, a
// small absolutely-positioned panel, closes on outside click/Escape.
//
// `value` / `onChange` use the same "YYYY-MM-DD" local-date-key strings as
// toLocalDateKey, so it's a drop-in replacement for <input type="date">'s
// value contract wherever it's used (see Admin.jsx).
const MONDAY_REF = new Date(2024, 0, 1); // a known Monday

const weekdayLabels = (locale) => {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(MONDAY_REF);
    d.setDate(MONDAY_REF.getDate() + i);
    return fmt.format(d);
  });
};

// Mon=0 .. Sun=6 grid of day numbers for the given month, padded with
// `null` before the 1st and after the last day so every row has 7 cells.
const buildMonthGrid = (year, month) => {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(firstWeekday).fill(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
};

const ChevronIcon = ({ direction = "right" }) => (
  <svg width="7" height="11" viewBox="0 0 7 11" className={direction === "left" ? "rotate-180" : ""}>
    <path d="M1 1l4.5 4.5L1 10" stroke="currentColor" strokeWidth="1.2" fill="none" />
  </svg>
);

const DatePicker = ({ value, onChange, className = "" }) => {
  const { language } = useLanguage();
  const locale = language === "sk" ? "sk-SK" : "en-US";
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);

  const today = new Date();
  const selected = value ? new Date(`${value}T00:00:00`) : null;
  const [viewYear, setViewYear] = useState((selected ?? today).getFullYear());
  const [viewMonth, setViewMonth] = useState((selected ?? today).getMonth());

  // Jump the visible month back to whatever is selected (or today) each
  // time the panel opens, so re-opening it never leaves you stranded on
  // whatever month you last browsed to.
  useEffect(() => {
    if (!open) return;
    const base = selected ?? today;
    setViewYear(base.getFullYear());
    setViewMonth(base.getMonth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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

  const goToMonth = (delta) => {
    let year = viewYear;
    let month = viewMonth + delta;
    if (month < 0) {
      month = 11;
      year -= 1;
    } else if (month > 11) {
      month = 0;
      year += 1;
    }
    setViewYear(year);
    setViewMonth(month);
  };

  const pick = (day) => {
    const key = toLocalDateKey(new Date(viewYear, viewMonth, day));
    onChange(key);
    setOpen(false);
  };

  const todayKey = toLocalDateKey(today);
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });
  const displayLabel = selected
    ? selected.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })
    : language === "sk"
    ? "Vybrať dátum"
    : "Pick a date";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex items-center gap-2 border border-black/20 hover:border-black/40 focus:border-black outline-none px-3 py-2 text-[12px] uppercase tracking-widest2 bg-transparent transition-colors"
      >
        <span className={value ? "text-black" : "text-black/40"}>{displayLabel}</span>
        <svg width="11" height="11" viewBox="0 0 11 11" className="shrink-0 text-black/40">
          <rect x="0.5" y="1.5" width="10" height="9" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="0.5" y1="4" x2="10.5" y2="4" stroke="currentColor" strokeWidth="1" />
          <line x1="3" y1="0" x2="3" y2="2.2" stroke="currentColor" strokeWidth="1" />
          <line x1="8" y1="0" x2="8" y2="2.2" stroke="currentColor" strokeWidth="1" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 bg-white border border-black/10 z-20 p-4 w-[260px]">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => goToMonth(-1)}
              aria-label="prev month"
              className="p-1 text-black/40 hover:text-black transition-colors"
            >
              <ChevronIcon direction="left" />
            </button>
            <p className="text-[11px] uppercase tracking-widest2">{monthLabel}</p>
            <button
              type="button"
              onClick={() => goToMonth(1)}
              aria-label="next month"
              className="p-1 text-black/40 hover:text-black transition-colors"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {weekdayLabels(locale).map((w, i) => (
              <p
                key={i}
                className="text-center text-[9px] uppercase tracking-widest2 text-black/30 py-1"
              >
                {w}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {buildMonthGrid(viewYear, viewMonth).map((day, i) => {
              if (day == null) return <div key={i} />;
              const key = toLocalDateKey(new Date(viewYear, viewMonth, day));
              const isSelected = key === value;
              const isToday = key === todayKey;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(day)}
                  className={`mx-auto w-7 h-7 text-[11px] transition-colors ${
                    isSelected
                      ? "bg-black text-white"
                      : isToday
                      ? "border border-black/30 hover:bg-black/[0.04]"
                      : "text-black/70 hover:bg-black/[0.04]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/10">
            <button
              type="button"
              onClick={() => {
                onChange(todayKey);
                setOpen(false);
              }}
              className="text-[10px] uppercase tracking-widest2 underline text-black/40 hover:text-black"
            >
              {language === "sk" ? "Dnes" : "Today"}
            </button>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="text-[10px] uppercase tracking-widest2 underline text-black/40 hover:text-black"
            >
              {language === "sk" ? "Vymazať" : "Clear"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

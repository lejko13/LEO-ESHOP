import { Check } from "lucide-react";

// Extends the site's existing "square toggle" visual language (used for
// size/color selection on the product page) into a checkbox — no new
// design system, just the same border-box + black-fill pattern.
const Checkbox = ({ checked, onChange, children }) => (
  <label className="flex items-start gap-3 cursor-pointer select-none">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="sr-only peer"
    />
    <span
      aria-hidden="true"
      className="mt-0.5 shrink-0 w-4 h-4 border border-black/30 flex items-center justify-center transition-colors peer-checked:bg-black peer-checked:border-black"
    >
      <Check
        size={11}
        strokeWidth={2.5}
        className={checked ? "text-white" : "text-transparent"}
      />
    </span>
    <span className="text-[13px] leading-relaxed text-black/70">
      {children}
    </span>
  </label>
);

export default Checkbox;

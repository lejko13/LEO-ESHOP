// Shared −/+ quantity stepper: replaces the raw browser <input type="number">
// spin arrows (which look inconsistent across browsers and clash with the
// site's minimalist square-button aesthetic) with two bordered buttons
// flanking a centered value, matching the size/quantity preset buttons used
// on Product.jsx and MaterialProduct.jsx. The middle value is still a real
// number input under the hood (so typing a custom amount still works) —
// its native spinner is just hidden.
const QuantityStepper = ({
  value,
  onChange,
  min = 0,
  step = 1,
  decimals = 0,
  ariaLabel,
}) => {
  const round = (n) => {
    const factor = 10 ** decimals;
    return Math.round(n * factor) / factor;
  };

  const decrease = () => onChange(Math.max(min, round(value - step)));
  const increase = () => onChange(round(value + step));

  const handleInput = (raw) => {
    const num = decimals > 0 ? parseFloat(raw) : parseInt(raw, 10);
    if (Number.isNaN(num)) return;
    onChange(Math.max(min, round(num)));
  };

  return (
    <div className="inline-flex items-stretch h-12 border border-black/20">
      <button
        type="button"
        onClick={decrease}
        aria-label="Decrease quantity"
        className="w-10 flex items-center justify-center text-[15px] leading-none text-black/60 hover:bg-black hover:text-white transition-colors border-r border-black/20"
      >
        −
      </button>
      <input
        type="number"
        inputMode={decimals > 0 ? "decimal" : "numeric"}
        min={min}
        step={step}
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        aria-label={ariaLabel}
        className="w-14 text-center text-[12px] tracking-wide bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={increase}
        aria-label="Increase quantity"
        className="w-10 flex items-center justify-center text-[15px] leading-none text-black/60 hover:bg-black hover:text-white transition-colors border-l border-black/20"
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;

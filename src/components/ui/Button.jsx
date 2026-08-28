const variants = {
  primary: "bg-black text-white hover:bg-black/80",
  secondary: "bg-white text-black border border-black hover:bg-black hover:text-white",
};

const Button = ({ children, variant = "primary", className = "", ...props }) => (
  <button
    className={`px-6 py-3.5 text-[11px] font-medium uppercase tracking-widest2 transition-colors ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;

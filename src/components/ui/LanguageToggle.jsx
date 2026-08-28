import { useLanguage } from "../../hooks/useLanguage.js";

// One-click EN / SK switch. `variant="dark"` is for use on the black
// GateOverlay; default is for the white navbar.
const LanguageToggle = ({ variant = "light" }) => {
  const { language, setLanguage } = useLanguage();
  const isDark = variant === "dark";

  const activeClass = isDark ? "text-white" : "text-black";
  const inactiveClass = isDark
    ? "text-white/40 hover:text-white"
    : "text-black/40 hover:text-black";
  const dividerClass = isDark ? "text-white/20" : "text-black/20";

  return (
    <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest2">
      <button
        onClick={() => setLanguage("en")}
        className={language === "en" ? activeClass : inactiveClass}
      >
        En
      </button>
      <span className={dividerClass}>/</span>
      <button
        onClick={() => setLanguage("sk")}
        className={language === "sk" ? activeClass : inactiveClass}
      >
        Sk
      </button>
    </div>
  );
};

export default LanguageToggle;

import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart.js";
import { useLanguage } from "../../hooks/useLanguage.js";
import LanguageToggle from "../ui/LanguageToggle.jsx";

const Navbar = () => {
  const { items } = useCart();
  const { t } = useLanguage();
  // Materials are sold by the meter (fractional quantity, e.g. 2.4), which
  // doesn't make sense added into an "item count" badge — count each
  // material line as a single item instead. Piece-based products still
  // count by their whole-number quantity.
  const itemCount = items.reduce(
    (sum, i) => sum + (i.kind === "material" ? 1 : i.quantity),
    0
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur">
      <nav className="h-16 flex items-center justify-between px-5 md:px-8">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[13px] font-bold uppercase tracking-widest2"
        >
          LEO FUDALY
        </Link>

        {/* Shop/About/Contact live in the footer now. Grid density lives in
            CatalogView's own header row (it only matters on Home/Shop, so
            it doesn't belong in the global navbar). */}

        <div className="flex items-center gap-5">
          <LanguageToggle />
          <Link
            to="/cart"
            className="text-[11px] uppercase tracking-widest2 text-black/70 hover:text-black"
          >
            {t("nav.cartLabel")}&nbsp;({itemCount})
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

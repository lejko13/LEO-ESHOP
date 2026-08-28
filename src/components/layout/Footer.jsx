import { Link } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage.js";

const Footer = () => {
  const { t } = useLanguage();

  // Shop/About/Contact used to live in the navbar; they now live here
  // alongside the legal links. "Contact" reuses nav.contact (same
  // destination footer.contact used to point to) rather than duplicating it.
  const links = [
    { label: t("nav.shop"), to: "/produkty" },
    { label: t("filters.categories.hoodies"), to: "/produkty/hoodie" },
    { label: t("filters.categories.tracksuit"), to: "/produkty/tracksuit" },
    { label: t("filters.categories.pants"), to: "/produkty/pants" },
    { label: t("filters.categories.jackets"), to: "/produkty/jacket" },
    { label: t("nav.materials"), to: "/material" },
    { label: t("nav.accessories"), to: "/doplnky" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.contact"), to: "/contact" },
    { label: t("footer.terms"), to: "/terms" },
    { label: t("footer.privacy"), to: "/privacy" },
    { label: t("footer.accessibility"), to: "/accessibility" },
    { label: t("footer.orderStatus"), to: "/order-status" },
  ];

  return (
    <footer className="border-t border-black/10 mt-24">
      {/* Mobile: stacked and centered. Desktop (md+): one row — links on
          the left, copyright on the right. */}
      <div className="px-5 md:px-8 py-6 flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left md:gap-4">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[10px] uppercase tracking-widest2 text-black/50 hover:text-black"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <span className="text-[10px] uppercase tracking-widest2 text-black/40 whitespace-nowrap">
          &copy; {new Date().getFullYear()} {t("footer.copyright")}
        </span>
      </div>
    </footer>
  );
};

export default Footer;

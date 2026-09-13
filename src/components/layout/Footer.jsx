import { Link } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage.js";
import { BUSINESS } from "../../data/business.js";

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
    { label: t("filters.categories.beanbag"), to: "/produkty/tulivak" },
    { label: t("filters.categories.bags"), to: "/produkty/tasky" },
    // { label: t("nav.materials"), to: "/material" },
    // { label: t("nav.accessories"), to: "/doplnky" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.contact"), to: "/contact" },
    { label: t("footer.terms"), to: "/terms" },
    { label: t("footer.privacy"), to: "/privacy" },
    // { label: t("footer.orderStatus"), to: "/order-status" },
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

      {/* Legally required business identification — name, address, IČO/DIČ,
          contact — kept as its own quiet row beneath the nav links rather
          than mixed into them, since this is identity info, not navigation. */}
      <div className="border-t border-black/5 px-5 md:px-8 py-4">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-2 gap-y-1 text-[9px] uppercase tracking-widest2 text-black/40 text-center md:text-left">
          <span>{BUSINESS.legalName}</span>
          <span aria-hidden="true">&middot;</span>
          <span>IČO: {BUSINESS.ico}</span>
          <span aria-hidden="true">&middot;</span>
          <span>DIČ: {BUSINESS.dic}</span>
          <span aria-hidden="true">&middot;</span>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="hover:text-black normal-case tracking-normal"
          >
            {BUSINESS.email}
          </a>
          {BUSINESS.phone && (
            <>
              <span aria-hidden="true">&middot;</span>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="hover:text-black normal-case tracking-normal"
              >
                {BUSINESS.phone}
              </a>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

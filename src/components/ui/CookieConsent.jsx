import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage.js";
import Button from "./Button.jsx";

const STORAGE_KEY = "yzy-cookie-consent";

// A real decision (not a dark-pattern "OK" button) — "Accept" and "Decline"
// get equal visual weight, same as Button's primary/secondary variants used
// everywhere else on the site. Persisted to localStorage only (no actual
// cookie-category logic exists yet since there's no analytics/ads script on
// the site to gate — this banner exists to satisfy the legal notice
// requirement; wire real script-blocking to `consent === "accepted"` if/when
// you add something like Google Analytics).
const CookieConsent = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (value) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore — banner just won't persist across reloads
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("cookies.title")}
      className="fixed bottom-0 left-0 right-0 z-[250] bg-white border-t border-black/10"
    >
      <div className="px-5 md:px-8 py-6  mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-8 ">
        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-widest2">
            {t("cookies.title")}
          </p>
          <p className="text-[11px] text-black/50 mt-2 leading-relaxed">
            {t("cookies.body")}{" "}
            <Link to="/privacy" className="underline text-black/70 hover:text-black">
              {t("cookies.learnMore")}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="text-[11px] uppercase tracking-widest2 text-black/50 hover:text-black underline"
          >
            {t("cookies.decline")}
          </button>
          <Button onClick={() => decide("accepted")} className="shrink-0">
            {t("cookies.accept")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

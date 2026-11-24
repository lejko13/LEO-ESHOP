import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage.js";
import {
  applyConsent,
  CONSENT_STORAGE_KEY,
  getStoredConsent,
  OPEN_COOKIE_SETTINGS_EVENT,
} from "../../utils/analytics.js";
import Button from "./Button.jsx";

// A real decision (not a dark-pattern "OK" button) — "Accept" and "Decline"
// get equal visual weight, same as Button's primary/secondary variants used
// everywhere else on the site. The choice is persisted to localStorage and
// gates Google Analytics: nothing analytics-related loads until "Accept"
// (see utils/analytics.js). The footer's "Cookie settings" link re-opens
// this bar so consent can be changed or withdrawn at any time.
const CookieConsent = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getStoredConsent()) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const decide = (value) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // ignore — banner just won't persist across reloads
    }
    applyConsent(value);
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

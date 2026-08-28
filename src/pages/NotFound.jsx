import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage.js";

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="px-5 py-24 text-center">
      <h1 className="text-[13px] uppercase tracking-widest2">
        {t("notFound.title")}
      </h1>
      <p className="text-[11px] uppercase tracking-widest2 text-black/40 mt-3 mb-6">
        {t("notFound.subtitle")}
      </p>
      <Link to="/" className="text-[11px] uppercase tracking-widest2 underline">
        {t("notFound.backHome")}
      </Link>
    </div>
  );
};

export default NotFound;

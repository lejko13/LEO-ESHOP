import { useLanguage } from "../hooks/useLanguage.js";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto px-5 py-24">
      <h1 className="text-[11px] uppercase tracking-widest2 text-black/50 mb-6">
        {t("about.title")}
      </h1>
      <p className="text-[13px] leading-relaxed text-black/70">
        {t("about.body")}
      </p>
    </div>
  );
};

export default About;

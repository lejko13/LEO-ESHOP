import { legalPages } from "../data/legalPages.js";
import { useLanguage } from "../hooks/useLanguage.js";

// One shared page for every legal/policy route — content is looked up by
// slug from data/legalPages.js and mapped into sections, same pattern the
// product catalog uses. Every field is bilingual and read via pick().
const Legal = ({ slug }) => {
  const page = legalPages[slug];
  const { t, pick } = useLanguage();

  if (!page) return null;

  return (
    <div className="max-w-2xl mx-auto px-5 py-24">
      <h1 className="text-[11px] uppercase tracking-widest2 text-black/50 mb-2">
        {pick(page.title)}
      </h1>
      <p className="text-[10px] uppercase tracking-widest2 text-black/30 mb-10">
        {t("legal.updated", { date: page.updated })}
      </p>

      <div className="space-y-8">
        {page.sections.map((s) => (
          <div key={pick(s.heading)}>
            <h2 className="text-[11px] uppercase tracking-widest2 mb-2">
              {pick(s.heading)}
            </h2>
            <p className="text-[13px] leading-relaxed text-black/60">
              {pick(s.body)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legal;

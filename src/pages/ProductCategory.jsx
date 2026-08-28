import { useEffect } from "react";
import CatalogView from "../components/product/CatalogView.jsx";
import { useLanguage } from "../hooks/useLanguage.js";

// Dedicated, crawlable URL per category (/produkty/hoodie, /produkty/tracksuit,
// /produkty/pants, /produkty/jacket) instead of only a client-side filter on
// /produkty. Each one gets its own <title> and meta description so Google
// can index them as real, distinct pages — that's what gives a site a shot
// at showing expandable sitelinks under its main search result. Google
// decides on its own whether/when to actually show them though; this just
// gives it clean, well-linked pages to work with instead of one big
// client-filtered catalog it can't tell apart.
const ProductCategory = ({ category }) => {
  const { t, language } = useLanguage();

  useEffect(() => {
    const label = t(`filters.categories.${category}`);
    document.title = t("seo.categoryTitle", { category: label });

    const description = t("seo.categoryDescription", { category: label });
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);

    return () => {
      document.title = "LEO FUDALY — Minimalist Fashion Label";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, language]);

  return <CatalogView scope={category} />;
};

export default ProductCategory;

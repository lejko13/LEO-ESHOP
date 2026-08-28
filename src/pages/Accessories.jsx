import CatalogView from "../components/product/CatalogView.jsx";

// /doplnky — accessories only, price filter only (no category/color
// sections since the category is already fixed) — see CatalogView's
// `scope` prop.
const Accessories = () => <CatalogView scope="accessories" />;

export default Accessories;

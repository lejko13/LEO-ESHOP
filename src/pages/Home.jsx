import CatalogView from "../components/product/CatalogView.jsx";

// Home now renders the exact same catalog UI as /produkty (All count +
// Filter + grid) rather than a bare grid — the two pages share CatalogView
// so they can never drift out of sync.
const Home = () => <CatalogView />;

export default Home;

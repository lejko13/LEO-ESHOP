import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./services/CartContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { GridDensityProvider } from "./context/GridDensityContext.jsx";
import Layout from "./components/layout/Layout.jsx";
import GateOverlay from "./components/ui/GateOverlay.jsx";
import { SITE_GATE_ENABLED } from "./config/features.js";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import ProductCategory from "./pages/ProductCategory.jsx";
import Product from "./pages/Product.jsx";
import Materials from "./pages/Materials.jsx";
import MaterialProduct from "./pages/MaterialProduct.jsx";
import Accessories from "./pages/Accessories.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Admin from "./pages/Admin.jsx";
import Legal from "./pages/Legal.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  // In-memory gate: while locked, nothing else in the app renders — no nav,
  // no routes, no shop. GateOverlay's default (signup) form never unlocks
  // anything — it just writes the submitted email to Supabase. Only a
  // successful owner login (Supabase Auth, inside GateOverlay) calls
  // onUnlock() and flips this to true. Toggle SITE_GATE_ENABLED in
  // config/features.js to disable the gate entirely once ready to launch.
  // Language stays available even behind the gate, since LanguageProvider
  // wraps both branches.
  const [unlocked, setUnlocked] = useState(!SITE_GATE_ENABLED);

  return (
    <LanguageProvider>
      {!unlocked ? (
        <GateOverlay onUnlock={() => setUnlocked(true)} />
      ) : (
        <CartProvider>
          <GridDensityProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produkty" element={<Shop />} />
                {/* Dedicated, crawlable per-category URLs — see
                    ProductCategory.jsx for why these exist as real routes
                    instead of just a filter on /produkty. */}
                <Route
                  path="/produkty/hoodie"
                  element={<ProductCategory category="hoodies" />}
                />
                <Route
                  path="/produkty/tracksuit"
                  element={<ProductCategory category="tracksuit" />}
                />
                <Route
                  path="/produkty/pants"
                  element={<ProductCategory category="pants" />}
                />
                <Route
                  path="/produkty/jacket"
                  element={<ProductCategory category="jackets" />}
                />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/material" element={<Materials />} />
                <Route path="/material/:id" element={<MaterialProduct />} />
                <Route path="/doplnky" element={<Accessories />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                {/* Hidden owner page, not linked in nav/footer — has its
                    own Supabase Auth login, so it works even after
                    SITE_GATE_ENABLED is turned off for launch. */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/terms" element={<Legal slug="terms" />} />
                <Route path="/privacy" element={<Legal slug="privacy" />} />
                <Route
                  path="/accessibility"
                  element={<Legal slug="accessibility" />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </GridDensityProvider>
        </CartProvider>
      )}
    </LanguageProvider>
  );
}

export default App;

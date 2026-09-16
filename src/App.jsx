import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./services/CartContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { GridDensityProvider } from "./context/GridDensityContext.jsx";
import Layout from "./components/layout/Layout.jsx";
import GateOverlay from "./components/ui/GateOverlay.jsx";
import { SITE_GATE_ENABLED } from "./config/features.js";
// Core shopping path — kept as regular (non-lazy) imports so the pages
// people land on/click most often (Home, the catalog, a product, the
// cart) never show a loading flicker while their chunk is fetched.
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import ProductCategory from "./pages/ProductCategory.jsx";
import Product from "./pages/Product.jsx";

// Everything below is visited far less often (or only once per session,
// like Checkout/OrderSuccess) — lazy so a first-time visitor's initial
// bundle doesn't include Stripe's SDK, the materials catalog, legal pages,
// etc. before they've even reached the point of needing any of it.
const Materials = lazy(() => import("./pages/Materials.jsx"));
const MaterialProduct = lazy(() => import("./pages/MaterialProduct.jsx"));
const Accessories = lazy(() => import("./pages/Accessories.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
// Pulls in @stripe/react-stripe-js + Stripe Elements — one of the
// heavier dependencies in the app, previously downloaded by every visitor
// on page load even if they never got near checkout.
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess.jsx"));
// Owner-only page (Supabase auth, orders dashboard, PDF invoices) — lazy
// so its code (and its Supabase/date-picker dependencies) is only ever
// downloaded by someone who actually opens /admin, not bundled into the
// page every shopper loads.
const Admin = lazy(() => import("./pages/Admin.jsx"));
const Legal = lazy(() => import("./pages/Legal.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

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
              {/* Single Suspense boundary around the whole router — covers
                  every lazy-loaded route below with one `fallback={null}`
                  instead of wrapping each route element individually. Eager
                  routes (Home, Shop, ProductCategory, Product) never
                  suspend, so this has no effect on them. */}
              <Suspense fallback={null}>
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
                    path="/produkty/kratasy"
                    element={<ProductCategory category="shorts" />}
                  />
                  <Route
                    path="/produkty/jacket"
                    element={<ProductCategory category="jackets" />}
                  />
                  <Route
                    path="/produkty/tulivak"
                    element={<ProductCategory category="beanbag" />}
                  />
                  <Route
                    path="/produkty/tasky"
                    element={<ProductCategory category="bags" />}
                  />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/material" element={<Materials />} />
                  <Route path="/material/:id" element={<MaterialProduct />} />
                  <Route path="/doplnky" element={<Accessories />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route
                    path="/objednavka-prijata"
                    element={<OrderSuccess />}
                  />
                  {/* Hidden owner page, not linked in nav/footer — has its
                    own Supabase Auth login, so it works even after
                    SITE_GATE_ENABLED is turned off for launch. */}
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/terms" element={<Legal slug="terms" />} />
                  <Route path="/privacy" element={<Legal slug="privacy" />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </GridDensityProvider>
        </CartProvider>
      )}
    </LanguageProvider>
  );
}

export default App;

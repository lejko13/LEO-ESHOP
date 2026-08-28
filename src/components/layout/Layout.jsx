import Navbar from "../navigation/Navbar.jsx";
import Footer from "./Footer.jsx";
import CartToast from "../ui/CartToast.jsx";
import ScrollToTop from "../ui/ScrollToTop.jsx";
import CookieConsent from "../ui/CookieConsent.jsx";

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-white text-black">
    <ScrollToTop />
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
    <CartToast />
    <CookieConsent />
  </div>
);

export default Layout;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Renders nothing — just resets scroll position to the top of the page on
// every route change, so navigating (e.g. Home -> Product) never leaves the
// new page scrolled to wherever the previous page happened to be.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

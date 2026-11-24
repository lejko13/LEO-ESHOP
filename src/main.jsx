import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { initAnalytics } from "./utils/analytics.js";

// Resumes Google Analytics for visitors who already accepted cookies —
// does nothing until consent is given (see utils/analytics.js).
initAnalytics();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

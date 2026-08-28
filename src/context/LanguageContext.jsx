import { createContext, useEffect, useMemo, useState } from "react";
import { translations, colorNames } from "../i18n/translations.js";

export const LanguageContext = createContext(null);

const STORAGE_KEY = "yzy-language";

const getInitialLanguage = () => {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "sk") return stored;
  } catch {
    // localStorage unavailable — fall back silently
  }
  return "en";
};

const getByPath = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "en" ? "sk" : "en"));

  // t("cart.title", { count: 3 }) -> looks up translations[language].cart.title
  // and replaces {count} with 3. Falls back to English, then to the raw path.
  const t = (path, vars = {}) => {
    const dict = translations[language] ?? translations.en;
    let value = getByPath(dict, path);
    if (value === undefined) value = getByPath(translations.en, path);
    if (typeof value !== "string") return path;
    return Object.entries(vars).reduce(
      (str, [key, val]) => str.replaceAll(`{${key}}`, val),
      value
    );
  };

  // Display label for a canonical color key (e.g. "Black" -> "Čierna").
  const colorLabel = (name) =>
    (colorNames[language] ?? colorNames.en)[name] ?? name;

  // Reads a bilingual data field shaped like { en: "...", sk: "..." }.
  // Falls back gracefully for plain strings so it's safe to call on any field.
  const pick = (field) => {
    if (field && typeof field === "object") {
      return field[language] ?? field.en ?? "";
    }
    return field ?? "";
  };

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t, colorLabel, pick }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

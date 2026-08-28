import { createContext, useMemo, useState } from "react";

export const GridDensityContext = createContext(null);

// Global "view preference" — the toggle now lives in the desktop navbar
// (where the Shop/About/Contact links used to be) instead of the catalog
// page itself, so it needs to be shared state rather than something Home
// and Shop each own locally.
export const GridDensityProvider = ({ children }) => {
  const [density, setDensity] = useState(2);

  const cycleDensity = () => setDensity((d) => (d % 3) + 1);

  const value = useMemo(() => ({ density, cycleDensity }), [density]);

  return (
    <GridDensityContext.Provider value={value}>
      {children}
    </GridDensityContext.Provider>
  );
};

import { useContext } from "react";
import { GridDensityContext } from "../context/GridDensityContext.jsx";

export const useGridDensity = () => {
  const ctx = useContext(GridDensityContext);
  if (!ctx) {
    throw new Error("useGridDensity must be used within a GridDensityProvider");
  }
  return ctx;
};

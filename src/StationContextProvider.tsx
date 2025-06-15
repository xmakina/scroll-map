"use client";

import { useContext, useMemo } from "react";
import StationContext, { StationContextProps } from "./StationContext";

export const StationContextProvider: React.FC<StationContextProps> = ({
  station,
  children,
}) => {
  const values = useMemo(() => ({ station }), [station]);

  return (
    <StationContext.Provider value={values}>{children}</StationContext.Provider>
  );
};

export const useStationContext = () => {
  const context = useContext(StationContext);
  if (context?.station === undefined) {
    throw new Error(
      "useStationContext must be used within a StationContextProvider"
    );
  }

  return context;
};

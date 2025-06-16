"use client";

import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsCargoHoldWorker";
import { createContext, ReactNode, useContext, useMemo } from "react";

export type StationContextProps = {
  station: StationWithComponentsAndWorker;
  children: ReactNode | ReactNode[];
};

interface StationContextInterface {
  station: StationWithComponentsAndWorker;
}

const StationContext = createContext<StationContextInterface | undefined>(
  undefined
);

export default StationContext;

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

"use client";

import { createContext, ReactNode } from "react";
import { StationWithComponentsAndWorker } from "./models/StationWithComponentsCargoHoldWorker";

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

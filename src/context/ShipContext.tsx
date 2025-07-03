"use client";

import IActivityData from "@/models/JsonData/IActivityData";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import { ActivityType } from "@prisma/client";
import { createContext, ReactNode, useContext, useMemo } from "react";

export type ShipContextProps = {
  children: ReactNode;
} & ShipContextInterface;

export interface ShipContextInterface {
  ship: ShipWithActivityAndCargoHold;
  issueOrder: (activity: ActivityType, data?: IActivityData) => Promise<void>;
}

const ShipContext = createContext<ShipContextInterface | undefined>(undefined);

export default ShipContext;

export const ShipContextProvider: React.FC<ShipContextProps> = ({
  ship,
  issueOrder,
  children,
}) => {
  const values = useMemo(() => ({ ship, issueOrder }), [ship, issueOrder]);

  return <ShipContext.Provider value={values}>{children}</ShipContext.Provider>;
};

export const useShipContext = (): ShipContextInterface => {
  const context = useContext(ShipContext);
  if (context === undefined) {
    throw new Error("useShipContext must be used within a ShipContextProvider");
  }

  return context;
};

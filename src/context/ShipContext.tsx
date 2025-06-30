"use client";

import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import { UnknownData } from "@/models/UnknownData";
import { ActivityType } from "@prisma/client";
import { createContext, ReactNode, useContext, useMemo } from "react";

export type ShipContextProps = {
  children: ReactNode;
} & ShipContextInterface;

export interface ShipContextInterface {
  ship?: ShipWithActivityAndCargoHold;
  issueOrder: <T>(
    activity: ActivityType,
    data?: T & UnknownData
  ) => Promise<void>;
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

const emptyShipContext: ShipContextInterface = {
  ship: undefined,
  issueOrder: async function () {},
};

export const useShipContext = (): ShipContextInterface => {
  const context = useContext(ShipContext);
  if (context === undefined) {
    return emptyShipContext;
  }

  return context;
};

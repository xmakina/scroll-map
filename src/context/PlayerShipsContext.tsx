"use client";

import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import { ActivityType } from "@prisma/client";
import { createContext, ReactNode, useContext, useMemo } from "react";

export type PlayerShipsContextProps = {
  children: ReactNode | ReactNode[];
} & PlayerShipsContextInterface;

export interface PlayerShipsContextInterface {
  ships: ShipWithActivityAndCargoHold[];
  issueOrder: (
    activity: ActivityType,
    id: string,
    data?: object
  ) => Promise<void> | void;
}

const PlayerShipsContext = createContext<
  PlayerShipsContextInterface | undefined
>(undefined);

export default PlayerShipsContext;

export const PlayerShipsContextProvider: React.FC<PlayerShipsContextProps> = ({
  ships,
  issueOrder,
  children,
}) => {
  const values = useMemo(() => ({ ships, issueOrder }), [ships, issueOrder]);

  return (
    <PlayerShipsContext.Provider value={values}>
      {children}
    </PlayerShipsContext.Provider>
  );
};

export const usePlayerShipsContext = (): PlayerShipsContextInterface => {
  const context = useContext(PlayerShipsContext);
  if (context === undefined) {
    return {
      ships: [],
      issueOrder: () => {},
    };
  }

  return context;
};

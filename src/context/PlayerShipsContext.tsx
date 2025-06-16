"use client";

import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import { createContext, ReactNode, useContext, useMemo } from "react";

export type PlayerShipsContextProps = {
  ships: ShipWithActivityAndCargoHold[];
  children: ReactNode | ReactNode[];
};

interface PlayerShipsContextInterface {
  ships: ShipWithActivityAndCargoHold[];
}

const PlayerShipsContext = createContext<
  PlayerShipsContextInterface | undefined
>(undefined);

export default PlayerShipsContext;

export const PlayerShipsContextProvider: React.FC<PlayerShipsContextProps> = ({
  ships,
  children,
}) => {
  const values = useMemo(() => ({ ships }), [ships]);

  return (
    <PlayerShipsContext.Provider value={values}>
      {children}
    </PlayerShipsContext.Provider>
  );
};

export const usePlayerShipsContext = () => {
  const context = useContext(PlayerShipsContext);
  if (context?.ships === undefined) {
    throw new Error(
      "usePlayerShipsContext must be used within a PlayerShipsContextProvider"
    );
  }

  return context;
};

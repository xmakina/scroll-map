"use client";

import React from "react";
import { createContext, ReactNode, useContext } from "react";

interface IPlayerContext {
  playerId: string;
}

const defaultPlayerContext: IPlayerContext = {
  playerId: "unknown",
};

const PlayerContextValue = createContext<IPlayerContext>(defaultPlayerContext);

type Props = {
  playerId?: string;
  children: ReactNode;
};

const PlayerContext = ({ playerId = "unknown", children }: Props) => {
  return (
    <PlayerContextValue.Provider value={{ playerId }}>
      {children}
    </PlayerContextValue.Provider>
  );
};

export default PlayerContext;

export const usePlayerContext = (): IPlayerContext => {
  const context = useContext(PlayerContextValue);
  if (context === undefined) {
    return defaultPlayerContext;
  }

  return context;
};

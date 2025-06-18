"use client";

import PlayerShipsContext from "@/context/PlayerShipsContext";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import Waypoint from "@/models/waypoint/Waypoint";
import React from "react";
import StarDetails from "../map/StarDetails";

type Props = {
  ships: ShipWithActivityAndCargoHold[];
  x: number;
  y: number;
};

const LocalVolume = ({ ships, x, y }: Props) => {
  const waypoint = new Waypoint(x, y);
  return (
    <div>
      <div>Local Volume</div>
      <PlayerShipsContext.Provider value={{ ships }}>
        <div>
          {waypoint.stars.map((s) => (
            <StarDetails key={s.id} star={s} />
          ))}
        </div>
      </PlayerShipsContext.Provider>
    </div>
  );
};

export default LocalVolume;

"use client";

import PlayerShipsContext from "@/context/PlayerShipsContext";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import Waypoint from "@/models/waypoint/Waypoint";
import React from "react";
import StarDetails from "../map/StarDetails";
import { ActivityType } from "@prisma/client";

type Props = {
  ships: ShipWithActivityAndCargoHold[];
  x: number;
  y: number;
  onIssueOrder: (activity: ActivityType, id: string) => Promise<void> | void;
};

const LocalVolume = ({ ships, x, y, onIssueOrder: issueOrder }: Props) => {
  const waypoint = new Waypoint(x, y);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="italic">Local Volume</div>
      <PlayerShipsContext.Provider value={{ ships, issueOrder }}>
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

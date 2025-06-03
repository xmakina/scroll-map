import Waypoint from "@/models/waypoint/Waypoint";
import { Ship } from "@prisma/client";
import React from "react";
import ShipList from "./ShipList";
import FirstShip from "./FirstShip";

type Props = {
  ships: Ship[];
  selectedStar?: Waypoint;
  createShip: (waypointId: string) => Promise<void>;
  locate: (x: number, y: number) => void;
};

const ShipManagement = ({ ships, selectedStar, createShip, locate }: Props) => {
  return (
    <div className="flex flex-col items-center">
      {ships.length > 0 ? (
        <ShipList ships={ships} locate={locate} />
      ) : (
        <FirstShip selected={selectedStar} createShip={createShip} />
      )}
    </div>
  );
};

export default ShipManagement;

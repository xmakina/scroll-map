import Waypoint from "@/models/waypoint/Waypoint";
import React from "react";
import ShipList from "./ShipList";
import FirstShip from "./FirstShip";
import { ShipWithActivity } from "@/repositories/ShipRepository";

type Props = {
  selectedStar?: Waypoint;
  createShip: (waypointId: string) => Promise<void>;
  locate: (x: number, y: number) => void;
  ships: ShipWithActivity[];
  onClaim: (shipId: string, activityId: string) => Promise<void>;
};

const ShipManagement = ({
  selectedStar,
  createShip,
  locate,
  ships,
  onClaim,
}: Props) => {
  return (
    <div className="flex flex-col items-center">
      {ships.length > 0 ? (
        <ShipList ships={ships} locate={locate} onClaim={onClaim} />
      ) : (
        <FirstShip selected={selectedStar} createShip={createShip} />
      )}
    </div>
  );
};

export default ShipManagement;

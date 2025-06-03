import Waypoint from "@/models/waypoint/Waypoint";
import React from "react";
import Button from "../ui/Button";

type Props = {
  selected?: Waypoint;
  createShip: (waypointId: string) => Promise<void>;
};

const FirstShip = ({ selected, createShip }: Props) => {
  if (selected) {
    return (
      <Button onClick={() => createShip(selected.id)}>
        Deploy to {selected.id}
      </Button>
    );
  }
  return <div>Select a Sector on the Map</div>;
};

export default FirstShip;

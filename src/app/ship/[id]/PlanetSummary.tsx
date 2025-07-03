import React from "react";
import BerthLink from "./BerthLink";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import HabitableWorldSummary from "./HabitableWorldSummary";

type Props = {
  ship: ShipWithActivityAndCargoHold;
};

const PlanetSummary = async ({ ship }: Props) => {
  const { locationId } = ship;

  return (
    <div className="flex flex-col items-center">
      <HabitableWorldSummary ship={ship} />
      <BerthLink locationType={"planet"} locationId={locationId} />
    </div>
  );
};

export default PlanetSummary;

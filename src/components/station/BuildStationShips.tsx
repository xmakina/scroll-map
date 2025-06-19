"use client";

import {
  ShipBlueprints,
  ShipDataWithCost,
} from "@/models/CostAndRequirements/Ships";
import React from "react";
import BuildShip from "./BuildShip";
import StationComponentData from "@/models/StationComponentsData";
import { StationComponentType } from "@prisma/client";
import { useStationContext } from "@/context/StationContext";

type Props = {
  onBuildShip: (shipData: ShipDataWithCost) => Promise<void> | void;
  isBusy: boolean;
};

const BuildStationShips = ({ onBuildShip, isBusy }: Props) => {
  const { Components: stationComponents, CargoHold: cargoHold } =
    useStationContext().station;
  const currentLevel: { [key in StationComponentType]?: number } =
    stationComponents.reduce((acc, s) => {
      const data = s.data as StationComponentData;
      return { ...acc, [s.type]: data.level };
    }, {});

  const displayedShips = ShipBlueprints.filter((scr) =>
    Object.keys(scr.costAndRequirements.requirements)
      .map((k) => k as StationComponentType)
      .reduce(
        (acc, k) =>
          ((acc && currentLevel[k]) || 0) >=
          (scr.costAndRequirements.requirements[k] || 0),
        true
      )
  );

  return (
    <div className="flex flex-col items-center">
      <div>Build Ships</div>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex flex-row gap-4">
          {displayedShips.map((shipCostAndRequirements) => {
            const handleBuildShip = onBuildShip.bind(
              null,
              shipCostAndRequirements
            );
            return (
              <BuildShip
                key={shipCostAndRequirements.data.shipClassName}
                cargoHold={cargoHold}
                onBuildShip={handleBuildShip}
                shipData={shipCostAndRequirements}
                isBusy={isBusy}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BuildStationShips;

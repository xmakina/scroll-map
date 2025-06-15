import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import CostAndRequirements from "@/models/CostAndRequirements/CostAndRequirements";
import { ShipCostAndRequirements } from "@/models/CostAndRequirements/Ships";
import { ShipData } from "@/models/ShipData";
import { StationComponent } from "@prisma/client";
import React from "react";
import BuildShip from "./BuildShip";
import getRequirementsBreakdown from "@/utils/getRequirementsBreakdown";

type Props = {
  stationComponents: StationComponent[];
  cargoHold: CargoHoldWithContainers;
  onBuildShip: (
    shipCostAndRequirements: CostAndRequirements,
    shipData: ShipData
  ) => Promise<void> | void;
};

const BuildStationShips = ({
  stationComponents,
  cargoHold,
  onBuildShip,
}: Props) => {
  const shipKeys = Object.keys(ShipCostAndRequirements);

  const costAndRequirements = shipKeys.map((sk) => ({
    shipKey: sk,
    costAndRequirements: ShipCostAndRequirements[sk].costAndRequirements,
  }));

  const breakdowns = costAndRequirements.map((cr) => ({
    shipKey: cr.shipKey,
    breakdown: getRequirementsBreakdown(
      cr.costAndRequirements,
      stationComponents
    ),
  }));

  const requirementMetShipKeys = breakdowns.map((b) => ({
    shipKey: b.shipKey,
    requirmentsMet: b.breakdown.every((bk) => bk.available >= bk.required),
  }));

  const displayedShipKeys = requirementMetShipKeys.filter(
    (sk) => sk.requirmentsMet
  );

  return (
    <div className="flex flex-col items-center">
      <div>Build Ships</div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-row gap-4">
          {displayedShipKeys.map(({ shipKey }) => {
            const handleBuildShip = onBuildShip.bind(
              null,
              ShipCostAndRequirements[shipKey].costAndRequirements,
              ShipCostAndRequirements[shipKey].data
            );
            return (
              <BuildShip
                key={shipKey}
                shipKey={shipKey}
                cargoHold={cargoHold}
                stationComponents={stationComponents}
                onBuildShip={handleBuildShip}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BuildStationShips;

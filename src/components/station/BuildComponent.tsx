"use client";

import { StationComponent, StationComponentType } from "@prisma/client";
import React from "react";
import Button from "../ui/Button";
import { StationComponentCostAndRequirements } from "@/models/CostAndRequirements/StationComponents";
import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import NeededAvailable from "../ui/NeededAvailable";
import getRequirementsBreakdown from "@/utils/getRequirementsBreakdown";
import getCostBreakdowns from "@/utils/getCostBreakdowns";
import CostAndRequirements from "@/models/CostAndRequirements/CostAndRequirements";

type Props = {
  level: number;
  componentType: StationComponentType;
  stationComponents: StationComponent[];
  cargoHold: CargoHoldWithContainers;
  onBuildComponent: (
    type: StationComponentType,
    level: number
  ) => Promise<void> | void;
  isBusy: boolean;
};

const BuildComponent = ({
  level,
  componentType,
  stationComponents,
  cargoHold,
  onBuildComponent,
  isBusy,
}: Props) => {
  const handleBuildComponents = onBuildComponent.bind(
    null,
    componentType,
    level
  );

  const target: CostAndRequirements =
    StationComponentCostAndRequirements[componentType][level];

  const requirementBreakdowns = getRequirementsBreakdown(
    target,
    stationComponents
  );

  const costBreakdowns = getCostBreakdowns(target.cost, cargoHold);
  const canAfford = costBreakdowns.every((b) => b.available >= b.required);
  const hasRequired = requirementBreakdowns.every(
    (b) => b.available >= b.required
  );

  return (
    <div className="flex flex-col border border-white p-2 rounded-md items-center">
      <div>
        {componentType} {level}
      </div>
      <div className="flex flex-col justify-between">
        {costBreakdowns.map((cb) => (
          <div key={cb.cargoType}>
            <NeededAvailable needed={cb.required} available={cb.available}>
              {cb.cargoType}
            </NeededAvailable>
          </div>
        ))}
      </div>
      {canAfford && hasRequired && !isBusy && (
        <Button onClick={handleBuildComponents}>
          Build {componentType} lvl {level}
        </Button>
      )}
    </div>
  );
};

export default BuildComponent;

"use client";

import { StationComponentType } from "@prisma/client";
import React from "react";
import Button from "../ui/Button";
import NeededAvailable from "../ui/NeededAvailable";
import getRequirementsBreakdown from "@/utils/getRequirementsBreakdown";
import getCostBreakdowns from "@/utils/getCostBreakdowns";
import { useStationContext } from "@/context/StationContext";
import { StationComponentCostsAndRequirements } from "@/models/CostAndRequirements/StationComponents";

type Props = {
  level: number;
  componentType: StationComponentType;
  onBuildComponent: (
    type: StationComponentType,
    level: number
  ) => Promise<void> | void;
  isBusy: boolean;
};

const BuildComponent = ({
  level,
  componentType,
  onBuildComponent,
  isBusy,
}: Props) => {
  const handleBuildComponents = onBuildComponent.bind(
    null,
    componentType,
    level
  );

  const target = StationComponentCostsAndRequirements[componentType][level];

  if (!target) {
    return (
      <div className="flex flex-col border border-white p-2 rounded-md items-center justify-between">
        <div className="mt-4">
          {componentType} {level - 1}
        </div>
        <div className="mb-4">✅</div>
      </div>
    );
  }

  const { Components, CargoHold } = useStationContext().station;

  const requirementBreakdowns = getRequirementsBreakdown(
    target.requirements,
    Components
  );

  const costBreakdowns = getCostBreakdowns(target.cost, CargoHold);
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

"use client";

import React from "react";
import Button from "../ui/Button";
import NeededAvailable from "../ui/NeededAvailable";
import getRequirementsBreakdown, {
  LevelledComponent,
} from "@/utils/getRequirementsBreakdown";
import getCostBreakdowns from "@/utils/getCostBreakdowns";
import { CostAndRequirements } from "@/models/CostAndRequirements/CostAndRequirements";
import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";

type Props<T extends string> = {
  onBuildComponent: () => Promise<void> | void;
  isBusy: boolean;
  target?: CostAndRequirements<T>;
  title: string;
  currentComponents: LevelledComponent[];
  availableResources: CargoHoldWithContainers;
};

const BuildComponent = <T extends string>({
  onBuildComponent,
  isBusy,
  target,
  title,
  currentComponents,
  availableResources,
}: Props<T>) => {
  if (!target) {
    return (
      <div className="flex flex-col border border-white p-2 rounded-md items-center justify-between">
        <div className="mt-4">{title}</div>
        <div className="mb-4">✅</div>
      </div>
    );
  }

  const requirementBreakdowns = getRequirementsBreakdown(
    target.requirements,
    currentComponents
  );

  const costBreakdowns = getCostBreakdowns(target.cost, availableResources);
  const canAfford = costBreakdowns.every((b) => b.available >= b.required);
  const hasRequired = requirementBreakdowns.every((b) => b.level >= b.required);

  return (
    <div className="flex flex-col border border-white p-2 rounded-md items-center">
      <div>{title}</div>
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
        <Button onClick={onBuildComponent}>Build {title}</Button>
      )}
    </div>
  );
};

export default BuildComponent;

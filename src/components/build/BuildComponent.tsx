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
import ComponentType from "@/models/ComponentType";
import { getComponentTypeTranslation } from "@/utils/getTranslation";
import { useTranslations } from "next-intl";

type Props = {
  onBuildComponent: () => Promise<void> | void;
  isBusy: boolean;
  target?: CostAndRequirements<ComponentType>;
  currentComponents: LevelledComponent[];
  availableResources: CargoHoldWithContainers;
  component: ComponentType;
  level: number;
};

const BuildComponent = ({
  onBuildComponent,
  isBusy,
  target,
  currentComponents,
  availableResources,
  component,
  level,
}: Props) => {
  const componentTranslation = getComponentTypeTranslation(component);
  const t = useTranslations("Build Component");
  const title = t("{component} lvl {level}", {
    component: componentTranslation,
    level,
  });

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

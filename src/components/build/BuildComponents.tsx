"use client";

import React from "react";
import BuildComponent from "./BuildComponent";
import { CostAndRequirementsList } from "@/models/CostAndRequirements/CostAndRequirements";
import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";

type Props<T extends string> = {
  onBuildComponent: (type: T, level: number) => Promise<void> | void;
  existing: { type: T; level: number }[];
  isBusy: boolean;
  catalogue: CostAndRequirementsList<T>;
  availableResources: CargoHoldWithContainers;
};

const BuildComponents = <T extends string>({
  onBuildComponent,
  isBusy,
  existing,
  catalogue,
  availableResources,
}: Props<T>) => {
  const currentLevel: { [key in T]?: number } = existing.reduce((acc, s) => {
    return { ...acc, [s.type]: s.level };
  }, {});

  return (
    <div className="flex flex-col items-center">
      <div>Components</div>
      <div className="flex flex-col md:flex-row gap-4">
        {Object.keys(catalogue)
          .map((k) => k as T)
          .map((k) => ({ type: k, level: (currentLevel[k] || 0) + 1 }))
          .map((b) => (
            <BuildComponent
              key={b.type}
              onBuildComponent={onBuildComponent.bind(null, b.type, b.level)}
              isBusy={isBusy}
              target={catalogue[b.type][b.level]}
              title={`${b.type} lvl ${b.level}`}
              currentComponents={existing}
              availableResources={availableResources}
            />
          ))}
      </div>
    </div>
  );
};

export default BuildComponents;

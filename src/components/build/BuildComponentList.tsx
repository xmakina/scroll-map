"use client";

import React from "react";
import BuildComponent from "./BuildComponent";
import { CostAndRequirementsList } from "@/models/CostAndRequirements/CostAndRequirements";
import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import ComponentType from "@/models/ComponentType";
import { useTranslations } from "next-intl";

type Props<T extends ComponentType> = {
  onBuildComponent: (type: T, level: number) => Promise<void> | void;
  existing: { type: T; level: number }[];
  isBusy: boolean;
  catalogue: CostAndRequirementsList<T>;
  availableResources: CargoHoldWithContainers;
};

const BuildComponentList = <T extends ComponentType>({
  onBuildComponent,
  isBusy,
  existing,
  catalogue,
  availableResources,
}: Props<T>) => {
  const t = useTranslations("Build Components");
  const currentLevel: { [key in T]?: number } = existing.reduce((acc, s) => {
    return { ...acc, [s.type]: s.level };
  }, {});

  return (
    <div className="flex flex-col items-center">
      <div>{t("Components")}</div>
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
              currentComponents={existing}
              availableResources={availableResources}
              component={b.type}
              level={b.level}
            />
          ))}
      </div>
    </div>
  );
};

export default BuildComponentList;

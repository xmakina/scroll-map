"use client";

import {
  CostAndRequirements,
  CostAndRequirementsList,
} from "@/models/CostAndRequirements/CostAndRequirements";
import React, { useState } from "react";
import BorderedBox from "../ui/BorderedBox";
import BuildComponent from "./BuildComponent";
import { LevelledComponent } from "@/utils/getRequirementsBreakdown";
import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import { useTranslations } from "next-intl";
import SelectComponentList from "./SelectComponentList";
import LabeledInput from "../ui/LabeledInput";
import ComponentType from "@/models/ComponentType";

type Props<T extends ComponentType> = {
  catalogue: CostAndRequirementsList<T>;
  existing: LevelledComponent[];
  availableResources: CargoHoldWithContainers;
  onBuildComponent: (type: T, level: number) => Promise<void> | void;
  isBusy: boolean;
};

function BuildMenu<T extends ComponentType>({
  catalogue,
  existing,
  availableResources,
  onBuildComponent,
  isBusy,
}: Props<T>) {
  const t = useTranslations("ComponentDetails");
  const components = Object.keys(catalogue).map((k) => k as T);
  const [activeComponentType, setActiveComponentType] = useState<T>();
  const [activeLevel, setActiveLevel] = useState<number>();
  const [activeCostAndRequirements, setActiveCostAndRequirements] =
    useState<CostAndRequirements<T>>();
  const [showAll, setShowAll] = useState(false);

  const handleComponentSelection = (
    component: T,
    level: number,
    costAndRequirements: CostAndRequirements<T>
  ) => {
    setActiveComponentType(component);
    setActiveLevel(level);
    setActiveCostAndRequirements(costAndRequirements);
  };

  const handleBuildComponent = () => {
    if (activeComponentType && activeLevel) {
      onBuildComponent(activeComponentType, activeLevel);
      setActiveComponentType(undefined);
      setActiveLevel(undefined);
      setActiveCostAndRequirements(undefined);
    }
  };

  return (
    <div className="w-full">
      <BorderedBox title="Build Menu">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex flex-col items-center flex-1">
            <div>
              <LabeledInput
                id="showAll"
                type="checkbox"
                checked={showAll}
                onChange={() => setShowAll(!showAll)}
              >
                {t("Show All")}
              </LabeledInput>
            </div>
            <SelectComponentList
              showAll={showAll}
              components={components}
              catalogue={catalogue}
              existing={existing}
              onSelectComponent={handleComponentSelection}
            />
          </div>
          <div className="flex flex-col items-center flex-1">
            {activeCostAndRequirements &&
              activeComponentType &&
              activeLevel && (
                <BorderedBox title="Cost">
                  <BuildComponent
                    component={activeComponentType}
                    level={activeLevel}
                    target={activeCostAndRequirements}
                    onBuildComponent={handleBuildComponent}
                    currentComponents={existing}
                    availableResources={availableResources}
                    isBusy={isBusy}
                  />
                </BorderedBox>
              )}
          </div>
        </div>
      </BorderedBox>
    </div>
  );
}

export default BuildMenu;

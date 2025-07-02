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

type Props<T extends string> = {
  catalogue: CostAndRequirementsList<T>;
  existing: LevelledComponent[];
  availableResources: CargoHoldWithContainers;
};

function BuildMenu<T extends string>({
  catalogue,
  existing,
  availableResources,
}: Props<T>) {
  const t = useTranslations("ComponentDetails");
  const components = Object.keys(catalogue).map((k) => k as T);
  const [activeComponentType, setActiveComponentType] = useState<string>();
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
            {activeCostAndRequirements && (
              <BorderedBox title="Cost">
                <BuildComponent
                  title={`${t(activeComponentType)} lvl${activeLevel}`}
                  target={activeCostAndRequirements}
                  onBuildComponent={function (): Promise<void> | void {
                    throw new Error("Function not implemented.");
                  }}
                  currentComponents={existing}
                  availableResources={availableResources}
                  isBusy={false}
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

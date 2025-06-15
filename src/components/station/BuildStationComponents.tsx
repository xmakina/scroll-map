"use client";

import { StationComponentCostAndRequirements } from "@/models/CostAndRequirements/StationComponents";
import { StationComponent, StationComponentType } from "@prisma/client";
import React from "react";
import BuildComponent from "./BuildComponent";
import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import StationComponentData from "@/models/StationComponentsData";

type Props = {
  stationComponents: StationComponent[];
  cargoHold: CargoHoldWithContainers;
  onBuildComponent: (
    type: StationComponentType,
    level: number
  ) => Promise<void> | void;
  isBusy: boolean;
};

const BuildStationComponents = ({
  stationComponents,
  cargoHold,
  onBuildComponent,
  isBusy,
}: Props) => {
  const currentLevel: { [key in StationComponentType]?: number } =
    stationComponents.reduce((acc, s) => {
      const data = s.data as StationComponentData;
      return { ...acc, [s.type]: data.level };
    }, {});

  return (
    <div className="flex flex-col items-center">
      <div>Components</div>
      <div className="flex flex-row gap-4">
        {Object.keys(StationComponentCostAndRequirements)
          .map((k) => k as StationComponentType)
          .map((b) => (
            <BuildComponent
              key={b}
              level={(currentLevel[b] || 0) + 1}
              componentType={b}
              cargoHold={cargoHold}
              stationComponents={stationComponents}
              onBuildComponent={onBuildComponent}
              isBusy={isBusy}
            />
          ))}
      </div>
    </div>
  );
};

export default BuildStationComponents;

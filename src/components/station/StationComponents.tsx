"use client";

import { BuildRequirements } from "@/models/BuildRequirements";
import { StationComponentData } from "@/models/StationComponents";
import { StationComponent, StationComponentType } from "@prisma/client";
import React from "react";
import BuildComponent from "./BuildComponent";
import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";

type Props = {
  stationComponents: StationComponent[];
  cargoHold: CargoHoldWithContainers;
  onBuildComponent: (
    type: StationComponentType,
    level: number
  ) => Promise<void> | void;
};

const StationComponents = ({
  stationComponents,
  cargoHold,
  onBuildComponent,
}: Props) => {
  const currentLevel: { [key in StationComponentType]?: number } =
    stationComponents.reduce((acc, s) => {
      const data = s.data as StationComponentData;
      return { ...acc, s: data.level };
    }, {});

  return (
    <div>
      <div>Components</div>
      <div>
        <ul>
          {Object.keys(BuildRequirements)
            .map((k) => k as StationComponentType)
            .map((b) => (
              <BuildComponent
                key={b}
                level={currentLevel[b] || 1}
                componentType={b}
                cargoHold={cargoHold}
                stationComponents={stationComponents}
                onBuildComponent={onBuildComponent}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default StationComponents;

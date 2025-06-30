"use client";

import { StationComponentType } from "@prisma/client";
import React from "react";
import BuildComponent from "./BuildComponent";
import StationComponentData from "@/models/JsonData/StationComponentData";
import { useStationContext } from "@/context/StationContext";
import { StationComponentCostsAndRequirements } from "@/models/CostAndRequirements/StationComponents";
import getJsonData from "@/utils/getJsonData";

type Props = {
  onBuildComponent: (
    type: StationComponentType,
    level: number
  ) => Promise<void> | void;
  isBusy: boolean;
};

const BuildStationComponents = ({ onBuildComponent, isBusy }: Props) => {
  const { Components: stationComponents } = useStationContext().station;
  const currentLevel: { [key in StationComponentType]?: number } =
    stationComponents.reduce((acc, s) => {
      const data: StationComponentData = getJsonData(s.data);
      return { ...acc, [s.type]: data.level };
    }, {});

  return (
    <div className="flex flex-col items-center">
      <div>Components</div>
      <div className="flex flex-col md:flex-row gap-4">
        {Object.keys(StationComponentCostsAndRequirements)
          .map((k) => k as StationComponentType)
          .map((b) => (
            <BuildComponent
              key={b}
              level={(currentLevel[b] || 0) + 1}
              componentType={b}
              onBuildComponent={onBuildComponent}
              isBusy={isBusy}
            />
          ))}
      </div>
    </div>
  );
};

export default BuildStationComponents;

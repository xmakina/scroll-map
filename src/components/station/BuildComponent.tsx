"use client";

import {
  CargoType,
  StationComponent,
  StationComponentType,
} from "@prisma/client";
import React from "react";
import Button from "../ui/Button";
import { BuildRequirements } from "@/models/BuildRequirements";
import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import NeededAvailable from "../ui/NeededAvailable";
import { StationComponentData } from "@/models/StationComponents";

const getContained = (
  cargoHold: CargoHoldWithContainers,
  cargoType: CargoType
) =>
  cargoHold.CargoContainers.filter((cont) => cont.type === cargoType).reduce(
    (acc, cont) => acc + cont.amount,
    0
  );

type Props = {
  level: number;
  componentType: StationComponentType;
  stationComponents: StationComponent[];
  cargoHold: CargoHoldWithContainers;
  onBuildComponent: (
    type: StationComponentType,
    level: number
  ) => Promise<void> | void;
};

type CostBreakdown = {
  cargoType: CargoType;
  required: number;
  available: number;
};

const BuildComponent = ({
  level,
  componentType,
  stationComponents,
  cargoHold,
  onBuildComponent,
}: Props) => {
  const handleBuildComponents = onBuildComponent.bind(
    null,
    componentType,
    level
  );

  const target = BuildRequirements[componentType][level];
  const requiredCargoTypes = Object.keys(target.Cost).map(
    (c) => c as CargoType
  );

  const costBreakdowns: CostBreakdown[] = requiredCargoTypes.map((ct) => ({
    cargoType: ct,
    required: target.Cost[ct] || 0,
    available: getContained(cargoHold, ct),
  }));

  const requiredComponents = Object.keys(target.Prerequisites).map(
    (p) => p as StationComponentType
  );

  const requirementBreakdowns = requiredComponents.map((p) => ({
    componentType: p,
    required: target.Prerequisites[p] || 0,
    available:
      (
        stationComponents.find((s) => s.type === p)
          ?.data as StationComponentData
      )?.level || 0,
  }));

  const canAfford = costBreakdowns.every((b) => b.available >= b.required);
  const hasRequired = requirementBreakdowns.every(
    (b) => b.available >= b.required
  );

  return (
    <div>
      <div>
        {costBreakdowns.map((cb) => (
          <div key={cb.cargoType}>
            <NeededAvailable needed={cb.required} available={cb.available}>
              {cb.cargoType}
            </NeededAvailable>
          </div>
        ))}
      </div>
      {canAfford && hasRequired && (
        <Button onClick={handleBuildComponents}>
          Build {componentType} lvl {level}
        </Button>
      )}
    </div>
  );
};

export default BuildComponent;

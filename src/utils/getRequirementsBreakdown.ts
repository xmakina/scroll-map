import { Requirements } from "@/models/CostAndRequirements/CostAndRequirements";
import { StationComponent, StationComponentType } from "@prisma/client";
import { getComponentLevel } from "./getComponentLevel";

export default function (
  requirements: Requirements<StationComponentType>,
  stationComponents: StationComponent[]
) {
  const requiredComponents = Object.keys(requirements).map(
    (p) => p as StationComponentType
  );

  return requiredComponents.map((p) => ({
    componentType: p,
    required: requirements[p] || 0,
    level: getComponentLevel(stationComponents, p),
  }));
}

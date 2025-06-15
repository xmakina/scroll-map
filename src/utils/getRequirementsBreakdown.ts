import CostAndRequirements from "@/models/CostAndRequirements/CostAndRequirements";
import StationComponentData from "@/models/StationComponentsData";
import { StationComponent, StationComponentType } from "@prisma/client";

export default function (
  target: CostAndRequirements,
  stationComponents: StationComponent[]
) {
  const requiredComponents = Object.keys(target.requirements).map(
    (p) => p as StationComponentType
  );

  return requiredComponents.map((p) => ({
    componentType: p,
    required: target.requirements[p] || 0,
    available:
      (
        stationComponents.find((s) => s.type === p)
          ?.data as StationComponentData
      )?.level || 0,
  }));
}

import { Requirements } from "@/models/CostAndRequirements/CostAndRequirements";
import StationComponentData from "@/models/StationComponentsData";
import { StationComponent, StationComponentType } from "@prisma/client";

export default function (
  requirements: Requirements,
  stationComponents: StationComponent[]
) {
  const requiredComponents = Object.keys(requirements).map(
    (p) => p as StationComponentType
  );

  return requiredComponents.map((p) => ({
    componentType: p,
    required: requirements[p] || 0,
    available:
      (
        stationComponents.find((s) => s.type === p)
          ?.data as StationComponentData
      )?.level || 0,
  }));
}

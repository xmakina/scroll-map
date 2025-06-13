import {
  StationComponentData,
  StationComponentRequirement,
} from "@/models/StationComponents";
import { StationComponent, StationComponentType } from "@prisma/client";

export default function (
  target: StationComponentRequirement,
  stationComponents: StationComponent[]
) {
  const requiredComponents = Object.keys(target.Prerequisites).map(
    (p) => p as StationComponentType
  );

  return requiredComponents.map((p) => ({
    componentType: p,
    required: target.Prerequisites[p] || 0,
    available:
      (
        stationComponents.find((s) => s.type === p)
          ?.data as StationComponentData
      )?.level || 0,
  }));
}

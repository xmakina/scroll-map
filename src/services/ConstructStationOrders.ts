import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsCargoHoldWorker";
import { ActivityType, StationComponentType } from "@prisma/client";

export default function (
  data?: StationWithComponentsAndWorker
): ActivityType[] {
  if (data?.Components.some((c) => c.type === StationComponentType.HANGAR)) {
    return [];
  }

  return [ActivityType.SCAVENGE];
}

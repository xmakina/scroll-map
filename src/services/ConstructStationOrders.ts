import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsCargoHoldWorker";
import { ActivityType, StationComponentType } from "@prisma/client";

type PossibleOrders = {
  [key in ActivityType]: (station: StationWithComponentsAndWorker) => boolean;
};

const PossibilityList: PossibleOrders = {
  MINE: function (): boolean {
    return false;
  },
  DELIVER: function (): boolean {
    return false;
  },
  BUILD: function (): boolean {
    return false;
  },
  SCUTTLE: function (): boolean {
    return false;
  },
  SCAVENGE: function (station: StationWithComponentsAndWorker): boolean {
    return !station.Components.some(
      (c) => c.type === StationComponentType.HANGAR
    );
  },
};

export default function (data: StationWithComponentsAndWorker): ActivityType[] {
  const activityTypeKeys = Object.keys(ActivityType).map(
    (a) => a as ActivityType
  );
  return activityTypeKeys.filter((a) => PossibilityList[a](data));
}

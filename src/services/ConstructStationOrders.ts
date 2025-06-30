import { Cost } from "@/models/CostAndRequirements/CostAndRequirements";
import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsCargoHoldWorker";
import getCostBreakdowns from "@/utils/getCostBreakdowns";
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
  BuildShip: function (): boolean {
    return false;
  },
  SCUTTLE: function (): boolean {
    return false;
  },
  SCAVENGE: function (): boolean {
    return true;
  },
  SMELT: function (station: StationWithComponentsAndWorker): boolean {
    const smelterMinimum: Cost = { ORE: 500, GAS: 500 };
    const hasSmelter = station.Components.some(
      (c) => c.type === StationComponentType.SMELTER
    );

    const hasMinimum = getCostBreakdowns(
      smelterMinimum,
      station.CargoHold
    ).every((cb) => cb.available >= cb.required);

    return hasSmelter && hasMinimum;
  },
  ESTABLISH_OUTPOST: function (): boolean {
    return false;
  },
  TRAVEL: function (): boolean {
    return false;
  },
  BERTH: function (): boolean {
    return false;
  },
};

export default function (data: StationWithComponentsAndWorker): ActivityType[] {
  const activityTypeKeys = Object.keys(ActivityType).map(
    (a) => a as ActivityType
  );
  return activityTypeKeys.filter((a) => PossibilityList[a](data));
}

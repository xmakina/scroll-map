import { ShipData } from "@/models/ShipData";
import { ActivityType } from "@prisma/client";

type PossibleOrders = {
  [key in ActivityType]: (data: ShipData) => boolean;
};

const PossibilityList: PossibleOrders = {
  MINE: function (data: ShipData): boolean {
    const { mining, cargoHold } = data;
    return !!(mining && cargoHold);
  },

  DELIVER: function (data: ShipData): boolean {
    const { engine, cargoHold } = data;
    return !!(engine && cargoHold);
  },

  BUILD: function (): boolean {
    return false;
  },

  SCUTTLE: function (): boolean {
    return true;
  },

  SCAVENGE: function (data: ShipData): boolean {
    const { tractorBeam } = data;
    return !!tractorBeam;
  },
  SMELT: function (): boolean {
    return false;
  },
};

export default function (data: ShipData): ActivityType[] {
  const activityTypeKeys = Object.keys(ActivityType).map(
    (a) => a as ActivityType
  );
  return activityTypeKeys.filter((a) => PossibilityList[a](data));
}

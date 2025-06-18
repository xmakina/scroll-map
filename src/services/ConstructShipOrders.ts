import { ShipData } from "@/models/ShipData";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import { ActivityType } from "@prisma/client";

type PossibleOrders = {
  [key in ActivityType]: (ship: ShipWithActivityAndCargoHold) => boolean;
};

const PossibilityList: PossibleOrders = {
  MINE: function (ship): boolean {
    const { mining, cargoHold } = ship.data as ShipData;
    return !!(mining && cargoHold);
  },

  DELIVER: function (ship): boolean {
    const { engine, cargoHold } = ship.data as ShipData;
    const hasCargo = ship.CargoHold?.CargoContainers.some((c) => c.amount > 0);
    return !!(engine && cargoHold && hasCargo);
  },

  BUILD: function (): boolean {
    return false;
  },

  SCUTTLE: function (): boolean {
    return true;
  },

  SCAVENGE: function (ship): boolean {
    const { tractorBeam } = ship.data as ShipData;
    return !!tractorBeam;
  },
  SMELT: function (): boolean {
    return false;
  },
  BuildShip: function (): boolean {
    return false;
  },
};

export default function (data: ShipWithActivityAndCargoHold): ActivityType[] {
  const activityTypeKeys = Object.keys(ActivityType).map(
    (a) => a as ActivityType
  );
  return activityTypeKeys.filter((a) => PossibilityList[a](data));
}

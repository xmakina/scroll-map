import { ShipData } from "@/models/ShipData";
import { ActivityType } from "@prisma/client";

const CanMine = (data: ShipData, availableOrders: ActivityType[]) => {
  const { mining, cargoHold } = data;
  if (mining && cargoHold) {
    return CanScavenge(data, [...availableOrders, ActivityType.MINE]);
  }

  return CanScavenge(data, availableOrders);
};

const CanScavenge = (data: ShipData, availableOrders: ActivityType[]) => {
  const { tractorBeam } = data;
  if (tractorBeam) {
    return CanDeliver(data, [...availableOrders, ActivityType.SCAVENGE]);
  }

  return CanDeliver(data, availableOrders);
};

const CanDeliver = (data: ShipData, availableOrders: ActivityType[]) => {
  const { engine } = data;
  if ((engine?.range || 0) > 0) {
    return [...availableOrders, ActivityType.DELIVER];
  }

  return availableOrders;
};

export const ConstructOrders = (data?: ShipData) => {
  const orders: ActivityType[] = ["SCUTTLE"];
  if (!data) {
    return orders;
  }

  return CanMine(data, orders);
};

"use server";

import { UnknownData } from "@/models/UnknownData";
import ActivityService from "@/services/ActivityService";
import ShipService from "@/services/ShipService";
import StationService from "@/services/StationService";
import { ActivityType } from "@prisma/client";
import { revalidatePath } from "next/cache";

const shipService = await ShipService.get();
const stationService = await StationService.get();
const activityService = await ActivityService.get();

export const issueMultipleShipsOrder = async <T>(
  activityType: ActivityType,
  shipId: string,
  data?: T & UnknownData
) => {
  return await issueShipOrder(shipId, activityType, data);
};

export const issueShipOrder = async <T>(
  shipId: string,
  activityType: ActivityType,
  data?: T & UnknownData
) => {
  const ship = await shipService.get(shipId);
  await activityService.begin(ship.ActivityWorker, activityType, data);
  revalidatePath("/station/[id]", "page");
};

export const issueStationOrder = async <T>(
  stationId: string,
  activityType: ActivityType,
  data?: T & UnknownData
) => {
  const station = await stationService.get(stationId);
  await activityService.begin(station.ActivityWorker, activityType, data);
  revalidatePath("/station/[id]", "page");
};

export const claimActivityForShip = async (shipId: string) => {
  const activityWorker = await shipService.getActivityWorker(shipId);
  await activityService.claim(activityWorker);
  revalidatePath("/station/[id]", "page");
};

export const claimActivityForStation = async (stationId: string) => {
  const station = await stationService.get(stationId);
  await activityService.claim(station.ActivityWorker);
  revalidatePath("/station/[id]", "page");
};

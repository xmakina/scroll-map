"use server";

import IActivityData from "@/models/JsonData/IActivityData";
import ActivityService from "@/services/ActivityService";
import ShipService from "@/services/ShipService";
import StationService from "@/services/StationService";
import { ActivityType } from "@prisma/client";
import { revalidatePath } from "next/cache";

const shipService = await ShipService.get();
const stationService = await StationService.get();
const activityService = await ActivityService.get();

export const issueMultipleShipsOrder = async (
  activityType: ActivityType,
  shipId: string,
  data?: IActivityData
) => {
  return await issueShipOrder(shipId, activityType, data);
};

export const issueShipOrder = async (
  shipId: string,
  activityType: ActivityType,
  data?: IActivityData
) => {
  const ship = await shipService.get(shipId);
  await activityService.begin(ship.ActivityWorker, activityType, data);
  revalidatePath("/station/[id]", "page");
};

export const issueStationOrder = async (
  stationId: string,
  activityType: ActivityType,
  data?: IActivityData
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

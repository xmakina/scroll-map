"use server";

import IActivityData from "@/models/JsonData/IActivityData";
import ActivityService from "@/services/ActivityService";
import ShipService from "@/services/ShipService";
import { ActivityType } from "@prisma/client";
import { revalidatePath } from "next/cache";

const shipService = await ShipService.get();
const activityService = await ActivityService.get();

export const issueShipOrder = async (
  shipId: string,
  activityType: ActivityType,
  data?: IActivityData
) => {
  const ship = await shipService.get(shipId);
  await activityService.begin(ship.ActivityWorker, activityType, data);
  revalidatePath("/ship/[id]", "page");
};

export const claimActivity = async (shipId: string) => {
  const activityWorker = await shipService.getActivityWorker(shipId);
  await activityService.claim(activityWorker);
  revalidatePath("/ship/[id]", "page");
};

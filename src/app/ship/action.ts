"use server";

import { UnknownData } from "@/models/UnknownData";
import ActivityService from "@/services/ActivityService";
import ShipService from "@/services/ShipService";
import { ActivityType } from "@prisma/client";
import { revalidatePath } from "next/cache";

const shipService = await ShipService.get();
const activityService = await ActivityService.get();

export const issueShipOrder = async <T>(
  shipId: string,
  activityType: ActivityType,
  data?: T & UnknownData
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

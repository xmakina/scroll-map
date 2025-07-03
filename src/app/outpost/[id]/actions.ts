"use server";

import { OutpostComponentCostsAndRequirements } from "@/models/CostAndRequirements/OutpostComponents";
import BuildActivityData from "@/models/JsonData/BuildActivityData";
import ActivityService from "@/services/ActivityService";
import OutpostService from "@/services/OutpostService";
import { ActivityType, OutpostComponentType } from "@prisma/client";
import { revalidatePath } from "next/cache";

const outpostService = await OutpostService.get();
const activityService = await ActivityService.get();

export const startBuilding = async (
  outpostId: string,
  componentType: OutpostComponentType,
  level: number
) => {
  const outpost = await outpostService.get(outpostId);

  const costAndRequirements =
    OutpostComponentCostsAndRequirements[componentType][level];

  if (!costAndRequirements) {
    throw new Error("No cost and requirements found");
  }

  const data: BuildActivityData<OutpostComponentType> = {
    type: componentType,
    level,
    cost: costAndRequirements.cost,
    dataType: "BuildActivityData",
  };

  await activityService.begin(outpost.ActivityWorker, ActivityType.BUILD, {
    ...data,
    dataType: "StationComponentData",
  });

  revalidatePath("/outpost/[id]", "page");
};

export const claimActivityForOutpost = async (outpostId: string) => {
  const station = await outpostService.get(outpostId);
  await activityService.claim(station.ActivityWorker);
  revalidatePath("/outpost/[id]", "page");
};

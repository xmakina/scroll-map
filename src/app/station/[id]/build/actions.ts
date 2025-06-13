"use server";

import { StationComponentRequirements } from "@/models/StationComponentRequirements";
import { StationComponentData } from "@/models/StationComponents";
import ActivityService from "@/services/ActivityService";
import StationService from "@/services/StationService";
import { ActivityType, StationComponentType } from "@prisma/client";
import { revalidatePath } from "next/cache";

const stationService = await StationService.get();
const activityService = await ActivityService.get();

export const startBuilding = async (
  stationId: string,
  componentType: StationComponentType,
  level: number
) => {
  await stationService.beginBuildComponent(
    stationId,
    StationComponentRequirements[componentType][level]
  );

  const station = await stationService.get(stationId);

  const data: StationComponentData = {
    type: componentType,
    level,
  };

  await activityService.begin(station.ActivityWorker, ActivityType.BUILD, {
    ...data,
    dataType: "StationComponentData",
  });

  revalidatePath("/station/[id]/build", "page");
};

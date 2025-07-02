"use server";

import ActivityService from "@/services/ActivityService";
import StationService from "@/services/StationService";
import { ActivityType, StationComponentType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ShipDataWithCost } from "@/models/CostAndRequirements/StationShips";
import BuildActivityData from "@/models/JsonData/BuildActivityData";

const stationService = await StationService.get();
const activityService = await ActivityService.get();

export const startBuilding = async (
  stationId: string,
  componentType: StationComponentType,
  level: number
) => {
  const station = await stationService.get(stationId);

  const data: BuildActivityData<StationComponentType> = {
    type: componentType,
    level,
    dataType: "BuildActivityData",
  };

  await activityService.begin(station.ActivityWorker, ActivityType.BUILD, {
    ...data,
    dataType: "StationComponentData",
  });

  revalidatePath("/station/[id]/build", "page");
};

export const startBuildingShip = async (
  stationId: string,
  shipData: ShipDataWithCost
) => {
  await stationService.consumeFromCargoHold(
    stationId,
    shipData.costAndRequirements.cost
  );

  const station = await stationService.get(stationId);

  await activityService.begin(station.ActivityWorker, ActivityType.BuildShip, {
    ...shipData,
    dataType: "ShipData",
  });

  revalidatePath("/station/[id]/build", "page");
};

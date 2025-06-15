"use server";

import { ShipData } from "@/models/ShipData";
import CostAndRequirements from "@/models/CostAndRequirements/CostAndRequirements";
import ActivityService from "@/services/ActivityService";
import StationService from "@/services/StationService";
import { ActivityType, StationComponentType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import StationComponentData from "@/models/StationComponentsData";

const stationService = await StationService.get();
const activityService = await ActivityService.get();

export const startBuilding = async (
  stationId: string,
  componentType: StationComponentType,
  level: number
) => {
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

export const startBuildingShip = async (
  stationId: string,
  shipCostAndRequirements: CostAndRequirements,
  shipData: ShipData
) => {
  await stationService.consumeFromCargoHold(
    stationId,
    shipCostAndRequirements.cost
  );

  const station = await stationService.get(stationId);

  await activityService.begin(station.ActivityWorker, ActivityType.BUILD, {
    ...shipData,
    dataType: "ShipData",
  });

  revalidatePath("/station/[id]/build", "page");
};

"use server";

import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import ActivityService from "@/services/ActivityService";
import ShipService from "@/services/ShipService";
import StationService from "@/services/StationService";
import { ActivityType } from "@prisma/client";
import { revalidatePath } from "next/cache";

const shipService = await ShipService.get();
const stationService = await StationService.get();
const activityService = await ActivityService.get();

export const deployTug = async (stationId: string) => {
  const station = await stationService.get(stationId);
  await activityService.begin(station.ActivityWorker, ActivityType.BUILD, {
    engine: {
      speed: 3,
      range: 0,
    },
    cargoHold: {},
    tractorBeam: true,
    mining: {
      strength: 0,
      rate: 0,
    },
    tug: {
      stationId,
    },
  });

  await stationService.updateStation(stationId, { tugDeployed: true });
  revalidatePath("/station/[id]", "page");
};

export const issueOrder = async (
  shipId: string,
  activityType: ActivityType
) => {
  const ship = await shipService.get(shipId);
  await activityService.begin(ship.ActivityWorker, activityType);
  revalidatePath("/station/[id]", "page");
};

export const claimActivity = async (
  activityWorker: ActivityWorkerWithActivity
) => {
  await activityService.claim(activityWorker);

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

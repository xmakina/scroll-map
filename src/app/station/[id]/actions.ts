"use server";

import { getPlayer } from "@/app/queries";
import ShipService from "@/services/ShipService";
import StationService from "@/services/StationService";
import { ActivityType } from "@prisma/client";
import { revalidatePath } from "next/cache";

const shipService = await ShipService.get();
const stationService = await StationService.get();

export const deployTug = async (stationId: string) => {
  console.log("deploying tug", stationId);
  const { id: playerId } = await getPlayer();
  await shipService.createShip(playerId, stationId, {
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

export const issueOrder = async (shipId: string, orderName: ActivityType) => {
  switch (orderName) {
    case "SCUTTLE": {
      await shipService.scuttleShip(shipId);
      break;
    }
    default:
      throw Error(`Unknown order: ${orderName}`);
  }

  revalidatePath("/station/[id]", "page");
};

export const claimActivity = async (shipId: string, activityId: string) => {
  await shipService.claimActivity(shipId, activityId);
  revalidatePath("/map", "page");
};

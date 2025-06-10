"use server";

import { getPlayer } from "@/app/queries";
import ShipService from "@/services/ShipService";
import StationService from "@/services/StationService";
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

export const issueOrder = async (shipId: string, orderName: string) => {
  console.log(`ordering ${shipId} to ${orderName}`);
  switch (orderName) {
    case "scuttle": {
      await shipService.scuttleShip(shipId);
      break;
    }
    default:
      throw Error(`Unknown order: ${orderName}`);
  }

  revalidatePath("/station/[id]", "page");
};
